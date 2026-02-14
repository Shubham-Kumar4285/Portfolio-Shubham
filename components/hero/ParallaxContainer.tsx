'use client';

import React from 'react';
import { useParallax } from '@/hooks/useParallax';
import { ParallaxConfig } from './types';

interface ParallaxContainerProps {
  config: ParallaxConfig;
  children: React.ReactNode;
}

/**
 * ParallaxContainer - Wraps hero layers and applies parallax transforms
 * 
 * Uses useParallax hook to track mouse and apply transforms to child layers.
 * Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7
 */
export const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  config,
  children,
}) => {
  const { backgroundRef, subjectRef, solidTextRef, outlineTextRef } = useParallax(config);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        // Assign refs based on component type/className
        const className = (child.props as any).className || '';
        
        if (className.includes('background-layer')) {
          return React.cloneElement(child, { ref: backgroundRef } as any);
        }
        if (className.includes('subject-layer')) {
          return React.cloneElement(child, { ref: subjectRef } as any);
        }
        if (className.includes('solid-text')) {
          return React.cloneElement(child, { ref: solidTextRef } as any);
        }
        if (className.includes('outline-text')) {
          return React.cloneElement(child, { ref: outlineTextRef } as any);
        }

        return child;
      })}
    </div>
  );
};
