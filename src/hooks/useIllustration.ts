import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const CACHE_KEY = 'lgm-problem-illustration';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface CachedImage {
  image: string;
  timestamp: number;
}

export const useIllustration = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIllustration = async () => {
      try {
        // Check cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsedCache: CachedImage = JSON.parse(cached);
          const isExpired = Date.now() - parsedCache.timestamp > CACHE_DURATION;
          
          if (!isExpired && parsedCache.image) {
            setImage(parsedCache.image);
            setIsLoading(false);
            return;
          }
        }

        // Fetch new illustration
        const { data, error: fetchError } = await supabase.functions.invoke('generate-illustration');

        if (fetchError) {
          console.error('Error fetching illustration:', fetchError);
          setError(fetchError.message);
          setIsLoading(false);
          return;
        }

        if (data?.image) {
          // Cache the result
          const cacheData: CachedImage = {
            image: data.image,
            timestamp: Date.now(),
          };
          localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
          
          setImage(data.image);
        } else if (data?.error) {
          setError(data.error);
        }
      } catch (err) {
        console.error('Error in useIllustration:', err);
        setError(err instanceof Error ? err.message : 'Failed to load illustration');
      } finally {
        setIsLoading(false);
      }
    };

    fetchIllustration();
  }, []);

  return { image, isLoading, error };
};
