import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import {
  Terminal,
  Server,
  Search,
  Clock,
  GitBranch,
  Shield,
} from 'lucide-react';

const features = [
  {
    icon: <Terminal className="w-6 h-6" />,
    title: 'CLI & TUI',
    description:
      'Interactive terminal UI with Bubbletea for browsing memories, plus full CLI for scripting and automation.',
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: 'HTTP API & MCP Server',
    description:
      'REST API on port 7437 plus MCP stdio transport. Works with Claude Code, Cursor, OpenCode, and any MCP-compatible agent.',
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: 'Full-Text Search (FTS5)',
    description:
      'Search across all memories with type, project, and scope filters. Find decisions, bugfixes, and patterns instantly.',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Timeline & Context',
    description:
      'Progressive disclosure pattern. Start with search, drill into timeline, then get full observation details.',
  },
  {
    icon: <GitBranch className="w-6 h-6" />,
    title: 'Git Sync',
    description:
      'Share memories through git with chunked sync. Team members clone the repo and get shared context automatically.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Privacy Tags',
    description:
      'Strip sensitive data with &lt;private&gt; tags. Redacted at two layers: plugin and store. Defense in depth.',
  },
];

export function Features() {
  return (
    <Section id="features" variant="muted">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
            Everything you need for{' '}
            <span className="text-[var(--color-mauve)]">persistent memory</span>
          </h2>
          <p className="text-lg text-[var(--color-subtext0)] max-w-2xl mx-auto">
            Six powerful features designed for AI coding agents. Multiple interfaces, powerful search, and team collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
