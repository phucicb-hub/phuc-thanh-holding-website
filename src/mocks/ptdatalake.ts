import type { Localized } from '@/lib/lang';

/* ---------- Shared image ---------- */
export const ptDatalakeHeroImage =
  'https://readdy.ai/api/search-image?query=Wide%20abstract%20visualization%20of%20a%20modern%20data%20lake%20architecture%2C%20flowing%20streams%20of%20glowing%20data%20particles%20converging%20into%20a%20central%20luminous%20reservoir%2C%20emerald%20green%20and%20teal%20gradient%20with%20warm%20golden%20accent%20highlights%2C%20clean%20minimal%20corporate%20technology%20aesthetic%2C%20soft%20cinematic%20lighting%2C%20high%20detail%20editorial%20style%2C%20no%20text&width=1600&height=600&seq=ptdatalake-hero-1&orientation=landscape';

/* ---------- Hero ---------- */
export interface PtDatalakeHero {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
}

export const ptDatalakeHero: Localized<PtDatalakeHero> = {
  vi: {
    badge: 'Kho dữ liệu tập trung',
    title: 'PT-DataLake',
    subtitle: 'Kết nối dữ liệu phân tán, xây dựng nền tảng cho quản trị và trí tuệ nhân tạo',
    description:
      'Dữ liệu của doanh nghiệp thường phân tán trong nhiều phần mềm, bảng tính, cơ sở dữ liệu, tài liệu và nền tảng trực tuyến. PT-DataLake là kho dữ liệu tập trung được Phúc Thành Holding định hướng phát triển nhằm giúp tổ chức thu thập, lưu trữ, quản trị và khai thác dữ liệu từ nhiều nguồn trên một nền tảng thống nhất.',
    primaryCta: 'Yêu cầu tư vấn PT-DataLake',
    secondaryCta: 'Đề xuất dự án dữ liệu',
  },
  en: {
    badge: 'Centralized data platform',
    title: 'PT-DataLake',
    subtitle: 'Connecting scattered data to build the foundation for governance and AI',
    description:
      'Enterprise data is often scattered across many software, spreadsheets, databases, documents and online platforms. PT-DataLake is a centralized data platform being developed by Phuc Thanh Holding to help organizations collect, store, govern and leverage data from multiple sources on one unified platform.',
    primaryCta: 'Request PT-DataLake consulting',
    secondaryCta: 'Propose a data project',
  },
};

/* ---------- Shared section text ---------- */
export interface PtDatalakeSectionText {
  title: string;
  description: string;
}

/* ---------- Islands (ốc đảo dữ liệu) ---------- */
export const ptDatalakeIslandsTitle: Localized<PtDatalakeSectionText> = {
  vi: {
    title: 'Từ những “ốc đảo dữ liệu” đến một nền tảng thống nhất',
    description:
      'Trong nhiều tổ chức, dữ liệu được lưu trữ rải rác tại nhiều hệ thống. PT-DataLake hướng tới kết nối các nguồn này thành một luồng dữ liệu xuyên suốt, có kiểm soát và có người chịu trách nhiệm ở từng bước.',
  },
  en: {
    title: 'From scattered data islands to a unified platform',
    description:
      'In many organizations, data is stored across many systems. PT-DataLake aims to connect these sources into one continuous, controlled data flow with clear accountability at every step.',
  },
};

export const ptDatalakeSourceSystems: Localized<string[]> = {
  vi: [
    'Phần mềm bán hàng',
    'Hệ thống kế toán',
    'CRM',
    'ERP',
    'Phần mềm nhân sự',
    'Website và ứng dụng',
    'Hệ thống chăm sóc khách hàng',
    'PT-LMS',
    'PT-Care',
    'PT-Clinic',
    'Tệp Excel và CSV',
    'Cơ sở dữ liệu nội bộ',
    'Dịch vụ đám mây',
    'Thiết bị và hệ thống chuyên ngành',
    'Tài liệu phi cấu trúc',
  ],
  en: [
    'Sales software',
    'Accounting systems',
    'CRM',
    'ERP',
    'HR software',
    'Websites and apps',
    'Customer care systems',
    'PT-LMS',
    'PT-Care',
    'PT-Clinic',
    'Excel and CSV files',
    'Internal databases',
    'Cloud services',
    'Specialized devices and systems',
    'Unstructured documents',
  ],
};

export const ptDatalakeFlow: Localized<string[]> = {
  vi: [
    'Nguồn dữ liệu',
    'Thu thập và đồng bộ',
    'Kiểm tra chất lượng',
    'Lưu trữ theo lớp',
    'Chuẩn hóa và quản trị',
    'Phân quyền khai thác',
    'Báo cáo, phân tích và AI',
  ],
  en: [
    'Data sources',
    'Collection and sync',
    'Quality checks',
    'Layered storage',
    'Standardization and governance',
    'Access control',
    'Reporting, analytics and AI',
  ],
};

/* ---------- Governance (không phải nơi chứa vô hạn) ---------- */
export const ptDatalakeGovernanceTitle: Localized<PtDatalakeSectionText> = {
  vi: {
    title: 'Data Lake không phải nơi chứa dữ liệu không giới hạn',
    description:
      'Một kho dữ liệu không có cấu trúc quản trị dễ trở thành “đầm lầy dữ liệu”: chứa nhiều thông tin nhưng khó tìm, khó hiểu và không đáng tin cậy. PT-DataLake được định hướng theo các nguyên tắc quản trị rõ ràng.',
  },
  en: {
    title: 'A data lake is not unlimited, ungoverned storage',
    description:
      'A data lake without governance easily becomes a data swamp: full of information but hard to find, hard to understand and untrustworthy. PT-DataLake is guided by clear governance principles.',
  },
};

