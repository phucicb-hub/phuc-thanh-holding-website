import { useCallback, useEffect, useMemo, useState } from 'react';
import { adminList, adminUpdate } from '@/lib/adminApi';
import AdminLoadingState from '@/pages/admin/components/AdminLoadingState';
import AdminEmptyState from '@/pages/admin/components/AdminEmptyState';
import AdminErrorState from '@/pages/admin/components/AdminErrorState';

const STATUSES = ['new', 'confirmed', 'processing', 'completed', 'cancelled'] as const;
type OrderStatus = (typeof STATUSES)[number];

interface OrderRecord {
  id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  total_amount: number;
  currency: string;
  status: OrderStatus;
  created_at: string;
}

const STATUS_LABELS: Record<OrderStatus, string> = {
  new: 'Mới', confirmed: 'Đã xác nhận', processing: 'Đang xử lý', completed: 'Hoàn thành', cancelled: 'Đã hủy',
};

export default function AdminOrders() {
  const [items, setItems] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [savingId, setSavingId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const data = await adminList<OrderRecord>('order_headers');
      setItems(data.sort((a,b) => b.created_at.localeCompare(a.created_at)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể tải danh sách đơn hàng.');
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((item) => !q || item.customer_name.toLowerCase().includes(q) || item.customer_email.toLowerCase().includes(q) || item.customer_phone?.includes(q) || String(item.id).includes(q));
  }, [items, search]);

  async function updateStatus(item: OrderRecord, status: OrderStatus) {
    setSavingId(item.id); setError('');
    try {
      await adminUpdate('order_headers', item.id, { status });
      setItems((current) => current.map((order) => order.id === item.id ? { ...order, status } : order));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể cập nhật trạng thái đơn hàng.');
    } finally { setSavingId(null); }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground-900 mb-1">Đơn hàng</h1>
      <p className="text-sm text-foreground-600 mb-6">Quản lý đơn hàng của khách hàng.</p>
      <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Tìm theo mã đơn, tên, email hoặc số điện thoại..." className="w-full mb-5 px-3 py-2 text-sm rounded-md border border-background-300 bg-background-50 focus:outline-none focus:ring-2 focus:ring-primary-400" />
      <div className="bg-background-50 border border-background-200 rounded-xl overflow-hidden">
        {error ? <AdminErrorState message={error} onRetry={load} /> : loading ? <AdminLoadingState /> : filtered.length === 0 ? <AdminEmptyState icon="ri-shopping-cart-line" description="Chưa có đơn hàng phù hợp." /> : (
          <div className="overflow-x-auto"><table className="w-full text-sm">
            <thead><tr className="border-b border-background-200 text-left text-xs uppercase tracking-wide text-foreground-500"><th className="px-5 py-3">Mã đơn</th><th className="px-5 py-3">Khách hàng</th><th className="px-5 py-3">Tổng tiền</th><th className="px-5 py-3">Ngày tạo</th><th className="px-5 py-3">Trạng thái</th></tr></thead>
            <tbody>{filtered.map((item) => <tr key={item.id} className="border-b border-background-100 last:border-0">
              <td className="px-5 py-4 font-semibold">#{item.id}</td>
              <td className="px-5 py-4"><div className="font-medium">{item.customer_name}</div><div className="text-xs text-foreground-500">{item.customer_email}{item.customer_phone ? ` · ${item.customer_phone}` : ''}</div></td>
              <td className="px-5 py-4 whitespace-nowrap">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: item.currency || 'VND' }).format(item.total_amount)}</td>
              <td className="px-5 py-4 whitespace-nowrap">{new Intl.DateTimeFormat('vi-VN', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(item.created_at))}</td>
              <td className="px-5 py-4"><select value={item.status} disabled={savingId === item.id} onChange={(event) => updateStatus(item, event.target.value as OrderStatus)} className="px-2 py-1.5 rounded-md border border-background-300 bg-background-50 disabled:opacity-60">{STATUSES.map((status) => <option key={status} value={status}>{STATUS_LABELS[status]}</option>)}</select></td>
            </tr>)}</tbody>
          </table></div>
        )}
      </div>
    </div>
  );
}
