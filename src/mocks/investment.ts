import type { Localized } from '@/lib/lang';

export interface InvestmentService {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const investmentServices: Localized<InvestmentService[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-line-chart-line',
      title: 'Tư vấn định hướng đầu tư',
      description:
        'Hỗ trợ xác định cơ hội, đánh giá tiềm năng và xây dựng định hướng đầu tư dài hạn gắn với công nghệ và năng lực thực tế của tổ chức.',
    },
    {
      id: 2,
      icon: 'ri-cpu-line',
      title: 'Ứng dụng công nghệ vào vận hành',
      description:
        'Đồng hành đưa công nghệ vào quy trình vận hành để tối ưu hiệu quả, giảm chi phí và nâng cao chất lượng công việc của tổ chức.',
    },
    {
      id: 3,
      icon: 'ri-stack-line',
      title: 'Xây dựng nền tảng số',
      description:
        'Định hướng và phát triển các nền tảng số phục vụ quản trị, kết nối và phát triển, tạo nền móng cho sự tăng trưởng bền vững.',
    },
    {
      id: 4,
      icon: 'ri-rocket-2-line',
      title: 'Phát triển sản phẩm công nghệ',
      description:
        'Nghiên cứu và phát triển các sản phẩm công nghệ đáp ứng nhu cầu thực tế của doanh nghiệp và cộng đồng, gắn với giá trị sử dụng lâu dài.',
    },
    {
      id: 5,
      icon: 'ri-global-line',
      title: 'Kết nối hệ sinh thái',
      description:
        'Kết nối nguồn lực, đối tác và nền tảng công nghệ để tạo ra hệ sinh thái hỗ trợ lẫn nhau, mở rộng cơ hội hợp tác và phát triển.',
    },
    {
      id: 6,
      icon: 'ri-shield-check-line',
      title: 'Quản trị rủi ro & hiệu quả',
      description:
        'Đánh giá và kiểm soát rủi ro trong các hoạt động đầu tư và ứng dụng công nghệ, đảm bảo nguồn lực được sử dụng đúng mục đích và hiệu quả.',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-line-chart-line',
      title: 'Investment Direction Consulting',
      description:
        'Helping identify opportunities, assess potential and build long-term investment direction tied to technology and actual capabilities.',
    },
    {
      id: 2,
      icon: 'ri-cpu-line',
      title: 'Applying Technology to Operations',
      description:
        'Supporting technology adoption in operations to optimize efficiency, reduce costs and improve work quality.',
    },
    {
      id: 3,
      icon: 'ri-stack-line',
      title: 'Building Digital Platforms',
      description:
        'Directing and developing digital platforms for management, connection and growth, laying the foundation for sustainable growth.',
    },
    {
      id: 4,
      icon: 'ri-rocket-2-line',
      title: 'Technology Product Development',
      description:
        'Researching and developing technology products meeting real business and community needs with long-term value.',
    },
    {
      id: 5,
      icon: 'ri-global-line',
      title: 'Ecosystem Connection',
      description:
        'Connecting resources, partners and technology platforms to build a mutually supportive ecosystem and expand cooperation.',
    },
    {
      id: 6,
      icon: 'ri-shield-check-line',
      title: 'Risk & Efficiency Management',
      description:
        'Assessing and controlling risks in investment and technology application, ensuring resources are used effectively and for the right purpose.',
    },
  ],
};

