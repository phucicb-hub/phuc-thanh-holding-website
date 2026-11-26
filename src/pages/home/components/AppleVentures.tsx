import useLang from '@/hooks/useLang';
import { detailHref } from '@/lib/routes';

export default function AppleVentures() {
  const lang = useLang();
  const isVi = lang === 'vi';

  const platforms = [
    {
      id: 'shop',
      name: 'PT AI Shop',
      url: 'https://shop.phucthanhholding.com',
      domain: 'shop.phucthanhholding.com',
      tag: isVi ? 'Cửa Hàng Bản Quyền AI' : 'Enterprise AI Store',
      desc: isVi
        ? 'Phân phối bản quyền tài khoản AI cao cấp (ChatGPT Plus, Claude Pro, Midjourney, Cursor) kích hoạt tự động 24/7 với bảo hành 1:1.'
        : 'Official enterprise marketplace for genuine AI subscriptions and developer licenses with instant automated provisioning.',
      status: isVi ? 'Hoạt động' : 'Live',
      articleId: 14,
      icon: 'ri-shopping-bag-3-line',
      color: '#046842',
    },
    {
      id: 'studio',
      name: 'PT AI Studio',
      url: 'https://studio.phucthanhholding.com',
      domain: 'studio.phucthanhholding.com',
      tag: isVi ? 'Xưởng Video & GenAI' : 'GenAI Video Studio',
      desc: isVi
        ? 'Sản xuất video tự động từ kịch bản văn bản với MC ảo tự nhiên, nhân bản giọng nói AI và biên tập video ngắn cho TikTok/Reels.'
        : 'Generative AI media engine rendering photorealistic avatar videos, multilingual voice cloning, and batch short-form creation.',
      status: isVi ? 'Hoạt động' : 'Live',
      articleId: 15,
      icon: 'ri-movie-2-line',
      color: '#8b5cf6',
    },
    {
      id: 'n8n',
      name: 'PT Automation Engine',
      url: 'https://n8n.phucthanhholding.com',
      domain: 'n8n.phucthanhholding.com',
      tag: isVi ? 'Tự Động Hóa n8n' : 'n8n Workflow Engine',
      desc: isVi
        ? 'Động cơ điều phối luồng việc tự động hóa cấp doanh nghiệp, kết nối CRM, Zalo, Telegram và tích hợp AI Agent xử lý tác vụ thông minh.'
        : 'Enterprise workflow orchestration connecting disparate SaaS endpoints with autonomous multi-agent operational loops.',
      status: isVi ? 'Hoạt động' : 'Live',
      articleId: 16,
      icon: 'ri-flow-chart',
      color: '#ea580c',
    },
    {
      id: '9router',
      name: '9Router AI Gateway',
      url: 'https://9router.phucthanhholding.com',
      domain: '9router.phucthanhholding.com',
      tag: isVi ? 'Cổng Định Tuyến AI' : 'Unified AI Gateway',
      desc: isVi
        ? 'Cổng API định tuyến LLM tập trung chuẩn OpenAI: tự động chuyển đổi thông minh giữa GPT-4o, Claude 3.5, DeepSeek để tối ưu chi phí và độ trễ.'
        : 'Low-latency OpenAI-compatible API gateway intelligently load balancing requests across premier frontier LLMs.',
      status: isVi ? 'Hoạt động' : 'Live',
      articleId: 17,
      icon: 'ri-router-line',
      color: '#0284c7',
    },
    {
      id: 'unbounce',
      name: 'PT Landing Studio',
      url: 'https://unbounce.phucthanhholding.com',
      domain: 'unbounce.phucthanhholding.com',
      tag: isVi ? 'Landing Page CRO' : 'High-Conversion Studio',
      desc: isVi
        ? 'Nền tảng thiết kế trang đích kéo thả chuyển đổi cao chuẩn Apple Clean, tốc độ dưới 1s, kết nối lead tự động về CRM và Telegram tức thì.'
        : 'High-velocity landing page builder engineered with Apple Clean aesthetics, sub-second load times, and instant lead alerting.',
      status: isVi ? 'Hoạt động' : 'Live',
      articleId: 18,
      icon: 'ri-layout-masonry-line',
      color: '#059669',
    },
  ];

  return (
    <section
      id="nen-tang-truc-tuyen"
      data-sc-act="flow"
      className="py-24 bg-[#f8fafc] text-[#1d1d1f] border-t border-gray-200/80 relative overflow-hidden"
    >
      <div className="container-main max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#046842]/8 border border-[#046842]/20 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#046842]">
                {isVi ? 'Nền Tảng Đang Hoạt Động (Live Platforms)' : 'Live Production Platforms'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1d1d1f]">
              {isVi ? 'Hệ Sinh Thái Ứng Dụng & Giải Pháp Số' : 'Active SaaS & Enterprise Solutions'}
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#4b5563]">
            {isVi
              ? 'Khách hàng và đối tác có thể truy cập trực tiếp các nền tảng đám mây của Phúc Thành Holding để trải nghiệm và sử dụng ngay.'
              : 'Directly launch our production cloud platforms to explore features and accelerate business operations.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              data-sc-tilt="6"
              data-sc-spotlight
              className="bg-white rounded-3xl border border-gray-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-6 sm:p-8 flex flex-col justify-between group transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm"
                    style={{ backgroundColor: platform.color }}
                  >
                    <i className={`${platform.icon} text-2xl`} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full border"
                      style={{
                        borderColor: `${platform.color}30`,
                        backgroundColor: `${platform.color}10`,
                        color: platform.color,
                      }}
                    >
                      {platform.tag}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      {platform.status}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#1d1d1f] mb-1 group-hover:text-[#046842] transition-colors">
                  {platform.name}
                </h3>
                <div className="text-xs font-mono text-gray-500 mb-3">
                  {platform.domain}
                </div>
                <p className="text-sm text-[#4b5563] leading-relaxed mb-6">
                  {platform.desc}
                </p>
              </div>

              <div className="pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold bg-[#046842] hover:bg-[#025938] text-white rounded-xl transition-all shadow-md hover:shadow-lg whitespace-nowrap"
                >
                  <i className="ri-rocket-line" />
                  <span>{isVi ? 'Vào nền tảng' : 'Open Platform'}</span>
                  <i className="ri-external-link-line text-xs" />
                </a>

                <a
                  href={detailHref('news', platform.articleId, lang)}
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#046842] py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  <span>{isVi ? 'Xem bài giới thiệu' : 'Read Article'}</span>
                  <i className="ri-arrow-right-line" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
