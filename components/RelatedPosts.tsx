import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Post } from '@/lib/types';

/**
 * Related posts section. Internal linking is one of the highest-impact
 * SEO levers — signals topic authority to Google and keeps users on-site.
 *
 * Best practice: 3 related items, contextually similar (same category).
 */
export function RelatedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section aria-label="Related articles" className="border-t border-[var(--border)] pt-12 mt-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <div className="eyebrow" data-num="—">Keep Reading</div>
          <h2 className="h-section mt-3">
            Related <span className="serif text-[var(--primary)]">articles</span>
          </h2>
        </div>
        <Link href="/blog" className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[var(--primary)] link-underline">
          All articles <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="card card-hover p-6 block">
            <div className="flex items-center gap-2 text-xs text-[var(--muted)] mono">
              <span className="tech-pill">{post.category}</span>
              <span className="ml-auto">{post.readTime}</span>
            </div>
            <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight">
              {post.title} {post.titleAccent}
            </h3>
            <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
            <div className="mt-4 text-xs text-[var(--primary)] mono inline-flex items-center gap-1">
              Read article <ArrowRight className="h-3 w-3" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
