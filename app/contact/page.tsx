import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, Mail, MapPin, MessageCircle } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { site, getWhatsAppChatUrl } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { Contact } from '@/components/sections/Contact';

export const metadata: Metadata = buildMetadata({
  title: 'Contact — Get a scoped proposal in 48h',
  description: `Reach out about Next.js development, AI agents, or n8n automation. Replies within 12 hours. ${site.email}.`,
  path: '/contact',
});

/**
 * ContactPage + ContactPoint schema — helps search engines surface
 * your availability, response time, and contact method directly.
 */
const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: `${site.url}/contact`,
  mainEntity: {
    '@type': 'Person',
    name: site.name,
    url: site.url,
    email: site.email,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: site.email,
      availableLanguage: ['English', 'Hindi'],
      areaServed: ['US', 'UK', 'EU', 'IN', 'International'],
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00',
      },
    },
  },
};

export default function ContactPage() {
  const whatsappUrl = getWhatsAppChatUrl();

  return (
    <>
      <JsonLd data={contactSchema} />
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 sm:pt-20 pb-10 sm:pb-14">
          <span className="eyebrow" data-num="09">Contact</span>
          <h1 className="h-section mt-4">
            Let&apos;s discuss your <span className="serif text-[var(--primary)]">next ship</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--muted)] leading-relaxed">
            Tell me about your product, timeline, and what &ldquo;done&rdquo; looks like. I work with SaaS teams
            on Next.js builds, AI features, and automation — async-first across time zones, with clear milestones
            and no surprise invoices.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="card p-5 flex gap-4">
              <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-[10px] border border-[var(--border)] bg-[var(--surface-2)]">
                <Clock className="h-4 w-4 text-[var(--primary)]" aria-hidden />
              </div>
              <div>
                <div className="text-xs mono text-[var(--muted)] uppercase tracking-widest">Availability</div>
                <p className="mt-1 text-sm font-medium leading-snug">{site.availability}</p>
              </div>
            </div>
            <div className="card p-5 flex gap-4">
              <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-[10px] border border-[var(--border)] bg-[var(--surface-2)]">
                <Mail className="h-4 w-4 text-[var(--primary)]" aria-hidden />
              </div>
              <div>
                <div className="text-xs mono text-[var(--muted)] uppercase tracking-widest">Response</div>
                <p className="mt-1 text-sm font-medium leading-snug">{site.responseTime}</p>
                <p className="mt-0.5 break-words text-xs text-[var(--muted)]">{site.email}</p>
              </div>
            </div>
            <div className="card p-5 flex gap-4">
              <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-[10px] border border-[var(--border)] bg-[var(--surface-2)]">
                <MapPin className="h-4 w-4 text-[var(--primary)]" aria-hidden />
              </div>
              <div>
                <div className="text-xs mono text-[var(--muted)] uppercase tracking-widest">Location</div>
                <p className="mt-1 text-sm font-medium leading-snug">{site.location}</p>
                <p className="mt-0.5 text-xs text-[var(--muted)]">{site.timezone}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--muted)]">
            <a
              href={site.social.calcom}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-medium text-[var(--text)] hover:text-[var(--primary)] transition"
            >
              <Calendar className="h-4 w-4" aria-hidden />
              Open scheduling
            </a>
            <Link href="/faq" className="hover:text-[var(--text)] transition">
              FAQ
            </Link>
            <Link href="/services" className="hover:text-[var(--text)] transition">
              Services &amp; pricing
            </Link>
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium text-[var(--text)] hover:text-[#25D366] transition"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </section>

      <Contact standalone />
    </>
  );
}
