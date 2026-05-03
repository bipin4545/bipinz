import type { Project } from '@/lib/types';

interface SectionOrnamentProps {
  label: string;
  variant?: 'diamond' | 'dot';
}

export function SectionOrnament({ label, variant = 'diamond' }: SectionOrnamentProps) {
  const Mark = () =>
    variant === 'diamond' ? (
      <span className="section-ornament-diamond" />
    ) : (
      <span className="section-ornament-dot" />
    );

  return (
    <div className="section-ornament" aria-hidden>
      <div className="section-ornament-line" />
      <div className="section-ornament-mark">
        <Mark />
        <span>{label}</span>
        <Mark />
      </div>
      <div className="section-ornament-line" />
    </div>
  );
}

// Browser mockup for case studies
export function BrowserMock({ project }: { project: Project }) {
  if (!project.mockType) return null;
  const config = getMockConfig(project.mockType);

  return (
    <div className="mock">
      <div className="mock-topbar">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <div className="ml-2 text-xs text-[var(--muted)] mono">{config.url(project.slug)}</div>
      </div>
      <div className="mock-body">
        <div className="mock-block">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-[var(--muted)] mono">{config.blockA}</div>
            <div className="text-xs text-[var(--primary)] mono">{config.blockATag}</div>
          </div>
          <div className="mock-line" style={{ width: '78%' }} />
          <div className="mock-line gray" style={{ width: '92%' }} />
          <div className="mock-line gray" style={{ width: '68%' }} />
          <div className="mock-line" style={{ width: '54%' }} />
        </div>
        <div className="mock-block">
          <div className="text-xs text-[var(--muted)] mono mb-3">{config.blockB}</div>
          <div className="mock-line gray" style={{ width: '88%' }} />
          <div className="mock-line" style={{ width: '64%' }} />
          <div className="mock-line gray" style={{ width: '76%' }} />
          <div className="mock-line" style={{ width: '58%' }} />
        </div>
      </div>
      <div className="mock-stats">
        {project.metrics.map((m, i) => (
          <div key={i} className="mock-stat">
            <div className="text-xs text-[var(--muted)] mono">{m.label.split(' ')[0]}</div>
            <div className="mt-1 text-sm font-semibold">{m.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getMockConfig(type: NonNullable<Project['mockType']>) {
  switch (type) {
    case 'dashboard':
      return {
        url: (slug: string) => `app.${slug.split('-')[0]}.io`,
        blockA: 'Dashboard',
        blockATag: 'AI Assist',
        blockB: 'Workflow',
      };
    case 'workflow':
      return {
        url: (slug: string) => `n8n · ${slug.split('-')[0]}`,
        blockA: 'Pipeline',
        blockATag: 'n8n',
        blockB: 'Logs',
      };
    case 'chat':
      return {
        url: (slug: string) => `${slug.split('-')[0]}.ai · chat`,
        blockA: 'Docs Q&A',
        blockATag: 'RAG',
        blockB: 'Actions',
      };
  }
}
