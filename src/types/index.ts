export type MediaType = 'anime' | 'manga';
export type Status = 'Completed' | 'Ongoing' | 'Upcoming';
export type Genre =
  | 'Action'
  | 'Adventure'
  | 'Comedy'
  | 'Drama'
  | 'Fantasy'
  | 'Horror'
  | 'Mecha'
  | 'Music'
  | 'Mystery'
  | 'Psychological'
  | 'Romance'
  | 'Sci-Fi'
  | 'Slice of Life'
  | 'Sports'
  | 'Supernatural'
  | 'Thriller'
  | 'Historical'
  | 'Dark Fantasy'
  | 'Political'
  | 'Martial Arts';

export interface AnimeEntry {
  id: number;
  title: string;
  titleJapanese: string;
  type: MediaType;
  genres: Genre[];
  year: number;
  rating: number; // 1-10
  synopsis: string;
  coverImage: string;
  episodes?: number; // for anime
  chapters?: number; // for manga
  volumes?: number; // for manga
  status: Status;
  studio?: string;
  author?: string;
  tags: string[];
}

export interface FilterState {
  search: string;
  genres: Genre[];
  type: MediaType | 'all';
  status: Status | 'all';
  yearMin: number;
  yearMax: number;
  ratingMin: number;
  sortBy: 'rating' | 'year' | 'title' | 'default';
  sortDir: 'asc' | 'desc';
}

export interface FavoritesStore {
  favorites: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export interface FilterStore extends FilterState {
  setSearch: (q: string) => void;
  setGenres: (genres: Genre[]) => void;
  toggleGenre: (genre: Genre) => void;
  setType: (type: MediaType | 'all') => void;
  setStatus: (status: Status | 'all') => void;
  setYearRange: (min: number, max: number) => void;
  setRatingMin: (min: number) => void;
  setSortBy: (sortBy: FilterState['sortBy']) => void;
  toggleSortDir: () => void;
  resetFilters: () => void;
}
