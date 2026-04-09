'use client';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Brain, RefreshCw, AlertTriangle, Puzzle } from 'lucide-react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useNeuralTarget } from '@/hooks/useNeuralTarget';

const problems = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'Lost Context',
    description: 'Your AI starts every session blank. No memory of previous decisions, patterns, or discussions.',
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: 'Repeated Work',
    description: 'The same bugs get fixed multiple times. Solutions are rediscovered instead of reused.',
  },
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    title: 'Fragmented Knowledge',
    description: 'Knowledge is scattered across chats, docs, and commits. No unified memory store.',
  },
  {
    icon: <Puzzle className="w-6 h-6" />,
    title: 'No Continuity',
    description: "Context from Monday's work is gone by Tuesday. Every conversation starts from zero.",
  },
];

function ProblemCard({ problem }: { problem: typeof problems[0] }) {
  const [ref, distance] = useNeuralTarget(`problem-${problem.title}`, 280);
  const spring = useSpring(distance, { stiffness: 180, damping: 24 });
  const intensity = useTransform(spring, (d) => Math.max(0, 1 - d / 160));

  const scale = useTransform(intensity, (i) => 1 - i * 0.04);
  const y = useTransform(intensity, (i) => -i * 10);
  const boxShadow = useTransform(intensity, (i) => {
    const o = 0.1 + i * 0.35;
    return `0 0 ${30 + i * 20}px -5px rgba(243, 139, 168, ${o})`;
  });

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ scale, y, boxShadow }}
      className="group relative flex items-start gap-4 p-6 rounded-3xl bg-gradient-to-br from-[--color-crust] to-[--color-mantle] border border-[--color-red]/20 hover:border-[--color-red]/50 transition-all duration-300 will-change-transform"
    >
      {/* Icon node */}
      <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-2xl bg-[--color-red]/10 border border-[--color-red]/20 flex items-center justify-center text-[--color-red] group-hover:shadow-[0_0_20px_-2px_var(--color-red)]/30 transition-all duration-300">
        {problem.icon}
      </div>
      <div className="relative z-10 flex-1">
        <h3 className="text-xl font-semibold text-[--color-text] mb-2">
          {problem.title}
        </h3>
        <p className="text-[--color-subtext0] leading-relaxed">{problem.description}</p>
      </div>
      
      {/* Connection dot */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[--color-red]/30 group-hover:bg-[--color-red]/60 transition-colors duration-300" />
    </motion.div>
  );
}

export function Problem() {
  const [headlineRef, headlineDistance] = useNeuralTarget('problem-headline', 200);
  const spring = useSpring(headlineDistance, { stiffness: 160, damping: 22 });
  const intensity = useTransform(spring, (d) => Math.max(0, 1 - d / 200));
  const headlineScale = useTransform(intensity, (i) => 1 - i * 0.06);
  const headlineY = useTransform(intensity, (i) => -i * 14);

  return (
    <Section id="problem" variant="muted">
      <Container>
        <motion.div
          ref={headlineRef as React.RefObject<HTMLDivElement>}
          style={{ scale: headlineScale, y: headlineY }}
          className="max-w-3xl mx-auto text-center mb-12 will-change-transform"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[--color-text] mb-4">
            Your AI forgets{' '}
            <span className="text-[--color-red]">everything</span>
          </h2>
          <p className="text-lg text-[--color-subtext0]">
            When the session ends, it all disappears. Decisions, patterns, discussions — gone.
          </p>
        </motion.div>

        {/* Problem nodes — organic, rounded, with glow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {problems.map((problem) => (
            <ProblemCard key={problem.title} problem={problem} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
