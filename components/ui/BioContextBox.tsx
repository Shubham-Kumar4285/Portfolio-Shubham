'use client';

import React from 'react';
import { MagneticElement } from './MagneticElement';

interface BioContextBoxProps {
  tagline: string;
  description: string;
  theme?: string;
  isMobile?: boolean;
}

/**
 * BioContextBox - Brief introduction to the portfolio owner
 * 
 * Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5
 * 
 * Features:
 * - Positioned in bottom-left area of hero section
 * - Displays tagline (1-2 sentences) describing role
 * - Displays description (2-3 sentences) of expertise
 * - Glassmorphic styling with semi-transparent background and backdrop blur
 * - Readable typography with sufficient contrast
 * - Responsive repositioning on smaller screens
 */
export const BioContextBox: React.FC<BioContextBoxProps> = ({
  tagline,
  description,
  theme = 'dark',
  isMobile = false,
}) => {
  const bgColor = theme === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(30, 20, 50, 0.85)';
  const borderColor = theme === 'light' ? 'rgba(102, 126, 234, 0.2)' : 'rgba(147, 112, 219, 0.3)';
  const textColor = theme === 'light' ? '#1f2937' : '#e9d5ff';
  const descColor = theme === 'light' ? '#4b5563' : 'rgba(233, 213, 255, 0.85)';
  
  return (
    <div
      className="absolute rounded-lg"
      style={{
        bottom: isMobile ? '140px' : '2rem',
        left: isMobile ? '0.75rem' : '2rem',
        right: isMobile ? 'auto' : 'auto',
        maxWidth: isMobile ? 'calc(100% - 1.5rem)' : '28rem',
        padding: isMobile ? '0.625rem 0.75rem' : '1.5rem',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        zIndex: 20,
        pointerEvents: 'auto',
        animation: 'slideInLeft 0.8s ease-out 1.2s both',
        transition: 'background-color 0.5s ease-in-out, border-color 0.5s ease-in-out',
      }}
    >
      {/* Tagline with Magnetic Effect */}
      <MagneticElement
        magneticRadius={isMobile ? 0 : 80}
        magneticStrength={0.2}
      >
        <h2 style={{ 
          fontSize: isMobile ? '0.875rem' : '1.25rem',
          fontWeight: 600,
          marginBottom: 0,
          lineHeight: 1.4,
          color: textColor,
          transition: 'color 0.5s ease-in-out',
        }}>
          {tagline}
        </h2>
      </MagneticElement>

      {/* Description - Hidden on mobile */}
      {!isMobile && (
        <p style={{ 
          fontSize: '1rem',
          lineHeight: 1.6,
          color: descColor,
          transition: 'color 0.5s ease-in-out',
        }}>
          {description}
        </p>
      )}
      
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};
