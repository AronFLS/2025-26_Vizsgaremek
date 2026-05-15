import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  // Initialize with the current match state
  const [matches, setMatches] = useState<boolean>(() => {
    // Check if window exists (for SSR/Next.js safety)
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQueryList = window.matchMedia(query);
    
    // Modern way to define the listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener('change', listener);
    
    // Clean up
    return () => mediaQueryList.removeEventListener('change', listener);
  }, [query]);

  return matches;
}