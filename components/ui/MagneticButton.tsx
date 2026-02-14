'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  magneticRadius?: number; // 80-120 pixels
  magneticStrength?: number; // 0.3-0.5 (percentage of distance)
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * MagneticButton - Interactive button with magnetic cursor attraction effect
 * 
 * Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5, 5.6
 * 
 * The button moves toward the cursor when within the magnetic radius,
 * creating an engaging interactive effect. The magnetic effect is temporarily
 * disabled during click animations.
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  magneticRadius = 100,
  magneticStrength = 0.4,
  onClick,
  className = '',
  style = {},
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isClickDisabled, setIsClickDisabled] = useState(false);

  // Update button position and size on mount and resize (for initial render)
  useEffect(() => {
    const updateButtonMetrics = () => {
      if (buttonRef.current) {
        // Force a repaint to ensure button is positioned correctly
        buttonRef.current.getBoundingClientRect();
      }
    };

    updateButtonMetrics();
    window.addEventListener('resize', updateButtonMetrics);
    window.addEventListener('scroll', updateButtonMetrics);

    return () => {
      window.removeEventListener('resize', updateButtonMetrics);
      window.removeEventListener('scroll', updateButtonMetrics);
    };
  }, []);

  // Handle mouse move for magnetic effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current || isClickDisabled) return;

      // Get fresh button position on every mouse move
      const rect = buttonRef.current.getBoundingClientRect();
      const buttonCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      // Calculate distance from cursor to button center
      const distance = Math.sqrt(
        Math.pow(e.clientX - buttonCenter.x, 2) +
        Math.pow(e.clientY - buttonCenter.y, 2)
      );

      // If cursor is within magnetic radius
      if (distance < magneticRadius) {
        // Calculate angle from button center to cursor
        const angle = Math.atan2(
          e.clientY - buttonCenter.y,
          e.clientX - buttonCenter.x
        );

        // Calculate offset toward cursor (30-50% of distance)
        const offsetDistance = (magneticRadius - distance) * magneticStrength;

        const offset = {
          x: Math.cos(angle) * offsetDistance,
          y: Math.sin(angle) * offsetDistance,
        };

        // Move button toward cursor with GSAP
        gsap.to(buttonRef.current, {
          x: offset.x,
          y: offset.y,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        // Return to origin when cursor exits radius
        gsap.to(buttonRef.current, {
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
  }, [magneticRadius, magneticStrength, isClickDisabled]);

  // Handle click with temporary magnetic disable
  const handleClick = () => {
    if (!buttonRef.current) return;

    // Disable magnetic effect temporarily
    setIsClickDisabled(true);

    // Return button to origin
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.2,
      ease: 'power2.out',
    });

    // Re-enable magnetic effect after click animation
    setTimeout(() => {
      setIsClickDisabled(false);
    }, 400);

    // Call the onClick handler if provided
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={className}
      style={{
        ...style,
        position: 'relative',
        willChange: 'transform',
      }}
    >
      {children}
    </button>
  );
};
