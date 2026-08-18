import type { Localized } from '@/lib/lang';

/* ---------- Shared image ---------- */
export const ptLmsHeroImage =
  'https://readdy.ai/api/search-image?query=Modern%20learning%20management%20system%20concept%2C%20abstract%20digital%20learning%20platform%20with%20connected%20knowledge%20nodes%20and%20glowing%20neural%20pathways%2C%20silhouette%20of%20learners%20interacting%20with%20an%20educational%20dashboard%20on%20a%20large%20screen%2C%20deep%20emerald%20green%20gradient%20background%20with%20warm%20golden%20light%20accents%2C%20professional%20corporate%20technology%20atmosphere%2C%20clean%20minimal%20composition%2C%20cinematic%20soft%20lighting%2C%20high%20detail%20editorial%20style&width=1600&height=600&seq=ptlms-hero-1&orientation=landscape';

/* ---------- Hero ---------- */
export interface PtLmsHero {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
}

export const ptLmsHero: Localized<PtLmsHero> = {
  vi: {
    badge: 'Hệ thống quản lý đào tạo',
    title: 'PT-LMS',
    subtitle: 'Nền tảng học tập số lấy con người làm trung tâm',
    description:
      'Trong một thế giới mà kiến thức thay đổi nhanh hơn chu kỳ đào tạo truyền thống, tổ chức không chỉ cần nơi đăng tải bài giảng. Họ cần một hệ thống kết nối chiến lược phát triển, năng lực con người, nội dung học tập và kết quả thực tế.',
    primaryCta: 'Yêu cầu trình diễn PT-LMS',
    secondaryCta: 'Đăng ký tư vấn giải pháp',
  },
  en: {
    badge: 'Learning Management System',
    title: 'PT-LMS',
    subtitle: 'A human-centered digital learning platform',
    description:
      'In a world where knowledge changes faster than traditional training cycles, organizations need more than a place to upload lessons. They need a system that connects development strategy, human capability, learning content and real-world outcomes.',
    primaryCta: 'Request a PT-LMS demo',
    secondaryCta: 'Register for solution consulting',
  },
};

/* ---------- Problem section ---------- */
export interface PtLmsSectionText {
  title: string;
  description: string;
}

export const ptLmsProblem: Localized<PtLmsSectionText> = {
  vi: {
    title: 'Khi đào tạo không còn là một hoạt động độc lập',
    description:
      'Nhiều tổ chức đang quản lý đào tạo bằng các công cụ rời rạc. Khi quy mô tăng lên, phương thức thủ công tạo ra chi phí ẩn, dữ liệu phân mảnh và khoảng cách giữa hoàn thành khóa học với hình thành năng lực thực tế.',
  },
  en: {
    title: 'When training is no longer a standalone activity',
    description:
      'Many organizations still manage training with fragmented tools. As scale grows, manual operations create hidden costs, fragmented data and a gap between completing a course and forming real capability.',
  },
};

export const ptLmsPainPoints: Localized<string[]> = {
  vi: [
    'Danh sách học viên nằm trong Excel.',
    'Tài liệu được gửi qua email hoặc ứng dụng nhắn tin.',
    'Video được lưu ở nhiều nền tảng khác nhau.',
    'Điểm số và kết quả đánh giá thiếu thống nhất.',
    'Người quản lý khó biết nhân sự đã học gì và có thể làm được gì.',
    'Giảng viên mất nhiều thời gian cho công việc hành chính.',
    'Người học khó theo dõi lộ trình và tiến độ cá nhân.',
    'Dữ liệu đào tạo chưa hỗ trợ được quyết định quản trị.',
  ],
  en: [
    'Learner lists live in spreadsheets.',
    'Materials are sent via email or messaging apps.',
    'Videos are scattered across many platforms.',
    'Scores and assessment results lack consistency.',
    'Managers struggle to know what staff learned and what they can do.',
    'Instructors spend too much time on administrative work.',
    'Learners find it hard to track their own path and progress.',
    'Training data does not support management decisions.',
  ],
};

/* ---------- Vision section ---------- */
export const ptLmsVision: Localized<PtLmsSectionText> = {
  vi: {
    title: 'Không chỉ quản lý khóa học — quản trị toàn bộ hành trình phát triển',
    description:
      'PT-LMS đặt người học ở trung tâm nhưng vẫn đáp ứng đầy đủ nhu cầu quản trị của tổ chức.',
  },
  en: {
    title: 'Beyond course management — governing the entire development journey',
    description:
      'PT-LMS puts learners at the center while fully meeting the governance needs of the organization.',
  },
};

export interface PtLmsQuestion {
  id: number;
  question: string;
}

