import type { Localized } from '@/lib/lang';

export interface SoftwareSolution {
  id: number;
  icon: string;
  title: string;
  description: string;
  items: string[];
}

export interface SoftwareApproach {
  id: number;
  icon: string;
  title: string;
  description: string;
  points: string[];
}

export interface SoftwareStage {
  id: number;
  title: string;
  description: string;
  items: string[];
}

export interface SoftwareDeployModel {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface SoftwareValue {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface SoftwareFaqItem {
  id: number;
  question: string;
  answer: string;
}

export const softwareTriggers: Localized<string[]> = {
  vi: [
    'Quy trình nghiệp vụ có tính đặc thù.',
    'Phần mềm có sẵn không đáp ứng đủ yêu cầu.',
    'Nhân viên phải nhập lại dữ liệu trên nhiều hệ thống.',
    'Doanh nghiệp đang quản lý bằng Excel và công cụ rời rạc.',
    'Dữ liệu bị phân tán giữa nhiều bộ phận.',
    'Quy trình phê duyệt còn thủ công.',
    'Báo cáo mất nhiều thời gian tổng hợp.',
    'Doanh nghiệp cần tích hợp với hệ thống hiện có.',
    'Cần kiểm soát chặt quyền truy cập và dữ liệu.',
    'Hệ thống cũ khó mở rộng hoặc không còn được hỗ trợ.',
    'Tổ chức cần xây dựng sản phẩm số mới.',
    'Doanh nghiệp muốn sở hữu nền tảng phù hợp với chiến lược dài hạn.',
  ],
  en: [
    'Business processes have their own specific characteristics.',
    'Off-the-shelf software does not fully meet requirements.',
    'Staff have to re-enter data across multiple systems.',
    'The business still manages everything with Excel and fragmented tools.',
    'Data is scattered across many departments.',
    'Approval processes are still manual.',
    'Reports take a long time to compile.',
    'The business needs to integrate with existing systems.',
    'Tight control over access and data is required.',
    'Legacy systems are hard to scale or no longer supported.',
    'The organization needs to build a new digital product.',
    'The business wants a platform aligned with its long-term strategy.',
  ],
};

export const softwareSolutions: Localized<SoftwareSolution[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-building-4-line',
      title: 'Phần mềm quản trị doanh nghiệp',
      description:
        'Số hóa hoạt động nội bộ, giúp tổ chức vận hành minh bạch, thống nhất và dễ kiểm soát.',
      items: [
        'Quản lý công việc',
        'Quản lý quy trình',
        'Quản lý văn bản',
        'Phê duyệt nội bộ',
        'Quản lý tài sản',
        'Quản lý hợp đồng',
        'Quản lý nhân sự',
        'Dashboard điều hành',
        'Báo cáo quản trị',
      ],
    },
    {
      id: 2,
      icon: 'ri-customer-service-2-line',
      title: 'Phần mềm quản lý khách hàng',
      description:
        'Tập trung hồ sơ và lịch sử tương tác, giúp chăm sóc khách hàng nhất quán và có dữ liệu.',
      items: [
        'Hồ sơ khách hàng',
        'Quản lý cơ hội',
        'Lịch sử tương tác',
        'Quản lý yêu cầu',
        'Chăm sóc sau bán hàng',
        'Quản lý khiếu nại',
        'Lịch hẹn',
        'Báo cáo dịch vụ',
      ],
    },
    {
      id: 3,
      icon: 'ri-graduation-cap-line',
      title: 'Phần mềm đào tạo',
      description:
        'Hỗ trợ quản lý hoạt động đào tạo từ học viên, khóa học đến đánh giá và báo cáo.',
      items: [
        'Quản lý học viên',
        'Quản lý giảng viên',
        'Quản lý khóa học',
        'Lịch học',
        'Nội dung trực tuyến',
        'Kiểm tra và đánh giá',
        'Lộ trình học tập',
        'Báo cáo đào tạo',
      ],
    },
    {
      id: 4,
      icon: 'ri-heart-pulse-line',
      title: 'Phần mềm y tế và chăm sóc sức khỏe',
      description:
        'Hỗ trợ vận hành cơ sở y tế, luôn tuân thủ quy định chuyên ngành về khám chữa bệnh và dữ liệu.',
      items: [
        'Quản lý lịch hẹn',
        'Tiếp đón',
        'Hồ sơ người sử dụng dịch vụ',
        'Quản lý dịch vụ',
        'Kho thuốc và vật tư',
        'Thanh toán',
        'Chăm sóc sau dịch vụ',
        'Báo cáo vận hành',
      ],
    },
    {
      id: 5,
      icon: 'ri-store-2-line',
      title: 'Phần mềm bán hàng và phân phối',
      description:
        'Quản lý toàn bộ chuỗi từ sản phẩm, đơn hàng đến kho, công nợ và báo cáo kinh doanh.',
      items: [
        'Danh mục sản phẩm',
        'Đơn hàng',
        'Khách hàng',
        'Nhà cung cấp',
        'Kho',
        'Công nợ',
        'Chính sách giá',
        'Phân phối',
        'Báo cáo kinh doanh',
      ],
    },
    {
      id: 6,
      icon: 'ri-global-line',
      title: 'Cổng thông tin và nền tảng trực tuyến',
      description:
        'Xây dựng các cổng phục vụ khách hàng, đối tác, nhân viên và cộng đồng trên môi trường số.',
      items: [
        'Website doanh nghiệp',
        'Cổng khách hàng',
        'Cổng đối tác',
        'Cổng nhân viên',
        'Cổng đăng ký dịch vụ',
        'Thư viện tài liệu',
        'Hệ thống đặt lịch',
        'Nền tảng thành viên',
        'Cộng đồng trực tuyến',
      ],
    },
    {
      id: 7,
      icon: 'ri-smartphone-line',
      title: 'Ứng dụng di động',
      description:
        'Đưa trải nghiệm và thao tác lên thiết bị di động, hỗ trợ công việc mọi lúc mọi nơi.',
      items: [
        'Ứng dụng dành cho khách hàng',
        'Ứng dụng nhân viên',
        'Ứng dụng bán hàng',
        'Ứng dụng đặt lịch',
        'Ứng dụng học tập',
        'Ứng dụng theo dõi công việc',
        'Ứng dụng thu thập dữ liệu tại hiện trường',
      ],
    },
    {
      id: 8,
      icon: 'ri-bar-chart-box-line',
      title: 'Dashboard và phân tích dữ liệu',
      description:
        'Tổng hợp dữ liệu từ nhiều nguồn thành thông tin trực quan phục vụ điều hành và ra quyết định.',
      items: [
        'Tổng hợp dữ liệu từ nhiều nguồn',
        'Dashboard điều hành',
        'Báo cáo tự động',
        'Theo dõi chỉ tiêu',
        'Cảnh báo bất thường',
        'Phân tích xu hướng',
        'Phân quyền xem dữ liệu',
        'Xuất báo cáo',
      ],
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-building-4-line',
      title: 'Enterprise management software',
      description:
        'Digitizing internal operations so the organization runs transparently, consistently and under control.',
      items: [
        'Task management',
        'Process management',
        'Document management',
        'Internal approval',
        'Asset management',
        'Contract management',
        'HR management',
        'Executive dashboard',
        'Management reports',
      ],
    },
    {
      id: 2,
      icon: 'ri-customer-service-2-line',
      title: 'Customer management software',
      description:
        'Centralizing profiles and interaction history for consistent, data-driven customer care.',
      items: [
        'Customer profiles',
        'Opportunity management',
        'Interaction history',
        'Request management',
        'After-sales care',
        'Complaint management',
        'Appointments',
        'Service reports',
      ],
    },
    {
      id: 3,
      icon: 'ri-graduation-cap-line',
      title: 'Training software',
      description:
        'Supporting training operations from learners and courses to assessment and reporting.',
      items: [
        'Learner management',
        'Instructor management',
        'Course management',
        'Class schedule',
        'Online content',
        'Testing and assessment',
        'Learning paths',
        'Training reports',
      ],
    },
    {
      id: 4,
      icon: 'ri-heart-pulse-line',
      title: 'Healthcare and medical software',
      description:
        'Supporting healthcare operations while always complying with sector regulations on care and data.',
      items: [
        'Appointment management',
        'Reception',
        'Service user records',
        'Service management',
        'Medicine and supplies inventory',
        'Payment',
        'Post-service care',
        'Operational reports',
      ],
    },
    {
      id: 5,
      icon: 'ri-store-2-line',
      title: 'Sales and distribution software',
      description:
        'Managing the whole chain from products and orders to inventory, receivables and business reports.',
      items: [
        'Product catalog',
        'Orders',
        'Customers',
        'Suppliers',
        'Inventory',
        'Receivables',
        'Pricing policy',
        'Distribution',
        'Business reports',
      ],
    },
    {
      id: 6,
      icon: 'ri-global-line',
      title: 'Portals and online platforms',
      description:
        'Building portals serving customers, partners, employees and communities in the digital space.',
      items: [
        'Corporate website',
        'Customer portal',
        'Partner portal',
        'Employee portal',
        'Service registration portal',
        'Document library',
        'Booking system',
        'Membership platform',
        'Online community',
      ],
    },
    {
      id: 7,
      icon: 'ri-smartphone-line',
      title: 'Mobile applications',
      description:
        'Bringing experience and workflows to mobile devices, supporting work anytime, anywhere.',
      items: [
        'Customer app',
        'Employee app',
        'Sales app',
        'Booking app',
        'Learning app',
        'Task tracking app',
        'Field data collection app',
      ],
    },
    {
      id: 8,
      icon: 'ri-bar-chart-box-line',
      title: 'Dashboards and data analytics',
      description:
        'Aggregating data from multiple sources into visual insight for management and decision-making.',
      items: [
        'Multi-source data aggregation',
        'Executive dashboard',
        'Automated reports',
        'KPI tracking',
        'Anomaly alerts',
        'Trend analysis',
        'Data viewing permissions',
        'Report export',
      ],
    },
  ],
};

