import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FavoritesStore } from '../types';

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites
            : [...state.favorites, id],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav !== id),
        })),
      toggleFavorite: (id) => {
        if (get().isFavorite(id)) {
          get().removeFavorite(id);
        } else {
          get().addFavorite(id);
        }
      },
      isFavorite: (id) => get().favorites.includes(id),
    }),
    {
      name: 'zetsunami-favorites',
    }
  )
);
