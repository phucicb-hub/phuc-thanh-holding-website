import type { Localized } from '@/lib/lang';

export interface TrainingPillar {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export const trainingPillars: Localized<TrainingPillar[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-tools-line',
      title: 'Học để làm được',
      description:
        'Nội dung được thiết kế gắn với công việc, tình huống và vấn đề thực tế. Người học cần có cơ hội quan sát, thực hành, nhận phản hồi và cải thiện.',
    },
    {
      id: 2,
      icon: 'ri-user-heart-line',
      title: 'Con người làm trung tâm',
      description:
        'Công nghệ hỗ trợ quá trình học tập nhưng không thay thế tư duy, trách nhiệm, sự tương tác và vai trò hướng dẫn của con người.',
    },
    {
      id: 3,
      icon: 'ri-exchange-line',
      title: 'Học tập linh hoạt',
      description:
        'Kết hợp học trực tiếp, học trực tuyến, tự học có hướng dẫn, thực hành theo dự án và hỗ trợ sau đào tạo.',
    },
    {
      id: 4,
      icon: 'ri-bar-chart-box-line',
      title: 'Năng lực có thể đánh giá',
      description:
        'Mỗi chương trình cần xác định rõ người học cần biết gì, làm được gì và áp dụng ra sao sau quá trình học.',
    },
    {
      id: 5,
      icon: 'ri-infinity-line',
      title: 'Học tập suốt đời',
      description:
        'Khuyến khích người học duy trì sự tò mò, chủ động cập nhật kiến thức và thích ứng với những thay đổi của nghề nghiệp, công nghệ và xã hội.',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-tools-line',
      title: 'Learning to Do',
      description:
        'Content is designed around real work, situations and problems. Learners need chances to observe, practice, receive feedback and improve.',
    },
    {
      id: 2,
      icon: 'ri-user-heart-line',
      title: 'People at the Center',
      description:
        'Technology supports learning but does not replace human thinking, responsibility, interaction and guidance.',
    },
    {
      id: 3,
      icon: 'ri-exchange-line',
      title: 'Flexible Learning',
      description:
        'Combining in-person learning, online learning, guided self-study, project practice and post-training support.',
    },
    {
      id: 4,
      icon: 'ri-bar-chart-box-line',
      title: 'Measurable Competency',
      description:
        'Each program must clearly define what learners need to know, do and apply after learning.',
    },
    {
      id: 5,
      icon: 'ri-infinity-line',
      title: 'Lifelong Learning',
      description:
        'Encouraging learners to stay curious, proactively update knowledge and adapt to changes in career, technology and society.',
    },
  ],
};

export interface TrainingProgram {
  id: number;
  icon: string;
  title: string;
  description: string;
  items: string[];
}

