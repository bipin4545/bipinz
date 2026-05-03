import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { Hero } from '@/components/sections/Hero';
import { SocialProof } from '@/components/sections/SocialProof';
import { Services } from '@/components/sections/Services';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { Process } from '@/components/sections/Process';
import { Testimonials } from '@/components/sections/Testimonials';
import { About } from '@/components/sections/About';
import { BlogPreview } from '@/components/sections/BlogPreview';
import { Guarantees, FAQSection } from '@/components/sections/GuaranteesFAQ';
import { Contact } from '@/components/sections/Contact';
import { SectionOrnament } from '@/components/shared';

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — AI-Powered Web Developer & Automation Engineer`,
  description: site.description,
  path: '/',
});

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: site.url,
  description: site.description,
  publisher: {
    '@type': 'Person',
    name: site.name,
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={websiteSchema} />
      <Hero />
      <SocialProof />
      <Services />
      <SectionOrnament label="Work" />
      <CaseStudies limit={3} />
      <Process />
      <Testimonials />
      <SectionOrnament label="About" variant="dot" />
      <About />
      <BlogPreview />
      <Guarantees />
      <FAQSection limit={6} />
      <Contact />
    </>
  );
}
