import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { projects } from '@/content/projects';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BrowserMock } from '@/components/shared';
import { RelatedProjects } from '@/components/RelatedProjects';
import { Contact } from '@/components/sections/Contact';
import { getRelatedProjects } from '@/lib/reading-time';

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Project not found', robots: { index: false } };

  return buildMetadata({
    title: `${project.title} ${project.titleAccent}`,
    description: project.pitch,
    path: `/work/${project.slug}`,
    ogType: 'article',
    tags: project.techStack,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const related = getRelatedProjects(project, projects, 2);

  const caseStudySchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${site.url}/work/${project.slug}#case-study`,
    name: `${project.title} ${project.titleAccent}`,
    description: project.pitch,
    abstract: project.problem + ' ' + project.solution,
    url: `${site.url}/work/${project.slug}`,
    image:
      project.visual === 'image' && project.image
        ? `${site.url}${encodeURI(project.image)}`
        : `${site.url}/work/${project.slug}/opengraph-image`,
    creator: {
      '@type': 'Person',
      '@id': `${site.url}/#person`,
      name: site.name,
      url: site.url,
    },
    about: project.techStack.join(', '),
    keywords: [...project.techStack, project.clientType, project.tag],
    inLanguage: 'en-US',
    genre: 'Case Study',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${site.url}/work/${project.slug}`,
    },
  };

  return (
    <>
      <JsonLd data={caseStudySchema} />
      <article className="relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-20">
          <Breadcrumbs
            items={[
              { label: 'Work', href: '/work' },
              { label: project.title, href: `/work/${project.slug}` },
            ]}
          />

          <div className="mt-8">
            <div className="flex items-center gap-3 text-xs text-[var(--muted)] mono">
              <span>{project.clientType}</span>
              <span className="dot-sep" />
              <span className="tech-pill">{project.tag}</span>
            </div>

            <h1 className="h-display mt-4">
              {project.title} <span className="serif text-[var(--primary)]">{project.titleAccent}</span>
            </h1>

            <p className="mt-6 text-xl text-[var(--muted)] leading-relaxed">{project.pitch}</p>

            <div className="mt-10 grid grid-cols-1 gap-4 border-y border-[var(--border)] py-8 sm:grid-cols-3">
              {project.metrics.map((m, i) => (
                <div key={i}>
                  <div className="metric-big" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                    {m.value}
                  </div>
                  <div className="metric-label">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
              <section>
                <h2 className="text-xl font-semibold tracking-tight">The problem</h2>
                <p className="mt-3 text-[var(--muted)] leading-relaxed">{project.problem}</p>
              </section>
              <section>
                <h2 className="text-xl font-semibold tracking-tight">The solution</h2>
                <p className="mt-3 text-[var(--muted)] leading-relaxed">{project.solution}</p>
              </section>
            </div>

            <div className="mt-10">
              {project.visual === 'image' && project.image ? (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-2)]">
                  <Image
                    src={project.image}
                    alt={project.imageAlt ?? `${project.title} screenshot`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 896px) 100vw, 896px"
                    priority
                  />
                </div>
              ) : (
                <BrowserMock project={project} />
              )}
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-semibold tracking-tight">Tech stack</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((t) => (
                  <span key={t} className="tech-pill">{t}</span>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-ghost h-11 px-4 text-sm">
                  View Live <ExternalLink className="h-4 w-4" />
                </a>
              )}
              <Link href="/work" className="btn btn-ghost h-11 px-4 text-sm">
                ← Back to all work
              </Link>
              <Link href="/contact" className="btn btn-primary h-11 px-4 text-sm">
                Start a similar project <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <RelatedProjects projects={related} />
          </div>
        </div>
      </article>
      <Contact />
    </>
  );
}