export const softwareApproaches: Localized<SoftwareApproach[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-question-answer-line',
      title: 'Hiểu bài toán trước khi viết mã',
      description:
        'Một yêu cầu như “cần phần mềm quản lý” chưa đủ để bắt đầu dự án. Giai đoạn khảo sát cần trả lời rõ các câu hỏi nền tảng.',
      points: [
        'Ai sử dụng hệ thống?',
        'Người dùng đang làm việc như thế nào?',
        'Vấn đề lớn nhất là gì?',
        'Dữ liệu đang nằm ở đâu?',
        'Những bước nào có thể chuẩn hóa?',
        'Hệ thống cần tích hợp với đâu?',
        'Thành công được đo bằng chỉ tiêu nào?',
        'Rủi ro pháp lý và bảo mật là gì?',
      ],
    },
    {
      id: 2,
      icon: 'ri-user-heart-line',
      title: 'Thiết kế lấy người dùng làm trung tâm',
      description:
        'Phần mềm phải phù hợp với khả năng, điều kiện và bối cảnh làm việc của người sử dụng.',
      points: [
        'Điều hướng rõ ràng',
        'Ít thao tác không cần thiết',
        'Ngôn ngữ gần với nghiệp vụ',
        'Hoạt động tốt trên thiết bị phù hợp',
        'Có trạng thái tải, rỗng, lỗi và thành công',
        'Khả năng tiếp cận bằng bàn phím',
        'Phản hồi rõ sau mỗi hành động',
        'Hạn chế nhập lại dữ liệu',
      ],
    },
    {
      id: 3,
      icon: 'ri-stack-line',
      title: 'Phát triển theo từng giai đoạn',
      description:
        'Thay vì xây dựng toàn bộ hệ thống trong một lần, dự án được chia thành các giai đoạn có thể kiểm soát.',
      points: [
        'Phiên bản nền tảng',
        'Chức năng cốt lõi',
        'Thử nghiệm với nhóm người dùng',
        'Điều chỉnh theo phản hồi',
        'Mở rộng phạm vi',
        'Tối ưu và tích hợp',
      ],
    },
    {
      id: 4,
      icon: 'ri-database-2-line',
      title: 'Dữ liệu là tài sản của doanh nghiệp',
      description:
        'Hệ thống cần xác định rõ cách dữ liệu được thu thập, lưu trữ, bảo vệ và khôi phục.',
      points: [
        'Dữ liệu nào được thu thập',
        'Mục đích sử dụng',
        'Người có quyền truy cập',
        'Nơi lưu trữ và thời hạn lưu giữ',
        'Cách sao lưu và khôi phục',
        'Cách xuất và xóa dữ liệu',
        'Trách nhiệm của từng bên',
      ],
    },
    {
      id: 5,
      icon: 'ri-shield-keyhole-line',
      title: 'Bảo mật ngay từ thiết kế',
      description:
        'Bảo mật không phải tính năng được bổ sung sau khi phần mềm hoàn thành.',
      points: [
        'Phân quyền theo vai trò',
        'Nguyên tắc quyền tối thiểu',
        'Xác thực nhiều lớp',
        'Mã hóa kết nối',
        'Bảo vệ API',
        'Nhật ký hoạt động',
        'Sao lưu và phục hồi',
        'Quy trình xử lý sự cố',
      ],
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-question-answer-line',
      title: 'Understand the problem before writing code',
      description:
        'A request like “we need management software” is not enough to start a project. The survey phase must answer the fundamental questions.',
      points: [
        'Who will use the system?',
        'How do users currently work?',
        'What is the biggest problem?',
        'Where does the data live?',
        'Which steps can be standardized?',
        'What does the system need to integrate with?',
        'What metrics measure success?',
        'What are the legal and security risks?',
      ],
    },
    {
      id: 2,
      icon: 'ri-user-heart-line',
      title: 'User-centered design',
      description:
        'Software must fit the ability, conditions and working context of its users.',
      points: [
        'Clear navigation',
        'Fewer unnecessary actions',
        'Language close to the business',
        'Works well on the right devices',
        'Loading, empty, error and success states',
        'Keyboard accessibility',
        'Clear feedback after every action',
        'Minimize data re-entry',
      ],
    },
    {
      id: 3,
      icon: 'ri-stack-line',
      title: 'Incremental development',
      description:
        'Instead of building the entire system at once, the project is broken into manageable phases.',
      points: [
        'Foundation version',
        'Core features',
        'Pilot with a user group',
        'Adjust based on feedback',
        'Expand scope',
        'Optimize and integrate',
      ],
    },
    {
      id: 4,
      icon: 'ri-database-2-line',
      title: 'Data is a business asset',
      description:
        'The system must clearly define how data is collected, stored, protected and recovered.',
      points: [
        'What data is collected',
        'Purpose of use',
        'Who has access',
        'Storage location and retention period',
        'Backup and recovery',
        'Data export and deletion',
        'Responsibilities of each party',
      ],
    },
    {
      id: 5,
      icon: 'ri-shield-keyhole-line',
      title: 'Security by design',
      description:
        'Security is not a feature added after the software is complete.',
      points: [
        'Role-based access',
        'Least-privilege principle',
        'Multi-factor authentication',
        'Connection encryption',
        'API protection',
        'Activity logs',
        'Backup and recovery',
        'Incident response process',
      ],
    },
  ],
};

