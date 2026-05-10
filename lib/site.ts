import { SITE_TECH_STACK_LABELS } from '@/content/site-tech-stack-labels';

// TODO: Replace all placeholder values with your real info
export const site = {
  name: 'Bipin Kumar',
  initial: 'B',
  tagline: 'Next.js · AI · Automation',
  description:
    'I build AI-powered web platforms that help SaaS companies ship faster and automate growth. Next.js, TypeScript, AI agents, n8n automation.',
  url: 'https://bipinz.com',
  email: 'hello@bipinz.com',
  location: 'Lucknow, India',
  timezone: 'IST · UTC+5:30',
  availability: 'Available for 2 projects · Q2 2026',
  /** Shorter line for narrow viewports (hero pill, etc.) */
  availabilityShort: "2 spots · Q2 '26",
  responseTime: 'Replies in 12h',
  /** Hero pill — keep very short so one line fits ~320px */
  responseTimeShort: '~12h',
  /** WhatsApp Business: country + full number, digits only (no + or spaces). Example India: 9198xxxxxxxx */
  whatsappNumber: '916283887889',
  social: {
    github: 'https://github.com/yourname',
    linkedin: 'https://www.linkedin.com/in/bipinz',
    calcom: 'https://cal.com/yourname',
  },
  stats: {
    hoursAutomated: 200000,
    projectsShipped: 50,
    clientTeams: 30,
    lighthouseScore: 95,
    yearsShipping: 5,
    countriesServed: 12,
    onTimeDelivery: 99,
  },
  techStack: SITE_TECH_STACK_LABELS,
  /** Portrait under `public` — shown in About section (home + /about) */
  aboutPhoto: {
    src: encodeURI('/images/About Us/Bipin Kumar.webp'),
    alt: 'Bipin Kumar — portrait photo',
  },
  bio: {
    pullQuote:
      "I don't just build websites — I build systems that keep working when nobody's watching.",
    paragraphs: [
      'I build modern web platforms and automation systems for SaaS teams shipping internationally — where performance, analytics integrity, and maintainability are non-negotiable.',
      'My work tends to start where things get messy: legacy WordPress, inconsistent tracking, fragile pipelines, "we\'ll fix it later" UI debt. I replace that with a clean Next.js foundation and automation that\'s observable and safe.',
    ],
    /** Shown under bio — short creative line before your name */
    signatureLead: 'I ship work that still holds up when the room goes quiet.',
  },
};

/** `https://wa.me/...` with prefilled intro, or `null` if `whatsappNumber` is unset/invalid. */
export function getWhatsAppChatUrl(): string | null {
  const digits = site.whatsappNumber.replace(/\D/g, '');
  if (digits.length < 10) return null;
  const text = encodeURIComponent(
    `Hi — I found your portfolio (${site.url}) and would like to discuss a project.`
  );
  return `https://wa.me/${digits}?text=${text}`;
}
