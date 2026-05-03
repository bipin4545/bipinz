import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { About } from '@/components/sections/About';
import { AboutCollaboration } from '@/components/sections/AboutCollaboration';
import { AboutShippingStandards } from '@/components/sections/AboutShippingStandards';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';

export const metadata: Metadata = buildMetadata({
  title: `About ${site.name} — Next.js Developer & Automation Engineer`,
  description:
    'I build modern web platforms and automation systems for SaaS teams shipping internationally. Based in India, working with US/UK/EU clients.',
  path: '/about',
});

const extendedPersonSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: 'Next.js Developer & Automation Engineer',
  description: site.description,
  url: `${site.url}/about`,
  image: `${site.url}${site.aboutPhoto.src}`,
  email: site.email,
  sameAs: [site.social.linkedin, site.social.github],
  knowsAbout: site.techStack,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
    addressLocality: site.location,
  },
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Full-stack Developer',
    occupationLocation: { '@type': 'Country', name: 'Remote · Global' },
    skills: site.techStack.join(', '),
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={extendedPersonSchema} />
      <About priorityPhoto />
      <AboutCollaboration />
      <AboutShippingStandards />
      <Testimonials />
      <Contact />
    </>
  );
}
