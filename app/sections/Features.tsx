'use client';

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
import { motion, useSpring, useTransform } from 'framer-motion';
import { useNeuralTarget } from '@/hooks/useNeuralTarget';

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
      'Strip sensitive data with <private> tags. Redacted at two layers: plugin and store. Defense in depth.',
  },
];

function FeatureCard({ feature }: { feature: typeof features[0] }) {
  const [ref, distance] = useNeuralTarget(`feature-${feature.title}`, 220);
  const spring = useSpring(distance, { stiffness: 180, damping: 24 });
  const intensity = useTransform(spring, (d) => Math.max(0, 1 - d / 220));

  const scale = useTransform(intensity, (i) => 1 - i * 0.03);
  const y = useTransform(intensity, (i) => -i * 8);
  const boxShadow = useTransform(intensity, (i) => {
    const alpha = 0.05 + i * 0.25;
    return `0 0 ${20 + i * 15}px -5px rgba(203, 166, 247, ${alpha})`;
  });

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ scale, y, boxShadow }}
      className="will-change-transform"
    >
      <Card
        icon={feature.icon}
        title={feature.title}
        description={feature.description}
      />
    </motion.div>
  );
}

export function Features() {
  const [headlineRef, headlineDistance] = useNeuralTarget('features-headline', 200);
  const spring = useSpring(headlineDistance, { stiffness: 160, damping: 22 });
  const intensity = useTransform(spring, (d) => Math.max(0, 1 - d / 200));
  const headlineScale = useTransform(intensity, (i) => 1 - i * 0.05);
  const headlineY = useTransform(intensity, (i) => -i * 12);

  return (
    <Section id="features" variant="muted">
      <Container>
        <motion.div
          ref={headlineRef as React.RefObject<HTMLDivElement>}
          style={{ scale: headlineScale, y: headlineY }}
          className="text-center mb-12 will-change-transform"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[--color-text] mb-4">
            Everything you need for{' '}
            <span className="text-[--color-mauve]">persistent memory</span>
          </h2>
          <p className="text-lg text-[--color-subtext0] max-w-3xl mx-auto">
            Six powerful features designed for AI coding agents. Multiple interfaces, powerful search, and team collaboration.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
