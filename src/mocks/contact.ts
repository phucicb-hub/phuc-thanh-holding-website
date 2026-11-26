import type { Localized } from '@/lib/lang';

interface CooperationField {
  id: number;
  icon: string;
  title: string;
  description: string;
  items: string[];
  buttonLabel: string;
  note?: string;
}

export const cooperationFields: Localized<CooperationField[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-code-box-line',
      title: 'Công nghệ và phần mềm',
      description: 'Dành cho doanh nghiệp, đơn vị công nghệ và chuyên gia có nhu cầu kết nối.',
      items: [
        'Phát triển phần mềm',
        'Xây dựng hệ thống quản trị',
        'Phân tích và trực quan hóa dữ liệu',
        'Tự động hóa quy trình',
        'Tích hợp hệ thống',
        'Chuyển đổi số doanh nghiệp',
        'Phát triển sản phẩm công nghệ theo yêu cầu',
      ],
      buttonLabel: 'ĐỀ XUẤT HỢP TÁC CÔNG NGHỆ',
    },
    {
      id: 2,
      icon: 'ri-bar-chart-box-line',
      title: 'Đầu tư và phát triển dự án',
      description: 'Tiếp nhận những cơ hội có mục tiêu, hồ sơ và mô hình hợp tác rõ ràng.',
      items: [
        'Đề xuất phát triển dự án',
        'Kết nối nguồn lực',
        'Nghiên cứu cơ hội đầu tư',
        'Hợp tác phát triển sản phẩm',
        'Hợp tác vận hành',
        'Xúc tiến đầu tư và thương mại',
        'Tư vấn quản trị doanh nghiệp',
      ],
      buttonLabel: 'GỬI HỒ SƠ DỰ ÁN',
      note: 'Việc tiếp nhận hồ sơ không đồng nghĩa với cam kết hợp tác hay đầu tư. Mọi đề xuất sẽ được xem xét, đánh giá cẩn trọng và phản hồi chính thức bằng văn bản.',
    },
    {
      id: 3,
      icon: 'ri-graduation-cap-line',
      title: 'Đào tạo và phát triển nguồn nhân lực',
      description: 'Kết nối với cơ sở đào tạo, giảng viên và chuyên gia trong và ngoài nước.',
      items: [
        'Hợp tác xây dựng chương trình đào tạo',
        'Đào tạo trực tuyến và nền tảng học tập',
        'Phát triển kỹ năng chuyên môn',
        'Kết nối giảng viên và chuyên gia',
        'Cấp chứng chỉ đào tạo',
        'Đào tạo nội bộ doanh nghiệp',
      ],
      buttonLabel: 'ĐỀ XUẤT HỢP TÁC ĐÀO TẠO',
    },
    {
      id: 4,
      icon: 'ri-megaphone-line',
      title: 'Truyền thông và nội dung',
      description: 'Dành cho đơn vị truyền thông, nhà sáng tạo nội dung và chuyên gia thương hiệu.',
      items: [
        'Xây dựng chiến lược truyền thông',
        'Sản xuất nội dung đa nền tảng',
        'Quản lý và phát triển thương hiệu',
        'Marketing số và quảng bá',
        'Tổ chức sự kiện và hội thảo',
        'Hợp tác truyền thông dự án',
      ],
      buttonLabel: 'ĐỀ XUẤT HỢP TÁC TRUYỀN THÔNG',
    },
    {
      id: 5,
      icon: 'ri-store-2-line',
      title: 'Phân phối và hợp tác thương mại',
      description: 'Kết nối nhà cung cấp, nhà phân phối và đối tác thương mại trong nhiều lĩnh vực.',
      items: [
        'Phân phối sản phẩm và giải pháp',
        'Hợp tác kênh bán hàng',
        'Xúc tiến thương mại',
        'Hợp tác đại lý và đối tác',
        'Kết nối chuỗi cung ứng',
        'Hợp tác phát triển thị trường',
      ],
      buttonLabel: 'ĐỀ XUẤT HỢP TÁC THƯƠNG MẠI',
    },
    {
      id: 6,
      icon: 'ri-heart-3-line',
      title: 'Hoạt động vì cộng đồng',
      description: 'Kết nối tổ chức xã hội và cá nhân có chung mong muốn đóng góp cho cộng đồng.',
      items: [
        'Chương trình hỗ trợ cộng đồng',
        'Hợp tác tổ chức xã hội',
        'Tài trợ và đồng hành dự án xã hội',
        'Hoạt động thiện nguyện',
        'Chương trình phát triển kỹ năng cộng đồng',
        'Hợp tác giáo dục và nâng cao dân trí',
      ],
      buttonLabel: 'ĐỀ XUẤT HỢP TÁC CỘNG ĐỒNG',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-code-box-line',
      title: 'Technology & Software',
      description: 'For businesses, technology companies and experts seeking to connect.',
      items: [
        'Software development',
        'Building management systems',
        'Data analysis and visualization',
        'Process automation',
        'System integration',
        'Enterprise digital transformation',
        'Custom technology product development',
      ],
      buttonLabel: 'PROPOSE TECHNOLOGY PARTNERSHIP',
    },
    {
      id: 2,
      icon: 'ri-bar-chart-box-line',
      title: 'Investment & Project Development',
      description: 'Receiving opportunities with clear goals, documentation and cooperation models.',
      items: [
        'Project development proposals',
        'Resource connection',
        'Investment opportunity research',
        'Product development cooperation',
        'Operational cooperation',
        'Investment and trade promotion',
        'Enterprise management consulting',
      ],
      buttonLabel: 'SUBMIT PROJECT PROFILE',
      note: 'Receiving documents does not imply a commitment to cooperate or invest. All proposals will be carefully reviewed, evaluated and officially responded to in writing.',
    },
    {
      id: 3,
      icon: 'ri-graduation-cap-line',
      title: 'Training & Workforce Development',
      description: 'Connecting with training institutions, lecturers and experts at home and abroad.',
      items: [
        'Training program development cooperation',
        'Online training and learning platforms',
        'Professional skill development',
        'Connecting lecturers and experts',
        'Training certification',
        'Corporate internal training',
      ],
      buttonLabel: 'PROPOSE TRAINING PARTNERSHIP',
    },
    {
      id: 4,
      icon: 'ri-megaphone-line',
      title: 'Media & Content',
      description: 'For media agencies, content creators and brand experts.',
      items: [
        'Communication strategy development',
        'Multi-platform content production',
        'Brand management and development',
        'Digital marketing and promotion',
        'Event and seminar organization',
        'Project communication cooperation',
      ],
      buttonLabel: 'PROPOSE MEDIA PARTNERSHIP',
    },
    {
      id: 5,
      icon: 'ri-store-2-line',
      title: 'Distribution & Commercial Cooperation',
      description: 'Connecting suppliers, distributors and commercial partners across many fields.',
      items: [
        'Product and solution distribution',
        'Sales channel cooperation',
        'Trade promotion',
        'Agency and partner cooperation',
        'Supply chain connection',
        'Market development cooperation',
      ],
      buttonLabel: 'PROPOSE COMMERCIAL PARTNERSHIP',
    },
    {
      id: 6,
      icon: 'ri-heart-3-line',
      title: 'Community Activities',
      description: 'Connecting social organizations and individuals sharing the desire to contribute to the community.',
      items: [
        'Community support programs',
        'Social organization cooperation',
        'Sponsorship of social projects',
        'Volunteer activities',
        'Community skill development programs',
        'Education and literacy cooperation',
      ],
      buttonLabel: 'PROPOSE COMMUNITY PARTNERSHIP',
    },
  ],
};

