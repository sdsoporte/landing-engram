import { cn } from '@/lib/utils';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function Card({ icon, title, description, className }: CardProps) {
  return (
    <div
      className={cn(
        'group flex flex-col items-start gap-4 rounded-xl',
        'bg-[var(--color-surface0)] p-8',
        'border border-[var(--color-surface1)]',
        'hover:border-[var(--color-mauve)] hover:shadow-lg hover:shadow-[var(--color-mauve)]/10',
        'transition-all duration-300',
        'hover:-translate-y-2 hover:scale-[1.02]',
        className
      )}
    >
      <div className="rounded-lg bg-[var(--color-surface1)] p-3 text-[var(--color-mauve)] group-hover:bg-[var(--color-mauve)] group-hover:text-[var(--color-base)] transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-[var(--color-text)]">{title}</h3>
      <p className="text-[var(--color-subtext0)] leading-relaxed">{description}</p>
    </div>
  );
}
