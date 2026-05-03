import Image from 'next/image';
import { Quote } from 'lucide-react';
import { allTestimonials, testimonialsMarqueeRow2 } from '@/content/testimonials';
import { site } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import type { Testimonial } from '@/lib/types';

function TestimonialAvatarBlock({ avatar }: { avatar: Testimonial['avatar'] }) {
  if (avatar.kind === 'none') return null;
  if (avatar.kind === 'photo') {
    return (
      <div className="t-avatar-wrap mb-5">
        <Image
          src={avatar.src}
          alt={avatar.alt}
          width={56}
          height={56}
          className="h-14 w-14 rounded-full object-cover ring-1 ring-[var(--border)]"
          sizes="56px"
        />
      </div>
    );
  }
  return (
    <div className="t-avatar-wrap mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-2">
      <Image
        src={avatar.src}
        alt={avatar.alt}
        width={40}
        height={40}
        className="h-full w-full object-contain opacity-90 grayscale contrast-125"
        sizes="40px"
      />
    </div>
  );
}

function TestimonialCard({ t, ariaHidden }: { t: Testimonial; ariaHidden?: boolean }) {
  const attr = t.attribution;

  return (
    <article
      className="t-card t-card--marquee flex h-full min-h-0 flex-col overflow-hidden"
      aria-hidden={ariaHidden}
    >
      <Quote className="h-5 w-5 shrink-0 text-[var(--primary)] opacity-70" aria-hidden />
      <TestimonialAvatarBlock avatar={t.avatar} />
      <p className="t-quote t-quote--marquee mt-2 min-h-0 flex-1">{t.quote}</p>
      <div className="t-footer t-footer--marquee mt-auto shrink-0">
        <div className="min-w-0 flex-1 space-y-1">
          {attr.type === 'named' ? (
            <>
              <div className="t-name">{attr.fullName}</div>
              <div className="t-role">
                {attr.role} <span className="text-[var(--subtle)]">at</span>{' '}
                <span className="text-[var(--text)]">{attr.company}</span>
              </div>
            </>
          ) : (
            <div className="t-role text-[var(--text)]">{attr.line}</div>
          )}
        </div>
      </div>
    </article>
  );
}

function MarqueeRow({
  items,
  direction,
}: {
  items: Testimonial[];
  direction: 'ltr' | 'rtl';
}) {
  const doubled = [...items, ...items];

  return (
    <div
      className={`t-marquee-row ${direction === 'rtl' ? 't-marquee-row--rtl' : 't-marquee-row--ltr'}`}
    >
      <div className="t-marquee-track">
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} t={t} ariaHidden={i >= items.length} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: allTestimonials.map((t, i) => {
      const author =
        t.attribution.type === 'named'
          ? {
              '@type': 'Person',
              name: t.attribution.fullName,
              jobTitle: t.attribution.role,
              worksFor: { '@type': 'Organization', name: t.attribution.company },
            }
          : {
              '@type': 'Person',
              name: t.attribution.line,
            };

      return {
        '@type': 'Review',
        position: i + 1,
        author,
        itemReviewed: {
          '@type': 'ProfessionalService',
          '@id': `${site.url}/#business`,
          name: `${site.name} — AI-Powered Web Platforms`,
        },
        reviewBody: t.quote,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
          worstRating: '1',
        },
      };
    }),
  };

  return (
    <section className="relative border-t border-[var(--border)]">
      <JsonLd data={reviewSchema} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-xl min-w-0">
          <span className="eyebrow" data-num="05">
            Testimonials
          </span>
          <h2 className="h-section mt-4">
            What clients <span className="serif text-[var(--primary)]">say</span>
          </h2>
          <p className="mt-3 text-base text-[var(--muted)] leading-relaxed">
            Real outcomes from named teams and anonymous operators. Hover a row to pause and read.
          </p>
        </div>
      </div>

      {/* Full-bleed marquee rails — edge fade via mask */}
      <div className="t-marquee-shell relative left-1/2 w-screen -translate-x-1/2 pb-20 sm:pb-24">
        <div className="t-marquee-stack flex flex-col gap-6 md:gap-8">
          <MarqueeRow items={allTestimonials} direction="ltr" />
          <MarqueeRow items={testimonialsMarqueeRow2} direction="rtl" />
        </div>
      </div>
    </section>
  );
}
