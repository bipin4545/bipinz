import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

/**
 * Robots directives. Next.js serves at /robots.txt automatically.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Do not index admin/auth/api routes if you add them later
        disallow: ['/api/', '/admin/', '/_next/', '/private/'],
      },
      // Google specifically — same rules but explicit
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
