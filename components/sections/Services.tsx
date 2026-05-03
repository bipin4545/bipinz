import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { services } from '@/content/services';
import { HugeBgNumber } from '@/components/HugeBgNumber';

export function Services() {
  return (
    <section id="services" className="relative border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24 relative">
        <HugeBgNumber style={{ right: -40, top: 40 }}>02</HugeBgNumber>

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="max-w-xl min-w-0">
            <span className="eyebrow" data-num="02">Services</span>
            <h2 className="h-section mt-4">
              Built for <span className="serif text-[var(--primary)]">growing teams</span>
            </h2>
            <p className="mt-3 text-[var(--muted)] leading-relaxed">
              Clear scopes, measurable outcomes, and a build system that stays maintainable after launch.
            </p>
          </div>
          <Link href="/contact" className="btn btn-ghost h-11 shrink-0 px-4 text-sm w-full sm:w-auto justify-center">
            Get a scope in 48h <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 relative">
          {services.map((service) => (
            <Link
              key={service.slug}
              href="/contact"
              className={`service-row block ${service.featured ? 'service-row-featured' : ''}`}
            >
              <div className="service-row-num">{service.num}</div>
              <div className="service-row-main">
                <div className="service-row-body">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="service-row-title">{service.title}</div>
                    {service.featured && (
                      <span className="tech-pill inline-flex items-center gap-1">
                        <Sparkles className="h-3 w-3" /> Flagship
                      </span>
                    )}
                  </div>
                  <p className="service-row-desc">{service.description}</p>
                  <div className="service-row-meta">
                    {service.techPills.map((pill) => (
                      <span key={pill} className="tech-pill">{pill}</span>
                    ))}
                  </div>
                </div>
                {service.image && (
                  <div className="service-row-thumb">
                    <Image
                      src={service.image}
                      alt={service.imageAlt ?? ''}
                      fill
                      sizes="(max-width: 720px) 85vw, 228px"
                      className="object-cover object-center"
                      priority={service.featured}
                    />
                  </div>
                )}
              </div>
              <div className="service-row-right">
                <div className="service-row-price">{service.price}</div>
                <span className="service-arrow">
                  {service.cta} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
