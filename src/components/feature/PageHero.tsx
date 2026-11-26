interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  badge?: string;
  badgeIcon?: string;
  title: string;
  description?: string;
  breadcrumb: BreadcrumbItem[];
  image: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function PageHero({
  badge,
  badgeIcon,
  title,
  description,
  breadcrumb,
  image,
  ctaLabel,
  ctaHref,
}: PageHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-primary-900">
      <img
        src={image}
        alt={title ? `${title} - Phuc Thanh Holding` : 'Phuc Thanh Holding'}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-950/90 via-primary-900/85 to-primary-800/70" />

      <div className="relative z-10 container-main py-10 md:py-16 flex flex-col justify-center min-h-[260px] md:min-h-[340px]">
        <nav className="flex items-center gap-1.5 text-xs md:text-sm mb-4 flex-wrap" aria-label="Breadcrumb">
          {breadcrumb.map((item, idx) => {
            const isLast = idx === breadcrumb.length - 1;
            return (
              <span key={`${item.label}-${idx}`} className="flex items-center gap-1.5">
                {idx > 0 && (
                  <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center text-background-300" />
                )}
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-background-200 hover:text-accent-400 transition-colors whitespace-nowrap"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span
                    className={`${
                      isLast ? 'text-accent-400 font-medium' : 'text-background-200'
                    } whitespace-nowrap`}
                  >
                    {item.label}
                  </span>
                )}
              </span>
            );
          })}
        </nav>

        {badge && (
          <span className="inline-flex items-center gap-2 self-start px-3 py-1 text-xs font-semibold tracking-widest bg-accent-500/15 text-accent-400 rounded-full mb-4">
            {badgeIcon && (
              <i className={`${badgeIcon} w-3.5 h-3.5 flex items-center justify-center`} />
            )}
            {badge}
          </span>
        )}

        <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 tracking-tight">
          {title}
        </h1>

        {description && (
          <p className="text-sm md:text-base text-background-200 max-w-2xl mb-6 leading-relaxed">
            {description}
          </p>
        )}

        {ctaLabel && ctaHref && (
          <div>
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-accent-500 text-foreground-950 rounded-md hover:bg-accent-400 transition-colors whitespace-nowrap"
            >
              {ctaLabel}
              <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}