import useLang from '@/hooks/useLang';
import { company } from '@/lib/company';
import { getLocalizedPath } from '@/lib/routes';

export default function CompanyIdentity() {
  const lang = useLang();
  const en = lang === 'en';
  return <section className="py-8 bg-background-100 border-b border-background-200"><div className="container-main">
    <h2 className="text-lg font-bold mb-3">{en ? 'Company identity' : 'Thông tin doanh nghiệp'}</h2>
    <p className="text-sm font-semibold">{en ? company.nameEn : company.nameVi}</p>
    <p className="text-sm mt-2">{en ? 'Registered on 4 April 2024 · Business registration number: ' : 'Ngày đăng ký: 04/04/2024 · Mã số doanh nghiệp: '}{company.registrationNumber}</p>
    <p className="text-sm mt-2">{en ? company.addressEn : company.addressVi}</p>
    <div className="flex flex-wrap gap-4 mt-4 text-sm text-primary-700">
      <a className="underline" href={getLocalizedPath('verification',lang)}>{en ? 'Company Verification' : 'Xác minh doanh nghiệp'}</a>
      <a className="underline" href={getLocalizedPath('ai-product',lang)}>{en ? 'Product in development' : 'Sản phẩm đang phát triển'}</a>
      <a className="underline" href={`mailto:${company.email}`}>{company.email}</a>
    </div>
  </div></section>;
}
