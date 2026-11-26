import { apiRequest } from '@/lib/api';

async function call<T>(payload: Record<string, unknown>): Promise<T> {
  const result = await apiRequest<{ data: T }>('/admin', payload);
  return result.data;
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
