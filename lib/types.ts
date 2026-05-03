export interface Service {
  slug: string;
  num: string;
  title: string;
  description: string;
  techPills: string[];
  price: string;
  cta: string;
  featured?: boolean;
  icon: string;
  /** Optional preview under `/public` — shown between copy and pricing on desktop */
  image?: string;
  imageAlt?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

/** Work page filters — assign one or more per project */
export type PortfolioServiceTag =
  | 'migrations'
  | 'ai-agents'
  | 'automation'
  | 'seo-performance'
  | 'refactoring';

export interface Project {
  id: string;
  slug: string;
  num: string;
  /** Display line e.g. "SaaS · Germany" — keep for OG + related cards */
  clientType: string;
  industry: string;
  country: string;
  year: number;
  services: PortfolioServiceTag[];
  /** Renders in Section 2 (home still uses first three in array order) */
  featured: boolean;
  /** Top overlay chip, e.g. "Next.js migration" */
  deliveryTag: string;
  title: string;
  titleAccent: string;
  pitch: string;
  problem: string;
  solution: string;
  metrics: ProjectMetric[];
  techStack: string[];
  liveUrl?: string;
  tag: string;
  /** `mock` uses stylized BrowserMock; `image` uses `image` + `imageAlt` */
  visual: 'mock' | 'image';
  mockType?: 'dashboard' | 'workflow' | 'chat';
  image?: string;
  imageAlt?: string;
}

/** Optional visual — real photo, monochrome logo asset, or none (typography only). */
export type TestimonialAvatar =
  | { kind: 'none' }
  | { kind: 'logo'; src: string; alt: string }
  | { kind: 'photo'; src: string; alt: string };

export type TestimonialAttribution =
  | {
      type: 'named';
      fullName: string;
      role: string;
      company: string;
    }
  | {
      type: 'anonymous';
      /** e.g. "Founder, Series-A FinTech, Berlin" */
      line: string;
    };

export interface Testimonial {
  id: string;
  /** Plain text — no `<em>` / HTML */
  quote: string;
  attribution: TestimonialAttribution;
  avatar: TestimonialAvatar;
}

export interface FAQ {
  num: string;
  question: string;
  answer: string;
}

export interface Post {
  slug: string;
  title: string;
  titleAccent?: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  publishedAt: string;
  featured?: boolean;
  icon: string;
  /** Gradient fallback when `coverImage` is omitted */
  coverClass: 'blog-cover-1' | 'blog-cover-2' | 'blog-cover-3';
  /** Card / hero image under `public/images/Blog/` */
  coverImage?: string;
  coverImageAlt?: string;
  content?: string;
}

export interface Guarantee {
  icon: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  num: string;
  title: string;
  meta: string;
  description: string;
}
