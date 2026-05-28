import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-secondary border border-primary hover:border-secondary',
  secondary:
    'bg-secondary text-white hover:bg-accent border border-secondary',
  outline:
    'bg-transparent text-white border-2 border-white hover:bg-white/10',
  ghost: 'bg-transparent text-primary hover:text-secondary',
};

export function Button({
  variant = 'primary',
  href,
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded transition-colors duration-200',
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
