import { supabase } from '@/lib/supabase';

async function call<T>(payload: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke('admin-api', { body: payload });
  if (error) throw new Error(error.message);
  if (data?.error) throw new Error(data.error as string);
  return data?.data as T;
}

export function adminCreate<T = unknown>(table: string, data: Record<string, unknown>): Promise<T> {
  return call<T>({ action: 'create', table, data });
}

export function adminUpdate<T = unknown>(
  table: string,
  id: number,
  data: Record<string, unknown>,
): Promise<T> {
  return call<T>({ action: 'update', table, id, data });
}

export function adminRemove(table: string, id: number): Promise<{ id: number }> {
  return call<{ id: number }>({ action: 'remove', table, id });
}

export function adminList<T>(table: string): Promise<T[]> {
  return call<T[]>({ action: 'list', table });
}

export function adminStats<T>(): Promise<T> {
  return call<T>({ action: 'stats' });
}