export const trainingPrograms: Localized<TrainingProgram[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-brain-line',
      title: 'AI và năng lực số',
      description:
        'Trang bị kiến thức nền tảng và kỹ năng sử dụng công nghệ số, dữ liệu và công cụ AI một cách hiệu quả, an toàn và có trách nhiệm.',
      items: [
        'Nhận thức cơ bản về AI',
        'Sử dụng AI hỗ trợ công việc',
        'Kỹ năng viết yêu cầu cho AI',
        'Kiểm chứng kết quả do AI tạo ra',
        'Bảo vệ dữ liệu cá nhân',
        'Đạo đức và trách nhiệm khi sử dụng AI',
        'Công cụ số phục vụ công việc',
        'Nền tảng về dữ liệu và an toàn thông tin',
      ],
    },
    {
      id: 2,
      icon: 'ri-building-4-line',
      title: 'Quản trị và vận hành doanh nghiệp',
      description:
        'Hỗ trợ đội ngũ nâng cao khả năng tổ chức công việc, quản lý quy trình, sử dụng dữ liệu và phối hợp giữa các bộ phận.',
      items: [
        'Quản trị công việc',
        'Chuẩn hóa quy trình',
        'Dashboard và báo cáo quản trị',
        'Phân tích dữ liệu cơ bản',
        'Quản lý chất lượng',
        'Chăm sóc khách hàng',
        'Ứng dụng công nghệ trong vận hành',
      ],
    },
    {
      id: 3,
      icon: 'ri-user-star-line',
      title: 'Kỹ năng lãnh đạo và quản lý',
      description:
        'Phát triển năng lực dẫn dắt đội ngũ, giao việc, phản hồi, quản trị mục tiêu và hỗ trợ nhân sự thích ứng với thay đổi.',
      items: [
        'Tư duy lãnh đạo',
        'Quản lý theo mục tiêu',
        'Giao việc và kiểm soát',
        'Phản hồi và huấn luyện',
        'Quản trị thay đổi',
        'Phát triển đội ngũ',
        'Ra quyết định dựa trên dữ liệu',
      ],
    },
    {
      id: 4,
      icon: 'ri-briefcase-line',
      title: 'Kỹ năng nghề nghiệp hiện đại',
      description:
        'Phát triển những kỹ năng có thể áp dụng trong nhiều công việc và môi trường khác nhau.',
      items: [
        'Giao tiếp chuyên nghiệp',
        'Làm việc nhóm',
        'Tư duy phản biện',
        'Giải quyết vấn đề',
        'Quản lý thời gian',
        'Thuyết trình',
        'Viết báo cáo',
        'Khả năng thích ứng',
      ],
    },
    {
      id: 5,
      icon: 'ri-graduation-cap-line',
      title: 'Đào tạo chuyên môn theo lĩnh vực',
      description:
        'Phối hợp với các đơn vị và chuyên gia phù hợp để xây dựng chương trình theo từng lĩnh vực hoạt động.',
      items: [
        'Chương trình theo ngành nghề cụ thể',
        'Phối hợp đơn vị chuyên môn',
        'Nội dung đáp ứng tiêu chuẩn ngành',
        'Hồ sơ pháp lý đầy đủ trước khi công bố',
      ],
    },
    {
      id: 6,
      icon: 'ri-slideshow-line',
      title: 'Đào tạo theo nhu cầu doanh nghiệp',
      description:
        'Khảo sát nhu cầu, xác định khoảng cách năng lực và thiết kế chương trình phù hợp với mục tiêu, đối tượng và điều kiện vận hành của từng tổ chức.',
      items: [
        'Khảo sát nhu cầu cụ thể',
        'Xác định khoảng cách năng lực',
        'Thiết kế chương trình riêng',
        'Triển khai linh hoạt theo điều kiện tổ chức',
      ],
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-brain-line',
      title: 'AI & Digital Capability',
      description:
        'Providing foundational knowledge and skills to use digital technology, data and AI tools effectively, safely and responsibly.',
      items: [
        'Basic AI awareness',
        'Using AI to support work',
        'Prompt writing skills',
        'Verifying AI-generated results',
        'Protecting personal data',
        'Ethics and responsibility in AI use',
        'Digital tools for work',
        'Data and information security foundations',
      ],
    },
    {
      id: 2,
      icon: 'ri-building-4-line',
      title: 'Business Management & Operations',
      description:
        'Helping teams improve work organization, process management, data use and cross-department coordination.',
      items: [
        'Work management',
        'Process standardization',
        'Dashboards and management reports',
        'Basic data analysis',
        'Quality management',
        'Customer care',
        'Applying technology in operations',
      ],
    },
    {
      id: 3,
      icon: 'ri-user-star-line',
      title: 'Leadership & Management Skills',
      description:
        'Developing the ability to lead teams, delegate, give feedback, manage goals and support staff through change.',
      items: [
        'Leadership mindset',
        'Management by objectives',
        'Delegation and control',
        'Feedback and coaching',
        'Change management',
        'Team development',
        'Data-driven decision making',
      ],
    },
    {
      id: 4,
      icon: 'ri-briefcase-line',
      title: 'Modern Professional Skills',
      description:
        'Developing skills applicable across many jobs and environments.',
      items: [
        'Professional communication',
        'Teamwork',
        'Critical thinking',
        'Problem solving',
        'Time management',
        'Presentations',
        'Report writing',
        'Adaptability',
      ],
    },
    {
      id: 5,
      icon: 'ri-graduation-cap-line',
      title: 'Field-Specific Training',
      description:
        'Collaborating with suitable units and experts to build programs for each field of activity.',
      items: [
        'Industry-specific programs',
        'Coordination with specialist units',
        'Content meeting industry standards',
        'Complete legal documentation before publishing',
      ],
    },
    {
      id: 6,
      icon: 'ri-slideshow-line',
      title: 'Custom Corporate Training',
      description:
        'Surveying needs, identifying capability gaps and designing programs suited to each organization goals, audience and operating conditions.',
      items: [
        'Specific needs survey',
        'Capability gap identification',
        'Custom program design',
        'Flexible implementation per organization',
      ],
    },
  ],
};

export interface CompetencyLayer {
  title: string;
  colorClass: string;
  items: string[];
}