export const softwareStages: Localized<SoftwareStage[]> = {
  vi: [
    {
      id: 1,
      title: 'Tiếp nhận nhu cầu',
      description:
        'Trao đổi để hiểu mục tiêu, phạm vi ban đầu, người sử dụng và vấn đề cần giải quyết.',
      items: ['Mục tiêu kinh doanh', 'Phạm vi ban đầu', 'Đối tượng người dùng', 'Vấn đề cần giải quyết'],
    },
    {
      id: 2,
      title: 'Khảo sát nghiệp vụ',
      description:
        'Đội dự án tìm hiểu quy trình, dữ liệu, vai trò và hệ thống đang sử dụng.',
      items: ['Quy trình hiện tại', 'Biểu mẫu', 'Dữ liệu', 'Điểm nghẽn', 'Yêu cầu báo cáo', 'Nhu cầu tích hợp'],
    },
    {
      id: 3,
      title: 'Phân tích và thiết kế',
      description:
        'Chuyển khảo sát thành sơ đồ quy trình, mô hình dữ liệu và nguyên mẫu giao diện.',
      items: ['Sơ đồ quy trình', 'Danh sách chức năng', 'Mô hình dữ liệu', 'Phân quyền', 'Nguyên mẫu giao diện'],
    },
    {
      id: 4,
      title: 'Phát triển',
      description:
        'Phát triển theo từng phần có thể kiểm tra, trình diễn và nhận phản hồi.',
      items: ['Phát triển theo phần', 'Trình diễn định kỳ', 'Đánh giá thay đổi', 'Cập nhật tiến độ'],
    },
    {
      id: 5,
      title: 'Kiểm thử',
      description:
        'Kiểm tra chức năng, phân quyền, tích hợp, dữ liệu, hiệu năng và bảo mật.',
      items: ['Kiểm thử chức năng', 'Kiểm thử phân quyền', 'Kiểm thử tích hợp', 'Kiểm thử bảo mật', 'Kiểm thử chấp nhận'],
    },
    {
      id: 6,
      title: 'Triển khai',
      description:
        'Chuẩn bị hạ tầng, chuyển đổi dữ liệu, đào tạo và đưa vào vận hành.',
      items: ['Chuẩn bị hạ tầng', 'Chuyển đổi dữ liệu', 'Tạo người dùng', 'Đào tạo', 'Chạy thử'],
    },
    {
      id: 7,
      title: 'Bảo hành và đồng hành',
      description:
        'Theo dõi, sửa lỗi, cập nhật bảo mật và phát triển thêm theo nhu cầu.',
      items: ['Theo dõi', 'Sửa lỗi', 'Cập nhật bảo mật', 'Hỗ trợ người dùng', 'Đánh giá hiệu quả'],
    },
  ],
  en: [
    {
      id: 1,
      title: 'Receiving requirements',
      description:
        'Discussing to understand goals, initial scope, users and the problem to solve.',
      items: ['Business goals', 'Initial scope', 'Target users', 'Problem to solve'],
    },
    {
      id: 2,
      title: 'Business survey',
      description:
        'The project team studies current processes, data, roles and systems in use.',
      items: ['Current process', 'Forms', 'Data', 'Bottlenecks', 'Reporting needs', 'Integration needs'],
    },
    {
      id: 3,
      title: 'Analysis and design',
      description:
        'Turning the survey into process maps, data models and interface prototypes.',
      items: ['Process maps', 'Feature list', 'Data model', 'Permissions', 'UI prototype'],
    },
    {
      id: 4,
      title: 'Development',
      description:
        'Developing in testable, demoable parts that receive feedback.',
      items: ['Incremental development', 'Periodic demos', 'Change evaluation', 'Progress updates'],
    },
    {
      id: 5,
      title: 'Testing',
      description:
        'Checking features, permissions, integration, data, performance and security.',
      items: ['Functional testing', 'Permission testing', 'Integration testing', 'Security testing', 'Acceptance testing'],
    },
    {
      id: 6,
      title: 'Deployment',
      description:
        'Preparing infrastructure, migrating data, training and going live.',
      items: ['Infrastructure setup', 'Data migration', 'User creation', 'Training', 'Trial run'],
    },
    {
      id: 7,
      title: 'Warranty and support',
      description:
        'Monitoring, fixing bugs, updating security and developing further as needed.',
      items: ['Monitoring', 'Bug fixing', 'Security updates', 'User support', 'Effectiveness review'],
    },
  ],
};

