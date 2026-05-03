import type { Metadata } from 'next';
import { site } from './site';

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  noindex?: boolean;
}

/**
 * Build Next.js Metadata object with canonical URL, OG tags, and X link-preview cards (`metadata.twitter`).
 * Use on every page to avoid duplicate titles/descriptions and to pass canonical signals.
 */
export function buildMetadata({
  title,
  description,
  path,
  ogType = 'website',
  publishedTime,
  modifiedTime,
  authors,
  tags,
  noindex = false,
}: SeoOptions): Metadata {
  const url = `${site.url}${path}`;
  const fullTitle = title === site.name ? title : `${title} · ${site.name}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: ogType,
      url,
      title: fullTitle,
      description,
      siteName: site.name,
      locale: 'en_US',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
      ...(tags && { tags }),
    },
    // X (Next.js metadata key remains `twitter`)
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: '@yourname',
    },
  };
}
