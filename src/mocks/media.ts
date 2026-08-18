import type { Localized } from '@/lib/lang';

export interface MediaFlowItem {
  id: number;
  label: string;
}

export const mediaFlow: Localized<MediaFlowItem[]> = {
  vi: [
    { id: 1, label: 'Chiến lược' },
    { id: 2, label: 'Nội dung' },
    { id: 3, label: 'Nền tảng' },
    { id: 4, label: 'Tương tác' },
    { id: 5, label: 'Dữ liệu' },
    { id: 6, label: 'Cải tiến' },
  ],
  en: [
    { id: 1, label: 'Strategy' },
    { id: 2, label: 'Content' },
    { id: 3, label: 'Platforms' },
    { id: 4, label: 'Engagement' },
    { id: 5, label: 'Data' },
    { id: 6, label: 'Improvement' },
  ],
};

export interface MediaProblem {
  id: number;
  label: string;
}

export const mediaProblems: Localized<MediaProblem[]> = {
  vi: [
    { id: 1, label: 'Nội dung được đăng không theo định hướng chung.' },
    { id: 2, label: 'Hình ảnh thương hiệu thiếu nhất quán.' },
    { id: 3, label: 'Chưa xác định rõ khách hàng mục tiêu.' },
    { id: 4, label: 'Thông điệp thay đổi giữa các nền tảng.' },
    { id: 5, label: 'Website và mạng xã hội hoạt động rời rạc.' },
    { id: 6, label: 'Không có lịch biên tập và quy trình phê duyệt.' },
    { id: 7, label: 'Phản hồi khách hàng thiếu thống nhất.' },
    { id: 8, label: 'Khó đánh giá nội dung nào tạo ra giá trị.' },
    { id: 9, label: 'Sử dụng AI nhưng chưa kiểm chứng thông tin.' },
    { id: 10, label: 'Nội dung phụ thuộc vào một vài cá nhân.' },
    { id: 11, label: 'Thiếu phương án xử lý rủi ro truyền thông.' },
  ],
  en: [
    { id: 1, label: 'Content is posted without a common direction.' },
    { id: 2, label: 'The brand image lacks consistency.' },
    { id: 3, label: 'Target customers are not clearly defined.' },
    { id: 4, label: 'The message changes across platforms.' },
    { id: 5, label: 'The website and social media operate in isolation.' },
    { id: 6, label: 'There is no editorial calendar or approval process.' },
    { id: 7, label: 'Customer responses lack consistency.' },
    { id: 8, label: 'It is hard to assess which content creates value.' },
    { id: 9, label: 'AI is used without verifying the information.' },
    { id: 10, label: 'Content depends on a few individuals.' },
    { id: 11, label: 'There is no plan to handle media risks.' },
  ],
};

export interface MediaPillarGroup {
  label: string;
  items: string[];
  numbered?: boolean;
}

export interface MediaPillar {
  id: number;
  icon: string;
  title: string;
  lead: string;
  groups: MediaPillarGroup[];
  note?: string;
}

