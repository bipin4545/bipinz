import type { Post } from '@/lib/types';

/** Files live in `public/images/Blog/` — encode spaces and special characters */
function blogImage(filename: string) {
  return `/images/Blog/${encodeURIComponent(filename)}`;
}

export const posts: Post[] = [
  {
    slug: 'lighthouse-95-saas-landing-pages',
    title: 'A practical checklist for',
    titleAccent: '95+ Lighthouse',
    excerpt:
      'The few things that actually move LCP/CLS consistently: image strategy, font loading tactics, predictable layouts, and the small CSS choices that compound across pages.',
    category: 'Next.js',
    readTime: '6 min read',
    date: 'Mar 11, 2026',
    publishedAt: '2026-03-11',
    featured: true,
    icon: 'gauge',
    coverClass: 'blog-cover-1',
    coverImage: blogImage('Lighthouse Checklist Thumbnail.webp'),
    coverImageAlt: 'Abstract illustration for Lighthouse performance checklist',
    content: `
## Why Lighthouse scores matter (and when they don't)

Lighthouse scores aren't a vanity metric — they directly correlate with user retention, conversion rates, and SEO rankings. But the goal isn't to chase 100s blindly; it's to ship a site that feels fast to real users.

## The checklist

### 1. Images are always the bottleneck

Most "slow" sites I audit have image problems. The fixes:

- Use \`next/image\` with explicit width/height (prevents CLS)
- Serve AVIF/WebP with JPEG fallback
- Lazy-load below-the-fold images
- Use responsive \`sizes\` attribute

### 2. Font loading strategy

\`next/font\` does most of the work, but:

- Preload critical font weights only
- Use \`font-display: swap\` or \`optional\`
- Subset to Latin characters unless you need i18n

### 3. Layout stability

CLS under 0.1 requires discipline:

- Reserve space for images, ads, and async content
- Avoid injecting content above existing content
- Use CSS \`aspect-ratio\` for media embeds

### 4. JavaScript budget

Every kilobyte you ship is a kilobyte users pay to download and parse:

- Use Server Components by default in Next.js 14
- Code-split at route boundaries
- Audit third-party scripts quarterly

## Measurement

Don't trust Lighthouse alone. Set up Real User Monitoring (RUM) with Vercel Analytics or similar — p75 LCP matters more than a lab score.
    `,
  },
  {
    slug: 'n8n-workflows-that-scale',
    title: 'n8n workflows that scale:',
    titleAccent: 'retries, idempotency, alerts',
    excerpt:
      "Build automations like product features — observable, debuggable, safe at 2 AM.",
    category: 'Automation',
    readTime: '8 min',
    date: 'Feb 22, 2026',
    publishedAt: '2026-02-22',
    icon: 'git-branch',
    coverClass: 'blog-cover-2',
    coverImage: blogImage('n8n Workflows Thumbnail.webp'),
    coverImageAlt: 'Abstract illustration for scalable n8n workflows',
    content: `
## The problem with "quick automations"

Most n8n workflows I inherit from clients look like this: a happy-path sequence of nodes that works 95% of the time. The other 5%? Silent failures, duplicate records, missed leads.

## Building for reliability

### Idempotency first

Every workflow should be safe to re-run. Use external IDs, upsert patterns, and deduplication checks before any destructive action.

### Retry with backoff

n8n's retry settings are good, but you want exponential backoff for external APIs. Set retries to 3, initial delay 5s, backoff factor 2.

### Dead-letter queues

When retries exhaust, don't just log — route to a dedicated error workflow that alerts and stores the failed payload for manual review.

### Observability

Every production workflow should have:

- Structured logs with correlation IDs
- Success/failure metrics in a dashboard (Grafana, Datadog)
- Slack/PagerDuty alerts on error rates above threshold

## Real example

On a recent CRM sync project, we went from 2% silent failure rate to 0.3% failure rate with full visibility into every failure — by adding these four patterns.
    `,
  },
  {
    slug: 'shipping-ai-assistants-guardrails',
    title: 'Shipping AI assistants with',
    titleAccent: 'guardrails & source transparency',
    excerpt:
      'UX patterns that make retrieval trustworthy and reduce support risk during rollout.',
    category: 'AI Systems',
    readTime: '7 min',
    date: 'Jan 30, 2026',
    publishedAt: '2026-01-30',
    icon: 'bot',
    coverClass: 'blog-cover-3',
    coverImage: blogImage('AI Assistants Thumbnail.webp'),
    coverImageAlt: 'Abstract illustration for AI assistants and guardrails',
    content: `
## The trust problem with AI assistants

Ship an AI chatbot to customers and you're one hallucination away from a support nightmare. The fix isn't "better prompts" — it's UX that makes model confidence visible.

## Three patterns that work

### 1. Show sources, inline

Every claim should link to its source document, with a snippet. Users learn to verify, and you shift trust from "the AI" to "the underlying docs."

### 2. Confidence indicators

Low-confidence answers should be visually different. A simple approach: show a warning badge for anything below a retrieval similarity threshold.

### 3. Scoped actions only

If your agent can perform actions (update CRM, send email), tool-call boundaries matter. Allow only specific, auditable actions — never "execute arbitrary SQL."

## Rollout strategy

Start with internal users, then friendly customers, then full rollout. At each stage, measure:

- Deflection rate (tickets avoided)
- Correction rate (how often users report wrong answers)
- CSAT delta

One client went from 2,400 tickets/month to 1,420 with this approach — and CSAT actually improved.
    `,
  },
  {
    slug: 'wordpress-to-nextjs-without-losing-seo',
    title: 'Migrating WordPress to Next.js',
    titleAccent: 'without losing SEO',
    excerpt:
      "A redirect strategy, schema preservation plan, and gotchas I've hit on 10+ migrations.",
    category: 'Migration',
    readTime: '9 min',
    date: 'Dec 14, 2025',
    publishedAt: '2025-12-14',
    icon: 'move-right',
    coverClass: 'blog-cover-1',
    coverImage: blogImage('WordPress → Next.js Migration Thumbnail.webp'),
    coverImageAlt: 'Abstract illustration for WordPress to Next.js migration',
    content: `
## Why SEO is the #1 migration risk

A site migration that tanks organic traffic can cost a SaaS company 6–12 months of marketing spend. I've seen it happen. Here's how to avoid it.

## The pre-migration audit

Before touching any code:

1. Export all URLs from Google Search Console (last 16 months)
2. Crawl the current site with Screaming Frog
3. Export all meta titles, descriptions, and schema markup
4. Document the top 100 pages by organic traffic

## The redirect map

Every old URL needs a 1:1 redirect to the new URL. Build this as a JSON/CSV file BEFORE launch.

\`\`\`ts
// next.config.mjs
async redirects() {
  return [
    { source: '/blog/old-slug', destination: '/writing/new-slug', permanent: true },
    // ... all mappings
  ];
}
\`\`\`

## Schema preservation

Article, Organization, Breadcrumb schemas — all need to carry over. Use structured data testing tool to verify before launch.

## Launch day checklist

- Update sitemap.xml
- Submit to Search Console
- Monitor Core Web Vitals
- Check 404 rate in Vercel analytics for 72 hours

## Gotchas

- Trailing slashes: pick one convention and redirect the other
- Image URLs: if you rehost, update references in all content
- Canonical tags: don't let old and new URLs both index

On the last migration I did, we saw zero dip in organic traffic over 30 days — and a 180% increase within 90 days thanks to the performance boost.
    `,
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Newest first — use for blog index and home Writing preview */
export function getPostsByNewest(): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

