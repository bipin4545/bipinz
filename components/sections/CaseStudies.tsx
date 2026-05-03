import Link from 'next/link';
import { ArrowRight, ExternalLink, Lock, Sparkles, Zap } from 'lucide-react';
import { projects } from '@/content/projects';
import { BrowserMock } from '@/components/shared';
import type { Project } from '@/lib/types';

function CaseStudyCard({ project, reverse }: { project: Project; reverse?: boolean }) {
  const Badge = () => {
    if (project.tag === 'Private') return <><Lock className="h-3 w-3 inline-block mr-1" />Private</>;
    if (project.tag === 'NDA') return <><Zap className="h-3 w-3 inline-block mr-1" />NDA</>;
    return <><Sparkles className="h-3 w-3 inline-block mr-1" />{project.tag}</>;
  };

  const numberStyle = reverse
    ? { left: -20, right: 'auto' as const }
    : undefined;

  return (
    <article className="card p-6 sm:p-10 relative overflow-hidden">
      <div className="case-number hidden sm:block" style={numberStyle}>{project.num}</div>
      <div
        className={`relative grid grid-cols-1 ${reverse ? 'lg:grid-cols-[1fr_1.15fr]' : 'lg:grid-cols-[1.15fr_1fr]'} gap-10 items-center`}
      >
        <div className={reverse ? 'order-2 lg:order-1' : ''}>
          {!reverse ? <BrowserMock project={project} /> : null}
          {reverse ? (
            <CaseStudyText project={project} Badge={Badge} />
          ) : null}
        </div>
        <div className={reverse ? 'order-1 lg:order-2' : ''}>
          {reverse ? <BrowserMock project={project} /> : null}
          {!reverse ? (
            <CaseStudyText project={project} Badge={Badge} />
          ) : null}
        </div>
      </div>
    </article>
  );
}

function CaseStudyText({ project, Badge }: { project: Project; Badge: React.FC }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-xs text-[var(--muted)] mono">{project.clientType}</div>
        <div className="tech-pill"><Badge /></div>
      </div>
      <h3 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">
        {project.title} <span className="serif text-[var(--primary)]">{project.titleAccent}</span>
      </h3>
      <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">{project.pitch}</p>

      <div className="mt-6 grid grid-cols-1 gap-4 border-y border-[var(--border)] py-5 sm:grid-cols-3">
        {project.metrics.map((m, i) => (
          <div key={i}>
            <div className="metric-big">{m.value}</div>
            <div className="metric-label">{m.label}</div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed">
        <span className="text-[var(--text)] font-medium">Problem:</span> {project.problem}{' '}
        <span className="text-[var(--text)] font-medium">Solution:</span> {project.solution}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.map((t) => (
          <span key={t} className="tech-pill">{t}</span>
        ))}
      </div>
      <div className="mt-5 flex gap-3">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-ghost h-10 px-4 text-sm">
            View Live <ExternalLink className="h-4 w-4" />
          </a>
        )}
        <Link
          href={`/work/${project.slug}`}
          className="text-sm font-semibold text-[var(--primary)] link-underline self-center"
        >
          Read Case Study <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

export function CaseStudies({ limit }: { limit?: number }) {
  const items = limit ? projects.slice(0, limit) : projects;

  return (
    <section id="work" className="relative border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="max-w-xl min-w-0">
            <span className="eyebrow" data-num="03">Selected Work</span>
            <h2 className="h-section mt-4">
              Recent <span className="serif text-[var(--primary)]">work</span>
            </h2>
            <p className="mt-3 text-[var(--muted)] leading-relaxed">
              Production outcomes: faster LCP, cleaner pipelines, higher conversion — no vanity screenshots.
            </p>
          </div>
          <Link href="/contact" className="btn btn-ghost h-11 shrink-0 px-4 text-sm w-full sm:w-auto justify-center">
            Share your requirements <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-10">
          {items.map((project, i) => (
            <CaseStudyCard key={project.slug} project={project} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