interface ProcessStep {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const reviewProcess: Localized<ProcessStep[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-inbox-line',
      title: 'Tiếp nhận đề xuất',
      description: 'Nhận hồ sơ, thông tin qua biểu mẫu, email hoặc hotline chính thức.',
    },
    {
      id: 2,
      icon: 'ri-filter-3-line',
      title: 'Sàng lọc sơ bộ',
      description: 'Đánh giá mức độ phù hợp với định hướng, năng lực và tiêu chí của công ty.',
    },
    {
      id: 3,
      icon: 'ri-chat-3-line',
      title: 'Trao đổi & thẩm định',
      description: 'Làm việc trực tiếp để làm rõ mục tiêu, nguồn lực, phạm vi và kỳ vọng.',
    },
    {
      id: 4,
      icon: 'ri-shake-hands-line',
      title: 'Thống nhất hợp tác',
      description: 'Xác định vai trò, trách nhiệm và cơ chế phối hợp giữa các bên.',
    },
    {
      id: 5,
      icon: 'ri-file-text-line',
      title: 'Ký kết & triển khai',
      description: 'Chính thức hóa thỏa thuận và bắt đầu thực hiện kế hoạch hợp tác.',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-inbox-line',
      title: 'Receive Proposals',
      description: 'Receiving documents and information via forms, email or the official hotline.',
    },
    {
      id: 2,
      icon: 'ri-filter-3-line',
      title: 'Preliminary Screening',
      description: 'Assessing suitability with the company direction, capabilities and criteria.',
    },
    {
      id: 3,
      icon: 'ri-chat-3-line',
      title: 'Discussion & Appraisal',
      description: 'Working directly to clarify goals, resources, scope and expectations.',
    },
    {
      id: 4,
      icon: 'ri-shake-hands-line',
      title: 'Agree on Cooperation',
      description: 'Defining roles, responsibilities and coordination mechanisms between parties.',
    },
    {
      id: 5,
      icon: 'ri-file-text-line',
      title: 'Sign & Deploy',
      description: 'Formalizing the agreement and starting to implement the cooperation plan.',
    },
  ],
};

