import type { Localized } from '@/lib/lang';

export interface BusinessFieldDetail {
  id: number;
  icon: string;
  title: string;
  description: string;
  services: string[];
  href?: string;
}

export const businessFieldDetails: Localized<BusinessFieldDetail[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-lightbulb-flash-line',
      title: 'Đầu tư & Công nghệ',
      description:
        'Kết hợp tư duy đầu tư dài hạn với nền tảng công nghệ hiện đại để xây dựng những giải pháp tạo giá trị bền vững cho doanh nghiệp và cộng đồng.',
      services: ['Tư vấn định hướng đầu tư', 'Ứng dụng công nghệ vào vận hành', 'Xây dựng nền tảng số'],
      href: '/linh-vuc/dau-tu-cong-nghe',
    },
    {
      id: 2,
      icon: 'ri-code-s-slash-line',
      title: 'Phát triển phần mềm',
      description:
        'Thiết kế và phát triển các sản phẩm phần mềm phục vụ nhu cầu quản trị, vận hành và phát triển của doanh nghiệp, tổ chức.',
      services: ['Phần mềm quản trị doanh nghiệp', 'Ứng dụng web & di động', 'Giải pháp theo yêu cầu'],
      href: '/linh-vuc/phat-trien-phan-mem',
    },
    {
      id: 3,
      icon: 'ri-global-line',
      title: 'Chuyển đổi số doanh nghiệp',
      description:
        'Đồng hành cùng doanh nghiệp trong hành trình số hóa quy trình, nâng cao hiệu quả hoạt động và trải nghiệm khách hàng.',
      services: ['Tư vấn lộ trình chuyển đổi số', 'Số hóa quy trình nghiệp vụ', 'Tích hợp hệ thống'],
      href: '/linh-vuc/chuyen-doi-so-doanh-nghiep',
    },
    {
      id: 4,
      icon: 'ri-database-2-line',
      title: 'Quản trị & phân tích dữ liệu',
      description:
        'Xây dựng hệ thống dữ liệu tập trung, hỗ trợ tổ chức đưa ra quyết định dựa trên thông tin chính xác và kịp thời.',
      services: ['Kho dữ liệu tập trung', 'Bảng điều khiển phân tích', 'Báo cáo tự động'],
      href: '/linh-vuc/quan-tri-phan-tich-du-lieu',
    },
    {
      id: 5,
      icon: 'ri-graduation-cap-line',
      title: 'Đào tạo & Phát triển nguồn nhân lực',
      description:
        'Phát triển năng lực đội ngũ thông qua các chương trình đào tạo trực tuyến và nội dung học liệu chất lượng.',
      services: ['Nền tảng học trực tuyến', 'Khóa học doanh nghiệp', 'Quản lý đào tạo nội bộ'],
      href: '/linh-vuc/dao-tao-phat-trien-nguon-nhan-luc',
    },
    {
      id: 6,
      icon: 'ri-megaphone-line',
      title: 'Truyền thông & nội dung số',
      description:
        'Xây dựng nội dung và thương hiệu trên các nền tảng số, kết nối doanh nghiệp với khách hàng và cộng đồng.',
      services: ['Xây dựng nội dung số', 'Quản trị mạng xã hội', 'Chiến lược truyền thông'],
      href: '/linh-vuc/truyen-thong-noi-dung-so',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-lightbulb-flash-line',
      title: 'Investment & Technology',
      description:
        'Combining long-term investment thinking with modern technology platforms to build solutions that create sustainable value for businesses and the community.',
      services: ['Investment direction consulting', 'Applying technology to operations', 'Building digital platforms'],
      href: '/linh-vuc/dau-tu-cong-nghe',
    },
    {
      id: 2,
      icon: 'ri-code-s-slash-line',
      title: 'Software Development',
      description:
        'Designing and developing software products serving the management, operations and growth needs of businesses and organizations.',
      services: ['Enterprise management software', 'Web & mobile applications', 'Custom solutions'],
      href: '/linh-vuc/phat-trien-phan-mem',
    },
    {
      id: 3,
      icon: 'ri-global-line',
      title: 'Enterprise Digital Transformation',
      description:
        'Supporting businesses on their journey of process digitization, improving operational efficiency and customer experience.',
      services: ['Digital transformation roadmap consulting', 'Business process digitization', 'System integration'],
      href: '/linh-vuc/chuyen-doi-so-doanh-nghiep',
    },
    {
      id: 4,
      icon: 'ri-database-2-line',
      title: 'Data Management & Analytics',
      description:
        'Building centralized data systems to help organizations make decisions based on accurate and timely information.',
      services: ['Centralized data warehouse', 'Analytics dashboards', 'Automated reporting'],
      href: '/linh-vuc/quan-tri-phan-tich-du-lieu',
    },
    {
      id: 5,
      icon: 'ri-graduation-cap-line',
      title: 'Training & Workforce Development',
      description:
        'Developing team capabilities through online training programs and quality learning content.',
      services: ['Online learning platform', 'Corporate courses', 'Internal training management'],
      href: '/linh-vuc/dao-tao-phat-trien-nguon-nhan-luc',
    },
    {
      id: 6,
      icon: 'ri-megaphone-line',
      title: 'Media & Digital Content',
      description:
        'Building content and brand on digital platforms, connecting businesses with customers and the community.',
      services: ['Digital content development', 'Social media management', 'Communication strategy'],
      href: '/linh-vuc/truyen-thong-noi-dung-so',
    },
  ],
};