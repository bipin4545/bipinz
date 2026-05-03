import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { posts } from '@/content/posts';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { RelatedPosts } from '@/components/RelatedPosts';
import { Contact } from '@/components/sections/Contact';
import {
  calculateReadingTime,
  toIsoDuration,
  getRelatedPosts,
} from '@/lib/reading-time';

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: 'Post not found', robots: { index: false } };

  return buildMetadata({
    title: `${post.title} ${post.titleAccent ?? ''}`.trim(),
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    ogType: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.publishedAt,
    authors: [site.name],
    tags: [post.category],
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const reading = calculateReadingTime(post.content ?? post.excerpt);
  const related = getRelatedPosts(post, posts, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${site.url}/blog/${post.slug}#article`,
    headline: `${post.title} ${post.titleAccent ?? ''}`.trim(),
    description: post.excerpt,
    image: `${site.url}/blog/${post.slug}/opengraph-image`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      '@id': `${site.url}/#person`,
      name: site.name,
      url: site.url,
    },
    publisher: {
      '@type': 'Person',
      '@id': `${site.url}/#person`,
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${site.url}/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords: [post.category, 'Next.js', 'SaaS', ...post.category.split(' ')].filter(
      (v, i, arr) => arr.indexOf(v) === i
    ),
    // Agency-level additions — better rich-result eligibility
    wordCount: reading.words,
    timeRequired: toIsoDuration(reading.minutes),
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    url: `${site.url}/blog/${post.slug}`,
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <article className="relative">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
          <Breadcrumbs
            items={[
              { label: 'Writing', href: '/blog' },
              { label: post.title, href: `/blog/${post.slug}` },
            ]}
          />

          {post.coverImage && (
            <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-card border border-[var(--border)] bg-[var(--surface-2)]">
              <Image
                src={post.coverImage}
                alt={
                  post.coverImageAlt ?? `${post.title} ${post.titleAccent ?? ''}`.trim()
                }
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 736px"
                priority
              />
            </div>
          )}

          <header className="mt-8">
            <div className="flex items-center gap-2 text-xs text-[var(--muted)] mono">
              <span className="tech-pill">{post.category}</span>
              <span>{reading.text}</span>
              <span className="dot-sep" />
              <time dateTime={post.publishedAt}>{post.date}</time>
            </div>

            <h1 className="h-display mt-5">
              {post.title}{' '}
              {post.titleAccent && (
                <span className="serif text-[var(--primary)]">{post.titleAccent}</span>
              )}
            </h1>

            <p className="mt-6 text-xl text-[var(--muted)] leading-relaxed">{post.excerpt}</p>

            <div className="mt-8 flex items-center gap-3 pb-8 border-b border-[var(--border)]">
              <div className="avatar avatar-1">{site.initial}</div>
              <div>
                <div className="font-semibold text-sm">{site.name}</div>
                <div className="text-xs text-[var(--muted)]">{site.tagline}</div>
              </div>
            </div>
          </header>

          {post.content && (
            <div
              className="mt-8 prose-blog"
              style={{
                fontSize: 17,
                lineHeight: 1.7,
                color: 'var(--muted)',
              }}
              dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(post.content) }}
            />
          )}

          <footer className="mt-16 pt-8 border-t border-[var(--border)]">
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <Link href="/blog" className="btn btn-ghost h-11 px-4 text-sm">
                <ArrowLeft className="h-4 w-4" /> All posts
              </Link>
              <Link href="/contact" className="btn btn-primary h-11 px-4 text-sm">
                Work with me <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </footer>

          <RelatedPosts posts={related} />
        </div>
      </article>
      <Contact />
    </>
  );
}

/**
 * Minimal markdown renderer (avoid adding MDX dependency for this demo).
 * TODO: Replace with proper MDX when you're ready. Supports: ##, ###, ``` code, lists.
 */
function renderSimpleMarkdown(md: string): string {
  return md
    .replace(/^## (.+)$/gm, '<h2 style="font-size:1.75rem;font-weight:600;margin:2rem 0 1rem;color:var(--text);letter-spacing:-0.02em;">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 style="font-size:1.25rem;font-weight:600;margin:1.5rem 0 0.75rem;color:var(--text);">$1</h3>')
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre style="background:var(--surface-2);border:1px solid var(--border);border-radius:10px;padding:16px;overflow-x:auto;font-size:13px;font-family:var(--font-mono);margin:1.5rem 0;"><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code style="background:var(--surface-2);padding:2px 6px;border-radius:4px;font-size:0.9em;font-family:var(--font-mono);">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong style="color:var(--text);">$1</strong>')
    .split(/\n\n+/)
    .map((para) => {
      if (para.startsWith('<h') || para.startsWith('<pre')) return para;
      if (/^-\s/.test(para)) {
        const items = para.split(/\n- /).map((s) => s.replace(/^-\s*/, ''));
        return `<ul style="margin:1rem 0;padding-left:1.5rem;list-style:disc;">${items.map((i) => `<li style="margin:0.5rem 0;">${i}</li>`).join('')}</ul>`;
      }
      return `<p style="margin:1rem 0;">${para}</p>`;
    })
    .join('');
}