export const competencyLayers: Localized<CompetencyLayer[]> = {
  vi: [
    {
      title: 'Lớp 1 – Năng lực nền tảng',
      colorClass: 'bg-primary-100 text-primary-800 border-primary-200',
      items: [
        'Đạo đức và trách nhiệm',
        'Khả năng tự học',
        'Giao tiếp',
        'Hợp tác',
        'Kỷ luật và chất lượng',
      ],
    },
    {
      title: 'Lớp 2 – Năng lực tư duy',
      colorClass: 'bg-secondary-100 text-secondary-800 border-secondary-200',
      items: [
        'Tư duy phân tích',
        'Tư duy phản biện',
        'Tư duy hệ thống',
        'Sáng tạo',
        'Giải quyết vấn đề',
        'Ra quyết định',
      ],
    },
    {
      title: 'Lớp 3 – Năng lực công nghệ',
      colorClass: 'bg-accent-100 text-accent-800 border-accent-200',
      items: [
        'Kỹ năng số',
        'Dữ liệu',
        'AI ứng dụng',
        'An toàn thông tin',
        'Tự động hóa',
        'Công cụ cộng tác trực tuyến',
      ],
    },
  ],
  en: [
    {
      title: 'Layer 1 – Foundational Competencies',
      colorClass: 'bg-primary-100 text-primary-800 border-primary-200',
      items: [
        'Ethics and responsibility',
        'Self-learning ability',
        'Communication',
        'Collaboration',
        'Discipline and quality',
      ],
    },
    {
      title: 'Layer 2 – Thinking Competencies',
      colorClass: 'bg-secondary-100 text-secondary-800 border-secondary-200',
      items: [
        'Analytical thinking',
        'Critical thinking',
        'Systems thinking',
        'Creativity',
        'Problem solving',
        'Decision making',
      ],
    },
    {
      title: 'Layer 3 – Technology Competencies',
      colorClass: 'bg-accent-100 text-accent-800 border-accent-200',
      items: [
        'Digital skills',
        'Data',
        'Applied AI',
        'Information security',
        'Automation',
        'Online collaboration tools',
      ],
    },
  ],
};

export interface TrainingStep {
  id: number;
  title: string;
  description: string;
}

export const trainingSteps: Localized<TrainingStep[]> = {
  vi: [
    {
      id: 1,
      title: 'Khảo sát nhu cầu',
      description: 'Xác định mục tiêu, đối tượng và khoảng cách năng lực.',
    },
    {
      id: 2,
      title: 'Thiết kế chương trình',
      description: 'Xây dựng nội dung, hoạt động và tiêu chí đánh giá phù hợp.',
    },
    {
      id: 3,
      title: 'Học kiến thức nền',
      description: 'Cung cấp kiến thức cần thiết bằng hình thức rõ ràng, cô đọng.',
    },
    {
      id: 4,
      title: 'Thực hành tình huống',
      description: 'Áp dụng kiến thức vào bài tập, tình huống hoặc dự án.',
    },
    {
      id: 5,
      title: 'Phản hồi và cải thiện',
      description: 'Nhận góp ý, sửa lỗi và hoàn thiện năng lực.',
    },
    {
      id: 6,
      title: 'Đánh giá khả năng áp dụng',
      description: 'Đánh giá dựa trên việc người học có thể áp dụng gì vào thực tế.',
    },
  ],
  en: [
    {
      id: 1,
      title: 'Survey Needs',
      description: 'Defining goals, audience and capability gaps.',
    },
    {
      id: 2,
      title: 'Design the Program',
      description: 'Building suitable content, activities and evaluation criteria.',
    },
    {
      id: 3,
      title: 'Learn Foundations',
      description: 'Providing necessary knowledge in a clear, concise form.',
    },
    {
      id: 4,
      title: 'Practice Scenarios',
      description: 'Applying knowledge to exercises, situations or projects.',
    },
    {
      id: 5,
      title: 'Feedback & Improve',
      description: 'Receiving suggestions, correcting and completing capabilities.',
    },
    {
      id: 6,
      title: 'Assess Application',
      description: 'Evaluating based on what learners can apply in practice.',
    },
  ],
};

export interface LearningModel {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const learningModels: Localized<LearningModel[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-user-location-line',
      title: 'Học trực tiếp',
      description:
        'Lớp học tại chỗ với sự hướng dẫn trực tiếp, tương tác và thực hành nhóm.',
    },
    {
      id: 2,
      icon: 'ri-computer-line',
      title: 'Học trực tuyến',
      description:
        'Nội dung số, video bài giảng, bài tập tương tác và hỗ trợ từ xa.',
    },
    {
      id: 3,
      icon: 'ri-folder-user-line',
      title: 'Học theo dự án',
      description:
        'Thực hiện dự án thực tế để áp dụng kiến thức vào bối cảnh cụ thể.',
    },
    {
      id: 4,
      icon: 'ri-book-open-line',
      title: 'Tự học có hướng dẫn',
      description:
        'Tài liệu, lộ trình học và mentor hỗ trợ theo tiến độ cá nhân.',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-user-location-line',
      title: 'In-person Learning',
      description:
        'On-site classes with direct guidance, interaction and group practice.',
    },
    {
      id: 2,
      icon: 'ri-computer-line',
      title: 'Online Learning',
      description:
        'Digital content, lecture videos, interactive exercises and remote support.',
    },
    {
      id: 3,
      icon: 'ri-folder-user-line',
      title: 'Project-based Learning',
      description:
        'Carrying out real projects to apply knowledge in a specific context.',
    },
    {
      id: 4,
      icon: 'ri-book-open-line',
      title: 'Guided Self-study',
      description:
        'Materials, learning paths and mentors supporting individual progress.',
    },
  ],
};