export interface InvestmentProcessStep {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const investmentProcess: Localized<InvestmentProcessStep[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-search-eye-line',
      title: 'Nghiên cứu & đánh giá',
      description: 'Tìm hiểu bối cảnh, xu hướng và nhu cầu thực tế để xác định phạm vi và mục tiêu đầu tư.',
    },
    {
      id: 2,
      icon: 'ri-focus-3-line',
      title: 'Xác định cơ hội',
      description: 'Phân tích và lựa chọn những cơ hội đầu tư, ứng dụng công nghệ phù hợp với năng lực và tầm nhìn.',
    },
    {
      id: 3,
      icon: 'ri-route-line',
      title: 'Xây dựng định hướng',
      description: 'Phác thảo định hướng, lộ trình và tiêu chí đánh giá hiệu quả cho từng hoạt động đầu tư.',
    },
    {
      id: 4,
      icon: 'ri-tools-line',
      title: 'Lựa chọn giải pháp',
      description: 'Đánh giá và chọn giải pháp công nghệ, đối tác phù hợp để triển khai theo định hướng đã đề ra.',
    },
    {
      id: 5,
      icon: 'ri-rocket-2-line',
      title: 'Triển khai & ứng dụng',
      description: 'Đưa giải pháp vào thực tế, phối hợp đồng bộ giữa con người, quy trình và công nghệ.',
    },
    {
      id: 6,
      icon: 'ri-pie-chart-2-line',
      title: 'Đo lường & tối ưu',
      description: 'Theo dõi kết quả, rút kinh nghiệm và điều chỉnh để hoạt động đầu tư ngày càng hiệu quả hơn.',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-search-eye-line',
      title: 'Research & Assess',
      description: 'Understanding context, trends and real needs to define the scope and investment goals.',
    },
    {
      id: 2,
      icon: 'ri-focus-3-line',
      title: 'Identify Opportunities',
      description: 'Analyzing and selecting investment and technology opportunities suited to capability and vision.',
    },
    {
      id: 3,
      icon: 'ri-route-line',
      title: 'Build Direction',
      description: 'Outlining direction, roadmap and effectiveness criteria for each investment activity.',
    },
    {
      id: 4,
      icon: 'ri-tools-line',
      title: 'Select Solutions',
      description: 'Evaluating and choosing suitable technology solutions and partners to deploy as planned.',
    },
    {
      id: 5,
      icon: 'ri-rocket-2-line',
      title: 'Deploy & Apply',
      description: 'Putting the solution into practice with synchronized coordination of people, process and technology.',
    },
    {
      id: 6,
      icon: 'ri-pie-chart-2-line',
      title: 'Measure & Optimize',
      description: 'Tracking results, learning and adjusting so investment activities become more effective.',
    },
  ],
};

export interface InvestmentPrinciple {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const investmentPrinciples: Localized<InvestmentPrinciple[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-compass-3-line',
      title: 'Tầm nhìn dài hạn',
      description:
        'Mọi hoạt động đầu tư và ứng dụng công nghệ đều hướng tới giá trị bền vững lâu dài thay vì chỉ chạy theo những lợi ích ngắn hạn.',
    },
    {
      id: 2,
      icon: 'ri-user-heart-line',
      title: 'Công nghệ phục vụ con người',
      description:
        'Công nghệ là công cụ để nâng cao hiệu quả và chất lượng cuộc sống. Con người luôn là trung tâm của mọi giải pháp và quyết định.',
    },
    {
      id: 3,
      icon: 'ri-scales-3-line',
      title: 'Minh bạch & trách nhiệm',
      description:
        'Các hoạt động đầu tư được thực hiện công khai, có trách nhiệm với nguồn lực, đối tác và cộng đồng mà doanh nghiệp phục vụ.',
    },
    {
      id: 4,
      icon: 'ri-seedling-line',
      title: 'Giá trị bền vững',
      description:
        'Ưu tiên những giải pháp tạo ra giá trị thực sự cho doanh nghiệp và cộng đồng, góp phần vào sự phát triển bền vững chung.',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-compass-3-line',
      title: 'Long-term Vision',
      description:
        'All investment and technology activities aim for long-term sustainable value rather than short-term gains.',
    },
    {
      id: 2,
      icon: 'ri-user-heart-line',
      title: 'Technology Serves People',
      description:
        'Technology is a tool to improve efficiency and quality of life. People are always at the center of every solution and decision.',
    },
    {
      id: 3,
      icon: 'ri-scales-3-line',
      title: 'Transparency & Responsibility',
      description:
        'Investment activities are conducted openly and responsibly toward resources, partners and the community the business serves.',
    },
    {
      id: 4,
      icon: 'ri-seedling-line',
      title: 'Sustainable Value',
      description:
        'Prioritizing solutions that create real value for the business and community, contributing to shared sustainable development.',
    },
  ],
};

