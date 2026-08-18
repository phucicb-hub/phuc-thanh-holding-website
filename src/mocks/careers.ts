import type { Localized } from '@/lib/lang';

export interface JobOpening {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

export const jobOpenings: Localized<JobOpening[]> = {
  vi: [
    {
      id: 1,
      title: 'Lập trình viên Frontend',
      department: 'Phát triển phần mềm',
      location: 'Phú Thọ',
      type: 'Toàn thời gian',
      description:
        'Tham gia phát triển giao diện các sản phẩm web, đảm bảo trải nghiệm người dùng mượt mà và thân thiện trên mọi thiết bị.',
    },
    {
      id: 2,
      title: 'Lập trình viên Backend',
      department: 'Phát triển phần mềm',
      location: 'Phú Thọ',
      type: 'Toàn thời gian',
      description:
        'Xây dựng và vận hành các dịch vụ nền tảng, đảm bảo hiệu năng, bảo mật và khả năng mở rộng của hệ thống.',
    },
    {
      id: 3,
      title: 'Chuyên viên phân tích nghiệp vụ',
      department: 'Chuyển đổi số',
      location: 'Phú Thọ',
      type: 'Toàn thời gian',
      description:
        'Phân tích nhu cầu khách hàng, chuyển hóa thành yêu cầu kỹ thuật và đồng hành cùng đội ngũ trong suốt quá trình triển khai.',
    },
    {
      id: 4,
      title: 'Chuyên viên thiết kế UX/UI',
      department: 'Truyền thông & nội dung số',
      location: 'Phú Thọ',
      type: 'Toàn thời gian',
      description:
        'Thiết kế trải nghiệm và giao diện cho sản phẩm, đặt người dùng làm trung tâm và giữ tính nhất quán về nhận diện thương hiệu.',
    },
    {
      id: 5,
      title: 'Chuyên viên chăm sóc khách hàng',
      department: 'Chăm sóc khách hàng',
      location: 'Phú Thọ',
      type: 'Toàn thời gian',
      description:
        'Hỗ trợ khách hàng trong quá trình sử dụng sản phẩm, tiếp nhận phản hồi và phối hợp xử lý yêu cầu kịp thời.',
    },
  ],
  en: [
    {
      id: 1,
      title: 'Frontend Developer',
      department: 'Software Development',
      location: 'Phu Tho',
      type: 'Full-time',
      description:
        'Participate in developing web product interfaces, ensuring a smooth and friendly user experience across all devices.',
    },
    {
      id: 2,
      title: 'Backend Developer',
      department: 'Software Development',
      location: 'Phu Tho',
      type: 'Full-time',
      description:
        'Build and operate platform services, ensuring performance, security and scalability of the system.',
    },
    {
      id: 3,
      title: 'Business Analyst',
      department: 'Digital Transformation',
      location: 'Phu Tho',
      type: 'Full-time',
      description:
        'Analyze customer needs, transform them into technical requirements and support the team throughout implementation.',
    },
    {
      id: 4,
      title: 'UX/UI Designer',
      department: 'Media & Digital Content',
      location: 'Phu Tho',
      type: 'Full-time',
      description:
        'Design product experiences and interfaces, putting users at the center and maintaining brand consistency.',
    },
    {
      id: 5,
      title: 'Customer Care Specialist',
      department: 'Customer Care',
      location: 'Phu Tho',
      type: 'Full-time',
      description:
        'Support customers during product use, receive feedback and coordinate timely request handling.',
    },
  ],
};

export interface Benefit {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const benefits: Localized<Benefit[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-medal-line',
      title: 'Thu nhập cạnh tranh',
      description: 'Chế độ đãi ngộ hợp lý, ghi nhận đóng góp và tạo động lực phát triển.',
    },
    {
      id: 2,
      icon: 'ri-arrow-up-circle-line',
      title: 'Cơ hội thăng tiến',
      description: 'Lộ trình phát triển rõ ràng, khuyến khích học hỏi và đảm nhận trách nhiệm.',
    },
    {
      id: 3,
      icon: 'ri-book-open-line',
      title: 'Đào tạo liên tục',
      description: 'Môi trường khuyến khích học tập, cập nhật kiến thức công nghệ mới.',
    },
    {
      id: 4,
      icon: 'ri-team-line',
      title: 'Văn hóa cởi mở',
      description: 'Đồng nghiệp thân thiện, hợp tác và hỗ trợ lẫn nhau trong công việc.',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-medal-line',
      title: 'Competitive Income',
      description: 'Fair benefits that recognize contributions and create development motivation.',
    },
    {
      id: 2,
      icon: 'ri-arrow-up-circle-line',
      title: 'Growth Opportunities',
      description: 'A clear development path that encourages learning and taking on responsibility.',
    },
    {
      id: 3,
      icon: 'ri-book-open-line',
      title: 'Continuous Training',
      description: 'An environment that encourages learning and staying up-to-date with new technology.',
    },
    {
      id: 4,
      icon: 'ri-team-line',
      title: 'Open Culture',
      description: 'Friendly colleagues who collaborate and support each other at work.',
    },
  ],
};