export const ptDatalakePrinciples: Localized<string[]> = {
  vi: [
    'Dữ liệu được đưa vào phải có mục đích',
    'Mỗi tập dữ liệu cần có chủ sở hữu',
    'Nguồn gốc phải được ghi nhận',
    'Chất lượng phải được kiểm tra',
    'Quyền truy cập phải được kiểm soát',
    'Dữ liệu nhạy cảm phải được phân loại',
    'Thời hạn lưu trữ phải rõ ràng',
    'Thay đổi quan trọng phải có lịch sử',
    'Dữ liệu phục vụ báo cáo cần có định nghĩa thống nhất',
    'Dữ liệu dùng cho AI phải được đánh giá về chất lượng và quyền sử dụng',
  ],
  en: [
    'Ingested data must have a purpose',
    'Every dataset must have an owner',
    'Lineage must be recorded',
    'Quality must be checked',
    'Access must be controlled',
    'Sensitive data must be classified',
    'Retention periods must be clear',
    'Important changes must be versioned',
    'Reporting data needs unified definitions',
    'AI-ready data must be assessed for quality and usage rights',
  ],
};

/* ---------- Layers (kiến trúc nhiều lớp) ---------- */
export const ptDatalakeLayersTitle: Localized<PtDatalakeSectionText> = {
  vi: {
    title: 'Kiến trúc dữ liệu theo nhiều lớp',
    description:
      'PT-DataLake có thể được thiết kế theo kiến trúc nhiều lớp để phân tách dữ liệu gốc, dữ liệu đã xử lý và dữ liệu sẵn sàng khai thác.',
  },
  en: {
    title: 'Multi-layer data architecture',
    description:
      'PT-DataLake can be designed as a layered architecture separating raw data, processed data and ready-to-use data.',
  },
};

export interface PtDatalakeLayer {
  id: number;
  icon: string;
  title: string;
  description: string;
  items: string[];
}

export const ptDatalakeLayers: Localized<PtDatalakeLayer[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-archive-line',
      title: 'Lớp dữ liệu gốc',
      description: 'Lưu dữ liệu gần với trạng thái ban đầu nhất, không mặc nhiên được phép sử dụng rộng rãi.',
      items: [
        'Bảo toàn nguồn',
        'Đối chiếu khi cần',
        'Hỗ trợ xử lý lại',
        'Ghi nhận thời điểm tiếp nhận',
        'Theo dõi phiên bản',
      ],
    },
    {
      id: 2,
      icon: 'ri-eraser-line',
      title: 'Lớp dữ liệu đã làm sạch',
      description: 'Dữ liệu được xử lý để sẵn sàng cho các bước tiếp theo.',
      items: [
        'Chuẩn hóa định dạng',
        'Loại bỏ hoặc đánh dấu bản ghi lỗi',
        'Kiểm tra kiểu dữ liệu',
        'Xử lý trùng lặp',
        'Chuẩn hóa mã',
        'Bổ sung thông tin kỹ thuật',
        'Liên kết với nguồn gốc',
      ],
    },
    {
      id: 3,
      icon: 'ri-database-2-line',
      title: 'Lớp dữ liệu nghiệp vụ',
      description: 'Dữ liệu được tổ chức theo các chủ đề nghiệp vụ.',
      items: [
        'Khách hàng',
        'Sản phẩm',
        'Đơn hàng',
        'Tài chính',
        'Nhân sự',
        'Đào tạo',
        'Vận hành',
        'Chăm sóc khách hàng',
        'Dịch vụ',
        'Kho và tài sản',
      ],
    },
    {
      id: 4,
      icon: 'ri-bar-chart-2-line',
      title: 'Lớp dữ liệu phục vụ khai thác',
      description: 'Cung cấp dữ liệu đã được chuẩn hóa cho các nhu cầu khai thác.',
      items: [
        'Dashboard',
        'Báo cáo',
        'Phân tích',
        'API',
        'Ứng dụng nghiệp vụ',
        'Mô hình dự báo',
        'Hệ thống AI được cấp quyền',
      ],
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-archive-line',
      title: 'Raw data layer',
      description: 'Stores data closest to its original state, not freely available for broad use.',
      items: [
        'Preserve the source',
        'Reconcile when needed',
        'Support reprocessing',
        'Record ingestion time',
        'Track versions',
      ],
    },
    {
      id: 2,
      icon: 'ri-eraser-line',
      title: 'Cleaned data layer',
      description: 'Data is processed to be ready for the next steps.',
      items: [
        'Normalize formats',
        'Remove or flag bad records',
        'Validate data types',
        'Handle duplicates',
        'Standardize codes',
        'Add technical metadata',
        'Link to source',
      ],
    },
    {
      id: 3,
      icon: 'ri-database-2-line',
      title: 'Business data layer',
      description: 'Data is organized around business subjects.',
      items: [
        'Customers',
        'Products',
        'Orders',
        'Finance',
        'HR',
        'Training',
        'Operations',
        'Customer care',
        'Services',
        'Warehouse and assets',
      ],
    },
    {
      id: 4,
      icon: 'ri-bar-chart-2-line',
      title: 'Consumption-ready layer',
      description: 'Provides standardized data for exploitation needs.',
      items: [
        'Dashboards',
        'Reports',
        'Analytics',
        'APIs',
        'Business apps',
        'Forecast models',
        'Authorized AI systems',
      ],
    },
  ],
};

export const ptDatalakeLakehouseTitle: Localized<PtDatalakeSectionText> = {
  vi: {
    title: 'Hướng tới kiến trúc Lakehouse',
    description:
      'PT-DataLake có thể được định hướng theo mô hình lakehouse, kết hợp lưu trữ linh hoạt của data lake với cấu trúc quản trị của data warehouse. Kiến trúc cuối cùng phải dựa trên quy mô, loại dữ liệu, hạ tầng, ngân sách và năng lực vận hành của khách hàng.',
  },
  en: {
    title: 'Moving toward a Lakehouse architecture',
    description:
      'PT-DataLake can follow the lakehouse model, combining the flexible storage of a data lake with the governance of a data warehouse. The final architecture depends on scale, data types, infrastructure, budget and operational capability.',
  },
};

export const ptDatalakeLakehouseFeatures: Localized<string[]> = {
  vi: [
    'Khả năng lưu trữ linh hoạt của data lake',
    'Cấu trúc quản trị của data warehouse',
    'Kiểm soát phiên bản',
    'Chất lượng dữ liệu',
    'Khả năng truy vấn',
    'Hỗ trợ báo cáo và phân tích',
    'Nền tảng cho khoa học dữ liệu và AI',
  ],
  en: [
    'Flexible storage of a data lake',
    'Governance structure of a data warehouse',
    'Version control',
    'Data quality',
    'Query capability',
    'Reporting and analytics support',
    'A foundation for data science and AI',
  ],
};

