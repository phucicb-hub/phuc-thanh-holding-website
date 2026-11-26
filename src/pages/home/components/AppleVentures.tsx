import useLang from '@/hooks/useLang';
import { localizeLegacyHref } from '@/lib/routes';

export default function AppleVentures() {
  const lang = useLang();
  const isVi = lang === 'vi';

  const ventures = [
    {
      id: 'pt-clinic',
      name: 'PT Clinic Platform',
      tag: isVi ? 'Y tế số thông minh' : 'Smart Healthcare Cloud',
      desc: isVi
        ? 'Phần mềm quản lý phòng khám chuyên khoa, tích hợp lịch khám, bệnh án điện tử và tương tác bệnh nhân thời gian thực.'
        : 'Enterprise clinic operation platform with EHR workflows and real-time telehealth interfaces.',
      status: isVi ? 'Đang triển khai' : 'Active Deployment',
      color: '#00f0b5',
      href: '/san-pham',
    },
    {
      id: 'pt-datalake',
      name: 'PT DataLake Engine',
      tag: isVi ? 'Dữ liệu lớn & Phân tích' : 'Clinical Big Data Lake',
      desc: isVi
        ? 'Kho dữ liệu tập trung cho phép phân tích thống kê lâm sàng, dự báo nhu cầu y tế và chuẩn hóa dữ liệu khám chữa bệnh.'
        : 'Centralized lakehouse aggregating clinical metrics for predictive diagnostics and health operations.',
      status: isVi ? 'Hạ tầng cốt lõi' : 'Core Infrastructure',
      color: '#3b82f6',
      href: '/linh-vuc',
    },
    {
      id: 'pt-lms',
      name: 'PT LMS Ecosystem',
      tag: isVi ? 'Đào tạo nhân lực số' : 'Enterprise LMS Suite',
      desc: isVi
        ? 'Hệ thống quản lý học tập trực tuyến, khảo thí bảo mật và đánh giá lộ trình phát triển kỹ năng cho doanh nghiệp.'
        : 'Multi-tenant corporate learning management platform supporting enterprise skill verification.',
      status: isVi ? 'Đang vận hành' : 'In Production',
      color: '#f5a623',
      href: '/linh-vuc',
    },
  ];

  return (
    <section
      data-sc-act="flow"
      className="py-24 bg-[#f8fafc] text-[#1d1d1f] border-t border-gray-200/80 relative overflow-hidden"
    >
      <div className="container-main max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#046842]/8 border border-[#046842]/20 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#046842]">
                {isVi ? 'Dự Án Tiêu Biểu' : 'Featured Ventures'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1d1d1f]">
              {isVi ? 'Hiện Thực Hóa Năng Lực Công Nghệ' : 'Proven Technological Execution'}
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#4b5563]">
            {isVi
              ? 'Tất cả các sản phẩm và dự án của Phúc Thành Holding đều được xây dựng trên nền tảng độc lập, có thể xác thực và kiểm chứng năng lực vận hành.'
              : 'Every project is engineered with independent rigor, transparent operational verifiability, and long-term durability.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ventures.map((venture) => (
            <div
              key={venture.id}
              data-sc-tilt="8"
              data-sc-spotlight
              className="bg-white rounded-3xl border border-gray-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] p-8 flex flex-col justify-between group transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full border"
                    style={{
                      borderColor: `${venture.color === '#00f0b5' ? '#046842' : venture.color}30`,
                      backgroundColor: `${venture.color === '#00f0b5' ? '#046842' : venture.color}10`,
                      color: venture.color === '#00f0b5' ? '#046842' : venture.color === '#f5a623' ? '#d97706' : venture.color,
                    }}
                  >
                    {venture.tag}
                  </span>
                  <span className="text-xs font-medium text-gray-400">{venture.status}</span>
                </div>
                <h3 className="text-xl font-bold text-[#1d1d1f] mb-3 group-hover:text-[#046842] transition-colors">
                  {venture.name}
                </h3>
                <p className="text-sm text-[#4b5563] leading-relaxed mb-6">
                  {venture.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <a
                  href={localizeLegacyHref(venture.href, lang)}
                  className="text-xs font-bold text-[#046842] hover:text-[#025938] flex items-center gap-1.5 transition-colors"
                >
                  <span>{isVi ? 'Xem chi tiết giải pháp' : 'Explore architecture'}</span>
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
