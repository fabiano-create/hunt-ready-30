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
const BOW_FIELDS = ['brand', 'model', 'sight', 'rest', 'stabilizer', 'quiver', 'arrows'];
const BOW_SCHEMA = {
  type: 'object',
  properties: {
    bow_type: { type: 'string', enum: ['compound', 'recurve', 'longbow', 'crossbow', 'unknown'] },
    brand: { type: 'string', description: 'Bow brand as a short name, or empty string.' },
    model: { type: 'string', description: 'Bow model as a short name, or empty string.' },
    handedness: { type: 'string', enum: ['right', 'left', 'unknown'], description: 'Right-handed bows have the sight/rest on the archer\'s left side when viewed from behind.' },
    handedness_confidence: { type: 'string', enum: ['low', 'medium', 'high'], description: 'High only if the sight/rest side is unambiguous in a view from behind or with the archer holding the bow.' },
    sight: { type: 'string', description: 'Brand and model of the sight as a short name (max ~6 words), or empty string. No descriptions here.' },
    rest: { type: 'string', description: 'Brand and model of the arrow rest as a short name, or empty string.' },
    stabilizer: { type: 'string', description: 'Brand/model of the stabilizer as a short name, or empty string.' },
    quiver: { type: 'string', description: 'Brand/model of the quiver as a short name, or empty string.' },
    arrows: { type: 'string', description: 'Arrow brand/model if readable on the shaft, or empty string.' },
    readable_fields: { type: 'array', items: { type: 'string', enum: BOW_FIELDS }, description: 'Fields whose value was READ from legible text (labels, decals, stamps), not inferred from shape.' },
    other: { type: 'string', description: 'Descriptive observations that are not product names: rest type, sight style, peep, D-loop, silencers, sling, release aid, finish.' },
    notes: { type: 'string', description: 'What was legible vs guessed, and which close-ups would allow confident identification.' },
    confidence: CONFIDENCE
  },
  required: ['bow_type', 'brand', 'model', 'handedness', 'handedness_confidence', 'sight', 'rest', 'stabilizer', 'quiver', 'arrows', 'readable_fields', 'other', 'notes', 'confidence'], additionalProperties: false
};
const RIFLE_SCHEMA = {
  type: 'object',
  properties: {
    brand: { type: 'string' }, model: { type: 'string' }, caliber: { type: 'string', description: 'Only if legible on the barrel stamp, receiver, or an ammo box in the photo.' },
    scope: { type: 'string', description: 'Brand and model / magnification if readable.' }, ammo: { type: 'string', description: 'Brand, bullet, grain weight if an ammo box is visible.' },
    accessories: { type: 'string', description: 'Sling, bipod, suppressor, muzzle brake, rail, etc.' },
    handedness: { type: 'string', enum: ['right', 'left', 'unknown'], description: 'Bolt handle on the right side = right-handed rifle.' },
    other: { type: 'string', description: 'Anything else notable: stock type, action type, barrel length estimate.' },
    readable_fields: { type: 'array', items: { type: 'string', enum: ['rifle', 'caliber', 'scope', 'ammo', 'accessories'] }, description: 'Fields whose values were READ from legible text in the photos, not inferred from shape.' },
    notes: { type: 'string', description: 'What was read vs guessed; what a clearer photo would help with.' },
    confidence: CONFIDENCE
  },
  required: ['brand', 'model', 'caliber', 'scope', 'ammo', 'accessories', 'handedness', 'other', 'readable_fields', 'notes', 'confidence'], additionalProperties: false
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
  bow: `You identify archery equipment from one or more photos for a bowhunter's gear profile. Read brand and model names from labels, limb decals, riser stamps, and printed markings when legible. The named fields (brand, model, sight, rest, stabilizer, quiver, arrows) must contain SHORT PRODUCT NAMES ONLY, at most about six words; if a component's brand or model is not legible, leave that field an empty string and put the description (e.g. "cable-driven drop-away rest", "multi-pin round-housing sight") in \`other\`. Never write filler such as "none visible", "unknown", or "not legible" into a named field. List in readable_fields only the fields you actually read from text. Never invent a model name.`,
  rifle: `You identify a hunting rifle and its optics from photos for a hunter's gear profile. Read brand, model, caliber, scope, and ammunition only from legible markings (barrel stamp, receiver, turret caps, ammo box); otherwise describe what the shape suggests and say it is a guess. Leave a field as an empty string when nothing can be determined. Never invent a model or caliber that is not readable. Never comment on anything beyond identifying the equipment.`,
  form: `You are an experienced archery coach reviewing still frames taken from a short video of one shot. Give practical, encouraging, specific observations in plain language for a beginner bowhunter. Frame everything as observations from limited frames, not a diagnosis. Focus on the things that most affect consistent accuracy for hunting: stance, bow-arm and grip pressure, a smooth draw, a repeatable anchor, and a relaxed release with follow-through. If the archer is not clearly visible, say so and keep the advice general.`
};

