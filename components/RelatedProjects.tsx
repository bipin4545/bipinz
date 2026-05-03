import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Project } from '@/lib/types';

/**
 * Related projects by shared tech stack. Keeps visitors in the
 * case-studies funnel and builds topical authority for tech keywords.
 */
export function RelatedProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section aria-label="Related projects" className="border-t border-[var(--border)] pt-12 mt-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <div className="eyebrow" data-num="—">More Work</div>
          <h2 className="h-section mt-3">
            Similar <span className="serif text-[var(--primary)]">projects</span>
          </h2>
        </div>
        <Link href="/work" className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[var(--primary)] link-underline">
          All case studies <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="card card-hover p-8 block"
          >
            <div className="flex items-center justify-between text-xs text-[var(--muted)] mono">
              <span>{project.clientType}</span>
              <span className="tech-pill">{project.tag}</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold leading-snug tracking-tight">
              {project.title}{' '}
              <span className="serif text-[var(--primary)]">{project.titleAccent}</span>
            </h3>
            <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed line-clamp-2">
              {project.pitch}
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {project.metrics.map((m, i) => (
                <div key={i}>
                  <div className="text-base font-semibold">{m.value}</div>
                  <div className="text-[10px] text-[var(--muted)] mono uppercase tracking-wider">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
