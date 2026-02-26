import { Star } from 'lucide-react';
import { cn } from '../../lib/utils';

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export function RatingStars({ rating, max = 10, size = 'sm', className }: RatingStarsProps) {
  const stars = 5;
  const filled = Math.round((rating / max) * stars);

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: stars }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'transition-colors',
            size === 'sm' ? 'w-3 h-3' : 'w-4 h-4',
            i < filled ? 'fill-neon-pink text-neon-pink' : 'fill-transparent text-gray-600'
          )}
        />
      ))}
      <span className={cn('ml-1 text-neon-pink font-bold tabular-nums', size === 'sm' ? 'text-xs' : 'text-sm')}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