/* ---------- Sources (kết nối nhiều nguồn) ---------- */
export const ptDatalakeSourcesTitle: Localized<PtDatalakeSectionText> = {
  vi: {
    title: 'Kết nối nhiều nguồn dữ liệu',
    description:
      'PT-DataLake được định hướng tiếp nhận dữ liệu từ nhiều loại nguồn. Khả năng kết nối thực tế phụ thuộc vào API, quyền truy cập, giấy phép và cấu trúc của từng hệ thống.',
  },
  en: {
    title: 'Connecting many data sources',
    description:
      'PT-DataLake is designed to ingest data from many types of sources. Real connectivity depends on the API, access rights, licenses and structure of each system.',
  },
};

export interface PtDatalakeSourceGroup {
  id: number;
  icon: string;
  title: string;
  items: string[];
}

export const ptDatalakeSourceGroups: Localized<PtDatalakeSourceGroup[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-database-2-line',
      title: 'Cơ sở dữ liệu',
      items: ['MySQL', 'MariaDB', 'PostgreSQL', 'Microsoft SQL Server', 'Oracle', 'Các hệ quản trị phù hợp khác'],
    },
    {
      id: 2,
      icon: 'ri-briefcase-line',
      title: 'Phần mềm nghiệp vụ',
      items: ['CRM', 'ERP', 'Kế toán', 'Nhân sự', 'Bán hàng', 'Kho', 'Chăm sóc khách hàng', 'Đào tạo', 'Y tế và dịch vụ chuyên ngành'],
    },
    {
      id: 3,
      icon: 'ri-file-list-3-line',
      title: 'Tệp dữ liệu',
      items: ['Excel', 'CSV', 'JSON', 'XML', 'Parquet', 'Tài liệu có cấu trúc phù hợp'],
    },
    {
      id: 4,
      icon: 'ri-plug-line',
      title: 'API và nền tảng trực tuyến',
      items: ['Website', 'Ứng dụng', 'Nền tảng thương mại điện tử', 'Hệ thống quảng cáo', 'Mạng xã hội trong phạm vi API cho phép', 'Dịch vụ đám mây', 'Cổng đối tác'],
    },
    {
      id: 5,
      icon: 'ri-pulse-line',
      title: 'Dữ liệu thời gian thực',
      items: ['Nhật ký ứng dụng', 'Sự kiện giao dịch', 'Thiết bị', 'Cảm biến', 'Hàng đợi thông điệp', 'Luồng dữ liệu trực tuyến'],
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-database-2-line',
      title: 'Databases',
      items: ['MySQL', 'MariaDB', 'PostgreSQL', 'Microsoft SQL Server', 'Oracle', 'Other suitable systems'],
    },
    {
      id: 2,
      icon: 'ri-briefcase-line',
      title: 'Business software',
      items: ['CRM', 'ERP', 'Accounting', 'HR', 'Sales', 'Warehouse', 'Customer care', 'Training', 'Healthcare and specialized services'],
    },
    {
      id: 3,
      icon: 'ri-file-list-3-line',
      title: 'Data files',
      items: ['Excel', 'CSV', 'JSON', 'XML', 'Parquet', 'Suitable structured documents'],
    },
    {
      id: 4,
      icon: 'ri-plug-line',
      title: 'APIs and online platforms',
      items: ['Websites', 'Apps', 'E-commerce platforms', 'Advertising systems', 'Social media within allowed APIs', 'Cloud services', 'Partner portals'],
    },
    {
      id: 5,
      icon: 'ri-pulse-line',
      title: 'Real-time data',
      items: ['Application logs', 'Transaction events', 'Devices', 'Sensors', 'Message queues', 'Online data streams'],
    },
  ],
};

export const ptDatalakeIngestionTitle: Localized<PtDatalakeSectionText> = {
  vi: {
    title: 'Thu thập dữ liệu theo lịch và thời gian thực',
    description:
      'Không phải loại dữ liệu nào cũng cần được cập nhật ngay lập tức. PT-DataLake hỗ trợ hai phương thức, cân bằng giữa nhu cầu, chi phí, độ phức tạp và khả năng vận hành.',
  },
  en: {
    title: 'Batch and real-time data ingestion',
    description:
      'Not every data type needs instant updates. PT-DataLake supports two methods, balancing needs, cost, complexity and operational capability.',
  },
};

export interface PtDatalakeIngestionMethod {
  id: number;
  icon: string;
  title: string;
  items: string[];
}

export const ptDatalakeIngestion: Localized<PtDatalakeIngestionMethod[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-stack-line',
      title: 'Xử lý theo lô',
      items: ['Báo cáo cuối ngày', 'Dữ liệu tài chính định kỳ', 'Tệp Excel', 'Dữ liệu lịch sử', 'Khối lượng lớn không yêu cầu tức thời'],
    },
    {
      id: 2,
      icon: 'ri-flashlight-line',
      title: 'Gần thời gian thực hoặc thời gian thực',
      items: ['Theo dõi giao dịch', 'Cảnh báo vận hành', 'Nhật ký hệ thống', 'Theo dõi hành vi', 'Giám sát thiết bị', 'Dashboard cần cập nhật nhanh'],
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-stack-line',
      title: 'Batch processing',
      items: ['End-of-day reports', 'Periodic financial data', 'Excel files', 'Historical data', 'Large volumes without real-time need'],
    },
    {
      id: 2,
      icon: 'ri-flashlight-line',
      title: 'Near real-time or real-time',
      items: ['Transaction tracking', 'Operational alerts', 'System logs', 'Behavior tracking', 'Device monitoring', 'Dashboards needing fast updates'],
    },
  ],
};

/* ---------- Quality (chất lượng dữ liệu) ---------- */
export const ptDatalakeQualityTitle: Localized<PtDatalakeSectionText> = {
  vi: {
    title: 'Quản trị chất lượng dữ liệu',
    description:
      'Một báo cáo đẹp không có giá trị nếu dữ liệu đầu vào không đáng tin cậy. PT-DataLake hướng tới kiểm soát chất lượng dữ liệu ở nhiều chiều.',
  },
  en: {
    title: 'Data quality management',
    description:
      'A beautiful report is worthless if the input data is not trustworthy. PT-DataLake aims to control data quality across many dimensions.',
  },
};

