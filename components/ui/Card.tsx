import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface CardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function Card({ icon, title, description, className }: CardProps) {
  return (
    <div
      className={cn(
        // Node-like appearance: very rounded, organic
        'group relative flex flex-col items-start gap-4',
        'rounded-3xl bg-gradient-to-br from-[--color-surface0] to-[--color-crust]',
        'p-8',
        // Glow border that feels like a neural connection
        'border border-[--color-surface1]',
        'hover:border-[--color-mauve]/50 hover:shadow-[0_0_30px_-5px_#cba6f7]/20',
        // Subtle lift
        'hover:-translate-y-1',
        'transition-all duration-300',
        className
      )}
    >
      {/* Icon container: circular like a node */}
      <div className="
        w-14 h-14 rounded-2xl 
        bg-gradient-to-br from-[--color-surface1] to-[--color-surface0]
        border border-[--color-surface2]/30
        flex items-center justify-center
        text-[--color-mauve]
        group-hover:shadow-[0_0_20px_-2px_#cba6f7]/30
        group-hover:border-[--color-mauve]/40
        transition-all duration-300
      ">
        {icon}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-[--color-text]">{title}</h3>
        <p className="text-[--color-subtext0] leading-relaxed">{description}</p>
      </div>

      {/* Subtle connection dot at bottom — like a node output */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[--color-surface2] group-hover:bg-[--color-mauve]/50 transition-colors duration-300" />
    </div>
  );
}
