'use client';

import { useEffect, useRef } from 'react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Star, GitFork } from 'lucide-react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { prepareWithSegments, measureNaturalWidth } from '@chenglou/pretext';
import { waveXMotion } from '@/lib/wave-motion';
import { NeuralNetwork } from '@/components/canvas/NeuralNetwork';

interface HeroProps {
  stars: string;
  forks: string;
  version: string;
}

export function Hero({ stars, forks, version }: HeroProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const titleRangeRef = useRef(260);
  const badgeRangeRef = useRef(200);

  const springX = useSpring(waveXMotion, { stiffness: 180, damping: 20 });
  const centerXValue = useMotionValue(0);
  const waveDirectionValue = useMotionValue(1);

  // Medir texto con pretext y calcular rangos de reacción exactos
  useEffect(() => {
    function measure() {
      if (titleRef.current) {
        const style = window.getComputedStyle(titleRef.current);
        const fontFamily = style.fontFamily.split(',')[0].replace(/["']/g, '');
        const font = `${style.fontWeight} ${style.fontSize} ${fontFamily}`;
        const prepared = prepareWithSegments('Engram', font);
        const w = measureNaturalWidth(prepared);
        titleRangeRef.current = w / 2 + 160;
      }
      if (badgeRef.current) {
        const style = window.getComputedStyle(badgeRef.current);
        const fontFamily = style.fontFamily.split(',')[0].replace(/["']/g, '');
        const font = `${style.fontWeight} ${style.fontSize} ${fontFamily}`;
        const text = badgeRef.current.innerText || '';
        const prepared = prepareWithSegments(text, font);
        const w = measureNaturalWidth(prepared);
        badgeRangeRef.current = w / 2 + 120;
      }
    }

    measure();
    const handleResize = () => {
      centerXValue.set(window.innerWidth / 2);
      measure();
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [centerXValue]);

  // Actualizar dirección de la wave para saber hacia dónde empujar el badge
  useEffect(() => {
    const unsubscribe = waveXMotion.on('change', (x) => {
      const center = centerXValue.get();
      waveDirectionValue.set(x < center ? -1 : 1);
    });
    return unsubscribe;
  }, [centerXValue, waveDirectionValue]);

  const titleScale = useTransform(springX, (x) => {
    const center = centerXValue.get();
    const dist = Math.abs(x - center);
    const intensity = Math.max(0, 1 - dist / titleRangeRef.current);
    return 1 - intensity * 0.35;
  });

  const titleY = useTransform(springX, (x) => {
    const center = centerXValue.get();
    const dist = Math.abs(x - center);
    const intensity = Math.max(0, 1 - dist / titleRangeRef.current);
    return -intensity * 55;
  });

  const titleOpacity = useTransform(springX, (x) => {
    const center = centerXValue.get();
    const dist = Math.abs(x - center);
    const intensity = Math.max(0, 1 - dist / titleRangeRef.current);
    return Math.max(0.2, 1 - intensity * 0.75);
  });

  const titleSpacing = useTransform(springX, (x) => {
    const center = centerXValue.get();
    const dist = Math.abs(x - center);
    const intensity = Math.max(0, 1 - dist / titleRangeRef.current);
    return `${intensity * 0.22}em`;
  });

  const badgeScale = useTransform(springX, (x) => {
    const center = centerXValue.get();
    const dist = Math.abs(x - center);
    const intensity = Math.max(0, 1 - dist / badgeRangeRef.current);
    return 1 - intensity * 0.35;
  });

  const badgeX = useTransform(springX, (x) => {
    const center = centerXValue.get();
    const dist = Math.abs(x - center);
    const intensity = Math.max(0, 1 - dist / badgeRangeRef.current);
    return intensity * waveDirectionValue.get() * 120;
  });

  const badgeY = useTransform(springX, (x) => {
    const center = centerXValue.get();
    const dist = Math.abs(x - center);
    const intensity = Math.max(0, 1 - dist / badgeRangeRef.current);
    return -intensity * 40;
  });

  const badgeOpacity = useTransform(springX, (x) => {
    const center = centerXValue.get();
    const dist = Math.abs(x - center);
    const intensity = Math.max(0, 1 - dist / badgeRangeRef.current);
    return Math.max(0.25, 1 - intensity * 0.65);
  });

  const subtitleY = useTransform(springX, (x) => {
    const center = centerXValue.get();
    const dist = Math.abs(x - center);
    const intensity = Math.max(0, 1 - dist / titleRangeRef.current);
    return -intensity * 35;
  });

  const subtitleOpacity = useTransform(springX, (x) => {
    const center = centerXValue.get();
    const dist = Math.abs(x - center);
    const intensity = Math.max(0, 1 - dist / titleRangeRef.current);
    return Math.max(0.3, 1 - intensity * 0.55);
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[--color-base]/60 via-[--color-base]/40 to-[--color-base]/60" />

      {/* Wave overlay que pasa POR ENCIMA del texto */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <NeuralNetwork mode="wave" className="opacity-100" />
      </div>

      <Container className="relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge etimológico */}
          <motion.div
            ref={badgeRef}
            style={{
              scale: badgeScale,
              x: badgeX,
              y: badgeY,
              opacity: badgeOpacity,
            }}
            className="mb-6 inline-flex flex-col sm:flex-row items-center gap-2 px-5 py-2.5 rounded-full bg-[--color-surface0]/70 border border-[--color-mauve]/25 backdrop-blur-sm will-change-transform"
          >
            <span className="text-sm font-mono font-semibold text-[--color-mauve]">engram</span>
            <span className="hidden sm:block text-[--color-surface2]">·</span>
            <span className="text-sm text-[--color-subtext0] italic">/ˈen.ɡræm/ — the physical trace of memory</span>
          </motion.div>

          {/* Título principal */}
          <motion.h1
            ref={titleRef}
            style={{
              backgroundImage: 'linear-gradient(to right, var(--color-mauve), var(--color-pink), var(--color-blue))',
              scale: titleScale,
              y: titleY,
              opacity: titleOpacity,
              letterSpacing: titleSpacing,
            }}
            className="mb-6 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight bg-clip-text text-transparent will-change-transform"
          >
            Engram
          </motion.h1>

          {/* Hook emocional */}
          <motion.div
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
