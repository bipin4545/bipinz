import { site } from '@/lib/site';

function formatHoursShort(n: number): string {
  if (n >= 1_000_000) return `${Math.floor(n / 1_000_000)}M+`;
  if (n >= 1000) return `${Math.floor(n / 1000)}K+`;
  return `${n}+`;
}

export function WorkPageHero() {
  const hours = formatHoursShort(site.stats.hoursAutomated);
  const meta = `${site.stats.projectsShipped}+ projects shipped · ${hours} hours automated · ${site.stats.lighthouseScore}+ avg Lighthouse · ${site.stats.countriesServed} countries`;

  return (
    <header className="relative border-b border-[var(--border)] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] dark:opacity-[0.12]"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 20% 0%, rgba(103, 61, 230, 0.45), transparent 55%), radial-gradient(ellipse 50% 40% at 90% 20%, rgba(103, 61, 230, 0.2), transparent 50%)',
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20 lg:py-24">
        <p className="text-xs font-mono tracking-[0.2em] text-[var(--primary)] uppercase">
          02 · WORK
        </p>
        <h1 className="mt-5 h-display max-w-3xl">
          The <span className="serif text-[var(--primary)] italic">work</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--muted)] leading-relaxed">
          Production outcomes from SaaS teams across India, US, and EU. Real metrics, no vanity screenshots.
        </p>
        <p className="mt-8 text-sm font-mono text-[var(--text)]/80 tracking-tight">{meta}</p>
      </div>
    </header>
  );
}
