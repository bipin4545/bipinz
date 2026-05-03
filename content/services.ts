import type { Service } from '@/lib/types';

/** Public folder filenames may include spaces/special chars — encode for valid URLs */
function serviceImage(filename: string) {
  return `/images/services/${encodeURIComponent(filename)}`;
}

export const services: Service[] = [
  {
    slug: 'ai-web-apps',
    num: '01',
    title: 'AI Web Apps',
    description:
      'Full-stack SaaS features — auth, billing, dashboards — stitched together with AI agents, RAG pipelines, and Claude/GPT integration.',
    techPills: ['Next.js', 'TypeScript', 'Claude API'],
    price: 'From $3,500',
    cta: 'Start project',
    featured: true,
    icon: 'bot',
    image: serviceImage('AI web apps.webp'),
    imageAlt: 'AI web app dashboard preview',
  },
  {
    slug: 'wordpress-migration',
    num: '02',
    title: 'WordPress → Next.js Migration',
    description:
      'Preserve SEO, boost performance 3–5×, and unlock developer velocity. MDX content, Sanity CMS, ISR — your choice.',
    techPills: ['Next.js', 'SEO preservation', 'CMS migration'],
    price: 'From $2,500',
    cta: 'Learn more',
    icon: 'move-right',
    image: serviceImage('wordpress next js migration.webp'),
    imageAlt: 'WordPress to Next.js migration preview',
  },
  {
    slug: 'n8n-automation',
    num: '03',
    title: 'n8n Automation',
    description:
      'Lead routing, CRM sync, enrichment, and ops pipelines with retries, alerting, and full audit trails.',
    techPills: ['n8n', 'Postgres', 'Integrations'],
    price: 'From $1,500',
    cta: 'Learn more',
    icon: 'git-branch',
    image: serviceImage('n8n automation.webp'),
    imageAlt: 'n8n automation workflow preview',
  },
  {
    slug: 'ai-agents-chatbots',
    num: '04',
    title: 'AI Agents & Chatbots',
    description:
      'RAG assistants on your data with tool calling, guardrails, and evaluation loops. Safe rollout with audit logs.',
    techPills: ['Claude / GPT', 'RAG', 'pgvector'],
    price: 'From $2,000',
    cta: 'Learn more',
    icon: 'message-circle',
    image: serviceImage('AI Agents & Chatbots.webp'),
    imageAlt: 'AI chatbot interface preview',
  },
  {
    slug: 'technical-seo',
    num: '05',
    title: 'Technical SEO & Performance',
    description:
      "Full audit, schema markup, and Core Web Vitals optimization. 95+ Lighthouse guaranteed or it's free.",
    techPills: ['CWV', 'Schema.org', 'Audit'],
    price: 'From $800',
    cta: 'Learn more',
    icon: 'gauge',
    image: serviceImage('Technical SEO & Performance.webp'),
    imageAlt: 'Performance and SEO audit preview',
  },
  {
    slug: 'bug-fixes-refactoring',
    num: '06',
    title: 'Bug Fixes & Refactoring',
    description:
      'Legacy codebase rescue. React/Next.js/TypeScript. Untangle tech debt, stabilize builds, ship without regressions.',
    techPills: ['Hourly', 'Fixed-scope', 'Refactor'],
    price: '$50/hr',
    cta: 'Get in touch',
    icon: 'wrench',
    image: serviceImage('Bug Fixes & Refactoring.webp'),
    imageAlt: 'Code refactoring preview',
  },
];
