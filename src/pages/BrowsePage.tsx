import { motion } from 'framer-motion';
import { SearchBar } from '../components/search/SearchBar';
import { FilterPanel } from '../components/search/FilterPanel';
import { AnimeGrid } from '../components/anime/AnimeGrid';
import { useSearch } from '../hooks/useSearch';
import animeData from '../data/anime.json';
import type { AnimeEntry } from '../types';
import { useFilterStore } from '../store/useFilterStore';

const data = animeData as AnimeEntry[];

export function BrowsePage() {
  const results = useSearch(data);
  const { search, genres, type, status, ratingMin } = useFilterStore();

  const hasActiveFilters = search || genres.length > 0 || type !== 'all' || status !== 'all' || ratingMin > 0;

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-black text-white mb-2">
          Browse <span className="text-neon-pink">Collection</span>
        </h1>
        <p className="text-gray-500 text-sm">
          Explore {data.length} anime &amp; manga entries — filter, search, and discover.
        </p>
      </motion.div>

      {/* Search + Filters */}
      <div className="space-y-3 mb-8">
        <SearchBar />
        <FilterPanel />
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {hasActiveFilters ? (
            <>
              <span className="text-neon-pink font-bold">{results.length}</span>
              {' '}results found
            </>
          ) : (
            <>Showing all <span className="text-white font-bold">{results.length}</span> entries</>
          )}
        </p>
        <div className="flex items-center gap-4 text-xs text-gray-600">
          <span>Anime: {results.filter(e => e.type === 'anime').length}</span>
          <span>Manga: {results.filter(e => e.type === 'manga').length}</span>
        </div>
      </div>

      {/* Grid */}
      <AnimeGrid entries={results} />
    </div>
  );
}
