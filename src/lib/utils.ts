import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function getGenreColor(genre: string): string {
  const colors: Record<string, string> = {
    Action: 'bg-red-500/20 text-red-400 border-red-500/30',
    Adventure: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    Comedy: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Drama: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    Fantasy: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    Horror: 'bg-red-900/20 text-red-300 border-red-900/30',
    Mecha: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    Music: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    Mystery: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    Psychological: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
    Romance: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    'Sci-Fi': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
    'Slice of Life': 'bg-green-500/20 text-green-400 border-green-500/30',
    Sports: 'bg-lime-500/20 text-lime-400 border-lime-500/30',
    Supernatural: 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30',
    Thriller: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    Historical: 'bg-stone-500/20 text-stone-400 border-stone-500/30',
    'Dark Fantasy': 'bg-red-900/30 text-red-300 border-red-800/40',
    Political: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    'Martial Arts': 'bg-orange-700/20 text-orange-300 border-orange-700/30',
  };
  return colors[genre] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
}
