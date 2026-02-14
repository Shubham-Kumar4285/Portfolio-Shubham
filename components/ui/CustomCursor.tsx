'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { CustomCursorProps, CursorState } from '../hero/types';

/**
 * CustomCursor - Replaces default cursor with custom animated element
 * 
 * Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7
 * 
 * Features:
 * - Smooth cursor tracking with GSAP interpolation (0.1-0.15s delay)
 * - Expands on hover over interactive elements (a, button, [role="button"])
 * - Glow effect with configurable intensity
 * - Automatically hides default browser cursor
 * - Disabled on mobile devices (<768px)
 */
const CustomCursor: React.FC<CustomCursorProps> = ({
  size = 12,
  expandedSize = 32,
  color = 'rgba(255, 255, 255, 0.8)',
  glowIntensity = 0.5,
}) => {
  const [cursorState, setCursorState] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    isClicking: false,
  });

  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add custom-cursor-active class to body
  useEffect(() => {
    if (!isMobile) {
      document.body.classList.add('custom-cursor-active');
    } else {
      document.body.classList.remove('custom-cursor-active');
    }

    return () => {
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isMobile]);

  // Track cursor position with GSAP smooth interpolation
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Update state for position tracking
      setCursorState((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }));

      // Smooth interpolation with GSAP (0.1-0.15s delay)
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.12,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  // Detect hover over interactive elements
  useEffect(() => {
    if (isMobile) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"]');

      if (isInteractive && !cursorState.isHovering) {
        setCursorState((prev) => ({ ...prev, isHovering: true }));

        // Expand cursor with smooth animation
        gsap.to(cursorRef.current, {
          scale: expandedSize / size,
          opacity: 0.6,
          duration: 0.3,
          ease: 'back.out(1.7)',
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"]');

      if (isInteractive && cursorState.isHovering) {
        setCursorState((prev) => ({ ...prev, isHovering: false }));

        // Return to default size
        gsap.to(cursorRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isMobile, cursorState.isHovering, size, expandedSize]);

  // Track click state
  useEffect(() => {
    if (isMobile) return;

    const handleMouseDown = () => {
      setCursorState((prev) => ({ ...prev, isClicking: true }));
      
      gsap.to(cursorRef.current, {
        scale: cursorState.isHovering ? (expandedSize / size) * 0.9 : 0.8,
        duration: 0.1,
        ease: 'power2.out',
      });
    };

    const handleMouseUp = () => {
      setCursorState((prev) => ({ ...prev, isClicking: false }));
      
      gsap.to(cursorRef.current, {
        scale: cursorState.isHovering ? expandedSize / size : 1,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMobile, cursorState.isHovering, size, expandedSize]);

  // Don't render on mobile
  if (isMobile) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        boxShadow: `0 0 ${glowIntensity * 20}px ${color}`,
        pointerEvents: 'none',
        zIndex: 10000,
        mixBlendMode: 'difference',
        transform: 'translate(-50%, -50%)',
      }}
      aria-hidden="true"
    />
  );
};

export default CustomCursor;