export const ptDatalakeQualityDimensions: Localized<string[]> = {
  vi: ['Tính đầy đủ', 'Tính chính xác', 'Tính nhất quán', 'Tính hợp lệ', 'Tính duy nhất', 'Tính kịp thời', 'Khả năng truy xuất', 'Mức độ phù hợp với mục đích sử dụng'],
  en: ['Completeness', 'Accuracy', 'Consistency', 'Validity', 'Uniqueness', 'Timeliness', 'Traceability', 'Fitness for purpose'],
};

export const ptDatalakeQualityRules: Localized<string[]> = {
  vi: [
    'Trường bắt buộc không được để trống',
    'Mã khách hàng không được trùng',
    'Ngày kết thúc không trước ngày bắt đầu',
    'Giá trị tài chính phải đúng kiểu dữ liệu',
    'Mã đơn vị phải tồn tại trong danh mục',
    'Dữ liệu cá nhân phải được phân loại',
    'Bản ghi bất thường phải được cảnh báo',
    'Dữ liệu lỗi phải được cách ly thay vì âm thầm loại bỏ',
  ],
  en: [
    'Required fields must not be empty',
    'Customer codes must not duplicate',
    'End dates must not precede start dates',
    'Financial values must match the data type',
    'Unit codes must exist in the catalog',
    'Personal data must be classified',
    'Abnormal records must be flagged',
    'Bad data must be quarantined, not silently dropped',
  ],
};

export const ptDatalakeQualityDashboard: Localized<string[]> = {
  vi: [
    'Tỷ lệ bản ghi lỗi',
    'Nguồn có chất lượng thấp',
    'Quy tắc bị vi phạm',
    'Thời điểm dữ liệu cập nhật gần nhất',
    'Sự cố đồng bộ',
    'Người hoặc đơn vị chịu trách nhiệm',
  ],
  en: [
    'Error record ratio',
    'Low-quality sources',
    'Violated rules',
    'Last data update time',
    'Sync incidents',
    'Responsible person or unit',
  ],
};

/* ---------- Catalog (danh mục + lineage + master data) ---------- */
export const ptDatalakeCatalogTitle: Localized<PtDatalakeSectionText> = {
  vi: {
    title: 'Danh mục dữ liệu và từ điển nghiệp vụ',
    description:
      'PT-DataLake hướng tới xây dựng danh mục dữ liệu để người dùng hiểu rõ dữ liệu đang tồn tại, nguồn gốc, chủ sở hữu và cách sử dụng. Khái niệm “khách hàng hoạt động” phải có một định nghĩa chung thay vì mỗi phòng ban tự tính theo một cách.',
  },
  en: {
    title: 'Data catalog and business glossary',
    description:
      'PT-DataLake aims to build a data catalog so users understand what data exists, its source, owner and usage. A term like an active customer must have one shared definition rather than each department calculating its own way.',
  },
};

export const ptDatalakeCatalogItems: Localized<string[]> = {
  vi: [
    'Dữ liệu nào đang tồn tại',
    'Dữ liệu đến từ đâu',
    'Ai là chủ sở hữu',
    'Ai được phép sử dụng',
    'Trường dữ liệu có ý nghĩa gì',
    'Chỉ tiêu được tính như thế nào',
    'Dữ liệu được cập nhật khi nào',
    'Mức độ nhạy cảm ra sao',
    'Có thể sử dụng cho mục đích nào',
  ],
  en: [
    'What data exists',
    'Where data comes from',
    'Who owns it',
    'Who can use it',
    'What each field means',
    'How metrics are calculated',
    'When data is updated',
    'How sensitive it is',
    'What purposes it can serve',
  ],
};

export const ptDatalakeLineageTitle: Localized<PtDatalakeSectionText> = {
  vi: {
    title: 'Truy vết nguồn gốc dữ liệu',
    description:
      'Data lineage giúp tổ chức kiểm tra, giải thích và chịu trách nhiệm về số liệu được sử dụng.',
  },
  en: {
    title: 'Data lineage',
    description:
      'Data lineage helps the organization verify, explain and take responsibility for the figures it uses.',
  },
};

export const ptDatalakeLineageQuestions: Localized<string[]> = {
  vi: [
    'Số liệu này đến từ hệ thống nào?',
    'Được nhập hay tạo vào thời điểm nào?',
    'Đã trải qua các bước xử lý nào?',
    'Công thức nào đã được sử dụng?',
    'Báo cáo nào đang sử dụng dữ liệu này?',
    'Nếu nguồn thay đổi, hệ thống nào bị ảnh hưởng?',
    'Ai đã sửa định nghĩa hoặc quy tắc?',
  ],
  en: [
    'Which system does this figure come from?',
    'When was it entered or created?',
    'What processing steps has it gone through?',
    'Which formula was used?',
    'Which reports use this data?',
    'If the source changes, which systems are affected?',
    'Who changed the definition or rules?',
  ],
};

export const ptDatalakeMasterTitle: Localized<PtDatalakeSectionText> = {
  vi: {
    title: 'Quản lý dữ liệu chủ',
    description:
      'Các đối tượng như khách hàng, sản phẩm, đơn vị, nhân viên và nhà cung cấp thường tồn tại ở nhiều hệ thống với mã và cách viết khác nhau. Việc hợp nhất hồ sơ phải có quy tắc rõ ràng.',
  },
  en: {
    title: 'Master data management',
    description:
      'Objects such as customers, products, units, employees and suppliers often exist across systems with different codes and spellings. Merging records must follow clear rules.',
  },
};

export const ptDatalakeMasterItems: Localized<string[]> = {
  vi: [
    'Chuẩn hóa định danh',
    'Phát hiện bản ghi trùng',
    'Liên kết dữ liệu từ nhiều nguồn',
    'Xác định bản ghi đáng tin cậy',
    'Quản lý lịch sử thay đổi',
    'Phân phối dữ liệu chuẩn cho hệ thống được cấp quyền',
  ],
  en: [
    'Standardize identifiers',
    'Detect duplicate records',
    'Link data from multiple sources',
    'Identify the trusted record',
    'Manage change history',
    'Distribute standard data to authorized systems',
  ],
};

