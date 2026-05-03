'use client';

import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

export function Counter({ target, suffix = '', duration }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
            if (reduced) {
              setCurrent(target);
              return;
            }
            const dur = duration ?? (target > 1000 ? 1800 : 1200);
            const start = performance.now();
            const step = (now: number) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / dur, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCurrent(Math.floor(target * eased));
              if (progress < 1) requestAnimationFrame(step);
              else setCurrent(target);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [target, duration, started]);

  return (
    <span ref={ref} className="counter">
      {current.toLocaleString()}
      {started && current === target && suffix}
    </span>
  );
}
