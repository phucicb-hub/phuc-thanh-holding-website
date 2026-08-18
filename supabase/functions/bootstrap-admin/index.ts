const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };
Deno.serve(() => new Response(JSON.stringify({ error: 'Admin bootstrap is disabled. Use the Supabase Dashboard or a trusted CLI session.' }), { status: 410, headers }));