export const softwareTechFactors: Localized<string[]> = {
  vi: [
    'Số lượng người dùng',
    'Số giao dịch',
    'Loại dữ liệu',
    'Mức độ tích hợp',
    'Yêu cầu bảo mật',
    'Khả năng mở rộng',
    'Hạ tầng của khách hàng',
    'Năng lực vận hành',
    'Tổng chi phí sở hữu',
    'Khả năng bảo trì lâu dài',
  ],
  en: [
    'Number of users',
    'Number of transactions',
    'Type of data',
    'Level of integration',
    'Security requirements',
    'Scalability',
    'Customer infrastructure',
    'Operational capability',
    'Total cost of ownership',
    'Long-term maintainability',
  ],
};

export const softwareDeployModels: Localized<SoftwareDeployModel[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-cloud-line',
      title: 'Cloud',
      description:
        'Phù hợp với doanh nghiệp muốn triển khai linh hoạt, dễ mở rộng và giảm công việc quản lý máy chủ.',
    },
    {
      id: 2,
      icon: 'ri-server-line',
      title: 'Hạ tầng riêng',
      description:
        'Phù hợp với tổ chức có yêu cầu kiểm soát dữ liệu, mạng nội bộ hoặc chính sách bảo mật riêng.',
    },
    {
      id: 3,
      icon: 'ri-git-branch-line',
      title: 'Mô hình kết hợp',
      description:
        'Một phần hệ thống vận hành trên cloud, phần dữ liệu hoặc dịch vụ đặc thù được đặt tại hạ tầng của khách hàng.',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-cloud-line',
      title: 'Cloud',
      description:
        'Suited to businesses wanting flexible deployment, easy scaling and less server management.',
    },
    {
      id: 2,
      icon: 'ri-server-line',
      title: 'On-premises',
      description:
        'Suited to organizations with data control, internal network or dedicated security policy requirements.',
    },
    {
      id: 3,
      icon: 'ri-git-branch-line',
      title: 'Hybrid model',
      description:
        'Part of the system runs on cloud, while specific data or services stay on the customer infrastructure.',
    },
  ],
};

