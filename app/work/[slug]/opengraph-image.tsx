import { ImageResponse } from 'next/og';
import { projects } from '@/content/projects';
import { site } from '@/lib/site';

export const alt = 'Case study';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Dynamic per-project OG image for case studies. Highlights:
 * - Project title
 * - Client type
 * - Top metric (biggest wow factor)
 * - Tech stack highlights
 */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  const title = project
    ? `${project.title} ${project.titleAccent}`.trim()
    : 'Case Study';
  const pitch = project?.pitch ?? '';
  const clientType = project?.clientType ?? '';
  const topMetric = project?.metrics[0] ?? { value: '', label: '' };
  const stack = project?.techStack.slice(0, 4).join(' · ') ?? '';

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
            bottom: -200,
            left: -200,
            width: 520,
            height: 520,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(204, 255, 0, 0.15) 0%, transparent 70%)',
          }}
        />

        {/* Top row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
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
            <div style={{ fontSize: 18, color: '#A1A1AA' }}>Case Study</div>
          </div>
          <div
            style={{
              padding: '6px 14px',
              borderRadius: 999,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              fontSize: 13,
              color: '#A1A1AA',
            }}
          >
            {clientType}
          </div>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1000 }}>
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
          {pitch && (
            <div
              style={{
                fontSize: 22,
                color: '#A1A1AA',
                lineHeight: 1.4,
                maxWidth: 900,
              }}
            >
              {pitch.length > 140 ? pitch.slice(0, 137) + '...' : pitch}
            </div>
          )}
        </div>

        {/* Bottom row: Top metric + stack */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 32,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <div
              style={{
                fontSize: 64,
                fontWeight: 700,
                color: '#CCFF00',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              {topMetric.value}
            </div>
            <div style={{ fontSize: 18, color: '#A1A1AA', maxWidth: 240 }}>
              {topMetric.label}
            </div>
          </div>
          <div
            style={{
              fontSize: 14,
              color: '#71717A',
              textAlign: 'right',
              maxWidth: 480,
            }}
          >
            {stack}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
