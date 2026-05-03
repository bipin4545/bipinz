'use client';

import { useEffect, useRef } from 'react';

interface HugeBgNumberProps {
  children: string;
  style?: React.CSSProperties;
  className?: string;
}

export function HugeBgNumber({ children, style, className = '' }: HugeBgNumberProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!ref.current) return;
          const rect = ref.current.getBoundingClientRect();
          const viewportCenter = window.innerHeight / 2;
          const elCenter = rect.top + rect.height / 2;
          const distance = (elCenter - viewportCenter) / window.innerHeight;
          const clamped = Math.max(-1, Math.min(1, distance));
          const translateY = clamped * -30;
          ref.current.style.transform = `translateY(${translateY}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={ref} className={`huge-bg-number hidden lg:block ${className}`} style={style} aria-hidden>
      {children}
    </div>
  );
}
