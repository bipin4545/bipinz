import Link from 'next/link';
import { Linkedin, Mail, Clock, MapPin, Calendar, MessageCircle } from 'lucide-react';
import { site, getWhatsAppChatUrl } from '@/lib/site';
import { LogoImage } from '@/components/LogoImage';

export function Footer() {
  const whatsappUrl = getWhatsAppChatUrl();

  return (
    <footer className="relative border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3">
              <LogoImage />
            </div>
            <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed">
              AI-powered web platforms for SaaS teams shipping globally.
            </p>
            <div className="mt-5 flex items-center gap-4 text-[var(--muted)]">
              <a href={site.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-[var(--text)] transition" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
              <a href={`mailto:${site.email}`} className="hover:text-[var(--text)] transition" aria-label="Email"><Mail className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Navigate</div>
            <div className="mt-4 grid gap-2.5 text-sm text-[var(--muted)]">
              <Link className="hover:text-[var(--text)] transition" href="/">Home</Link>
              <Link className="hover:text-[var(--text)] transition" href="/work">Work</Link>
              <Link className="hover:text-[var(--text)] transition" href="/services">Services</Link>
              <Link className="hover:text-[var(--text)] transition" href="/about">About</Link>
              <Link className="hover:text-[var(--text)] transition" href="/blog">Writing</Link>
              <Link className="hover:text-[var(--text)] transition" href="/faq">FAQ</Link>
              <Link className="hover:text-[var(--text)] transition" href="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Services</div>
            <div className="mt-4 grid gap-2.5 text-sm text-[var(--muted)]">
              <Link className="hover:text-[var(--text)] transition" href="/services">AI Web Apps</Link>
              <Link className="hover:text-[var(--text)] transition" href="/services">WP → Next.js Migration</Link>
              <Link className="hover:text-[var(--text)] transition" href="/services">n8n Automation</Link>
              <Link className="hover:text-[var(--text)] transition" href="/services">AI Agents</Link>
              <Link className="hover:text-[var(--text)] transition" href="/services">Technical SEO</Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Contact</div>
            <div className="mt-4 grid gap-2.5 text-sm text-[var(--muted)]">
              <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> <span className="mono">{site.timezone}</span></div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> India · US/UK/EU async</div>
              <a className="inline-flex items-center gap-2 hover:text-[var(--text)] transition" href={`mailto:${site.email}`}><Mail className="h-4 w-4" /> {site.email}</a>
              <a className="inline-flex items-center gap-2 hover:text-[var(--text)] transition" href={site.social.calcom} target="_blank" rel="noreferrer"><Calendar className="h-4 w-4" /> Book a call</a>
              {whatsappUrl && (
                <a
                  className="inline-flex items-center gap-2 hover:text-[var(--text)] transition"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--border)] pt-6 text-center text-sm text-[var(--muted)]">
          <div>© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
