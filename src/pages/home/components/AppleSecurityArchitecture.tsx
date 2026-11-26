import useLang from '@/hooks/useLang';

export default function AppleSecurityArchitecture() {
  const lang = useLang();
  const isVi = lang === 'vi';

  return (
    <section
      id="bao-mat"
      data-sc-act="flow"
      className="py-24 sm:py-32 bg-white text-[#1d1d1f] border-t border-gray-200/80 relative overflow-hidden"
    >
      {/* Visual lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[450px] bg-[#046842]/5 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-[#f59e0b]/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="container-main max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#046842]/8 border border-[#046842]/20 mb-4">
            <i className="ri-shield-check-fill text-[#046842]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#046842]">
              {isVi ? 'Tiêu Chuẩn Apple-Grade' : 'Apple-Grade Engineering'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-6">
            {isVi
              ? 'Bảo Mật Bất Khả Xâm Phạm & Kiến Trúc Hiện Đại'
              : 'Sovereign Security & Modern Architecture'}
          </h2>
          <p className="text-[#4b5563] text-base sm:text-lg">
            {isVi
              ? 'Áp dụng mô hình phòng thủ theo chiều sâu (Defense-in-Depth) với các nguyên tắc bảo mật thông tin và quyền riêng tư (Privacy-by-Design) tương đương các tập đoàn công nghệ hàng đầu thế giới.'
              : 'Built upon Defense-in-Depth and Privacy-by-Design principles matching global technology leaders.'}
          </p>
        </div>

        {/* 4 Architecture & Security Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Pillar 1 */}
          <div
            data-sc-tilt="5"
            data-sc-spotlight
            className="p-8 sm:p-10 rounded-3xl bg-[#fbfbfd] border border-gray-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300 relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#046842]/10 border border-[#046842]/20 flex items-center justify-center text-[#046842] mb-6">
              <i className="ri-lock-password-line text-2xl" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1d1d1f] mb-3">
              {isVi ? 'Zero-Trust & Cách Ly Dữ Liệu Tuyệt Đối' : 'Zero-Trust Network & Data Sandboxing'}
            </h3>
            <p className="text-[#4b5563] text-sm sm:text-base leading-relaxed mb-6">
              {isVi
                ? 'Không mặc định tin cậy bất kỳ điểm truy cập nào. Toàn bộ yêu cầu qua API đều phải xác thực token đa nhân tố, phân quyền theo vai trò (RBAC) và lưu nhật ký kiểm toán bất biến (Audit Logging).'
                : 'Never trust, always verify. Every internal request enforces strict token claims, RBAC privileges, and immutable audit trails.'}
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700 border-t border-gray-200 pt-4">
              <li className="flex items-center gap-2">
                <i className="ri-checkbox-circle-fill text-[#046842]" />
                <span>{isVi ? 'Mã hóa AES-256 (At-Rest) & TLS 1.3 (In-Transit)' : 'AES-256 at-rest and TLS 1.3 in-transit'}</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="ri-checkbox-circle-fill text-[#046842]" />
                <span>{isVi ? 'Bảo vệ chống rò rỉ biến môi trường và khóa bí mật' : 'Zero runtime secret exposure on client bundles'}</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div
            data-sc-tilt="5"
            data-sc-spotlight
            className="p-8 sm:p-10 rounded-3xl bg-[#fbfbfd] border border-gray-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300 relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-600 mb-6">
              <i className="ri-radar-line text-2xl" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1d1d1f] mb-3">
              {isVi ? 'Content Security Policy (CSP) & Chống Clickjacking' : 'Hardened Web Surface & Strict CSP'}
            </h3>
            <p className="text-[#4b5563] text-sm sm:text-base leading-relaxed mb-6">
              {isVi
                ? 'Tiêu chuẩn HTTP Security Headers nghiêm ngặt chặn đứng hoàn toàn các cuộc tấn công XSS, CSRF, Clickjacking và giả mạo tài nguyên thông qua chính sách bảo mật nội dung chặt chẽ.'
                : 'Enterprise HTTP security headers strictly defuse XSS, CSRF, MIME-sniffing, and frame hijacking.'}
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700 border-t border-gray-200 pt-4">
              <li className="flex items-center gap-2">
                <i className="ri-checkbox-circle-fill text-blue-600" />
                <span>{isVi ? 'X-Frame-Options: DENY & Strict Referrer Policy' : 'X-Frame-Options: DENY & Strict Referrer'}</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="ri-checkbox-circle-fill text-blue-600" />
                <span>{isVi ? 'Ngăn chặn thực thi script ngoại lai không an toàn' : 'Strict inline script and style sandbox execution'}</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div
            data-sc-tilt="5"
            data-sc-spotlight
            className="p-8 sm:p-10 rounded-3xl bg-[#fbfbfd] border border-gray-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300 relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#d97706]/10 border border-[#d97706]/20 flex items-center justify-center text-[#d97706] mb-6">
              <i className="ri-speed-up-line text-2xl" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1d1d1f] mb-3">
              {isVi ? 'Tốc Độ Tức Thì & SSG Prerendering' : 'Sub-Second Edge Rendering & SSG'}
            </h3>
            <p className="text-[#4b5563] text-sm sm:text-base leading-relaxed mb-6">
              {isVi
                ? 'Website được tiền kết xuất (Static Site Generation / Prerender) thành mã HTML tĩnh, tối ưu hóa kích thước file tải về, mang lại tốc độ hiển thị dưới 0.5s và điểm số SEO hoàn hảo.'
                : 'Pre-rendered static HTML with fine-tuned asset bundling, achieving sub-0.5s first contentful paint and pristine SEO indexability.'}
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700 border-t border-gray-200 pt-4">
              <li className="flex items-center gap-2">
                <i className="ri-checkbox-circle-fill text-[#d97706]" />
                <span>{isVi ? 'Google Core Web Vitals loại Xuất sắc' : 'Excellent Core Web Vitals score (LCP, CLS, INP)'}</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="ri-checkbox-circle-fill text-[#d97706]" />
                <span>{isVi ? 'Tối ưu hóa hình ảnh chuẩn định dạng WebP thế hệ mới' : 'Native WebP compression with zero layout shift'}</span>
              </li>
            </ul>
          </div>

          {/* Pillar 4 */}
          <div
            data-sc-tilt="5"
            data-sc-spotlight
            className="p-8 sm:p-10 rounded-3xl bg-[#fbfbfd] border border-gray-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300 relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-600/10 border border-purple-600/20 flex items-center justify-center text-purple-600 mb-6">
              <i className="ri-database-2-line text-2xl" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1d1d1f] mb-3">
              {isVi ? 'Quản Trị Dữ Liệu Chuẩn GDPR & ISO 27001' : 'GDPR & ISO 27001 Readiness'}
            </h3>
            <p className="text-[#4b5563] text-sm sm:text-base leading-relaxed mb-6">
              {isVi
                ? 'Hệ thống tuân thủ chính sách bảo vệ dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP của Chính phủ Việt Nam và tiệm cận tiêu chuẩn bảo mật dữ liệu quốc tế.'
                : 'Fully compliant with Vietnam Personal Data Protection Decree 13/2023/ND-CP and international privacy benchmarks.'}
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700 border-t border-gray-200 pt-4">
              <li className="flex items-center gap-2">
                <i className="ri-checkbox-circle-fill text-purple-600" />
                <span>{isVi ? 'Cơ chế lưu trữ và tự động xóa dữ liệu định kỳ' : 'Configurable automated data retention policies'}</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="ri-checkbox-circle-fill text-purple-600" />
                <span>{isVi ? 'Quyền kiểm soát và yêu cầu trích xuất dữ liệu minh bạch' : 'Transparent data sovereignty and portability'}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
