import type { Guarantee, ProcessStep } from '@/lib/types';

export const guarantees: Guarantee[] = [
  {
    icon: 'clock',
    title: '12h response',
    description: 'Every email, every DM, every day. Business days, IST timezone.',
  },
  {
    icon: 'gauge',
    title: '95+ Lighthouse',
    description: 'Or I fix it free. Performance, SEO, Accessibility — all above 95.',
  },
  {
    icon: 'shield-check',
    title: 'NDAs welcome',
    description: 'All work is confidential by default. I sign standard NDAs same-day.',
  },
  {
    icon: 'life-buoy',
    title: '30-day support',
    description: 'Post-launch fixes included. Bugs, tweaks, small changes — no invoice.',
  },
];

export const processSteps: ProcessStep[] = [
  {
    num: '01',
    title: 'Discovery Call',
    meta: '30 min · free',
    description: 'Goals, constraints, timeline. No pressure.',
  },
  {
    num: '02',
    title: 'Proposal & Scope',
    meta: '48h turnaround',
    description: 'Fixed pricing, milestones, clear deliverables.',
  },
  {
    num: '03',
    title: 'Build & Iterate',
    meta: '2–6 weeks',
    description: 'Weekly Loom updates, staging previews, async.',
  },
  {
    num: '04',
    title: 'Launch & Support',
    meta: '30-day included',
    description: 'Monitoring, fixes, clean handoff to your team.',
  },
];