export const ptLmsQuestions: Localized<PtLmsQuestion[]> = {
  vi: [
    { id: 1, question: 'Người học cần phát triển năng lực nào?' },
    { id: 2, question: 'Chương trình nào phù hợp với nhu cầu đó?' },
    { id: 3, question: 'Người học đang tiến bộ đến đâu?' },
    { id: 4, question: 'Kết quả học tập đã được ứng dụng như thế nào?' },
  ],
  en: [
    { id: 1, question: 'Which capabilities does the learner need to develop?' },
    { id: 2, question: 'Which program fits that need?' },
    { id: 3, question: 'How far has the learner progressed?' },
    { id: 4, question: 'How have the learning outcomes been applied?' },
  ],
};

export const ptLmsCycle: Localized<string[]> = {
  vi: [
    'Xác định nhu cầu',
    'Xây dựng lộ trình',
    'Tổ chức đào tạo',
    'Thực hành',
    'Kiểm tra và đánh giá',
    'Ghi nhận năng lực',
    'Phân tích kết quả',
    'Cải tiến chương trình',
  ],
  en: [
    'Identify needs',
    'Build the pathway',
    'Deliver training',
    'Practice',
    'Assess and evaluate',
    'Record capability',
    'Analyze results',
    'Improve the program',
  ],
};

/* ---------- Pillars ---------- */
export const ptLmsPillarsTitle: Localized<PtLmsSectionText> = {
  vi: {
    title: 'Những trụ cột của PT-LMS',
    description:
      'Năm nguyên tắc định hình cách PT-LMS được thiết kế để phục vụ cả người học lẫn tổ chức.',
  },
  en: {
    title: 'The pillars of PT-LMS',
    description:
      'Five principles that shape how PT-LMS is designed to serve both learners and the organization.',
  },
};

export interface PtLmsPillar {
  id: number;
  icon: string;
  title: string;
  description: string;
  items: string[];
}

export const ptLmsPillars: Localized<PtLmsPillar[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-user-heart-line',
      title: 'Lấy người học làm trung tâm',
      description:
        'Mỗi người học có hồ sơ, vai trò, mục tiêu và tốc độ phát triển khác nhau. PT-LMS hướng tới trải nghiệm học tập cá nhân hóa theo vị trí, trình độ và nhu cầu.',
      items: [
        'Vị trí công việc và đơn vị',
        'Trình độ hiện tại',
        'Nhóm năng lực cần phát triển',
        'Chương trình bắt buộc và tự chọn',
        'Tiến độ và kết quả học tập',
        'Nội dung được đề xuất tiếp theo',
      ],
    },
    {
      id: 2,
      icon: 'ri-bar-chart-box-line',
      title: 'Đào tạo gắn với năng lực',
      description:
        'PT-LMS không chỉ tổ chức nội dung theo khóa học mà còn định hướng theo khung năng lực, giúp tổ chức thấy mối liên hệ giữa chương trình và yêu cầu thực tế.',
      items: [
        'Năng lực chuyên môn',
        'Năng lực quản lý',
        'Kỹ năng số và AI',
        'Tư duy phân tích',
        'Giao tiếp và hợp tác',
        'Đạo đức và tuân thủ',
      ],
    },
    {
      id: 3,
      icon: 'ri-exchange-line',
      title: 'Học tập linh hoạt',
      description:
        'PT-LMS hỗ trợ nhiều hình thức học, để tổ chức lựa chọn mô hình phù hợp thay vì bị giới hạn trong một phương pháp duy nhất.',
      items: [
        'Học trực tuyến theo tiến độ cá nhân',
        'Học trực tiếp có quản lý điểm danh',
        'Lớp học trực tuyến theo thời gian thực',
        'Học kết hợp trực tiếp và trực tuyến',
        'Học theo dự án và thực hành tại nơi làm việc',
        'Tự học có định hướng',
      ],
    },
    {
      id: 4,
      icon: 'ri-database-2-line',
      title: 'Dữ liệu hỗ trợ quyết định',
      description:
        'Mỗi hoạt động tạo ra dữ liệu phục vụ quản trị. Dashboard giúp nhà quản lý nhìn thấy vấn đề và đưa ra hành động, không chỉ trình bày con số.',
      items: [
        'Tỷ lệ tham gia và hoàn thành',
        'Tiến độ theo cá nhân và đơn vị',
        'Kết quả kiểm tra',
        'Chương trình có tỷ lệ hoàn thành thấp',
        'Khoảng cách năng lực',
        'Mức độ sử dụng hệ thống',
      ],
    },
    {
      id: 5,
      icon: 'ri-shield-check-line',
      title: 'Bảo mật và quản trị có trách nhiệm',
      description:
        'Dữ liệu học tập phản ánh năng lực và quá trình phát triển cá nhân. PT-LMS hướng tới nguyên tắc bảo vệ dữ liệu ngay từ khâu thiết kế.',
      items: [
        'Phân quyền theo vai trò',
        'Mã hóa kết nối',
        'Xác thực nhiều lớp khi phù hợp',
        'Nhật ký hoạt động',
        'Sao lưu và phục hồi',
        'Quản lý thời hạn lưu trữ',
      ],
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-user-heart-line',
      title: 'Learner at the center',
      description:
        'Every learner has a different profile, role, goal and pace. PT-LMS aims for a personalized learning experience based on position, level and needs.',
      items: [
        'Job position and unit',
        'Current level',
        'Capability groups to develop',
        'Required and elective programs',
        'Progress and learning outcomes',
        'Next recommended content',
      ],
    },
    {
      id: 2,
      icon: 'ri-bar-chart-box-line',
      title: 'Training tied to competency',
      description:
        'PT-LMS organizes content not only by course but also by competency framework, helping organizations see the link between programs and real requirements.',
      items: [
        'Professional competency',
        'Management competency',
        'Digital and AI skills',
        'Analytical thinking',
        'Communication and collaboration',
        'Ethics and compliance',
      ],
    },
    {
      id: 3,
      icon: 'ri-exchange-line',
      title: 'Flexible learning',
      description:
        'PT-LMS supports many learning formats, letting organizations choose the right model instead of being limited to a single method.',
      items: [
        'Self-paced online learning',
        'In-person learning with attendance',
        'Real-time online classes',
        'Blended learning',
        'Project-based and on-the-job practice',
        'Guided self-study',
      ],
    },
    {
      id: 4,
      icon: 'ri-database-2-line',
      title: 'Data-driven decisions',
      description:
        'Every activity generates governance data. The dashboard helps managers see problems and act, not just present numbers.',
      items: [
        'Participation and completion rates',
        'Progress by individual and unit',
        'Assessment results',
        'Programs with low completion',
        'Capability gaps',
        'System usage levels',
      ],
    },
    {
      id: 5,
      icon: 'ri-shield-check-line',
      title: 'Security and responsible governance',
      description:
        'Learning data reflects personal capability and development. PT-LMS follows the principle of data protection by design.',
      items: [
        'Role-based access control',
        'Encrypted connections',
        'Multi-factor authentication when appropriate',
        'Activity logs',
        'Backup and recovery',
        'Retention period management',
      ],
    },
  ],
};

