import { motion } from 'framer-motion';
import { Star, ExternalLink } from 'lucide-react';
import { type JikanAnime, type TrendingTab } from '../../services/jikanApi';
import { Badge } from '../ui/Badge';
import { getGenreColor } from '../../lib/utils';

interface JikanAnimeCardProps {
  anime: JikanAnime;
  index: number;
  tab: TrendingTab;
}

function formatPremiereDate(anime: JikanAnime, tab: TrendingTab): string {
  if (tab === 'now-airing') {
    if (!anime.aired.from) return 'Date TBA';
    const date = new Date(anime.aired.from);
    return `Since ${date.toLocaleString('en-US', { month: 'short', year: 'numeric' })}`;
  }
  if (!anime.aired.from) return 'Date TBA';
  const date = new Date(anime.aired.from);
  return `Premieres ${date.toLocaleString('en-US', { month: 'short', year: 'numeric' })}`;
}

export function JikanAnimeCard({ anime, index, tab }: JikanAnimeCardProps) {
  const imageUrl =
    anime.images.webp?.large_image_url || anime.images.jpg?.large_image_url;
  const premiere = formatPremiereDate(anime, tab);
  const studio = anime.studios[0]?.name ?? null;
  const genres = anime.genres.slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="bg-dark-card border border-white/5 hover:border-neon-pink/30 rounded-xl overflow-hidden transition-colors group"
    >
      {/* Image */}
      <div className="relative aspect-[2/3] overflow-hidden bg-white/5">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={anime.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">
            No image
          </div>
        )}

        {/* Top-left: type badge */}
        {anime.type && (
          <span className="absolute top-2 left-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-neon-blue/20 text-neon-blue border border-neon-blue/30 backdrop-blur-sm">
            {anime.type}
          </span>
        )}

        {/* Top-right: status badge */}
        <span
          className={`absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm border ${
            tab === 'now-airing'
              ? 'bg-neon-pink/20 text-neon-pink border-neon-pink/30'
              : 'bg-neon-purple/20 text-neon-purple border-neon-purple/30'
          }`}
        >
          {tab === 'now-airing' ? 'AIRING' : 'UPCOMING'}
        </span>

        {/* Score overlay */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 rounded px-1.5 py-0.5 backdrop-blur-sm">
          <Star className="w-3 h-3 text-neon-pink fill-neon-pink" />
          <span className="text-[11px] font-bold text-white">
            {anime.score != null ? anime.score.toFixed(1) : 'N/A'}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-3 flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-white leading-tight line-clamp-2">
          {anime.title}
        </h3>

        {/* Genres */}
        {genres.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {genres.map(g => (
              <Badge
                key={g.mal_id}
                variant="outline"
                className={getGenreColor(g.name)}
              >
                {g.name}
              </Badge>
            ))}
          </div>
        )}

        {/* Studio + premiere */}
        <div className="text-[11px] text-gray-500 space-y-0.5">
          {studio && <p className="truncate">{studio}</p>}
          <p>{premiere}</p>
        </div>

        {/* MAL link */}
        <a
          href={anime.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 flex items-center gap-1 text-[11px] text-neon-blue hover:text-white transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          View on MAL
        </a>
      </div>
    </motion.div>
  );
}
