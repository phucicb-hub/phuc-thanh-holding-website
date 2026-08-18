import { createClient } from 'jsr:@supabase/supabase-js@2';

const text = (value: unknown, max: number) => typeof value === 'string' ? value.trim().slice(0, max) : '';

function getCors(origin: string | null, allowedOrigins: string[]) {
  const allowOrigin = origin && (allowedOrigins.length === 0 || allowedOrigins.includes(origin))
    ? origin
    : (allowedOrigins.length === 0 ? '*' : '');
  return {
    'Access-Control-Allow-Origin': allowOrigin || '*',
    'Access-Control-Allow-Headers': 'apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');
  const allowedOrigins = (Deno.env.get('ALLOWED_ORIGINS') ?? '').split(',').map((value) => value.trim()).filter(Boolean);
  const corsHeaders = getCors(origin, allowedOrigins);
  const reply = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: corsHeaders });

  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (origin && allowedOrigins.length === 0) return reply({ error: 'Server origin policy is not configured' }, 503);
  if (origin && allowedOrigins.length > 0 && !allowedOrigins.includes(origin)) return reply({ error: 'Origin not allowed' }, 403);
  if (req.method !== 'POST') return reply({ error: 'Method not allowed' }, 405);
  if (Number(req.headers.get('content-length') ?? 0) > 20_000) return reply({ error: 'Request too large' }, 413);
  const body = await req.json().catch(() => ({})) as Record<string, unknown>;
  if (text(body.company_alt, 100)) return reply({ ok: true });
  const name = text(body.name, 120), email = text(body.email, 254).toLowerCase(), message = text(body.message, 2000);
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || body.consent !== true) return reply({ error: 'Invalid submission' }, 400);
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${ip}:${Deno.env.get('CONTACT_RATE_SALT') ?? ''}`));
  const ipHash = Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
  const db = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '', { auth: { persistSession: false } });
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await db.from('contact_submissions').select('id', { count: 'exact', head: true }).eq('ip_hash', ipHash).gte('created_at', since);
  if ((count ?? 0) >= 5) return reply({ error: 'Too many submissions' }, 429);
  const { error } = await db.from('contact_submissions').insert({ name, email, phone: text(body.phone, 30) || null, organization: text(body.organization, 160) || null, field: text(body.field, 160) || null, message, language: text(body.submitted_language, 20), ip_hash: ipHash });
  return error ? reply({ error: 'Unable to save submission' }, 500) : reply({ ok: true }, 201);
});
