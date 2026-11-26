import useLang from '@/hooks/useLang';
import { localizeLegacyHref } from '@/lib/routes';

export default function AppleEcosystem() {
  const lang = useLang();
  const isVi = lang === 'vi';

  return (
    <section
      id="he-sinh-thai"
      data-sc-act="flow"
      className="relative py-24 sm:py-32 bg-white text-[#1d1d1f] border-t border-gray-200/80 overflow-hidden"
    >
      {/* Background accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#046842]/5 via-[#f59e0b]/5 to-transparent blur-[160px] pointer-events-none rounded-full" />

      <div className="container-main max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#046842]/8 border border-[#046842]/20 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#046842]">
              {isVi ? 'Hệ Sinh Thái Toàn Diện' : 'Integrated Ecosystem'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-6">
            {isVi ? 'Bốn Trụ Cột Chiến Lược' : 'Four Strategic Pillars'}
          </h2>
          <p className="text-[#4b5563] text-base sm:text-lg">
            {isVi
              ? 'Được thiết kế theo cấu trúc module độc lập nhưng tương hỗ sâu sắc, mang lại hiệu ứng cộng hưởng giá trị vượt trội cho các đối tác và khách hàng.'
              : 'Architected as decoupled yet deeply synergistic modules, providing compounding value across all partner engagements.'}
          </p>
        </div>

        {/* Bento Grid Layout (Apple Pro Clean Style) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Enterprise Software & AI (Spans 7 cols) */}
          <div
            data-sc-tilt="6"
            data-sc-spotlight
            className="md:col-span-7 rounded-3xl bg-white border border-gray-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-8 sm:p-10 flex flex-col justify-between relative group overflow-hidden transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#046842]/5 rounded-full blur-[70px] pointer-events-none group-hover:bg-[#046842]/10 transition-all duration-500" />
            
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#046842]/10 border border-[#046842]/20 flex items-center justify-center text-[#046842]">
                  <i className="ri-code-box-line text-2xl" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                  Core Pillar 01
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] mb-4 group-hover:text-[#046842] transition-colors">
                {isVi ? 'Phần Mềm Doanh Nghiệp & Trí Tuệ Nhân Tạo' : 'Enterprise Software & Applied AI'}
              </h3>
              <p className="text-[#4b5563] text-sm sm:text-base leading-relaxed mb-6">
                {isVi
                  ? 'Phát triển các hệ thống ERP, CRM chuyên biệt và tích hợp mô hình ngôn ngữ lớn (LLM), AI Agent tự động hóa quy trình cho doanh nghiệp quy mô lớn.'
                  : 'Bespoke ERP, CRM platforms coupled with generative AI pipelines and autonomous workflow agents.'}
              </p>
            </div>

            <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 font-medium">Next.js / React 19</span>
                <span className="text-xs px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 font-medium">Edge API</span>
                <span className="text-xs px-2.5 py-1 rounded-md bg-[#046842]/10 text-[#046842] font-semibold">AI Agentic Workflow</span>
              </div>
              <a
                href={localizeLegacyHref('/san-pham', lang)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#046842] hover:text-white flex items-center justify-center text-gray-700 transition-all shrink-0 ml-4 shadow-sm"
                aria-label="View Software"
              >
                <i className="ri-arrow-right-up-line text-lg" />
              </a>
            </div>
          </div>

          {/* Card 2: PT Clinic & DataLake (Spans 5 cols) */}
          <div
            data-sc-tilt="6"
            data-sc-spotlight
            className="md:col-span-5 rounded-3xl bg-white border border-gray-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-8 sm:p-10 flex flex-col justify-between relative group overflow-hidden transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-52 h-52 bg-emerald-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-emerald-500/10 transition-all duration-500" />
            
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#046842]/10 border border-[#046842]/20 flex items-center justify-center text-[#046842]">
                  <i className="ri-heart-pulse-line text-2xl" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                  Core Pillar 02
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] mb-4 group-hover:text-[#046842] transition-colors">
                {isVi ? 'Y Tế Số & PT DataLake' : 'Digital Health & DataLake'}
              </h3>
              <p className="text-[#4b5563] text-sm sm:text-base leading-relaxed mb-6">
                {isVi
                  ? 'Giải pháp quản lý phòng khám thông minh (PT Clinic) kết hợp kiến trúc kho dữ liệu lâm sàng y tế đạt chuẩn an toàn thông tin.'
                  : 'Intelligent clinical management (PT Clinic) with compliant health data lakes and predictive patient workflows.'}
              </p>
            </div>

            <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs px-2.5 py-1 rounded-md bg-[#046842]/10 text-[#046842] font-semibold">HIPAA / ISO Standard Ready</span>
              <a
                href={localizeLegacyHref('/linh-vuc', lang)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#046842] hover:text-white flex items-center justify-center text-gray-700 transition-all shrink-0 shadow-sm"
                aria-label="View Health"
              >
                <i className="ri-arrow-right-up-line text-lg" />
              </a>
            </div>
          </div>

          {/* Card 3: PT LMS & Workforce Tech (Spans 5 cols) */}
          <div
            data-sc-tilt="6"
            data-sc-spotlight
            className="md:col-span-5 rounded-3xl bg-white border border-gray-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-8 sm:p-10 flex flex-col justify-between relative group overflow-hidden transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-52 h-52 bg-[#f59e0b]/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-[#f59e0b]/10 transition-all duration-500" />
            
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#d97706]/10 border border-[#d97706]/20 flex items-center justify-center text-[#d97706]">
                  <i className="ri-graduation-cap-line text-2xl" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                  Core Pillar 03
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] mb-4 group-hover:text-[#d97706] transition-colors">
                {isVi ? 'Đào Tạo & Nhân Lực Số (PT LMS)' : 'EdTech & Digital Workforce'}
              </h3>
              <p className="text-[#4b5563] text-sm sm:text-base leading-relaxed mb-6">
                {isVi
                  ? 'Nâng chuẩn năng lực đội ngũ với nền tảng học trực tuyến đa kênh, chương trình chuẩn hóa kỹ năng số hóa và quản trị hiện đại.'
                  : 'Cloud LMS infrastructure and executive digital upskilling programs delivering continuous organizational competence.'}
              </p>
            </div>

            <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs px-2.5 py-1 rounded-md bg-[#d97706]/10 text-[#d97706] font-semibold">Interactive LMS Engine</span>
              <a
                href={localizeLegacyHref('/linh-vuc', lang)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#d97706] hover:text-white flex items-center justify-center text-gray-700 transition-all shrink-0 shadow-sm"
                aria-label="View LMS"
              >
                <i className="ri-arrow-right-up-line text-lg" />
              </a>
            </div>
          </div>

          {/* Card 4: Technology Investment & Strategic Capital (Spans 7 cols) */}
          <div
            data-sc-tilt="6"
            data-sc-spotlight
            className="md:col-span-7 rounded-3xl bg-white border border-gray-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-8 sm:p-10 flex flex-col justify-between relative group overflow-hidden transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[70px] pointer-events-none group-hover:bg-blue-500/10 transition-all duration-500" />
            
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-600">
                  <i className="ri-funds-line text-2xl" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                  Core Pillar 04
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] mb-4 group-hover:text-blue-600 transition-colors">
                {isVi ? 'Đầu Tư Công Nghệ & Quỹ Phát Triển' : 'Venture Capital & Tech Incubation'}
              </h3>
              <p className="text-[#4b5563] text-sm sm:text-base leading-relaxed mb-6">
                {isVi
                  ? 'Đầu tư trực tiếp và bảo trợ hạ tầng kỹ thuật cho các giải pháp công nghệ tiềm năng cao, tăng tốc đưa sản phẩm ra thị trường.'
                  : 'Direct strategic investment and technical scaffolding for high-conviction ventures navigating rapid market commercialization.'}
              </p>
            </div>

            <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 font-medium">Co-Founding</span>
                <span className="text-xs px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 font-medium">Seed Capital</span>
                <span className="text-xs px-2.5 py-1 rounded-md bg-blue-600/10 text-blue-700 font-semibold">Ecosystem Synergy</span>
              </div>
              <a
                href={localizeLegacyHref('/du-an', lang)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white flex items-center justify-center text-gray-700 transition-all shrink-0 ml-4 shadow-sm"
                aria-label="View Ventures"
              >
                <i className="ri-arrow-right-up-line text-lg" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
