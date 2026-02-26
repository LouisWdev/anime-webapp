import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Star, Calendar, Tv, BookOpen, Hash,
  CheckCircle2, Clock, Zap, Heart
} from 'lucide-react';
import { cn, getGenreColor } from '../lib/utils';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { FavoriteButton } from '../components/anime/FavoriteButton';
import { RatingStars } from '../components/anime/RatingStars';
import { AnimeCard } from '../components/anime/AnimeCard';
import { useFavoritesStore } from '../store/useFavoritesStore';
import animeData from '../data/anime.json';
import type { AnimeEntry } from '../types';

const data = animeData as AnimeEntry[];

export function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  const entry = data.find((e) => e.id === Number(id));

  if (!entry) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <span className="text-6xl mb-4">😢</span>
        <h2 className="text-2xl font-bold text-white mb-2">Not Found</h2>
        <p className="text-gray-500 mb-6">This entry doesn't exist in our database.</p>
        <Button variant="outline" onClick={() => navigate('/browse')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Browse
        </Button>
      </div>
    );
  }

  // Related: same genre, not same id
  const related = data
    .filter((e) => e.id !== entry.id && e.genres.some((g) => entry.genres.includes(g)))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const fav = isFavorite(entry.id);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      {/* Back button */}
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back</span>
        </button>
      </motion.div>

      {/* Main content */}
      <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-8">
        {/* Left: Cover + Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          <div className="relative rounded-2xl overflow-hidden aspect-[2/3] bg-dark-surface shadow-2xl ring-1 ring-white/10">
            <img
              src={entry.coverImage}
              alt={entry.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement!;
                parent.style.background = 'linear-gradient(135deg, #1a0533, #0d1a33)';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-3 right-3">
              <FavoriteButton id={entry.id} />
            </div>
          </div>

          {/* Action buttons */}
          <Button
            variant={fav ? 'primary' : 'neon'}
            size="lg"
            className="w-full gap-2"
            onClick={() => toggleFavorite(entry.id)}
          >
            <Heart className={cn('w-4 h-4', fav && 'fill-black')} />
            {fav ? 'In Favorites' : 'Add to Favorites'}
          </Button>

          {/* Quick stats */}
          <div className="bg-dark-card border border-white/5 rounded-xl p-4 space-y-3">
            <StatRow
              icon={<Star className="w-4 h-4 text-neon-pink" />}
              label="Rating"
              value={
                <span className="text-neon-pink font-bold">{entry.rating.toFixed(1)}/10</span>
              }
            />
            <StatRow
              icon={<Calendar className="w-4 h-4 text-neon-blue" />}
              label="Year"
              value={entry.year}
            />
            {entry.type === 'anime' ? (
              <>
                <StatRow
                  icon={<Tv className="w-4 h-4 text-neon-purple" />}
                  label="Episodes"
                  value={entry.episodes ?? 'N/A'}
                />
                <StatRow
                  icon={<Hash className="w-4 h-4 text-gray-400" />}
                  label="Studio"
                  value={entry.studio ?? 'Unknown'}
                />
              </>
            ) : (
              <>
                <StatRow
                  icon={<BookOpen className="w-4 h-4 text-neon-purple" />}
                  label="Chapters"
                  value={entry.chapters ?? 'N/A'}
                />
                <StatRow
                  icon={<Hash className="w-4 h-4 text-gray-400" />}
                  label="Volumes"
                  value={entry.volumes ?? 'N/A'}
                />
                <StatRow
                  icon={<Hash className="w-4 h-4 text-gray-400" />}
                  label="Author"
                  value={entry.author ?? 'Unknown'}
                />
              </>
            )}
            <StatRow
              icon={
                entry.status === 'Completed' ? (
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                ) : entry.status === 'Ongoing' ? (
                  <Clock className="w-4 h-4 text-yellow-400" />
                ) : (
                  <Zap className="w-4 h-4 text-blue-400" />
                )
              }
              label="Status"
              value={
                <span
                  className={cn(
                    'px-2 py-0.5 rounded text-xs font-medium',
                    entry.status === 'Completed'
                      ? 'bg-green-500/20 text-green-400'
                      : entry.status === 'Ongoing'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-blue-500/20 text-blue-400'
                  )}
                >
                  {entry.status}
                </span>
              }
            />
          </div>
        </motion.div>

        {/* Right: Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Type badge */}
          <div className="flex items-center gap-3">
            <span
              className={cn(
                'flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border',
                entry.type === 'anime'
                  ? 'bg-neon-blue/10 text-neon-blue border-neon-blue/30'
                  : 'bg-neon-purple/10 text-neon-purple border-neon-purple/30'
              )}
            >
              {entry.type === 'anime' ? <Tv className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
              {entry.type.toUpperCase()}
            </span>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
              {entry.title}
            </h1>
            <p className="text-gray-500 text-lg mt-1 font-medium">{entry.titleJapanese}</p>
          </div>

          {/* Rating */}
          <RatingStars rating={entry.rating} size="md" />

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {entry.genres.map((genre) => (
              <Badge key={genre} className={cn('text-xs', getGenreColor(genre))}>
                {genre}
              </Badge>
            ))}
          </div>

          {/* Synopsis */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Synopsis</h3>
            <p className="text-gray-300 leading-relaxed text-base">{entry.synopsis}</p>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-black text-white mb-6">
            Related <span className="text-neon-pink">Picks</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {related.map((e, i) => (
              <AnimeCard key={e.id} entry={e} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function StatRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="flex items-center gap-2 text-gray-500">
        {icon}
        {label}
      </span>
      <span className="text-white font-medium text-right">{value}</span>
    </div>
  );
}
