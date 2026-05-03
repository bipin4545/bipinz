import type { FAQ } from '@/lib/types';

export const faqs: FAQ[] = [
  {
    num: '01',
    question: 'Do you work with early-stage startups?',
    answer:
      "Yes, frequently. I've worked with pre-seed to Series B SaaS teams. For early-stage startups, I can often help scope a minimal viable engagement (e.g., a focused 2-week sprint) instead of a larger project — so you get momentum without burning runway.",
  },
  {
    num: '02',
    question: "What's a typical project timeline?",
    answer:
      'Most projects take 2–6 weeks depending on scope. A focused SEO audit or n8n workflow can ship in a week. A full Next.js migration with CMS and AI features usually runs 4–6 weeks. I share a detailed timeline in the proposal before we start — no rolling estimates.',
  },
  {
    num: '03',
    question: 'How do you handle revisions and scope changes?',
    answer:
      'The proposal defines scope clearly — deliverables, milestones, and a "done" definition. Small tweaks during the build are expected and included. For larger scope changes, I share a change order with the delta in time and cost so you can decide before I proceed. No surprises at invoice time.',
  },
  {
    num: '04',
    question: 'Can you integrate with our existing team?',
    answer:
      "Absolutely. I regularly work embedded with in-house engineering and product teams. I'll join your Slack, attend standups if you want (async-friendly otherwise), use your Linear/Notion, and follow your code conventions. I work best as an extension of your team, not a black box.",
  },
  {
    num: '05',
    question: 'Do you do equity or revenue-share deals?',
    answer:
      "Generally no. I prefer clear cash engagements with defined deliverables — it keeps expectations clean on both sides. For exceptional cases (strong product-market fit, aligned vision, meaningful equity), I'm open to discussing a hybrid arrangement. DM me with context.",
  },
  {
    num: '06',
    question: 'Will you sign an NDA?',
    answer:
      "Yes. I sign standard mutual NDAs same-day. All client work is confidential by default — I only share case studies with explicit permission, and I'm happy to anonymize results if preferred.",
  },
  {
    num: '07',
    question: "What if the project doesn't work out?",
    answer:
      "Rare, but here's the policy: after the Discovery call and proposal, if within the first week you feel it's not a fit, we can pause or end with no hard feelings — you pay only for hours already completed. I'd rather not work together than deliver unhappily.",
  },
  {
    num: '08',
    question: 'How does payment work?',
    answer:
      "Usually 50% upfront to start, 50% on delivery for fixed-scope projects. For longer engagements, I invoice every two weeks. I accept USD via Wise, Stripe, or direct bank transfer — whatever's easiest for your finance team. Indian clients can pay via UPI / NEFT.",
  },
];
