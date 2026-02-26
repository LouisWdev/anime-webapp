export interface JikanAnime {
  mal_id: number;
  url: string;
  images: {
    jpg: { large_image_url: string };
    webp: { large_image_url: string };
  };
  title: string;
  title_japanese: string | null;
  type: string | null;
  episodes: number | null;
  status: string | null;
  airing: boolean;
  aired: { from: string | null; string: string };
  score: number | null;
  rank: number | null;
  synopsis: string | null;
  season: string | null;
  year: number | null;
  studios: Array<{ mal_id: number; name: string }>;
  genres: Array<{ mal_id: number; name: string }>;
}

export type TrendingTab = 'now-airing' | 'upcoming';

const BASE = 'https://api.jikan.moe/v4';

async function jikanFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`Jikan API error: ${res.status}`);
  return res.json();
}

export const fetchNowAiring = (limit = 20) =>
  jikanFetch<{ data: JikanAnime[] }>(`/seasons/now?limit=${limit}`).then(r => r.data);

export const fetchUpcoming = (limit = 20) =>
  jikanFetch<{ data: JikanAnime[] }>(`/seasons/upcoming?limit=${limit}`).then(r => r.data);