export default async function handler(req, res) {
  const creds = resolveCredentials();
  if (!creds) return res.status(500).json({ error: 'AI_GATEWAY_API_KEY is not configured. Add your Vercel AI Gateway key as an environment variable and redeploy.', code: 'missing_api_key' });
  if (gate(req, res)) return;
  const body = req.body || {};
  const kind = String(body.kind || '');
  if (!['target', 'bow', 'rifle', 'form'].includes(kind)) return res.status(400).json({ error: 'kind must be "target", "bow", "rifle", or "form".', code: 'bad_kind' });

  // max_tokens must leave room for the model's thinking as well as the JSON answer
  let schema, content, maxTokens = 6000, effort = 'medium';
  if (kind === 'target') {
    const image = parseImageDataUrl(body.imageDataUrl);
    if (!image) return res.status(400).json({ error: 'A JPEG, PNG, GIF, or WebP target photo is required.', code: 'bad_image' });
    const width = Number(body.targetWidthIn) || 0, dist = Number(body.distanceYd) || 0, shot = Number(body.arrowsShot) || 0;
    schema = TARGET_SCHEMA;
    content = [imageBlock(image), { type: 'text', text: `Target face width: ${width ? `${width} inches` : 'unknown (estimate from context and say so)'}. Distance: ${dist ? `${dist} yards` : 'unknown'}. Arrows shot this end: ${shot || 'unknown'}. Analyze the group and return the JSON.` }];
  } else if (kind === 'bow') {
    const raw = Array.isArray(body.imageDataUrls) ? body.imageDataUrls : [body.imageDataUrl];
    const images = raw.map(parseImageDataUrl).filter(Boolean).slice(0, 6);
    if (!images.length) return res.status(400).json({ error: 'At least one JPEG, PNG, GIF, or WebP bow photo is required.', code: 'bad_image' });
    schema = BOW_SCHEMA;
    content = [
      { type: 'text', text: `${images.length} photo${images.length === 1 ? '' : 's'} of the same bow and its accessories follow.` },
      ...images.flatMap((img, i) => [{ type: 'text', text: `Photo ${i + 1} of ${images.length}:` }, imageBlock(img)]),
      { type: 'text', text: 'Identify the bow and accessories across all photos and return the JSON.' }
    ];
  } else if (kind === 'rifle') {
    const raw = Array.isArray(body.imageDataUrls) ? body.imageDataUrls : [body.imageDataUrl];
    const images = raw.map(parseImageDataUrl).filter(Boolean).slice(0, 6);
    if (!images.length) return res.status(400).json({ error: 'At least one JPEG, PNG, GIF, or WebP rifle photo is required.', code: 'bad_image' });
    schema = RIFLE_SCHEMA;
    content = [
      { type: 'text', text: `${images.length} photo${images.length === 1 ? '' : 's'} of the same rifle, its scope, and any ammo follow.` },
      ...images.flatMap((img, i) => [{ type: 'text', text: `Photo ${i + 1} of ${images.length}:` }, imageBlock(img)]),
      { type: 'text', text: 'Identify the rifle, scope, and ammunition across all photos and return the JSON.' }
    ];
  } else {
    const frames = Array.isArray(body.frames) ? body.frames.map(parseImageDataUrl).filter(Boolean) : [];
    if (frames.length < 2 || frames.length > 10) return res.status(400).json({ error: 'Between 2 and 10 JPEG/PNG frames are required.', code: 'bad_frames' });
    const view = String(body.view || 'unknown'), hand = String(body.handedness || 'unknown'), note = String(body.note || '').slice(0, 400);
    schema = FORM_SCHEMA; maxTokens = 12000; effort = 'medium';
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
