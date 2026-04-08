import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Brain, RefreshCw, AlertTriangle, Puzzle } from 'lucide-react';

const problems = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'Lost Context',
    description: 'Every new session starts blank. No memory of previous decisions, patterns, or discussions.',
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: 'Repeated Mistakes',
    description: 'The same bugs get fixed multiple times. Solutions are rediscovered instead of reused.',
  },
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    title: 'Fragmented Understanding',
    description: 'Knowledge is scattered across chats, docs, and commits. No unified memory store.',
  },
  {
    icon: <Puzzle className="w-6 h-6" />,
    title: 'No Continuity',
    description: 'Context from Monday\'s session is gone by Tuesday. Every conversation starts from zero.',
  },
];

export function Problem() {
  return (
    <Section id="problem" variant="muted">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[--color-text] mb-4">
            AI agents forget <span className="text-[--color-red]">everything</span>
          </h2>
          <p className="text-lg text-[--color-subtext0]">
            Without persistent memory, your AI coding assistant loses context between sessions.
            This leads to inefficiency, repeated work, and fragmented understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 rounded-lg bg-[--color-surface0] border border-[--color-surface1]"
            >
              <div className="flex-shrink-0 p-3 rounded-lg bg-[--color-red]/10 text-[--color-red]">
                {problem.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[--color-text] mb-2">
                  {problem.title}
                </h3>
                <p className="text-[--color-subtext0]">{problem.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
