import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Instrument_Serif, Caveat } from 'next/font/google';
import { ThemeProvider } from '@wrksz/themes/next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlobalUI } from '@/components/GlobalUI';
import { JsonLd } from '@/components/JsonLd';
import { WebVitals } from '@/components/WebVitals';
import { site } from '@/lib/site';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  preload: false, // Only used in small UI elements — no need to preload
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: '400',
  style: 'italic',
  display: 'swap',
  preload: false,
});

/** Readable handwriting — name signature in About */
const caveatSignature = Caveat({
  subsets: ['latin'],
  variable: '--font-signature',
  weight: '600',
  display: 'optional',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — AI-Powered Web Developer & Automation Engineer · bipinz`,
    template: `%s · bipinz`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  generator: 'Next.js',
  keywords: [
    'Next.js developer',
    'AI automation',
    'n8n workflows',
    'SaaS development',
    'WordPress migration',
    'Technical SEO',
    'Claude API',
    'AI agents',
    'React developer',
    'TypeScript developer',
    'India freelance developer',
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: site.url,
    title: `${site.name} — AI-Powered Web Developer`,
    description: site.description,
    siteName: site.name,
    locale: 'en_US',
  },
  // X link previews (Next.js field name is still `twitter`)
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} · bipinz — AI-Powered Web Developer`,
    description: site.description,
    creator: '@bipinz',
    site: '@bipinz',
  },
  alternates: {
    canonical: site.url,
    types: {
      'application/rss+xml': `${site.url}/rss.xml`, // Optional — add if you build RSS feed
    },
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
  manifest: '/manifest.webmanifest',
  verification: {
    // Add these after creating accounts in Google Search Console / Bing Webmaster
    // google: 'your-google-site-verification-code',
    // other: { 'msvalidate.01': 'your-bing-verification-code' },
  },
  category: 'technology',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0F' },
    { media: '(prefers-color-scheme: light)', color: '#F7F7FB' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark light',
};

// Global structured data — appears on every page
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${site.url}/#person`,
  name: site.name,
  jobTitle: 'Next.js Developer & Automation Engineer',
  description: site.description,
  url: site.url,
  image: `${site.url}/opengraph-image`,
  sameAs: [site.social.linkedin, site.social.github],
  knowsAbout: site.techStack,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
    addressLocality: site.location,
  },
};

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${site.url}/#business`,
  name: `${site.name} — AI-Powered Web Platforms & Automation`,
  url: site.url,
  image: `${site.url}/opengraph-image`,
  description: site.description,
  founder: { '@id': `${site.url}/#person` },
  areaServed: ['US', 'UK', 'EU', 'International'],
  serviceType: [
    'AI Web Apps',
    'WordPress to Next.js Migration',
    'n8n Automation',
    'AI Agents & Chatbots',
    'Technical SEO',
    'Bug Fixes & Refactoring',
  ],
  priceRange: '$800 - $5000+',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '19:00',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-US"
      className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} ${caveatSignature.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* RSS / Atom feed — signals editorial authority to Google */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${site.name} — Blog RSS`}
          href={`${site.url}/feed.xml`}
        />

        {/* Search Console verification — paste your codes here after registering */}
        {/* <meta name="google-site-verification" content="YOUR_GOOGLE_CODE" /> */}
        {/* <meta name="msvalidate.01" content="YOUR_BING_CODE" /> */}
        {/* <meta name="yandex-verification" content="YOUR_YANDEX_CODE" /> */}

        {/* Canonical author ref for IndexNow and Google */}
        <link rel="me" href={site.social.linkedin} />
        <link rel="me" href={site.social.github} />

        {/* Global JSON-LD — Person + ProfessionalService on every page */}
        <JsonLd data={[personSchema, professionalServiceSchema]} />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          themes={['light', 'dark']}
          storage="localStorage"
        >
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] bg-[var(--surface)] border border-[var(--border)] px-3 py-2 rounded-[10px] text-sm"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main" className="bg-grid relative min-w-0">
            {children}
          </main>
          <Footer />
          <GlobalUI />
          <WebVitals />
        </ThemeProvider>
      </body>
    </html>
  );
}
