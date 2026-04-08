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
        'bg-[--color-surface0] p-8',
        'border border-[--color-surface1]',
        'hover:border-[--color-mauve] hover:shadow-lg hover:shadow-[--color-mauve]/10',
        'transition-all duration-300',
        'hover:-translate-y-2 hover:scale-[1.02]',
        className
      )}
    >
      <div className="rounded-lg bg-[--color-surface1] p-3 text-[--color-mauve] group-hover:bg-[--color-mauve] group-hover:text-[--color-base] transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-[--color-text]">{title}</h3>
      <p className="text-[--color-subtext0] leading-relaxed">{description}</p>
    </div>
  );
}
