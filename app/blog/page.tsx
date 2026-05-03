import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { posts, getPostsByNewest } from '@/content/posts';
import { JsonLd } from '@/components/JsonLd';
import { SmallPostCard } from '@/components/sections/BlogPreview';

export const metadata: Metadata = buildMetadata({
  title: 'Writing — Notes on shipping faster',
  description:
    "Practical guides on Next.js, AI systems, and automations that don't break at 2 AM. Written from real production experience building SaaS platforms.",
  path: '/blog',
});

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: `${site.name} Blog`,
  description: 'Writing on Next.js, AI, automation, and technical SEO.',
  url: `${site.url}/blog`,
  author: { '@type': 'Person', name: site.name, url: site.url },
  blogPost: posts.map((p) => ({
    '@type': 'BlogPosting',
    headline: `${p.title} ${p.titleAccent ?? ''}`.trim(),
    description: p.excerpt,
    url: `${site.url}/blog/${p.slug}`,
    datePublished: p.publishedAt,
    author: { '@type': 'Person', name: site.name },
  })),
};

export default function BlogPage() {
  const sortedPosts = getPostsByNewest();

  return (
    <>
      <JsonLd data={blogSchema} />
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-2xl">
            <span className="eyebrow" data-num="07">Writing</span>
            <h1 className="h-section mt-4">
              Notes on shipping <span className="serif text-[var(--primary)]">faster</span>
            </h1>
            <p className="mt-4 text-lg text-[var(--muted)] leading-relaxed">
              Practical guides on Next.js, AI systems, and automations that don&apos;t break at 2 AM.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedPosts.map((post) => (
              <SmallPostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