/* ---------- Features ---------- */
export const ptLmsFeaturesTitle: Localized<PtLmsSectionText> = {
  vi: {
    title: 'Các nhóm chức năng chính',
    description:
      'PT-LMS được tổ chức thành các nhóm chức năng xuyên suốt, phục vụ toàn bộ vòng đời đào tạo.',
  },
  en: {
    title: 'Core functional groups',
    description:
      'PT-LMS is organized into functional groups spanning the entire training lifecycle.',
  },
};

export interface PtLmsFeatureGroup {
  id: number;
  icon: string;
  title: string;
  items: string[];
}

export const ptLmsFeatures: Localized<PtLmsFeatureGroup[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-user-line',
      title: 'Quản lý người học',
      items: [
        'Tạo và quản lý hồ sơ học viên',
        'Phân nhóm theo đơn vị, lớp hoặc phòng ban',
        'Nhập dữ liệu từ tệp có cấu trúc',
        'Giao khóa học theo cá nhân hoặc nhóm',
        'Theo dõi trạng thái và lịch sử đào tạo',
        'Thiết lập vai trò và quyền truy cập',
      ],
    },
    {
      id: 2,
      icon: 'ri-user-star-line',
      title: 'Quản lý giảng viên',
      items: [
        'Hồ sơ chuyên môn',
        'Chương trình phụ trách',
        'Lịch giảng dạy',
        'Chấm bài và phản hồi',
        'Theo dõi tiến độ lớp',
        'Quản lý tài liệu giảng dạy',
      ],
    },
    {
      id: 3,
      icon: 'ri-book-2-line',
      title: 'Quản lý khóa học',
      items: [
        'Tạo khóa học, chia chương bài',
        'Thiết lập điều kiện hoàn thành',
        'Quản lý phiên bản nội dung',
        'Thiết lập khóa học bắt buộc',
        'Gắn khóa học với năng lực',
        'Sao chép và tái sử dụng cấu trúc',
      ],
    },
    {
      id: 4,
      icon: 'ri-file-list-3-line',
      title: 'Quản lý nội dung học tập',
      items: [
        'Văn bản, hình ảnh, video, âm thanh',
        'PDF, slide bài giảng',
        'Bài tập và câu hỏi tương tác',
        'Tình huống thực hành',
        'Liên kết tài nguyên bên ngoài',
        'Tài liệu tải xuống có kiểm soát',
      ],
    },
    {
      id: 5,
      icon: 'ri-check-double-line',
      title: 'Kiểm tra và đánh giá',
      items: [
        'Ngân hàng câu hỏi, trắc nghiệm, tự luận',
        'Chấm điểm tự động và thủ công',
        'Giới hạn thời gian, trộn câu hỏi',
        'Thiết lập số lần làm bài',
        'Phản hồi sau kiểm tra',
        'Thiết lập ngưỡng đạt',
      ],
    },
    {
      id: 6,
      icon: 'ri-calendar-check-line',
      title: 'Quản lý lớp học',
      items: [
        'Tạo lớp theo lịch',
        'Phân công giảng viên',
        'Điểm danh',
        'Lịch học và phòng học',
        'Thông báo thay đổi',
        'Tổng hợp kết quả lớp',
      ],
    },
    {
      id: 7,
      icon: 'ri-award-line',
      title: 'Chứng nhận',
      items: [
        'Tạo chứng nhận hoàn thành khi đủ điều kiện',
        'Họ tên và tên chương trình',
        'Mã xác minh',
        'Thời hạn hiệu lực nếu có',
        'Trạng thái còn hiệu lực hoặc hết hạn',
      ],
    },
    {
      id: 8,
      icon: 'ri-line-chart-line',
      title: 'Báo cáo và dashboard',
      items: [
        'Theo cá nhân, lớp, khóa học',
        'Theo giảng viên, phòng ban, đơn vị',
        'Theo nhóm năng lực và khoảng thời gian',
        'Trạng thái hoàn thành',
        'Xuất báo cáo theo phạm vi được cấp quyền',
      ],
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-user-line',
      title: 'Learner management',
      items: [
        'Create and manage learner profiles',
        'Group by unit, class or department',
        'Import data from structured files',
        'Assign courses to individuals or groups',
        'Track learning status and history',
        'Set roles and access rights',
      ],
    },
    {
      id: 2,
      icon: 'ri-user-star-line',
      title: 'Instructor management',
      items: [
        'Professional profiles',
        'Assigned programs',
        'Teaching schedules',
        'Grading and feedback',
        'Track class progress',
        'Manage teaching materials',
      ],
    },
    {
      id: 3,
      icon: 'ri-book-2-line',
      title: 'Course management',
      items: [
        'Create courses and lessons',
        'Set completion conditions',
        'Version management',
        'Set required courses',
        'Link courses to competencies',
        'Copy and reuse structures',
      ],
    },
    {
      id: 4,
      icon: 'ri-file-list-3-line',
      title: 'Learning content management',
      items: [
        'Text, images, video, audio',
        'PDFs and slide decks',
        'Exercises and interactive questions',
        'Practice scenarios',
        'External resource links',
        'Controlled downloads',
      ],
    },
    {
      id: 5,
      icon: 'ri-check-double-line',
      title: 'Testing and assessment',
      items: [
        'Question bank, quizzes, essays',
        'Automatic and manual grading',
        'Time limits, question shuffling',
        'Set number of attempts',
        'Post-test feedback',
        'Set passing thresholds',
      ],
    },
    {
      id: 6,
      icon: 'ri-calendar-check-line',
      title: 'Class management',
      items: [
        'Create scheduled classes',
        'Assign instructors',
        'Attendance tracking',
        'Schedules and rooms',
        'Change notifications',
        'Summarize class results',
      ],
    },
    {
      id: 7,
      icon: 'ri-award-line',
      title: 'Certification',
      items: [
        'Issue completion certificates when eligible',
        'Learner name and program',
        'Verification code',
        'Validity period if any',
        'Active or expired status',
      ],
    },
    {
      id: 8,
      icon: 'ri-line-chart-line',
      title: 'Reporting and dashboard',
      items: [
        'By individual, class, course',
        'By instructor, department, unit',
        'By competency group and period',
        'Completion status',
        'Export within granted scope',
      ],
    },
  ],
};

