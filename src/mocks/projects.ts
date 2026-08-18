import type { Localized } from '@/lib/lang';

export interface Capability {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const capabilities: Localized<Capability[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-team-line',
      title: 'Đội ngũ tận tâm',
      description:
        'Đội ngũ am hiểu công nghệ và thực tiễn doanh nghiệp, đồng hành xuyên suốt quá trình triển khai.',
    },
    {
      id: 2,
      icon: 'ri-shield-check-line',
      title: 'Quy trình minh bạch',
      description:
        'Lộ trình rõ ràng, trao đổi thường xuyên, đảm bảo khách hàng luôn nắm được tiến độ dự án.',
    },
    {
      id: 3,
      icon: 'ri-stack-line',
      title: 'Công nghệ hiện đại',
      description:
        'Ứng dụng các công nghệ và nền tảng phổ biến, dễ mở rộng và bảo trì trong dài hạn.',
    },
    {
      id: 4,
      icon: 'ri-customer-service-2-line',
      title: 'Hỗ trợ dài hạn',
      description:
        'Đồng hành sau bàn giao, liên tục cải tiến để giải pháp ngày càng phù hợp với nhu cầu thực tế.',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-team-line',
      title: 'Dedicated Team',
      description:
        'A team well-versed in technology and business practice, supporting throughout the implementation process.',
    },
    {
      id: 2,
      icon: 'ri-shield-check-line',
      title: 'Transparent Process',
      description:
        'A clear roadmap with regular communication, ensuring customers always know the project status.',
    },
    {
      id: 3,
      icon: 'ri-stack-line',
      title: 'Modern Technology',
      description:
        'Applying popular technologies and platforms that are easy to scale and maintain in the long term.',
    },
    {
      id: 4,
      icon: 'ri-customer-service-2-line',
      title: 'Long-term Support',
      description:
        'Support after handover and continuous improvement so the solution increasingly fits real needs.',
    },
  ],
};