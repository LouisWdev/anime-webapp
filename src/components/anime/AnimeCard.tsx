import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tv, BookOpen, Calendar } from 'lucide-react';
import { cn, getGenreColor } from '../../lib/utils';
import { Badge } from '../ui/Badge';
import { RatingStars } from './RatingStars';
import { FavoriteButton } from './FavoriteButton';
import type { AnimeEntry } from '../../types';

interface AnimeCardProps {
  entry: AnimeEntry;
  index?: number;
}

export function AnimeCard({ entry, index = 0 }: AnimeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      whileHover={{ y: -4 }}
      className="group relative"
    >
      <Link to={`/anime/${entry.id}`} className="block">
        <div className="relative overflow-hidden rounded-xl bg-dark-card border border-white/5 hover:border-neon-pink/30 transition-all duration-300 hover:shadow-glow-card">
          {/* Cover image */}
          <div className="relative aspect-[2/3] overflow-hidden bg-dark-surface">
            <img
              src={entry.coverImage}
              alt={entry.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const parent = target.parentElement!;
                parent.classList.add('flex', 'items-center', 'justify-center', 'bg-gradient-to-br', 'from-neon-purple/20', 'to-neon-pink/10');
              }}
            />

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

            {/* Favorite button */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <FavoriteButton id={entry.id} />
            </div>

            {/* Type badge */}
            <div className="absolute top-2 left-2">
              <span
                className={cn(
                  'flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold backdrop-blur-sm',
                  entry.type === 'anime'
                    ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                    : 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30'
                )}
              >
                {entry.type === 'anime' ? <Tv className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
                {entry.type.toUpperCase()}
              </span>
            </div>

            {/* Bottom info on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-xs text-gray-300 line-clamp-3">{entry.synopsis}</p>
            </div>
          </div>

          {/* Card body */}
          <div className="p-3 space-y-2">
            <h3 className="font-bold text-sm text-white leading-tight line-clamp-1 group-hover:text-neon-pink transition-colors">
              {entry.title}
            </h3>
            <p className="text-xs text-gray-500 font-medium">{entry.titleJapanese}</p>

            <RatingStars rating={entry.rating} />

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>{entry.year}</span>
              <span className="text-gray-700">·</span>
              <span
                className={cn(
                  'px-1.5 py-0.5 rounded text-xs font-medium',
                  entry.status === 'Completed'
                    ? 'bg-green-500/20 text-green-400'
                    : entry.status === 'Ongoing'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-blue-500/20 text-blue-400'
                )}
              >
                {entry.status}
              </span>
            </div>

            <div className="flex flex-wrap gap-1 pt-1">
              {entry.genres.slice(0, 2).map((genre) => (
                <Badge
                  key={genre}
                  className={cn('text-[10px] py-0', getGenreColor(genre))}
                >
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
