import { ImageResponse } from 'next/og';
import { posts } from '@/content/posts';
import { site } from '@/lib/site';

export const alt = 'Blog post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Dynamic per-post OG image. Huge SEO/social value — each post gets its own
 * custom image on X, LinkedIn, Slack previews.
 *
 * Next.js convention: file at /app/blog/[slug]/opengraph-image.tsx
 * automatically becomes /blog/[slug]/opengraph-image route.
 */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  const title = post ? `${post.title} ${post.titleAccent ?? ''}`.trim() : 'Blog Post';
  const excerpt = post?.excerpt ?? '';
  const category = post?.category ?? 'Writing';
  const date = post?.date ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0A0A0F 0%, #1A1538 50%, #0D0A24 100%)',
          padding: 72,
          fontFamily: 'system-ui, sans-serif',
          color: 'white',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -240,
            right: -240,
            width: 640,
            height: 640,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(103, 61, 230, 0.45) 0%, transparent 70%)',
          }}
        />

        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'linear-gradient(140deg, #673DE6, #8B5CF6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              {site.initial}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>{site.name}</div>
              <div style={{ fontSize: 14, color: '#A1A1AA' }}>{site.url.replace('https://', '')}</div>
            </div>
          </div>
          <div
            style={{
              padding: '6px 14px',
              borderRadius: 999,
              background: 'rgba(103, 61, 230, 0.15)',
              border: '1px solid rgba(103, 61, 230, 0.4)',
              fontSize: 14,
              color: '#CCFF00',
            }}
          >
            {category}
          </div>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1000 }}>
          <div
            style={{
              fontSize: 60,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
            }}
          >
            {title}
          </div>
          {excerpt && (
            <div
              style={{
                fontSize: 22,
                color: '#A1A1AA',
                lineHeight: 1.4,
                maxWidth: 900,
              }}
            >
              {excerpt.length > 140 ? excerpt.slice(0, 137) + '...' : excerpt}
            </div>
          )}
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 16,
            color: '#A1A1AA',
          }}
        >
          <span>{date}</span>
          <span>Read on {site.url.replace('https://', '')}/blog</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
