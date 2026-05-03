import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { processSteps } from '@/content/misc';
import { HugeBgNumber } from '@/components/HugeBgNumber';

export function Process() {
  return (
    <section className="relative border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20 relative">
        <HugeBgNumber style={{ left: -20, top: 20 }}>04</HugeBgNumber>

        <div className="relative text-center max-w-2xl mx-auto">
          <span className="eyebrow" data-num="04" style={{ justifyContent: 'center' }}>Process</span>
          <h2 className="h-section mt-4">
            How we'll <span className="serif text-[var(--primary)]">work together</span>
          </h2>
          <p className="mt-3 text-[var(--muted)] leading-relaxed">
            Designed for async collaboration. No chaos, no surprises.
          </p>
        </div>

        <div className="mt-14 process-compact">
          {processSteps.map((step) => (
            <div key={step.num} className="pc-step">
              <div className="pc-circle">{step.num}</div>
              <div className="pc-title">{step.title}</div>
              <div className="pc-meta">{step.meta}</div>
              <div className="pc-desc">{step.description}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/contact" className="btn btn-primary h-11 px-5 text-sm inline-flex">
            Start with a Discovery Call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
