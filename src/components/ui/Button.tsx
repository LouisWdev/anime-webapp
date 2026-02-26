import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline' | 'neon';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref as any}
        className={cn(
          'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-void disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
          {
            'bg-neon-pink text-black hover:bg-neon-pink/90 focus:ring-neon-pink shadow-glow-pink':
              variant === 'primary',
            'bg-transparent text-white hover:bg-white/10': variant === 'ghost',
            'border border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue focus:ring-neon-blue':
              variant === 'outline',
            'border border-neon-pink/50 text-neon-pink hover:bg-neon-pink/10 hover:border-neon-pink hover:shadow-glow-pink focus:ring-neon-pink':
              variant === 'neon',
          },
          {
            'h-8 px-3 text-xs rounded-md': size === 'sm',
            'h-10 px-4 text-sm rounded-lg': size === 'md',
            'h-12 px-6 text-base rounded-xl': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';