/* ---------- Security (bảo mật + dữ liệu cá nhân) ---------- */
export const ptDatalakeSecurityTitle: Localized<PtDatalakeSectionText> = {
  vi: {
    title: 'Bảo mật và phân quyền dữ liệu',
    description:
      'PT-DataLake hướng tới mô hình bảo vệ nhiều lớp. Người dùng chỉ được truy cập dữ liệu cần thiết để thực hiện nhiệm vụ; không mặc nhiên cho rằng việc tập trung dữ liệu đồng nghĩa với mọi bộ phận đều được quyền xem.',
  },
  en: {
    title: 'Data security and access control',
    description:
      'PT-DataLake follows a defense-in-depth model. Users only access the data needed for their tasks; centralizing data does not mean every department automatically has the right to see it.',
  },
};

export const ptDatalakeSecurityMeasures: Localized<string[]> = {
  vi: [
    'Phân quyền theo vai trò',
    'Phân quyền theo nguồn dữ liệu',
    'Phân quyền theo bảng, cột hoặc dòng khi cần',
    'Mã hóa kết nối',
    'Mã hóa dữ liệu phù hợp',
    'Quản lý khóa mã hóa',
    'Che hoặc ẩn dữ liệu nhạy cảm',
    'Token hóa hoặc ẩn danh hóa khi phù hợp',
    'Nhật ký truy cập',
    'Kiểm soát tải xuống',
    'Giới hạn môi trường',
    'Phát hiện hành vi bất thường',
    'Sao lưu và phục hồi',
    'Chính sách lưu trữ và xóa',
  ],
  en: [
    'Role-based access control',
    'Source-based access control',
    'Table, column or row-level control when needed',
    'Connection encryption',
    'Appropriate data encryption',
    'Encryption key management',
    'Masking or hiding sensitive data',
    'Tokenization or anonymization when appropriate',
    'Access logs',
    'Download control',
    'Environment restrictions',
    'Abnormal behavior detection',
    'Backup and recovery',
    'Retention and deletion policy',
  ],
};

export const ptDatalakePrivacyTitle: Localized<PtDatalakeSectionText> = {
  vi: {
    title: 'Bảo vệ dữ liệu cá nhân',
    description:
      'PT-DataLake cần quản lý dữ liệu theo mục đích và vòng đời. Dữ liệu sức khỏe, tài chính, sinh trắc học và thông tin nhận dạng cần mức bảo vệ cao hơn.',
  },
  en: {
    title: 'Personal data protection',
    description:
      'PT-DataLake must manage data by purpose and lifecycle. Health, financial, biometric and identifying data require a higher level of protection.',
  },
};

export const ptDatalakePrivacyItems: Localized<string[]> = {
  vi: [
    'Loại dữ liệu cá nhân',
    'Nguồn thu thập',
    'Mục đích xử lý',
    'Cơ sở xử lý phù hợp',
    'Phạm vi chia sẻ',
    'Thời hạn lưu giữ',
    'Quy trình sửa hoặc xóa',
    'Cách thực hiện yêu cầu của chủ thể dữ liệu',
    'Trách nhiệm khi xảy ra sự cố',
  ],
  en: [
    'Types of personal data',
    'Collection source',
    'Processing purpose',
    'Appropriate legal basis',
    'Sharing scope',
    'Retention period',
    'Correction or deletion process',
    'How to fulfill data subject requests',
    'Responsibility in case of incidents',
  ],
};

/* ---------- Reports (dashboard & báo cáo) ---------- */
export const ptDatalakeReportsTitle: Localized<PtDatalakeSectionText> = {
  vi: {
    title: 'Dashboard và báo cáo quản trị',
    description:
      'PT-DataLake cung cấp lớp dữ liệu thống nhất cho các báo cáo. Giải pháp không thay thế hoàn toàn công cụ BI mà cung cấp nền dữ liệu có quản trị để các công cụ khai thác chính xác hơn.',
  },
  en: {
    title: 'Management dashboards and reports',
    description:
      'PT-DataLake provides a unified data layer for reports. It does not fully replace BI tools but provides a governed data foundation so tools can work more accurately.',
  },
};

export const ptDatalakeReportTypes: Localized<string[]> = {
  vi: [
    'Dashboard điều hành',
    'Báo cáo tài chính',
    'Báo cáo bán hàng',
    'Báo cáo khách hàng',
    'Báo cáo nhân sự',
    'Báo cáo đào tạo',
    'Báo cáo vận hành',
    'Báo cáo kho',
    'Báo cáo dịch vụ',
    'Báo cáo tuân thủ',
  ],
  en: [
    'Executive dashboards',
    'Financial reports',
    'Sales reports',
    'Customer reports',
    'HR reports',
    'Training reports',
    'Operational reports',
    'Warehouse reports',
    'Service reports',
    'Compliance reports',
  ],
};

export const ptDatalakeMetricRequirements: Localized<string[]> = {
  vi: ['Định nghĩa', 'Công thức', 'Nguồn dữ liệu', 'Chu kỳ cập nhật', 'Người chịu trách nhiệm', 'Phiên bản', 'Phạm vi sử dụng'],
  en: ['Definition', 'Formula', 'Data source', 'Update cycle', 'Responsible owner', 'Version', 'Usage scope'],
};

/* ---------- AI (nền tảng dữ liệu cho AI) ---------- */
export const ptDatalakeAiTitle: Localized<PtDatalakeSectionText> = {
  vi: {
    title: 'Nền tảng dữ liệu cho AI',
    description:
      'AI không thể tạo ra kết quả đáng tin cậy nếu dữ liệu sai, thiếu, trùng lặp, không rõ nguồn, lỗi thời, có thiên lệch hoặc không được phép sử dụng. PT-DataLake chuẩn bị dữ liệu có quản trị cho AI.',
  },
  en: {
    title: 'A data foundation for AI',
    description:
      'AI cannot produce reliable results if data is wrong, missing, duplicated, untraceable, outdated, biased or not permitted for use. PT-DataLake prepares governed data for AI.',
  },
};

export const ptDatalakeBadData: Localized<string[]> = {
  vi: ['Sai', 'Thiếu', 'Trùng lặp', 'Không rõ nguồn', 'Lỗi thời', 'Có thiên lệch', 'Không được phép sử dụng'],
  en: ['Wrong', 'Missing', 'Duplicated', 'Untraceable', 'Outdated', 'Biased', 'Not permitted for use'],
};

