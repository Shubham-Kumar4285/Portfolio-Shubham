/**
 * BackgroundLayer Component
 * Feature: cinematic-3d-hero
 * 
 * Renders blurred environmental background with optional overlays.
 * Implements 110% width/height for parallax overflow.
 * 
 * Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6
 */

import React from 'react';
import Image from 'next/image';
import { BackgroundLayerProps } from './types';

export const BackgroundLayer = React.memo<BackgroundLayerProps>(({
  src,
  blurRadius,
  opacity,
  overlay,
}) => {
  return (
    <div className="background-layer">
      <div
        className="background-image-wrapper"
        style={{
          filter: `blur(${blurRadius}px)`,
          opacity: opacity,
        }}
      >
        <Image
          src={src}
          alt="Hero background"
          fill
          priority
          quality={80}
          className="background-image"
          style={{
            objectFit: 'cover',
          }}
        />
      </div>

      {overlay && overlay.type === 'film-grain' && (
        <div
          className="film-grain-overlay"
          style={{
            opacity: overlay.intensity,
          }}
        />
      )}

      {overlay && overlay.type === 'gradient' && (
        <div
          className="gradient-overlay"
          style={{
            opacity: overlay.intensity,
          }}
        />
      )}

      {overlay && overlay.type === 'dust-particles' && (
        <div
          className="dust-particles-overlay"
          style={{
            opacity: overlay.intensity,
          }}
        />
      )}

      <style jsx>{`
        .background-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          overflow: hidden;
        }

        .background-image-wrapper {
          position: absolute;
          top: -5%;
          left: -5%;
          width: 110%;
          height: 110%;
        }
        
        @media (max-width: 768px) {
          .background-image-wrapper {
            top: -10%;
            left: -10%;
            width: 120%;
            height: 120%;
          }
        }

        .background-image {
          width: 100%;
          height: 100%;
        }

        .film-grain-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,.05) 2px, rgba(255,255,255,.05) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,.05) 2px, rgba(255,255,255,.05) 4px);
          mix-blend-mode: overlay;
          pointer-events: none;
          opacity: 0.3;
          animation: grain-animation 0.5s steps(10) infinite;
        }

        .gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.4) 0%,
            rgba(0, 0, 0, 0.2) 50%,
            rgba(0, 0, 0, 0.6) 100%
          );
          pointer-events: none;
        }

        .dust-particles-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          mix-blend-mode: screen;
          pointer-events: none;
          animation: dust-animation 20s linear infinite;
        }

        @keyframes grain-animation {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
        }

        @keyframes dust-animation {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-50%, -50%); }
        }
      `}</style>
    </div>
  );
});

export default BackgroundLayer;
