export default async function handler(req, res) {
  const allowed = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  const origin = req.headers.origin || '';

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OPENAI_API_KEY is not configured.' });
  }
  if (!allowed.length) {
    return res.status(500).json({ error: 'ALLOWED_ORIGINS is not configured.' });
  }
  if (origin && !allowed.includes(origin)) {
    return res.status(403).json({ error: 'Origin not allowed.' });
  }

  res.setHeader('Access-Control-Allow-Origin', origin || allowed[0]);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only.' });

  const imageDataUrl = req.body?.imageDataUrl;
  if (!imageDataUrl || !String(imageDataUrl).startsWith('data:image/')) {
    return res.status(400).json({ error: 'A meal image data URL is required.' });
  }

  const prompt = `Analyze the food shown in this image for a personal food log. Estimate portions and return ONLY valid JSON with these keys:
name (short meal name), calories (number), protein (grams), carbs (grams), fat (grams), fiber (grams), notes (short string).
In notes, include the most relevant estimated micronutrients (for example sodium, potassium, calcium, iron, vitamin B12 when applicable), likely ingredients, uncertainty, and any portion-size assumptions.
Do not claim the estimate is exact. If the image is ambiguous, say so in notes.`;

  try {
    const apiResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-5.6-luna',
        input: [{
          role: 'user',
          content: [
            { type: 'input_text', text: prompt },
            { type: 'input_image', image_url: imageDataUrl }
          ]
        }]
      })
    });

    const data = await apiResponse.json();
    if (!apiResponse.ok) {
      return res.status(apiResponse.status).json({ error: data?.error?.message || 'AI request failed.' });
    }

    let text = data.output_text;
    if (!text && Array.isArray(data.output)) {
      for (const item of data.output) {
        for (const content of item.content || []) {
          if (content.type === 'output_text' && content.text) {
            text = content.text;
            break;
          }
        }
        if (text) break;
      }
    }
    if (!text) return res.status(502).json({ error: 'No text returned by AI.' });

    const cleaned = text.replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/```\s*$/, '').trim();
    const parsed = JSON.parse(cleaned);
    return res.status(200).json({
      name: String(parsed.name || 'Meal'),
      calories: Number(parsed.calories || 0),
      protein: Number(parsed.protein || 0),
      carbs: Number(parsed.carbs || 0),
      fat: Number(parsed.fat || 0),
      fiber: Number(parsed.fiber || 0),
      notes: String(parsed.notes || 'AI estimate. Review before saving.')
    });
  } catch (error) {
    return res.status(500).json({ error: error?.message || 'Meal analysis failed.' });
  }
}
