import { gate, resolveCredentials, parseImageDataUrl, imageBlock, runVision } from '../lib/claude.js';

// HUNT READY 30 — meal-photo nutrition estimate. POST { imageDataUrl } -> { name, calories, protein, carbs, fat, fiber, notes }

const MEAL_SCHEMA = {
  type: 'object',
  properties: {
    name: { type: 'string', description: 'Short meal name, e.g. "Steak and eggs".' },
    calories: { type: 'number' }, protein: { type: 'number' }, carbs: { type: 'number' }, fat: { type: 'number' }, fiber: { type: 'number' },
    notes: { type: 'string', description: 'Likely ingredients, portion assumptions, key micronutrients (sodium, potassium, calcium, iron, B12 when applicable), and how uncertain the estimate is.' }
  },
  required: ['name', 'calories', 'protein', 'carbs', 'fat', 'fiber', 'notes'], additionalProperties: false
};
const SYSTEM = `You estimate nutrition from a single photo of a meal for a personal food log used by an adult training for hunting season.
Estimate realistic portion sizes from visual cues (plate size, utensils, packaging). Never claim the estimate is exact.
If the photo is not food, or is too ambiguous to estimate, still return the JSON: use a descriptive name, zeros for the numbers, and explain the problem in notes.`;

export default async function handler(req, res) {
  const creds = resolveCredentials();
  if (!creds) return res.status(500).json({ error: 'AI_GATEWAY_API_KEY is not configured. Add your Vercel AI Gateway key as an environment variable and redeploy.', code: 'missing_api_key' });
  if (gate(req, res)) return;
  const image = parseImageDataUrl(req.body?.imageDataUrl);
  if (!image) return res.status(400).json({ error: 'A JPEG, PNG, GIF, or WebP meal image data URL is required.', code: 'bad_image' });

  const r = await runVision({ creds, system: SYSTEM, schema: MEAL_SCHEMA, maxTokens: 1024, effort: 'medium',
    content: [imageBlock(image), { type: 'text', text: 'Estimate the nutrition of the meal in this photo and return the JSON.' }] });
  if (!r.ok) return res.status(r.status).json(r.body);
  const p = r.data;
  return res.status(200).json({
    name: String(p.name || 'Meal'), calories: Math.round(Number(p.calories) || 0), protein: Math.round(Number(p.protein) || 0),
    carbs: Math.round(Number(p.carbs) || 0), fat: Math.round(Number(p.fat) || 0), fiber: Math.round(Number(p.fiber) || 0),
    notes: String(p.notes || 'AI estimate. Review before saving.'), model: r.model, requested: creds.model, via: r.via
  });
}
