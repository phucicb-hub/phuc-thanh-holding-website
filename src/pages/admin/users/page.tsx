import { useState, useEffect, useCallback, type FormEvent } from 'react';
import {
  adminGetUsers,
  adminCreateUser,
  adminUpdateUser,
  adminResetUserPassword,
  adminDeleteUser,
  type AdminUserItem,
} from '@/lib/adminApi';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLoadingState from '@/pages/admin/components/AdminLoadingState';
import AdminErrorState from '@/pages/admin/components/AdminErrorState';

export default function AdminUsersPage() {
  const { user: currentUser } = useAdminAuth();
  const [users, setUsers] = useState<AdminUserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  // Modals state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUserItem | null>(null);
  const [resettingUser, setResettingUser] = useState<AdminUserItem | null>(null);
  const [deletingUser, setDeletingUser] = useState<AdminUserItem | null>(null);

  // Form states
  const [formEmail, setFormEmail] = useState('');
  const [formRole, setFormRole] = useState<'admin' | 'editor' | 'reviewer'>('editor');
  const [formPassword, setFormPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState('');

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await adminGetUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể tải danh sách người dùng.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  function triggerSuccess(msg: string) {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(''), 3000);
  }

  function generateSecurePassword() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*';
    let pwd = '';
    for (let i = 0; i < 16; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormPassword(pwd);
  }

  // Handle Create User
  async function handleCreateUser(e: FormEvent) {
    e.preventDefault();
    setModalError('');
    if (formPassword.length < 14) {
      setModalError('Mật khẩu phải từ 14 ký tự trở lên.');
      return;
    }
    setSubmitting(true);
    try {
      await adminCreateUser({
        email: formEmail,
        password: formPassword,
        role: formRole,
      });
      setCreateModalOpen(false);
      setFormEmail('');
      setFormPassword('');
      setFormRole('editor');
      triggerSuccess('Tạo người dùng mới thành công!');
      loadUsers();
    } catch (err) {
      setModalError(err instanceof Error ? err.message : 'Tạo người dùng thất bại.');
    } finally {
      setSubmitting(false);
    }
  }

  // Handle Update User (Role & Active status)
  async function handleUpdateUser(e: FormEvent) {
    e.preventDefault();
    if (!editingUser) return;
    setModalError('');
    setSubmitting(true);
    try {
      await adminUpdateUser(editingUser.id, {
        role: editingUser.role,
        is_active: editingUser.is_active,
      });
      setEditingUser(null);
      triggerSuccess('Cập nhật người dùng thành công!');
      loadUsers();
    } catch (err) {
      setModalError(err instanceof Error ? err.message : 'Cập nhật thất bại.');
    } finally {
      setSubmitting(false);
    }
  }

  // Handle Reset Password
  async function handleResetPassword(e: FormEvent) {
    e.preventDefault();
    if (!resettingUser) return;
    setModalError('');
    if (formPassword.length < 14) {
      setModalError('Mật khẩu phải từ 14 ký tự trở lên.');
      return;
    }
    setSubmitting(true);
    try {
      await adminResetUserPassword(resettingUser.id, formPassword);
      setResettingUser(null);
      setFormPassword('');
      triggerSuccess(`Đã đặt lại mật khẩu cho ${resettingUser.email}!`);
      loadUsers();
    } catch (err) {
      setModalError(err instanceof Error ? err.message : 'Đặt lại mật khẩu thất bại.');
    } finally {
      setSubmitting(false);
    }
  }

  // Handle Delete User
  async function handleDeleteUser() {
    if (!deletingUser) return;
    setSubmitting(true);
    try {
      await adminDeleteUser(deletingUser.id);
      setDeletingUser(null);
      triggerSuccess('Đã xóa người dùng thành công!');
      loadUsers();
    } catch (err) {
      triggerSuccess(err instanceof Error ? err.message : 'Xóa người dùng thất bại.');
    } finally {
      setSubmitting(false);
    }
  }

  function getRoleBadge(role: string) {
    switch (role) {
      case 'owner':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
            <i className="ri-vip-crown-line text-xs" /> Chủ sở hữu (Owner)
          </span>
        );
      case 'admin':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <i className="ri-shield-star-line text-xs" /> Quản trị viên (Admin)
          </span>
        );
      case 'editor':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            <i className="ri-edit-line text-xs" /> Biên tập viên (Editor)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
            <i className="ri-eye-line text-xs" /> Người kiểm duyệt (Reviewer)
          </span>
        );
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Quản Lý Người Dùng & Phân Quyền</h1>
          <p className="text-sm text-gray-500 mt-1">
            Kiểm soát danh tính, phân quyền RBAC và chính sách mật khẩu theo chuẩn quốc tế ISO 27001 / OWASP
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setFormEmail('');
            setFormPassword('');
            setFormRole('editor');
            setModalError('');
            generateSecurePassword();
            setCreateModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#046842] hover:bg-[#035133] rounded-xl shadow-xs transition-all active:scale-98 shrink-0"
        >
          <i className="ri-user-add-line text-sm" />
          <span>Thêm Người Dùng</span>
        </button>
      </div>

      {actionSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2.5 text-sm animate-in fade-in">
          <i className="ri-checkbox-circle-fill text-lg text-emerald-600 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {error ? (
        <AdminErrorState message={error} onRetry={loadUsers} />
      ) : loading ? (
        <AdminLoadingState />
      ) : (
        /* Users Directory Table */
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Tài khoản / Email</th>
                  <th className="py-3.5 px-6">Vai trò (Role)</th>
                  <th className="py-3.5 px-6">Trạng thái</th>
                  <th className="py-3.5 px-6">Ngày tạo</th>
                  <th className="py-3.5 px-6">Đổi MK cuối</th>
                  <th className="py-3.5 px-6 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {users.map((u) => {
                  const isSelf = currentUser?.id === u.id;
                  return (
                    <tr key={u.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#046842]/10 text-[#046842] flex items-center justify-center font-bold text-sm shrink-0">
                            {u.email.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 flex items-center gap-1.5">
                              <span>{u.email}</span>
                              {isSelf && (
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                                  Bạn
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-gray-400">ID: #{u.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">{getRoleBadge(u.role)}</td>
                      <td className="py-4 px-6">
                        {u.is_active ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Hoạt động
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            Đã khóa
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-xs text-gray-500">
                        {new Intl.DateTimeFormat('vi-VN', { dateStyle: 'short' }).format(new Date(u.created_at))}
                      </td>
                      <td className="py-4 px-6 text-xs text-gray-500">
                        {u.password_reset_at
                          ? new Intl.DateTimeFormat('vi-VN', { dateStyle: 'short', timeStyle: 'short' }).format(
                              new Date(u.password_reset_at),
                            )
                          : 'Chưa đổi'}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Sửa Role / Trạng thái */}
                          <button
                            type="button"
                            onClick={() => {
                              setEditingUser({ ...u });
                              setModalError('');
                            }}
                            className="p-1.5 text-gray-500 hover:text-[#046842] hover:bg-gray-100 rounded-lg transition-colors"
                            title="Chỉnh sửa vai trò & trạng thái"
                          >
                            <i className="ri-user-settings-line text-base" />
                          </button>

                          {/* Reset Mật khẩu */}
                          <button
                            type="button"
                            onClick={() => {
                              setResettingUser(u);
                              setModalError('');
                              generateSecurePassword();
                            }}
                            className="p-1.5 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                            title="Đặt lại mật khẩu cho người dùng"
                          >
                            <i className="ri-key-line text-base" />
                          </button>

                          {/* Xóa người dùng (không cho tự xóa) */}
                          {!isSelf && (
                            <button
                              type="button"
                              onClick={() => setDeletingUser(u)}
                              className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Xóa người dùng"
                            >
                              <i className="ri-delete-bin-line text-base" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Tạo Người Dùng Mới */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 bg-[#f8fafc] border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#046842]/10 text-[#046842] flex items-center justify-center font-bold">
                  <i className="ri-user-add-line text-lg" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Thêm Người Dùng Mới</h3>
                  <p className="text-xs text-gray-500">Phân quyền theo vai trò nhân sự</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className="w-8 h-8 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center"
              >
                <i className="ri-close-line text-xl" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-6 space-y-4">
              {modalError && (
                <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
                  <i className="ri-error-warning-line text-sm shrink-0" />
                  <span>{modalError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email tài khoản</label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="nhansu@phucthanhholding.com"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#046842]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Vai trò (Role)</label>
                <select
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#046842]"
                >
                  <option value="editor">Biên tập viên (Editor) — Quản lý tin tức, bài viết, sản phẩm</option>
                  <option value="admin">Quản trị viên (Admin) — Toàn quyền nội dung & quản lý người dùng</option>
                  <option value="reviewer">Người duyệt (Reviewer) — Xem và phê duyệt nội dung</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-gray-700">Mật khẩu khởi tạo</label>
                  <button
                    type="button"
                    onClick={generateSecurePassword}
                    className="text-xs text-[#046842] font-semibold hover:underline flex items-center gap-1"
                  >
                    <i className="ri-refresh-line" /> Sinh ngẫu nhiên
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  placeholder="Mật khẩu tối thiểu 14 ký tự"
                  className="w-full px-3.5 py-2.5 text-sm font-mono rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#046842]"
                />
                <p className="text-[11px] text-gray-400 mt-1">Gợi ý: Hãy sao chép mật khẩu này và gửi an toàn cho người dùng.</p>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  disabled={submitting}
                  className="px-4 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#046842] hover:bg-[#035133] rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  {submitting && <i className="ri-loader-4-line animate-spin" />}
                  <span>{submitting ? 'Đang tạo...' : 'Tạo tài khoản'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Sửa Vai Trò & Trạng Thái */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 bg-[#f8fafc] border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900">Chỉnh Sửa Người Dùng</h3>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="w-8 h-8 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center"
              >
                <i className="ri-close-line text-xl" />
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="p-6 space-y-4">
              {modalError && (
                <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl">
                  {modalError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tài khoản</label>
                <div className="text-sm font-semibold text-gray-900 bg-gray-50 px-3.5 py-2.5 rounded-xl border border-gray-200">
                  {editingUser.email}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Vai trò (Role)</label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#046842]"
                >
                  <option value="editor">Biên tập viên (Editor)</option>
                  <option value="admin">Quản trị viên (Admin)</option>
                  <option value="reviewer">Người duyệt (Reviewer)</option>
                  {editingUser.role === 'owner' && <option value="owner">Chủ sở hữu (Owner)</option>}
                </select>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingUser.is_active}
                    disabled={currentUser?.id === editingUser.id}
                    onChange={(e) => setEditingUser({ ...editingUser, is_active: e.target.checked })}
                    className="w-4 h-4 rounded text-[#046842] focus:ring-[#046842]"
                  />
                  <div>
                    <span className="text-xs font-semibold text-gray-900 block">Kích hoạt tài khoản</span>
                    <span className="text-[11px] text-gray-500 block">
                      Khi bỏ chọn, tài khoản sẽ bị khóa và đăng xuất khỏi mọi thiết bị tức thì.
                    </span>
                  </div>
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  disabled={submitting}
                  className="px-4 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#046842] hover:bg-[#035133] rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  {submitting && <i className="ri-loader-4-line animate-spin" />}
                  <span>{submitting ? 'Đang lưu...' : 'Lưu thay đổi'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Đặt Lại Mật Khẩu (Reset Password) */}
      {resettingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 bg-[#f8fafc] border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className="ri-key-line text-amber-600 text-lg" />
                <h3 className="text-base font-bold text-gray-900">Đặt Lại Mật Khẩu</h3>
              </div>
              <button
                type="button"
                onClick={() => setResettingUser(null)}
                className="w-8 h-8 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center"
              >
                <i className="ri-close-line text-xl" />
              </button>
            </div>

            <form onSubmit={handleResetPassword} className="p-6 space-y-4">
              {modalError && (
                <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl">
                  {modalError}
                </div>
              )}

              <p className="text-xs text-gray-600">
                Bạn đang đặt lại mật khẩu cho tài khoản: <strong className="text-gray-900">{resettingUser.email}</strong>.
                Sau khi đặt lại, các phiên đăng nhập cũ của người dùng này sẽ bị hủy.
              </p>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-gray-700">Mật khẩu mới</label>
                  <button
                    type="button"
                    onClick={generateSecurePassword}
                    className="text-xs text-[#046842] font-semibold hover:underline flex items-center gap-1"
                  >
                    <i className="ri-refresh-line" /> Sinh ngẫu nhiên
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  placeholder="Mật khẩu tối thiểu 14 ký tự"
                  className="w-full px-3.5 py-2.5 text-sm font-mono rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#046842]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setResettingUser(null)}
                  disabled={submitting}
                  className="px-4 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  {submitting && <i className="ri-loader-4-line animate-spin" />}
                  <span>{submitting ? 'Đang cập nhật...' : 'Xác nhận đặt lại'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Xác Nhận Xóa Người Dùng */}
      {deletingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto text-xl">
              <i className="ri-error-warning-line" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-gray-900">Xác Nhận Xóa Tài Khoản</h3>
              <p className="text-xs text-gray-500 mt-1">
                Bạn có chắc chắn muốn xóa tài khoản <strong className="text-gray-800">{deletingUser.email}</strong>? Hành động này không thể hoàn tác.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDeletingUser(null)}
                disabled={submitting}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleDeleteUser}
                disabled={submitting}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-xs transition-all"
              >
                {submitting ? 'Đang xóa...' : 'Xóa vĩnh viễn'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
