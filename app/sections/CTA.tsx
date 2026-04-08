import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Star, ExternalLink } from 'lucide-react';

export function CTA() {
  return (
    <Section id="cta" className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[--color-mauve]/20 via-[--color-base] to-[--color-pink]/20" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Star icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-[--color-mauve]/20 flex items-center justify-center">
              <Star className="w-10 h-10 text-[--color-mauve]" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[--color-text]">
            Ready to give your AI agent{' '}
            <span className="text-[--color-mauve]">persistent memory</span>?
          </h2>

          <p className="text-lg text-[--color-subtext0] max-w-xl mx-auto">
            Open source, MIT licensed. Built by developers, for developers.
            Star the repo and start using engram today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              href="https://github.com/Gentleman-Programming/engram"
              size="lg"
              external
              className="gap-3"
            >
              <Star className="w-5 h-5" />
              Star on GitHub
              <Star className="w-4 h-4 fill-current" />
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

  {/* Stats */}
  <div className="flex flex-wrap justify-center gap-8 pt-8 text-[--color-subtext1]">
    <div className="text-center">
      <div className="text-2xl font-bold text-[--color-text]">Growing</div>
      <div className="text-sm">Community</div>
    </div>
    <div className="text-center">
      <div className="text-2xl font-bold text-[--color-text]">Go</div>
      <div className="text-sm">Single Binary</div>
    </div>
    <div className="text-center">
      <div className="text-2xl font-bold text-[--color-text]">MIT</div>
      <div className="text-sm">License</div>
    </div>
  </div>
        </div>
      </Container>
    </Section>
  );
}
