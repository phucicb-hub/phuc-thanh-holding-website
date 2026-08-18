import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function applySession(session: Session | null) {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (!currentUser) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const { data: res } = await supabase.functions.invoke('admin-api', {
          body: { action: 'check' },
        });
        if (mounted) setIsAdmin(res?.isAdmin === true);
      } catch {
        if (mounted) setIsAdmin(false);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) applySession(session);
    });

    supabase.auth.getSession().then(({ data: sessionData }) => {
      if (mounted) applySession(sessionData.session);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { user, isAdmin, loading, signIn, signOut };
}
