'use client';
import dynamic from 'next/dynamic';

const GlobalUI = dynamic(() => import('@/components/GlobalUI').then(m => ({ default: m.GlobalUI })), { ssr: false });

export function DeferredGlobalUI() {
  return <GlobalUI />;
}
