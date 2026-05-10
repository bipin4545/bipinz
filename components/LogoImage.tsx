'use client';
import Image from 'next/image';
import { useTheme } from '@wrksz/themes/client';
import { site } from '@/lib/site';

export function LogoImage() {
  const { resolvedTheme } = useTheme();
  const src =
    resolvedTheme === 'light'
      ? '/logos/bipinz lite logo.png'
      : '/logos/bipinz Dark Logo.png';
  return (
    <Image
      src={src}
      alt={site.name}
      width={120}
      height={36}
      sizes="160px"
      className="h-7 w-auto max-w-[100px] object-contain sm:h-11 sm:max-w-[160px]"
      priority
    />
  );
}
