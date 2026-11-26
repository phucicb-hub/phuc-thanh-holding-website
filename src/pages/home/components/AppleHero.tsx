import useLang from '@/hooks/useLang';
import { company } from '@/lib/company';

export default function AppleHero() {
  const lang = useLang();
  const isVi = lang === 'vi';

  return (
    <section
      data-sc-act="flow"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#fbfbfd]"
    >
      {/* Background Ambience Planes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-[#046842]/10 via-[#f59e0b]/8 to-transparent blur-[140px] rounded-full opacity-80" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(4,104,66,0.8) 1px, transparent 0)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="container-main relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Verification Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm backdrop-blur-md mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#046842] animate-pulse" />
          <span className="text-xs font-semibold tracking-wide text-gray-800">
            {isVi
              ? `MST: ${company.registrationNumber} • Doanh nghiệp Công nghệ & Đầu tư`
              : `Tax: ${company.registrationNumber} • Enterprise Technology & Investment`}
          </span>
          <span className="text-xs text-gray-300">|</span>
          <span className="text-xs text-[#046842] font-bold">
            {isVi ? 'Đã xác minh' : 'Verified'}
          </span>
        </div>

        {/* Large Apple-Pro Typographic Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.08] text-[#1d1d1f]">
          <span className="block">
            {isVi ? 'Kiến tạo Vị thế Số.' : 'Architecting Digital Sovereignty.'}
          </span>
          <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 font-medium bg-gradient-to-r from-[#046842] via-[#025938] to-[#d97706] bg-clip-text text-transparent">
            {isVi
              ? 'Chuẩn mực Công nghệ & Đầu tư'
              : 'Precision Engineering & Strategic Capital'}
          </span>
        </h1>

        {/* Subtitle with High Readability */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[#4b5563] font-normal leading-relaxed mb-10">
          {isVi
            ? 'Phúc Thành Holding hợp nhất giải pháp phần mềm cấp doanh nghiệp, y tế số, đào tạo nhân lực và nguồn vốn chiến lược để thúc đẩy tăng trưởng bền vững.'
            : 'Uniting enterprise software engineering, clinical digital health, workforce technology, and strategic venture capital to drive sustainable growth.'}
        </p>

        {/* CTA Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <a
            href="#he-sinh-thai"
            className="px-7 py-3.5 rounded-full bg-[#046842] text-white font-semibold text-sm hover:bg-[#025938] transition-all duration-300 shadow-[0_4px_16px_rgba(4,104,66,0.25)] hover:shadow-[0_6px_24px_rgba(4,104,66,0.35)]"
          >
            {isVi ? 'Khám phá Hệ sinh thái' : 'Explore Ecosystem'}
          </a>
          <a
            href="#bao-mat"
            className="px-7 py-3.5 rounded-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-semibold text-sm transition-all duration-300 shadow-sm"
          >
            {isVi ? 'Kiến trúc & Bảo mật' : 'Architecture & Security'}
          </a>
        </div>

        {/* Holographic 3D Interactive Card Deck with Tilt */}
        <div
          data-sc-tilt="10"
          data-sc-spotlight
          className="relative max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-gray-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-4 rounded-2xl bg-[#f8fafc] border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-[#046842]/10 border border-[#046842]/20 flex items-center justify-center text-[#046842] mb-3">
                <i className="ri-shield-keyhole-line text-xl" />
              </div>
              <h3 className="text-[#1d1d1f] font-bold text-sm mb-1">
                {isVi ? 'Kiến trúc Zero-Trust' : 'Zero-Trust Architecture'}
              </h3>
              <p className="text-xs text-[#4b5563] leading-relaxed">
                {isVi
                  ? 'Mã hóa đa lớp, cô lập hạ tầng và tuân thủ các tiêu chuẩn an toàn thông tin khắt khe nhất.'
                  : 'Multi-layer encryption, isolated infrastructure, and uncompromising compliance.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f8fafc] border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-[#d97706]/10 border border-[#d97706]/20 flex items-center justify-center text-[#d97706] mb-3">
                <i className="ri-cpu-line text-xl" />
              </div>
              <h3 className="text-[#1d1d1f] font-bold text-sm mb-1">
                {isVi ? 'Hạ tầng AI Cloud & Big Data' : 'AI Cloud & Data Pipelines'}
              </h3>
              <p className="text-xs text-[#4b5563] leading-relaxed">
                {isVi
                  ? 'Tối ưu độ trễ dưới 50ms, khả năng mở rộng không giới hạn cho các ứng dụng quy mô lớn.'
                  : 'Sub-50ms edge delivery with elastic scalability built for demanding enterprise workloads.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f8fafc] border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-600 mb-3">
                <i className="ri-government-line text-xl" />
              </div>
              <h3 className="text-[#1d1d1f] font-bold text-sm mb-1">
                {isVi ? 'Pháp lý Minh bạch' : 'Verified Enterprise Entity'}
              </h3>
              <p className="text-xs text-[#4b5563] leading-relaxed">
                {isVi
                  ? `Đăng ký kinh doanh chính thức số ${company.registrationNumber}, trụ sở tại Phú Thọ, Việt Nam.`
                  : `Incorporated under license #${company.registrationNumber}, proudly headquartered in Phu Tho, Vietnam.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
