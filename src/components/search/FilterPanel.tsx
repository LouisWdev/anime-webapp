import { SlidersHorizontal, RotateCcw, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn, getGenreColor } from '../../lib/utils';
import { Button } from '../ui/Button';
import { useFilterStore } from '../../store/useFilterStore';
import type { Genre } from '../../types';

const ALL_GENRES: Genre[] = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror',
  'Mecha', 'Music', 'Mystery', 'Psychological', 'Romance', 'Sci-Fi',
  'Slice of Life', 'Sports', 'Supernatural', 'Thriller', 'Historical',
  'Dark Fantasy', 'Political', 'Martial Arts',
];

export function FilterPanel() {
  const [open, setOpen] = useState(false);
  const {
    genres, type, status, ratingMin, sortBy, sortDir,
    toggleGenre, setType, setStatus, setRatingMin, setSortBy, toggleSortDir, resetFilters,
  } = useFilterStore();

  const activeCount = (genres.length > 0 ? 1 : 0) + (type !== 'all' ? 1 : 0) + (status !== 'all' ? 1 : 0) + (ratingMin > 0 ? 1 : 0);

  return (
    <div>
      <div className="flex items-center gap-2">
        <Button
          variant={activeCount > 0 ? 'neon' : 'outline'}
          size="sm"
          onClick={() => setOpen(!open)}
          className="gap-2"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeCount > 0 && (
            <span className="bg-neon-pink text-black rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
              {activeCount}
            </span>
          )}
        </Button>

        <Button variant="outline" size="sm" onClick={toggleSortDir} className="gap-1">
          <ArrowUpDown className="w-3 h-3" />
          {sortDir === 'desc' ? 'Desc' : 'Asc'}
        </Button>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="h-8 px-2 text-xs bg-dark-card border border-white/10 rounded-md text-white focus:outline-none focus:border-neon-blue/70"
        >
          <option value="default">Default</option>
          <option value="rating">Rating</option>
          <option value="year">Year</option>
          <option value="title">Title</option>
        </select>

        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="gap-1 text-gray-400">
            <RotateCcw className="w-3 h-3" />
            Reset
          </Button>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-3 p-4 bg-dark-card border border-white/10 rounded-xl space-y-4">
              {/* Type */}
              <div>
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2 block">Type</label>
                <div className="flex gap-2">
                  {(['all', 'anime', 'manga'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={cn(
                        'px-3 py-1 rounded-lg text-xs font-medium border transition-all',
                        type === t
                          ? 'bg-neon-blue/20 text-neon-blue border-neon-blue/50'
                          : 'border-white/10 text-gray-400 hover:border-white/30'
                      )}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2 block">Status</label>
                <div className="flex gap-2 flex-wrap">
                  {(['all', 'Completed', 'Ongoing', 'Upcoming'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatus(s)}
                      className={cn(
                        'px-3 py-1 rounded-lg text-xs font-medium border transition-all',
                        status === s
                          ? 'bg-neon-purple/20 text-neon-purple border-neon-purple/50'
                          : 'border-white/10 text-gray-400 hover:border-white/30'
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Min Rating */}
              <div>
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2 block">
                  Min Rating: <span className="text-neon-pink">{ratingMin.toFixed(1)}</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={0.1}
                  value={ratingMin}
                  onChange={(e) => setRatingMin(parseFloat(e.target.value))}
                  className="w-full accent-neon-pink"
                />
              </div>

              {/* Genres */}
              <div>
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2 block">Genres</label>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_GENRES.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => toggleGenre(genre)}
                      className={cn(
                        'px-2 py-0.5 rounded-full text-[11px] font-medium border transition-all',
                        genres.includes(genre)
                          ? cn(getGenreColor(genre), 'opacity-100')
                          : 'border-white/10 text-gray-500 hover:border-white/20 hover:text-gray-300'
                      )}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
