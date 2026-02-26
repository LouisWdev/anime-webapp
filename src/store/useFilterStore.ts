import { create } from 'zustand';
import type { FilterStore, Genre, MediaType, Status } from '../types';

const defaultState = {
  search: '',
  genres: [] as Genre[],
  type: 'all' as MediaType | 'all',
  status: 'all' as Status | 'all',
  yearMin: 1989,
  yearMax: 2024,
  ratingMin: 0,
  sortBy: 'default' as const,
  sortDir: 'desc' as const,
};

export const useFilterStore = create<FilterStore>()((set) => ({
  ...defaultState,
  setSearch: (search) => set({ search }),
  setGenres: (genres) => set({ genres }),
  toggleGenre: (genre) =>
    set((state) => ({
      genres: state.genres.includes(genre)
        ? state.genres.filter((g) => g !== genre)
        : [...state.genres, genre],
    })),
  setType: (type) => set({ type }),
  setStatus: (status) => set({ status }),
  setYearRange: (yearMin, yearMax) => set({ yearMin, yearMax }),
  setRatingMin: (ratingMin) => set({ ratingMin }),
  setSortBy: (sortBy) => set({ sortBy }),
  toggleSortDir: () =>
    set((state) => ({ sortDir: state.sortDir === 'asc' ? 'desc' : 'asc' })),
  resetFilters: () => set(defaultState),
}));
