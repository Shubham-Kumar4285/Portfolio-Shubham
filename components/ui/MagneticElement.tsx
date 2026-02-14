'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MagneticElementProps {
  children: React.ReactNode;
  magneticRadius?: number;
  magneticStrength?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * MagneticElement - Non-clickable element with magnetic cursor attraction effect
 * 
 * Similar to MagneticButton but for non-interactive elements like text.
 */
export const MagneticElement: React.FC<MagneticElementProps> = ({
  children,
  magneticRadius = 100,
  magneticStrength = 0.3,
  className = '',
  style = {},
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  // Handle mouse move for magnetic effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef.current) return;

      // Get fresh element position on every mouse move
      const rect = elementRef.current.getBoundingClientRect();
      const elementCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      // Calculate distance from cursor to element center
      const distance = Math.sqrt(
        Math.pow(e.clientX - elementCenter.x, 2) +
        Math.pow(e.clientY - elementCenter.y, 2)
      );

      // If cursor is within magnetic radius
      if (distance < magneticRadius) {
        // Calculate angle from element center to cursor
        const angle = Math.atan2(
          e.clientY - elementCenter.y,
          e.clientX - elementCenter.x
        );

        // Calculate offset toward cursor
        const offsetDistance = (magneticRadius - distance) * magneticStrength;

        const offset = {
          x: Math.cos(angle) * offsetDistance,
          y: Math.sin(angle) * offsetDistance,
        };

        // Move element toward cursor with GSAP
        gsap.to(elementRef.current, {
          x: offset.x,
          y: offset.y,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        // Return to origin when cursor exits radius
        gsap.to(elementRef.current, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [magneticRadius, magneticStrength]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        ...style,
        position: 'relative',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};