interface Principle {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const cooperationPrinciples: Localized<Principle[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-eye-line',
      title: 'Minh bạch',
      description: 'Công khai tiêu chí, quy trình và thông tin cần thiết trong suốt quá trình hợp tác.',
    },
    {
      id: 2,
      icon: 'ri-shield-check-line',
      title: 'Bảo mật thông tin',
      description: 'Tôn trọng và bảo vệ thông tin, tài liệu của các bên trong quá trình trao đổi.',
    },
    {
      id: 3,
      icon: 'ri-focus-3-line',
      title: 'Phù hợp năng lực',
      description: 'Ưu tiên những hợp tác đúng thế mạnh, đảm bảo hiệu quả và chất lượng.',
    },
    {
      id: 4,
      icon: 'ri-seedling-line',
      title: 'Hiệu quả lâu dài',
      description: 'Hướng đến giá trị bền vững và mối quan hệ đôi bên cùng có lợi lâu dài.',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-eye-line',
      title: 'Transparency',
      description: 'Publicly sharing criteria, processes and necessary information throughout cooperation.',
    },
    {
      id: 2,
      icon: 'ri-shield-check-line',
      title: 'Information Security',
      description: 'Respecting and protecting the information and documents of all parties during discussions.',
    },
    {
      id: 3,
      icon: 'ri-focus-3-line',
      title: 'Capability Fit',
      description: 'Prioritizing cooperation aligned with strengths, ensuring effectiveness and quality.',
    },
    {
      id: 4,
      icon: 'ri-seedling-line',
      title: 'Long-term Effectiveness',
      description: 'Aiming for sustainable value and mutually beneficial long-term relationships.',
    },
  ],
};

export const legalInfo: Localized<{
  companyName: string;
  taxCode: string;
  representative: string;
  address: string;
  hotline: string;
  email: string;
  workingHours: string;
}> = {
  vi: {
    companyName: 'Công ty Cổ phần Đầu tư và Công nghệ Phúc Thành Holding',
    taxCode: '2500716846',
    representative: 'LÊ VĂN PHÚC - Giám đốc',
    address: 'Số 424 Đường Mê Linh, Phường Vĩnh Phúc, Tỉnh Phú Thọ, Việt Nam',
    hotline: '0343 089 666',
    email: 'phuclv@phucthanhholding.com',
    workingHours: 'Thứ 2 - Thứ 6: 08:00 - 17:30',
  },
  en: {
    companyName: 'Phuc Thanh Holding Investment and Technology Joint Stock Company',
    taxCode: '2500716846',
    representative: 'LE VAN PHUC - Director',
    address: '424 Me Linh Street, Vinh Phuc Ward, Phu Tho Province, Vietnam',
    hotline: '0343 089 666',
    email: 'phuclv@phucthanhholding.com',
    workingHours: 'Monday - Friday: 08:00 - 17:30',
  },
};