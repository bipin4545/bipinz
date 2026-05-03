import { Globe, MessageSquare, ListChecks, HandCoins } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { site } from '@/lib/site';

const items: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Globe,
    title: 'Timezone-friendly',
    description: `Based in ${site.location} (${site.timezone}). I work async-first with US, UK, and EU teams — written updates, Loom walkthroughs, and calls when decisions need real-time alignment.`,
  },
  {
    icon: MessageSquare,
    title: 'Clear channels',
    description:
      'Decisions land in email or a shared doc. Day-to-day can live in Slack or Discord if you already use them — nothing important trapped in DMs alone.',
  },
  {
    icon: ListChecks,
    title: 'Milestone-based delivery',
    description:
      'Scope is broken into milestones you can review. You always know what is in progress, what is next, and what “done” means for each slice.',
  },
  {
    icon: HandCoins,
    title: 'Predictable commercial rhythm',
    description:
      'Invoices map to agreed milestones — no surprise retainers. If scope shifts, we re-estimate together before the build changes direction.',
  },
];

export function AboutCollaboration() {
  return (
    <section className="relative border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-2xl">
          <span className="eyebrow" data-num="10">
            Collaboration
          </span>
          <h2 className="h-section mt-4">
            How we stay aligned <span className="serif text-[var(--primary)]">remotely</span>
          </h2>
          <p className="mt-3 text-[var(--muted)] leading-relaxed">
            International clients need clarity more than hours in the same room. These are the defaults on every engagement.
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
