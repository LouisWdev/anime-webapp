import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Radio, CalendarDays, AlertCircle } from 'lucide-react';
import { type TrendingTab } from '../services/jikanApi';
import { useNowAiring, useUpcoming } from '../hooks/useJikanData';
import { JikanAnimeCard } from '../components/trending/JikanAnimeCard';
import { Button } from '../components/ui/Button';

function SkeletonCard() {
  return (
    <div className="bg-dark-card border border-white/5 rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-[2/3] bg-white/5" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-white/5 rounded w-3/4" />
        <div className="h-3 bg-white/5 rounded w-1/2" />
        <div className="h-3 bg-white/5 rounded w-2/3" />
      </div>
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 20 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

interface ErrorStateProps {
  message: string;
  retry: () => void;
}

function ErrorState({ message, retry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <AlertCircle className="w-12 h-12 text-neon-pink" />
      <div>
        <p className="text-white font-semibold text-lg">Failed to load data</p>
        <p className="text-gray-400 text-sm mt-1">{message}</p>
      </div>
      <Button variant="neon" onClick={retry}>
        Try Again
      </Button>
    </div>
  );
}

export function TrendingPage() {
  const [activeTab, setActiveTab] = useState<TrendingTab>('now-airing');

  // Both hooks called unconditionally
  const nowAiring = useNowAiring();
  const upcoming = useUpcoming();

  const current = activeTab === 'now-airing' ? nowAiring : upcoming;

  const tabs: Array<{ id: TrendingTab; label: string; icon: typeof Radio }> = [
    { id: 'now-airing', label: 'Now Airing', icon: Radio },
    { id: 'upcoming', label: 'Upcoming Releases', icon: CalendarDays },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center shadow-glow-pink">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-black text-white">Trending Anime</h1>
        </div>
        <p className="text-gray-400 text-sm ml-[52px]">
          Live data from MyAnimeList via Jikan API v4
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 mb-8 p-1 bg-white/5 rounded-xl w-fit">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className="relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors z-10"
            style={{ color: activeTab === id ? undefined : undefined }}
          >
            {activeTab === id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute inset-0 bg-neon-pink/20 border border-neon-pink/30 rounded-lg"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <Icon
              className={`w-4 h-4 relative z-10 transition-colors ${
                activeTab === id ? 'text-neon-pink' : 'text-gray-400'
              }`}
            />
            <span
              className={`relative z-10 transition-colors ${
                activeTab === id ? 'text-neon-pink' : 'text-gray-400'
              }`}
            >
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {current.loading ? (
            <SkeletonGrid />
          ) : current.error ? (
            <ErrorState message={current.error} retry={current.retry} />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {current.data.map((anime, i) => (
                <JikanAnimeCard
                  key={anime.mal_id}
                  anime={anime}
                  index={i}
                  tab={activeTab}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
