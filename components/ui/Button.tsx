import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  external?: boolean;
}

const variantStyles = {
  primary: 'bg-[--color-mauve] text-[--color-base] hover:bg-[--color-pink] transition-colors',
  secondary: 'border-2 border-[--color-mauve] text-[--color-mauve] hover:bg-[--color-mauve] hover:text-[--color-base] transition-colors',
  ghost: 'text-[--color-subtext0] hover:text-[--color-text] transition-colors',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  href,
  onClick,
  className,
  external,
}: ButtonProps) {
  const styles = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-mauve]',
    'disabled:pointer-events-none disabled:opacity-50',
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={styles}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={styles}>
      {children}
    </button>
  );
}
