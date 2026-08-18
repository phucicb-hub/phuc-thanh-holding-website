import type { Localized } from '@/lib/lang';

export interface DataService {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const dataServices: Localized<DataService[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-database-2-line',
      title: 'Kho dữ liệu tập trung',
      description:
        'Tập hợp dữ liệu từ nhiều nguồn về một nơi thống nhất, giúp tổ chức dễ dàng truy xuất, khai thác và quản trị thông tin.',
    },
    {
      id: 2,
      icon: 'ri-link',
      title: 'Tích hợp & đồng bộ dữ liệu',
      description:
        'Kết nối các hệ thống, phần mềm và nguồn dữ liệu rời rạc để thông tin được cập nhật liền mạch, giảm thao tác thủ công và sai sót.',
    },
    {
      id: 3,
      icon: 'ri-dashboard-3-line',
      title: 'Bảng điều khiển phân tích',
      description:
        'Xây dựng dashboard trực quan, giúp lãnh đạo và các bộ phận nắm bắt tình hình hoạt động và theo dõi chỉ số quan trọng theo thời gian thực.',
    },
    {
      id: 4,
      icon: 'ri-file-chart-line',
      title: 'Báo cáo tự động',
      description:
        'Tự động hóa việc tổng hợp và tạo báo cáo định kỳ, tiết kiệm thời gian và đảm bảo số liệu nhất quán cho các quyết định.',
    },
    {
      id: 5,
      icon: 'ri-brush-line',
      title: 'Chất lượng & chuẩn hóa dữ liệu',
      description:
        'Rà soát, làm sạch và chuẩn hóa dữ liệu để đảm bảo thông tin chính xác, đầy đủ và đáng tin cậy làm nền tảng cho phân tích.',
    },
    {
      id: 6,
      icon: 'ri-shield-keyhole-line',
      title: 'Bảo mật & quản trị dữ liệu',
      description:
        'Thiết lập quy trình phân quyền, bảo vệ dữ liệu và tuân thủ các yêu cầu về an toàn thông tin trong suốt vòng đời dữ liệu.',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-database-2-line',
      title: 'Centralized Data Warehouse',
      description:
        'Bringing data from multiple sources into one unified place for easy retrieval, exploitation and management.',
    },
    {
      id: 2,
      icon: 'ri-link',
      title: 'Data Integration & Sync',
      description:
        'Connecting scattered systems, software and data sources so information updates seamlessly, reducing manual work and errors.',
    },
    {
      id: 3,
      icon: 'ri-dashboard-3-line',
      title: 'Analytics Dashboards',
      description:
        'Building intuitive dashboards that help leaders and departments track operations and key metrics in real time.',
    },
    {
      id: 4,
      icon: 'ri-file-chart-line',
      title: 'Automated Reporting',
      description:
        'Automating periodic report aggregation and generation, saving time and ensuring consistent figures for decisions.',
    },
    {
      id: 5,
      icon: 'ri-brush-line',
      title: 'Data Quality & Standardization',
      description:
        'Reviewing, cleaning and standardizing data to ensure accurate, complete and reliable information as a foundation for analytics.',
    },
    {
      id: 6,
      icon: 'ri-shield-keyhole-line',
      title: 'Data Security & Governance',
      description:
        'Establishing access control, data protection and information security compliance throughout the data lifecycle.',
    },
  ],
};

export interface DataProcessStep {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const dataProcess: Localized<DataProcessStep[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-file-search-line',
      title: 'Khảo sát nguồn dữ liệu',
      description: 'Xác định các nguồn dữ liệu hiện có, chất lượng và nhu cầu phân tích của tổ chức.',
    },
    {
      id: 2,
      icon: 'ri-flow-chart',
      title: 'Thiết kế kiến trúc dữ liệu',
      description: 'Xây dựng mô hình dữ liệu và kiến trúc phù hợp với quy mô và mục tiêu sử dụng.',
    },
    {
      id: 3,
      icon: 'ri-upload-cloud-line',
      title: 'Thu thập & tích hợp',
      description: 'Kết nối và đưa dữ liệu từ các nguồn về hệ thống tập trung một cách có kiểm soát.',
    },
    {
      id: 4,
      icon: 'ri-filter-line',
      title: 'Làm sạch & chuẩn hóa',
      description: 'Xử lý dữ liệu trùng lặp, thiếu sót và sai lệch để đảm bảo chất lượng thông tin.',
    },
    {
      id: 5,
      icon: 'ri-bar-chart-box-line',
      title: 'Xây dựng báo cáo & dashboard',
      description: 'Thiết kế bảng điều khiển và báo cáo phục vụ từng nhóm đối tượng sử dụng.',
    },
    {
      id: 6,
      icon: 'ri-settings-4-line',
      title: 'Vận hành & tối ưu',
      description: 'Đồng hành giám sát, cập nhật và cải thiện hệ thống dữ liệu theo sự phát triển của tổ chức.',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-file-search-line',
      title: 'Survey Data Sources',
      description: 'Identifying existing data sources, quality and the organization analytics needs.',
    },
    {
      id: 2,
      icon: 'ri-flow-chart',
      title: 'Design Data Architecture',
      description: 'Building a data model and architecture suited to scale and usage goals.',
    },
    {
      id: 3,
      icon: 'ri-upload-cloud-line',
      title: 'Collect & Integrate',
      description: 'Connecting and bringing data from sources into the centralized system in a controlled way.',
    },
    {
      id: 4,
      icon: 'ri-filter-line',
      title: 'Clean & Standardize',
      description: 'Handling duplicate, missing and erroneous data to ensure information quality.',
    },
    {
      id: 5,
      icon: 'ri-bar-chart-box-line',
      title: 'Build Reports & Dashboards',
      description: 'Designing dashboards and reports serving each group of users.',
    },
    {
      id: 6,
      icon: 'ri-settings-4-line',
      title: 'Operate & Optimize',
      description: 'Monitoring, updating and improving the data system as the organization grows.',
    },
  ],
};

