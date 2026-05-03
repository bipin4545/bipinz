import { posts } from '@/content/posts';
import { site } from '@/lib/site';

/**
 * RSS 2.0 feed at /feed.xml — submit to feed aggregators
 * and link via <link rel="alternate" type="application/rss+xml"> in layout head.
 *
 * Why this matters at agency level:
 * - Signals editorial authority to search engines
 * - Enables syndication (Medium, Dev.to, Hacker News readers)
 * - Used by Google News and feed readers
 */
export async function GET() {
  const escape = (str: string) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

  const sorted = [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const items = sorted
    .map((p) => {
      const title = `${p.title} ${p.titleAccent ?? ''}`.trim();
      const url = `${site.url}/blog/${p.slug}`;
      const pubDate = new Date(p.publishedAt).toUTCString();
      return `    <item>
      <title>${escape(title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escape(p.excerpt)}</description>
      <category>${escape(p.category)}</category>
      <author>noreply@${site.url.replace('https://', '')} (${escape(site.name)})</author>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(site.name)} — Writing</title>
    <link>${site.url}/blog</link>
    <description>${escape(site.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
