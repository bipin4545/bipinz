import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { projects } from '@/content/projects';
import { posts } from '@/content/posts';

/**
 * Dynamic sitemap generation.
 * Next.js serves this at /sitemap.xml automatically.
 * Submit this URL to Google Search Console after deployment.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${site.url}/work`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${site.url}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${site.url}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${site.url}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
