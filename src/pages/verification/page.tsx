import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import useLang from '@/hooks/useLang';
import { company } from '@/lib/company';

export default function CompanyVerification() {
  const en = useLang() === 'en';
  const facts = [
    [en ? 'Vietnamese legal name' : 'Tên pháp lý tiếng Việt', company.nameVi],
    [en ? 'English name' : 'Tên tiếng Anh', company.nameEn],
    [en ? 'Business registration / tax number' : 'Mã số doanh nghiệp / mã số thuế', company.registrationNumber],
    [en ? 'Date of establishment (registration date)' : 'Ngày thành lập (ngày cấp đăng ký)', en ? '4 April 2024 (2024-04-04)' : company.registrationDate],
    [en ? 'Legal representative' : 'Người đại diện theo pháp luật', company.representative],
    [en ? 'Headquarters' : 'Trụ sở', en ? company.addressEn : company.addressVi],
    [en ? 'Main industry' : 'Ngành nghề chính', en ? '5820 — Software publishing' : '5820 — Xuất bản phần mềm'],
    ['Website', 'https://phucthanhholding.com'],
    ['Email', company.email],
    [en ? 'General email' : 'Email chung', company.generalEmail],
    [en ? 'Phone' : 'Điện thoại', company.phone],
  ];
  return <div className="min-h-screen flex flex-col"><Navbar /><main className="flex-1 container-main py-16 max-w-4xl">
    <h1 className="text-3xl font-bold mb-6">{en ? 'Company Verification' : 'Xác minh doanh nghiệp'}</h1>
    <p className="mb-8 text-foreground-600">{en ? 'Company identity cross-checked against public reference sources on October 9, 2026. Original business registration documents have not yet been provided for comparison. This page is not a certification by a registration authority.' : 'Thông tin doanh nghiệp được đối chiếu với nguồn tra cứu công khai ngày 09/10/2026. Chưa có bản giấy đăng ký doanh nghiệp để đối chiếu bản gốc. Trang này không phải chứng nhận của cơ quan đăng ký.'}</p>
    <dl className="space-y-4">{facts.map(([label, value]) => <div key={label} className="border-b border-background-200 pb-4"><dt className="font-semibold">{label}</dt><dd className="mt-1 break-words">{value}</dd></div>)}</dl>
    <h2 className="text-xl font-bold mt-10 mb-3">{en ? 'Reference and verification documents' : 'Nguồn đối chiếu và tài liệu xác minh'}</h2>
    <p className="mb-4">{en ? 'The public business registration record lists 4 April 2024 as the registration date. The legal name, registration number, representative and current address above are cross-checked against that record.' : 'Hồ sơ tra cứu công khai ghi ngày cấp đăng ký là 04/04/2024. Tên pháp lý, mã số, người đại diện và địa chỉ hiện tại ở trên được đối chiếu với hồ sơ đó.'}</p>
    <a href={company.source} target="_blank" rel="noopener noreferrer" className="text-primary-700 underline">{en ? 'Public company record — Thu Vien Phap Luat' : 'Hồ sơ tra cứu công khai — Thư Viện Pháp Luật'}</a>
    <p className="mt-4">{en ? 'A redacted registration certificate has not been published. The company owner confirms that both email addresses can receive messages. Project, workforce and partnership figures are not provided here without supporting evidence.' : 'Chưa công bố bản đăng ký doanh nghiệp đã che thông tin nhạy cảm. Chủ doanh nghiệp xác nhận cả hai địa chỉ email có thể nhận thư. Không công bố số lượng dự án, nhân sự hoặc đối tác tại đây khi chưa có chứng cứ.'}</p>
    <p className="mt-6"><a className="text-primary-700 underline" href={`mailto:${company.email}`}>{en ? 'Contact for verification' : 'Liên hệ xác minh'}: {company.email}</a></p>
  </main><Footer /></div>;
}
