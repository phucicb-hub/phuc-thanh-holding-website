import { useState } from 'react';
import { Navigate, Outlet, Link } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminSidebar from './AdminSidebar';
import ChangePasswordModal from './ChangePasswordModal';

export default function AdminLayout() {
  const { user, isAdmin, loading, signOut } = useAdminAuth();
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-100">
        <div className="flex flex-col items-center gap-3">
          <i className="ri-loader-4-line w-8 h-8 flex items-center justify-center text-primary-500 animate-spin" />
          <span className="text-sm text-foreground-600">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/dang-nhap" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-100 px-4">
        <div className="max-w-md w-full bg-background-50 rounded-xl p-8 text-center border border-background-200">
          <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-accent-100 text-primary-700 mb-4">
            <i className="ri-lock-line w-7 h-7 flex items-center justify-center" />
          </div>
          <h1 className="text-xl font-bold text-foreground-900 mb-2">Không có quyền truy cập</h1>
          <p className="text-sm text-foreground-600 mb-6">
            Tài khoản của bạn chưa được cấp quyền quản trị. Liên hệ người quản trị hệ thống nếu bạn cho rằng đây là nhầm lẫn.
          </p>
          <button
            type="button"
            onClick={() => signOut()}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 transition-colors whitespace-nowrap"
          >
            <i className="ri-logout-box-line w-4 h-4 flex items-center justify-center" />
            Đăng xuất
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background-100">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 shrink-0 flex items-center justify-between px-6 bg-background-50 border-b border-background-200">
          <div className="flex items-center gap-2 text-sm text-foreground-600">
            <i className="ri-calendar-line w-4 h-4 flex items-center justify-center" />
            <span className="whitespace-nowrap">Bảng điều khiển</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 text-xs font-bold">
                {(user.email?.[0] ?? 'A').toUpperCase()}
              </div>
              <span className="text-sm text-foreground-800 hidden sm:block">{user.email}</span>
            </div>
            <button
              type="button"
              onClick={() => setChangePasswordOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors whitespace-nowrap"
              title="Đổi mật khẩu cá nhân"
            >
              <i className="ri-key-2-line text-sm" />
              <span className="hidden sm:inline">Đổi mật khẩu</span>
            </button>
            <button
              type="button"
              onClick={() => signOut()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-foreground-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors whitespace-nowrap"
            >
              <i className="ri-logout-box-r-line w-4 h-4 flex items-center justify-center" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>

        <ChangePasswordModal
          isOpen={changePasswordOpen}
          onClose={() => setChangePasswordOpen(false)}
        />

        <footer className="px-6 py-3 text-xs text-foreground-500 border-t border-background-200 bg-background-50">
          <Link to="/" className="hover:text-primary-600 transition-colors whitespace-nowrap">
            Phúc Thành Holding — Hệ thống quản trị nội dung
          </Link>
        </footer>
      </div>
    </div>
  );
}