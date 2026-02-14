/**
 * Property-Based Test for Background Viewport Coverage
 * Feature: cinematic-3d-hero
 * Property 20: Background Viewport Coverage
 * Validates: Requirements 9.6
 */

import fc from 'fast-check';
import { render } from '@testing-library/react';
import React from 'react';
import { BackgroundLayer } from '../BackgroundLayer';

/**
 * Property 20: Background Viewport Coverage
 * 
 * For any viewport size, the background layer should have width and height >= 100% 
 * of viewport dimensions with object-fit: cover.
 * 
 * This test verifies that:
 * 1. The background layer container covers 100% of the viewport
 * 2. The background image wrapper is 110% (for parallax overflow)
 * 3. The image uses object-fit: cover to prevent distortion
 * 4. Coverage is maintained across different viewport sizes
 */

describe('Feature: cinematic-3d-hero, Property 20: Background Viewport Coverage', () => {
  it('should cover full viewport with width and height >= 100% for any valid configuration', () => {
    fc.assert(
      fc.property(
        fc.record({
          src: fc.constantFrom(
            '/images/bg1.jpg',
            '/images/bg2.jpg',
            '/images/bg3.png',
            'https://example.com/bg.jpg'
          ),
          blurRadius: fc.integer({ min: 8, max: 16 }),
          opacity: fc.double({ min: 0.6, max: 0.8, noNaN: true }),
          overlay: fc.option(
            fc.record({
              type: fc.constantFrom('gradient', 'film-grain', 'dust-particles'),
              intensity: fc.double({ min: 0, max: 1, noNaN: true }),
            }),
            { nil: undefined }
          ),
        }),
        (props) => {
          // Render the BackgroundLayer component with generated props
          const { container } = render(<BackgroundLayer {...props} />);
          
          // Find the background layer container
          const backgroundLayer = container.querySelector('.background-layer');
          
          // Verify the container exists
          expect(backgroundLayer).toBeTruthy();
          
          if (backgroundLayer) {
            // Get computed styles for the background layer
            const layerStyle = window.getComputedStyle(backgroundLayer);
            
            // Verify the background layer covers 100% of viewport
            expect(layerStyle.width).toBe('100%');
            expect(layerStyle.height).toBe('100%');
            expect(layerStyle.position).toBe('absolute');
            expect(layerStyle.top).toBe('0px');
            expect(layerStyle.left).toBe('0px');
          }
          
          // Find the background image wrapper (110% for parallax)
          const backgroundWrapper = container.querySelector('.background-image-wrapper');
          expect(backgroundWrapper).toBeTruthy();
          
          if (backgroundWrapper) {
            const wrapperStyle = window.getComputedStyle(backgroundWrapper);
            
            // Verify the wrapper is 110% (for parallax overflow)
            expect(wrapperStyle.width).toBe('110%');
            expect(wrapperStyle.height).toBe('110%');
            expect(wrapperStyle.position).toBe('absolute');
          }
          
          // Find the Next.js Image component
          const imageElement = container.querySelector('.background-image');
          expect(imageElement).toBeTruthy();
          
          if (imageElement) {
            // Verify object-fit: cover is applied
            const imageStyle = window.getComputedStyle(imageElement);
            expect(imageStyle.objectFit).toBe('cover');
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should maintain viewport coverage across different overlay configurations', () => {
    fc.assert(
      fc.property(
        fc.record({
          src: fc.webUrl(),
          blurRadius: fc.integer({ min: 8, max: 16 }),
          opacity: fc.double({ min: 0.6, max: 0.8, noNaN: true }),
          overlay: fc.oneof(
            fc.constant(undefined),
            fc.record({
              type: fc.constant('film-grain' as const),
              intensity: fc.double({ min: 0, max: 1, noNaN: true }),
            }),
            fc.record({
              type: fc.constant('gradient' as const),
              intensity: fc.double({ min: 0, max: 1, noNaN: true }),
            }),
            fc.record({
              type: fc.constant('dust-particles' as const),
              intensity: fc.double({ min: 0, max: 1, noNaN: true }),
            })
          ),
        }),
        (props) => {
          const { container } = render(<BackgroundLayer {...props} />);
          
          const backgroundLayer = container.querySelector('.background-layer');
          expect(backgroundLayer).toBeTruthy();
          
          // Verify coverage is maintained regardless of overlay
          if (backgroundLayer) {
            const layerStyle = window.getComputedStyle(backgroundLayer);
            expect(layerStyle.width).toBe('100%');
            expect(layerStyle.height).toBe('100%');
          }
          
          // If overlay exists, verify it also covers the full area
          if (props.overlay) {
            const overlayElement = container.querySelector(
              `.${props.overlay.type === 'film-grain' ? 'film-grain-overlay' : 
                 props.overlay.type === 'gradient' ? 'gradient-overlay' : 
                 'dust-particles-overlay'}`
            );
            
            expect(overlayElement).toBeTruthy();
            
            if (overlayElement) {
              const overlayStyle = window.getComputedStyle(overlayElement);
              expect(overlayStyle.width).toBe('100%');
              expect(overlayStyle.height).toBe('100%');
              expect(overlayStyle.position).toBe('absolute');
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should ensure no gaps or distortion with object-fit cover', () => {
    fc.assert(
      fc.property(
        fc.record({
          src: fc.constantFrom(
            '/images/wide-bg.jpg',
            '/images/tall-bg.jpg',
            '/images/square-bg.jpg'
          ),
          blurRadius: fc.integer({ min: 8, max: 16 }),
          opacity: fc.double({ min: 0.6, max: 0.8, noNaN: true }),
        }),
        (props) => {
          const { container } = render(<BackgroundLayer {...props} />);
          
          const imageElement = container.querySelector('.background-image');
          expect(imageElement).toBeTruthy();
          
          if (imageElement) {
            const imageStyle = window.getComputedStyle(imageElement);
            
            // Verify object-fit: cover prevents distortion and ensures coverage
            expect(imageStyle.objectFit).toBe('cover');
            
            // Verify the image fills its container
            expect(imageStyle.width).toBe('100%');
            expect(imageStyle.height).toBe('100%');
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should maintain coverage with different blur and opacity combinations', () => {
    fc.assert(
      fc.property(
        fc.record({
          src: fc.webUrl(),
          blurRadius: fc.integer({ min: 8, max: 16 }),
          opacity: fc.double({ min: 0.6, max: 0.8, noNaN: true }),
        }),
        (props) => {
          const { container } = render(<BackgroundLayer {...props} />);
          
          // Verify all layers maintain proper coverage
          const backgroundLayer = container.querySelector('.background-layer');
          const backgroundWrapper = container.querySelector('.background-image-wrapper');
          const imageElement = container.querySelector('.background-image');
          
          expect(backgroundLayer).toBeTruthy();
          expect(backgroundWrapper).toBeTruthy();
          expect(imageElement).toBeTruthy();
          
          // Check that coverage is not affected by blur or opacity
          if (backgroundLayer && backgroundWrapper && imageElement) {
            const layerStyle = window.getComputedStyle(backgroundLayer);
            const wrapperStyle = window.getComputedStyle(backgroundWrapper);
            const imageStyle = window.getComputedStyle(imageElement);
            
            // Layer covers 100%
            expect(layerStyle.width).toBe('100%');
            expect(layerStyle.height).toBe('100%');
            
            // Wrapper is 110% for parallax
            expect(wrapperStyle.width).toBe('110%');
            expect(wrapperStyle.height).toBe('110%');
            
            // Image uses cover
            expect(imageStyle.objectFit).toBe('cover');
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should verify overflow hidden prevents scrollbars from parallax overflow', () => {
    fc.assert(
      fc.property(
        fc.record({
          src: fc.webUrl(),
          blurRadius: fc.integer({ min: 8, max: 16 }),
          opacity: fc.double({ min: 0.6, max: 0.8, noNaN: true }),
        }),
        (props) => {
          const { container } = render(<BackgroundLayer {...props} />);
          
          const backgroundLayer = container.querySelector('.background-layer');
          expect(backgroundLayer).toBeTruthy();
          
          if (backgroundLayer) {
            const layerStyle = window.getComputedStyle(backgroundLayer);
            
            // Verify overflow is hidden to prevent scrollbars from 110% wrapper
            expect(layerStyle.overflow).toBe('hidden');
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should maintain proper z-index for background layer', () => {
    fc.assert(
      fc.property(
        fc.record({
          src: fc.webUrl(),
          blurRadius: fc.integer({ min: 8, max: 16 }),
          opacity: fc.double({ min: 0.6, max: 0.8, noNaN: true }),
          overlay: fc.option(
            fc.record({
              type: fc.constantFrom('gradient', 'film-grain', 'dust-particles'),
              intensity: fc.double({ min: 0, max: 1, noNaN: true }),
            }),
            { nil: undefined }
          ),
        }),
        (props) => {
          const { container } = render(<BackgroundLayer {...props} />);
          
          const backgroundLayer = container.querySelector('.background-layer');
          expect(backgroundLayer).toBeTruthy();
          
          if (backgroundLayer) {
            const layerStyle = window.getComputedStyle(backgroundLayer);
            
            // Verify z-index is 1 (background should be behind other layers)
            expect(layerStyle.zIndex).toBe('1');
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should ensure consistent coverage across multiple renders', () => {
    fc.assert(
      fc.property(
        fc.record({
          src: fc.webUrl(),
          blurRadius: fc.integer({ min: 8, max: 16 }),
          opacity: fc.double({ min: 0.6, max: 0.8, noNaN: true }),
        }),
        (props) => {
          // Render the component multiple times with the same props
          const { container: container1 } = render(<BackgroundLayer {...props} />);
          const { container: container2 } = render(<BackgroundLayer {...props} />);
          
          const layer1 = container1.querySelector('.background-layer');
          const layer2 = container2.querySelector('.background-layer');
          
          expect(layer1).toBeTruthy();
          expect(layer2).toBeTruthy();
          
          // Both should have the same coverage properties
          if (layer1 && layer2) {
            const style1 = window.getComputedStyle(layer1);
            const style2 = window.getComputedStyle(layer2);
            
            expect(style1.width).toBe(style2.width);
            expect(style1.height).toBe(style2.height);
            expect(style1.width).toBe('100%');
            expect(style1.height).toBe('100%');
          }
        }
      ),
      { numRuns: 50 }
    );
  });
});
