/**
 * TextLayers Component
 * Feature: cinematic-3d-hero
 * 
 * Renders both solid and outlined text layers for the 3D hero effect.
 * The solid text sits behind the subject (z-index: 5) while the outline
 * text sits in front (z-index: 10), creating a sandwich effect.
 * 
 * Validates: Requirements 1.1, 1.2, 1.3, 1.5, 1.6
 */

import React from 'react';
import { TextLayersProps } from './types';

export const TextLayers: React.FC<TextLayersProps> = ({
  text,
  fontSize,
  fontFamily,
  solidColor,
  strokeColor,
  strokeWidth,
}) => {
  const commonStyles: React.CSSProperties = {
    fontSize,
    fontFamily,
  };

  const solidTextStyles: React.CSSProperties = {
    ...commonStyles,
    color: solidColor,
  };

  const outlineTextStyles: React.CSSProperties = {
    ...commonStyles,
    // CSS variables for the outline text stroke
    ['--stroke-width' as string]: `${strokeWidth}px`,
    ['--stroke-color' as string]: strokeColor,
  };

  return (
    <>
      {/* Solid Text Layer - Behind subject (z-index: 5) */}
      <div 
        className="solid-text"
        style={solidTextStyles}
        aria-hidden="true"
      >
        {text}
      </div>

      {/* Outline Text Layer - In front of subject (z-index: 10) */}
      <div 
        className="outline-text"
        style={outlineTextStyles}
        aria-label={text}
      >
        {text}
      </div>
    </>
  );
};

// Memoize to prevent unnecessary re-renders
export default React.memo(TextLayers);
