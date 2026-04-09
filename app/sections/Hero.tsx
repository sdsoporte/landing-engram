'use client';

import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Star, GitFork } from 'lucide-react';

interface HeroProps {
  stars: string;
  forks: string;
  version: string;
}

export function Hero({ stars, forks, version }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Overlay para legibilidad sobre neural global */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[--color-base]/60 via-[--color-base]/40 to-[--color-base]/60" />

      <Container className="relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          
          {/* Badge etimológico */}
          <div className="mb-6 inline-flex flex-col sm:flex-row items-center gap-2 px-5 py-2.5 rounded-full bg-[--color-surface0]/70 border border-[--color-mauve]/25 backdrop-blur-sm">
            <span className="text-sm font-mono font-semibold text-[--color-mauve]">engram</span>
            <span className="hidden sm:block text-[--color-surface2]">·</span>
            <span className="text-sm text-[--color-subtext0] italic">/ˈen.ɡræm/ — the physical trace of memory</span>
          </div>

          {/* Título principal */}
          <h1 className="mb-6 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(to right, var(--color-mauve), var(--color-pink), var(--color-blue))' }}
            >
              Engram
            </span>
          </h1>

          {/* Hook emocional */}
          <div className="mb-8 space-y-3">
            <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[--color-text]">
              Your AI forgets everything.{' '}
              <span className="text-[--color-mauve]">We give it a brain.</span>
            </p>
            <p className="text-base sm:text-lg text-[--color-subtext0]">
              One binary. One SQLite file. Zero dependencies.
            </p>
          </div>

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

          {/* GitHub stats - AHORA DINÁMICOS */}
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
