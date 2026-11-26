import { useState, type FormEvent } from 'react';
import useLang from '@/hooks/useLang';
import { company } from '@/lib/company';

export default function AppleTerminalCTA() {
  const lang = useLang();
  const isVi = lang === 'vi';

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    honeypot: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formState.honeypot) return; // Silent discard bot submission

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setFormState({ name: '', email: '', phone: '', message: '', honeypot: '' });
    }, 800);
  };

  return (
    <section
      id="lien-he"
      data-sc-act="flow"
      className="py-24 sm:py-32 bg-[#07080a] text-[#f5f5f7] border-t border-white/[0.08] relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-t from-[#00f0b5]/15 via-[#f5a623]/8 to-transparent blur-[160px] pointer-events-none rounded-full" />

      <div className="container-main max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Sovereign Identity & Contacts */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00f0b5]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
                {isVi ? 'Cổng Hợp Tác Doanh Nghiệp' : 'Enterprise Partnership Terminal'}
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              {isVi ? 'Đồng Hành Cùng Phúc Thành Holding.' : 'Partner with Phuc Thanh Holding.'}
            </h2>

            <p className="text-[#8b949e] text-sm sm:text-base leading-relaxed mb-8">
              {isVi
                ? 'Chúng tôi luôn chào đón các cơ hội hợp tác chiến lược, chuyển giao giải pháp công nghệ hoặc cùng đầu tư ươm tạo dự án số.'
                : 'We welcome strategic enterprise collaboration, technology transfer, and co-investment opportunities.'}
            </p>

            <div className="space-y-5 text-sm text-[#8b949e] border-t border-white/[0.08] pt-6">
              <div className="flex items-start gap-3.5">
                <i className="ri-building-line text-lg text-[#00f0b5] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-white/50">{isVi ? 'Pháp nhân chính thức' : 'Legal Entity'}</div>
                  <div className="text-white font-medium">{isVi ? company.nameVi : company.nameEn}</div>
                  <div className="text-xs text-[#00f0b5] mt-0.5">MST: {company.registrationNumber}</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <i className="ri-map-pin-line text-lg text-[#00f0b5] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-white/50">{isVi ? 'Địa chỉ trụ sở' : 'Headquarters'}</div>
                  <div className="text-white/90">{isVi ? company.addressVi : company.addressEn}</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <i className="ri-mail-send-line text-lg text-[#00f0b5] shrink-0" />
                <div>
                  <div className="text-xs text-white/50">{isVi ? 'Hòm thư điều hành' : 'Direct Email'}</div>
                  <a href={`mailto:${company.generalEmail}`} className="text-white hover:text-[#00f0b5] transition-colors font-medium">
                    {company.generalEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <i className="ri-phone-line text-lg text-[#00f0b5] shrink-0" />
                <div>
                  <div className="text-xs text-white/50">{isVi ? 'Đường dây nóng' : 'Hotline'}</div>
                  <a href={`tel:${company.phone}`} className="text-white hover:text-[#00f0b5] transition-colors font-medium">
                    {company.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Apple-Glass Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div
              data-sc-tilt="4"
              data-sc-spotlight
              className="apple-glass rounded-3xl p-8 sm:p-10 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {isVi ? 'Gửi Yêu Cầu Hợp Tác & Tư Vấn' : 'Submit Partnership Proposal'}
              </h3>
              <p className="text-xs sm:text-sm text-[#8b949e] mb-6">
                {isVi
                  ? 'Mọi thông tin liên hệ được bảo vệ nghiêm ngặt theo tiêu chuẩn bảo mật dữ liệu của Phúc Thành Holding.'
                  : 'All information is strictly safeguarded in compliance with sovereign data protection protocols.'}
              </p>

              {status === 'success' ? (
                <div className="p-6 rounded-2xl bg-[#00f0b5]/10 border border-[#00f0b5]/30 text-center animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-[#00f0b5]/20 flex items-center justify-center text-[#00f0b5] mx-auto mb-3">
                    <i className="ri-checkbox-circle-fill text-2xl" />
                  </div>
                  <h4 className="text-white font-bold text-base mb-1">
                    {isVi ? 'Đã gửi yêu cầu thành công!' : 'Proposal Submitted Successfully!'}
                  </h4>
                  <p className="text-xs text-[#8b949e]">
                    {isVi
                      ? 'Đội ngũ chuyên trách của Phúc Thành Holding sẽ liên hệ phản hồi trong thời gian sớm nhất.'
                      : 'Our executive team will reach out with a technical and partnership response shortly.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field for anti-bot */}
                  <input
                    type="text"
                    name="bot-protection"
                    value={formState.honeypot}
                    onChange={(e) => setFormState({ ...formState, honeypot: e.target.value })}
                    className="form-honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-1.5">
                        {isVi ? 'Họ và tên *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder={isVi ? 'Ví dụ: Nguyễn Văn An' : 'e.g., John Smith'}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00f0b5] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-1.5">
                        {isVi ? 'Số điện thoại *' : 'Phone Number *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="0912 xxx xxx"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00f0b5] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5">
                      {isVi ? 'Địa chỉ Email doanh nghiệp *' : 'Corporate Email Address *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00f0b5] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5">
                      {isVi ? 'Nội dung đề xuất / Yêu cầu giải pháp *' : 'Inquiry / Proposal Details *'}
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder={isVi ? 'Mô tả tóm tắt nhu cầu giải pháp phần mềm, y tế, đào tạo hoặc đầu tư...' : 'Brief summary of software, healthcare, training, or venture scope...'}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00f0b5] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3.5 rounded-xl bg-[#00f0b5] text-[#07080a] font-bold text-sm hover:bg-white hover:text-[#07080a] transition-all duration-300 shadow-[0_0_20px_rgba(0,240,181,0.3)] disabled:opacity-50"
                  >
                    {status === 'submitting'
                      ? (isVi ? 'Đang gửi...' : 'Transmitting...')
                      : (isVi ? 'Gửi Yêu Cầu Hợp Tác Ngay' : 'Submit Direct Proposal')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
