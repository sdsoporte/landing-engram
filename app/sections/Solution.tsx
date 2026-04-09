'use client';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Bot, Brain, Database } from 'lucide-react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useNeuralTarget } from '@/hooks/useNeuralTarget';

function SolutionNode({
  id,
  icon,
  title,
  subtitle,
  colorClass,
  borderColorClass,
  bgGradientClass,
  iconBgClass,
  shadowClass,
  hoverShadowClass,
  isCenter = false,
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  colorClass: string;
  borderColorClass: string;
  bgGradientClass: string;
  iconBgClass: string;
  shadowClass: string;
  hoverShadowClass?: string;
  isCenter?: boolean;
}) {
  const [ref, distance] = useNeuralTarget(`solution-${id}`, 260);
  const spring = useSpring(distance, { stiffness: 180, damping: 24 });
  const intensity = useTransform(spring, (d) => Math.max(0, 1 - d / 180));

  const scale = useTransform(intensity, (i) => 1 + i * 0.04);
  const y = useTransform(intensity, (i) => -i * 12);
  const boxShadow = useTransform(intensity, (i) => {
    const spread = isCenter ? 30 + i * 25 : 20 + i * 20;
    const alpha = 0.1 + i * 0.4;
    // Extraemos el color base del shadowClass para interpolar
    if (id === 'agent') return `0 0 ${spread}px -5px rgba(137, 180, 250, ${alpha})`;
    if (id === 'engram') return `0 0 ${spread}px -5px rgba(203, 166, 247, ${alpha})`;
    return `0 0 ${spread}px -5px rgba(166, 227, 161, ${alpha})`;
  });

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ scale, y, boxShadow }}
      className={`group flex items-center gap-4 p-5 rounded-2xl ${bgGradientClass} ${borderColorClass} ${isCenter ? 'border-2' : 'border'} ${hoverShadowClass ?? ''} transition-all duration-300 will-change-transform`}
    >
      <div className={`w-12 h-12 rounded-xl ${iconBgClass} flex items-center justify-center ${colorClass} ${shadowClass}`}>
        {icon}
      </div>
      <div>
        <div className={`font-semibold ${isCenter ? colorClass : 'text-[--color-text]'}`}>{title}</div>
        <div className="text-sm text-[--color-subtext0]">{subtitle}</div>
      </div>
    </motion.div>
  );
}

export function Solution() {
  const [headlineRef, headlineDistance] = useNeuralTarget('solution-headline', 180);
  const headlineSpring = useSpring(headlineDistance, { stiffness: 160, damping: 22 });
  const headlineIntensity = useTransform(headlineSpring, (d) => Math.max(0, 1 - d / 180));
  const headlineScale = useTransform(headlineIntensity, (i) => 1 - i * 0.05);
  const headlineY = useTransform(headlineIntensity, (i) => -i * 12);

  const [diagramRef, diagramDistance] = useNeuralTarget('solution-diagram', 280);
  const diagramSpring = useSpring(diagramDistance, { stiffness: 160, damping: 22 });
  const diagramIntensity = useTransform(diagramSpring, (d) => Math.max(0, 1 - d / 280));
  const diagramScale = useTransform(diagramIntensity, (i) => 1 + i * 0.02);
  const diagramBoxShadow = useTransform(diagramIntensity, (i) => {
    const alpha = 0.05 + i * 0.3;
    return `0 0 ${25 + i * 20}px -5px rgba(180, 190, 254, ${alpha})`;
  });

  return (
    <Section id="solution">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <motion.div
            ref={headlineRef as React.RefObject<HTMLDivElement>}
            style={{ scale: headlineScale, y: headlineY }}
            className="space-y-6 will-change-transform"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[--color-text]">
              engram connects{' '}
              <span className="text-[--color-mauve]">your memories</span>
            </h2>
            <p className="text-lg text-[--color-subtext0] leading-relaxed">
              engram gives your AI agents persistent memory across sessions. Built as a single Go binary
              with SQLite + FTS5, it provides full-text search, timeline navigation, and context injection
              for any MCP-compatible agent.
            </p>

            <ul className="space-y-5">
              {[
                'FTS5 full-text search across all memories',
                'Timeline with progressive disclosure',
                'Session context injection on startup',
                'Git sync for team collaboration',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[--color-green]/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[--color-green]" />
                  </div>
                  <span className="text-[--color-text]">{item}</span>
                </li>
              ))}
            </ul>

            <Button href="#features" size="lg" className="mt-8">
              Explore Features
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>

          {/* Right: Neural flow diagram */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[--color-mauve]/5 to-[--color-blue]/5 rounded-[2rem] blur-3xl" />

            <motion.div
              ref={diagramRef as React.RefObject<HTMLDivElement>}
              style={{ scale: diagramScale, boxShadow: diagramBoxShadow }}
              className="relative bg-gradient-to-br from-[--color-surface0]/80 to-[--color-crust]/80 rounded-[2rem] p-8 border border-[--color-surface1]/50 backdrop-blur-sm will-change-transform"
            >
              <div className="space-y-4">
                {/* Agent Node */}
                <SolutionNode
                  id="agent"
                  icon={<Bot className="w-6 h-6" />}
                  title="AI Agent"
                  subtitle="Claude, Cursor, OpenCode..."
                  colorClass="text-[--color-blue]"
                  borderColorClass="border-[--color-blue]/20 hover:border-[--color-blue]/40"
                  bgGradientClass="bg-gradient-to-r from-[--color-blue]/10 to-transparent"
                  iconBgClass="bg-[--color-blue]/20"
                  shadowClass="shadow-[0_0_15px_-3px_var(--color-blue)]/30"
                />

                {/* Connection line */}
                <div className="flex justify-center py-1">
                  <div className="relative w-px h-6 bg-gradient-to-b from-[--color-blue] to-[--color-mauve]">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[--color-mauve] animate-pulse shadow-[0_0_8px_var(--color-mauve)]" />
                  </div>
                </div>

                {/* Engram Node */}
                <SolutionNode
                  id="engram"
                  icon={<Brain className="w-6 h-6" />}
                  title="engram"
                  subtitle="Go binary + SQLite"
                  colorClass="text-[--color-mauve]"
                  borderColorClass="border-[--color-mauve]/40"
                  bgGradientClass="bg-gradient-to-r from-[--color-mauve]/20 to-[--color-mauve]/5"
                  iconBgClass="bg-[--color-mauve]/30"
                  shadowClass="shadow-[0_0_20px_-3px_var(--color-mauve)]/50"
                  hoverShadowClass="hover:shadow-[0_0_40px_-8px_var(--color-mauve)]/40"
                  isCenter
                />

                {/* Connection line */}
                <div className="flex justify-center py-1">
                  <div className="relative w-px h-6 bg-gradient-to-b from-[--color-mauve] to-[--color-green]">
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[--color-green] animate-pulse shadow-[0_0_8px_var(--color-green)]"
                      style={{ animationDelay: '0.5s' }}
                    />
                  </div>
                </div>

                {/* Database Node */}
                <SolutionNode
                  id="db"
                  icon={<Database className="w-6 h-6" />}
                  title="SQLite + FTS5"
                  subtitle="~/.engram/engram.db"
                  colorClass="text-[--color-green]"
                  borderColorClass="border-[--color-green]/20 hover:border-[--color-green]/40"
                  bgGradientClass="bg-gradient-to-r from-[--color-green]/10 to-transparent"
                  iconBgClass="bg-[--color-green]/20"
                  shadowClass="shadow-[0_0_15px_-3px_var(--color-green)]/30"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
