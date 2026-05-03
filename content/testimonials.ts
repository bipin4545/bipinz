import type { Testimonial } from '@/lib/types';

/** Curated strongest quotes — varied length & tone */
export const testimonials: Testimonial[] = [
  {
    id: 't-james',
    quote:
      'We inherited a WordPress stack that could not ship. The Next.js migration kept every URL and schema intact, and LCP dropped from the mid‑4s to under a second on our money pages. Weekly Loom updates meant our marketing lead never had to chase for status.',
    attribution: {
      type: 'named',
      fullName: 'James Richardson',
      role: 'VP of Engineering',
      company: 'HelioCRM',
    },
    avatar: { kind: 'none' },
  },
  {
    id: 't-marta',
    quote: 'Shipped in three weeks. Scope did not creep. That almost never happens.',
    attribution: {
      type: 'named',
      fullName: 'Marta Kowalska',
      role: 'Head of Growth',
      company: 'NorthPeak',
    },
    avatar: { kind: 'none' },
  },
  {
    id: 't-anon',
    quote:
      'The n8n work was the opposite of a black box: idempotent writes, dead‑letter routing, and Slack alerts we could tune. When Stripe hiccupped at 2 AM the pipeline retried cleanly and we woke up to one thread instead of twenty.',
    attribution: {
      type: 'anonymous',
      line: 'Principal Engineer, B2B SaaS (Series B), Singapore',
    },
    avatar: { kind: 'none' },
  },
  {
    id: 't-priya',
    quote:
      'Our RAG assistant needed citations, similarity thresholds, and an audit trail for compliance. You treated it like a product surface, not a demo — and our CS team actually trusts the answers now.',
    attribution: {
      type: 'named',
      fullName: 'Priya Natarajan',
      role: 'Director of Product',
      company: 'Klarbyte',
    },
    avatar: { kind: 'none' },
  },
];

export const allTestimonials = testimonials;

/** Second marquee row — reversed order for visual variety */
export const testimonialsMarqueeRow2 = [...allTestimonials].reverse();
