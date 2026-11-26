import { useTranslation } from 'react-i18next';
import { legalInfo } from '@/mocks/contact';
import useLang from '@/hooks/useLang';
import ContactForm from './ContactForm';

interface ProposalFormSectionProps {
  selectedField: string;
}

export default function ProposalFormSection({ selectedField }: ProposalFormSectionProps) {
  const { t } = useTranslation();
  const lang = useLang();

  const contactChannels = [
    {
      id: 1,
      icon: 'ri-map-pin-line',
      label: t('contact.channelAddress'),
      value: legalInfo[lang].address,
    },
    {
      id: 2,
      icon: 'ri-phone-line',
      label: t('contact.channelPhone'),
      value: legalInfo[lang].hotline,
      href: 'tel:0343089666',
    },
    {
      id: 3,
      icon: 'ri-mail-line',
      label: t('contact.channelEmail'),
      value: legalInfo[lang].email,
      href: 'mailto:info@phucthanhholding.com',
    },
    {
      id: 4,
      icon: 'ri-time-line',
      label: t('contact.channelHours'),
      value: legalInfo[lang].workingHours,
    },
  ];

  return (
    <section id="gui-de-xuat" className="scroll-mt-24 py-12 md:py-16 bg-background-50">
      <div className="container-main">
        <div className="text-center mb-8 md:mb-10 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
            <i className="ri-send-plane-line w-3.5 h-3.5 flex items-center justify-center" />
            {t('contact.formBadge')}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 tracking-tight">
            {t('contact.formTitle')}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 mt-3 leading-relaxed">
            {t('contact.formDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-background-50 border border-background-200/70 rounded-lg p-6">
              <h3 className="text-base font-bold text-foreground-900 mb-5">{t('contact.directChannels')}</h3>
              <ul className="space-y-4">
                {contactChannels.map((item) => (
                  <li key={item.id} className="flex items-start gap-3">
                    <span className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 shrink-0">
                      <i className={`${item.icon} w-5 h-5 flex items-center justify-center text-lg`} />
                    </span>
                    <div>
                      <p className="text-xs text-foreground-500 mb-0.5">{item.label}</p>
                      {'href' in item && item.href ? (
                        <a
                          href={item.href}
                          className="text-sm text-primary-600 font-medium hover:text-primary-700 hover:underline transition-colors leading-relaxed"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-foreground-900 leading-relaxed">{item.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background-50 border border-background-200/70 rounded-lg overflow-hidden">
              <iframe
                title={t('contact.inviteImageTitle')}
                src="https://maps.google.com/maps?q=424+Duong+Me+Linh,+Vinh+Phuc,+Phu+Tho,+Vietnam&z=15&output=embed"
                className="w-full h-[240px] border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <ContactForm selectedField={selectedField} />
          </div>
        </div>
      </div>
    </section>
  );
}