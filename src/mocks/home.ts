import type { Localized } from '@/lib/lang';

export interface QuickLink {
  id: number;
  title: string;
  image?: string;
  href: string;
  highlight?: boolean;
}

export const heroSlides: Localized<
  {
    id: number;
    image: string;
    title: string;
    subtitle: string;
    cta: string;
    href: string;
  }[]
> = {
  vi: [
    {
      id: 1,
      image: 'https://readdy.ai/api/search-image?query=Modern%20software%20development%20and%20digital%20transformation%20hero%20banner%2C%20clean%20abstract%20technology%20background%20with%20flowing%20code%20streams%20and%20connected%20network%20nodes%20in%20deep%20emerald%20green%20and%20warm%20gold%20accents%2C%20corporate%20minimalist%20style%2C%20professional%20high%20quality%20digital%20illustration%2C%20subtle%20light%20particles&width=1600&height=560&seq=hero-pt-01&orientation=landscape',
      title: 'GIẢI PHÁP PHẦN MỀM & CHUYỂN ĐỔI SỐ',
      subtitle: 'Xây dựng hệ thống công nghệ hiện đại, tối ưu quy trình và tăng trưởng bền vững cho doanh nghiệp',
      cta: 'Khám phá giải pháp',
      href: '/san-pham',
    },
    {
      id: 2,
      image: 'https://readdy.ai/api/search-image?query=Professional%20online%20training%20and%20education%20technology%20concept%2C%20modern%20digital%20classroom%20with%20abstract%20learning%20network%20visualization%2C%20deep%20emerald%20green%20gradient%20with%20warm%20golden%20light%20highlights%2C%20people%20connected%20through%20knowledge%20nodes%2C%20clean%20corporate%20minimalist%20style&width=1600&height=560&seq=hero-pt-02&orientation=landscape',
      title: 'ĐÀO TẠO & PHÁT TRIỂN NGUỒN NHÂN LỰC',
      subtitle: 'Nâng cao năng lực đội ngũ với các chương trình đào tạo chuyên sâu và công nghệ học tập tiên tiến',
      cta: 'Tìm hiểu thêm',
      href: '/linh-vuc',
    },
    {
      id: 3,
      image: 'https://readdy.ai/api/search-image?query=Technology%20project%20showcase%20hero%20banner%2C%20modern%20software%20development%20workspace%20with%20multiple%20monitors%20displaying%20application%20dashboards%20and%20data%20visualization%2C%20deep%20emerald%20green%20gradient%20with%20warm%20golden%20light%20accents%2C%20abstract%20digital%20project%20network%20visualization%2C%20clean%20corporate%20minimalist%20professional%20illustration&width=1600&height=560&seq=hero-pt-03&orientation=landscape',
      title: 'DỰ ÁN TIÊU BIỂU',
      subtitle: 'Tìm hiểu định hướng dự án công nghệ; kết quả triển khai chỉ được công bố khi có thông tin xác minh',
      cta: 'Xem dự án',
      href: '/du-an',
    },
  ],
  en: [
    {
      id: 1,
      image: 'https://readdy.ai/api/search-image?query=Modern%20software%20development%20and%20digital%20transformation%20hero%20banner%2C%20clean%20abstract%20technology%20background%20with%20flowing%20code%20streams%20and%20connected%20network%20nodes%20in%20deep%20emerald%20green%20and%20warm%20gold%20accents%2C%20corporate%20minimalist%20style%2C%20professional%20high%20quality%20digital%20illustration%2C%20subtle%20light%20particles&width=1600&height=560&seq=hero-pt-01&orientation=landscape',
      title: 'SOFTWARE SOLUTIONS & DIGITAL TRANSFORMATION',
      subtitle: 'Build modern technology systems, optimize processes and drive sustainable growth for your business',
      cta: 'Explore solutions',
      href: '/san-pham',
    },
    {
      id: 2,
      image: 'https://readdy.ai/api/search-image?query=Professional%20online%20training%20and%20education%20technology%20concept%2C%20modern%20digital%20classroom%20with%20abstract%20learning%20network%20visualization%2C%20deep%20emerald%20green%20gradient%20with%20warm%20golden%20light%20highlights%2C%20people%20connected%20through%20knowledge%20nodes%2C%20clean%20corporate%20minimalist%20style&width=1600&height=560&seq=hero-pt-02&orientation=landscape',
      title: 'TRAINING & WORKFORCE DEVELOPMENT',
      subtitle: 'Upskill your team with in-depth training programs and advanced learning technology',
      cta: 'Learn more',
      href: '/linh-vuc',
    },
    {
      id: 3,
      image: 'https://readdy.ai/api/search-image?query=Technology%20project%20showcase%20hero%20banner%2C%20modern%20software%20development%20workspace%20with%20multiple%20monitors%20displaying%20application%20dashboards%20and%20data%20visualization%2C%20deep%20emerald%20green%20gradient%20with%20warm%20golden%20light%20accents%2C%20abstract%20digital%20project%20network%20visualization%2C%20clean%20corporate%20minimalist%20professional%20illustration&width=1600&height=560&seq=hero-pt-03&orientation=landscape',
      title: 'FEATURED PROJECTS',
      subtitle: 'Explore technology project directions; implementation results are published only with supporting verification',
      cta: 'View projects',
      href: '/du-an',
    },
  ],
};

