import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';

export default function Technology() {
  const lang = useLang();
  const en = lang === 'en';
  return <div className="min-h-screen flex flex-col"><Navbar /><main className="flex-1 container-main py-16 max-w-4xl">
    <h1 className="text-3xl font-bold mb-6">{en ? 'Technology & Planned Claude Integration' : 'Công nghệ và kế hoạch tích hợp Claude'}</h1>
    <p className="font-semibold text-primary-700 mb-6">{en ? 'In Development — Claude API not yet integrated' : 'Đang phát triển — chưa tích hợp Claude API'}</p>
    <h2 className="text-xl font-bold mb-3">{en ? 'Company website infrastructure' : 'Hạ tầng website công ty'}</h2>
    <p>{en ? 'The company website uses a React frontend, a Node.js API and a PostgreSQL database, deployed with Docker Compose on Ubuntu. It supports administrative login and contact form storage. This infrastructure does not demonstrate an operational AI assistant for the shop.' : 'Website công ty sử dụng giao diện React, API Node.js và database PostgreSQL, triển khai bằng Docker Compose trên Ubuntu. Hệ thống hỗ trợ đăng nhập quản trị và lưu biểu mẫu liên hệ. Hạ tầng này chưa phải trợ lý AI hoạt động cho shop.'}</p>
    <h2 className="text-xl font-bold mt-8 mb-3">{en ? 'Planned shop assistant architecture' : 'Kiến trúc trợ lý shop dự kiến'}</h2>
    <ol className="list-decimal pl-6 space-y-3">
      <li>{en ? 'A visitor submits a question through the shop interface.' : 'Khách gửi câu hỏi qua giao diện shop.'}</li>
      <li>{en ? 'The backend selects relevant information from the approved product catalog and shop policies.' : 'Backend chọn thông tin phù hợp từ danh mục sản phẩm và chính sách shop đã được duyệt.'}</li>
      <li>{en ? 'The backend calls the first-party Claude API; API credentials remain on the server.' : 'Backend gọi Claude API trực tiếp; khóa API được giữ trên máy chủ.'}</li>
      <li>{en ? 'The assistant answers using the supplied sources and directs unresolved questions to a human contact.' : 'Trợ lý trả lời dựa trên nguồn được cung cấp và chuyển câu hỏi chưa giải đáp tới người phụ trách.'}</li>
    </ol>
    <p className="mt-4">{en ? 'This is the intended design. The API connection, retrieval workflow and assistant interface have not yet been implemented.' : 'Đây là thiết kế dự kiến. Kết nối API, quy trình chọn dữ liệu và giao diện trợ lý chưa được triển khai.'}</p>
    <h2 className="text-xl font-bold mt-8 mb-3">{en ? 'Checks planned before release' : 'Kiểm tra dự kiến trước khi phát hành'}</h2>
    <p>{en ? 'Test factual answers against catalog and policy sources, unsupported questions, human handoff, access controls, request limits and handling of personal information. Usage costs and response quality must be evaluated before public release.' : 'Kiểm tra câu trả lời với nguồn danh mục/chính sách, câu hỏi ngoài phạm vi, chuyển tiếp cho người phụ trách, phân quyền, giới hạn yêu cầu và xử lý thông tin cá nhân. Cần đánh giá chi phí sử dụng và chất lượng trả lời trước khi phát hành công khai.'}</p>
    <a className="inline-block mt-8 text-primary-700 underline" href={getLocalizedPath('ai-product', lang)}>{en ? 'Product development status' : 'Tình trạng phát triển sản phẩm'}</a>
  </main><Footer /></div>;
}
