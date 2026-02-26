import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full bg-dark-card border border-white/10 rounded-lg text-white placeholder:text-gray-500 transition-all duration-200',
            'focus:outline-none focus:border-neon-blue/70 focus:ring-1 focus:ring-neon-blue/30',
            'hover:border-white/20',
            icon ? 'pl-10 pr-4 py-2.5' : 'px-4 py-2.5',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
