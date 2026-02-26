import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useFavoritesStore } from '../../store/useFavoritesStore';

interface FavoriteButtonProps {
  id: number;
  className?: string;
}

export function FavoriteButton({ id, className }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const fav = isFavorite(id);

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(id);
      }}
      className={cn(
        'p-2 rounded-full transition-all duration-200',
        fav
          ? 'bg-neon-pink/20 text-neon-pink hover:bg-neon-pink/30'
          : 'bg-black/40 text-gray-400 hover:bg-black/60 hover:text-white',
        className
      )}
      aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={cn('w-4 h-4 transition-all', fav && 'fill-neon-pink')}
      />
    </motion.button>
  );
}