interface Service {
  id: number;
  title: string;
  icon: string;
  href: string;
  links: { label: string; href: string }[];
}

export const services: Localized<Service[]> = {
  vi: [
    {
      id: 1,
      title: 'Phát triển phần mềm & ứng dụng',
      icon: 'ri-code-box-line',
      href: '/san-pham',
      links: [
        { label: 'Phần mềm quản lý', href: '/san-pham' },
        { label: 'Ứng dụng web & mobile', href: '/san-pham' },
        { label: 'Tích hợp hệ thống', href: '/san-pham' },
        { label: 'Bảo trì & nâng cấp', href: '/san-pham' },
      ],
    },
    {
      id: 2,
      title: 'Chuyển đổi số doanh nghiệp',
      icon: 'ri-refresh-line',
      href: '/san-pham',
      links: [
        { label: 'Tư vấn chuyển đổi số', href: '/san-pham' },
        { label: 'Tối ưu quy trình', href: '/san-pham' },
        { label: 'Quản trị dữ liệu', href: '/san-pham' },
        { label: 'Tự động hóa', href: '/san-pham' },
      ],
    },
    {
      id: 3,
      title: 'Đào tạo & phát triển',
      icon: 'ri-graduation-cap-line',
      href: '/linh-vuc/dao-tao-phat-trien-nguon-nhan-luc',
      links: [
        { label: 'Đào tạo nội bộ', href: '/linh-vuc/dao-tao-phat-trien-nguon-nhan-luc' },
        { label: 'Học trực tuyến', href: '/linh-vuc/dao-tao-phat-trien-nguon-nhan-luc' },
        { label: 'Chứng chỉ chuyên môn', href: '/linh-vuc/dao-tao-phat-trien-nguon-nhan-luc' },
        { label: 'Phát triển kỹ năng', href: '/linh-vuc/dao-tao-phat-trien-nguon-nhan-luc' },
      ],
    },
    {
      id: 4,
      title: 'Truyền thông & thương hiệu',
      icon: 'ri-megaphone-line',
      href: '/linh-vuc/truyen-thong-noi-dung-so',
      links: [
        { label: 'Chiến lược thương hiệu', href: '/linh-vuc/truyen-thong-noi-dung-so' },
        { label: 'Marketing số', href: '/linh-vuc/truyen-thong-noi-dung-so' },
        { label: 'Sản xuất nội dung', href: '/linh-vuc/truyen-thong-noi-dung-so' },
        { label: 'Quản lý truyền thông', href: '/linh-vuc/truyen-thong-noi-dung-so' },
      ],
    },
    {
      id: 5,
      title: 'Hỗ trợ cộng đồng & tư vấn',
      icon: 'ri-heart-pulse-line',
      href: '/lien-he',
      links: [
        { label: 'Tư vấn cộng đồng', href: '/lien-he' },
        { label: 'Hỗ trợ doanh nghiệp nhỏ', href: '/lien-he' },
        { label: 'Chương trình đối tác', href: '/lien-he' },
        { label: 'Dịch vụ hỗ trợ khách hàng', href: '/lien-he' },
      ],
    },
  ],
  en: [
    {
      id: 1,
      title: 'Software & Application Development',
      icon: 'ri-code-box-line',
      href: '/san-pham',
      links: [
        { label: 'Management software', href: '/san-pham' },
        { label: 'Web & mobile apps', href: '/san-pham' },
        { label: 'System integration', href: '/san-pham' },
        { label: 'Maintenance & upgrades', href: '/san-pham' },
      ],
    },
    {
      id: 2,
      title: 'Enterprise Digital Transformation',
      icon: 'ri-refresh-line',
      href: '/san-pham',
      links: [
        { label: 'Digital transformation consulting', href: '/san-pham' },
        { label: 'Process optimization', href: '/san-pham' },
        { label: 'Data management', href: '/san-pham' },
        { label: 'Automation', href: '/san-pham' },
      ],
    },
    {
      id: 3,
      title: 'Training & Development',
      icon: 'ri-graduation-cap-line',
      href: '/linh-vuc/dao-tao-phat-trien-nguon-nhan-luc',
      links: [
        { label: 'Internal training', href: '/linh-vuc/dao-tao-phat-trien-nguon-nhan-luc' },
        { label: 'Online learning', href: '/linh-vuc/dao-tao-phat-trien-nguon-nhan-luc' },
        { label: 'Professional certificates', href: '/linh-vuc/dao-tao-phat-trien-nguon-nhan-luc' },
        { label: 'Skill development', href: '/linh-vuc/dao-tao-phat-trien-nguon-nhan-luc' },
      ],
    },
    {
      id: 4,
      title: 'Media & Branding',
      icon: 'ri-megaphone-line',
      href: '/linh-vuc/truyen-thong-noi-dung-so',
      links: [
        { label: 'Brand strategy', href: '/linh-vuc/truyen-thong-noi-dung-so' },
        { label: 'Digital marketing', href: '/linh-vuc/truyen-thong-noi-dung-so' },
        { label: 'Content production', href: '/linh-vuc/truyen-thong-noi-dung-so' },
        { label: 'Communication management', href: '/linh-vuc/truyen-thong-noi-dung-so' },
      ],
    },
    {
      id: 5,
      title: 'Community Support & Consulting',
      icon: 'ri-heart-pulse-line',
      href: '/lien-he',
      links: [
        { label: 'Community consulting', href: '/lien-he' },
        { label: 'Small business support', href: '/lien-he' },
        { label: 'Partner programs', href: '/lien-he' },
        { label: 'Customer support services', href: '/lien-he' },
      ],
    },
  ],
};