/* ---------- AI section ---------- */
export const ptLmsAi: Localized<PtLmsSectionText> = {
  vi: {
    title: 'Trí tuệ nhân tạo trong PT-LMS',
    description:
      'AI được định hướng như một lớp hỗ trợ, không thay thế vai trò của giảng viên, chuyên gia và người quản lý.',
  },
  en: {
    title: 'Artificial intelligence in PT-LMS',
    description:
      'AI is positioned as a supporting layer, not a replacement for instructors, experts and managers.',
  },
};

export const ptLmsAiCapabilities: Localized<string[]> = {
  vi: [
    'Gợi ý cấu trúc khóa học',
    'Tóm tắt tài liệu',
    'Gợi ý câu hỏi ôn tập',
    'Tạo bản nháp bài kiểm tra',
    'Đề xuất nội dung theo mục tiêu học tập',
    'Hỗ trợ tìm kiếm trong kho tri thức',
    'Giải đáp câu hỏi dựa trên tài liệu được phê duyệt',
    'Phân tích xu hướng học tập',
    'Phát hiện điểm người học thường gặp khó khăn',
    'Gợi ý lộ trình học tiếp theo',
    'Hỗ trợ biên tập và chuẩn hóa nội dung',
  ],
  en: [
    'Suggest course structure',
    'Summarize documents',
    'Suggest review questions',
    'Draft quizzes',
    'Recommend content by learning objective',
    'Assist search in the knowledge base',
    'Answer questions from approved materials',
    'Analyze learning trends',
    'Detect common learner difficulties',
    'Suggest next learning paths',
    'Assist editing and content standardization',
  ],
};

