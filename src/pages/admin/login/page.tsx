import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';

export default function AdminLogin() {
  const { user, isAdmin, signIn } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin', { replace: true });
    }
  }, [user, isAdmin, navigate]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-950 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-500 text-primary-950 mb-4">
            <i className="ri-shield-keyhole-line w-6 h-6 flex items-center justify-center" />
          </div>
          <h1 className="text-2xl font-bold text-white">Quản trị Phúc Thành Holding</h1>
          <p className="text-sm text-background-300 mt-1">Đăng nhập để quản lý nội dung website</p>
        </div>

        <div className="bg-background-50 rounded-xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-sm font-medium text-foreground-800 mb-1.5">
                Email
              </label>
              <input
                id="admin-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-md border border-background-300 bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
                placeholder="ban@phucthanhholding.com"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-foreground-800 mb-1.5">
                Mật khẩu
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-md border border-background-300 bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 rounded-md px-3 py-2.5">
                <i className="ri-error-warning-line w-4 h-4 flex items-center justify-center mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}


            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
            >
              {submitting && <i className="ri-loader-4-line w-4 h-4 flex items-center justify-center animate-spin" />}
              Đăng nhập
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-background-400 mt-6">
          Trang dành riêng cho quản trị viên
        </p>
      </div>
    </div>
  );
}