export const softwareIntegrations: Localized<string[]> = {
  vi: [
    'Website',
    'Ứng dụng di động',
    'CRM',
    'ERP',
    'Hệ thống nhân sự',
    'Hệ thống kế toán',
    'Hóa đơn điện tử',
    'Thanh toán',
    'Email và SMS',
    'Tổng đài',
    'Kho dữ liệu',
    'Công cụ báo cáo',
    'Chữ ký số',
    'Dịch vụ định danh',
    'Thiết bị được phép',
    'API của đối tác',
  ],
  en: [
    'Website',
    'Mobile app',
    'CRM',
    'ERP',
    'HR system',
    'Accounting system',
    'E-invoicing',
    'Payments',
    'Email and SMS',
    'Call center',
    'Data warehouse',
    'Reporting tools',
    'Digital signature',
    'Identity services',
    'Approved devices',
    'Partner APIs',
  ],
};

export const softwareAiCan: Localized<string[]> = {
  vi: [
    'Phân loại dữ liệu',
    'Tóm tắt nội dung',
    'Hỗ trợ tìm kiếm',
    'Gợi ý quy trình',
    'Soạn bản nháp',
    'Phân tích xu hướng',
    'Phát hiện bất thường',
    'Hỗ trợ người dùng',
    'Tự động hóa công việc lặp lại',
  ],
  en: [
    'Data classification',
    'Content summarization',
    'Search assistance',
    'Process suggestions',
    'Draft creation',
    'Trend analysis',
    'Anomaly detection',
    'User support',
    'Automating repetitive work',
  ],
};

