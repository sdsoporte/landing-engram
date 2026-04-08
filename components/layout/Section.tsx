import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'muted' | 'accent';
}

// Más transparentes para ver el neural global
const variantStyles = {
  default: 'bg-[--color-base]/70 backdrop-blur-[2px]',
  muted: 'bg-[--color-mantle]/75 backdrop-blur-[2px]',
  accent: 'bg-[--color-crust]/80 backdrop-blur-[2px]',
};

export function Section({
  id,
  children,
  className,
  variant = 'default',
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-16 sm:py-20 lg:py-24 relative z-10',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </section>
  );
}
