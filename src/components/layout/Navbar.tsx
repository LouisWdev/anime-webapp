import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sword, Home, Grid3X3, Heart, Menu, X, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { useFavoritesStore } from '../../store/useFavoritesStore';

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/browse', label: 'Browse', icon: Grid3X3 },
  { to: '/trending', label: 'Trending', icon: TrendingUp },
  { to: '/favorites', label: 'Favorites', icon: Heart },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { favorites } = useFavoritesStore();

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-void/80 backdrop-blur-xl">
      <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 15 }}
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center shadow-glow-pink"
          >
            <Sword className="w-4 h-4 text-white" />
          </motion.div>
          <span className="font-black text-lg tracking-tight">
            <span className="text-neon-pink">Otaku</span>
            <span className="text-white">Forge</span>
          </span>
          <span className="hidden sm:block text-[10px] text-gray-600 font-mono border border-white/10 px-1 py-0.5 rounded">
            v1.0
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  isActive
                    ? 'bg-neon-pink/10 text-neon-pink'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                )
              }
            >
              {() => (
                <>
                  <Icon className="w-4 h-4" />
                  {label}
                  {label === 'Favorites' && favorites.length > 0 && (
                    <span className="bg-neon-pink text-black text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-gray-400 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-white/5 bg-void/95 backdrop-blur-xl px-4 py-3 flex flex-col gap-1"
        >
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all',
                  isActive
                    ? 'bg-neon-pink/10 text-neon-pink'
                    : 'text-gray-400 hover:text-white'
                )
              }
            >
              {() => (
                <>
                  <Icon className="w-4 h-4" />
                  {label}
                  {label === 'Favorites' && favorites.length > 0 && (
                    <span className="bg-neon-pink text-black text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center ml-auto">
                      {favorites.length}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </motion.div>
      )}
    </header>
  );
}