export const softwareAiCannot: Localized<string[]> = {
  vi: [
    'Không tự quyết định vấn đề ảnh hưởng nghiêm trọng đến con người',
    'Kết quả cần được kiểm chứng',
    'Dữ liệu nhạy cảm phải được bảo vệ',
    'Người dùng phải biết khi đang tương tác với AI',
    'Phải có cơ chế chuyển sang người phụ trách',
    'Không dùng AI chỉ để tạo cảm giác sản phẩm hiện đại',
  ],
  en: [
    'Must not independently decide matters seriously affecting people',
    'Results must be verified',
    'Sensitive data must be protected',
    'Users must know when interacting with AI',
    'There must be a handover mechanism to a person',
    'Do not use AI just to seem modern',
  ],
};

export const softwareOwnership: Localized<string[]> = {
  vi: [
    'Quyền sở hữu mã nguồn',
    'Quyền sử dụng phần mềm',
    'Quyền sở hữu dữ liệu',
    'Thành phần của bên thứ ba',
    'Giấy phép thư viện',
    'Tài liệu bàn giao',
    'Tài khoản quản trị',
    'Môi trường triển khai',
    'Quy trình sao lưu',
    'Phạm vi bảo hành',
    'Chi phí bảo trì',
    'Điều kiện chấm dứt',
    'Cách xuất dữ liệu',
    'Trách nhiệm khi chuyển nhà cung cấp',
  ],
  en: [
    'Source code ownership',
    'Software usage rights',
    'Data ownership',
    'Third-party components',
    'Library licenses',
    'Handover documentation',
    'Admin accounts',
    'Deployment environment',
    'Backup process',
    'Warranty scope',
    'Maintenance costs',
    'Termination conditions',
    'Data export method',
    'Responsibilities when switching providers',
  ],
};

export const softwareAcceptanceCriteria: Localized<string[]> = {
  vi: [
    'Ai được sử dụng?',
    'Dữ liệu đầu vào là gì?',
    'Kết quả mong đợi là gì?',
    'Trường hợp lỗi được xử lý thế nào?',
    'Quyền truy cập ra sao?',
    'Báo cáo hiển thị dữ liệu nào?',
    'Hiệu năng chấp nhận được là bao nhiêu?',
    'Dữ liệu chuyển đổi được đối chiếu thế nào?',
  ],
  en: [
    'Who can use it?',
    'What is the input data?',
    'What is the expected result?',
    'How are error cases handled?',
    'What are the access rights?',
    'What data do reports show?',
    'What performance is acceptable?',
    'How is migrated data reconciled?',
  ],
};

export const softwareAcceptanceDone: Localized<string[]> = {
  vi: [
    'Đáp ứng yêu cầu',
    'Được kiểm thử',
    'Có phân quyền phù hợp',
    'Hoạt động trên thiết bị mục tiêu',
    'Có hướng dẫn sử dụng',
    'Được người có thẩm quyền nghiệm thu',
  ],
  en: [
    'Meets requirements',
    'Is tested',
    'Has proper permissions',
    'Works on target devices',
    'Has user guidance',
    'Is accepted by an authorized person',
  ],
};

