import useLang from '@/hooks/useLang';
import { localizeLegacyHref } from '@/lib/routes';

export default function AppleEcosystem() {
  const lang = useLang();
  const isVi = lang === 'vi';

  return (
    <section
      id="he-sinh-thai"
      data-sc-act="flow"
      className="relative py-24 sm:py-32 bg-[#07080a] text-[#f5f5f7] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#00f0b5]/10 via-[#3b82f6]/10 to-transparent blur-[160px] pointer-events-none rounded-full" />

      <div className="container-main max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#00f0b5]">
              {isVi ? 'Hệ Sinh Thái Toàn Diện' : 'Integrated Ecosystem'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            {isVi ? 'Bốn Trụ Cột Chiến Lược' : 'Four Strategic Pillars'}
          </h2>
          <p className="text-[#8b949e] text-base sm:text-lg">
            {isVi
              ? 'Được thiết kế theo cấu trúc module độc lập nhưng tương hỗ sâu sắc, mang lại hiệu ứng cộng hưởng giá trị vượt trội cho các đối tác và khách hàng.'
              : 'Architected as decoupled yet deeply synergistic modules, providing compounding value across all partner engagements.'}
          </p>
        </div>

        {/* Bento Grid Layout (Apple Pro Style) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Enterprise Software & AI (Spans 7 cols) */}
          <div
            data-sc-tilt="6"
            data-sc-spotlight
            className="md:col-span-7 rounded-3xl apple-glass-card p-8 sm:p-10 flex flex-col justify-between relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00f0b5]/10 rounded-full blur-[70px] pointer-events-none group-hover:bg-[#00f0b5]/20 transition-all duration-500" />
            
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#00f0b5]/10 border border-[#00f0b5]/20 flex items-center justify-center text-[#00f0b5]">
                  <i className="ri-code-box-line text-2xl" />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white/80">
                  Core Pillar 01
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-[#00f0b5] transition-colors">
                {isVi ? 'Phần Mềm Doanh Nghiệp & Trí Tuệ Nhân Tạo' : 'Enterprise Software & Applied AI'}
              </h3>
              <p className="text-[#8b949e] text-sm sm:text-base leading-relaxed mb-6">
                {isVi
                  ? 'Phát triển các hệ thống ERP, CRM chuyên biệt và tích hợp mô hình ngôn ngữ lớn (LLM), AI Agent tự động hóa quy trình cho doanh nghiệp quy mô lớn.'
                  : 'Bespoke ERP, CRM platforms coupled with generative AI pipelines and autonomous workflow agents.'}
              </p>
            </div>

            <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-white/70">Next.js / React 19</span>
                <span className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-white/70">Edge API</span>
                <span className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-[#00f0b5]">AI Agentic Workflow</span>
              </div>
              <a
                href={localizeLegacyHref('/san-pham', lang)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#00f0b5] hover:text-[#07080a] flex items-center justify-center text-white transition-all shrink-0 ml-4"
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
            className="md:col-span-5 rounded-3xl apple-glass-card p-8 sm:p-10 flex flex-col justify-between relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-52 h-52 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-500" />
            
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <i className="ri-heart-pulse-line text-2xl" />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white/80">
                  Core Pillar 02
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                {isVi ? 'Y Tế Số & PT DataLake' : 'Digital Health & DataLake'}
              </h3>
              <p className="text-[#8b949e] text-sm sm:text-base leading-relaxed mb-6">
                {isVi
                  ? 'Giải pháp quản lý phòng khám thông minh (PT Clinic) kết hợp kiến trúc kho dữ liệu lâm sàng y tế đạt chuẩn an toàn thông tin.'
                  : 'Intelligent clinical management (PT Clinic) with compliant health data lakes and predictive patient workflows.'}
              </p>
            </div>

            <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-emerald-300">HIPAA / ISO Standard Ready</span>
              <a
                href={localizeLegacyHref('/linh-vuc', lang)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-emerald-400 hover:text-[#07080a] flex items-center justify-center text-white transition-all shrink-0"
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
            className="md:col-span-5 rounded-3xl apple-glass-card p-8 sm:p-10 flex flex-col justify-between relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-52 h-52 bg-[#f5a623]/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-[#f5a623]/20 transition-all duration-500" />
            
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#f5a623]/10 border border-[#f5a623]/20 flex items-center justify-center text-[#f5a623]">
                  <i className="ri-graduation-cap-line text-2xl" />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white/80">
                  Core Pillar 03
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-[#f5a623] transition-colors">
                {isVi ? 'Đào Tạo & Nhân Lực Số (PT LMS)' : 'EdTech & Digital Workforce'}
              </h3>
              <p className="text-[#8b949e] text-sm sm:text-base leading-relaxed mb-6">
                {isVi
                  ? 'Nâng chuẩn năng lực đội ngũ với nền tảng học trực tuyến đa kênh, chương trình chuẩn hóa kỹ năng số hóa và quản trị hiện đại.'
                  : 'Cloud LMS infrastructure and executive digital upskilling programs delivering continuous organizational competence.'}
              </p>
            </div>

            <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-[#f5a623]">Interactive LMS Engine</span>
              <a
                href={localizeLegacyHref('/linh-vuc', lang)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#f5a623] hover:text-[#07080a] flex items-center justify-center text-white transition-all shrink-0"
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
            className="md:col-span-7 rounded-3xl apple-glass-card p-8 sm:p-10 flex flex-col justify-between relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[70px] pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-500" />
            
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <i className="ri-funds-line text-2xl" />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white/80">
                  Core Pillar 04
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                {isVi ? 'Đầu Tư Công Nghệ & Quỹ Phát Triển' : 'Venture Capital & Tech Incubation'}
              </h3>
              <p className="text-[#8b949e] text-sm sm:text-base leading-relaxed mb-6">
                {isVi
                  ? 'Đầu tư trực tiếp và bảo trợ hạ tầng kỹ thuật cho các giải pháp công nghệ tiềm năng cao, tăng tốc đưa sản phẩm ra thị trường.'
                  : 'Direct strategic investment and technical scaffolding for high-conviction ventures navigating rapid market commercialization.'}
              </p>
            </div>

            <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-white/70">Co-Founding</span>
                <span className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-white/70">Seed Capital</span>
                <span className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-cyan-300">Ecosystem Synergy</span>
              </div>
              <a
                href={localizeLegacyHref('/du-an', lang)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-cyan-400 hover:text-[#07080a] flex items-center justify-center text-white transition-all shrink-0 ml-4"
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
