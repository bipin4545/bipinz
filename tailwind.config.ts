import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        /* Scale-only so parent wrappers can own translate positioning (no clip / no drift off-screen) */
        'hero-blob-1': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        'hero-blob-2': {
          '0%, 100%': { transform: 'scale(1.03)' },
          '50%': { transform: 'scale(1.14)' },
        },
        'hero-blob-3': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.12)' },
        },
        'work-rise': {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'hero-blob-1': 'hero-blob-1 24s ease-in-out infinite',
        'hero-blob-2': 'hero-blob-2 22s ease-in-out infinite',
        'hero-blob-3': 'hero-blob-3 25s ease-in-out infinite',
        'work-rise': 'work-rise 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
      },
      maxWidth: {
        /** Main page shell (navbar, sections, footer) — desktop content rail */
        '6xl': '1300px',
      },
      colors: {
        bg: 'var(--background)',
        surface: 'var(--surface)',
        border: 'var(--border)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        primary: '#673DE6',
        accent: '#CCFF00',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        signature: ['var(--font-signature)', 'cursive', 'system-ui'],
      },
      borderRadius: {
        card: '16px',
        btn: '10px',
      },
    },
  },
  plugins: [],
};

export default config;
