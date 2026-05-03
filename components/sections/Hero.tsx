import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, Globe, ShieldCheck } from 'lucide-react';
import { site } from '@/lib/site';

const marqueeItems = [
  'Next.js 14',
  'TypeScript strict',
  'n8n workflows',
  'Claude API',
  'RAG pipelines',
  'Tailwind + shadcn',
  'Postgres + pgvector',
  'Vercel',
  'Core Web Vitals',
  'WordPress migration',
];

function MarqueeTrack() {
  return (
    <div className="marquee-track" aria-hidden>
      {marqueeItems.map((item, i) => (
        <span key={i} className="marquee-item">
          {i > 0 && <span className="serif">—</span>} {item}
        </span>
      ))}
    </div>
  );
}

const blobInner = 'rounded-full motion-reduce:animate-none';

/** Pure CSS atmosphere — no overflow clip on this layer (section uses overflow-y visible). */
function HeroAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 min-h-full" aria-hidden>
      {/* Violet — left-1/4 anchor (zero box), blob centered on point so glow stays in viewport */}
      <div className="absolute left-1/4 top-[14%] h-0 w-0">
        <div
          className={`absolute left-1/2 top-1/2 h-[min(22rem,46vw)] w-[min(22rem,46vw)] -translate-x-1/2 -translate-y-1/2 sm:h-[min(26rem,48vw)] sm:w-[min(26rem,48vw)] md:h-[28rem] md:w-[28rem] ${blobInner} bg-violet-500/10 blur-[100px] dark:bg-violet-500/20 sm:blur-[120px] md:blur-[140px] animate-hero-blob-1`}
        />
      </div>
      {/* Purple — right-1/4 bottom-0 per spec; zero-size anchor avoids overflow clip + translate conflicts */}
      <div className="absolute bottom-0 right-1/4 h-0 w-0">
        <div
          className={`absolute left-1/2 top-1/2 h-[min(22rem,44vw)] w-[min(22rem,44vw)] -translate-x-1/2 -translate-y-1/2 sm:h-[min(26rem,46vw)] sm:w-[min(26rem,46vw)] md:h-[26rem] md:w-[26rem] ${blobInner} bg-purple-600/8 blur-[100px] dark:bg-purple-600/15 sm:blur-[125px] md:blur-[150px] animate-hero-blob-2`}
        />
      </div>
      {/* Indigo — horizontal center */}
      <div className="absolute left-1/2 top-[26%] h-0 w-0 -translate-x-1/2 sm:top-[30%]">
        <div
          className={`absolute left-1/2 top-1/2 h-[min(24rem,50vw)] w-[min(24rem,50vw)] -translate-x-1/2 -translate-y-1/2 sm:h-[min(28rem,52vw)] sm:w-[min(28rem,52vw)] md:h-[30rem] md:w-[30rem] ${blobInner} bg-indigo-500/6 blur-[110px] dark:bg-indigo-500/10 sm:blur-[135px] md:blur-[150px] animate-hero-blob-3`}
        />
      </div>

      {/* Readability: softer center in dark so center blob stays visible; light stays gentle */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,rgb(255_255_255/0.32)_0%,transparent_72%)] dark:bg-[radial-gradient(ellipse_74%_64%_at_50%_34%,rgb(10_10_15/0.48)_0%,rgb(10_10_15/0.18)_48%,transparent_72%)]"
      />

      {/* Dot grid — 4% dots, 32px rhythm; barely visible */}
      <div
        className="absolute inset-0 [background-image:radial-gradient(rgb(10_10_15/0.04)_1px,transparent_1px)] [background-size:32px_32px] dark:hidden"
        aria-hidden
      />
      <div
        className="absolute inset-0 hidden [background-image:radial-gradient(rgb(250_250_250/0.04)_1px,transparent_1px)] [background-size:32px_32px] dark:block"
        aria-hidden
      />
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-x-clip overflow-y-visible">
      <HeroAtmosphere />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pt-20 sm:pt-28 pb-16 text-center">
        <div className="stagger">
          {/* Mobile: one tight row + sans. sm+: mono row with middots (no stacked divider). */}
          <div
            className="pill mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-2 rounded-full px-2.5 py-1.5 sm:inline-flex sm:flex-nowrap sm:gap-2.5 sm:px-3 sm:py-1.5 md:px-[14px]"
            role="status"
            aria-label={`${site.availability}. ${site.responseTime}`}
          >
            <span className="lime-dot shrink-0" aria-hidden />
            <span className="max-w-[min(100%,20rem)] text-center text-[11px] font-medium leading-snug tracking-tight text-[var(--muted)] sm:hidden">
              {site.availabilityShort}
              <span className="text-[var(--subtle)] font-normal"> · </span>
              {site.responseTimeShort}
            </span>
            <span className="mono hidden text-xs text-[var(--muted)] sm:inline">{site.availability}</span>
            <span className="hidden shrink-0 text-[var(--subtle)] sm:inline" aria-hidden>
              ·
            </span>
            <span className="mono hidden text-xs text-[var(--muted)] sm:inline">{site.responseTime}</span>
          </div>

          <h1 className="h-display mt-7">
            I build <span className="serif text-gradient">AI-powered</span> web platforms
            <br className="hidden sm:block" />
            that help SaaS teams <em className="serif font-normal">ship faster.</em>
          </h1>

          <p className="mt-6 text-lg text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
            Next.js developer and automation engineer. I migrate legacy WordPress sites to modern
            stacks, integrate AI agents, and build n8n workflows that replace hours of manual work.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/work" className="btn btn-primary px-5 h-12 text-sm w-full sm:w-auto">
              View Case Studies <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="btn btn-ghost px-5 h-12 text-sm w-full sm:w-auto">
              <Calendar className="h-4 w-4" /> Book a Free Call
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[var(--muted)]">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" /> India · IST
            </span>
            <span className="inline-flex items-center gap-2">
              <Globe className="h-4 w-4" /> US · UK · EU async
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> 95+ Lighthouse
            </span>
          </div>
        </div>
      </div>

      <div className="marquee relative z-10 mt-4">
        <MarqueeTrack />
        <MarqueeTrack />
      </div>
    </section>
  );
}
