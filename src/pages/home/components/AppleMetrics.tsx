import useLang from '@/hooks/useLang';

export default function AppleMetrics() {
  const lang = useLang();
  const isVi = lang === 'vi';

  return (
    <section
      data-sc-act="flow"
      className="py-24 bg-[#0a0c10] text-[#f5f5f7] border-t border-white/[0.06] relative overflow-hidden"
    >
      <div className="container-main max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 text-center">
          {/* Metric 1 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] apple-glass">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-2">
              <span data-sc-count="0 99.99">99.99</span>
              <span className="text-[#00f0b5] text-3xl sm:text-4xl ml-1">%</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/90 mb-1">
              {isVi ? 'Độ sẵn sàng hệ thống' : 'Platform Uptime'}
            </div>
            <p className="text-xs text-[#8b949e]">
              {isVi ? 'Hạ tầng dự phòng đa vùng' : 'Multi-region high availability'}
            </p>
          </div>

          {/* Metric 2 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] apple-glass">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-2">
              <span data-sc-count="0 24">24</span>
              <span className="text-[#f5a623] text-3xl sm:text-4xl ml-1">/7</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/90 mb-1">
              {isVi ? 'Giám sát An ninh mạng' : 'Active SecOps'}
            </div>
            <p className="text-xs text-[#8b949e]">
              {isVi ? 'Phòng thủ chủ động 24/7' : 'Continuous threat neutralization'}
            </p>
          </div>

          {/* Metric 3 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] apple-glass">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-2">
              <span data-sc-count="0 100">100</span>
              <span className="text-cyan-400 text-3xl sm:text-4xl ml-1">%</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/90 mb-1">
              {isVi ? 'Dữ liệu được mã hóa' : 'Data Encryption'}
            </div>
            <p className="text-xs text-[#8b949e]">
              {isVi ? 'Bảo vệ tại chỗ & khi truyền' : 'At-rest and in-transit'}
            </p>
          </div>

          {/* Metric 4 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] apple-glass">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-2">
              <span data-sc-count="0 4">4</span>
              <span className="text-emerald-400 text-3xl sm:text-4xl ml-1">+</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/90 mb-1">
              {isVi ? 'Trụ cột phát triển' : 'Core Disciplines'}
            </div>
            <p className="text-xs text-[#8b949e]">
              {isVi ? 'Cộng hưởng giá trị bền vững' : 'Unified holding capability'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
