'use client';

import Image from 'next/image';
import { Zap, Rocket, Users, Gauge } from 'lucide-react';
import { useTheme } from '@wrksz/themes/client';
import { Counter } from '@/components/Counter';
import { site } from '@/lib/site';
import { clientLogoPairs, clientLogoSrc } from '@/content/client-logos';

export function SocialProof() {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'light' ? 'light' : 'dark';

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20 relative">
        <div className="text-center">
          <span className="eyebrow" data-num="01">Trusted globally</span>
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {clientLogoPairs.map((pair) => (
            <div
              key={pair.alt}
              className="logo-chip logo-chip--brand flex items-center justify-center min-h-[52px] px-3 py-2.5"
            >
              <Image
                src={clientLogoSrc(pair, theme)}
                alt={pair.alt}
                width={180}
                height={56}
                className="h-7 w-auto max-w-[min(100%,140px)] object-contain object-center sm:h-8"
                sizes="(max-width: 640px) 42vw, 140px"
              />
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4">
          <div className="card p-8 relative overflow-hidden">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="eyebrow" data-num="—">Impact</div>
                <div className="mt-4 metric-big" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}>
                  <Counter target={site.stats.hoursAutomated} suffix="+" />
                </div>
                <div className="metric-label">hours automated · lifetime</div>
                <p className="mt-6 max-w-sm text-sm text-[var(--muted)] leading-relaxed">
                  Workflows across lead routing, CRM sync, content pipelines, and support —{' '}
                  <span className="serif text-[var(--text)]">running 24/7</span> so teams don't have to.
                </p>
              </div>
              <div className="hidden sm:grid h-28 w-28 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] place-items-center shrink-0">
                <Zap className="h-10 w-10 text-[var(--primary)]" />
              </div>
            </div>
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(400px 200px at 90% 100%, rgb(var(--shadow-color) / 0.14), transparent 70%)' }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="stat-mosaic-card card card-hover flex flex-row items-center justify-between gap-4 p-5 sm:flex-col sm:items-stretch sm:justify-between sm:gap-0 sm:p-6">
              <span className="stat-mosaic-card__wash" aria-hidden />
              <span className="stat-mosaic-card__dots" aria-hidden />
              <span className="stat-mosaic-card__ring stat-mosaic-card__ring--tr" aria-hidden />
              <span className="stat-mosaic-card__ring stat-mosaic-card__ring--bl" aria-hidden />
              <div className="stat-mosaic-card__icon relative z-[1] shrink-0">
                <Rocket className="h-5 w-5 text-[var(--primary)]" />
              </div>
              <div className="relative z-[1] min-w-0 text-right sm:text-left">
                <div className="metric-big">
                  <Counter target={site.stats.projectsShipped} suffix="+" />
                </div>
                <div className="metric-label">projects shipped</div>
              </div>
            </div>
            <div className="stat-mosaic-card card card-hover flex flex-row items-center justify-between gap-4 p-5 sm:flex-col sm:items-stretch sm:justify-between sm:gap-0 sm:p-6">
              <span className="stat-mosaic-card__wash" aria-hidden />
              <span className="stat-mosaic-card__dots" aria-hidden />
              <span className="stat-mosaic-card__ring stat-mosaic-card__ring--tr" aria-hidden />
              <span className="stat-mosaic-card__ring stat-mosaic-card__ring--bl" aria-hidden />
              <div className="stat-mosaic-card__icon relative z-[1] shrink-0">
                <Users className="h-5 w-5 text-[var(--primary)]" />
              </div>
              <div className="relative z-[1] min-w-0 text-right sm:text-left">
                <div className="metric-big">
                  <Counter target={site.stats.clientTeams} suffix="+" />
                </div>
                <div className="metric-label">client teams</div>
              </div>
            </div>
            <div className="stat-mosaic-card card card-hover flex flex-row items-center justify-between gap-4 p-5 sm:flex-col sm:items-stretch sm:justify-between sm:gap-0 sm:p-6">
              <span className="stat-mosaic-card__wash" aria-hidden />
              <span className="stat-mosaic-card__dots" aria-hidden />
              <span className="stat-mosaic-card__ring stat-mosaic-card__ring--tr" aria-hidden />
              <span className="stat-mosaic-card__ring stat-mosaic-card__ring--bl" aria-hidden />
              <div className="stat-mosaic-card__icon relative z-[1] shrink-0">
                <Gauge className="h-5 w-5 text-[var(--primary)]" />
              </div>
              <div className="relative z-[1] min-w-0 text-right sm:text-left">
                <div className="metric-big">
                  <Counter target={site.stats.lighthouseScore} suffix="+" />
                </div>
                <div className="metric-label">lighthouse</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