export const mediaPillars: Localized<MediaPillar[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-compass-3-line',
      title: 'Chiến lược truyền thông',
      lead: 'Chiến lược giúp doanh nghiệp trả lời:',
      groups: [
        {
          label: 'Chiến lược giúp doanh nghiệp trả lời:',
          items: [
            'Thương hiệu muốn được ghi nhớ như thế nào?',
            'Khách hàng thực sự quan tâm điều gì?',
            'Thông điệp nào cần được truyền tải?',
            'Nền tảng nào nên được ưu tiên?',
            'Nội dung nào phù hợp với từng giai đoạn?',
            'Kết quả được đánh giá bằng chỉ tiêu nào?',
          ],
        },
        {
          label: 'Phạm vi tư vấn có thể gồm:',
          items: [
            'Khảo sát hiện trạng.',
            'Phân tích khách hàng.',
            'Xác định định vị.',
            'Xây dựng hệ thống thông điệp.',
            'Thiết lập giọng văn thương hiệu.',
            'Xây dựng trụ cột nội dung.',
            'Lựa chọn nền tảng.',
            'Lập kế hoạch truyền thông.',
            'Xác định chỉ tiêu đo lường.',
            'Xây dựng quy trình phê duyệt.',
          ],
        },
      ],
    },
    {
      id: 2,
      icon: 'ri-file-text-line',
      title: 'Xây dựng nội dung số',
      lead: 'Nội dung được phát triển dựa trên thông tin thật, nhu cầu của khách hàng và mục tiêu của doanh nghiệp.',
      groups: [
        {
          label: 'Các định dạng có thể gồm:',
          items: [
            'Bài viết website.',
            'Nội dung mạng xã hội.',
            'Bài giới thiệu sản phẩm và dịch vụ.',
            'Bài viết chuyên môn.',
            'Hình ảnh và infographic.',
            'Kịch bản video.',
            'Video ngắn.',
            'Video giới thiệu doanh nghiệp.',
            'Hồ sơ năng lực.',
            'Catalogue điện tử.',
            'Email và bản tin.',
            'Nội dung tuyển dụng.',
            'Nội dung đào tạo.',
            'Nội dung truyền thông nội bộ.',
            'Nội dung sự kiện và cộng đồng.',
          ],
        },
        {
          label: 'Mỗi nội dung cần xác định rõ:',
          numbered: true,
          items: [
            'Dành cho ai?',
            'Giải quyết nhu cầu gì?',
            'Truyền tải thông điệp nào?',
            'Được phân phối trên kênh nào?',
            'Muốn người xem thực hiện hành động gì?',
          ],
        },
      ],
    },
    {
      id: 3,
      icon: 'ri-global-line',
      title: 'Quản trị nền tảng số',
      lead: 'Phúc Thành Holding hướng tới hỗ trợ quản trị:',
      groups: [
        {
          label: 'Các nền tảng:',
          items: [
            'Website.',
            'Facebook.',
            'YouTube.',
            'TikTok.',
            'LinkedIn.',
            'Zalo.',
            'Email và bản tin.',
            'Kho tài sản truyền thông.',
          ],
        },
        {
          label: 'Phạm vi công việc có thể gồm:',
          items: [
            'Chuẩn hóa thông tin tài khoản.',
            'Lập lịch nội dung.',
            'Biên tập bài viết.',
            'Thiết kế hình ảnh.',
            'Sản xuất video.',
            'Đăng tải.',
            'Theo dõi bình luận và tin nhắn.',
            'Xây dựng bộ câu trả lời.',
            'Chuyển yêu cầu đến đúng bộ phận.',
            'Tổng hợp và báo cáo kết quả.',
            'Quản lý quyền truy cập và bảo mật tài khoản.',
          ],
        },
      ],
      note: 'Doanh nghiệp chỉ nên triển khai những nền tảng có mục tiêu rõ ràng và đủ nguồn lực duy trì.',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-compass-3-line',
      title: 'Communication Strategy',
      lead: 'The strategy helps the business answer:',
      groups: [
        {
          label: 'The strategy helps the business answer:',
          items: [
            'How does the brand want to be remembered?',
            'What do customers truly care about?',
            'Which message needs to be conveyed?',
            'Which platforms should be prioritized?',
            'Which content fits each stage?',
            'By which metrics will results be evaluated?',
          ],
        },
        {
          label: 'The consulting scope may include:',
          items: [
            'Current state survey.',
            'Customer analysis.',
            'Positioning definition.',
            'Building a message system.',
            'Setting the brand tone of voice.',
            'Building content pillars.',
            'Platform selection.',
            'Communication planning.',
            'Defining measurement metrics.',
            'Building an approval process.',
          ],
        },
      ],
    },
    {
      id: 2,
      icon: 'ri-file-text-line',
      title: 'Digital Content Creation',
      lead: 'Content is developed based on real information, customer needs and business goals.',
      groups: [
        {
          label: 'Possible formats include:',
          items: [
            'Website articles.',
            'Social media content.',
            'Product and service introductions.',
            'Expert articles.',
            'Images and infographics.',
            'Video scripts.',
            'Short videos.',
            'Corporate introduction videos.',
            'Capability profiles.',
            'Digital catalogues.',
            'Email and newsletters.',
            'Recruitment content.',
            'Training content.',
            'Internal communication content.',
            'Event and community content.',
          ],
        },
        {
          label: 'Each piece of content should clearly define:',
          numbered: true,
          items: [
            'Who is it for?',
            'What need does it solve?',
            'What message does it convey?',
            'On which channel is it distributed?',
            'What action do you want viewers to take?',
          ],
        },
      ],
    },
    {
      id: 3,
      icon: 'ri-global-line',
      title: 'Digital Platform Management',
      lead: 'Phuc Thanh Holding aims to support the management of:',
      groups: [
        {
          label: 'The platforms:',
          items: [
            'Website.',
            'Facebook.',
            'YouTube.',
            'TikTok.',
            'LinkedIn.',
            'Zalo.',
            'Email and newsletters.',
            'Media asset library.',
          ],
        },
        {
          label: 'The scope of work may include:',
          items: [
            'Standardizing account information.',
            'Creating content schedules.',
            'Editing articles.',
            'Designing images.',
            'Producing videos.',
            'Publishing.',
            'Monitoring comments and messages.',
            'Building response scripts.',
            'Routing requests to the right department.',
            'Summarizing and reporting results.',
            'Managing access rights and account security.',
          ],
        },
      ],
      note: 'Businesses should only deploy platforms with clear goals and enough resources to maintain.',
    },
  ],
};

