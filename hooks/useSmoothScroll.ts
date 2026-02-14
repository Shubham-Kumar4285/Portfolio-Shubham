'use client';

import { useEffect } from 'react';

interface SmoothScrollConfig {
  duration?: number;
  easing?: (t: number) => number;
  smoothWheel?: boolean;
  smoothTouch?: boolean;
}

/**
 * useSmoothScroll - Custom hook for smooth scrolling with Lenis
 * 
 * Validates: Requirements 11.1, 11.2, 11.3, 11.4, 11.5, 11.6
 * 
 * Initializes Lenis smooth scroll library on mount and cleans up on unmount.
 * Applies smooth scrolling to the entire page with configurable parameters.
 */
export const useSmoothScroll = (config: SmoothScrollConfig = {}) => {
  useEffect(() => {
    // Dynamic import to avoid SSR issues
    let lenis: any = null;
    let rafId: number;

    const initLenis = async () => {
      try {
        const Lenis = (await import('lenis')).default;
        
        lenis = new Lenis({
          duration: config.duration || 1.2,
          easing: config.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
          smoothWheel: config.smoothWheel !== false,
          smoothTouch: config.smoothTouch || false,
        });

        // RAF loop for Lenis
        function raf(time: number) {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);
      } catch (error) {
        console.warn('Lenis failed to initialize, falling back to native scrolling:', error);
      }
    };

    initLenis();

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      if (lenis) {
        lenis.destroy();
      }
    };
  }, [config.duration, config.easing, config.smoothWheel, config.smoothTouch]);
};
