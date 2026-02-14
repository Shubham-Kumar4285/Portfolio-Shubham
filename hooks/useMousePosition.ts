import { useState, useEffect } from 'react';
import type { MousePosition } from '@/components/hero/types';

/**
 * Custom hook to track mouse position and calculate normalized coordinates
 * Feature: cinematic-3d-hero
 * Validates: Requirements 2.1
 * 
 * Tracks mouse x, y coordinates and calculates normalized coordinates (-1 to 1)
 * relative to viewport center for parallax effects.
 * 
 * @returns MousePosition object with x, y, normalizedX, normalizedY
 */
export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      
      // Get viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Calculate viewport center
      const centerX = viewportWidth / 2;
      const centerY = viewportHeight / 2;
      
      // Calculate normalized coordinates (-1 to 1)
      // Positive values = right/down from center, negative = left/up from center
      const normalizedX = (clientX - centerX) / centerX;
      const normalizedY = (clientY - centerY) / centerY;
      
      setMousePosition({
        x: clientX,
        y: clientY,
        normalizedX,
        normalizedY,
      });
    };

    const handleMouseLeave = () => {
      // Reset to center position when mouse leaves viewport
      setMousePosition({
        x: 0,
        y: 0,
        normalizedX: 0,
        normalizedY: 0,
      });
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return mousePosition;
}
