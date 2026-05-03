import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { site } from '@/lib/site';
import { JsonLd } from './JsonLd';

interface Crumb {
  label: string;
  href: string;
}

/**
 * Breadcrumbs with BreadcrumbList JSON-LD schema.
 * Use on nested pages like /work/[slug] and /blog/[slug].
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: site.url,
      },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.label,
        item: `${site.url}${item.href}`,
      })),
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--muted)] mono flex-wrap">
        <Link href="/" className="hover:text-[var(--text)] inline-flex items-center gap-1 transition">
          <Home className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only">Home</span>
        </Link>
        {items.map((item, i) => (
          <span key={item.href} className="inline-flex items-center gap-2">
            <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-[var(--text)]">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="hover:text-[var(--text)] transition">
                {item.label}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