export interface MediaSolutionGroup {
  id: number;
  icon: string;
  title: string;
  items: string[];
}

export const mediaSolutionGroups: Localized<MediaSolutionGroup[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-palette-line',
      title: 'Xây dựng nền tảng thương hiệu số',
      items: [
        'Định hướng hình ảnh thương hiệu.',
        'Hệ thống thông điệp.',
        'Giọng văn.',
        'Quy chuẩn nội dung.',
        'Mẫu bài viết.',
        'Mẫu hình ảnh.',
        'Bộ giới thiệu doanh nghiệp.',
        'Hướng dẫn sử dụng nhận diện trên môi trường số.',
      ],
    },
    {
      id: 2,
      icon: 'ri-stack-line',
      title: 'Xây dựng hệ thống nội dung dài hạn',
      items: [
        'Nghiên cứu chủ đề.',
        'Xây dựng trụ cột nội dung.',
        'Lập lịch biên tập.',
        'Phân bổ theo hành trình khách hàng.',
        'Sản xuất đa định dạng.',
        'Tái sử dụng nội dung.',
        'Quản lý phiên bản.',
        'Lưu trữ tài sản số.',
      ],
    },
    {
      id: 3,
      icon: 'ri-settings-4-line',
      title: 'Quản trị mạng xã hội',
      items: [
        'Thiết lập kênh.',
        'Xây dựng lịch đăng.',
        'Biên tập nội dung.',
        'Thiết kế hình ảnh.',
        'Sản xuất video ngắn.',
        'Quản lý tương tác.',
        'Theo dõi phản hồi.',
        'Báo cáo định kỳ.',
      ],
    },
    {
      id: 4,
      icon: 'ri-megaphone-line',
      title: 'Truyền thông sản phẩm và dịch vụ',
      items: [
        'Xác định giá trị sản phẩm.',
        'Nghiên cứu nhóm khách hàng.',
        'Xây dựng thông điệp.',
        'Thiết kế trang giới thiệu.',
        'Phát triển nội dung.',
        'Xây dựng câu hỏi thường gặp.',
        'Lập kế hoạch ra mắt.',
        'Theo dõi phản hồi thị trường.',
      ],
    },
    {
      id: 5,
      icon: 'ri-calendar-event-line',
      title: 'Truyền thông sự kiện',
      items: [
        'Chủ đề và thông điệp.',
        'Nhận diện sự kiện.',
        'Kế hoạch nội dung.',
        'Trang đăng ký.',
        'Hình ảnh và video.',
        'Cập nhật trong sự kiện.',
        'Nội dung tổng kết.',
        'Báo cáo kết quả.',
      ],
    },
    {
      id: 6,
      icon: 'ri-heart-2-line',
      title: 'Truyền thông cộng đồng',
      items: [
        'Truyền tải mục tiêu chương trình.',
        'Kể câu chuyện có trách nhiệm.',
        'Bảo vệ hình ảnh người tham gia.',
        'Công khai thông tin phù hợp.',
        'Báo cáo kết quả đã xác minh.',
        'Kết nối tổ chức với cộng đồng.',
      ],
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-palette-line',
      title: 'Building a Digital Brand Foundation',
      items: [
        'Brand image direction.',
        'Message system.',
        'Tone of voice.',
        'Content standards.',
        'Article templates.',
        'Image templates.',
        'Corporate introduction kit.',
        'Guidelines for using brand identity in the digital environment.',
      ],
    },
    {
      id: 2,
      icon: 'ri-stack-line',
      title: 'Building a Long-term Content System',
      items: [
        'Topic research.',
        'Building content pillars.',
        'Creating an editorial calendar.',
        'Distributing across the customer journey.',
        'Multi-format production.',
        'Content repurposing.',
        'Version management.',
        'Digital asset storage.',
      ],
    },
    {
      id: 3,
      icon: 'ri-settings-4-line',
      title: 'Social Media Management',
      items: [
        'Channel setup.',
        'Building a posting schedule.',
        'Content editing.',
        'Image design.',
        'Short video production.',
        'Engagement management.',
        'Feedback monitoring.',
        'Periodic reporting.',
      ],
    },
    {
      id: 4,
      icon: 'ri-megaphone-line',
      title: 'Product & Service Communication',
      items: [
        'Defining product value.',
        'Researching customer groups.',
        'Building the message.',
        'Designing the introduction page.',
        'Developing content.',
        'Building FAQs.',
        'Planning the launch.',
        'Monitoring market feedback.',
      ],
    },
    {
      id: 5,
      icon: 'ri-calendar-event-line',
      title: 'Event Communication',
      items: [
        'Theme and message.',
        'Event identity.',
        'Content plan.',
        'Registration page.',
        'Images and videos.',
        'Updates during the event.',
        'Summary content.',
        'Result reporting.',
      ],
    },
    {
      id: 6,
      icon: 'ri-heart-2-line',
      title: 'Community Communication',
      items: [
        'Conveying program goals.',
        'Telling responsible stories.',
        'Protecting the image of participants.',
        'Disclosing appropriate information.',
        'Reporting verified results.',
        'Connecting organizations with the community.',
      ],
    },
  ],
};

