'use client';

import { useReportWebVitals } from 'next/web-vitals';

/**
 * Core Web Vitals reporting. Sends real user monitoring (RUM) data
 * to Vercel Analytics (if enabled) and optional GA4.
 *
 * Metrics tracked:
 * - LCP (Largest Contentful Paint)
 * - CLS (Cumulative Layout Shift)
 * - INP (Interaction to Next Paint) — replaced FID in 2024
 * - FCP (First Contentful Paint)
 * - TTFB (Time to First Byte)
 *
 * Why this matters at agency level:
 * - Lab scores (Lighthouse) lie. Field data (real users) tells the truth.
 * - Google uses p75 Core Web Vitals as a ranking signal.
 * - Catch regressions before users complain.
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    // Vercel Analytics auto-captures if enabled. Custom reporting below.
    if (typeof window === 'undefined') return;

    // Log in development for debugging
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('[Web Vital]', metric.name, metric.value.toFixed(2), metric);
    }

    // Send to GA4 if configured (uncomment + add measurement ID in .env)
    // const gtag = (window as any).gtag;
    // if (typeof gtag === 'function') {
    //   gtag('event', metric.name, {
    //     value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    //     metric_id: metric.id,
    //     metric_value: metric.value,
    //     metric_delta: metric.delta,
    //   });
    // }

    // Send to your own analytics endpoint if needed
    // const body = JSON.stringify(metric);
    // (navigator.sendBeacon && navigator.sendBeacon('/api/vitals', body)) ||
    //   fetch('/api/vitals', { body, method: 'POST', keepalive: true });
  });

  return null;
}
