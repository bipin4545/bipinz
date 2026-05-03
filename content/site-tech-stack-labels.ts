/** Plain labels only — safe to import from `lib/site.ts` (client + server) without pulling brand SVG data */
export const SITE_TECH_STACK_LABELS = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind',
  'WordPress',
  'n8n',
  'OpenAI / Anthropic',
  'Node.js',
  'Python',
  'Postgres + pgvector',
  'Supabase',
  'Vercel',
] as const;

export type SiteTechStackLabel = (typeof SITE_TECH_STACK_LABELS)[number];