export interface MediaAiItem {
  id: number;
  label: string;
}

export const mediaAiCan: Localized<MediaAiItem[]> = {
  vi: [
    { id: 1, label: 'Nghiên cứu chủ đề.' },
    { id: 2, label: 'Tổng hợp tài liệu.' },
    { id: 3, label: 'Gợi ý ý tưởng.' },
    { id: 4, label: 'Xây dựng dàn ý.' },
    { id: 5, label: 'Soạn bản nháp.' },
    { id: 6, label: 'Phát triển nhiều phiên bản nội dung.' },
    { id: 7, label: 'Tạo phụ đề.' },
    { id: 8, label: 'Phân loại phản hồi.' },
    { id: 9, label: 'Phân tích xu hướng.' },
  ],
  en: [
    { id: 1, label: 'Topic research.' },
    { id: 2, label: 'Document summarization.' },
    { id: 3, label: 'Idea suggestions.' },
    { id: 4, label: 'Outline building.' },
    { id: 5, label: 'Draft writing.' },
    { id: 6, label: 'Developing multiple content versions.' },
    { id: 7, label: 'Subtitle generation.' },
    { id: 8, label: 'Feedback classification.' },
    { id: 9, label: 'Trend analysis.' },
  ],
};

export const mediaAiMust: Localized<MediaAiItem[]> = {
  vi: [
    { id: 1, label: 'Kiểm chứng thông tin.' },
    { id: 2, label: 'Rà soát ngữ cảnh.' },
    { id: 3, label: 'Kiểm tra bản quyền.' },
    { id: 4, label: 'Bảo vệ dữ liệu.' },
    { id: 5, label: 'Loại bỏ nội dung sai lệch.' },
    { id: 6, label: 'Phê duyệt trước khi công bố.' },
    { id: 7, label: 'Chịu trách nhiệm về nội dung cuối cùng.' },
  ],
  en: [
    { id: 1, label: 'Verify information.' },
    { id: 2, label: 'Review the context.' },
    { id: 3, label: 'Check copyright.' },
    { id: 4, label: 'Protect data.' },
    { id: 5, label: 'Remove misleading content.' },
    { id: 6, label: 'Approve before publishing.' },
    { id: 7, label: 'Take responsibility for the final content.' },
  ],
};

