import type { Localized } from '@/lib/lang';

export interface SitemapLink {
  label: string;
  href?: string;
  level?: 1 | 2;
}

export interface SitemapGroup {
  id: string;
  icon: string;
  title: string;
  description: string;
  links: SitemapLink[];
}

export const sitemapGroups: Localized<SitemapGroup[]> = {
  vi: [
    {
      id: 've-phuc-thanh',
      icon: 'ri-building-2-line',
      title: 'Về Phúc Thành',
      description: 'Thông tin tổng quan, định hướng và giá trị cốt lõi của doanh nghiệp.',
      links: [
        { label: 'Tổng quan doanh nghiệp', href: '/tong-quan', level: 1 },
        { label: 'Tầm nhìn & Sứ mệnh', href: '/tong-quan', level: 2 },
        { label: 'Giá trị cốt lõi', href: '/tong-quan', level: 2 },
        { label: 'Đội ngũ & Văn hóa', href: '/tong-quan', level: 2 },
      ],
    },
    {
      id: 'linh-vuc',
      icon: 'ri-layout-grid-line',
      title: 'Lĩnh vực hoạt động',
      description: 'Các lĩnh vực kinh doanh chính của Phúc Thành Holding.',
      links: [
        { label: 'Tất cả lĩnh vực hoạt động', href: '/linh-vuc', level: 1 },
        { label: 'Đầu tư & Công nghệ', href: '/linh-vuc/dau-tu-cong-nghe', level: 2 },
        { label: 'Phát triển phần mềm', href: '/linh-vuc/phat-trien-phan-mem', level: 2 },
        { label: 'Chuyển đổi số doanh nghiệp', href: '/linh-vuc/chuyen-doi-so-doanh-nghiep', level: 2 },
        { label: 'Quản trị & phân tích dữ liệu', href: '/linh-vuc/quan-tri-phan-tich-du-lieu', level: 2 },
        { label: 'Đào tạo & Phát triển nguồn nhân lực', href: '/linh-vuc/dao-tao-phat-trien-nguon-nhan-luc', level: 2 },
        { label: 'Truyền thông & nội dung số', href: '/linh-vuc/truyen-thong-noi-dung-so', level: 2 },
      ],
    },
    {
      id: 'dich-vu',
      icon: 'ri-service-line',
      title: 'Dịch vụ',
      description: 'Các dịch vụ công nghệ, đầu tư, đào tạo và truyền thông của Phúc Thành Holding.',
      links: [
        { label: 'Tất cả dịch vụ', href: '/dich-vu', level: 1 },
        { label: 'Phát triển phần mềm theo yêu cầu', href: '/linh-vuc/phat-trien-phan-mem', level: 2 },
        { label: 'Chuyển đổi số doanh nghiệp', href: '/linh-vuc/chuyen-doi-so-doanh-nghiep', level: 2 },
        { label: 'Quản trị & phân tích dữ liệu', href: '/linh-vuc/quan-tri-phan-tich-du-lieu', level: 2 },
        { label: 'Đào tạo & phát triển nguồn nhân lực', href: '/linh-vuc/dao-tao-phat-trien-nguon-nhan-luc', level: 2 },
        { label: 'Truyền thông & nội dung số', href: '/linh-vuc/truyen-thong-noi-dung-so', level: 2 },
        { label: 'Tư vấn đầu tư & công nghệ', href: '/linh-vuc/dau-tu-cong-nghe', level: 2 },
      ],
    },
    {
      id: 'san-pham',
      icon: 'ri-apps-2-line',
      title: 'Sản phẩm & Giải pháp',
      description: 'Danh mục sản phẩm, phần mềm và giải pháp công nghệ.',
      links: [
        { label: 'Tất cả sản phẩm & giải pháp', href: '/san-pham', level: 1 },
        { label: 'Giải pháp phần mềm', href: '/san-pham', level: 2 },
        { label: 'Chuyển đổi số doanh nghiệp', href: '/san-pham', level: 2 },
        { label: 'Quản trị & phân tích dữ liệu', href: '/san-pham', level: 2 },
        { label: 'Đào tạo trực tuyến', href: '/san-pham', level: 2 },
        { label: 'Truyền thông & nội dung số', href: '/san-pham', level: 2 },
        { label: 'Giải pháp chăm sóc khách hàng', href: '/san-pham', level: 2 },
        { label: 'Sản phẩm chăm sóc sức khỏe', href: '/san-pham', level: 2 },
        { label: 'Giải pháp theo yêu cầu', href: '/san-pham', level: 2 },
      ],
    },
    {
      id: 'du-an',
      icon: 'ri-folder-open-line',
      title: 'Dự án & Năng lực',
      description: 'Các dự án định hướng và năng lực triển khai của công ty.',
      links: [
        { label: 'Danh mục dự án', href: '/du-an', level: 1 },
        { label: 'Năng lực triển khai', href: '/du-an', level: 2 },
        { label: 'Quy trình & phương pháp', href: '/du-an', level: 2 },
      ],
    },
    {
      id: 'hop-tac-co-dong',
      icon: 'ri-group-line',
      title: 'Hợp tác & Cổ đông',
      description: 'Thông tin dành cho đối tác và cổ đông của doanh nghiệp.',
      links: [
        { label: 'Quan hệ cổ đông', href: '/tong-quan', level: 1 },
        { label: 'Công bố thông tin', href: '/tin-tuc', level: 2 },
        { label: 'Báo cáo định kỳ', href: '/tin-tuc', level: 2 },
      ],
    },
    {
      id: 'trung-tam-kien-thuc',
      icon: 'ri-book-open-line',
      title: 'Trung tâm kiến thức',
      description: 'Bài viết, tài liệu và nghiên cứu chia sẻ kiến thức.',
      links: [
        { label: 'Bài viết & tài liệu', href: '/tin-tuc', level: 1 },
        { label: 'Nghiên cứu & báo cáo', href: '/tin-tuc', level: 2 },
      ],
    },
    {
      id: 'tin-tuc',
      icon: 'ri-newspaper-line',
      title: 'Tin tức',
      description: 'Tin tức và sự kiện mới nhất của Phúc Thành Holding.',
      links: [
        { label: 'Tin tức & sự kiện', href: '/tin-tuc', level: 1 },
        { label: 'Tin công ty', href: '/tin-tuc', level: 2 },
        { label: 'Công nghệ', href: '/tin-tuc', level: 2 },
        { label: 'Thị trường', href: '/tin-tuc', level: 2 },
        { label: 'Sự kiện', href: '/tin-tuc', level: 2 },
      ],
    },
    {
      id: 'co-hoi-nghe-nghiep',
      icon: 'ri-briefcase-line',
      title: 'Cơ hội nghề nghiệp',
      description: 'Vị trí tuyển dụng và môi trường làm việc tại công ty.',
      links: [
        { label: 'Vị trí tuyển dụng', href: '/tuyen-dung', level: 1 },
        { label: 'Quyền lợi & phúc lợi', href: '/tuyen-dung', level: 2 },
        { label: 'Văn hóa doanh nghiệp', href: '/tuyen-dung', level: 2 },
      ],
    },
    {
      id: 'ho-tro',
      icon: 'ri-customer-service-2-line',
      title: 'Hỗ trợ',
      description: 'Hướng dẫn và hỗ trợ khách hàng, đối tác.',
      links: [
        { label: 'Câu hỏi thường gặp', href: '/lien-he', level: 1 },
        { label: 'Hướng dẫn sử dụng', href: '/lien-he', level: 2 },
      ],
    },
    {
      id: 'lien-he',
      icon: 'ri-mail-send-line',
      title: 'Liên hệ',
      description: 'Thông tin liên hệ và kênh gửi yêu cầu hợp tác.',
      links: [
        { label: 'Thông tin liên hệ', href: '/lien-he', level: 1 },
        { label: 'Gửi yêu cầu hợp tác', href: '/lien-he', level: 2 },
        { label: 'Bản đồ vị trí', href: '/lien-he', level: 2 },
      ],
    },
    {
      id: 'phap-ly',
      icon: 'ri-shield-check-line',
      title: 'Pháp lý',
      description: 'Các điều khoản và chính sách của website.',
      links: [
        { label: 'Điều kiện & Điều khoản', href: '/dieu-khoan', level: 1 },
        { label: 'Điều khoản dịch vụ', href: '/dieu-khoan-dich-vu', level: 2 },
        { label: 'Chính sách bảo mật', href: '/chinh-sach-bao-mat', level: 2 },
        { label: 'Khuyến cáo', href: '/khuyen-cao', level: 2 },
      ],
    },
  ],
  en: [
    {
      id: 've-phuc-thanh',
      icon: 'ri-building-2-line',
      title: 'About Phuc Thanh',
      description: 'Overview, direction and core values of the company.',
      links: [
        { label: 'Company overview', href: '/tong-quan', level: 1 },
        { label: 'Vision & Mission', href: '/tong-quan', level: 2 },
        { label: 'Core values', href: '/tong-quan', level: 2 },
        { label: 'Team & Culture', href: '/tong-quan', level: 2 },
      ],
    },
    {
      id: 'linh-vuc',
      icon: 'ri-layout-grid-line',
      title: 'Business Fields',
      description: 'The main business fields of Phuc Thanh Holding.',
      links: [
        { label: 'All business fields', href: '/linh-vuc', level: 1 },
        { label: 'Investment & Technology', href: '/linh-vuc/dau-tu-cong-nghe', level: 2 },
        { label: 'Software Development', href: '/linh-vuc/phat-trien-phan-mem', level: 2 },
        { label: 'Enterprise Digital Transformation', href: '/linh-vuc/chuyen-doi-so-doanh-nghiep', level: 2 },
        { label: 'Data Management & Analytics', href: '/linh-vuc/quan-tri-phan-tich-du-lieu', level: 2 },
        { label: 'Training & Workforce Development', href: '/linh-vuc/dao-tao-phat-trien-nguon-nhan-luc', level: 2 },
        { label: 'Media & Digital Content', href: '/linh-vuc/truyen-thong-noi-dung-so', level: 2 },
      ],
    },
    {
      id: 'dich-vu',
      icon: 'ri-service-line',
      title: 'Services',
      description: 'The technology, investment, training and media services of Phuc Thanh Holding.',
      links: [
        { label: 'All services', href: '/dich-vu', level: 1 },
        { label: 'Custom software development', href: '/linh-vuc/phat-trien-phan-mem', level: 2 },
        { label: 'Enterprise digital transformation', href: '/linh-vuc/chuyen-doi-so-doanh-nghiep', level: 2 },
        { label: 'Data management & analytics', href: '/linh-vuc/quan-tri-phan-tich-du-lieu', level: 2 },
        { label: 'Training & workforce development', href: '/linh-vuc/dao-tao-phat-trien-nguon-nhan-luc', level: 2 },
        { label: 'Media & digital content', href: '/linh-vuc/truyen-thong-noi-dung-so', level: 2 },
        { label: 'Investment & technology consulting', href: '/linh-vuc/dau-tu-cong-nghe', level: 2 },
      ],
    },
    {
      id: 'san-pham',
      icon: 'ri-apps-2-line',
      title: 'Products & Solutions',
      description: 'Product, software and technology solution catalog.',
      links: [
        { label: 'All products & solutions', href: '/san-pham', level: 1 },
        { label: 'Software solutions', href: '/san-pham', level: 2 },
        { label: 'Enterprise digital transformation', href: '/san-pham', level: 2 },
        { label: 'Data management & analytics', href: '/san-pham', level: 2 },
        { label: 'Online training', href: '/san-pham', level: 2 },
        { label: 'Media & digital content', href: '/san-pham', level: 2 },
        { label: 'Customer care solutions', href: '/san-pham', level: 2 },
        { label: 'Healthcare products', href: '/san-pham', level: 2 },
        { label: 'Custom solutions', href: '/san-pham', level: 2 },
      ],
    },
    {
      id: 'du-an',
      icon: 'ri-folder-open-line',
      title: 'Projects & Capabilities',
      description: 'The company oriented projects and implementation capabilities.',
      links: [
        { label: 'Project catalog', href: '/du-an', level: 1 },
        { label: 'Implementation capabilities', href: '/du-an', level: 2 },
        { label: 'Process & methodology', href: '/du-an', level: 2 },
      ],
    },
    {
      id: 'hop-tac-co-dong',
      icon: 'ri-group-line',
      title: 'Partnership & Shareholders',
      description: 'Information for business partners and shareholders.',
      links: [
        { label: 'Shareholder relations', href: '/tong-quan', level: 1 },
        { label: 'Information disclosure', href: '/tin-tuc', level: 2 },
        { label: 'Periodic reports', href: '/tin-tuc', level: 2 },
      ],
    },
    {
      id: 'trung-tam-kien-thuc',
      icon: 'ri-book-open-line',
      title: 'Knowledge Center',
      description: 'Articles, documents and research sharing knowledge.',
      links: [
        { label: 'Articles & documents', href: '/tin-tuc', level: 1 },
        { label: 'Research & reports', href: '/tin-tuc', level: 2 },
      ],
    },
    {
      id: 'tin-tuc',
      icon: 'ri-newspaper-line',
      title: 'News',
      description: 'The latest news and events from Phuc Thanh Holding.',
      links: [
        { label: 'News & events', href: '/tin-tuc', level: 1 },
        { label: 'Company news', href: '/tin-tuc', level: 2 },
        { label: 'Technology', href: '/tin-tuc', level: 2 },
        { label: 'Market', href: '/tin-tuc', level: 2 },
        { label: 'Events', href: '/tin-tuc', level: 2 },
      ],
    },
    {
      id: 'co-hoi-nghe-nghiep',
      icon: 'ri-briefcase-line',
      title: 'Career Opportunities',
      description: 'Open positions and the working environment at the company.',
      links: [
        { label: 'Open positions', href: '/tuyen-dung', level: 1 },
        { label: 'Benefits & welfare', href: '/tuyen-dung', level: 2 },
        { label: 'Corporate culture', href: '/tuyen-dung', level: 2 },
      ],
    },
    {
      id: 'ho-tro',
      icon: 'ri-customer-service-2-line',
      title: 'Support',
      description: 'Guidance and support for customers and partners.',
      links: [
        { label: 'FAQ', href: '/lien-he', level: 1 },
        { label: 'Usage guides', href: '/lien-he', level: 2 },
      ],
    },
    {
      id: 'lien-he',
      icon: 'ri-mail-send-line',
      title: 'Contact',
      description: 'Contact information and cooperation request channels.',
      links: [
        { label: 'Contact information', href: '/lien-he', level: 1 },
        { label: 'Send cooperation request', href: '/lien-he', level: 2 },
        { label: 'Location map', href: '/lien-he', level: 2 },
      ],
    },
    {
      id: 'phap-ly',
      icon: 'ri-shield-check-line',
      title: 'Legal',
      description: 'Terms and policies of the website.',
      links: [
        { label: 'Terms & Conditions', href: '/dieu-khoan', level: 1 },
        { label: 'Service terms', href: '/dieu-khoan-dich-vu', level: 2 },
        { label: 'Privacy policy', href: '/chinh-sach-bao-mat', level: 2 },
        { label: 'Disclaimer', href: '/khuyen-cao', level: 2 },
      ],
    },
  ],
};