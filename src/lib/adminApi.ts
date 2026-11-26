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

export interface AdminUserItem {
  id: number;
  email: string;
  role: 'owner' | 'admin' | 'editor' | 'reviewer';
  is_active: boolean;
  password_reset_at: string | null;
  created_at: string;
}

export async function adminGetUsers(): Promise<AdminUserItem[]> {
  const result = await apiRequest<{ data: AdminUserItem[] }>('/admin/users');
  return result.data;
}

export async function adminCreateUser(payload: {
  email: string;
  password: string;
  role: string;
}): Promise<AdminUserItem> {
  const result = await apiRequest<{ data: AdminUserItem }>('/admin/users', payload);
  return result.data;
}

export async function adminUpdateUser(
  id: number,
  payload: { role?: string; is_active?: boolean },
): Promise<AdminUserItem> {
  const response = await fetch(`/api/admin/users/${id}`, {
    method: 'PATCH',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.error || 'Không thể cập nhật người dùng.');
  return data.data;
}

export async function adminResetUserPassword(
  id: number,
  password: string,
): Promise<{ id: number; email: string }> {
  const result = await apiRequest<{ data: { id: number; email: string } }>(
    `/admin/users/${id}/reset-password`,
    { password },
  );
  return result.data;
}

export async function adminDeleteUser(id: number): Promise<{ ok: boolean; id: number }> {
  const response = await fetch(`/api/admin/users/${id}`, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.error || 'Không thể xóa người dùng.');
  return data;
}

export async function adminChangePassword(
  current_password: string,
  new_password: string,
): Promise<{ ok: boolean }> {
  const result = await apiRequest<{ ok: boolean }>('/auth/change-password', {
    current_password,
    new_password,
  });
  return result;
}

