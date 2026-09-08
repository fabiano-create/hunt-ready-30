import { gate, resolveCredentials, parseImageDataUrl, imageBlock, runVision } from '../lib/claude.js';

// HUNT READY 30 — archery analysis. POST { kind: 'target' | 'bow' | 'form', ... }
//   target: { imageDataUrl, targetWidthIn, distanceYd, arrowsShot }      -> group size + placement
//   bow:    { imageDataUrl }                                               -> identify the setup
//   form:   { frames: [dataUrl...], view, handedness, note }               -> coaching observations

const CONFIDENCE = { type: 'string', enum: ['low', 'medium', 'high'] };

const TARGET_SCHEMA = {
  type: 'object',
  properties: {
    arrows_found: { type: 'integer', description: 'Number of arrows visible in the target.' },
    group_size_in: { type: 'number', description: 'Estimated center-to-center spread of the group in inches, using the stated target width as the scale.' },
    group_center: { type: 'string', description: 'Where the group sits relative to the aiming point, e.g. "about 2 in high and 1 in left" or "centered".' },
    flyers: { type: 'string', description: 'Arrows clearly outside the main group, or "none".' },
    sight_adjustment: { type: 'string', description: 'One-line suggestion, e.g. "move the pin toward the group: up and left slightly", or "no change needed".' },
    notes: { type: 'string', description: 'What was assumed (target size, aiming point), image quality, uncertainty.' },
    confidence: CONFIDENCE
  },
  required: ['arrows_found', 'group_size_in', 'group_center', 'flyers', 'sight_adjustment', 'notes', 'confidence'], additionalProperties: false
};
const BOW_SCHEMA = {
  type: 'object',
  properties: {
    bow_type: { type: 'string', enum: ['compound', 'recurve', 'longbow', 'crossbow', 'unknown'] },
    brand: { type: 'string' }, model: { type: 'string' },
    handedness: { type: 'string', enum: ['right', 'left', 'unknown'], description: 'Right-handed bows have the sight/rest on the archer\'s left side when viewed from behind.' },
    sight: { type: 'string' }, rest: { type: 'string' }, stabilizer: { type: 'string' }, quiver: { type: 'string' }, arrows: { type: 'string' },
    other: { type: 'string', description: 'Release aid, peep, string accessories, anything else visible.' },
    notes: { type: 'string', description: 'What was read from labels versus guessed from shape; what a clearer photo would help with.' },
    confidence: CONFIDENCE
  },
  required: ['bow_type', 'brand', 'model', 'handedness', 'sight', 'rest', 'stabilizer', 'quiver', 'arrows', 'other', 'notes', 'confidence'], additionalProperties: false
};
const FORM_SCHEMA = {
  type: 'object',
  properties: {
    summary: { type: 'string', description: 'Two or three sentences on the overall shot.' },
    stance_and_posture: { type: 'string' }, bow_arm_and_grip: { type: 'string' }, draw: { type: 'string' },
    anchor_and_head: { type: 'string' }, release_and_follow_through: { type: 'string' },
    top_fixes: { type: 'array', items: { type: 'string' }, description: 'The 1–3 most valuable changes, most important first.' },
    drills: { type: 'array', items: { type: 'string' }, description: 'Simple drills for the top fixes.' },
    notes: { type: 'string', description: 'What could not be judged from these frames and what camera angle would help.' },
    confidence: CONFIDENCE
  },
  required: ['summary', 'stance_and_posture', 'bow_arm_and_grip', 'draw', 'anchor_and_head', 'release_and_follow_through', 'top_fixes', 'drills', 'notes', 'confidence'], additionalProperties: false
};

