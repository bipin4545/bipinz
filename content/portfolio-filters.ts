import type { PortfolioServiceTag } from '@/lib/types';

export const PORTFOLIO_SERVICE_LABELS: Record<PortfolioServiceTag, string> = {
  migrations: 'Migrations',
  'ai-agents': 'AI Agents',
  automation: 'Automation',
  'seo-performance': 'SEO / Performance',
  refactoring: 'Refactoring',
};

export function labelForService(tag: PortfolioServiceTag): string {
  return PORTFOLIO_SERVICE_LABELS[tag];
}
