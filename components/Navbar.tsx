'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTheme } from '@wrksz/themes/client';
import { Menu, Moon, Search, Sun, X, ArrowRight } from 'lucide-react';
import { site } from '@/lib/site';
import { LogoImage } from '@/components/LogoImage';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Writing' },
];

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  const openCmdK = () => window.dispatchEvent(new CustomEvent('open-cmdk'));

  return (
    <header className={`nav-glass sticky top-0 z-50 w-full overflow-x-hidden transition-all duration-300${scrolled ? ' nav-scrolled' : ''}`}>
      <div className="mx-auto max-w-6xl px-3 sm:px-6">
        <div className="grid h-16 min-w-0 grid-cols-[1fr_auto] items-center gap-2 sm:gap-3 md:grid-cols-[1fr_auto_1fr] md:gap-3 lg:gap-6">
          <Link
            href="/"
            className="flex min-w-0 justify-self-start overflow-hidden sm:max-w-none"
            aria-label="Home"
          >
            <LogoImage />
          </Link>

          <nav className="hidden min-w-0 items-center justify-center gap-3 text-sm text-[var(--muted)] md:flex lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`shrink-0 transition hover:text-[var(--text)] ${isActive(link.href) ? 'font-semibold text-[var(--text)]' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center justify-self-end justify-end gap-3 sm:gap-4">
            <button onClick={openCmdK} className="cmdk-trigger hidden md:inline-flex" aria-label="Open command palette">
              <Search className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">Search</span>
              <span className="kbd ml-0 hidden lg:inline lg:ml-4">⌘K</span>
            </button>
            <button onClick={toggleTheme} className="btn btn-ghost h-10 w-10 shrink-0 p-0" aria-label="Toggle theme">
              {resolvedTheme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            <Link
              href="/contact"
              className="btn btn-accent hidden h-10 shrink-0 px-5 text-sm sm:inline-flex sm:px-6 md:max-lg:px-5"
            >
              <span className="max-md:hidden">Book a Call</span>
              <span className="md:hidden">Book</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="btn btn-ghost h-10 w-10 shrink-0 p-0 md:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-0 flex min-h-0 flex-col bg-[var(--background)]/95 backdrop-blur-md">
            <div className="mx-auto flex h-16 w-full max-w-6xl shrink-0 items-center justify-between px-4 sm:px-6">
              <div className="flex items-center gap-3">
                <LogoImage />
                <div className="text-sm font-semibold">Menu</div>
              </div>
              <button onClick={() => setMobileOpen(false)} className="btn btn-ghost h-10 w-10 p-0" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain">
              <div className="mx-auto max-w-6xl px-4 pb-10 pt-2 sm:px-6">
                <div className="grid gap-3">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className={`card card-hover px-5 py-4 text-lg font-semibold ${isActive(link.href) ? 'text-[var(--primary)]' : ''}`}>
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-6 grid gap-3">
                  <Link href="/contact" onClick={() => setMobileOpen(false)} className="btn btn-accent h-12">
                    Book a Call <ArrowRight className="h-5 w-5" />
                  </Link>
                  <button type="button" onClick={toggleTheme} className="btn btn-ghost h-12">
                    {resolvedTheme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    Toggle theme
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
