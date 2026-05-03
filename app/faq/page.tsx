import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { faqs } from '@/content/faqs';
import { JsonLd } from '@/components/JsonLd';
import { FAQSection } from '@/components/sections/GuaranteesFAQ';
import { Contact } from '@/components/sections/Contact';

export const metadata: Metadata = buildMetadata({
  title: 'Frequently Asked Questions',
  description:
    'Common questions about working together: project timelines, pricing, NDAs, team integration, payment, and scope management. Direct answers, no fluff.',
  path: '/faq',
});

/**
 * FAQPage schema — eligible for Google rich results with expandable FAQ
 * directly in SERPs. Each question/answer pair becomes a mainEntity.
 */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  url: `${site.url}/faq`,
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <FAQSection />
      <Contact />
    </>
  );
}
