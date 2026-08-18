import type { Localized } from '@/lib/lang';

export interface CompanyFact {
  id: number;
  value: string;
  label: string;
  icon: string;
}

export const companyFacts: Localized<CompanyFact[]> = {
  vi: [
    { id: 1, value: '04/04/2024', label: 'Ngày bắt đầu hoạt động', icon: 'ri-calendar-line' },
    { id: 2, value: '2500716846', label: 'Mã số thuế doanh nghiệp', icon: 'ri-barcode-line' },
    { id: 3, value: 'Phú Thọ', label: 'Địa điểm đặt trụ sở hiện hành', icon: 'ri-map-pin-line' },
    { id: 4, value: '5820', label: 'Ngành nghề chính — Xuất bản phần mềm', icon: 'ri-code-box-line' },
  ],
  en: [
    { id: 1, value: 'April 4, 2024', label: 'Date of operation commencement', icon: 'ri-calendar-line' },
    { id: 2, value: '2500716846', label: 'Business tax code', icon: 'ri-barcode-line' },
    { id: 3, value: 'Phu Tho', label: 'Current headquarters location', icon: 'ri-map-pin-line' },
    { id: 4, value: '5820', label: 'Main industry — Software publishing', icon: 'ri-code-box-line' },
  ],
};

export interface BusinessField {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const businessFields: Localized<BusinessField[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-lightbulb-flash-line',
      title: 'Đầu tư & Công nghệ',
      description:
        'Kết hợp năng lực đầu tư dài hạn với nền tảng công nghệ hiện đại để phát triển các giải pháp tạo giá trị bền vững.',
    },
    {
      id: 2,
      icon: 'ri-code-s-slash-line',
      title: 'Phát triển phần mềm',
      description:
        'Thiết kế và phát triển các sản phẩm phần mềm phục vụ nhu cầu quản trị và vận hành của doanh nghiệp, tổ chức.',
    },
    {
      id: 3,
      icon: 'ri-global-line',
      title: 'Chuyển đổi số doanh nghiệp',
      description:
        'Đồng hành cùng doanh nghiệp trong hành trình số hóa quy trình, nâng cao hiệu quả hoạt động và trải nghiệm khách hàng.',
    },
    {
      id: 4,
      icon: 'ri-database-2-line',
      title: 'Quản trị & phân tích dữ liệu',
      description:
        'Xây dựng hệ thống dữ liệu tập trung, hỗ trợ tổ chức đưa ra quyết định dựa trên thông tin chính xác và kịp thời.',
    },
    {
      id: 5,
      icon: 'ri-graduation-cap-line',
      title: 'Đào tạo & Phát triển nguồn nhân lực',
      description:
        'Phát triển năng lực đội ngũ thông qua các chương trình đào tạo trực tuyến và nội dung học liệu chất lượng.',
    },
    {
      id: 6,
      icon: 'ri-megaphone-line',
      title: 'Truyền thông & nội dung số',
      description:
        'Xây dựng nội dung và thương hiệu trên các nền tảng số, kết nối doanh nghiệp với khách hàng và cộng đồng.',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-lightbulb-flash-line',
      title: 'Investment & Technology',
      description:
        'Combining long-term investment capability with modern technology platforms to develop solutions creating sustainable value.',
    },
    {
      id: 2,
      icon: 'ri-code-s-slash-line',
      title: 'Software Development',
      description:
        'Designing and developing software products serving the management and operations needs of businesses and organizations.',
    },
    {
      id: 3,
      icon: 'ri-global-line',
      title: 'Enterprise Digital Transformation',
      description:
        'Supporting businesses on their journey of process digitization, improving operational efficiency and customer experience.',
    },
    {
      id: 4,
      icon: 'ri-database-2-line',
      title: 'Data Management & Analytics',
      description:
        'Building centralized data systems to help organizations make decisions based on accurate and timely information.',
    },
    {
      id: 5,
      icon: 'ri-graduation-cap-line',
      title: 'Training & Workforce Development',
      description:
        'Developing team capabilities through online training programs and quality learning content.',
    },
    {
      id: 6,
      icon: 'ri-megaphone-line',
      title: 'Media & Digital Content',
      description:
        'Building content and brand on digital platforms, connecting businesses with customers and the community.',
    },
  ],
};

