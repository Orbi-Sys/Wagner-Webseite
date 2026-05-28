import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg overflow-hidden border border-accent/30',
        hover &&
          'transition-all duration-200 hover:border-accent hover:-translate-y-0.5',
        className
      )}
    >
      {children}
    </div>
  );
}
