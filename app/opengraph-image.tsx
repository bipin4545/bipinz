import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const alt = `${site.name} — AI-Powered Web Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Default OG image for homepage and any page that doesn't override.
 * Rendered at build time / on demand as PNG.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0A0A0F 0%, #1A1538 50%, #0D0A24 100%)',
          padding: 80,
          fontFamily: 'system-ui, sans-serif',
          color: 'white',
          position: 'relative',
        }}
      >
        {/* Radial glow */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(103, 61, 230, 0.4) 0%, transparent 70%)',
          }}
        />

        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: 'linear-gradient(140deg, #673DE6, #8B5CF6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 700,
              color: 'white',
            }}
          >
            {site.initial}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 22, fontWeight: 600 }}>{site.name}</div>
            <div style={{ fontSize: 16, color: '#A1A1AA' }}>{site.tagline}</div>
          </div>
        </div>

        {/* Main headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 900 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '6px 14px',
              borderRadius: 999,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: 14,
              color: '#CCFF00',
              alignSelf: 'flex-start',
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: 999, background: '#CCFF00' }} />
            {site.availability}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.035em',
            }}
          >
            <div>AI-powered web platforms</div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <span>that help SaaS teams </span>
              <span style={{ fontStyle: 'italic', fontWeight: 400 }}>ship faster.</span>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 18, color: '#A1A1AA' }}>
          <span>Next.js</span>
          <span>·</span>
          <span>AI Agents</span>
          <span>·</span>
          <span>n8n Automation</span>
          <span>·</span>
          <span>{site.url.replace('https://', '')}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
