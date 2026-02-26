import { useMemo } from 'react';
import type { AnimeEntry } from '../types';
import { useFilterStore } from '../store/useFilterStore';

export function useSearch(data: AnimeEntry[]): AnimeEntry[] {
  const { search, genres, type, status, yearMin, yearMax, ratingMin, sortBy, sortDir } =
    useFilterStore();

  return useMemo(() => {
    let filtered = [...data];

    // Text search
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.titleJapanese.toLowerCase().includes(q) ||
          item.synopsis.toLowerCase().includes(q) ||
          item.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Type filter
    if (type !== 'all') {
      filtered = filtered.filter((item) => item.type === type);
    }

    // Genre filter
    if (genres.length > 0) {
      filtered = filtered.filter((item) =>
        genres.every((g) => item.genres.includes(g))
      );
    }

    // Status filter
    if (status !== 'all') {
      filtered = filtered.filter((item) => item.status === status);
    }

    // Year range
    filtered = filtered.filter(
      (item) => item.year >= yearMin && item.year <= yearMax
    );

    // Rating min
    filtered = filtered.filter((item) => item.rating >= ratingMin);

    // Sort
    if (sortBy !== 'default') {
      filtered.sort((a, b) => {
        let cmp = 0;
        if (sortBy === 'rating') cmp = a.rating - b.rating;
        else if (sortBy === 'year') cmp = a.year - b.year;
        else if (sortBy === 'title') cmp = a.title.localeCompare(b.title);
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }

    return filtered;
  }, [data, search, genres, type, status, yearMin, yearMax, ratingMin, sortBy, sortDir]);
}
