import { useTranslation } from 'react-i18next';

export default function InvitationSection() {
  const { t } = useTranslation();
  return (
    <section className="py-12 md:py-16 bg-background-50">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
              <i className="ri-team-line w-3.5 h-3.5 flex items-center justify-center" />
              {t('contact.inviteBadge')}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-4 tracking-tight">
              {t('contact.inviteTitle')}
            </h2>
            <p className="text-sm md:text-base text-foreground-600 leading-relaxed mb-4">
              {t('contact.inviteP1')}
            </p>
            <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
              {t('contact.inviteP2')}
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative w-full h-[240px] md:h-[320px] rounded-lg overflow-hidden bg-primary-100">
              <img
                src="https://readdy.ai/api/search-image?query=Abstract%20corporate%20collaboration%20concept%20with%20interconnected%20business%20network%20nodes%20and%20flowing%20golden%20data%20pathways%20forming%20a%20partnership%20symbol%2C%20geometric%20shapes%20representing%20teamwork%20and%20trust%2C%20deep%20emerald%20green%20gradient%20background%20with%20warm%20gold%20light%20accents%2C%20minimalist%20modern%20corporate%20illustration%20style%2C%20clean%20elegant%20composition%2C%20no%20human%20figures%2C%20no%20faces%2C%20professional%20digital%20art&width=900&height=650&seq=contact-invite-2&orientation=landscape&nocache=true"
                alt={t('contact.inviteImageAlt')}
                title={t('contact.inviteImageTitle')}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}