export interface MediaProcessStep {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const mediaProcess: Localized<MediaProcessStep[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-inbox-line',
      title: 'Tiếp nhận mục tiêu',
      description: 'Xác định mục tiêu kinh doanh, nhóm khách hàng, sản phẩm, nền tảng và nguồn lực.',
    },
    {
      id: 2,
      icon: 'ri-search-eye-line',
      title: 'Khảo sát hiện trạng',
      description: 'Đánh giá thương hiệu, nội dung, tài khoản, dữ liệu và quy trình hiện có.',
    },
    {
      id: 3,
      icon: 'ri-compass-3-line',
      title: 'Xây dựng định hướng',
      description: 'Xác định đối tượng, thông điệp, trụ cột nội dung, kênh ưu tiên và chỉ tiêu.',
    },
    {
      id: 4,
      icon: 'ri-calendar-2-line',
      title: 'Lập kế hoạch',
      description: 'Xây dựng lịch nội dung, định dạng, người thực hiện, người phê duyệt và thời hạn.',
    },
    {
      id: 5,
      icon: 'ri-shield-check-line',
      title: 'Sản xuất và kiểm duyệt',
      description: 'Nội dung được biên tập, thiết kế, kiểm chứng và phê duyệt trước khi công bố.',
    },
    {
      id: 6,
      icon: 'ri-rocket-2-line',
      title: 'Phân phối và quản trị',
      description: 'Đăng tải theo kế hoạch, theo dõi tương tác và chuyển yêu cầu tới đúng bộ phận.',
    },
    {
      id: 7,
      icon: 'ri-line-chart-line',
      title: 'Đo lường và cải tiến',
      description: 'Phân tích dữ liệu, ghi nhận phản hồi và điều chỉnh kế hoạch.',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-inbox-line',
      title: 'Receive Goals',
      description: 'Define business goals, customer groups, products, platforms and resources.',
    },
    {
      id: 2,
      icon: 'ri-search-eye-line',
      title: 'Survey the Current State',
      description: 'Assess the existing brand, content, accounts, data and processes.',
    },
    {
      id: 3,
      icon: 'ri-compass-3-line',
      title: 'Build Direction',
      description: 'Define the audience, message, content pillars, priority channels and metrics.',
    },
    {
      id: 4,
      icon: 'ri-calendar-2-line',
      title: 'Planning',
      description: 'Build the content schedule, formats, executors, approvers and deadlines.',
    },
    {
      id: 5,
      icon: 'ri-shield-check-line',
      title: 'Production & Review',
      description: 'Content is edited, designed, verified and approved before publishing.',
    },
    {
      id: 6,
      icon: 'ri-rocket-2-line',
      title: 'Distribution & Management',
      description: 'Publish according to plan, monitor engagement and route requests to the right department.',
    },
    {
      id: 7,
      icon: 'ri-line-chart-line',
      title: 'Measure & Improve',
      description: 'Analyze data, collect feedback and adjust the plan.',
    },
  ],
};

export interface MediaMetric {
  id: number;
  label: string;
}

