import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { AnimeCard } from '../components/anime/AnimeCard';
import { useFavoritesStore } from '../store/useFavoritesStore';
import animeData from '../data/anime.json';
import type { AnimeEntry } from '../types';

const data = animeData as AnimeEntry[];

export function FavoritesPage() {
  const { favorites, removeFavorite } = useFavoritesStore();
  const favoriteEntries = data.filter((e) => favorites.includes(e.id));

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between mb-8"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-6 h-6 text-neon-pink fill-neon-pink" />
            <h1 className="text-4xl font-black text-white">
              My <span className="text-neon-pink">Favorites</span>
            </h1>
          </div>
          <p className="text-gray-500 text-sm">
            {favorites.length === 0
              ? 'Your favorites list is empty'
              : `${favorites.length} saved ${favorites.length === 1 ? 'entry' : 'entries'} — stored in your browser`}
          </p>
        </div>
      </motion.div>

      {/* Empty state */}
      {favoriteEntries.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-20 h-20 rounded-full bg-neon-pink/10 flex items-center justify-center mb-6 border border-neon-pink/20"
          >
            <Heart className="w-10 h-10 text-neon-pink" />
          </motion.div>
          <h2 className="text-xl font-bold text-white mb-2">No favorites yet</h2>
          <p className="text-gray-500 mb-8 max-w-md">
            Browse the collection and click the heart icon on any anime or manga to save it here.
          </p>
          <Button asChild variant="primary" size="lg">
            <Link to="/browse">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Explore Collection
            </Link>
          </Button>
        </motion.div>
      ) : (
        <>
          {/* Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          >
            {favoriteEntries.map((entry, i) => (
              <div key={entry.id} className="relative group/fav">
                <AnimeCard entry={entry} index={i} />
                <button
                  onClick={() => removeFavorite(entry.id)}
                  className="absolute top-2 left-2 z-10 opacity-0 group-hover/fav:opacity-100 transition-opacity p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/40 rounded-lg"
                  title="Remove from favorites"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </motion.div>

          {/* Footer actions */}
          <div className="mt-8 flex justify-center">
            <Button asChild variant="outline" size="sm">
              <Link to="/browse">Browse More</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
