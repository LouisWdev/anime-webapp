import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sword, ChevronRight, Star, TrendingUp, BookOpen, Tv } from 'lucide-react';
import { AnimeCard } from '../components/anime/AnimeCard';
import { Button } from '../components/ui/Button';
import animeData from '../data/anime.json';
import type { AnimeEntry } from '../types';

const data = animeData as AnimeEntry[];

const featured = data
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 6);

const topAnime = data.filter(e => e.type === 'anime').sort((a, b) => b.rating - a.rating).slice(0, 4);
const topManga = data.filter(e => e.type === 'manga').sort((a, b) => b.rating - a.rating).slice(0, 4);

const stats = [
  { label: 'Total Entries', value: data.length, icon: Star },
  { label: 'Anime', value: data.filter(e => e.type === 'anime').length, icon: Tv },
  { label: 'Manga', value: data.filter(e => e.type === 'manga').length, icon: BookOpen },
  { label: 'Top Rated', value: data.filter(e => e.rating >= 9).length, icon: TrendingUp },
];

export function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-void">
          <div className="absolute inset-0 bg-gradient-radial from-neon-purple/10 via-transparent to-transparent" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-pink/5 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-[120px] animate-pulse [animation-delay:1s]" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,0,128,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,128,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-neon-pink/10 border border-neon-pink/30 rounded-full px-4 py-1.5 text-xs text-neon-pink font-semibold mb-6 tracking-wider"
          >
            <Sword className="w-3 h-3" />
            ANIME × MANGA PORTFOLIO
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-6"
          >
            <span className="text-white">ZETSU</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue">
              NAMI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8"
          >
            A curated showcase of the greatest anime &amp; manga ever created.
            Discover stories that changed the world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" variant="primary" className="group">
              <Link to="/browse">
                Browse Collection
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/favorites">My Favorites</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-2xl mx-auto"
          >
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-dark-card/50 border border-white/5 rounded-xl p-4 backdrop-blur-sm">
                <Icon className="w-5 h-5 text-neon-pink mb-2 mx-auto" />
                <div className="text-2xl font-black text-white">{value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-8 border-2 border-white/20 rounded-full flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 bg-neon-pink rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Top Rated Section */}
      <section className="max-w-screen-xl mx-auto px-4 py-20">
        <SectionHeader title="Top Rated" subtitle="The best of the best" href="/browse" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-6">
          {featured.map((entry, i) => (
            <AnimeCard key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      </section>

      {/* Anime + Manga split */}
      <section className="bg-dark-surface/50 py-20">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Top Anime */}
            <div>
              <SectionHeader
                title="Top Anime"
                subtitle="Animated masterpieces"
                href="/browse?type=anime"
                icon={<Tv className="w-5 h-5 text-neon-blue" />}
              />
              <div className="grid grid-cols-2 gap-4 mt-6">
                {topAnime.map((entry, i) => (
                  <AnimeCard key={entry.id} entry={entry} index={i} />
                ))}
              </div>
            </div>

            {/* Top Manga */}
            <div>
              <SectionHeader
                title="Top Manga"
                subtitle="Comics that transcend the form"
                href="/browse?type=manga"
                icon={<BookOpen className="w-5 h-5 text-neon-purple" />}
              />
              <div className="grid grid-cols-2 gap-4 mt-6">
                {topManga.map((entry, i) => (
                  <AnimeCard key={entry.id} entry={entry} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-screen-xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-neon-pink/10 via-neon-purple/10 to-neon-blue/10 border border-white/10 rounded-3xl p-12"
        >
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Discover Your Next<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-blue">
              Obsession
            </span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Browse the full collection, filter by genre and rating, and save your favorites.
          </p>
          <Button asChild size="lg" variant="primary">
            <Link to="/browse">Explore All {data.length} Entries</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
  href,
  icon,
}: {
  title: string;
  subtitle: string;
  href: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2 mb-1">
          {icon}
          <h2 className="text-2xl font-black text-white">{title}</h2>
        </div>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      <Link
        to={href}
        className="flex items-center gap-1 text-sm text-neon-pink hover:text-neon-pink/80 font-medium transition-colors"
      >
        View all <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
