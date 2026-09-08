import Anthropic from '@anthropic-ai/sdk';

// Shared Claude plumbing for the HUNT READY 30 serverless functions.
// Credentials (in order): AI_GATEWAY_API_KEY (Vercel AI Gateway, "vck_…"), ANTHROPIC_API_KEY (gateway key
// auto-detected by prefix, otherwise a direct Anthropic key), VERCEL_OIDC_TOKEN (gateway, provided by Vercel).

export const GATEWAY_BASE_URL = 'https://ai-gateway.vercel.sh';
export const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/webp']);
const FREE_TIER_FALLBACKS = ['anthropic/claude-sonnet-5', 'anthropic/claude-haiku-4.5'];

export function resolveCredentials() {
  const gatewayKey = (process.env.AI_GATEWAY_API_KEY || '').trim();
  const anthropicKey = (process.env.ANTHROPIC_API_KEY || '').trim();
  const oidcToken = (process.env.VERCEL_OIDC_TOKEN || '').trim();
  const modelOverride = (process.env.ANTHROPIC_MODEL || '').trim();
  let mode = '', key = '';
  if (gatewayKey) { mode = 'gateway'; key = gatewayKey; }
  else if (anthropicKey.startsWith('vck_')) { mode = 'gateway'; key = anthropicKey; }
  else if (anthropicKey) { mode = 'direct'; key = anthropicKey; }
  else if (oidcToken) { mode = 'gateway'; key = oidcToken; }
  if (!mode) return null;
  let model = modelOverride || 'claude-opus-5';
  if (mode === 'gateway' && !model.includes('/')) model = `anthropic/${model}`;
  if (mode === 'direct' && model.startsWith('anthropic/')) model = model.slice('anthropic/'.length);
  return { mode, key, model };
}

export function makeClient(creds) {
  return creds.mode === 'gateway'
    ? new Anthropic({ apiKey: creds.key, baseURL: GATEWAY_BASE_URL, maxRetries: 0 })
    : new Anthropic({ apiKey: creds.key });
}

export function parseImageDataUrl(value) {
  const match = /^data:(image\/[a-z0-9.+-]+);base64,([A-Za-z0-9+/=\s]+)$/i.exec(String(value || ''));
  if (!match) return null;
  const mediaType = match[1].toLowerCase();
  if (!ALLOWED_IMAGE_TYPES.has(mediaType)) return null;
  return { mediaType, data: match[2].replace(/\s+/g, '') };
}

export function imageBlock(image) {
  return { type: 'image', source: { type: 'base64', media_type: image.mediaType, data: image.data } };
}

export function providerDetails(error) {
  const body = error?.error;
  const inner = body?.error && typeof body.error === 'object' ? body.error : body;
  return { message: String(inner?.message || error?.message || 'AI request failed.'), type: String(inner?.type || '') };
}

export function mapProviderError(error, creds) {
  const { message, type } = providerDetails(error);
  const lower = message.toLowerCase();
  const gateway = creds.mode === 'gateway';
  if (Number(error?.status) === 402 || lower.includes('credit') || lower.includes('billing') || lower.includes('budget')) {
    return {
      status: 402,
      error: gateway
        ? (/free tier|not have access to this model|upgrade to paid/i.test(message)
            ? `The free AI Gateway tier does not include the model "${creds.model}" or its fallbacks. In Vercel, open AI Gateway and buy a small credit top-up.`
            : 'AI Gateway credits are used up. In Vercel, open AI Gateway and add credits, then try again.')
        : 'Anthropic API credits are exhausted (or billing is not set up). Add prepaid credits at console.anthropic.com → Settings → Billing, then try again.',
      code: 'insufficient_credits'
    };
  }
  if (error instanceof Anthropic.AuthenticationError) {
    return {
      status: 401,
      error: gateway
        ? 'Vercel AI Gateway rejected the key. In Vercel → Settings → Environment Variables, check AI_GATEWAY_API_KEY (it should start with vck_), then redeploy.'
        : 'Anthropic rejected the server API key. Check ANTHROPIC_API_KEY in Vercel → Settings → Environment Variables, then redeploy.',
      code: 'authentication_error'
    };
  }
  if (error instanceof Anthropic.PermissionDeniedError) return { status: 403, error: message, code: type || 'permission_error' };
  if (error instanceof Anthropic.NotFoundError) return { status: 404, error: `The AI provider could not find the requested model "${creds.model}". ${message}`, code: type || 'not_found_error' };
  if (error instanceof Anthropic.RateLimitError) return { status: 429, error: 'The AI service is rate-limited right now. Wait a moment and try again.', code: type || 'rate_limit_error' };
  if (error instanceof Anthropic.BadRequestError) return { status: 400, error: message, code: type || 'invalid_request_error' };
  if (error instanceof Anthropic.APIConnectionError) return { status: 502, error: 'The server could not reach the AI provider. Try again in a moment.', code: 'connection_error' };
  if (error instanceof Anthropic.APIError) {
    const status = Number(error.status) >= 500 ? 503 : Number(error.status) || 500;
    return { status, error: status === 503 ? 'The AI provider is busy or had an error. Try again in a moment.' : message, code: type || `http_${error.status}` };
  }
  return { status: 500, error: message || 'Analysis failed.', code: 'server_error' };
}

