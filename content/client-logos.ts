/** Paths under `public/images/` — folder names include spaces */
const DARK_DIR = 'section dark_logos';
const LITE_DIR = 'section lite_logos';

function asset(folder: string, filename: string) {
  return `/images/${encodeURIComponent(folder)}/${encodeURIComponent(filename)}`;
}

export interface ClientLogoPair {
  alt: string;
  /** File inside `public/images/section dark_logos/` */
  darkFile: string;
  /** File inside `public/images/section lite_logos/` */
  liteFile: string;
}

/** Same order as grid: paired dark (site dark theme) vs lite (site light theme) assets */
export const clientLogoPairs: ClientLogoPair[] = [
  { alt: 'Lota', darkFile: 'lota dark.png', liteFile: 'lota lite.svg' },
  {
    alt: 'Most Popular AI tools',
    darkFile: 'Most Popular AI tools dark.png',
    liteFile: 'Most Popular AI tools lite.png',
  },
  { alt: 'Shep Physio', darkFile: 'shepphysio dark.png', liteFile: 'shepphysio lite.png' },
  {
    alt: 'Spicy Ranked',
    darkFile: 'spicyranked-logo-cropped.png',
    liteFile: 'spicyranked-logo-cropped.png',
  },
  {
    alt: 'Tech Savy Crew',
    darkFile: 'Tech-Savy-Crew lite.webp',
    liteFile: 'techsavycrew_logo_lite.png',
  },
  { alt: 'Zahnarzt', darkFile: 'zahnarzt.png', liteFile: 'zahnarzt.png' },
];

export function clientLogoSrc(pair: ClientLogoPair, theme: 'light' | 'dark') {
  return theme === 'light' ? asset(LITE_DIR, pair.liteFile) : asset(DARK_DIR, pair.darkFile);
}
