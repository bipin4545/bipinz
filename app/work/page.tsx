import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { projects } from '@/content/projects';
import { JsonLd } from '@/components/JsonLd';
import { WorkPageHero } from '@/components/work/WorkPageHero';
import { WorkPortfolioClient } from '@/components/work/WorkPortfolioClient';
import { Contact } from '@/components/sections/Contact';

export const metadata: Metadata = buildMetadata({
  title: 'Case Studies & Client Work',
  description:
    'Production outcomes from SaaS teams across India, US, and EU — migrations, AI agents, automation, and performance. Real metrics, no vanity screenshots.',
  path: '/work',
});

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: projects.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${site.url}/work/${p.slug}`,
    name: `${p.title} ${p.titleAccent}`.trim(),
  })),
};

export default function WorkPage() {
  return (
    <>
      <JsonLd data={itemListSchema} />
      <WorkPageHero />
      <WorkPortfolioClient projects={projects} />
      <Contact />
    </>
  );
}
