import type { SimpleIcon } from 'simple-icons';
import {
  siAnthropic,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
  siWordpress,
} from 'simple-icons';

import { SITE_TECH_STACK_LABELS, type SiteTechStackLabel } from './site-tech-stack-labels';

/** About section — import this only from server components (e.g. About) to keep icons off the client bundle */
export type SiteTechStackRow = {
  label: SiteTechStackLabel;
  icons: SimpleIcon[];
  /** Abstract glyph before brand SVGs (OpenAI is not shipped in simple-icons) */
  lucideLeading?: 'sparkles';
};

const ROWS: Omit<SiteTechStackRow, 'label'>[] = [
  { icons: [siNextdotjs] },
  { icons: [siReact] },
  { icons: [siTypescript] },
  { icons: [siTailwindcss] },
  { icons: [siWordpress] },
  { icons: [siN8n] },
  { lucideLeading: 'sparkles', icons: [siAnthropic] },
  { icons: [siNodedotjs] },
  { icons: [siPython] },
  { icons: [siPostgresql] },
  { icons: [siSupabase] },
  { icons: [siVercel] },
];

export const SITE_TECH_STACK: SiteTechStackRow[] = SITE_TECH_STACK_LABELS.map((label, i) => ({
  label,
  ...ROWS[i],
}));