export const mediaMetrics: Localized<MediaMetric[]> = {
  vi: [
    { id: 1, label: 'Khả năng tiếp cận đúng đối tượng.' },
    { id: 2, label: 'Lượt truy cập website.' },
    { id: 3, label: 'Chất lượng phiên truy cập.' },
    { id: 4, label: 'Tỷ lệ tương tác có ý nghĩa.' },
    { id: 5, label: 'Lượt tải tài liệu.' },
    { id: 6, label: 'Số yêu cầu tư vấn.' },
    { id: 7, label: 'Số lượt đăng ký.' },
    { id: 8, label: 'Chất lượng khách hàng tiềm năng.' },
    { id: 9, label: 'Tỷ lệ chuyển đổi.' },
    { id: 10, label: 'Chi phí trên mỗi kết quả.' },
    { id: 11, label: 'Phản hồi của cộng đồng.' },
    { id: 12, label: 'Mức độ nhất quán của thương hiệu.' },
  ],
  en: [
    { id: 1, label: 'Reaching the right audience.' },
    { id: 2, label: 'Website visits.' },
    { id: 3, label: 'Session quality.' },
    { id: 4, label: 'Meaningful engagement rate.' },
    { id: 5, label: 'Document downloads.' },
    { id: 6, label: 'Number of consultation requests.' },
    { id: 7, label: 'Number of registrations.' },
    { id: 8, label: 'Lead quality.' },
    { id: 9, label: 'Conversion rate.' },
    { id: 10, label: 'Cost per result.' },
    { id: 11, label: 'Community feedback.' },
    { id: 12, label: 'Brand consistency.' },
  ],
};

export interface MediaPrinciple {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const mediaPrinciples: Localized<MediaPrinciple[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-shield-check-line',
      title: 'Chính xác',
      description: 'Thông tin phải có căn cứ và được người phù hợp kiểm tra.',
    },
    {
      id: 2,
      icon: 'ri-quill-pen-line',
      title: 'Nguyên bản',
      description: 'Không sao chép nội dung, hình ảnh hoặc nhận diện của doanh nghiệp khác.',
    },
    {
      id: 3,
      icon: 'ri-star-line',
      title: 'Có giá trị',
      description: 'Ưu tiên nội dung giúp khách hàng hiểu vấn đề và đưa ra quyết định tốt hơn.',
    },
    {
      id: 4,
      icon: 'ri-focus-3-line',
      title: 'Nhất quán',
      description: 'Thông điệp và hình ảnh được duy trì đồng bộ trên các điểm tiếp xúc.',
    },
    {
      id: 5,
      icon: 'ri-heart-2-line',
      title: 'Có trách nhiệm',
      description: 'Tôn trọng quyền riêng tư, bản quyền và những nhóm đối tượng xuất hiện trong nội dung.',
    },
    {
      id: 6,
      icon: 'ri-bar-chart-box-line',
      title: 'Dựa trên dữ liệu',
      description: 'Đo lường để cải tiến, không chạy theo những chỉ số hào nhoáng nhưng thiếu giá trị thực tế.',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-shield-check-line',
      title: 'Accurate',
      description: 'Information must be grounded and checked by the right people.',
    },
    {
      id: 2,
      icon: 'ri-quill-pen-line',
      title: 'Original',
      description: 'Do not copy another business\'s content, images or identity.',
    },
    {
      id: 3,
      icon: 'ri-star-line',
      title: 'Valuable',
      description: 'Prioritize content that helps customers understand problems and make better decisions.',
    },
    {
      id: 4,
      icon: 'ri-focus-3-line',
      title: 'Consistent',
      description: 'Message and imagery are kept consistent across touchpoints.',
    },
    {
      id: 5,
      icon: 'ri-heart-2-line',
      title: 'Responsible',
      description: 'Respect privacy, copyright and the groups featured in the content.',
    },
    {
      id: 6,
      icon: 'ri-bar-chart-box-line',
      title: 'Data-driven',
      description: 'Measure to improve, not to chase flashy metrics with little real value.',
    },
  ],
};

export interface MediaAudience {
  id: number;
  icon: string;
  label: string;
}

