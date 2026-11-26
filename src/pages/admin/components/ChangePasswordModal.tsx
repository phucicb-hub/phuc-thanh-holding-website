import { useState, type FormEvent } from 'react';
import { adminChangePassword } from '@/lib/adminApi';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ChangePasswordModal({ isOpen, onClose, onSuccess }: Props) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  function evaluateStrength(pwd: string): { label: string; score: number; color: string } {
    if (!pwd) return { label: 'Chưa nhập', score: 0, color: 'bg-gray-200' };
    let score = 0;
    if (pwd.length >= 14) score += 1;
    if (pwd.length >= 18) score += 1;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score += 1;
    if (/\d/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 2) return { label: 'Yếu (Cần tối thiểu 14 ký tự)', score: 20, color: 'bg-red-500' };
    if (score === 3) return { label: 'Trung bình', score: 50, color: 'bg-amber-500' };
    if (score === 4) return { label: 'Mạnh', score: 80, color: 'bg-blue-500' };
    return { label: 'Rất mạnh (Chuẩn bảo mật cao)', score: 100, color: 'bg-emerald-500' };
  }

  const strength = evaluateStrength(newPassword);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (newPassword.length < 14) {
      setError('Mật khẩu mới phải dài từ 14 ký tự trở lên theo chuẩn bảo mật.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    setLoading(true);
    try {
      await adminChangePassword(currentPassword, newPassword);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        onClose();
        if (onSuccess) onSuccess();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đổi mật khẩu thất bại.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-5 bg-[#f8fafc] border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#046842]/10 text-[#046842] flex items-center justify-center font-bold">
              <i className="ri-key-2-line text-lg" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Đổi Mật Khẩu Cá Nhân</h3>
              <p className="text-xs text-gray-500">Chuẩn bảo mật tài khoản ISO/OWASP</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <i className="ri-close-line text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
              <i className="ri-error-warning-line text-sm shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2">
              <i className="ri-checkbox-circle-line text-sm shrink-0" />
              <span>Đổi mật khẩu thành công!</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Mật khẩu hiện tại
            </label>
            <input
              type={showPasswords ? 'text' : 'password'}
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#046842] focus:border-transparent transition-all"
              placeholder="Nhập mật khẩu đang dùng"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Mật khẩu mới (tối thiểu 14 ký tự)
            </label>
            <input
              type={showPasswords ? 'text' : 'password'}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#046842] focus:border-transparent transition-all"
              placeholder="Ví dụ: PhucThanh@2026Secure!"
            />

            {newPassword && (
              <div className="mt-2 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-gray-500">
                  <span>Độ mạnh:</span>
                  <span className="font-semibold text-gray-700">{strength.label}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${strength.color} transition-all duration-300`}
                    style={{ width: `${strength.score}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Xác nhận mật khẩu mới
            </label>
            <input
              type={showPasswords ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#046842] focus:border-transparent transition-all"
              placeholder="Nhập lại mật khẩu mới"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-600">
              <input
                type="checkbox"
                checked={showPasswords}
                onChange={(e) => setShowPasswords(e.target.checked)}
                className="rounded text-[#046842] focus:ring-[#046842]"
              />
              <span>Hiển thị mật khẩu</span>
            </label>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2.5 text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={loading || success}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#046842] hover:bg-[#035133] active:scale-98 rounded-xl shadow-xs transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              {loading && <i className="ri-loader-4-line animate-spin" />}
              <span>{loading ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
