import { useCallback, useEffect, useState } from 'react';
import { adminList } from '@/lib/adminApi';
import AdminLoadingState from '@/pages/admin/components/AdminLoadingState';
import AdminErrorState from '@/pages/admin/components/AdminErrorState';
import AdminEmptyState from '@/pages/admin/components/AdminEmptyState';

interface Contact { id: number; name: string; email: string; phone: string; organization: string; field: string; message: string; created_at: string }
export default function AdminContacts() {
  const [items,setItems] = useState<Contact[]>([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState('');
  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { setItems(await adminList<Contact>('contact_submissions')); }
    catch { setError('Không thể tải yêu cầu liên hệ.'); }
    finally { setLoading(false); }
  },[]);
  useEffect(() => { load(); },[load]);
  return <div>
    <h1 className="text-2xl font-bold mb-2">Yêu cầu liên hệ</h1>
    <p className="text-sm text-foreground-600 mb-6">Biểu mẫu được lưu tại máy chủ công ty. Việc lưu không tự động gửi email.</p>
    {error ? <AdminErrorState message={error} onRetry={load} /> : loading ? <AdminLoadingState /> : !items.length ? <AdminEmptyState icon="ri-mail-line" description="Chưa có yêu cầu liên hệ." /> : <div className="space-y-4">{items.map(item => <article key={item.id} className="bg-background-50 border border-background-200 rounded-xl p-5">
      <h2 className="font-semibold">#{item.id} — {item.name}</h2>
      <p className="text-sm mt-2">{item.email}{item.phone ? ` · ${item.phone}` : ''}</p>
      <p className="text-sm mt-2">{item.organization}{item.field ? ` · ${item.field}` : ''}</p>
      <p className="text-sm mt-3 whitespace-pre-wrap break-words">{item.message}</p>
      <time className="text-xs text-foreground-500 block mt-3">{new Intl.DateTimeFormat('vi-VN',{dateStyle:'short',timeStyle:'short'}).format(new Date(item.created_at))}</time>
    </article>)}</div>}
  </div>;
}
