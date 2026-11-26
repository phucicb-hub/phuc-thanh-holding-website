import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';

export default function AiProduct() {
  const lang = useLang();
  const en = lang === 'en';
  return <div className="min-h-screen flex flex-col"><Navbar /><main className="flex-1 container-main py-16 max-w-4xl">
    <h1 className="text-3xl font-bold mb-6">{en ? 'AI Products & Development' : 'Sản phẩm AI và tình trạng phát triển'}</h1>
    <h2 className="text-xl font-bold mb-3">{en ? 'Online shop — In Development' : 'Cửa hàng trực tuyến — đang phát triển'}</h2>
    <p className="font-semibold text-primary-700 mb-4">{en ? 'Claude API: planned, not yet integrated. No operational AI MVP is claimed.' : 'Claude API: dự kiến tích hợp, chưa triển khai. Chưa công bố MVP AI hoạt động.'}</p>
    <p className="mb-8">{en ? 'Phuc Thanh Holding is building an online shop at shop.phucthanhholding.com. Development is in progress, as confirmed by the company owner on October 9, 2026.' : 'Phúc Thành Holding đang xây dựng cửa hàng trực tuyến tại shop.phucthanhholding.com. Tình trạng đang phát triển được chủ doanh nghiệp xác nhận ngày 09/10/2026.'}</p>
    <p className="mb-8">{en ? 'Project domain: ' : 'Tên miền dự án: '}<a href="https://shop.phucthanhholding.com" className="text-primary-700 underline">shop.phucthanhholding.com</a>. {en ? 'This identifies the development project; public availability has not been verified.' : 'Đây là tên miền của dự án đang phát triển; chưa xác minh khả năng truy cập công khai.'}</p>
    <h2 className="text-xl font-bold mb-3">{en ? 'Current evidence' : 'Dữ kiện hiện có'}</h2>
    <p>{en ? 'The confirmed project is an online shop under construction. AI functionality, a working demo, customer usage and commercial availability have not yet been documented. The shop is not presented as a released AI product.' : 'Dự án đã xác nhận là cửa hàng trực tuyến đang xây dựng. Chưa có tài liệu xác nhận chức năng AI, demo hoạt động, khách hàng sử dụng hoặc tình trạng kinh doanh chính thức. Chưa công bố shop là sản phẩm AI đã phát hành.'}</p>
    <h2 className="text-xl font-bold mt-8 mb-3">{en ? 'Development and Claude usage status' : 'Tình trạng phát triển và sử dụng Claude'}</h2>
    <p>{en ? 'Development stage: under construction. The company plans to integrate the Claude API as a shop assistant answering questions based on the product catalog and shop policies. The API integration has not been implemented. No Anthropic partnership or approval is claimed.' : 'Giai đoạn phát triển: đang xây dựng. Công ty dự kiến tích hợp Claude API làm trợ lý giải đáp dựa trên danh mục sản phẩm và chính sách shop. Chưa thực hiện tích hợp API. Chưa công bố quan hệ đối tác hoặc việc được Anthropic phê duyệt.'}</p>
    <h2 className="text-xl font-bold mt-8 mb-3">{en ? 'Planned assistant workflow' : 'Quy trình trợ lý dự kiến'}</h2>
    <p>{en ? 'A visitor asks a question. The planned backend supplies relevant, approved catalog and policy information to Claude. The assistant provides an answer grounded in that information and refers questions it cannot resolve to a human contact. This is the intended design, not a demonstration of a live feature.' : 'Khách truy cập đặt câu hỏi. Backend dự kiến cung cấp thông tin danh mục và chính sách đã được duyệt, phù hợp với câu hỏi cho Claude. Trợ lý trả lời dựa trên thông tin đó và chuyển câu hỏi chưa giải đáp được tới đầu mối con người. Đây là thiết kế dự kiến, chưa phải tính năng đang hoạt động.'}</p>
    <h2 className="text-xl font-bold mt-8 mb-3">{en ? 'Implementation milestones' : 'Các mốc triển khai'}</h2>
    <ul className="list-disc pl-6 space-y-2">
      <li>{en ? 'Prepare the actual catalog and approved policies.' : 'Chuẩn bị danh mục thực tế và chính sách đã được duyệt.'}</li>
      <li>{en ? 'Build the backend integration and a private test interface.' : 'Xây dựng tích hợp backend và giao diện thử nghiệm nội bộ.'}</li>
      <li>{en ? 'Evaluate answers against source information, privacy controls and human handoff before public release.' : 'Đánh giá câu trả lời với nguồn dữ liệu, kiểm soát riêng tư và chuyển tiếp cho con người trước khi phát hành.'}</li>
    </ul>
    <h2 className="text-xl font-bold mt-8 mb-3">{en ? 'Information needed for a complete product profile' : 'Thông tin cần để hoàn thiện hồ sơ sản phẩm'}</h2>
    <ul className="list-disc pl-6 space-y-2">
      <li>{en ? 'A real workflow and demo showing implemented functionality.' : 'Quy trình sử dụng thực tế và demo thể hiện tính năng đã làm.'}</li>
      <li>{en ? 'Claude role, input data, output and human review responsibilities.' : 'Vai trò của Claude, dữ liệu đầu vào, đầu ra và trách nhiệm duyệt của con người.'}</li>
      <li>{en ? 'Access controls, data retention, consent and handling of sensitive information.' : 'Phân quyền, thời gian lưu dữ liệu, sự đồng ý và cách xử lý thông tin nhạy cảm.'}</li>
    </ul>
    <a href={getLocalizedPath('technology', lang)} className="block mt-8 text-primary-700 underline">{en ? 'Technology and planned integration' : 'Công nghệ và kế hoạch tích hợp'}</a>
    <a href={getLocalizedPath('contact', lang)} className="inline-block mt-8 text-primary-700 underline">{en ? 'Contact the company' : 'Liên hệ công ty'}</a>
  </main><Footer /></div>;
}
