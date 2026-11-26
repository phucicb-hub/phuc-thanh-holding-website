import useLang from '@/hooks/useLang';
import { company } from '@/lib/company';
import { getLocalizedPath } from '@/lib/routes';

export default function CompanyIdentity() {
  const lang = useLang();
  const en = lang === 'en';
  return (
    <section className="py-12 bg-white text-[#1d1d1f]">
      <div className="container-main max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-[#f8fafc] border border-gray-200/90 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#046842]" />
              <h2 className="text-sm sm:text-base font-bold text-[#1d1d1f] tracking-wide uppercase">
                {en ? 'Legal Identity & Registration' : 'Pháp lý & Thông tin Đăng ký Doanh nghiệp'}
              </h2>
            </div>
            <p className="text-sm sm:text-base font-bold text-[#046842]">{en ? company.nameEn : company.nameVi}</p>
            <p className="text-xs sm:text-sm text-[#4b5563] mt-1.5">
              {en ? 'Registered on 4 April 2024 · Enterprise Code / Tax ID: ' : 'Ngày cấp phép: 04/04/2024 · Mã số doanh nghiệp / MST: '}
              <span className="text-[#046842] font-mono font-bold">{company.registrationNumber}</span>
            </p>
            <p className="text-xs sm:text-sm text-[#4b5563] mt-1">{en ? company.addressEn : company.addressVi}</p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs shrink-0">
            <a
              className="px-4 py-2.5 rounded-xl bg-[#046842] hover:bg-[#025938] text-white font-bold transition-all shadow-sm"
              href={getLocalizedPath('verification', lang)}
            >
              {en ? 'Company Verification' : 'Xác minh doanh nghiệp'}
            </a>
            <a
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-gray-50 text-gray-700 font-semibold border border-gray-300 transition-all shadow-xs"
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