export const ptLmsAiPrinciples: Localized<string[]> = {
  vi: [
    'Được nhận diện rõ',
    'Có khả năng kiểm chứng',
    'Được con người rà soát',
    'Không dùng dữ liệu cá nhân ngoài phạm vi cho phép',
    'Không tự động quyết định gây bất lợi cho người học',
    'Không thay thế đánh giá chuyên môn trong ngành có điều kiện',
  ],
  en: [
    'Clearly identified',
    'Verifiable',
    'Human-reviewed',
    'No personal data beyond permitted scope',
    'No automatic decisions that harm learners',
    'Does not replace professional judgment in regulated fields',
  ],
};

/* ---------- Roles ---------- */
export const ptLmsRolesTitle: Localized<PtLmsSectionText> = {
  vi: {
    title: 'Trải nghiệm theo từng vai trò',
    description:
      'Mỗi vai trò có một giao diện và bộ công cụ được tối ưu cho công việc của họ.',
  },
  en: {
    title: 'Role-based experiences',
    description:
      'Each role gets an interface and toolset optimized for their work.',
  },
};

export interface PtLmsRole {
  id: number;
  icon: string;
  title: string;
  items: string[];
}

export const ptLmsRoles: Localized<PtLmsRole[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-graduation-cap-line',
      title: 'Người học',
      items: [
        'Biết ngay hôm nay cần học gì',
        'Nội dung nào sắp hết hạn',
        'Tiến độ hiện tại',
        'Bài tập cần hoàn thành',
        'Kết quả và phản hồi',
        'Lộ trình tiếp theo',
      ],
    },
    {
      id: 2,
      icon: 'ri-user-star-line',
      title: 'Giảng viên',
      items: [
        'Quản lý lớp',
        'Cập nhật nội dung',
        'Theo dõi tiến độ',
        'Chấm bài và phản hồi',
        'Gửi thông báo',
        'Phát hiện học viên cần hỗ trợ',
      ],
    },
    {
      id: 3,
      icon: 'ri-settings-3-line',
      title: 'Quản lý đào tạo',
      items: [
        'Xây dựng chương trình',
        'Tổ chức lớp',
        'Quản lý người dùng',
        'Kiểm soát chất lượng nội dung',
        'Tổng hợp dữ liệu',
        'Báo cáo cho lãnh đạo',
      ],
    },
    {
      id: 4,
      icon: 'ri-pie-chart-line',
      title: 'Lãnh đạo',
      items: [
        'Tình hình triển khai',
        'Mức độ tham gia',
        'Trạng thái hoàn thành',
        'Khoảng cách năng lực',
        'Chương trình cần cải thiện',
        'Phân bổ nguồn lực',
      ],
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-graduation-cap-line',
      title: 'Learner',
      items: [
        'Know what to learn today',
        'Which content expires soon',
        'Current progress',
        'Assignments to complete',
        'Results and feedback',
        'Next pathway',
      ],
    },
    {
      id: 2,
      icon: 'ri-user-star-line',
      title: 'Instructor',
      items: [
        'Manage classes',
        'Update content',
        'Track progress',
        'Grade and give feedback',
        'Send notifications',
        'Spot learners needing help',
      ],
    },
    {
      id: 3,
      icon: 'ri-settings-3-line',
      title: 'Training manager',
      items: [
        'Build programs',
        'Organize classes',
        'Manage users',
        'Control content quality',
        'Consolidate data',
        'Report to leadership',
      ],
    },
    {
      id: 4,
      icon: 'ri-pie-chart-line',
      title: 'Leadership',
      items: [
        'Deployment status',
        'Participation level',
        'Completion status',
        'Capability gaps',
        'Programs to improve',
        'Resource allocation',
      ],
    },
  ],
};

/* ---------- Integration ---------- */
export const ptLmsIntegration: Localized<PtLmsSectionText> = {
  vi: {
    title: 'Khả năng tích hợp',
    description:
      'PT-LMS hướng tới khả năng kết nối với hệ sinh thái số của tổ chức.',
  },
  en: {
    title: 'Integration capabilities',
    description:
      'PT-LMS aims to connect with the digital ecosystem of the organization.',
  },
};

