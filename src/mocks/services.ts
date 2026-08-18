import type { Localized } from '@/lib/lang';

export interface ServiceDetail {
  id: number;
  icon: string;
  title: string;
  description: string;
  items: string[];
  href: string;
}

export const serviceDetails: Localized<ServiceDetail[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-code-s-slash-line',
      title: 'Phát triển phần mềm theo yêu cầu',
      description:
        'Khảo sát, thiết kế và phát triển phần mềm phù hợp với quy trình và mục tiêu riêng của doanh nghiệp, từ khảo sát nghiệp vụ đến bàn giao và bảo hành.',
      items: ['Phần mềm quản trị doanh nghiệp', 'Ứng dụng web & di động', 'Dashboard & phân tích dữ liệu'],
      href: '/linh-vuc/phat-trien-phan-mem',
    },
    {
      id: 2,
      icon: 'ri-global-line',
      title: 'Chuyển đổi số doanh nghiệp',
      description:
        'Đồng hành cùng doanh nghiệp số hóa quy trình, nâng cao hiệu quả vận hành và trải nghiệm khách hàng theo từng giai đoạn có đo lường.',
      items: ['Tư vấn lộ trình chuyển đổi số', 'Số hóa quy trình nghiệp vụ', 'Tích hợp hệ thống'],
      href: '/linh-vuc/chuyen-doi-so-doanh-nghiep',
    },
    {
      id: 3,
      icon: 'ri-database-2-line',
      title: 'Quản trị & phân tích dữ liệu',
      description:
        'Xây dựng hệ thống dữ liệu tập trung, chuẩn hóa thông tin và khai thác dữ liệu để hỗ trợ ra quyết định chính xác và kịp thời.',
      items: ['Kho dữ liệu tập trung', 'Báo cáo tự động', 'Phân tích xu hướng'],
      href: '/linh-vuc/quan-tri-phan-tich-du-lieu',
    },
    {
      id: 4,
      icon: 'ri-graduation-cap-line',
      title: 'Đào tạo & phát triển nguồn nhân lực',
      description:
        'Nâng cao năng lực đội ngũ thông qua các chương trình đào tạo linh hoạt, kết hợp kiến thức, thực hành và công nghệ học tập hiện đại.',
      items: ['Đào tạo trực tuyến', 'Chương trình doanh nghiệp', 'Nâng cao năng lực số'],
      href: '/linh-vuc/dao-tao-phat-trien-nguon-nhan-luc',
    },
    {
      id: 5,
      icon: 'ri-megaphone-line',
      title: 'Truyền thông & nội dung số',
      description:
        'Xây dựng tiếng nói thương hiệu, nội dung có chiến lược và quản trị nền tảng số để kết nối doanh nghiệp với khách hàng và cộng đồng.',
      items: ['Xây dựng nội dung số', 'Quản trị mạng xã hội', 'Chiến lược truyền thông'],
      href: '/linh-vuc/truyen-thong-noi-dung-so',
    },
    {
      id: 6,
      icon: 'ri-lightbulb-flash-line',
      title: 'Tư vấn đầu tư & công nghệ',
      description:
        'Kết hợp tư duy đầu tư dài hạn với năng lực công nghệ để xác định cơ hội và xây dựng nền tảng tạo giá trị bền vững.',
      items: ['Định hướng đầu tư', 'Ứng dụng công nghệ vào vận hành', 'Xây dựng nền tảng số'],
      href: '/linh-vuc/dau-tu-cong-nghe',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-code-s-slash-line',
      title: 'Custom software development',
      description:
        'Surveying, designing and developing software tailored to each business processes and goals, from business survey to handover and warranty.',
      items: ['Enterprise management software', 'Web & mobile apps', 'Dashboards & data analytics'],
      href: '/linh-vuc/phat-trien-phan-mem',
    },
    {
      id: 2,
      icon: 'ri-global-line',
      title: 'Enterprise digital transformation',
      description:
        'Supporting businesses in digitizing processes, improving operational efficiency and customer experience through measurable phases.',
      items: ['Digital roadmap consulting', 'Business process digitization', 'System integration'],
      href: '/linh-vuc/chuyen-doi-so-doanh-nghiep',
    },
    {
      id: 3,
      icon: 'ri-database-2-line',
      title: 'Data management & analytics',
      description:
        'Building centralized data systems, standardizing information and leveraging data to support accurate, timely decisions.',
      items: ['Centralized data warehouse', 'Automated reporting', 'Trend analysis'],
      href: '/linh-vuc/quan-tri-phan-tich-du-lieu',
    },
    {
      id: 4,
      icon: 'ri-graduation-cap-line',
      title: 'Training & workforce development',
      description:
        'Enhancing team capabilities through flexible training programs that combine knowledge, practice and modern learning technology.',
      items: ['Online training', 'Corporate programs', 'Digital skills uplift'],
      href: '/linh-vuc/dao-tao-phat-trien-nguon-nhan-luc',
    },
    {
      id: 5,
      icon: 'ri-megaphone-line',
      title: 'Media & digital content',
      description:
        'Building a brand voice, strategic content and digital platform management to connect businesses with customers and the community.',
      items: ['Digital content development', 'Social media management', 'Communication strategy'],
      href: '/linh-vuc/truyen-thong-noi-dung-so',
    },
    {
      id: 6,
      icon: 'ri-lightbulb-flash-line',
      title: 'Investment & technology consulting',
      description:
        'Combining long-term investment thinking with technology capability to identify opportunities and build platforms for sustainable value.',
      items: ['Investment direction', 'Applying technology to operations', 'Building digital platforms'],
      href: '/linh-vuc/dau-tu-cong-nghe',
    },
  ],
};