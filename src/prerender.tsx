import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import CompanyVerification from './pages/verification/page';
import AiProduct from './pages/ai-product/page';
import Home from './pages/home/page';
import Technology from './pages/technology/page';
import Overview from './pages/overview/page';
import { company } from './lib/company';

export async function renderPublicPage(path: string) {
  const lang = path.startsWith('/en') ? 'en' : 'vi';
  await i18n.changeLanguage(lang);
  const verification = path.includes('verification') || path.includes('xac-minh');
  const home = path === '/en' || path === '/vi';
  const technology = path.includes('technology') || path.includes('cong-nghe');
  const about = path.includes('/about') || path.includes('/tong-quan');
  const Page = home ? Home : verification ? CompanyVerification : technology ? Technology : about ? Overview : AiProduct;
  
  const title = home
    ? (lang === 'vi' ? 'Phúc Thành Holding | Đầu Tư & Phát Triển Công Nghệ Số Hàng Đầu' : 'Phuc Thanh Holding | Leading Technology & Investment Corporation')
    : verification
      ? (lang === 'vi' ? 'Xác Minh Doanh Nghiệp | Phúc Thành Holding' : 'Company Verification | Phuc Thanh Holding')
      : technology
        ? (lang === 'vi' ? 'Công Nghệ & Tích Hợp Claude AI | Phúc Thành Holding' : 'Technology & Claude AI Integration | Phuc Thanh Holding')
        : about
          ? (lang === 'vi' ? 'Giới Thiệu & Tổng Quan Doanh Nghiệp | Phúc Thành Holding' : 'Company Overview & Identity | Phuc Thanh Holding')
          : (lang === 'vi' ? 'Sản Phẩm AI & Hệ Sinh Thái Số | Phúc Thành Holding' : 'AI Products & Ecosystem | Phuc Thanh Holding');

  const description = home
    ? (lang === 'vi'
        ? 'Phúc Thành Holding - Đối tác tin cậy về đầu tư công nghệ, phát triển phần mềm và chuyển đổi số toàn diện cho doanh nghiệp. Khám phá giải pháp ngay.'
        : 'Phuc Thanh Holding - Trusted partner in technology investment, enterprise software solutions, and digital transformation. Discover innovation today.')
    : verification
      ? (lang === 'vi'
          ? 'Xác minh pháp lý Phúc Thành Holding - Giấy phép ĐKKD số 2500716846 cấp ngày 04/04/2024. Thông tin doanh nghiệp chính xác và minh bạch.'
          : 'Phuc Thanh Holding official legal verification: Reg No 2500716846 issued on 04/04/2024. Transparent corporate identity and public records.')
      : technology
        ? (lang === 'vi'
            ? 'Kiến trúc giải pháp công nghệ hiện đại và định hướng tích hợp trợ lý Claude AI thông minh phục vụ doanh nghiệp tại Phúc Thành Holding.'
            : 'Modern technology architecture and enterprise Claude AI assistant integration roadmaps at Phuc Thanh Holding.')
        : about
          ? (lang === 'vi'
              ? 'Hồ sơ năng lực, tầm nhìn chiến lược và hệ sinh thái giải pháp số của Công ty Cổ phần Đầu tư và Công nghệ Phúc Thành Holding.'
              : 'Corporate capabilities, strategic vision, and digital technology ecosystem of Phuc Thanh Holding Investment & Technology.')
          : (lang === 'vi'
              ? 'Khám phá các sản phẩm AI tiên phong và giải pháp số doanh nghiệp được nghiên cứu, phát triển bởi Phúc Thành Holding.'
              : 'Explore pioneering AI products and enterprise digital solutions engineered by Phuc Thanh Holding.');

  const html = renderToString(
    <I18nextProvider i18n={i18n}>
      <StaticRouter location={path}>
        <Page />
      </StaticRouter>
    </I18nextProvider>
  );

  return { html, title, description, lang, company };
}
