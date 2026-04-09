'use client';

import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Star, GitFork } from 'lucide-react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useNeuralTarget } from '@/hooks/useNeuralTarget';

interface HeroProps {
  stars: string;
  forks: string;
  version: string;
}

function useProximityMotion(motionValue: ReturnType<typeof useNeuralTarget>[1], range: number) {
  const spring = useSpring(motionValue, { stiffness: 160, damping: 22 });
  const intensity = useTransform(spring, (d) => Math.max(0, 1 - d / range));
  return { spring, intensity };
}

export function Hero({ stars, forks, version }: HeroProps) {
  const [badgeRef, badgeDistance] = useNeuralTarget('hero-badge', 160);
  const [titleRef, titleDistance] = useNeuralTarget('hero-title', 190);
  const [subtitleRef, subtitleDistance] = useNeuralTarget('hero-subtitle', 160);

  const { intensity: badgeIntensity } = useProximityMotion(badgeDistance, 180);
  const { intensity: titleIntensity } = useProximityMotion(titleDistance, 220);
  const { intensity: subtitleIntensity } = useProximityMotion(subtitleDistance, 180);

  const badgeScale = useTransform(badgeIntensity, (i) => 1 - i * 0.15);
  const badgeY = useTransform(badgeIntensity, (i) => -i * 28);
  const badgeOpacity = useTransform(badgeIntensity, (i) => Math.max(0.35, 1 - i * 0.55));

  const titleScale = useTransform(titleIntensity, (i) => 1 - i * 0.18);
  const titleY = useTransform(titleIntensity, (i) => -i * 34);
  const titleOpacity = useTransform(titleIntensity, (i) => Math.max(0.3, 1 - i * 0.6));
  const titleSpacing = useTransform(titleIntensity, (i) => `${i * 0.08}em`);

  const subtitleY = useTransform(subtitleIntensity, (i) => -i * 18);
  const subtitleOpacity = useTransform(subtitleIntensity, (i) => Math.max(0.4, 1 - i * 0.5));

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[--color-base]/60 via-[--color-base]/40 to-[--color-base]/60" />

      <Container className="relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge etimológico */}
          <motion.div
            ref={badgeRef as React.RefObject<HTMLDivElement>}
            style={{
              scale: badgeScale,
              y: badgeY,
              opacity: badgeOpacity,
            }}
            className="relative z-10 mb-6 inline-flex flex-col sm:flex-row items-center gap-2 px-5 py-2.5 rounded-full bg-[--color-surface0]/70 border border-[--color-mauve]/25 backdrop-blur-sm will-change-transform"
          >
            <span className="text-sm font-mono font-semibold text-[--color-mauve]">engram</span>
            <span className="hidden sm:block text-[--color-surface2]">·</span>
            <span className="text-sm text-[--color-subtext0] italic">/ˈen.ɡræm/ — the physical trace of memory</span>
          </motion.div>

          {/* Título principal */}
          <motion.h1
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
            style={{
              backgroundImage: 'linear-gradient(to right, var(--color-mauve), var(--color-pink), var(--color-blue))',
              scale: titleScale,
              y: titleY,
              opacity: titleOpacity,
              letterSpacing: titleSpacing,
            }}
            className="relative z-10 mb-6 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight bg-clip-text text-transparent will-change-transform"
          >
            Engram
          </motion.h1>

          {/* Hook emocional */}
          <motion.div
            ref={subtitleRef as React.RefObject<HTMLDivElement>}
            style={{ y: subtitleY, opacity: subtitleOpacity }}
            className="mb-8 space-y-3 will-change-transform"
          >
            <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[--color-text]">
              Your AI forgets everything.{' '}
              <span className="text-[--color-mauve]">We give it a brain.</span>
            </p>
            <p className="text-base sm:text-lg text-[--color-subtext0]">
              One binary. One SQLite file. Zero dependencies.
            </p>
          </motion.div>

          {/* Brew command */}
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[--color-crust]/80 border border-[--color-surface1] font-mono text-sm">
            <span className="text-[--color-green]">$</span>
            <span className="text-[--color-text]">brew install gentleman-programming/tap/engram</span>
          </div>

          {/* CTAs */}
          <div className="mb-10 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button href="#installation" size="lg">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              href="https://github.com/Gentleman-Programming/engram"
              variant="ghost"
              size="md"
              external
            >
              View on GitHub →
            </Button>
          </div>

          {/* GitHub stats */}
          <div className="flex flex-wrap justify-center gap-5 text-[--color-subtext0] text-sm">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-[--color-yellow]" />
              <span className="font-semibold text-[--color-text]">{stars}</span>
              <span>stars</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GitFork className="w-4 h-4 text-[--color-blue]" />
              <span className="font-semibold text-[--color-text]">{forks}</span>
              <span>forks</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[--color-green]" />
              <span className="font-semibold text-[--color-text]">{version}</span>
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <button
        onClick={() => document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' })}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
        aria-label="Scroll to next section"
      >
        <div className="w-6 h-10 rounded-full border-2 border-[--color-subtext0]/30 flex items-start justify-center p-1 hover:border-[--color-mauve] transition-colors">
          <div className="w-1.5 h-3 rounded-full bg-[--color-subtext0]/40 animate-pulse" />
        </div>
      </button>
    </section>
  );
}
