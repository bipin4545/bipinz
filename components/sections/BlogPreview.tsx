import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Gauge, GitBranch, Bot, MoveRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { getPostsByNewest } from '@/content/posts';
import type { Post } from '@/lib/types';

const iconMap: Record<string, LucideIcon> = {
  gauge: Gauge,
  'git-branch': GitBranch,
  bot: Bot,
  'move-right': MoveRight,
};

export function BlogPreview() {
  const previewPosts = getPostsByNewest().slice(0, 4);

  if (!previewPosts.length) return null;

  return (
    <section id="blog" className="relative border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="max-w-xl min-w-0">
            <span className="eyebrow" data-num="07">Writing</span>
            <h2 className="h-section mt-4">
              Notes on shipping <span className="serif text-[var(--primary)]">faster</span>
            </h2>
            <p className="mt-3 text-[var(--muted)] leading-relaxed">
              Practical guides on Next.js, AI systems, and automations that don't break at 2 AM.
            </p>
          </div>
          <Link href="/blog" className="btn btn-ghost h-11 shrink-0 px-4 text-sm w-full sm:w-auto justify-center">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {previewPosts.map((post) => (
            <SmallPostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function SmallPostCard({ post }: { post: Post }) {
  const Icon = iconMap[post.icon] ?? Gauge;
  const coverIsPhoto = Boolean(post.coverImage);
  return (
    <article className="card card-hover overflow-hidden">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div
          className={
            coverIsPhoto ? 'blog-cover blog-cover-photo' : `blog-cover ${post.coverClass}`
          }
        >
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt ?? `${post.title} ${post.titleAccent ?? ''}`.trim()}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              priority={Boolean(post.featured)}
            />
          ) : (
            <Icon className="blog-cover-icon h-14 w-14" />
          )}
        </div>
        <div className="p-6">
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
          <div className="mt-4 flex items-center justify-between text-xs text-[var(--muted)] mono">
            <span>{post.date}</span>
            <span className="text-[var(--primary)]">Read →</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