export const ptDatalakeAiPrep: Localized<string[]> = {
  vi: [
    'Danh mục dữ liệu',
    'Kiểm soát chất lượng',
    'Quản lý phiên bản',
    'Truy vết nguồn gốc',
    'Phân loại dữ liệu',
    'Kiểm soát quyền truy cập',
    'Ẩn danh hóa khi phù hợp',
    'Kho dữ liệu đặc trưng',
    'Theo dõi dữ liệu dùng cho mô hình',
    'Kiểm soát đầu vào và đầu ra',
  ],
  en: [
    'Data catalog',
    'Quality control',
    'Version management',
    'Lineage tracking',
    'Data classification',
    'Access control',
    'Anonymization when appropriate',
    'Feature stores',
    'Model data tracking',
    'Input and output control',
  ],
};

/* ---------- Use cases ---------- */
export const ptDatalakeUseCasesTitle: Localized<PtDatalakeSectionText> = {
  vi: {
    title: 'Các trường hợp ứng dụng',
    description: 'PT-DataLake mở ra nhiều trường hợp ứng dụng thiết thực cho tổ chức.',
  },
  en: {
    title: 'Use cases',
    description: 'PT-DataLake enables many practical use cases for organizations.',
  },
};

export interface PtDatalakeUseCase {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const ptDatalakeUseCases: Localized<PtDatalakeUseCase[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-user-heart-line',
      title: 'Góc nhìn khách hàng toàn diện',
      description: 'Kết nối thông tin từ bán hàng, chăm sóc khách hàng, website và dịch vụ để xây dựng góc nhìn nhất quán về hành trình khách hàng.',
    },
    {
      id: 2,
      icon: 'ri-file-chart-line',
      title: 'Báo cáo quản trị tự động',
      description: 'Thay thế quy trình tổng hợp tệp thủ công bằng dữ liệu được cập nhật và kiểm soát theo lịch.',
    },
    {
      id: 3,
      icon: 'ri-speed-up-line',
      title: 'Phân tích hiệu quả vận hành',
      description: 'Theo dõi quy trình, thời gian xử lý, năng suất và những điểm nghẽn giữa các bộ phận.',
    },
    {
      id: 4,
      icon: 'ri-shield-check-line',
      title: 'Quản lý chất lượng dữ liệu',
      description: 'Phát hiện dữ liệu thiếu, sai, trùng hoặc không còn cập nhật.',
    },
    {
      id: 5,
      icon: 'ri-graduation-cap-line',
      title: 'Phân tích đào tạo',
      description: 'Kết nối PT-LMS với dữ liệu nhân sự để đánh giá tiến độ và nhu cầu phát triển năng lực.',
    },
    {
      id: 6,
      icon: 'ri-customer-service-2-line',
      title: 'Phân tích chăm sóc khách hàng',
      description: 'Kết nối PT-Care để nhận diện nhóm vấn đề phổ biến, thời gian xử lý và phản hồi của khách hàng.',
    },
    {
      id: 7,
      icon: 'ri-building-2-line',
      title: 'Quản trị chuỗi cơ sở',
      description: 'Tổng hợp dữ liệu từ nhiều địa điểm nhưng vẫn duy trì phân quyền và khả năng đối chiếu theo từng cơ sở.',
    },
    {
      id: 8,
      icon: 'ri-brain-line',
      title: 'Chuẩn bị dữ liệu cho AI',
      description: 'Xây dựng nguồn dữ liệu được quản trị để tìm kiếm tri thức, phân tích và phát triển các ứng dụng AI có trách nhiệm.',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-user-heart-line',
      title: 'A 360-degree customer view',
      description: 'Connect data from sales, customer care, website and services to build a consistent view of the customer journey.',
    },
    {
      id: 2,
      icon: 'ri-file-chart-line',
      title: 'Automated management reports',
      description: 'Replace manual file consolidation with data updated and controlled on schedule.',
    },
    {
      id: 3,
      icon: 'ri-speed-up-line',
      title: 'Operational efficiency analysis',
      description: 'Track processes, processing time, productivity and bottlenecks across departments.',
    },
    {
      id: 4,
      icon: 'ri-shield-check-line',
      title: 'Data quality management',
      description: 'Detect missing, wrong, duplicated or stale data.',
    },
    {
      id: 5,
      icon: 'ri-graduation-cap-line',
      title: 'Training analytics',
      description: 'Connect PT-LMS with HR data to assess progress and competency development needs.',
    },
    {
      id: 6,
      icon: 'ri-customer-service-2-line',
      title: 'Customer care analytics',
      description: 'Connect PT-Care to identify common issue groups, handling time and customer feedback.',
    },
    {
      id: 7,
      icon: 'ri-building-2-line',
      title: 'Multi-facility management',
      description: 'Aggregate data from multiple locations while keeping per-facility access control and reconciliation.',
    },
    {
      id: 8,
      icon: 'ri-brain-line',
      title: 'AI data preparation',
      description: 'Build governed data sources for knowledge search, analytics and responsible AI application development.',
    },
  ],
};

/* ---------- Deployment & roadmap ---------- */
export const ptDatalakeDeploymentTitle: Localized<PtDatalakeSectionText> = {
  vi: {
    title: 'Mô hình triển khai',
    description:
      'Kiến trúc chỉ được lựa chọn sau khi đánh giá quy mô, tốc độ tăng trưởng, độ nhạy cảm, tần suất truy cập, yêu cầu khôi phục, năng lực đội ngũ, chi phí toàn vòng đời và mức độ phụ thuộc nhà cung cấp.',
  },
  en: {
    title: 'Deployment models',
    description:
      'The architecture is chosen only after evaluating scale, growth rate, sensitivity, access frequency, recovery requirements, team capability, full-lifecycle cost and vendor dependency.',
  },
};

