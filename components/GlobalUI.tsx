'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@wrksz/themes/client';
import {
  Search,
  Home,
  Briefcase,
  Layers,
  User,
  PenTool,
  HelpCircle,
  Mail,
  Calendar,
  Copy,
  Send,
  SunMoon,
  Github,
  Linkedin,
  ArrowUp,
  MessageCircle,
} from 'lucide-react';
import { site, getWhatsAppChatUrl } from '@/lib/site';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';

interface Command {
  group: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  meta?: string;
  action: () => void;
  keywords: string;
}

export function GlobalUI() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  const [cmdOpen, setCmdOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollTopVisible, setScrollTopVisible] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const whatsappUrl = getWhatsAppChatUrl();

  // Theme toggle
  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  // Commands list
  const commands: Command[] = [
    { group: 'Navigate', label: 'Home', Icon: Home, action: () => { setCmdOpen(false); router.push('/'); }, keywords: 'home start index' },
    { group: 'Navigate', label: 'Work & Case Studies', Icon: Briefcase, action: () => { setCmdOpen(false); router.push('/work'); }, keywords: 'work case studies projects portfolio' },
    { group: 'Navigate', label: 'Services', Icon: Layers, action: () => { setCmdOpen(false); router.push('/services'); }, keywords: 'services offerings what i do' },
    { group: 'Navigate', label: 'About', Icon: User, action: () => { setCmdOpen(false); router.push('/about'); }, keywords: 'about me bio' },
    { group: 'Navigate', label: 'Writing & Blog', Icon: PenTool, action: () => { setCmdOpen(false); router.push('/blog'); }, keywords: 'blog writing articles posts' },
    { group: 'Navigate', label: 'FAQ', Icon: HelpCircle, action: () => { setCmdOpen(false); router.push('/faq'); }, keywords: 'faq questions' },
    { group: 'Navigate', label: 'Contact', Icon: Mail, action: () => { setCmdOpen(false); router.push('/contact'); }, keywords: 'contact hire email' },
    { group: 'Actions', label: 'Book a 30-min Call', Icon: Calendar, meta: 'cal.com', action: () => { window.open(site.social.calcom, '_blank'); setCmdOpen(false); }, keywords: 'book call meeting discovery' },
    { group: 'Actions', label: 'Copy email address', Icon: Copy, meta: site.email, action: () => { navigator.clipboard?.writeText(site.email); setCmdOpen(false); }, keywords: 'email copy' },
    { group: 'Actions', label: 'Send email', Icon: Send, action: () => { window.location.href = `mailto:${site.email}?subject=Project%20Inquiry`; setCmdOpen(false); }, keywords: 'email send inquiry' },
    ...(whatsappUrl
      ? ([
          {
            group: 'Actions',
            label: 'Open WhatsApp chat',
            Icon: MessageCircle,
            meta: 'WA',
            action: () => {
              window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
              setCmdOpen(false);
            },
            keywords: 'whatsapp wa message chat',
          },
        ] satisfies Command[])
      : []),
    { group: 'Actions', label: 'Toggle theme', Icon: SunMoon, meta: 'T', action: () => { toggleTheme(); setCmdOpen(false); }, keywords: 'theme dark light mode' },
    { group: 'Social', label: 'GitHub', Icon: Github, meta: '@yourname', action: () => { window.open(site.social.github, '_blank'); setCmdOpen(false); }, keywords: 'github code' },
    { group: 'Social', label: 'LinkedIn', Icon: Linkedin, meta: '@yourname', action: () => { window.open(site.social.linkedin, '_blank'); setCmdOpen(false); }, keywords: 'linkedin professional' },
  ];

  const filtered = query.trim()
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.keywords.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  // Listen for open-cmdk custom event from Navbar
  useEffect(() => {
    const handler = () => setCmdOpen(true);
    window.addEventListener('open-cmdk', handler);
    return () => window.removeEventListener('open-cmdk', handler);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen((v) => !v);
        return;
      }
      if (e.key === 'Escape' && cmdOpen) {
        e.preventDefault();
        setCmdOpen(false);
        return;
      }
      if (typing) return;
      if (cmdOpen) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key.toLowerCase() === 't') toggleTheme();
      if (e.key === '/') {
        e.preventDefault();
        setCmdOpen(true);
      }
      if (e.key.toLowerCase() === 'c') router.push('/contact');
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [cmdOpen, toggleTheme, router]);

  // Focus input on open, body scroll lock
  useEffect(() => {
    if (cmdOpen) {
      setQuery('');
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [cmdOpen]);

  // Cursor glow — RAF-throttled mousemove (one DOM write per frame max)
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let pending = false;
    let cx = 0, cy = 0;
    const move = (e: MouseEvent) => {
      cx = e.clientX; cy = e.clientY;
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        if (glowRef.current) {
          glowRef.current.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
        }
        pending = false;
      });
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  // Scroll progress + scroll top
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(total > 0 ? (doc.scrollTop / total) * 100 : 0);
      setScrollTopVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Palette keyboard navigation
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      filtered[selected]?.action();
    }
  };

  // Group commands
  const grouped = filtered.reduce<Record<string, { cmd: Command; index: number }[]>>((acc, cmd, index) => {
    if (!acc[cmd.group]) acc[cmd.group] = [];
    acc[cmd.group].push({ cmd, index });
    return acc;
  }, {});

  return (
    <>
      {/* Scroll progress */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden />

      {/* Cursor glow */}
      <div ref={glowRef} className="cursor-glow" aria-hidden />

      {/* Scroll to top */}
      <button
        className={`scroll-top-btn ${scrollTopVisible ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      <WhatsAppFloat />

      {/* Command palette */}
      {cmdOpen && (
        <div
          className="cmdk-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          onClick={(e) => {
            if (e.target === e.currentTarget) setCmdOpen(false);
          }}
        >
          <div className="cmdk-modal">
            <div className="cmdk-input-wrap">
              <Search className="h-4 w-4 text-[var(--muted)]" />
              <input
                ref={inputRef}
                className="cmdk-input"
                type="text"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelected(0);
                }}
                onKeyDown={handleKey}
                autoComplete="off"
              />
              <span className="cmdk-hint">ESC</span>
            </div>
            <div className="cmdk-results">
              {filtered.length === 0 ? (
                <div className="cmdk-item" style={{ justifyContent: 'center', color: 'var(--muted)' }}>
                  No results
                </div>
              ) : (
                Object.entries(grouped).map(([group, items]) => (
                  <div key={group}>
                    <div className="cmdk-group-label">{group}</div>
                    {items.map(({ cmd, index }) => (
                      <button
                        key={cmd.label}
                        className={`cmdk-item ${index === selected ? 'selected' : ''}`}
                        onMouseEnter={() => setSelected(index)}
                        onClick={() => cmd.action()}
                      >
                        <cmd.Icon className="h-4 w-4 text-[var(--muted)]" />
                        <span className="cmdk-item-title">{cmd.label}</span>
                        {cmd.meta && <span className="cmdk-item-meta">{cmd.meta}</span>}
                      </button>
                    ))}
                  </div>
                ))
              )}
            </div>
            <div className="cmdk-footer">
              <span className="cmdk-footer-group"><span className="kbd">↑</span><span className="kbd">↓</span> navigate</span>
              <span className="cmdk-footer-group"><span className="kbd">↵</span> select</span>
              <span className="cmdk-footer-group"><span className="kbd">⌘K</span> toggle</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
