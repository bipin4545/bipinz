'use client';

import { useState } from 'react';
import { ArrowRight, Mail, Clock, Lock, ClipboardList, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { site, getWhatsAppChatUrl } from '@/lib/site';

type ContactProps = {
  /** When true (e.g. on `/contact`), skip the large in-section headline — the page hero carries the main title. */
  standalone?: boolean;
};

export function Contact({ standalone = false }: ContactProps) {
  const whatsappUrl = getWhatsAppChatUrl();
  const [email, setEmail] = useState('');
  const [brief, setBrief] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !brief.trim()) return;

    const body = `Hi,

Here is a quick brief:

${brief.trim()}

Additional context:
- Current stack:
- Deadline:
- Success metrics (LCP, conversion, automation SLA, etc.):

Could you share a scoped proposal with timeline and milestones?

Thanks,
${email.trim()}`;

    const subject = encodeURIComponent('Project Inquiry — Next.js + AI Automation');
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
    setSuccess(true);
  };

  return (
    <section id="contact" className="relative border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="card p-8 sm:p-12 relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(900px 360px at 50% 0%, rgba(103,61,230,0.28), transparent 55%)' }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10">
            <div>
              {!standalone && (
                <>
                  <span className="eyebrow" data-num="09">Contact</span>
                  <h2 className="h-editorial mt-4">
                    Got a project in <span className="serif text-[var(--primary)]">mind?</span>
                  </h2>
                  <p className="mt-6 text-lg text-[var(--muted)] leading-relaxed max-w-lg">
                    I take a limited number of clients each quarter. If you need a Next.js platform,
                    an AI agent, or a reliable automation layer — share your context and I&apos;ll reply
                    within 12 hours.
                  </p>
                </>
              )}
              {standalone && (
                <p className="text-lg text-[var(--muted)] leading-relaxed max-w-lg">
                  Pick a slot on my calendar or use the form — I&apos;ll follow up with questions, a rough
                  timeline, and a scoped proposal when it&apos;s a fit.
                </p>
              )}

              <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
                <a href={site.social.calcom} target="_blank" rel="noreferrer" className="btn btn-accent h-12 px-5">
                  Book a 30-min Call <ArrowRight className="h-4 w-4" />
                </a>
                <a href={`mailto:${site.email}?subject=Project%20Inquiry`} className="btn btn-ghost h-12 px-5">
                  <Mail className="h-4 w-4" /> {site.email}
                </a>
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost h-12 px-5"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                )}
              </div>

              <div className="mt-8 grid gap-2.5 text-sm text-[var(--muted)]">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" /> Replies within 12 hours · {site.timezone}
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4" /> NDAs welcome · all work confidential by default
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="card p-6 bg-[var(--surface-2)]">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Project brief</div>
                  <div className="text-sm text-[var(--muted)]">Get a scope in 48 hours.</div>
                </div>
                <ClipboardList className="h-5 w-5 text-[var(--primary)]" />
              </div>
              <div className="mt-5 grid gap-3">
                <label className="grid gap-1.5">
                  <span className="text-xs text-[var(--muted)] mono">Your email</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="input"
                    suppressHydrationWarning
                  />
                </label>
                <label className="grid gap-1.5">
                  <span className="text-xs text-[var(--muted)] mono">What are we building?</span>
                  <textarea
                    rows={4}
                    required
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    placeholder="e.g., Migrate WordPress to Next.js, improve LCP, add AI onboarding, automate lead routing via n8n..."
                    className="input"
                    suppressHydrationWarning
                  />
                </label>
                <button type="submit" className="btn btn-primary h-12 text-sm">
                  Send brief <Send className="h-4 w-4" />
                </button>
                {success && (
                  <div className="rounded-[10px] border border-[var(--primary)] bg-[var(--surface)] p-4 text-sm">
                    <div className="flex items-center gap-2 font-semibold text-[var(--primary)]">
                      <CheckCircle2 className="h-4 w-4" /> Email opened
                    </div>
                    <p className="mt-1 text-[var(--muted)]">
                      Your mail client should open with a pre-filled draft.
                    </p>
                  </div>
                )}
                <div className="text-xs text-[var(--muted)] mono">
                  No tracking. Opens your email client with a draft.
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