export const softwareAudience: Localized<string[]> = {
  vi: [
    'Doanh nghiệp có quy trình đặc thù',
    'Tổ chức đang phụ thuộc quá nhiều vào Excel',
    'Doanh nghiệp cần tích hợp nhiều hệ thống',
    'Đơn vị muốn xây dựng sản phẩm số',
    'Chuỗi cơ sở cần quản lý tập trung',
    'Tổ chức cần kiểm soát dữ liệu',
    'Doanh nghiệp đang thay thế phần mềm cũ',
    'Đơn vị cần dashboard riêng',
    'Tổ chức có quy trình phê duyệt phức tạp',
    'Doanh nghiệp cần nền tảng có khả năng mở rộng',
  ],
  en: [
    'Businesses with specific processes',
    'Organizations overly dependent on Excel',
    'Businesses needing to integrate many systems',
    'Units wanting to build a digital product',
    'Chains needing centralized management',
    'Organizations needing data control',
    'Businesses replacing legacy software',
    'Units needing a custom dashboard',
    'Organizations with complex approval processes',
    'Businesses needing a scalable platform',
  ],
};

export const softwareValues: Localized<SoftwareValue[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-focus-3-line',
      title: 'Phù hợp nghiệp vụ',
      description: 'Phần mềm được xây dựng dựa trên quy trình và mục tiêu thực tế của tổ chức.',
    },
    {
      id: 2,
      icon: 'ri-database-2-line',
      title: 'Dữ liệu tập trung',
      description: 'Thông tin được kết nối và quản lý có cấu trúc, giảm tình trạng phân tán.',
    },
    {
      id: 3,
      icon: 'ri-eye-line',
      title: 'Quy trình minh bạch',
      description: 'Trách nhiệm, trạng thái, thời hạn và lịch sử xử lý được ghi nhận rõ ràng.',
    },
    {
      id: 4,
      icon: 'ri-link',
      title: 'Khả năng tích hợp',
      description: 'Hệ thống kết nối với các nền tảng phù hợp thay vì thành kho dữ liệu riêng biệt.',
    },
    {
      id: 5,
      icon: 'ri-expand-diagonal-line',
      title: 'Khả năng mở rộng',
      description: 'Kiến trúc được thiết kế để bổ sung chức năng khi nhu cầu phát triển.',
    },
    {
      id: 6,
      icon: 'ri-compass-3-line',
      title: 'Kiểm soát dài hạn',
      description: 'Doanh nghiệp hiểu rõ dữ liệu, quyền sử dụng, chi phí vận hành và điều kiện bàn giao.',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-focus-3-line',
      title: 'Business fit',
      description: 'Software is built on the organization real processes and goals.',
    },
    {
      id: 2,
      icon: 'ri-database-2-line',
      title: 'Centralized data',
      description: 'Information is connected and managed structurally, reducing fragmentation.',
    },
    {
      id: 3,
      icon: 'ri-eye-line',
      title: 'Transparent process',
      description: 'Responsibilities, status, deadlines and processing history are clearly recorded.',
    },
    {
      id: 4,
      icon: 'ri-link',
      title: 'Integration capability',
      description: 'The system connects with suitable platforms instead of becoming an isolated data silo.',
    },
    {
      id: 5,
      icon: 'ri-expand-diagonal-line',
      title: 'Scalability',
      description: 'The architecture is designed to add features as needs grow.',
    },
    {
      id: 6,
      icon: 'ri-compass-3-line',
      title: 'Long-term control',
      description: 'The business clearly understands data, usage rights, operating costs and handover terms.',
    },
  ],
};

export const softwareStartSteps: Localized<string[]> = {
  vi: [
    'Khảo sát hiện trạng',
    'Xác định bài toán ưu tiên',
    'Đề xuất phạm vi khả thi',
    'Xây dựng nguyên mẫu',
    'Phát triển theo từng giai đoạn',
    'Đo lường và cải tiến sau triển khai',
  ],
  en: [
    'Survey the current state',
    'Identify the priority problem',
    'Propose a feasible scope',
    'Build a prototype',
    'Develop in phases',
    'Measure and improve after deployment',
  ],
};

