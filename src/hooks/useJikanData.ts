import { useState, useEffect, useCallback } from 'react';
import { type JikanAnime, fetchNowAiring, fetchUpcoming } from '../services/jikanApi';

interface UseJikanResult {
  data: JikanAnime[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}

function useJikanFetch(fetchFn: () => Promise<JikanAnime[]>, delay = 0): UseJikanResult {
  const [data, setData] = useState<JikanAnime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    const run = () => {
      fetchFn()
        .then(result => {
          if (!cancelled) {
            setData(result);
            setLoading(false);
          }
        })
        .catch(err => {
          if (!cancelled) {
            setError(err instanceof Error ? err.message : 'Failed to fetch data');
            setLoading(false);
          }
        });
    };

    if (delay > 0) {
      const timer = setTimeout(run, delay);
      return () => {
        cancelled = true;
        clearTimeout(timer);
      };
    } else {
      run();
      return () => { cancelled = true; };
    }
  }, [retryCount]); // eslint-disable-line react-hooks/exhaustive-deps

  const retry = useCallback(() => setRetryCount(n => n + 1), []);

  return { data, loading, error, retry };
}

export const useNowAiring = () => useJikanFetch(fetchNowAiring, 0);
export const useUpcoming = () => useJikanFetch(fetchUpcoming, 350);