export const ptLmsIntegrations: Localized<string[]> = {
  vi: [
    'Hệ thống quản trị nhân sự',
    'Cổng thông tin nội bộ',
    'Microsoft 365 hoặc Google Workspace',
    'Công cụ họp trực tuyến',
    'Hệ thống đăng nhập tập trung',
    'Kho lưu trữ tài liệu',
    'CRM hoặc ERP',
    'Hệ thống thanh toán khi phù hợp',
    'Email và SMS',
    'Công cụ phân tích dữ liệu',
    'API cho các ứng dụng được cấp quyền',
  ],
  en: [
    'HR management system',
    'Internal portal',
    'Microsoft 365 or Google Workspace',
    'Online meeting tools',
    'Centralized sign-on',
    'Document storage',
    'CRM or ERP',
    'Payment systems when appropriate',
    'Email and SMS',
    'Data analytics tools',
    'APIs for authorized applications',
  ],
};

/* ---------- Deployment models ---------- */
export const ptLmsModelsTitle: Localized<PtLmsSectionText> = {
  vi: {
    title: 'Mô hình triển khai linh hoạt',
    description:
      'Tùy nhu cầu và yêu cầu bảo mật, PT-LMS có thể được định hướng theo các mô hình khác nhau.',
  },
  en: {
    title: 'Flexible deployment models',
    description:
      'Depending on needs and security requirements, PT-LMS can be delivered through different models.',
  },
};

export interface PtLmsModel {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const ptLmsModels: Localized<PtLmsModel[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-cloud-line',
      title: 'Dịch vụ nền tảng',
      description:
        'Phù hợp với tổ chức muốn triển khai nhanh, giảm công việc quản trị hạ tầng và cập nhật hệ thống tập trung.',
    },
    {
      id: 2,
      icon: 'ri-building-line',
      title: 'Hệ thống riêng cho tổ chức',
      description:
        'Phù hợp với đơn vị cần nhận diện riêng, cấu hình chuyên biệt, tích hợp sâu hoặc quy trình phân quyền phức tạp.',
    },
    {
      id: 3,
      icon: 'ri-server-line',
      title: 'Triển khai tại hạ tầng của khách hàng',
      description:
        'Có thể xem xét khi tổ chức có yêu cầu cao về vị trí lưu trữ dữ liệu, kiểm soát hạ tầng và vận hành nội bộ.',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-cloud-line',
      title: 'Platform service',
      description:
        'For organizations wanting fast deployment, less infrastructure management and centralized updates.',
    },
    {
      id: 2,
      icon: 'ri-building-line',
      title: 'Dedicated system',
      description:
        'For units needing a custom identity, specialized configuration, deep integration or complex access control.',
    },
    {
      id: 3,
      icon: 'ri-server-line',
      title: 'On-premise deployment',
      description:
        'Considered when the organization has high requirements on data location, infrastructure control and internal operations.',
    },
  ],
};

/* ---------- Roadmap ---------- */
export const ptLmsRoadmapTitle: Localized<PtLmsSectionText> = {
  vi: {
    title: 'Lộ trình triển khai đề xuất',
    description:
      'Một lộ trình rõ ràng giúp tổ chức triển khai PT-LMS bài bản và kiểm soát được rủi ro.',
  },
  en: {
    title: 'Proposed deployment roadmap',
    description:
      'A clear roadmap helps organizations implement PT-LMS systematically and manage risk.',
  },
};

export interface PtLmsPhase {
  id: number;
  title: string;
  items: string[];
}

