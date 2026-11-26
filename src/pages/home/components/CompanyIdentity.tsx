import useLang from '@/hooks/useLang';
import { company } from '@/lib/company';
import { getLocalizedPath } from '@/lib/routes';

export default function CompanyIdentity() {
  const lang = useLang();
  const en = lang === 'en';
  return (
    <section className="py-12 bg-[#0c0e14] text-[#f5f5f7] border-y border-white/[0.08]">
      <div className="container-main max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-2xl apple-glass">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#00f0b5]" />
              <h2 className="text-base font-bold text-white tracking-wide uppercase">
                {en ? 'Legal Identity & Registration' : 'Pháp lý & Thông tin Đăng ký Doanh nghiệp'}
              </h2>
            </div>
            <p className="text-sm font-semibold text-white/95">{en ? company.nameEn : company.nameVi}</p>
            <p className="text-xs sm:text-sm text-[#8b949e] mt-1.5">
              {en ? 'Registered on 4 April 2024 · Enterprise Code / Tax ID: ' : 'Ngày cấp phép: 04/04/2024 · Mã số doanh nghiệp / MST: '}
              <span className="text-[#00f0b5] font-mono font-semibold">{company.registrationNumber}</span>
            </p>
            <p className="text-xs text-[#8b949e] mt-1">{en ? company.addressEn : company.addressVi}</p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs shrink-0">
            <a
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-[#00f0b5] hover:text-[#07080a] text-white font-medium transition-all"
              href={getLocalizedPath('verification', lang)}
            >
              {en ? 'Company Verification' : 'Xác minh doanh nghiệp'}
            </a>
            <a
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/90 border border-white/10 transition-all"
              href={`mailto:${company.email}`}
            >
              {company.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