export const corporateTrainingForms: Localized<string[]> = {
  vi: [
    'Đào tạo nội bộ',
    'Chương trình dành cho quản lý',
    'Nâng cao năng lực số',
    'AI ứng dụng theo vị trí công việc',
    'Đào tạo quy trình và vận hành',
    'Xây dựng học liệu',
    'Chương trình phát triển đội ngũ',
    'Đánh giá sau đào tạo',
  ],
  en: [
    'Internal training',
    'Programs for managers',
    'Digital capability building',
    'Role-based applied AI',
    'Process and operations training',
    'Learning material development',
    'Team development programs',
    'Post-training evaluation',
  ],
};

export const partnershipTypes: Localized<string[]> = {
  vi: [
    'Phát triển chương trình',
    'Mời chuyên gia và giảng viên',
    'Xây dựng học liệu',
    'Phối hợp tổ chức lớp học',
    'Đào tạo theo đặt hàng',
    'Hoạt động trải nghiệm',
    'Đào tạo cộng đồng',
    'Phát triển nền tảng học tập',
  ],
  en: [
    'Program development',
    'Inviting experts and lecturers',
    'Learning material development',
    'Co-organizing classes',
    'Custom-made training',
    'Experiential activities',
    'Community training',
    'Learning platform development',
  ],
};

export interface TrainingFaqItem {
  id: number;
  question: string;
  answer: string;
}

export const trainingFaq: Localized<TrainingFaqItem[]> = {
  vi: [
    {
      id: 1,
      question: 'Phúc Thành Holding đào tạo những nội dung nào?',
      answer:
        'Các chương trình được định hướng theo nhóm năng lực số, AI ứng dụng, quản trị, kỹ năng nghề nghiệp và chuyên môn phù hợp với nhu cầu thực tế.',
    },
    {
      id: 2,
      question: 'Chương trình có dành cho doanh nghiệp không?',
      answer:
        'Có thể thiết kế chương trình theo nhu cầu của từng tổ chức sau khi khảo sát mục tiêu, đối tượng và điều kiện triển khai.',
    },
    {
      id: 3,
      question: 'Có thể học trực tuyến không?',
      answer:
        'Hình thức học phụ thuộc từng chương trình và có thể kết hợp trực tiếp, trực tuyến, tự học và thực hành.',
    },
    {
      id: 4,
      question: 'Phúc Thành Holding có cấp bằng hoặc chứng chỉ không?',
      answer:
        'Chỉ hiển thị thông tin về văn bằng hoặc chứng chỉ khi chương trình có đầy đủ cơ sở pháp lý và được đơn vị có thẩm quyền xác nhận.',
    },
    {
      id: 5,
      question: 'AI được sử dụng như thế nào trong đào tạo?',
      answer:
        'AI được định hướng như một công cụ hỗ trợ học tập, thực hành và nâng cao hiệu quả công việc. Người học cần biết kiểm chứng kết quả, bảo vệ dữ liệu và sử dụng AI có trách nhiệm.',
    },
    {
      id: 6,
      question: 'Làm thế nào để đề xuất chương trình đào tạo?',
      answer:
        'Gửi nhu cầu qua trang Liên hệ hợp tác, email info@phucthanhholding.com hoặc số điện thoại 0343 089 666.',
    },
  ],
  en: [
    {
      id: 1,
      question: 'What does Phuc Thanh Holding train?',
      answer:
        'Programs cover digital capability, applied AI, management, professional skills and field-specific expertise suited to real needs.',
    },
    {
      id: 2,
      question: 'Are programs available for businesses?',
      answer:
        'Programs can be designed to each organization needs after surveying goals, audience and implementation conditions.',
    },
    {
      id: 3,
      question: 'Can I learn online?',
      answer:
        'The learning format depends on each program and can combine in-person, online, self-study and practice.',
    },
    {
      id: 4,
      question: 'Does Phuc Thanh Holding issue degrees or certificates?',
      answer:
        'Degree or certificate information is only displayed when the program has full legal basis and is confirmed by a competent authority.',
    },
    {
      id: 5,
      question: 'How is AI used in training?',
      answer:
        'AI is positioned as a tool supporting learning, practice and work efficiency. Learners must verify results, protect data and use AI responsibly.',
    },
    {
      id: 6,
      question: 'How can I propose a training program?',
      answer:
        'Send your needs via the Contact page, email info@phucthanhholding.com or phone 0343 089 666.',
    },
  ],
};