export const ptLmsRoadmap: Localized<PtLmsPhase[]> = {
  vi: [
    {
      id: 1,
      title: 'Khảo sát',
      items: [
        'Xác định mục tiêu',
        'Phân tích người dùng',
        'Rà soát quy trình hiện tại',
        'Xác định dữ liệu',
        'Đánh giá hạ tầng',
        'Xác định yêu cầu bảo mật và pháp lý',
      ],
    },
    {
      id: 2,
      title: 'Thiết kế',
      items: [
        'Xây dựng mô hình tổ chức',
        'Thiết kế vai trò và phân quyền',
        'Chuẩn hóa danh mục khóa học',
        'Xác định khung năng lực',
        'Thiết kế báo cáo',
        'Lập kế hoạch tích hợp',
      ],
    },
    {
      id: 3,
      title: 'Cấu hình và chuyển đổi dữ liệu',
      items: [
        'Cấu hình hệ thống',
        'Xây dựng nhận diện',
        'Tạo người dùng',
        'Nhập khóa học và nội dung',
        'Chuyển đổi dữ liệu phù hợp',
        'Kiểm tra quyền truy cập',
      ],
    },
    {
      id: 4,
      title: 'Thử nghiệm',
      items: [
        'Triển khai với nhóm giới hạn',
        'Ghi nhận phản hồi',
        'Kiểm tra hiệu năng',
        'Kiểm tra bảo mật',
        'Điều chỉnh quy trình',
        'Hoàn thiện tài liệu sử dụng',
      ],
    },
    {
      id: 5,
      title: 'Vận hành',
      items: [
        'Mở rộng người dùng',
        'Đào tạo quản trị viên',
        'Hỗ trợ giảng viên',
        'Theo dõi hoạt động',
        'Xử lý sự cố',
        'Đánh giá sau triển khai',
      ],
    },
    {
      id: 6,
      title: 'Cải tiến',
      items: [
        'Phân tích dữ liệu sử dụng',
        'Cập nhật nội dung',
        'Tối ưu trải nghiệm',
        'Bổ sung tích hợp',
        'Cải thiện báo cáo',
        'Phát triển tính năng theo nhu cầu',
      ],
    },
  ],
  en: [
    {
      id: 1,
      title: 'Survey',
      items: [
        'Define goals',
        'Analyze users',
        'Review current processes',
        'Identify data',
        'Assess infrastructure',
        'Define security and legal requirements',
      ],
    },
    {
      id: 2,
      title: 'Design',
      items: [
        'Build the organization model',
        'Design roles and permissions',
        'Standardize course catalog',
        'Define competency framework',
        'Design reports',
        'Plan integrations',
      ],
    },
    {
      id: 3,
      title: 'Configuration & data migration',
      items: [
        'Configure the system',
        'Build identity',
        'Create users',
        'Import courses and content',
        'Migrate suitable data',
        'Check access rights',
      ],
    },
    {
      id: 4,
      title: 'Testing',
      items: [
        'Run with a limited group',
        'Collect feedback',
        'Test performance',
        'Test security',
        'Adjust processes',
        'Finalize documentation',
      ],
    },
    {
      id: 5,
      title: 'Operation',
      items: [
        'Expand users',
        'Train administrators',
        'Support instructors',
        'Monitor activity',
        'Handle incidents',
        'Post-deployment review',
      ],
    },
    {
      id: 6,
      title: 'Improvement',
      items: [
        'Analyze usage data',
        'Update content',
        'Optimize experience',
        'Add integrations',
        'Improve reports',
        'Develop features on demand',
      ],
    },
  ],
};

/* ---------- Audience ---------- */
export const ptLmsAudienceTitle: Localized<PtLmsSectionText> = {
  vi: {
    title: 'PT-LMS phù hợp với ai?',
    description: 'PT-LMS hướng tới nhiều nhóm tổ chức có nhu cầu quản lý đào tạo.',
  },
  en: {
    title: 'Who is PT-LMS for?',
    description: 'PT-LMS targets many organization types with training management needs.',
  },
};

export const ptLmsAudience: Localized<string[]> = {
  vi: [
    'Doanh nghiệp cần đào tạo nhân sự nội bộ',
    'Tập đoàn có nhiều đơn vị hoặc chi nhánh',
    'Cơ sở giáo dục và đào tạo',
    'Trung tâm đào tạo nghề',
    'Tổ chức chuyên môn',
    'Đơn vị tổ chức chương trình cộng đồng',
    'Doanh nghiệp cần đào tạo khách hàng hoặc đối tác',
    'Đơn vị cần quản lý đào tạo bắt buộc',
    'Tổ chức muốn xây dựng học viện nội bộ',
    'Chuyên gia hoặc đơn vị phát triển khóa học trực tuyến',
  ],
  en: [
    'Businesses needing internal staff training',
    'Corporations with many units or branches',
    'Educational and training institutions',
    'Vocational training centers',
    'Professional organizations',
    'Community program organizers',
    'Businesses training customers or partners',
    'Units needing mandatory training management',
    'Organizations building an internal academy',
    'Experts or units developing online courses',
  ],
};

/* ---------- Values ---------- */
export const ptLmsValuesTitle: Localized<PtLmsSectionText> = {
  vi: {
    title: 'Giá trị PT-LMS hướng tới',
    description: 'Giá trị được tạo ra cho từng nhóm tham gia trong hệ thống.',
  },
  en: {
    title: 'The value PT-LMS delivers',
    description: 'Value created for each group participating in the system.',
  },
};

export interface PtLmsValueGroup {
  id: number;
  icon: string;
  title: string;
  items: string[];
}

