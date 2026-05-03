import Link from 'next/link';
import { ArrowLeft, Home, Mail } from 'lucide-react';
import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you were looking for does not exist.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative min-h-[70vh] grid place-items-center">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-20 text-center">
        <div className="pill mx-auto">
          <span className="mono text-xs">404 · Not Found</span>
        </div>
        <h1 className="h-display mt-7">
          This page took a{' '}
          <span className="serif text-[var(--primary)]">wrong turn.</span>
        </h1>
        <p className="mt-6 text-lg text-[var(--muted)] leading-relaxed">
          The URL you&apos;re looking for doesn&apos;t exist or has moved. No worries —
          try the home page or reach out and I&apos;ll point you in the right direction.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="btn btn-primary px-5 h-12 text-sm">
            <Home className="h-4 w-4" /> Back to home
          </Link>
          <Link href="/work" className="btn btn-ghost px-5 h-12 text-sm">
            <ArrowLeft className="h-4 w-4" /> View my work
          </Link>
          <a href={`mailto:${site.email}`} className="btn btn-ghost px-5 h-12 text-sm">
            <Mail className="h-4 w-4" /> Email me
          </a>
        </div>
      </div>
    </section>
  );
}