const SYSTEMS = {
  target: `You are an archery coach reading a photo of a target for a practice log. Use the stated target-face width as the scale to estimate the group's center-to-center spread in inches. Identify the aiming point (center spot or bull) and describe where the group sits relative to it from the archer's point of view. Be honest about uncertainty; if no target or arrows are visible say so in notes, set arrows_found to 0 and group_size_in to 0.`,
  bow: `You identify archery equipment from a photo for a bowhunter's gear profile. Read brand and model names from labels, limb decals, and riser markings when legible; otherwise describe what you can infer from shape and say it is a guess. Leave a field as an empty string when nothing can be determined. Never invent a model name that is not readable or strongly implied.`,
  form: `You are an experienced archery coach reviewing still frames taken from a short video of one shot. Give practical, encouraging, specific observations in plain language for a beginner bowhunter. Frame everything as observations from limited frames, not a diagnosis. Focus on the things that most affect consistent accuracy for hunting: stance, bow-arm and grip pressure, a smooth draw, a repeatable anchor, and a relaxed release with follow-through. If the archer is not clearly visible, say so and keep the advice general.`
};

export default async function handler(req, res) {
  const creds = resolveCredentials();
  if (!creds) return res.status(500).json({ error: 'AI_GATEWAY_API_KEY is not configured. Add your Vercel AI Gateway key as an environment variable and redeploy.', code: 'missing_api_key' });
  if (gate(req, res)) return;
  const body = req.body || {};
  const kind = String(body.kind || '');
  if (!['target', 'bow', 'form'].includes(kind)) return res.status(400).json({ error: 'kind must be "target", "bow", or "form".', code: 'bad_kind' });

  let schema, content, maxTokens = 1024, effort = 'medium';
  if (kind === 'target') {
    const image = parseImageDataUrl(body.imageDataUrl);
    if (!image) return res.status(400).json({ error: 'A JPEG, PNG, GIF, or WebP target photo is required.', code: 'bad_image' });
    const width = Number(body.targetWidthIn) || 0, dist = Number(body.distanceYd) || 0, shot = Number(body.arrowsShot) || 0;
    schema = TARGET_SCHEMA;
    content = [imageBlock(image), { type: 'text', text: `Target face width: ${width ? `${width} inches` : 'unknown (estimate from context and say so)'}. Distance: ${dist ? `${dist} yards` : 'unknown'}. Arrows shot this end: ${shot || 'unknown'}. Analyze the group and return the JSON.` }];
  } else if (kind === 'bow') {
    const image = parseImageDataUrl(body.imageDataUrl);
    if (!image) return res.status(400).json({ error: 'A JPEG, PNG, GIF, or WebP bow photo is required.', code: 'bad_image' });
    schema = BOW_SCHEMA;
    content = [imageBlock(image), { type: 'text', text: 'Identify the bow and accessories in this photo and return the JSON.' }];
  } else {
    const frames = Array.isArray(body.frames) ? body.frames.map(parseImageDataUrl).filter(Boolean) : [];
    if (frames.length < 2 || frames.length > 10) return res.status(400).json({ error: 'Between 2 and 10 JPEG/PNG frames are required.', code: 'bad_frames' });
    const view = String(body.view || 'unknown'), hand = String(body.handedness || 'unknown'), note = String(body.note || '').slice(0, 400);
    schema = FORM_SCHEMA; maxTokens = 1800; effort = 'high';
    content = [
      { type: 'text', text: `These ${frames.length} frames are in time order from one shot. Camera view: ${view}. Archer is ${hand}-handed.${note ? ` Archer's note: ${note}` : ''}` },
      ...frames.flatMap((f, i) => [{ type: 'text', text: `Frame ${i + 1} of ${frames.length}:` }, imageBlock(f)]),
      { type: 'text', text: 'Review the shot and return the JSON.' }
    ];
  }

  const r = await runVision({ creds, system: SYSTEMS[kind], schema, content, maxTokens, effort });
  if (!r.ok) return res.status(r.status).json(r.body);
  // note: the bow schema has its own `model` field, so the AI model goes under `ai_model`
  return res.status(200).json({ kind, ...r.data, ai_model: r.model, requested: creds.model, via: r.via });
}