export interface InvestmentFaqItem {
  id: number;
  question: string;
  answer: string;
}

export const investmentFaq: Localized<InvestmentFaqItem[]> = {
  vi: [
    {
      id: 1,
      question: 'Phúc Thành Holding hỗ trợ những nội dung đầu tư & công nghệ nào?',
      answer:
        'Phúc Thành Holding định hướng hỗ trợ tư vấn định hướng đầu tư, ứng dụng công nghệ vào vận hành, xây dựng nền tảng số, phát triển sản phẩm công nghệ, kết nối hệ sinh thái và quản trị rủi ro hiệu quả.',
    },
    {
      id: 2,
      question: 'Doanh nghiệp cần chuẩn bị gì khi muốn ứng dụng công nghệ?',
      answer:
        'Trước tiên doanh nghiệp nên xác định rõ mục tiêu và nhu cầu thực tế, sau đó cùng Phúc Thành Holding đánh giá hiện trạng để lựa chọn giải pháp công nghệ phù hợp với nguồn lực và lộ trình phát triển.',
    },
    {
      id: 3,
      question: 'Phúc Thành Holding ưu tiên đầu tư vào lĩnh vực nào?',
      answer:
        'Phúc Thành Holding ưu tiên các hoạt động đầu tư gắn với công nghệ và tạo giá trị lâu dài, bao gồm phát triển phần mềm, chuyển đổi số, quản trị dữ liệu và đào tạo nguồn nhân lực.',
    },
    {
      id: 4,
      question: 'Làm thế nào để hợp tác đầu tư cùng Phúc Thành Holding?',
      answer:
        'Đối tác có thể liên hệ qua trang Liên hệ hợp tác, email phuclv@phucthanhholding.com hoặc số điện thoại 0343 089 666 để trao đổi về nhu cầu và cơ hội hợp tác cụ thể.',
    },
    {
      id: 5,
      question: 'Các hoạt động đầu tư có được theo dõi và đánh giá hiệu quả không?',
      answer:
        'Có. Phúc Thành Holding coi trọng việc đo lường kết quả và tối ưu liên tục, đảm bảo nguồn lực đầu tư được sử dụng đúng mục đích và mang lại hiệu quả thiết thực.',
    },
  ],
  en: [
    {
      id: 1,
      question: 'What investment & technology services does Phuc Thanh Holding provide?',
      answer:
        'Phuc Thanh Holding supports investment direction consulting, applying technology to operations, building digital platforms, developing technology products, connecting the ecosystem and managing risk effectively.',
    },
    {
      id: 2,
      question: 'What should a business prepare before applying technology?',
      answer:
        'First the business should clearly define goals and real needs, then work with Phuc Thanh Holding to assess the current state and choose technology solutions suited to resources and roadmap.',
    },
    {
      id: 3,
      question: 'Which fields does Phuc Thanh Holding prioritize investing in?',
      answer:
        'Phuc Thanh Holding prioritizes technology-linked investments creating long-term value, including software development, digital transformation, data management and workforce training.',
    },
    {
      id: 4,
      question: 'How can I partner with Phuc Thanh Holding for investment?',
      answer:
        'Partners can contact us via the Contact page, email phuclv@phucthanhholding.com or phone 0343 089 666 to discuss specific needs and opportunities.',
    },
    {
      id: 5,
      question: 'Are investment activities monitored and evaluated?',
      answer:
        'Yes. Phuc Thanh Holding values measuring results and continuous optimization, ensuring investment resources are used properly and deliver practical results.',
    },
  ],
};