export interface PtDatalakeDeployment {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const ptDatalakeDeployments: Localized<PtDatalakeDeployment[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-cloud-line',
      title: 'Cloud',
      description: 'Phù hợp với tổ chức cần khả năng mở rộng linh hoạt và sử dụng các dịch vụ dữ liệu được quản lý.',
    },
    {
      id: 2,
      icon: 'ri-server-line',
      title: 'Hạ tầng riêng',
      description: 'Phù hợp với tổ chức có yêu cầu kiểm soát cao về dữ liệu, mạng và vận hành.',
    },
    {
      id: 3,
      icon: 'ri-git-merge-line',
      title: 'Hybrid',
      description: 'Kết hợp hạ tầng nội bộ với cloud, phù hợp khi một số dữ liệu phải giữ tại chỗ nhưng vẫn muốn tận dụng khả năng mở rộng của đám mây.',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-cloud-line',
      title: 'Cloud',
      description: 'For organizations needing flexible scaling and managed data services.',
    },
    {
      id: 2,
      icon: 'ri-server-line',
      title: 'On-premises',
      description: 'For organizations with high control requirements over data, network and operations.',
    },
    {
      id: 3,
      icon: 'ri-git-merge-line',
      title: 'Hybrid',
      description: 'Combines on-premises infrastructure with cloud, suitable when some data must stay local while still leveraging cloud scalability.',
    },
  ],
};

export const ptDatalakeRoadmapTitle: Localized<PtDatalakeSectionText> = {
  vi: {
    title: 'Quy trình triển khai PT-DataLake',
    description: 'Một lộ trình rõ ràng giúp tổ chức triển khai bài bản và kiểm soát được rủi ro.',
  },
  en: {
    title: 'PT-DataLake implementation process',
    description: 'A clear roadmap helps organizations implement systematically and manage risk.',
  },
};

export interface PtDatalakePhase {
  id: number;
  title: string;
  items: string[];
}

export const ptDatalakeRoadmap: Localized<PtDatalakePhase[]> = {
  vi: [
    {
      id: 1,
      title: 'Khảo sát',
      items: [
        'Xác định mục tiêu kinh doanh',
        'Lập danh sách nguồn dữ liệu',
        'Đánh giá chất lượng',
        'Xác định chủ sở hữu',
        'Phân loại độ nhạy cảm',
        'Rà soát hạ tầng',
        'Xác định nhu cầu báo cáo và AI',
      ],
    },
    {
      id: 2,
      title: 'Thiết kế kiến trúc',
      items: [
        'Mô hình lưu trữ',
        'Luồng thu thập',
        'Các lớp dữ liệu',
        'Tiêu chuẩn đặt tên',
        'Mô hình phân quyền',
        'Giám sát',
        'Sao lưu và phục hồi',
        'Kế hoạch quản trị chi phí',
      ],
    },
    {
      id: 3,
      title: 'Thử nghiệm',
      items: [
        'Kết nối nguồn',
        'Xây dựng đường ống dữ liệu',
        'Thiết lập kiểm tra chất lượng',
        'Tạo bộ dữ liệu nghiệp vụ',
        'Xây dựng báo cáo mẫu',
        'Đánh giá hiệu năng và bảo mật',
      ],
    },
    {
      id: 4,
      title: 'Mở rộng',
      items: [
        'Bổ sung nguồn dữ liệu',
        'Hoàn thiện danh mục',
        'Chuẩn hóa chỉ tiêu',
        'Tăng cường phân quyền',
        'Xây dựng dashboard',
        'Mở rộng người dùng',
      ],
    },
    {
      id: 5,
      title: 'Vận hành',
      items: [
        'Theo dõi đường ống',
        'Cảnh báo lỗi',
        'Kiểm soát chất lượng',
        'Quản trị quyền truy cập',
        'Tối ưu chi phí',
        'Sao lưu',
        'Xử lý sự cố',
      ],
    },
    {
      id: 6,
      title: 'Cải tiến',
      items: [
        'Cập nhật kiến trúc',
        'Tối ưu truy vấn',
        'Bổ sung dữ liệu',
        'Hoàn thiện quản trị',
        'Phát triển phân tích nâng cao',
        'Chuẩn bị các trường hợp sử dụng AI',
      ],
    },
  ],
  en: [
    {
      id: 1,
      title: 'Survey',
      items: [
        'Define business goals',
        'List data sources',
        'Assess quality',
        'Identify owners',
        'Classify sensitivity',
        'Review infrastructure',
        'Determine reporting and AI needs',
      ],
    },
    {
      id: 2,
      title: 'Architecture design',
      items: [
        'Storage model',
        'Ingestion flows',
        'Data layers',
        'Naming standards',
        'Access control model',
        'Monitoring',
        'Backup and recovery',
        'Cost management plan',
      ],
    },
    {
      id: 3,
      title: 'Pilot',
      items: [
        'Connect sources',
        'Build data pipelines',
        'Set quality checks',
        'Create business datasets',
        'Build sample reports',
        'Evaluate performance and security',
      ],
    },
    {
      id: 4,
      title: 'Expansion',
      items: [
        'Add data sources',
        'Complete the catalog',
        'Standardize metrics',
        'Strengthen access control',
        'Build dashboards',
        'Expand users',
      ],
    },
    {
      id: 5,
      title: 'Operation',
      items: [
        'Monitor pipelines',
        'Error alerts',
        'Quality control',
        'Access management',
        'Cost optimization',
        'Backups',
        'Incident handling',
      ],
    },
    {
      id: 6,
      title: 'Improvement',
      items: [
        'Update architecture',
        'Optimize queries',
        'Add data',
        'Refine governance',
        'Develop advanced analytics',
        'Prepare AI use cases',
      ],
    },
  ],
};

/* ---------- Audience & values ---------- */
export const ptDatalakeAudienceTitle: Localized<PtDatalakeSectionText> = {
  vi: {
    title: 'PT-DataLake phù hợp với ai?',
    description: 'PT-DataLake hướng tới các tổ chức có nhu cầu quản trị dữ liệu và xây dựng nền tảng phân tích.',
  },
  en: {
    title: 'Who is PT-DataLake for?',
    description: 'PT-DataLake targets organizations needing data governance and an analytics foundation.',
  },
};

