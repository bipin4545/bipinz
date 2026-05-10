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

    // Only attach scroll listener when element is near viewport
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      let ticking = false;
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          if (!ref.current) return;
          const rect = ref.current.getBoundingClientRect();
          const distance = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
          ref.current.style.transform = `translateY(${Math.max(-1, Math.min(1, distance)) * -30}px)`;
          ticking = false;
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      io.disconnect();
    }, { rootMargin: '200px' });

    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`huge-bg-number hidden lg:block ${className}`} style={style} aria-hidden>
      {children}
    </div>
  );
}
