import { createPool } from './db.mjs';

const products = [
  {
    category_id: 'software',
    slug: 'shop',
    title: 'Phúc Thành AI Shop (PT AI Shop)',
    title_en: 'Phuc Thanh AI Shop - Enterprise AI Licensing & Digital Store',
    description: 'Cửa hàng bản quyền số và giải pháp AI chính hãng. Cung cấp tài khoản ChatGPT Plus/Team, Claude Pro, Midjourney, Cursor, API Key và phần mềm tự động hóa với chiết khấu doanh nghiệp và bảo hành 24/7.',
    description_en: 'Official enterprise AI marketplace and software licensing store. Providing genuine ChatGPT Plus/Team, Claude Pro, Midjourney, Cursor, developer API keys with 24/7 technical support.',
    image: '/assets/services/enterprise-software-ai.svg',
    featured: true,
    date: '2026-11-20',
    features: [
      'Bản quyền chính hãng & kích hoạt tự động tức thì 24/7',
      'Hỗ trợ tài khoản cá nhân và gói doanh nghiệp chiết khấu cao',
      'Tích hợp cổng thanh toán VietQR, thẻ nội địa và thẻ quốc tế',
      'Chính sách bảo hành uy tín, kỹ thuật viên hỗ trợ 1-1 trực tiếp'
    ],
    features_en: [
      '100% genuine license keys with instant 24/7 automated delivery',
      'Enterprise volume discounts and flexible billing support',
      'Seamless multi-channel payments including VietQR and cards',
      'Direct 1-on-1 technical support and warranty guarantee'
    ]
  },
  {
    category_id: 'media',
    slug: 'studio',
    title: 'Phúc Thành AI Studio (PT Studio)',
    title_en: 'Phuc Thanh AI Studio - Generative AI Video & Media Factory',
    description: 'Xưởng sản xuất video và sáng tạo nội dung đa phương tiện ứng dụng Generative AI. Chuyển đổi kịch bản thành video chất lượng cao với MC ảo sống động, lồng tiếng truyền cảm và tự động dựng video TikTok/Reels.',
    description_en: 'State-of-the-art Generative AI video creation and digital media studio. Transform text scripts into professional video with hyper-realistic AI avatars, voice cloning, and auto short-form generation.',
    image: '/assets/services/media-digital-content.svg',
    featured: true,
    date: '2026-11-21',
    features: [
      'Sản xuất video tự động từ văn bản (Text-to-Video) độ phân giải 4K',
      'Thư viện MC ảo (AI Avatars) đa dạng ngành nghề và cử chỉ tự nhiên',
      'Nhân bản giọng nói (AI Voice Cloning) và thuyết minh đa ngôn ngữ',
      'Dựng video ngắn hàng loạt cho TikTok, YouTube Shorts và Facebook Reels'
    ],
    features_en: [
      'Automated text-to-video rendering up to 4K resolution',
      'Diverse photorealistic AI avatars and natural body language',
      'Studio-grade voice cloning and multilingual voiceovers',
      'Bulk short-form video batch generator for TikTok and Reels'
    ]
  },
  {
    category_id: 'digital',
    slug: 'n8n',
    title: 'Phúc Thành Automation Engine (n8n Workflows)',
    title_en: 'Phuc Thanh Automation Engine - Enterprise Workflow Orchestration',
    description: 'Nền tảng tự động hóa quy trình nghiệp vụ cấp doanh nghiệp. Kết nối hàng trăm hệ thống (Zalo, Telegram, CRM, ERP, Google Sheets) và nhúng AI Agent thông minh giúp tự động hóa 90% công việc thủ công.',
    description_en: 'Enterprise-grade business process automation platform. Connect hundreds of business applications with intelligent autonomous AI agents to eliminate manual overhead.',
    image: '/assets/services/digital-transformation.svg',
    featured: true,
    date: '2026-11-22',
    features: [
      'Thiết kế quy trình kéo thả trực quan với hơn 400+ cổng kết nối ứng dụng',
      'Tự động tiếp nhận, lọc và chấm điểm khách hàng tiềm năng (Lead Scoring)',
      'Đồng bộ tin nhắn và chăm sóc khách hàng tự động qua Zalo OA & Telegram',
      'Bảo mật dữ liệu on-premise an toàn tuyệt đối trên hạ tầng nội bộ'
    ],
    features_en: [
      'Visual no-code/low-code workflow canvas with 400+ enterprise integrations',
      'Real-time lead intake, qualification, and automated lead scoring',
      'Omnichannel sync with Telegram, Zalo OA, and CRM data pipelines',
      'Self-hosted enterprise security running on private infrastructure'
    ]
  },
  {
    category_id: 'data',
    slug: '9router',
    title: '9Router AI Gateway',
    title_en: '9Router AI Gateway - Unified LLM Router & Inference Hub',
    description: 'Cổng định tuyến và quản trị mô hình AI thông minh. Hợp nhất truy cập OpenAI GPT-4o, Claude 3.5, Gemini 2.0, DeepSeek qua một API chuẩn duy nhất, tự động cân bằng tải và giảm đến 60% chi phí gọi mô hình.',
    description_en: 'High-performance AI Gateway unifying OpenAI, Claude, Gemini, and DeepSeek via a single standard API with smart routing, load balancing, and 60% token cost reduction.',
    image: '/assets/services/data-management-analytics.svg',
    featured: true,
    date: '2026-11-23',
    features: [
      '1 API thống nhất chuẩn OpenAI tương thích mọi mô hình AI hàng đầu',
      'Bộ đệm ngữ nghĩa thông minh (Semantic Caching) tiết kiệm chi phí token',
      'Tự động chuyển đổi dự phòng khi mô hình gặp sự cố (Auto Failover)',
      'Giám sát lưu lượng, độ trễ và kiểm duyệt an toàn nội dung (Prompt Guard)'
    ],
    features_en: [
      'Unified OpenAI-compatible API interface across all frontier LLMs',
      'Semantic caching layer slashing token expenses by up to 60%',
      'Zero-downtime automatic failover and smart model load balancing',
      'Enterprise observability, latency tracking, and prompt safety guardrails'
    ]
  },
  {
    category_id: 'software',
    slug: 'unbounce',
    title: 'Phúc Thành Landing Studio',
    title_en: 'Phuc Thanh Landing Studio - High-Conversion Marketing Page Builder',
    description: 'Nền tảng thiết kế và xuất bản Landing Page bán hàng chuyển đổi cao. Tối ưu tốc độ tải trang dưới 1 giây, chuẩn SEO Google, tích hợp biểu mẫu thu thập dữ liệu tự động đồng bộ về Telegram và CRM.',
    description_en: 'High-converting landing page creation and conversion optimization platform. Sub-second load speeds, mobile-first Apple aesthetic, and instant CRM lead sync.',
    image: '/assets/services/enterprise-software-ai.svg',
    featured: true,
    date: '2026-11-24',
    features: [
      'Dựng trang đích bán hàng kéo thả siêu tốc, chuẩn giao diện Apple Clean',
      'Tối ưu tốc độ tải trang di động đạt 95+ điểm Google PageSpeed',
      'Tích hợp biểu mẫu tự động bắn thông báo về Telegram và bảng điều khiển',
      'Hỗ trợ thử nghiệm A/B Testing tối đa hóa tỷ lệ chuyển đổi đơn hàng'
    ],
    features_en: [
      'Rapid visual page builder crafted with modern Apple Clean aesthetics',
      'Mobile-optimized performance exceeding 95+ Google PageSpeed score',
      'Instant lead capture with live Telegram alerts and database sync',
      'Built-in A/B split testing to maximize sales conversion rates'
    ]
  }
];

