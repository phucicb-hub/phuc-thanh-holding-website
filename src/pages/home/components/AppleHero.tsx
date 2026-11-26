import useLang from '@/hooks/useLang';
import { company } from '@/lib/company';

export default function AppleHero() {
  const lang = useLang();
  const isVi = lang === 'vi';

  return (
    <section
      data-sc-act="flow"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden apple-canvas"
    >
      {/* Background Ambience Planes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-[#00f0b5]/15 via-[#f5a623]/8 to-transparent blur-[140px] rounded-full opacity-70" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="container-main relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Verification Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#00f0b5] animate-pulse" />
          <span className="text-xs font-medium tracking-wide text-white/90">
            {isVi
              ? `MST: ${company.registrationNumber} • Doanh nghiệp Công nghệ & Đầu tư`
              : `Tax ID: ${company.registrationNumber} • Technology & Investment JSC`}
          </span>
          <span className="text-xs text-white/40">|</span>
          <span className="text-xs text-[#00f0b5] font-semibold">
            {isVi ? 'Đã xác minh' : 'Verified'}
          </span>
        </div>

        {/* Large Apple-Pro Typographic Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.08]">
          <span className="block apple-gradient-text">
            {isVi ? 'Kiến tạo Vị thế Số.' : 'Architecting Digital Sovereignty.'}
          </span>
          <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 font-medium bg-gradient-to-r from-[#f5f5f7] via-[#00f0b5] to-[#f5a623] bg-clip-text text-transparent">
            {isVi
              ? 'Chuẩn mực Công nghệ & Đầu tư'
              : 'Precision Engineering & Strategic Capital'}
          </span>
        </h1>

        {/* Subtitle with High Readability */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[#8b949e] font-normal leading-relaxed mb-10">
          {isVi
            ? 'Phúc Thành Holding hợp nhất giải pháp phần mềm cấp doanh nghiệp, y tế số, đào tạo nhân lực và nguồn vốn chiến lược để thúc đẩy tăng trưởng bền vững.'
            : 'Phuc Thanh Holding unifies enterprise software engineering, clinical digital health, workforce tech, and strategic venture capital.'}
        </p>

        {/* CTA Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <a
            href="#he-sinh-thai"
            className="px-7 py-3.5 rounded-full bg-white text-[#07080a] font-semibold text-sm hover:bg-[#00f0b5] hover:text-[#07080a] transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_30px_rgba(0,240,181,0.4)]"
          >
            {isVi ? 'Khám phá Hệ sinh thái' : 'Explore Ecosystem'}
          </a>
          <a
            href="#bao-mat"
            className="px-7 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 font-semibold text-sm transition-all duration-300 backdrop-blur-md"
          >
            {isVi ? 'Kiến trúc & Bảo mật' : 'Architecture & Security'}
          </a>
        </div>

        {/* Holographic 3D Interactive Card Deck with Tilt */}
        <div
          data-sc-tilt="10"
          data-sc-spotlight
          className="relative max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl apple-glass border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <div className="w-10 h-10 rounded-xl bg-[#00f0b5]/10 border border-[#00f0b5]/20 flex items-center justify-center text-[#00f0b5] mb-3">
                <i className="ri-shield-keyhole-line text-xl" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">
                {isVi ? 'Kiến trúc Zero-Trust' : 'Zero-Trust Architecture'}
              </h3>
              <p className="text-xs text-[#8b949e]">
                {isVi
                  ? 'Mã hóa đa lớp, cô lập hạ tầng và tuân thủ các tiêu chuẩn an toàn thông tin khắt khe nhất.'
                  : 'Multi-layer encryption, infrastructure isolation and rigorous enterprise compliance.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <div className="w-10 h-10 rounded-xl bg-[#f5a623]/10 border border-[#f5a623]/20 flex items-center justify-center text-[#f5a623] mb-3">
                <i className="ri-cpu-line text-xl" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">
                {isVi ? 'Hạ tầng AI Cloud & Big Data' : 'AI Cloud & Data Pipelines'}
              </h3>
              <p className="text-xs text-[#8b949e]">
                {isVi
                  ? 'Tối ưu độ trễ dưới 50ms, khả năng mở rộng không giới hạn cho các ứng dụng quy mô lớn.'
                  : 'Sub-50ms latency edge distribution with unbounded scalability for massive enterprise workloads.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3">
                <i className="ri-government-line text-xl" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">
                {isVi ? 'Pháp lý Minh bạch' : 'Verified Sovereign Entity'}
              </h3>
              <p className="text-xs text-[#8b949e]">
                {isVi
                  ? `Đăng ký kinh doanh chính thức số ${company.registrationNumber}, trụ sở tại Phú Thọ, Việt Nam.`
                  : `Fully incorporated entity #2500716846, headquarted in Phu Tho Province, Vietnam.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