// CORS + method gate shared by every endpoint. Returns true when the request has been fully answered.
export function gate(req, res) {
  const allowed = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  const origin = req.headers.origin || '';
  if (!allowed.length) { res.status(500).json({ error: 'ALLOWED_ORIGINS is not configured.', code: 'missing_allowed_origins' }); return true; }
  if (origin && !allowed.includes(origin)) { res.status(403).json({ error: 'Origin not allowed.', code: 'origin_not_allowed' }); return true; }
  res.setHeader('Access-Control-Allow-Origin', origin || allowed[0]);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  if (req.method === 'OPTIONS') { res.status(204).end(); return true; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'POST only.', code: 'method_not_allowed' }); return true; }
  return false;
}

// Models occasionally double-escape characters inside JSON strings ("\\u2014", "\\n"), which survive JSON.parse
// as literal backslash sequences. Decode them so the app never shows "\u2014" where a dash belongs.
export function unescapeText(str) {
  return String(str)
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/\\n/g, '\n').replace(/\\t/g, ' ').replace(/\\"/g, '"').replace(/\\\//g, '/');
}
export function deepUnescape(value) {
  if (typeof value === 'string') return unescapeText(value);
  if (Array.isArray(value)) return value.map(deepUnescape);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, deepUnescape(v)]));
  return value;
}

const isModelAccessError = (error) => /free tier|not have access to this model|upgrade to paid/i.test(providerDetails(error).message);

// Run one vision request with schema-locked JSON output, falling back across models when the gateway's free tier
// blocks the primary model. Returns { ok:true, data, model, via } or { ok:false, status, body }.
export async function runVision({ creds, system, schema, content, maxTokens = 1024, effort = 'medium' }) {
  const client = makeClient(creds);
  const candidates = creds.mode === 'gateway' ? [creds.model, ...FREE_TIER_FALLBACKS.filter(m => m !== creds.model)] : [creds.model];
  const attempts = [];
  let response = null, usedModel = creds.model, lastError = null;
  try {
    for (const model of candidates) {
      try {
        response = await client.messages.create({
          model, max_tokens: maxTokens, system,
          output_config: { effort, format: { type: 'json_schema', schema } },
          messages: [{ role: 'user', content }]
        });
        usedModel = model; break;
      } catch (error) {
        attempts.push({ model, status: Number(error?.status) || 0, message: providerDetails(error).message });
        if (creds.mode === 'gateway' && isModelAccessError(error)) { lastError = error; continue; }
        throw error;
      }
    }
    if (!response) throw lastError;
    if (response.stop_reason === 'refusal') return { ok: false, status: 422, body: { error: 'The AI declined to analyze this image. Try a clearer photo of just the subject.', code: 'refusal' } };
    if (response.stop_reason === 'max_tokens') return { ok: false, status: 502, body: { error: 'The AI ran out of room before finishing its answer. Try again; if it repeats, use a shorter clip or fewer frames.', code: 'truncated', usage: response.usage } };
    const text = response.content.find(b => b.type === 'text')?.text;
    if (!text) return { ok: false, status: 502, body: { error: 'No text returned by AI.', code: 'empty_response' } };
    let data;
    try { data = JSON.parse(text); } catch { return { ok: false, status: 502, body: { error: 'AI returned text that was not valid JSON. Try again.', code: 'bad_ai_json' } }; }
    return { ok: true, data: deepUnescape(data), model: response.model || usedModel, via: creds.mode };
  } catch (error) {
    const mapped = mapProviderError(error, creds);
    return { ok: false, status: mapped.status, body: { error: mapped.error, code: mapped.code, detail: providerDetails(error).message, via: creds.mode, model: creds.model, attempts } };
  }
}
