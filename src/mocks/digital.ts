import type { Localized } from '@/lib/lang';

export interface DigitalRoadmapStep {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const digitalRoadmap: Localized<DigitalRoadmapStep[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-file-search-line',
      title: 'Đánh giá hiện trạng',
      description: 'Khảo sát quy trình, hệ thống và năng lực số hiện tại để xác định điểm mạnh và khoảng cách.',
    },
    {
      id: 2,
      icon: 'ri-flag-line',
      title: 'Xác định mục tiêu',
      description: 'Cùng tổ chức làm rõ mục tiêu chuyển đổi số gắn với chiến lược phát triển thực tế.',
    },
    {
      id: 3,
      icon: 'ri-map-line',
      title: 'Thiết kế lộ trình',
      description: 'Xây dựng lộ trình theo từng giai đoạn, ưu tiên những việc mang lại giá trị rõ ràng trước.',
    },
    {
      id: 4,
      icon: 'ri-settings-3-line',
      title: 'Triển khai theo giai đoạn',
      description: 'Thực hiện từng bước, có kiểm soát rủi ro và điều chỉnh linh hoạt theo kết quả thực tế.',
    },
    {
      id: 5,
      icon: 'ri-bar-chart-box-line',
      title: 'Đo lường & tối ưu',
      description: 'Đánh giá hiệu quả, rút kinh nghiệm và tiếp tục cải thiện để chuyển đổi số đi vào thực chất.',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-file-search-line',
      title: 'Assess the Current State',
      description: 'Surveying processes, systems and current digital capability to identify strengths and gaps.',
    },
    {
      id: 2,
      icon: 'ri-flag-line',
      title: 'Define Goals',
      description: 'Working with the organization to clarify digital transformation goals tied to real strategy.',
    },
    {
      id: 3,
      icon: 'ri-map-line',
      title: 'Design the Roadmap',
      description: 'Building a phased roadmap, prioritizing initiatives with clear value first.',
    },
    {
      id: 4,
      icon: 'ri-settings-3-line',
      title: 'Deploy in Phases',
      description: 'Executing step by step, managing risk and adjusting flexibly based on actual results.',
    },
    {
      id: 5,
      icon: 'ri-bar-chart-box-line',
      title: 'Measure & Optimize',
      description: 'Evaluating effectiveness, learning and continuing to improve so digital transformation is meaningful.',
    },
  ],
};

export interface DigitalService {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const digitalServices: Localized<DigitalService[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-flow-chart',
      title: 'Số hóa quy trình',
      description:
        'Chuyển các quy trình thủ công sang nền tảng số, giảm giấy tờ và thời gian xử lý, tăng tính minh bạch.',
    },
    {
      id: 2,
      icon: 'ri-link',
      title: 'Tích hợp hệ thống',
      description:
        'Kết nối các phần mềm và dữ liệu rời rạc thành một hệ thống liền mạch, phục vụ vận hành và ra quyết định.',
    },
    {
      id: 3,
      icon: 'ri-database-2-line',
      title: 'Quản trị dữ liệu',
      description:
        'Xây dựng dữ liệu tập trung, sạch và đáng tin cậy làm nền tảng cho phân tích và các ứng dụng thông minh.',
    },
    {
      id: 4,
      icon: 'ri-shield-keyhole-line',
      title: 'Bảo mật thông tin',
      description:
        'Đảm bảo an toàn dữ liệu và tuân thủ các yêu cầu bảo mật trong suốt quá trình chuyển đổi số.',
    },
    {
      id: 5,
      icon: 'ri-graduation-cap-line',
      title: 'Nâng cao năng lực số',
      description:
        'Đồng hành đào tạo để đội ngũ làm chủ công cụ, quy trình mới và duy trì hiệu quả sau chuyển đổi.',
    },
    {
      id: 6,
      icon: 'ri-dashboard-3-line',
      title: 'Báo cáo & phân tích',
      description:
        'Xây dựng bảng điều khiển và báo cáo giúp lãnh đạo nắm bắt tình hình và ra quyết định dựa trên dữ liệu.',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-flow-chart',
      title: 'Process Digitization',
      description:
        'Moving manual processes to digital platforms, reducing paperwork and processing time while increasing transparency.',
    },
    {
      id: 2,
      icon: 'ri-link',
      title: 'System Integration',
      description:
        'Connecting scattered software and data into a seamless system for operations and decision-making.',
    },
    {
      id: 3,
      icon: 'ri-database-2-line',
      title: 'Data Management',
      description:
        'Building centralized, clean and reliable data as a foundation for analytics and intelligent applications.',
    },
    {
      id: 4,
      icon: 'ri-shield-keyhole-line',
      title: 'Information Security',
      description:
        'Ensuring data safety and compliance with security requirements throughout digital transformation.',
    },
    {
      id: 5,
      icon: 'ri-graduation-cap-line',
      title: 'Digital Capability Building',
      description:
        'Providing training so the team masters new tools and processes and sustains results after transformation.',
    },
    {
      id: 6,
      icon: 'ri-dashboard-3-line',
      title: 'Reporting & Analytics',
      description:
        'Building dashboards and reports that help leaders understand the situation and make data-driven decisions.',
    },
  ],
};