export const softwareFaq: Localized<SoftwareFaqItem[]> = {
  vi: [
    {
      id: 1,
      question: 'Khi nào doanh nghiệp nên chọn phần mềm theo yêu cầu thay vì phần mềm có sẵn?',
      answer:
        'Khi quy trình nghiệp vụ có tính đặc thù, phần mềm có sẵn không đáp ứng đủ yêu cầu, cần tích hợp sâu với hệ thống hiện có hoặc muốn sở hữu nền tảng phù hợp với chiến lược dài hạn. Nếu một sản phẩm có sẵn đáp ứng tốt với chi phí và rủi ro thấp hơn, nên ưu tiên cấu hình hoặc tích hợp thay vì xây dựng lại từ đầu.',
    },
    {
      id: 2,
      question: 'Quy trình phát triển phần mềm theo yêu cầu diễn ra như thế nào?',
      answer:
        'Quy trình gồm 7 giai đoạn: tiếp nhận nhu cầu, khảo sát nghiệp vụ, phân tích và thiết kế, phát triển, kiểm thử, triển khai và bảo hành. Tiến độ được cập nhật thường xuyên để hai bên cùng nắm rõ tình trạng dự án.',
    },
    {
      id: 3,
      question: 'Phúc Thành Holding có nhận dự án phần mềm theo yêu cầu riêng không?',
      answer:
        'Có. Phúc Thành Holding làm việc trực tiếp với khách hàng để phân tích bài toán cụ thể và đề xuất giải pháp phù hợp với quy trình và mục tiêu của từng tổ chức, phát triển theo từng giai đoạn có thể kiểm soát.',
    },
    {
      id: 4,
      question: 'Dữ liệu của khách hàng có được bảo mật không?',
      answer:
        'Bảo mật được thiết kế ngay từ đầu, gồm phân quyền theo vai trò, mã hóa kết nối, nhật ký hoạt động và quy trình xử lý sự cố. Các hệ thống xử lý dữ liệu sức khỏe, tài chính, nhân sự cần mức bảo vệ cao hơn theo quy định.',
    },
    {
      id: 5,
      question: 'Quyền sở hữu mã nguồn và dữ liệu thuộc về ai?',
      answer:
        'Quyền sở hữu mã nguồn, dữ liệu, thư viện bên thứ ba và điều kiện bàn giao sẽ được quy định rõ trong hợp đồng trước khi triển khai. Doanh nghiệp phải có khả năng tiếp cận và xuất dữ liệu của mình theo thỏa thuận.',
    },
    {
      id: 6,
      question: 'Sau khi bàn giao có được hỗ trợ tiếp không?',
      answer:
        'Có. Phúc Thành Holding đồng hành lâu dài với các hoạt động theo dõi, sửa lỗi, cập nhật bảo mật, hỗ trợ người dùng và phát triển thêm chức năng theo nhu cầu phát sinh của tổ chức.',
    },
  ],
  en: [
    {
      id: 1,
      question: 'When should a business choose custom software over off-the-shelf software?',
      answer:
        'When business processes are specific, off-the-shelf software does not fully meet requirements, deep integration with existing systems is needed, or the business wants a platform aligned with its long-term strategy. If a ready-made product fits well with lower cost and risk, configuration or integration should be prioritized over rebuilding from scratch.',
    },
    {
      id: 2,
      question: 'How does the custom software development process work?',
      answer:
        'The process has 7 stages: receiving requirements, business survey, analysis and design, development, testing, deployment and warranty. Progress is updated regularly so both sides stay informed.',
    },
    {
      id: 3,
      question: 'Does Phuc Thanh Holding take on custom software projects?',
      answer:
        'Yes. Phuc Thanh Holding works directly with customers to analyze the specific problem and propose a solution suited to each organization processes and goals, developing in controllable phases.',
    },
    {
      id: 4,
      question: 'Is customer data protected?',
      answer:
        'Security is designed from the start, including role-based access, connection encryption, activity logs and incident response. Systems handling health, financial and HR data require a higher level of protection as regulated.',
    },
    {
      id: 5,
      question: 'Who owns the source code and data?',
      answer:
        'Source code, data, third-party libraries and handover terms are clearly defined in the contract before implementation. The business must be able to access and export its data as agreed.',
    },
    {
      id: 6,
      question: 'Is support available after handover?',
      answer:
        'Yes. Phuc Thanh Holding provides long-term support including monitoring, bug fixing, security updates, user support and developing additional features as the organization needs evolve.',
    },
  ],
};