import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useMousePosition } from './useMousePosition';
import type { ParallaxConfig } from '@/components/hero/types';

/**
 * Custom hook for parallax effect with GSAP-based smooth interpolation
 * Feature: cinematic-3d-hero
 * Validates: Requirements 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 13.5
 * 
 * Tracks mouse position and calculates parallax offsets for each layer
 * with smooth GSAP interpolation. Background moves opposite to cursor,
 * other layers move in the same direction at different speeds.
 * 
 * @param config - ParallaxConfig with speed values for each layer
 * @returns Object with refs for each parallax layer
 */
export function useParallax(config: ParallaxConfig) {
  const mousePosition = useMousePosition();
  
  // Refs for each layer element
  const backgroundRef = useRef<HTMLDivElement>(null);
  const subjectRef = useRef<HTMLDivElement>(null);
  const solidTextRef = useRef<HTMLDivElement>(null);
  const outlineTextRef = useRef<HTMLDivElement>(null);
  
  // Ref to track if mouse is in viewport
  const isMouseInViewport = useRef<boolean>(true);
  
  // Ref for requestAnimationFrame
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Handle mouse leave - return to center
    const handleMouseLeave = () => {
      isMouseInViewport.current = false;
      
      // Animate all layers back to center position
      if (backgroundRef.current) {
        gsap.to(backgroundRef.current, {
          x: 0,
          y: 0,
          duration: config.smoothing,
          ease: 'power2.out',
        });
      }
      
      if (subjectRef.current) {
        gsap.to(subjectRef.current, {
          x: 0,
          y: 0,
          duration: config.smoothing,
          ease: 'power2.out',
        });
      }
      
      if (solidTextRef.current) {
        gsap.to(solidTextRef.current, {
          x: 0,
          y: 0,
          duration: config.smoothing,
          ease: 'power2.out',
        });
      }
      
      if (outlineTextRef.current) {
        gsap.to(outlineTextRef.current, {
          x: 0,
          y: 0,
          duration: config.smoothing,
          ease: 'power2.out',
        });
      }
    };
    
    const handleMouseEnter = () => {
      isMouseInViewport.current = true;
    };

    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [config.smoothing]);

  useEffect(() => {
    // Only apply parallax if mouse is in viewport
    if (!isMouseInViewport.current) {
      return;
    }

    // Use requestAnimationFrame for smooth updates
    const updateParallax = () => {
      const { normalizedX, normalizedY } = mousePosition;
      
      // Calculate offsets for each layer
      // Background: opposite direction (negative multiplier)
      const backgroundOffsetX = -normalizedX * config.backgroundSpeed * config.maxOffset;
      const backgroundOffsetY = -normalizedY * config.backgroundSpeed * config.maxOffset;
      
      // Subject: same direction
      const subjectOffsetX = normalizedX * config.subjectSpeed * config.maxOffset;
      const subjectOffsetY = normalizedY * config.subjectSpeed * config.maxOffset;
      
      // Solid text: same direction
      const solidTextOffsetX = normalizedX * config.solidTextSpeed * config.maxOffset;
      const solidTextOffsetY = normalizedY * config.solidTextSpeed * config.maxOffset;
      
      // Outline text: same direction
      const outlineTextOffsetX = normalizedX * config.outlineTextSpeed * config.maxOffset;
      const outlineTextOffsetY = normalizedY * config.outlineTextSpeed * config.maxOffset;
      
      // Apply transforms with GSAP smoothing
      if (backgroundRef.current) {
        gsap.to(backgroundRef.current, {
          x: backgroundOffsetX,
          y: backgroundOffsetY,
          duration: config.smoothing,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
      
      if (subjectRef.current) {
        gsap.to(subjectRef.current, {
          x: subjectOffsetX,
          y: subjectOffsetY,
          duration: config.smoothing,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
      
      if (solidTextRef.current) {
        gsap.to(solidTextRef.current, {
          x: solidTextOffsetX,
          y: solidTextOffsetY,
          duration: config.smoothing,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
      
      if (outlineTextRef.current) {
        gsap.to(outlineTextRef.current, {
          x: outlineTextOffsetX,
          y: outlineTextOffsetY,
          duration: config.smoothing,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    };

    // Use requestAnimationFrame for smooth 60fps updates
    rafRef.current = requestAnimationFrame(updateParallax);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [
    mousePosition,
    config.backgroundSpeed,
    config.subjectSpeed,
    config.solidTextSpeed,
    config.outlineTextSpeed,
    config.smoothing,
    config.maxOffset,
  ]);

  return {
    backgroundRef,
    subjectRef,
    solidTextRef,
    outlineTextRef,
  };
}