export const quickLinks: Localized<QuickLink[]> = {
  vi: [
    {
      id: 1,
      title: 'GIẢI PHÁP CÔNG NGHỆ',
      image: 'https://readdy.ai/api/search-image?query=Modern%20technology%20solutions%20dashboard%20with%20clean%20interface%20design%2C%20software%20application%20screens%20floating%20in%20space%2C%20emerald%20green%20and%20warm%20gold%20corporate%20color%20palette%2C%20abstract%20digital%20environment%2C%20professional%20minimalist%20photography%20style&width=400&height=250&seq=quick-pt-01&orientation=landscape',
      href: '/san-pham',
    },
    {
      id: 2,
      title: 'NỀN TẢNG ĐÀO TẠO',
      image: 'https://readdy.ai/api/search-image?query=Modern%20online%20education%20platform%20concept%2C%20digital%20learning%20interface%20with%20connected%20student%20icons%2C%20emerald%20green%20and%20warm%20gold%20accents%2C%20abstract%20knowledge%20network%20visualization%2C%20clean%20corporate%20photography%20style&width=400&height=250&seq=quick-pt-02&orientation=landscape',
      href: '/linh-vuc',
    },
    {
      id: 3,
      title: 'DỰ ÁN TIÊU BIỂU',
      image: 'https://readdy.ai/api/search-image?query=Technology%20project%20showcase%20concept%2C%20modern%20software%20development%20workspace%20with%20multiple%20screens%20displaying%20applications%2C%20emerald%20green%20and%20warm%20gold%20corporate%20lighting%2C%20abstract%20digital%20project%20visualization%2C%20clean%20professional%20photography&width=400&height=250&seq=quick-pt-03&orientation=landscape',
      href: '/du-an',
    },
    {
      id: 4,
      title: 'TIN TỨC & XU HƯỚNG',
      image: 'https://readdy.ai/api/search-image?query=Digital%20news%20and%20technology%20trends%20concept%2C%20abstract%20data%20visualization%20with%20flowing%20information%20streams%2C%20emerald%20green%20gradient%20with%20golden%20light%20accents%2C%20modern%20editorial%20corporate%20style%2C%20clean%20minimalist%20composition&width=400&height=250&seq=quick-pt-04&orientation=landscape',
      href: '/tin-tuc',
    },
    {
      id: 5,
      title: 'LIÊN HỆ HỢP TÁC',
      href: '/lien-he',
      highlight: true,
    },
  ],
  en: [
    {
      id: 1,
      title: 'TECHNOLOGY SOLUTIONS',
      image: 'https://readdy.ai/api/search-image?query=Modern%20technology%20solutions%20dashboard%20with%20clean%20interface%20design%2C%20software%20application%20screens%20floating%20in%20space%2C%20emerald%20green%20and%20warm%20gold%20corporate%20color%20palette%2C%20abstract%20digital%20environment%2C%20professional%20minimalist%20photography%20style&width=400&height=250&seq=quick-pt-01&orientation=landscape',
      href: '/san-pham',
    },
    {
      id: 2,
      title: 'TRAINING PLATFORM',
      image: 'https://readdy.ai/api/search-image?query=Modern%20online%20education%20platform%20concept%2C%20digital%20learning%20interface%20with%20connected%20student%20icons%2C%20emerald%20green%20and%20warm%20gold%20accents%2C%20abstract%20knowledge%20network%20visualization%2C%20clean%20corporate%20photography%20style&width=400&height=250&seq=quick-pt-02&orientation=landscape',
      href: '/linh-vuc',
    },
    {
      id: 3,
      title: 'FEATURED PROJECTS',
      image: 'https://readdy.ai/api/search-image?query=Technology%20project%20showcase%20concept%2C%20modern%20software%20development%20workspace%20with%20multiple%20screens%20displaying%20applications%2C%20emerald%20green%20and%20warm%20gold%20corporate%20lighting%2C%20abstract%20digital%20project%20visualization%2C%20clean%20professional%20photography&width=400&height=250&seq=quick-pt-03&orientation=landscape',
      href: '/du-an',
    },
    {
      id: 4,
      title: 'NEWS & TRENDS',
      image: 'https://readdy.ai/api/search-image?query=Digital%20news%20and%20technology%20trends%20concept%2C%20abstract%20data%20visualization%20with%20flowing%20information%20streams%2C%20emerald%20green%20gradient%20with%20golden%20light%20accents%2C%20modern%20editorial%20corporate%20style%2C%20clean%20minimalist%20composition&width=400&height=250&seq=quick-pt-04&orientation=landscape',
      href: '/tin-tuc',
    },
    {
      id: 5,
      title: 'PARTNER WITH US',
      href: '/lien-he',
      highlight: true,
    },
  ],
};

export const partners: Localized<{ id: number; name: string; category: string }[]> = { vi: [], en: [] };