export const mediaAudience: Localized<MediaAudience[]> = {
  vi: [
    { id: 1, icon: 'ri-global-line', label: 'Doanh nghiệp cần xây dựng hiện diện số.' },
    { id: 2, icon: 'ri-palette-line', label: 'Tổ chức muốn chuẩn hóa thương hiệu.' },
    { id: 3, icon: 'ri-settings-4-line', label: 'Đơn vị cần quản trị mạng xã hội.' },
    { id: 4, icon: 'ri-team-line', label: 'Doanh nghiệp chưa có đội ngũ nội dung chuyên trách.' },
    { id: 5, icon: 'ri-graduation-cap-line', label: 'Cơ sở đào tạo cần truyền thông chương trình.' },
    { id: 6, icon: 'ri-rocket-2-line', label: 'Dự án cần tiếp cận thị trường.' },
    { id: 7, icon: 'ri-group-line', label: 'Tổ chức cần truyền thông nội bộ.' },
    { id: 8, icon: 'ri-heart-2-line', label: 'Chương trình cộng đồng cần kết nối người tham gia.' },
    { id: 9, icon: 'ri-robot-line', label: 'Doanh nghiệp muốn ứng dụng AI vào quy trình nội dung có kiểm soát.' },
  ],
  en: [
    { id: 1, icon: 'ri-global-line', label: 'Businesses needing to build a digital presence.' },
    { id: 2, icon: 'ri-palette-line', label: 'Organizations wanting to standardize their brand.' },
    { id: 3, icon: 'ri-settings-4-line', label: 'Units needing social media management.' },
    { id: 4, icon: 'ri-team-line', label: 'Businesses without a dedicated content team.' },
    { id: 5, icon: 'ri-graduation-cap-line', label: 'Training institutions needing program communication.' },
    { id: 6, icon: 'ri-rocket-2-line', label: 'Projects needing market access.' },
    { id: 7, icon: 'ri-group-line', label: 'Organizations needing internal communication.' },
    { id: 8, icon: 'ri-heart-2-line', label: 'Community programs needing to connect participants.' },
    { id: 9, icon: 'ri-robot-line', label: 'Businesses wanting to apply AI to a controlled content process.' },
  ],
};

export interface MediaFaqItem {
  id: number;
  question: string;
  answer: string;
}

export const mediaFaq: Localized<MediaFaqItem[]> = {
  vi: [
    {
      id: 1,
      question: 'Phúc Thành Holding có quản trị toàn bộ mạng xã hội không?',
      answer:
        'Phạm vi công việc phụ thuộc nhu cầu, nền tảng, nguồn lực và thỏa thuận giữa các bên. Nội dung cần được xác định rõ trước khi triển khai.',
    },
    {
      id: 2,
      question: 'Doanh nghiệp có được duyệt nội dung trước khi đăng không?',
      answer:
        'Quy trình nên có bước rà soát và phê duyệt, đặc biệt với nội dung pháp lý, chuyên môn, tài chính, y tế hoặc thông tin nhạy cảm.',
    },
    {
      id: 3,
      question: 'Có sử dụng AI để tạo nội dung không?',
      answer:
        'AI có thể hỗ trợ nghiên cứu, hình thành ý tưởng và biên tập. Mọi nội dung vẫn cần được con người kiểm chứng, chịu trách nhiệm và phê duyệt trước khi công bố.',
    },
    {
      id: 4,
      question: 'Có cam kết số lượt xem hoặc doanh số không?',
      answer:
        'Không nên cam kết những kết quả nằm ngoài khả năng kiểm soát. Mục tiêu và chỉ tiêu cần được thống nhất dựa trên hiện trạng, ngân sách và phạm vi triển khai.',
    },
    {
      id: 5,
      question: 'Phúc Thành Holding có nhận sản xuất video không?',
      answer:
        'Phạm vi sản xuất hình ảnh và video cần được xác nhận theo từng dự án, nguồn lực và yêu cầu thực tế.',
    },
  ],
  en: [
    {
      id: 1,
      question: 'Does Phuc Thanh Holding manage all social media?',
      answer:
        'The scope of work depends on needs, platforms, resources and the agreement between parties. Content must be clearly defined before implementation.',
    },
    {
      id: 2,
      question: 'Can the business approve content before publishing?',
      answer:
        'The process should include a review and approval step, especially for legal, professional, financial, medical or sensitive content.',
    },
    {
      id: 3,
      question: 'Is AI used to create content?',
      answer:
        'AI can support research, ideation and editing. All content must still be verified, owned and approved by people before publication.',
    },
    {
      id: 4,
      question: 'Do you guarantee views or sales?',
      answer:
        'Results outside our control should not be guaranteed. Goals and targets should be agreed based on the current state, budget and scope.',
    },
    {
      id: 5,
      question: 'Does Phuc Thanh Holding produce videos?',
      answer:
        'The scope of image and video production is confirmed per project, resources and actual requirements.',
    },
  ],
};