export const ptLmsValues: Localized<PtLmsValueGroup[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-graduation-cap-line',
      title: 'Với người học',
      items: [
        'Tiếp cận nội dung thuận tiện',
        'Biết rõ lộ trình và tiến độ',
        'Nhận phản hồi kịp thời',
        'Học tập linh hoạt',
        'Phát triển năng lực có định hướng',
      ],
    },
    {
      id: 2,
      icon: 'ri-user-star-line',
      title: 'Với giảng viên',
      items: [
        'Giảm công việc hành chính',
        'Quản lý lớp tập trung',
        'Theo dõi người học thuận tiện',
        'Tái sử dụng nội dung',
        'Cải thiện chương trình dựa trên dữ liệu',
      ],
    },
    {
      id: 3,
      icon: 'ri-building-4-line',
      title: 'Với tổ chức',
      items: [
        'Chuẩn hóa hoạt động đào tạo',
        'Tập trung dữ liệu',
        'Theo dõi trạng thái thực hiện',
        'Quản lý nội dung và phân quyền',
        'Kết nối đào tạo với năng lực',
        'Hỗ trợ quyết định quản trị',
        'Xây dựng văn hóa học tập lâu dài',
      ],
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-graduation-cap-line',
      title: 'For learners',
      items: [
        'Convenient access to content',
        'Clear pathway and progress',
        'Timely feedback',
        'Flexible learning',
        'Directional competency development',
      ],
    },
    {
      id: 2,
      icon: 'ri-user-star-line',
      title: 'For instructors',
      items: [
        'Less administrative work',
        'Centralized class management',
        'Convenient learner tracking',
        'Content reuse',
        'Data-driven program improvement',
      ],
    },
    {
      id: 3,
      icon: 'ri-building-4-line',
      title: 'For organizations',
      items: [
        'Standardized training operations',
        'Centralized data',
        'Execution status tracking',
        'Content and access management',
        'Connecting training to competency',
        'Supporting governance decisions',
        'Building a lasting learning culture',
      ],
    },
  ],
};

/* ---------- Philosophy ---------- */
export const ptLmsPhilosophyTitle: Localized<PtLmsSectionText> = {
  vi: {
    title: 'Một nền tảng tốt không thay thế chiến lược đào tạo',
    description:
      'Công nghệ chỉ tạo ra giá trị khi đặt trong một hệ thống có mục tiêu rõ ràng, nội dung chất lượng và cơ chế đánh giá phù hợp.',
  },
  en: {
    title: 'A good platform does not replace a training strategy',
    description:
      'Technology only creates value when placed in a system with clear goals, quality content and appropriate evaluation.',
  },
};

export interface PtLmsPhilosophyItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const ptLmsPhilosophy: Localized<PtLmsPhilosophyItem[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-computer-line',
      title: 'Nền tảng công nghệ',
      description: 'Quản lý hoạt động học tập tập trung.',
    },
    {
      id: 2,
      icon: 'ri-git-branch-line',
      title: 'Mô hình vận hành',
      description: 'Chuẩn hóa vai trò, quy trình và dữ liệu.',
    },
    {
      id: 3,
      icon: 'ri-user-follow-line',
      title: 'Phát triển năng lực',
      description: 'Gắn chương trình với yêu cầu thực tế.',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-computer-line',
      title: 'Technology platform',
      description: 'Centralized learning activity management.',
    },
    {
      id: 2,
      icon: 'ri-git-branch-line',
      title: 'Operating model',
      description: 'Standardized roles, processes and data.',
    },
    {
      id: 3,
      icon: 'ri-user-follow-line',
      title: 'Competency development',
      description: 'Linking programs to real requirements.',
    },
  ],
};

/* ---------- CTA / contact ---------- */
export const ptLmsCta: Localized<{
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
    title: 'Cùng xây dựng hệ sinh thái học tập của riêng tổ chức',
    description:
      'Mỗi doanh nghiệp và cơ sở đào tạo có mục tiêu, đối tượng, nội dung và quy trình riêng. PT-LMS được định hướng như một nền tảng có khả năng cấu hình, tích hợp và phát triển theo nhu cầu thực tế.',
    primaryCta: 'Yêu cầu trình diễn PT-LMS',
    secondaryCta: 'Đăng ký tư vấn',
    tertiaryCta: 'Gửi đề xuất hợp tác',
    contactTitle: 'Thông tin liên hệ',
    company: 'Công ty Cổ phần Đầu tư và Công nghệ Phúc Thành Holding',
    phone: '0343 089 666',
    email: 'phucthanhholding@gmail.com',
    workingHours: '08:00–17:00, tất cả các ngày trong tuần',
    address: 'Số 424 Đường Mê Linh, Phường Vĩnh Phúc, Tỉnh Phú Thọ, Việt Nam',
  },
  en: {
    title: 'Build your own learning ecosystem together',
    description:
      'Every business and training institution has its own goals, audience, content and processes. PT-LMS is positioned as a configurable, integrable platform that evolves with real needs.',
    primaryCta: 'Request a PT-LMS demo',
    secondaryCta: 'Register for consulting',
    tertiaryCta: 'Send a cooperation proposal',
    contactTitle: 'Contact information',
    company: 'Phuc Thanh Holding Investment and Technology Joint Stock Company',
    phone: '0343 089 666',
    email: 'phucthanhholding@gmail.com',
    workingHours: '08:00–17:00, every day of the week',
    address: '424 Me Linh Street, Vinh Phuc Ward, Phu Tho Province, Vietnam',
  },
};