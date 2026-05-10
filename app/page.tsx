import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { Hero } from '@/components/sections/Hero';
import { SocialProof } from '@/components/sections/SocialProof';
import { SectionOrnament } from '@/components/shared';
const Services = dynamic(() => import('@/components/sections/Services').then(m => ({ default: m.Services })));
const CaseStudies = dynamic(() => import('@/components/sections/CaseStudies').then(m => ({ default: m.CaseStudies })));
const Process = dynamic(() => import('@/components/sections/Process').then(m => ({ default: m.Process })));
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => ({ default: m.Testimonials })));
const About = dynamic(() => import('@/components/sections/About').then(m => ({ default: m.About })));
const BlogPreview = dynamic(() => import('@/components/sections/BlogPreview').then(m => ({ default: m.BlogPreview })));
const Guarantees = dynamic(() => import('@/components/sections/GuaranteesFAQ').then(m => ({ default: m.Guarantees })));
const FAQSection = dynamic(() => import('@/components/sections/GuaranteesFAQ').then(m => ({ default: m.FAQSection })));
const Contact = dynamic(() => import('@/components/sections/Contact').then(m => ({ default: m.Contact })));

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — AI-Powered Web Developer & Automation Engineer · bipinz`,
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
