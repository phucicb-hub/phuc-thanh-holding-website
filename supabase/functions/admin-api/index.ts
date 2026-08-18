import { createClient } from 'jsr:@supabase/supabase-js@2';

function getCorsHeaders(origin: string | null, allowedOrigins: string[]) {
  const allowOrigin = origin && (allowedOrigins.length === 0 || allowedOrigins.includes(origin))
    ? origin
    : (allowedOrigins.length === 0 ? '*' : '');
  return {
    'Access-Control-Allow-Origin': allowOrigin || '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
}

const ALLOWED_TABLES = [
  'content_news',
  'content_projects',
  'content_products',
  'order_headers',
  'order_items',
];

const ALLOWED_FIELDS: Record<string, string[]> = {
  content_news: ['title','category','excerpt','date','image','content','tags','title_en','category_en','excerpt_en','content_en','tags_en'],
  content_projects: ['title','category','description','image','status','year','content','title_en','category_en','description_en','status_en','content_en'],
  content_products: ['category_id','slug','title','description','image','featured','date','features','title_en','description_en','features_en'],
  order_headers: ['status'],
  order_items: [],
};

function cleanData(table: string, input: Record<string, unknown>) {
  const allowed = ALLOWED_FIELDS[table] ?? [];
  const output = Object.fromEntries(Object.entries(input).filter(([key]) => allowed.includes(key)));
  if (Object.keys(output).length === 0) throw new Error('No permitted fields');
  for (const value of Object.values(output)) {
    if (typeof value === 'string' && value.length > 10000) throw new Error('Field too long');
    if (Array.isArray(value) && value.length > 100) throw new Error('Too many items');
  }
  if (table === 'order_headers' && !['new','confirmed','processing','completed','cancelled'].includes(String(output.status))) throw new Error('Invalid order status');
  return output;
}

function json(body: unknown, status = 200, cors: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');
  const allowedOrigins = (Deno.env.get('ALLOWED_ORIGINS') ?? '').split(',').map((value) => value.trim()).filter(Boolean);
  const cors = getCorsHeaders(origin, allowedOrigins);

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: cors });
  }

  if (origin && allowedOrigins.length === 0) return json({ error: 'Server origin policy is not configured' }, 503, cors);
  if (origin && allowedOrigins.length > 0 && !allowedOrigins.includes(origin)) return json({ error: 'Origin not allowed' }, 403, cors);
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405, cors);
  if (Number(req.headers.get('content-length') ?? 0) > 100_000) return json({ error: 'Request too large' }, 413, cors);

  const url = Deno.env.get('SUPABASE_URL') ?? '';
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
  const supabaseAdmin = createClient(url, serviceKey, {
    auth: { persistSession: false },
  });

  const authHeader = req.headers.get('Authorization') ?? '';
  const token = authHeader.replace('Bearer ', '');
  if (!token) return json({ error: 'Unauthorized' }, 401);

  const { data: authData, error: authError } = await supabaseAdmin.auth.getUser(token);
  const user = authData?.user;
  if (authError || !user) return json({ error: 'Unauthorized' }, 401);

  const adminUserId = (Deno.env.get('ADMIN_USER_ID') ?? '').trim();
  const adminEmail = (Deno.env.get('ADMIN_EMAIL') ?? '').trim().toLowerCase();
  const isAdmin = adminUserId ? user.id === adminUserId : Boolean(adminEmail && (user.email ?? '').toLowerCase() === adminEmail);

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const action = (body.action as string) ?? '';

  if (action === 'check') {
    return json({ isAdmin });
  }

  if (!isAdmin) return json({ error: 'Forbidden' }, 403);

  const table = (body.table as string) ?? '';
  const id = body.id as number | string | undefined;
  const data = (body.data as Record<string, unknown>) ?? {};

  if (!ALLOWED_TABLES.includes(table)) return json({ error: 'Invalid table' }, 400);

  try {
    if (action === 'list') {
      const { data: rows, error } = await supabaseAdmin.from(table).select('*').limit(500);
      if (error) return json({ error: error.message }, 400);
      return json({ data: rows });
    }
    if (action === 'stats') {
      const tables = ['content_news','content_projects','content_products','order_headers'];
      const counts = await Promise.all(tables.map((name) => supabaseAdmin.from(name).select('id', { count: 'exact', head: true })));
      if (counts.some((result) => result.error)) return json({ error: 'Unable to load statistics' }, 400);
      return json({ data: { news: counts[0].count ?? 0, projects: counts[1].count ?? 0, products: counts[2].count ?? 0, orders: counts[3].count ?? 0 } });
    }
    if (action === 'create') {
      const safeData = cleanData(table, data);
      const { data: row, error } = await supabaseAdmin
        .from(table)
        .insert(safeData)
        .select()
        .single();
      if (error) return json({ error: error.message }, 400);
      await supabaseAdmin.from('admin_audit_log').insert({ actor_id: user.id, action, resource: table, resource_id: row.id });
      return json({ data: row });
    }

    if (action === 'update') {
      if (!id || !/^\d+$/.test(String(id))) return json({ error: 'Invalid id' }, 400);
      const safeData = cleanData(table, data);
      const { data: row, error } = await supabaseAdmin
        .from(table)
        .update(safeData)
        .eq('id', id)
        .select()
        .single();
      if (error) return json({ error: error.message }, 400);
      await supabaseAdmin.from('admin_audit_log').insert({ actor_id: user.id, action, resource: table, resource_id: id });
      return json({ data: row });
    }

    if (action === 'remove') {
      if (!id || !/^\d+$/.test(String(id))) return json({ error: 'Invalid id' }, 400);
      const { error } = await supabaseAdmin.from(table).delete().eq('id', id);
      if (error) return json({ error: error.message }, 400);
      await supabaseAdmin.from('admin_audit_log').insert({ actor_id: user.id, action, resource: table, resource_id: id });
      return json({ data: { id } });
    }

    return json({ error: 'Invalid action' }, 400);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : 'Server error' }, 500);
  }
});
