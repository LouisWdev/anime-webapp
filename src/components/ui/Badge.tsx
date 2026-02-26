import { type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'solid';
}

export function Badge({ className, variant = 'outline', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border',
        variant === 'outline' && 'border-current bg-transparent',
        variant === 'solid' && 'border-transparent',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
