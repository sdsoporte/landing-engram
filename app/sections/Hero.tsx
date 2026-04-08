'use client';

import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { NeuralNetwork } from '@/components/canvas/NeuralNetwork';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Neural network background */}
      <div className="absolute inset-0 z-0">
        <NeuralNetwork className="opacity-70" />
        {/* Gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[--color-base]/80 via-[--color-base]/20 to-[--color-base]/80" />
      </div>

      <Container className="relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Logo/Name - Larger, more prominent */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[--color-surface0]/80 border border-[--color-mauve]/30 backdrop-blur-sm">
            <div className="w-4 h-4 rounded-full bg-[--color-mauve] animate-pulse shadow-lg shadow-[--color-mauve]/50" />
            <span className="text-base font-mono font-semibold text-[--color-text]">Open Source</span>
          </div>

          {/* Product Name */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(to right, var(--color-mauve), var(--color-pink), var(--color-blue))' }}
            >
              Engram
            </span>
          </h1>

          {/* Tagline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[--color-text]">
            Persistent memory for AI agents
          </h2>

          {/* Subheadline - More human, less technical */}
          <p className="text-lg sm:text-xl md:text-2xl text-[--color-subtext0] max-w-2xl mx-auto leading-relaxed">
            Give your AI coding assistant a long-term memory.
            <br className="hidden sm:block" />
            <span className="text-[--color-subtext1]">Cross-platform • Zero dependencies • Works with any agent</span>
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button href="#installation" size="lg">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button href="https://github.com/Gentleman-Programming/engram" variant="secondary" size="lg" external>
              View on GitHub
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-8 text-[--color-subtext1]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[--color-green]" />
              <span>Go Binary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[--color-blue]" />
              <span>SQLite + FTS5</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[--color-pink]" />
              <span>MCP Compatible</span>
            </div>
          </div>
        </div>
      </Container>

  {/* Scroll indicator - keyboard accessible */}
  <button
    onClick={() => document.getElementById('installation')?.scrollIntoView({ behavior: 'smooth' })}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        document.getElementById('installation')?.scrollIntoView({ behavior: 'smooth' });
      }
    }}
    className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
    tabIndex={0}
    role="button"
    aria-label="Scroll to installation section"
  >
    <div className="w-6 h-10 rounded-full border-2 border-[--color-subtext0] flex items-start justify-center p-1 hover:border-[--color-mauve] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-mauve] focus-visible:ring-offset-2">
      <div className="w-1.5 h-3 rounded-full bg-[--color-subtext0] animate-pulse" />
    </div>
  </button>
    </section>
  );
}