export const ptDatalakeAudience: Localized<string[]> = {
  vi: [
    'Doanh nghiệp có nhiều hệ thống dữ liệu',
    'Tổ chức đang tổng hợp báo cáo thủ công',
    'Chuỗi cơ sở hoặc đơn vị thành viên',
    'Doanh nghiệp cần dashboard thống nhất',
    'Tổ chức triển khai AI',
    'Đơn vị cần kiểm soát chất lượng dữ liệu',
    'Doanh nghiệp có dữ liệu tăng trưởng nhanh',
    'Tổ chức cần hợp nhất dữ liệu lịch sử',
    'Đơn vị muốn xây dựng nền tảng phân tích',
    'Doanh nghiệp cần quản trị quyền truy cập tập trung',
  ],
  en: [
    'Businesses with many data systems',
    'Organizations consolidating reports manually',
    'Multi-facility chains or member units',
    'Businesses needing a unified dashboard',
    'Organizations deploying AI',
    'Units needing data quality control',
    'Businesses with fast-growing data',
    'Organizations needing to consolidate historical data',
    'Units wanting an analytics platform',
    'Businesses needing centralized access management',
  ],
};

export const ptDatalakeValuesTitle: Localized<PtDatalakeSectionText> = {
  vi: {
    title: 'Giá trị PT-DataLake hướng tới',
    description: 'Những giá trị mà PT-DataLake mang lại cho tổ chức.',
  },
  en: {
    title: 'The value PT-DataLake delivers',
    description: 'The value PT-DataLake brings to organizations.',
  },
};

export interface PtDatalakeValue {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const ptDatalakeValues: Localized<PtDatalakeValue[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-database-2-line',
      title: 'Một nguồn dữ liệu đáng tin cậy',
      description: 'Các báo cáo và ứng dụng sử dụng dữ liệu có nguồn gốc, định nghĩa và trách nhiệm rõ ràng.',
    },
    {
      id: 2,
      icon: 'ri-settings-5-line',
      title: 'Giảm tổng hợp thủ công',
      description: 'Tự động hóa quá trình thu thập, làm sạch và chuẩn bị dữ liệu.',
    },
    {
      id: 3,
      icon: 'ri-shield-check-line',
      title: 'Quản trị chất lượng',
      description: 'Phát hiện lỗi sớm và theo dõi chất lượng theo từng nguồn.',
    },
    {
      id: 4,
      icon: 'ri-lock-line',
      title: 'Bảo vệ dữ liệu',
      description: 'Phân loại, phân quyền và ghi nhận hoạt động truy cập.',
    },
    {
      id: 5,
      icon: 'ri-line-chart-line',
      title: 'Hỗ trợ quyết định',
      description: 'Cung cấp nền dữ liệu nhất quán cho dashboard và phân tích.',
    },
    {
      id: 6,
      icon: 'ri-brain-line',
      title: 'Sẵn sàng cho AI',
      description: 'Chuẩn bị dữ liệu có quản trị, thay vì đưa dữ liệu thô trực tiếp vào mô hình.',
    },
    {
      id: 7,
      icon: 'ri-expand-diagonal-line',
      title: 'Khả năng mở rộng',
      description: 'Kiến trúc có thể phát triển cùng số lượng nguồn, khối lượng dữ liệu và nhu cầu khai thác.',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-database-2-line',
      title: 'One trusted data source',
      description: 'Reports and apps use data with clear lineage, definitions and accountability.',
    },
    {
      id: 2,
      icon: 'ri-settings-5-line',
      title: 'Less manual consolidation',
      description: 'Automate data collection, cleaning and preparation.',
    },
    {
      id: 3,
      icon: 'ri-shield-check-line',
      title: 'Quality governance',
      description: 'Detect errors early and track quality per source.',
    },
    {
      id: 4,
      icon: 'ri-lock-line',
      title: 'Data protection',
      description: 'Classify, control access and log access activities.',
    },
    {
      id: 5,
      icon: 'ri-line-chart-line',
      title: 'Decision support',
      description: 'Provide a consistent data foundation for dashboards and analytics.',
    },
    {
      id: 6,
      icon: 'ri-brain-line',
      title: 'AI readiness',
      description: 'Prepare governed data instead of feeding raw data directly into models.',
    },
    {
      id: 7,
      icon: 'ri-expand-diagonal-line',
      title: 'Scalability',
      description: 'The architecture grows with source count, data volume and exploitation needs.',
    },
  ],
};

/* ---------- CTA / contact ---------- */
export const ptDatalakeCta: Localized<{
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  tertiaryCta: string;
  contactTitle: string;
  company: string;
  phone: string;
  email: string;
  workingHours: string;
  address: string;
}> = {
  vi: {
    title: 'Bắt đầu từ giá trị, không bắt đầu từ việc gom dữ liệu',
    description:
      'Một dự án dữ liệu thành công không nhất thiết phải kết nối mọi hệ thống ngay từ đầu. Phúc Thành Holding sẵn sàng cùng tổ chức khảo sát hiện trạng, xây dựng kiến trúc và xác định lộ trình dữ liệu phù hợp với mục tiêu, nguồn lực và yêu cầu bảo mật.',
    primaryCta: 'Yêu cầu tư vấn PT-DataLake',
    secondaryCta: 'Đề xuất dự án dữ liệu',
    tertiaryCta: 'Đăng ký khảo sát hiện trạng',
    contactTitle: 'Thông tin liên hệ',
    company: 'Công ty Cổ phần Đầu tư và Công nghệ Phúc Thành Holding',
    phone: '0343 089 666',
    email: 'phucthanhholding@gmail.com',
    workingHours: '08:00–17:00, tất cả các ngày trong tuần',
    address: 'Số 424 Đường Mê Linh, Phường Vĩnh Phúc, Tỉnh Phú Thọ, Việt Nam',
  },
  en: {
    title: 'Start with value, not with collecting data',
    description:
      'A successful data project does not need to connect every system from day one. Phuc Thanh Holding is ready to survey the current state, build the architecture and define a data roadmap suited to your goals, resources and security requirements.',
    primaryCta: 'Request PT-DataLake consulting',
    secondaryCta: 'Propose a data project',
    tertiaryCta: 'Register for a current-state survey',
    contactTitle: 'Contact information',
    company: 'Phuc Thanh Holding Investment and Technology Joint Stock Company',
    phone: '0343 089 666',
    email: 'phucthanhholding@gmail.com',
    workingHours: '08:00–17:00, every day of the week',
    address: '424 Me Linh Street, Vinh Phuc Ward, Phu Tho Province, Vietnam',
  },
};