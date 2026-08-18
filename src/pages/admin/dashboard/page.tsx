import { useEffect, useState } from 'react';
import { adminStats } from '@/lib/adminApi';
import AdminLoadingState from '@/pages/admin/components/AdminLoadingState';
import AdminErrorState from '@/pages/admin/components/AdminErrorState';

interface Stats {
  news: number;
  projects: number;
  products: number;
  orders: number;
}

const statCards = [
  { key: 'news' as const, label: 'Tin tức', icon: 'ri-newspaper-line', tint: 'bg-primary-100 text-primary-700' },
  { key: 'projects' as const, label: 'Dự án', icon: 'ri-briefcase-line', tint: 'bg-accent-100 text-accent-700' },
  { key: 'products' as const, label: 'Sản phẩm', icon: 'ri-box-3-line', tint: 'bg-secondary-100 text-secondary-700' },
  { key: 'orders' as const, label: 'Đơn hàng', icon: 'ri-shopping-cart-line', tint: 'bg-foreground-100 text-foreground-700' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ news: 0, projects: 0, products: 0, orders: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load() {
    setLoading(true);
    setError('');
    try {
      setStats(await adminStats<Stats>());
    } catch {
      setError('Không thể tải dữ liệu thống kê.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground-900 mb-1">Tổng quan</h1>
        <p className="text-sm text-foreground-600">Thống kê nội dung và hoạt động của website.</p>
      </div>

      {error ? (
        <div className="bg-background-50 border border-background-200 rounded-xl overflow-hidden">
          <AdminErrorState message={error} onRetry={load} />
        </div>
      ) : loading ? (
        <div className="bg-background-50 border border-background-200 rounded-xl overflow-hidden">
          <AdminLoadingState />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <div
              key={card.key}
              className="bg-background-50 border border-background-200 rounded-xl p-5 flex items-center gap-4"
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${card.tint}`}>
                <i className={`${card.icon} w-6 h-6 flex items-center justify-center`} />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground-900">{stats[card.key]}</div>
                <div className="text-xs text-foreground-600">{card.label}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 bg-background-50 border border-background-200 rounded-xl p-6">
        <h2 className="text-base font-semibold text-foreground-900 mb-2">Bắt đầu</h2>
        <p className="text-sm text-foreground-600 leading-relaxed">
          Chọn một mục từ thanh bên trái để quản lý <strong>Tin tức</strong>, <strong>Dự án</strong>,{' '}
          <strong>Sản phẩm</strong> hoặc <strong>Đơn hàng</strong>. Bạn có thể thêm, chỉnh sửa và xóa nội dung trực tiếp tại đây.
        </p>
      </div>
    </div>
  );
}
