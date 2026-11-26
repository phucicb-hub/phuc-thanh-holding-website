import useLang from '@/hooks/useLang';

export default function AppleMetrics() {
  const lang = useLang();
  const isVi = lang === 'vi';

  return (
    <section
      data-sc-act="flow"
      className="py-24 bg-[#f8fafc] text-[#1d1d1f] border-t border-gray-200/80 relative overflow-hidden"
    >
      <div className="container-main max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 text-center">
          {/* Metric 1 */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1d1d1f] mb-2">
              <span data-sc-count="0 99.99">99.99</span>
              <span className="text-[#046842] text-3xl sm:text-4xl ml-1">%</span>
            </div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-800 mb-1">
              {isVi ? 'Độ sẵn sàng hệ thống' : 'Platform Uptime'}
            </div>
            <p className="text-xs text-[#4b5563]">
              {isVi ? 'Hạ tầng dự phòng đa vùng' : 'Resilient multi-region infrastructure'}
            </p>
          </div>

          {/* Metric 2 */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1d1d1f] mb-2">
              <span data-sc-count="0 24">24</span>
              <span className="text-[#d97706] text-3xl sm:text-4xl ml-1">/7</span>
            </div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-800 mb-1">
              {isVi ? 'Giám sát An ninh mạng' : 'Active SecOps'}
            </div>
            <p className="text-xs text-[#4b5563]">
              {isVi ? 'Phòng thủ chủ động 24/7' : 'Round-the-clock proactive defense'}
            </p>
          </div>

          {/* Metric 3 */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1d1d1f] mb-2">
              <span data-sc-count="0 100">100</span>
              <span className="text-blue-600 text-3xl sm:text-4xl ml-1">%</span>
            </div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-800 mb-1">
              {isVi ? 'Dữ liệu được mã hóa' : 'Data Encryption'}
            </div>
            <p className="text-xs text-[#4b5563]">
              {isVi ? 'Bảo vệ tại chỗ & khi truyền' : 'End-to-end protection at rest and in transit'}
            </p>
          </div>

          {/* Metric 4 */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1d1d1f] mb-2">
              <span data-sc-count="0 4">4</span>
              <span className="text-[#046842] text-3xl sm:text-4xl ml-1">+</span>
            </div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-800 mb-1">
              {isVi ? 'Trụ cột phát triển' : 'Core Disciplines'}
            </div>
            <p className="text-xs text-[#4b5563]">
              {isVi ? 'Cộng hưởng giá trị bền vững' : 'Synchronized for sustainable impact'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
