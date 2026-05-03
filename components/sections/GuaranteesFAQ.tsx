import Link from 'next/link';
import { Clock, Gauge, ShieldCheck, LifeBuoy, Mail, Plus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { guarantees } from '@/content/misc';
import { faqs } from '@/content/faqs';
import { site } from '@/lib/site';
import { HugeBgNumber } from '@/components/HugeBgNumber';

const iconMap: Record<string, LucideIcon> = {
  clock: Clock,
  gauge: Gauge,
  'shield-check': ShieldCheck,
  'life-buoy': LifeBuoy,
};

export function Guarantees() {
  return (
    <section className="relative border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-2xl">
          <span className="eyebrow" data-num="—">Promises</span>
          <h2 className="h-section mt-4">
            What I <span className="serif text-[var(--primary)]">guarantee</span> you
          </h2>
          <p className="mt-3 text-[var(--muted)] leading-relaxed">
            Concrete commitments. If I miss one, it's on me.
          </p>
        </div>

        <div className="mt-10 guarantees-grid">
          {guarantees.map((g) => {
            const Icon = iconMap[g.icon] ?? Clock;
            return (
              <div key={g.title} className="guarantee">
                <div className="guarantee-icon">
                  <Icon className="h-5 w-5 text-[var(--primary)]" />
                </div>
                <div className="guarantee-title">{g.title}</div>
                <p className="guarantee-desc">{g.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FAQSection({ limit }: { limit?: number }) {
  const items = limit ? faqs.slice(0, limit) : faqs;

  return (
    <section id="faq" className="relative border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24 relative">
        <HugeBgNumber style={{ right: -20, top: 20 }}>?</HugeBgNumber>

        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12">
          <div>
            <span className="eyebrow" data-num="08">FAQ</span>
            <h2 className="h-section mt-4">
              Questions, <span className="serif text-[var(--primary)]">answered</span>
            </h2>
            <p className="mt-4 text-[var(--muted)] leading-relaxed max-w-md">
              The questions I get most often before we start working together. Don't see yours? Just ask.
            </p>
            <a href={`mailto:${site.email}`} className="btn btn-ghost h-11 px-4 text-sm mt-6">
              <Mail className="h-4 w-4" /> Ask a question
            </a>
            {limit && (
              <div className="mt-4">
                <Link href="/faq" className="text-sm font-semibold text-[var(--primary)] link-underline">
                  View all FAQs →
                </Link>
              </div>
            )}
          </div>

          <div>
            {items.map((faq) => (
              <details key={faq.num} className="faq-item">
                <summary>
                  <div className="faq-num">{faq.num}</div>
                  <div className="faq-q">{faq.question}</div>
                  <div className="faq-icon"><Plus className="h-4 w-4" /></div>
                </summary>
                <div className="faq-a">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
