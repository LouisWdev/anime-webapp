import { motion, AnimatePresence } from 'framer-motion';
import { AnimeCard } from './AnimeCard';
import type { AnimeEntry } from '../../types';

interface AnimeGridProps {
  entries: AnimeEntry[];
  emptyMessage?: string;
}

export function AnimeGrid({ entries, emptyMessage = 'No results found.' }: AnimeGridProps) {
  if (entries.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 text-gray-500"
      >
        <span className="text-6xl mb-4">🔍</span>
        <p className="text-lg">{emptyMessage}</p>
        <p className="text-sm mt-1">Try adjusting your filters</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
    >
      <AnimatePresence mode="popLayout">
        {entries.map((entry, i) => (
          <AnimeCard key={entry.id} entry={entry} index={i} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