export interface DataPrinciple {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const dataPrinciples: Localized<DataPrinciple[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-check-double-line',
      title: 'Dữ liệu chính xác là nền tảng',
      description:
        'Mọi phân tích chỉ có giá trị khi dữ liệu đầu vào đáng tin cậy. Vì vậy việc làm sạch và chuẩn hóa dữ liệu luôn được đặt lên hàng đầu.',
    },
    {
      id: 2,
      icon: 'ri-focus-3-line',
      title: 'Quyết định dựa trên dữ liệu',
      description:
        'Hệ thống dữ liệu được xây dựng nhằm hỗ trợ tổ chức ra quyết định dựa trên thông tin rõ ràng thay vì cảm tính hoặc kinh nghiệm đơn thuần.',
    },
    {
      id: 3,
      icon: 'ri-lock-line',
      title: 'Bảo mật & tuân thủ',
      description:
        'Bảo vệ dữ liệu và tuân thủ quy định là yêu cầu xuyên suốt, từ khâu thu thập, lưu trữ đến phân quyền truy cập và khai thác.',
    },
    {
      id: 4,
      icon: 'ri-user-star-line',
      title: 'Con người làm chủ dữ liệu',
      description:
        'Công cụ và hệ thống chỉ là phương tiện hỗ trợ. Con người vẫn là người đưa ra nhận định và quyết định dựa trên dữ liệu được cung cấp.',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-check-double-line',
      title: 'Accurate Data is the Foundation',
      description:
        'All analysis is only valuable when the input data is reliable. That is why data cleaning and standardization always come first.',
    },
    {
      id: 2,
      icon: 'ri-focus-3-line',
      title: 'Data-Driven Decisions',
      description:
        'The data system is built to help the organization make decisions based on clear information rather than intuition or experience alone.',
    },
    {
      id: 3,
      icon: 'ri-lock-line',
      title: 'Security & Compliance',
      description:
        'Data protection and regulatory compliance are continuous requirements, from collection and storage to access control and exploitation.',
    },
    {
      id: 4,
      icon: 'ri-user-star-line',
      title: 'People Master the Data',
      description:
        'Tools and systems are only supporting means. People still make the judgments and decisions based on the data provided.',
    },
  ],
};

export interface DataFaqItem {
  id: number;
  question: string;
  answer: string;
}

export const dataFaq: Localized<DataFaqItem[]> = {
  vi: [
    {
      id: 1,
      question: 'Phúc Thành Holding hỗ trợ những nội dung quản trị dữ liệu nào?',
      answer:
        'Phúc Thành Holding định hướng hỗ trợ xây dựng kho dữ liệu tập trung, tích hợp và đồng bộ dữ liệu, bảng điều khiển phân tích, báo cáo tự động, chất lượng dữ liệu và bảo mật thông tin.',
    },
    {
      id: 2,
      question: 'Doanh nghiệp nhỏ có cần quản trị và phân tích dữ liệu không?',
      answer:
        'Có. Quản trị dữ liệu giúp tổ chức ở mọi quy mô hiểu rõ hoạt động của mình và ra quyết định chính xác hơn. Với tổ chức nhỏ, nên bắt đầu từ những nhu cầu thiết thực và mở rộng dần theo sự phát triển.',
    },
    {
      id: 3,
      question: 'Dữ liệu của tổ chức có được bảo mật không?',
      answer:
        'Bảo mật và quản trị dữ liệu là một trong những nguyên tắc quan trọng của Phúc Thành Holding. Các yêu cầu về phân quyền và bảo vệ dữ liệu sẽ được trao đổi cụ thể theo từng dự án.',
    },
    {
      id: 4,
      question: 'Nên bắt đầu xây dựng hệ thống dữ liệu từ đâu?',
      answer:
        'Nên bắt đầu từ việc khảo sát nguồn dữ liệu hiện có và xác định rõ nhu cầu phân tích, sau đó mới thiết kế kiến trúc và triển khai theo từng giai đoạn để kiểm soát hiệu quả.',
    },
    {
      id: 5,
      question: 'Làm thế nào để trao đổi nhu cầu quản trị dữ liệu?',
      answer:
        'Tổ chức có thể liên hệ qua trang Liên hệ hợp tác, email phucthanhholding@gmail.com hoặc số điện thoại 0343 089 666 để được trao đổi cụ thể.',
    },
  ],
  en: [
    {
      id: 1,
      question: 'What data management services does Phuc Thanh Holding provide?',
      answer:
        'Phuc Thanh Holding supports centralized data warehouse building, data integration and sync, analytics dashboards, automated reporting, data quality and information security.',
    },
    {
      id: 2,
      question: 'Do small businesses need data management and analytics?',
      answer:
        'Yes. Data management helps organizations of all sizes understand their operations and make more accurate decisions. For small organizations, start with practical needs and expand gradually.',
    },
    {
      id: 3,
      question: 'Is organization data protected?',
      answer:
        'Security and data governance are among Phuc Thanh Holding key principles. Access control and data protection requirements are discussed specifically for each project.',
    },
    {
      id: 4,
      question: 'Where should we start building a data system?',
      answer:
        'Start by surveying existing data sources and clarifying analytics needs, then design the architecture and deploy in phases to control effectiveness.',
    },
    {
      id: 5,
      question: 'How can I discuss data management needs?',
      answer:
        'Organizations can contact us via the Contact page, email phucthanhholding@gmail.com or phone 0343 089 666 for a detailed discussion.',
    },
  ],
};