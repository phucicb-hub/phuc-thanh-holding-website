import { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';
interface AdminUser { id: number; email: string }
interface SessionResult { user: AdminUser | null }
const SESSION_EVENT = 'pth-session-change';
export function useAdminAuth() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    const refresh = () => {
      apiRequest<SessionResult>('/auth/session')
        .then(data => { if (active) setUser(data.user); })
        .catch(() => { if (active) setUser(null); })
        .finally(() => { if (active) setLoading(false); });
    };
    refresh();
    window.addEventListener(SESSION_EVENT, refresh);
    return () => { active = false; window.removeEventListener(SESSION_EVENT, refresh); };
  }, []);
  const signIn = async (email: string, password: string) => {
    const result = await apiRequest<SessionResult>('/auth/login', { email, password });
    setUser(result.user);
    window.dispatchEvent(new Event(SESSION_EVENT));
  };
  const signOut = async () => {
    await apiRequest('/auth/logout', {});
    setUser(null);
    window.dispatchEvent(new Event(SESSION_EVENT));
  };
  return { user, isAdmin: Boolean(user), loading, signIn, signOut };
}