export interface DigitalPrinciple {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const digitalPrinciples: Localized<DigitalPrinciple[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-user-star-line',
      title: 'Con người là trung tâm',
      description:
        'Chuyển đổi số thành công khi con người hiểu, đồng thuận và làm chủ công cụ mới, không chỉ đơn thuần triển khai công nghệ.',
    },
    {
      id: 2,
      icon: 'ri-crosshair-line',
      title: 'Gắn với mục tiêu thực tế',
      description:
        'Mỗi hạng mục chuyển đổi phải phục vụ mục tiêu cụ thể của tổ chức, tránh đầu tư công nghệ không mang lại giá trị.',
    },
    {
      id: 3,
      icon: 'ri-pulse-line',
      title: 'Đi từng bước có đo lường',
      description:
        'Triển khai theo giai đoạn nhỏ, đánh giá kết quả thường xuyên để điều chỉnh kịp thời và kiểm soát rủi ro.',
    },
    {
      id: 4,
      icon: 'ri-lock-line',
      title: 'Đặt bảo mật lên hàng đầu',
      description:
        'Bảo vệ dữ liệu và an toàn thông tin là yêu cầu xuyên suốt, không phải hạng mục làm sau cùng.',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-user-star-line',
      title: 'People at the Center',
      description:
        'Digital transformation succeeds when people understand, agree and master new tools, not just by deploying technology.',
    },
    {
      id: 2,
      icon: 'ri-crosshair-line',
      title: 'Tied to Real Goals',
      description:
        'Every transformation initiative must serve a specific organizational goal, avoiding technology investment with no value.',
    },
    {
      id: 3,
      icon: 'ri-pulse-line',
      title: 'Measured Step-by-Step',
      description:
        'Deploying in small phases with regular evaluation to adjust promptly and manage risk.',
    },
    {
      id: 4,
      icon: 'ri-lock-line',
      title: 'Security First',
      description:
        'Data protection and information security are continuous requirements, not an afterthought.',
    },
  ],
};

export interface DigitalFaqItem {
  id: number;
  question: string;
  answer: string;
}

export const digitalFaq: Localized<DigitalFaqItem[]> = {
  vi: [
    {
      id: 1,
      question: 'Chuyển đổi số bắt đầu từ đâu?',
      answer:
        'Chuyển đổi số nên bắt đầu từ việc đánh giá hiện trạng và xác định mục tiêu rõ ràng, sau đó mới thiết kế lộ trình phù hợp thay vì áp dụng công nghệ một cách dàn trải.',
    },
    {
      id: 2,
      question: 'Phúc Thành Holding hỗ trợ những nội dung chuyển đổi số nào?',
      answer:
        'Phúc Thành Holding định hướng hỗ trợ số hóa quy trình, tích hợp hệ thống, quản trị dữ liệu, bảo mật thông tin, nâng cao năng lực số và xây dựng báo cáo phân tích.',
    },
    {
      id: 3,
      question: 'Chuyển đổi số có phù hợp với doanh nghiệp nhỏ không?',
      answer:
        'Chuyển đổi số phù hợp với mọi quy mô nếu được triển khai đúng cách. Với tổ chức nhỏ, nên ưu tiên những việc mang lại giá trị rõ ràng và đi theo từng giai đoạn.',
    },
    {
      id: 4,
      question: 'Mất bao lâu để hoàn thành một dự án chuyển đổi số?',
      answer:
        'Thời gian phụ thuộc vào phạm vi và điều kiện của từng tổ chức. Lộ trình sẽ được xác định cụ thể sau khi khảo sát hiện trạng và thống nhất mục tiêu.',
    },
    {
      id: 5,
      question: 'Làm thế nào để trao đổi nhu cầu chuyển đổi số?',
      answer:
        'Tổ chức có thể liên hệ qua trang Liên hệ hợp tác, email phucthanhholding@gmail.com hoặc số điện thoại 0343 089 666 để được trao đổi cụ thể.',
    },
  ],
  en: [
    {
      id: 1,
      question: 'Where does digital transformation start?',
      answer:
        'Digital transformation should start with assessing the current state and defining clear goals, then designing a suitable roadmap rather than applying technology broadly.',
    },
    {
      id: 2,
      question: 'What digital transformation services does Phuc Thanh Holding provide?',
      answer:
        'Phuc Thanh Holding supports process digitization, system integration, data management, information security, digital capability building and analytics reporting.',
    },
    {
      id: 3,
      question: 'Is digital transformation suitable for small businesses?',
      answer:
        'Digital transformation fits any scale if implemented properly. For small organizations, prioritize initiatives with clear value and proceed in phases.',
    },
    {
      id: 4,
      question: 'How long does a digital transformation project take?',
      answer:
        'Duration depends on the scope and conditions of each organization. The roadmap is defined specifically after surveying the current state and agreeing on goals.',
    },
    {
      id: 5,
      question: 'How can I discuss digital transformation needs?',
      answer:
        'Organizations can contact us via the Contact page, email phucthanhholding@gmail.com or phone 0343 089 666 for a detailed discussion.',
    },
  ],
};