import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { services } from '@/content/services';
import { site } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { Guarantees } from '@/components/sections/GuaranteesFAQ';
import { Contact } from '@/components/sections/Contact';

export const metadata: Metadata = buildMetadata({
  title: 'Services — Next.js, AI Agents, n8n Automation & Technical SEO',
  description:
    'Clear scopes, fixed pricing. AI web apps, WordPress → Next.js migrations, n8n automation, AI chatbots, technical SEO, and code refactoring for SaaS teams.',
  path: '/services',
});

const offerCatalogSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Services',
  url: `${site.url}/services`,
  itemListElement: services.map((s, i) => ({
    '@type': 'Offer',
    position: i + 1,
    itemOffered: {
      '@type': 'Service',
      name: s.title,
      description: s.description,
      provider: { '@type': 'Person', name: site.name },
    },
    priceSpecification: {
      '@type': 'PriceSpecification',
      price: s.price.replace(/[^\d.]/g, ''),
      priceCurrency: 'USD',
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={offerCatalogSchema} />
      <Services />
      <Process />
      <Guarantees />
      <Contact />
    </>
  );
}
