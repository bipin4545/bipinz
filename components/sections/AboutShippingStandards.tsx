import { Gauge, Braces, Activity, BookMarked } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const items: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Gauge,
    title: 'Performance budgets',
    description:
      'Core Web Vitals and real-user metrics are part of acceptance — not an afterthought. Fast pages are treated as product quality, not polish.',
  },
  {
    icon: Braces,
    title: 'Typed, reviewable code',
    description:
      'TypeScript-first Next.js, sensible boundaries between modules, and PR-sized changes so your team can onboard without archaeology.',
  },
  {
    icon: Activity,
    title: 'Observable automation',
    description:
      'n8n and agent workflows ship with logging, failure paths, and alerts where they matter — so silent breakage is not the default.',
  },
  {
    icon: BookMarked,
    title: 'Handoff-ready docs',
    description:
      'READMEs, env templates, deploy notes, and runbooks for anything non-obvious. You should not need me in the loop to keep shipping.',
  },
];

export function AboutShippingStandards() {
  return (
    <section className="relative border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-2xl">
          <span className="eyebrow" data-num="11">
            Standards
          </span>
          <h2 className="h-section mt-4">
            What <span className="serif text-[var(--primary)]">quality</span> looks like on my builds
          </h2>
          <p className="mt-3 text-[var(--muted)] leading-relaxed">
            These are the bar I hold myself to — whether the engagement is a greenfield app, a migration, or automation behind the scenes.
          </p>
        </div>

        <div className="mt-12 guarantees-grid">
          {items.map(({ icon: Icon, title, description }) => (
            <div key={title} className="guarantee">
              <div className="guarantee-icon">
                <Icon className="h-5 w-5 text-[var(--primary)]" />
              </div>
              <div className="guarantee-title">{title}</div>
              <p className="guarantee-desc">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
