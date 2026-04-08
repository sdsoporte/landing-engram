import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'muted' | 'accent';
}

const variantStyles = {
  default: 'bg-[--color-base]',
  muted: 'bg-[--color-mantle]',
  accent: 'bg-[--color-crust]',
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
        'py-16 sm:py-20 lg:py-24',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </section>
  );
}
