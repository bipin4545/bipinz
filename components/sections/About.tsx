import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { SITE_TECH_STACK } from '@/content/site-tech-stack';
import { site } from '@/lib/site';
import { HugeBgNumber } from '@/components/HugeBgNumber';
import { Counter } from '@/components/Counter';

export function About({ priorityPhoto = false }: { priorityPhoto?: boolean }) {
  return (
    <section id="about" className="relative border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24 relative">
        <HugeBgNumber style={{ right: -20, top: 40 }}>06</HugeBgNumber>

        <div className="relative">
          <span className="eyebrow" data-num="06">About</span>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[minmax(260px,340px)_1fr] gap-10 lg:gap-14 items-start">
            <div>
              <div className="about-photo">
                <Image
                  src={site.aboutPhoto.src}
                  alt={site.aboutPhoto.alt}
                  fill
                  sizes="(max-width: 1024px) min(100vw, 420px), 340px"
                  className="about-photo__img object-cover object-[center_18%]"
                  priority={priorityPhoto}
                />
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-[var(--muted)] mono">
                <span className="lime-dot" />
                <span>Based in {site.location}</span>
              </div>
            </div>

            <div>
              <h2 className="h-editorial">
                Built for SaaS teams that care about{' '}
                <span className="serif text-[var(--primary)]">speed</span> &{' '}
                <span className="serif text-[var(--primary)]">reliability</span>.
              </h2>

              <blockquote className="mt-8 border-l-2 border-[var(--primary)] pl-5 py-1">
                <p className="serif text-xl sm:text-2xl leading-snug" style={{ fontStyle: 'italic' }}>
                  {site.bio.pullQuote}
                </p>
              </blockquote>

              <div className="mt-6 text-[15px] text-[var(--muted)] leading-relaxed space-y-4">
                {site.bio.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-[var(--border)]">
                <p className="mono text-[10px] uppercase tracking-[0.32em] text-[var(--subtle)]">In the credits</p>
                <p className="mt-3 text-base sm:text-lg text-[var(--muted)] leading-snug tracking-tight max-w-lg">
                  {site.bio.signatureLead}
                </p>
                <p className="font-signature mt-4 text-[1.65rem] sm:text-[1.85rem] leading-snug text-[var(--text)] tracking-wide">
                  {site.name}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-0 border-y border-[var(--border)]">
            <div className="py-6 sm:py-8 px-4 sm:px-6 border-r border-[var(--border)]">
              <div className="metric-big"><Counter target={site.stats.yearsShipping} suffix="+" /></div>
              <div className="metric-label">years shipping</div>
            </div>
            <div className="py-6 sm:py-8 px-4 sm:px-6 sm:border-r border-[var(--border)]">
              <div className="metric-big"><Counter target={site.stats.projectsShipped} suffix="+" /></div>
              <div className="metric-label">projects delivered</div>
            </div>
            <div className="py-6 sm:py-8 px-4 sm:px-6 border-t sm:border-t-0 border-r border-[var(--border)]">
              <div className="metric-big"><Counter target={site.stats.countriesServed} /></div>
              <div className="metric-label">countries served</div>
            </div>
            <div className="py-6 sm:py-8 px-4 sm:px-6 border-t sm:border-t-0 border-[var(--border)]">
              <div className="metric-big"><Counter target={site.stats.onTimeDelivery} suffix="%" /></div>
              <div className="metric-label">on-time delivery</div>
            </div>
          </div>

          <div className="mt-12">
            <div className="text-xs mono text-[var(--muted)] tracking-widest uppercase mb-5">
              Stack I work with
            </div>
            <div className="flex flex-wrap gap-3">
              {SITE_TECH_STACK.map((row) => (
                <span key={row.label} className="tech-pill-lg">
                  <span className="flex shrink-0 items-center gap-1 opacity-90" aria-hidden>
                    {row.lucideLeading === 'sparkles' ? (
                      <Sparkles className="h-5 w-5" strokeWidth={1.75} />
                    ) : null}
                    {row.icons.map((icon) => (
                      <svg
                        key={icon.slug}
                        role="img"
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                      >
                        <path fill="currentColor" d={icon.path} />
                      </svg>
                    ))}
                  </span>
                  {row.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