const newsArticles = [
  {
    title: 'Ra mắt PT AI Shop: Nền tảng phân phối tài khoản AI & giải pháp số bản quyền chính hãng',
    title_en: 'Introducing PT AI Shop: Official Enterprise AI Software & Licensing Marketplace',
    category: 'Công nghệ',
    category_en: 'Technology',
    excerpt: 'Phúc Thành Holding chính thức đưa vào vận hành shop.phucthanhholding.com, cung cấp giải pháp bản quyền AI cao cấp, thanh toán tự động VietQR và hỗ trợ kỹ thuật 24/7.',
    excerpt_en: 'Phuc Thanh Holding officially launches shop.phucthanhholding.com, delivering enterprise-grade AI software licenses with automated instant activation and 24/7 support.',
    date: '2026-11-20',
    image: '/assets/services/enterprise-software-ai.svg',
    tags: ['AI Shop', 'Bản quyền số', 'ChatGPT Plus', 'Claude Pro', 'Phúc Thành Holding'],
    tags_en: ['AI Shop', 'Digital License', 'ChatGPT Plus', 'Claude Pro', 'Phuc Thanh Holding'],
    content: [
      'Nhằm đáp ứng nhu cầu ứng dụng trí tuệ nhân tạo ngày càng mạnh mẽ trong cộng đồng doanh nghiệp và nhà phát triển, Phúc Thành Holding chính thức ra mắt nền tảng PT AI Shop tại địa chỉ: https://shop.phucthanhholding.com.',
      'PT AI Shop được thiết kế với cơ chế tự động hóa 100%: khách hàng có thể lựa chọn các gói bản quyền AI tiên tiến nhất hiện nay như ChatGPT Plus/Team, Claude Pro, Midjourney, Cursor, cũng như các gói API Key với độ trễ thấp và độ ổn định cao.',
      'Điểm vượt trội của hệ thống là khả năng kích hoạt tức thì sau khi thanh toán qua cổng VietQR thông minh, hóa đơn điện tử đầy đủ cho doanh nghiệp và đội ngũ hỗ trợ kỹ thuật đồng hành 1-1 trong suốt thời gian sử dụng.',
      'Khách hàng và đối tác có thể truy cập và trải nghiệm ngay tại: https://shop.phucthanhholding.com.'
    ],
    content_en: [
      'In response to the accelerating enterprise demand for generative AI tools and developer subscriptions, Phuc Thanh Holding has officially launched PT AI Shop at https://shop.phucthanhholding.com.',
      'PT AI Shop features fully automated provisioning: users and corporations can instantly acquire genuine subscriptions for frontier AI tools such as ChatGPT Plus/Team, Claude Pro, Midjourney, and Cursor with guaranteed enterprise uptime.',
      'Key strengths include instant automated credential delivery upon payment, complete corporate VAT invoicing, and dedicated 1-on-1 technical assistance throughout the licensing lifecycle.',
      'Explore the marketplace now at: https://shop.phucthanhholding.com.'
    ]
  },
  {
    title: 'Khám phá PT AI Studio: Xưởng sản xuất video và nội dung số tự động bằng trí tuệ nhân tạo',
    title_en: 'Discover PT AI Studio: Automated Generative AI Video & Multimedia Production Hub',
    category: 'Sản phẩm',
    category_en: 'Products',
    excerpt: 'Giải pháp đột phá giúp doanh nghiệp sản xuất hàng trăm video truyền thông ngắn cho TikTok, Reels và YouTube chỉ trong vài phút với MC ảo sống động.',
    excerpt_en: 'A breakthrough platform enabling businesses to generate hundreds of engaging marketing videos for TikTok, Reels, and YouTube in minutes with photorealistic AI avatars.',
    date: '2026-11-21',
    image: '/assets/services/media-digital-content.svg',
    tags: ['AI Studio', 'Video AI', 'MC ảo', 'TikTok Marketing', 'Sáng tạo nội dung'],
    tags_en: ['AI Studio', 'AI Video', 'Digital Avatar', 'TikTok Marketing', 'Content Creation'],
    content: [
      'Nội dung video ngắn đang là kênh tiếp cận khách hàng hiệu quả nhất hiện nay, nhưng chi phí quay dựng truyền thống là rào cản lớn với hầu hết doanh nghiệp. PT AI Studio tại https://studio.phucthanhholding.com ra đời để giải quyết triệt để bài toán này.',
      'Hệ thống tích hợp các công nghệ Generative AI hàng đầu: chuyển văn bản thành kịch bản phân cảnh, tạo hình MC ảo nói chuẩn khẩu hình, thuyết minh bằng giọng nói AI tự nhiên và tự động chèn phụ đề cùng hiệu ứng sinh động.',
      'Doanh nghiệp chỉ cần cung cấp nội dung thông điệp hoặc đường dẫn sản phẩm, Studio sẽ tự động kết xuất các video chuẩn dọc và ngang sẵn sàng đăng tải lên TikTok, YouTube Shorts, Reels với chất lượng 4K sắc nét.',
      'Trải nghiệm công nghệ sản xuất video tương lai tại: https://studio.phucthanhholding.com.'
    ],
    content_en: [
      'Short-form video has become the most impactful marketing channel, yet traditional studio production costs remain prohibitive for most businesses. PT AI Studio at https://studio.phucthanhholding.com is engineered to solve this challenge.',
      'The platform combines state-of-the-art Generative AI pipelines: converting raw copy into structured storyboards, rendering photorealistic lip-synced avatars, producing emotive voiceovers, and auto-generating dynamic subtitles.',
      'Marketing teams simply provide product copy or URLs, and the studio automatically outputs optimized 4K vertical and horizontal assets ready for TikTok, Shorts, and Reels.',
      'Experience the future of video production at: https://studio.phucthanhholding.com.'
    ]
  },
  {
    title: 'Tự động hóa doanh nghiệp toàn diện với Phúc Thành Automation Engine (n8n Workflows)',
    title_en: 'Empowering Enterprise Automation with Phuc Thanh n8n Workflow Engine',
    category: 'Giải pháp',
    category_en: 'Solutions',
    excerpt: 'Hợp nhất toàn bộ quy trình tiếp nhận khách hàng, chấm điểm lead và đồng bộ dữ liệu đa kênh không cần lập trình tại n8n.phucthanhholding.com.',
    excerpt_en: 'Unified lead capture, intelligent lead scoring, and omnichannel synchronization with zero manual intervention at n8n.phucthanhholding.com.',
    date: '2026-11-22',
    image: '/assets/services/digital-transformation.svg',
    tags: ['n8n', 'Tự động hóa', 'Workflow', 'Lead Scoring', 'Zalo OA'],
    tags_en: ['n8n', 'Automation', 'Workflow', 'Lead Scoring', 'Enterprise Sync'],
    content: [
      'Để chuyển đổi từ quy trình làm việc thủ công rời rạc sang tự động hóa không chạm, Phúc Thành Holding triển khai nền tảng quy trình tự động n8n tại https://n8n.phucthanhholding.com.',
      'Với hơn 400 kết nối tiêu chuẩn, hệ thống tự động thu nhận thông tin khách hàng từ Form website, chạy mô hình AI đánh giá nhu cầu (Lead Scoring), phân chia cho nhân viên kinh doanh phù hợp và gửi tin nhắn tức thì qua Telegram hoặc Zalo OA.',
      'Được vận hành trên hạ tầng máy chủ bảo mật nội bộ, giải pháp đảm bảo an toàn tuyệt đối cho dữ liệu bí mật kinh doanh của khách hàng và doanh nghiệp.',
      'Tìm hiểu và triển khai luồng tự động hóa tại: https://n8n.phucthanhholding.com.'
    ],
    content_en: [
      'To accelerate the transition from fragmented manual processes to autonomous workflows, Phuc Thanh Holding has deployed the enterprise n8n automation engine at https://n8n.phucthanhholding.com.',
      'Featuring 400+ pre-built application connectors, the platform automatically captures website inquiries, scores lead fit using AI algorithms, assigns priority accounts to sales agents, and sends instant Telegram and Zalo notifications.',
      'Running on secure private servers, the infrastructure ensures total data sovereignty and privacy compliance for enterprise workloads.',
      'Explore and activate business workflows at: https://n8n.phucthanhholding.com.'
    ]
  },
  {
    title: '9Router AI Gateway: Cổng định tuyến tối ưu hiệu năng và chi phí gọi mô hình AI',
    title_en: '9Router AI Gateway: High-Performance Routing and Token Cost Optimization',
    category: 'Công nghệ',
    category_en: 'Technology',
    excerpt: 'Hợp nhất GPT-4o, Claude 3.5, Gemini 2.0 và DeepSeek qua một API chuẩn, tự động cân bằng tải và tiết kiệm 60% chi phí gọi mô hình.',
    excerpt_en: 'Unifying GPT-4o, Claude 3.5, Gemini 2.0, and DeepSeek via a single API with smart failover and up to 60% token cost reduction.',
    date: '2026-11-23',
    image: '/assets/services/data-management-analytics.svg',
    tags: ['9Router', 'AI Gateway', 'LLM', 'Claude 3.5', 'OpenAI'],
    tags_en: ['9Router', 'AI Gateway', 'LLM', 'Claude 3.5', 'OpenAI'],
    content: [
      'Khi doanh nghiệp tích hợp nhiều mô hình trí tuệ nhân tạo vào sản phẩm, việc quản lý API keys, chi phí token và nguy cơ mô hình bị gián đoạn là thách thức lớn. 9Router AI Gateway tại https://9router.phucthanhholding.com mang lại giải pháp hoàn chỉnh.',
      '9Router cung cấp một cổng API chuẩn tương thích 100% với định dạng OpenAI. Ứng dụng chỉ cần gọi đến 9Router, hệ thống sẽ tự động điều phối yêu cầu đến mô hình tối ưu nhất (Claude, OpenAI, Gemini, DeepSeek).',
      'Đặc biệt, cơ chế Semantic Caching lưu trữ câu trả lời tương tự giúp giảm đến 60% chi phí token và giảm độ trễ phản hồi xuống dưới 50ms cho người dùng cuối.',
      'Truy cập và tích hợp cổng 9Router tại: https://9router.phucthanhholding.com.'
    ],
    content_en: [
      'Managing multiple AI providers, fluctuating token expenses, and provider downtime is a major technical challenge. 9Router AI Gateway at https://9router.phucthanhholding.com delivers an all-in-one enterprise solution.',
      '9Router exposes a unified OpenAI-compatible endpoint. Client applications communicate through 9Router, which dynamically dispatches inference requests to the optimal model based on cost, latency, and capability.',
      'With intelligent semantic caching, 9Router cuts API billing by up to 60% while slashing response times below 50ms for cached responses.',
      'Integrate the gateway into your apps at: https://9router.phucthanhholding.com.'
    ]
  },
  {
    title: 'Tối ưu tỷ lệ chuyển đổi bán hàng vượt trội với Phúc Thành Landing Studio',
    title_en: 'Maximize Sales Conversion Rates with Phuc Thanh Landing Studio',
    category: 'Giải pháp',
    category_en: 'Solutions',
    excerpt: 'Nền tảng thiết kế trang đích (Landing Page) chuẩn Apple Clean, tốc độ dưới 1s và tự động hóa chuyển đổi khách hàng tại unbounce.phucthanhholding.com.',
    excerpt_en: 'Next-generation landing page platform featuring Apple Clean aesthetics, sub-second loading, and automated conversion workflows at unbounce.phucthanhholding.com.',
    date: '2026-11-24',
    image: '/assets/services/enterprise-software-ai.svg',
    tags: ['Landing Page', 'Unbounce', 'Chuyển đổi số', 'Tối ưu CRO', 'Marketing'],
    tags_en: ['Landing Page', 'Unbounce', 'Digital Conversion', 'CRO', 'Marketing'],
    content: [
      'Trang đích (Landing Page) là điểm chạm quyết định chuyển đổi khách hàng tiềm năng thành doanh thu. Phúc Thành Landing Studio tại https://unbounce.phucthanhholding.com cung cấp nền tảng thiết kế chuyên sâu dành riêng cho các chiến dịch marketing hiệu năng cao.',
      'Các trang được xây dựng theo ngôn ngữ thiết kế tinh gọn chuẩn Apple, tối ưu trải nghiệm chạm trên điện thoại và đạt điểm số tải trang vượt trội (trên 95 điểm Google PageSpeed).',
      'Toàn bộ form thu thập thông tin được kết nối tự động với hệ thống thông báo Telegram và cơ sở dữ liệu nội bộ, giúp đội ngũ bán hàng tiếp cận khách hàng chỉ trong vòng 60 giây sau khi điền biểu mẫu.',
      'Bắt đầu thiết kế và khởi chạy chiến dịch trang đích tại: https://unbounce.phucthanhholding.com.'
    ],
    content_en: [
      'High-converting landing pages are the foundation of profitable digital customer acquisition. Phuc Thanh Landing Studio at https://unbounce.phucthanhholding.com provides specialized tools for high-velocity marketing campaigns.',
      'Every template is engineered around minimalist Apple aesthetics, responsive touch-first navigation, and industry-leading performance scoring 95+ on Google PageSpeed Insights.',
      'Embedded forms stream leads directly into Telegram alerts and central databases, empowering sales representatives to respond within 60 seconds.',
      'Launch your next high-converting campaign at: https://unbounce.phucthanhholding.com.'
    ]
  }
];

export async function seed() {
  const db = createPool();
  try {
    console.log('Seeding products...');
    for (const p of products) {
      await db.query(`
        INSERT INTO records(kind, data)
        VALUES('content_products', $1::jsonb)
        ON CONFLICT ((data->>'slug')) WHERE kind='content_products' AND NULLIF(data->>'slug','') IS NOT NULL
        DO UPDATE SET data = EXCLUDED.data, updated_at = now();
      `, [JSON.stringify(p)]);
      console.log('Seeded product:', p.slug);
    }

    console.log('Seeding news articles...');
    for (const n of newsArticles) {
      // Check if article with same title already exists
      const existing = await db.query(`
        SELECT id FROM records WHERE kind='content_news' AND data->>'title' = $1
      `, [n.title]);

      if (!existing.rows[0]) {
        await db.query(`
          INSERT INTO records(kind, data)
          VALUES('content_news', $1::jsonb);
        `, [JSON.stringify(n)]);
        console.log('Seeded article:', n.title.slice(0, 40) + '...');
      } else {
        console.log('Article already exists:', n.title.slice(0, 40) + '...');
      }
    }

    console.log('SEEDING_COMPLETE');
  } finally {
    await db.end();
  }
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