export interface CoreValue {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const coreValues: Localized<CoreValue[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-plant-line',
      title: 'Bền vững',
      description:
        'Ưu tiên những giá trị dài hạn, phát triển có trách nhiệm với khách hàng, đối tác và cộng đồng.',
    },
    {
      id: 2,
      icon: 'ri-team-line',
      title: 'Hợp tác',
      description:
        'Tin tưởng vào sức mạnh của sự hợp tác giữa các bên có chung mục tiêu và tầm nhìn phát triển.',
    },
    {
      id: 3,
      icon: 'ri-rocket-line',
      title: 'Đổi mới',
      description:
        'Không ngừng học hỏi và ứng dụng công nghệ để mang đến những giải pháp thiết thực và hiệu quả.',
    },
    {
      id: 4,
      icon: 'ri-shield-check-line',
      title: 'Chính trực',
      description:
        'Minh bạch và trung thực trong mọi hoạt động, đặt lợi ích của khách hàng lên hàng đầu.',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-plant-line',
      title: 'Sustainability',
      description:
        'Prioritizing long-term values and responsible development toward customers, partners and the community.',
    },
    {
      id: 2,
      icon: 'ri-team-line',
      title: 'Collaboration',
      description:
        'Believing in the power of cooperation between parties sharing common goals and a development vision.',
    },
    {
      id: 3,
      icon: 'ri-rocket-line',
      title: 'Innovation',
      description:
        'Continuously learning and applying technology to deliver practical and effective solutions.',
    },
    {
      id: 4,
      icon: 'ri-shield-check-line',
      title: 'Integrity',
      description:
        'Transparent and honest in all activities, always putting customer interests first.',
    },
  ],
};

export interface MethodologyStep {
  id: number;
  step: string;
  title: string;
  description: string;
}

export const methodology: Localized<MethodologyStep[]> = {
  vi: [
    {
      id: 1,
      step: '01',
      title: 'Lắng nghe & thấu hiểu',
      description:
        'Trao đổi trực tiếp để nắm rõ nhu cầu, mục tiêu và đặc thù của từng khách hàng, đối tác.',
    },
    {
      id: 2,
      step: '02',
      title: 'Thiết kế giải pháp',
      description:
        'Đề xuất phương án phù hợp với quy mô và định hướng, cân đối giữa hiệu quả và chi phí.',
    },
    {
      id: 3,
      step: '03',
      title: 'Triển khai & vận hành',
      description:
        'Thực hiện theo lộ trình rõ ràng, đảm bảo tiến độ và chất lượng trong từng giai đoạn.',
    },
    {
      id: 4,
      step: '04',
      title: 'Đồng hành & tối ưu',
      description:
        'Hỗ trợ liên tục sau triển khai, liên tục cải tiến để giải pháp ngày càng hoàn thiện.',
    },
  ],
  en: [
    {
      id: 1,
      step: '01',
      title: 'Listen & Understand',
      description:
        'Direct conversations to fully understand the needs, goals and specifics of each customer and partner.',
    },
    {
      id: 2,
      step: '02',
      title: 'Design the Solution',
      description:
        'Proposing an approach suited to scale and direction, balancing effectiveness and cost.',
    },
    {
      id: 3,
      step: '03',
      title: 'Implement & Operate',
      description:
        'Executing on a clear roadmap, ensuring progress and quality at every stage.',
    },
    {
      id: 4,
      step: '04',
      title: 'Support & Optimize',
      description:
        'Continuous support after deployment, ongoing improvement to make the solution increasingly complete.',
    },
  ],
};