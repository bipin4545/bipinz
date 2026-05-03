'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import type { PortfolioServiceTag, Project } from '@/lib/types';
import { PORTFOLIO_SERVICE_LABELS } from '@/content/portfolio-filters';
import { uniquePortfolioServices } from '@/content/projects';
import { site } from '@/lib/site';
import { BrowserMock } from '@/components/shared';

type ServiceFilter = 'all' | PortfolioServiceTag;

function FeaturedVisual({ project }: { project: Project }) {
  if (project.visual === 'image' && project.image) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0b0b0f] dark:bg-[#0b0b0f]">
        <Image
          src={project.image}
          alt={project.imageAlt ?? project.title}
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 100vw, 52vw"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-transparent to-transparent opacity-80" />
      </div>
    );
  }
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0b0b0f] dark:bg-[#0b0b0f]">
      <div className="absolute left-1/2 top-4 w-[min(140%,56rem)] max-w-none -translate-x-1/2 scale-[0.52] origin-top sm:scale-[0.58] md:scale-[0.62]">
        <BrowserMock project={project} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-transparent to-transparent opacity-70" />
    </div>
  );
}

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const imageOnRight = index % 2 === 1;
  const topMetrics = project.metrics.slice(0, 3);
  const techShow = project.techStack.slice(0, 4);

  return (
    <article className="work-feat-card group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_1px_0_rgb(255_255_255/0.04)_inset] transition duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_20px_50px_-24px_rgb(103_61_230/0.35),0_0_0_1px_rgb(103_61_230/0.28)] dark:border-white/[0.08] dark:bg-[#0f0f12] dark:shadow-none">
      <Link href={`/work/${project.slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]">
        <div className="flex flex-col lg:flex-row lg:items-stretch">
          <div
            className={`relative min-h-0 w-full shrink-0 border-b border-[var(--border)] lg:w-[52%] lg:border-b-0 lg:border-r dark:border-white/[0.06] ${
              imageOnRight ? 'lg:order-2' : 'lg:order-1'
            } order-1`}
          >
            <div className="pointer-events-none absolute left-4 top-4 z-10 flex flex-wrap items-center gap-2">
              <span className="rounded-md border border-white/10 bg-black/45 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-white/90 backdrop-blur-sm dark:bg-black/55">
                {project.clientType}
              </span>
              <span className="rounded-md border border-[var(--primary)]/35 bg-[var(--primary)]/15 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[var(--text)] backdrop-blur-sm">
                {project.deliveryTag}
              </span>
            </div>
            <FeaturedVisual project={project} />
          </div>

          <div
            className={`flex flex-1 flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 ${
              imageOnRight ? 'lg:order-1' : 'lg:order-2'
            } order-2`}
          >
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)] sm:text-3xl lg:text-[1.65rem] lg:leading-snug">
              {project.title} <span className="serif text-[var(--primary)] italic">{project.titleAccent}</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">{project.pitch}</p>

            <div className="mt-6 grid grid-cols-3 gap-3 border-y border-[var(--border)] py-5 dark:border-white/[0.06]">
              {topMetrics.map((m, mi) => (
                <div key={`${m.label}-${mi}`} className="min-w-0">
                  <div className="text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">{m.value}</div>
                  <div className="mt-1 text-[10px] font-mono uppercase tracking-wider text-[var(--muted)]">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {techShow.map((t) => (
                <span key={t} className="tech-pill border-white/10 bg-white/[0.03] dark:border-white/[0.08]">
                  {t}
                </span>
              ))}
            </div>

            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] transition group-hover:gap-3">
              Read full case study <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function GridCard({ project }: { project: Project }) {
  const keyMetric = project.metrics[0];
  if (!project.image) return null;

  return (
    <article className="work-grid-card group flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] transition duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_16px_40px_-20px_rgb(103_61_230/0.35),0_0_0_1px_rgb(103_61_230/0.25)] dark:border-white/[0.08] dark:bg-[#0f0f12] dark:shadow-none opacity-100">
      <Link href={`/work/${project.slug}`} className="flex flex-1 flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-inset">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0b0b0f]">
          <Image
            src={project.image}
            alt={project.imageAlt ?? project.title}
            fill
            className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-wider text-[var(--muted)]">
            <span>{project.year}</span>
            <span className="text-[var(--primary)]">{keyMetric?.value}</span>
          </div>
          <h3 className="mt-2 text-base font-semibold leading-snug tracking-tight text-[var(--text)]">
            {project.title} <span className="serif text-[var(--primary)] italic">{project.titleAccent}</span>
          </h3>
          <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-[var(--muted)]">{project.pitch}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 3).map((t) => (
              <span key={t} className="tech-pill py-1 text-[10px]">
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}

export function WorkPortfolioClient({ projects: all }: { projects: Project[] }) {
  const featured = useMemo(() => all.filter((p) => p.featured), [all]);
  const nonFeatured = useMemo(() => all.filter((p) => !p.featured), [all]);

  const serviceOptions = useMemo(() => {
    const tags = uniquePortfolioServices();
    return ['all' as const, ...tags];
  }, []);

  const years = useMemo(() => {
    const y = [...new Set(all.map((p) => p.year))].sort((a, b) => b - a);
    return y;
  }, [all]);

  const [activeService, setActiveService] = useState<ServiceFilter>('all');
  const [yearFilter, setYearFilter] = useState<number | 'all'>('all');

  const filteredGrid = useMemo(() => {
    return nonFeatured.filter((p) => {
      const svcOk = activeService === 'all' || p.services.includes(activeService);
      const yearOk = yearFilter === 'all' || p.year === yearFilter;
      return svcOk && yearOk;
    });
  }, [nonFeatured, activeService, yearFilter]);

  return (
    <>
      <section className="border-b border-[var(--border)] bg-[var(--surface)]/25 dark:bg-transparent">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {serviceOptions.map((id) => {
                const label = id === 'all' ? 'All' : PORTFOLIO_SERVICE_LABELS[id];
                const active = activeService === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveService(id)}
                    className={`rounded-full border px-3.5 py-2 text-xs font-medium transition duration-200 ${
                      active
                        ? 'border-[var(--primary)] bg-[var(--primary)] text-white shadow-[0_0_20px_-4px_rgb(103_61_230/0.6)]'
                        : 'border-[var(--border)] bg-transparent text-[var(--muted)] hover:border-[var(--primary)]/40 hover:text-[var(--text)] dark:border-white/[0.1]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <div className="relative flex items-center gap-2">
              <label htmlFor="work-year" className="text-xs font-mono uppercase tracking-wider text-[var(--muted)]">
                Year
              </label>
              <div className="relative">
                <select
                  id="work-year"
                  value={yearFilter === 'all' ? 'all' : String(yearFilter)}
                  onChange={(e) => {
                    const v = e.target.value;
                    setYearFilter(v === 'all' ? 'all' : Number(v));
                  }}
                  className="work-year-select appearance-none rounded-lg border border-[var(--border)] bg-[var(--surface)] py-2 pl-3 pr-9 text-sm text-[var(--text)] outline-none transition hover:border-[var(--primary)]/40 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] dark:border-white/[0.1] dark:bg-[#0f0f12]"
                >
                  <option value="all">All years</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-xl">
            <span className="eyebrow" data-num="03">
              Featured case studies
            </span>
            <p className="mt-3 text-[var(--muted)] leading-relaxed">
              Deep product work — migrations, agents, and automation with measurable outcomes.
            </p>
          </div>
          <div className="mt-14 flex flex-col gap-14 lg:gap-20">
            {featured.map((p, i) => (
              <FeaturedCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow" data-num="04">
                All projects
              </span>
              <h2 className="h-section mt-3">
                More <span className="serif text-[var(--primary)] italic">builds</span>
              </h2>
            </div>
            <p className="max-w-md text-sm text-[var(--muted)]">
              Filter by service tag or year. Each card opens a full write-up.
            </p>
          </div>

          {filteredGrid.length === 0 ? (
            <p className="mt-12 rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface)]/50 px-6 py-10 text-center text-sm text-[var(--muted)] dark:border-white/[0.12] dark:bg-[#0f0f12]/80">
              No projects match this filter yet. Check back soon.
            </p>
          ) : (
            <ul key={`${activeService}-${yearFilter}`} className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredGrid.map((p, i) => (
                <li
                  key={p.slug}
                  className="motion-safe:animate-work-rise motion-reduce:animate-none opacity-0"
                  style={{ animationDelay: `${Math.min(i, 8) * 55}ms` }}
                >
                  <GridCard project={p} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="relative border-t border-[var(--border)] overflow-hidden">
        <div
          className="pointer-events-none absolute -left-1/4 top-1/2 h-[min(28rem,70vw)] w-[min(28rem,70vw)] -translate-y-1/2 rounded-full bg-violet-600/15 blur-[120px] dark:bg-violet-500/20"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-1/4 bottom-0 h-[min(22rem,55vw)] w-[min(22rem,55vw)] translate-y-1/3 rounded-full bg-purple-600/10 blur-[100px] dark:bg-purple-500/15"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="h-section text-balance">
              Have a <span className="serif text-[var(--primary)] italic">similar problem</span> to solve?
            </h2>
            <p className="mt-4 text-[var(--muted)] leading-relaxed">{site.availability}</p>
            <p className="mt-2 text-sm text-[var(--muted)]/90">Next openings: Q3 2026.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={site.social.calcom}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary h-12 px-6 text-sm inline-flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                Book a discovery call <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/services" className="btn btn-ghost h-12 px-6 text-sm w-full sm:w-auto justify-center">
                View services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
