import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Star, ExternalLink } from 'lucide-react';

interface CTAProps {
  stars: string;
  forks: string;
}

export function CTA({ stars, forks }: CTAProps) {
  return (
    <Section id="cta" className="relative overflow-hidden">
      {/* Gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[--color-mauve]/10 to-transparent" />

      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          {/* Icono simple */}
          <div className="flex justify-center">
            <Star className="w-10 h-10 text-[--color-mauve]" />
          </div>

          {/* Headline limpio */}
          <h2 className="text-3xl sm:text-4xl font-bold text-[--color-text]">
            Give your AI a{' '}
            <span className="text-[--color-mauve]">brain</span>
          </h2>

          <p className="text-lg text-[--color-subtext0]">
            Join <span className="text-[--color-text] font-semibold">{stars} developers</span> who never repeat the same explanation twice.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
            <Button
              href="https://github.com/Gentleman-Programming/engram"
              size="lg"
              external
            >
              <Star className="w-5 h-5" />
              Star on GitHub
            </Button>

            <Button
              href="https://github.com/Gentleman-Programming/engram/blob/main/DOCS.md"
              variant="secondary"
              size="lg"
              external
            >
              Read the Docs
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>

          {/* Stats inline - AHORA DINÁMICOS */}
          <div className="flex flex-wrap justify-center gap-6 pt-6 text-sm text-[--color-subtext0]">
            <span><strong className="text-[--color-text]">{stars}</strong> stars</span>
            <span><strong className="text-[--color-text]">{forks}</strong> forks</span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
