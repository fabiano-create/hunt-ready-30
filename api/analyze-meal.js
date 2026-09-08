import Anthropic from '@anthropic-ai/sdk';

// HUNT READY 30 — secure meal-photo nutrition endpoint (Claude).
// The browser POSTs { imageDataUrl } and receives { name, calories, protein, carbs, fat, fiber, notes }.
// The API key lives only in Vercel environment variables, never in the static app.

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-opus-5';
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/webp']);

const MEAL_SCHEMA = {
  type: 'object',
  properties: {
    name: { type: 'string', description: 'Short meal name, e.g. "Steak and eggs".' },
    calories: { type: 'number', description: 'Estimated total kilocalories.' },
    protein: { type: 'number', description: 'Estimated grams of protein.' },
    carbs: { type: 'number', description: 'Estimated grams of carbohydrate.' },
    fat: { type: 'number', description: 'Estimated grams of fat.' },
    fiber: { type: 'number', description: 'Estimated grams of fiber.' },
    notes: {
      type: 'string',
      description: 'Likely ingredients, portion-size assumptions, the most relevant estimated micronutrients (sodium, potassium, calcium, iron, vitamin B12 when applicable), and how uncertain the estimate is. Say so plainly if the image is ambiguous.'
    }
  },
  required: ['name', 'calories', 'protein', 'carbs', 'fat', 'fiber', 'notes'],
  additionalProperties: false
};

const SYSTEM_PROMPT = `You estimate nutrition from a single photo of a meal for a personal food log used by an adult training for hunting season.
Estimate realistic portion sizes from visual cues (plate size, utensils, packaging). Never claim the estimate is exact.
If the photo is not food, or is too ambiguous to estimate, still return the JSON: use a descriptive name, zeros for the numbers, and explain the problem in notes.`;

function parseImageDataUrl(value) {
  const match = /^data:(image\/[a-z0-9.+-]+);base64,([A-Za-z0-9+/=\s]+)$/i.exec(String(value || ''));
  if (!match) return null;
  const mediaType = match[1].toLowerCase();
  if (!ALLOWED_IMAGE_TYPES.has(mediaType)) return null;
  return { mediaType, data: match[2].replace(/\s+/g, '') };
}

function providerDetails(error) {
  const body = error?.error;
  const inner = body?.error && typeof body.error === 'object' ? body.error : body;
  return {
    message: String(inner?.message || error?.message || 'AI request failed.'),
    type: String(inner?.type || '')
  };
}

function mapProviderError(error) {
  const { message, type } = providerDetails(error);
  const lower = message.toLowerCase();
  if (lower.includes('credit') || lower.includes('billing')) {
    return { status: 402, error: message, code: 'insufficient_credits' };
  }
  if (error instanceof Anthropic.AuthenticationError) {
    return { status: 401, error: 'Anthropic rejected the server API key. Check ANTHROPIC_API_KEY in Vercel → Settings → Environment Variables, then redeploy.', code: 'authentication_error' };
  }
  if (error instanceof Anthropic.PermissionDeniedError) {
    return { status: 403, error: message, code: type || 'permission_error' };
  }
  if (error instanceof Anthropic.NotFoundError) {
    return { status: 404, error: `Anthropic could not find the requested resource (model "${MODEL}"?). ${message}`, code: type || 'not_found_error' };
  }
  if (error instanceof Anthropic.RateLimitError) {
    return { status: 429, error: 'Anthropic rate limit reached. Wait a moment and try again.', code: type || 'rate_limit_error' };
  }
  if (error instanceof Anthropic.BadRequestError) {
    return { status: 400, error: message, code: type || 'invalid_request_error' };
  }
  if (error instanceof Anthropic.APIConnectionError) {
    return { status: 502, error: 'The server could not reach Anthropic. Try again in a moment.', code: 'connection_error' };
  }
  if (error instanceof Anthropic.APIError) {
    const status = Number(error.status) >= 500 ? 503 : Number(error.status) || 500;
    return { status, error: status === 503 ? 'Anthropic is busy or had an error. Try again in a moment.' : message, code: type || `http_${error.status}` };
  }
  return { status: 500, error: message || 'Meal analysis failed.', code: 'server_error' };
}

export default async function handler(req, res) {
  const allowed = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  const origin = req.headers.origin || '';

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not configured.', code: 'missing_api_key' });
  }
  if (!allowed.length) {
    return res.status(500).json({ error: 'ALLOWED_ORIGINS is not configured.', code: 'missing_allowed_origins' });
  }
  if (origin && !allowed.includes(origin)) {
    return res.status(403).json({ error: 'Origin not allowed.', code: 'origin_not_allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', origin || allowed[0]);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only.', code: 'method_not_allowed' });

  const image = parseImageDataUrl(req.body?.imageDataUrl);
  if (!image) {
    return res.status(400).json({ error: 'A JPEG, PNG, GIF, or WebP meal image data URL is required.', code: 'bad_image' });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      output_config: {
        effort: 'medium',
        format: { type: 'json_schema', schema: MEAL_SCHEMA }
      },
      messages: [{
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: image.mediaType, data: image.data } },
          { type: 'text', text: 'Estimate the nutrition of the meal in this photo and return the JSON.' }
        ]
      }]
    });

    if (response.stop_reason === 'refusal') {
      return res.status(422).json({ error: 'The AI declined to analyze this photo. Try a clearer photo of just the food.', code: 'refusal' });
    }
    if (response.stop_reason === 'max_tokens') {
      return res.status(502).json({ error: 'The AI answer was cut off. Try again.', code: 'truncated' });
    }

    const text = response.content.find(block => block.type === 'text')?.text;
    if (!text) return res.status(502).json({ error: 'No text returned by AI.', code: 'empty_response' });

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      return res.status(502).json({ error: 'AI returned text that was not valid JSON. Try the photo again.', code: 'bad_ai_json' });
    }

    return res.status(200).json({
      name: String(parsed.name || 'Meal'),
      calories: Math.round(Number(parsed.calories) || 0),
      protein: Math.round(Number(parsed.protein) || 0),
      carbs: Math.round(Number(parsed.carbs) || 0),
      fat: Math.round(Number(parsed.fat) || 0),
      fiber: Math.round(Number(parsed.fiber) || 0),
      notes: String(parsed.notes || 'AI estimate. Review before saving.'),
      model: response.model
    });
  } catch (error) {
    const mapped = mapProviderError(error);
    return res.status(mapped.status).json({ error: mapped.error, code: mapped.code });
  }
}
