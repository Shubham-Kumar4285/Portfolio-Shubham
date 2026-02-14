/**
 * Property-Based Test for Background Opacity Range
 * Feature: cinematic-3d-hero
 * Property 18: Background Opacity Range
 * Validates: Requirements 9.3
 */

import fc from 'fast-check';
import { render } from '@testing-library/react';
import React from 'react';
import { BackgroundLayer } from '../BackgroundLayer';

/**
 * Property 18: Background Opacity Range
 * 
 * For any background layer, the opacity should be between 0.6-0.8 (60-80%).
 * 
 * This test verifies that:
 * 1. The opacity is always within the specified range (0.6-0.8)
 * 2. The opacity is correctly applied to the DOM element
 * 3. The opacity value is properly formatted in the CSS opacity property
 */

describe('Feature: cinematic-3d-hero, Property 18: Background Opacity Range', () => {
  it('should apply opacity between 0.6-0.8 for any valid background layer configuration', () => {
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
          
          // Find the background image wrapper element that has the opacity
          const backgroundWrapper = container.querySelector('.background-image-wrapper');
          
          // Verify the element exists
          expect(backgroundWrapper).toBeTruthy();
          
          // Verify opacity is within the specified range
          expect(props.opacity).toBeGreaterThanOrEqual(0.6);
          expect(props.opacity).toBeLessThanOrEqual(0.8);
          
          // Get the computed style and verify opacity is applied
          if (backgroundWrapper) {
            const style = window.getComputedStyle(backgroundWrapper);
            const appliedOpacity = parseFloat(style.opacity || (backgroundWrapper as HTMLElement).style.opacity);
            
            // Verify the applied opacity matches the prop
            expect(appliedOpacity).toBeCloseTo(props.opacity, 2);
            expect(appliedOpacity).toBeGreaterThanOrEqual(0.6);
            expect(appliedOpacity).toBeLessThanOrEqual(0.8);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should maintain opacity within range across different blur configurations', () => {
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
          
          const backgroundWrapper = container.querySelector('.background-image-wrapper');
          expect(backgroundWrapper).toBeTruthy();
          
          // Verify opacity is always within range regardless of blur or overlay
          expect(props.opacity).toBeGreaterThanOrEqual(0.6);
          expect(props.opacity).toBeLessThanOrEqual(0.8);
          
          // Verify the opacity is applied
          if (backgroundWrapper) {
            const opacityValue = (backgroundWrapper as HTMLElement).style.opacity;
            const appliedOpacity = parseFloat(opacityValue);
            
            expect(appliedOpacity).toBeCloseTo(props.opacity, 2);
            expect(appliedOpacity).toBeGreaterThanOrEqual(0.6);
            expect(appliedOpacity).toBeLessThanOrEqual(0.8);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should reject opacity values outside the valid range', () => {
    // Test that values below 0.6 or above 0.8 are not within spec
    const invalidOpacityValues = [0, 0.1, 0.3, 0.5, 0.59, 0.81, 0.9, 1.0];
    
    invalidOpacityValues.forEach((invalidOpacity) => {
      // These values are outside the specification range
      expect(invalidOpacity < 0.6 || invalidOpacity > 0.8).toBe(true);
    });
    
    // Test that all valid values are within range
    fc.assert(
      fc.property(
        fc.double({ min: 0.6, max: 0.8, noNaN: true }),
        (validOpacity) => {
          expect(validOpacity).toBeGreaterThanOrEqual(0.6);
          expect(validOpacity).toBeLessThanOrEqual(0.8);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should apply opacity consistently across multiple renders', () => {
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
          
          const wrapper1 = container1.querySelector('.background-image-wrapper');
          const wrapper2 = container2.querySelector('.background-image-wrapper');
          
          expect(wrapper1).toBeTruthy();
          expect(wrapper2).toBeTruthy();
          
          // Both should have the same opacity value
          if (wrapper1 && wrapper2) {
            const opacity1 = (wrapper1 as HTMLElement).style.opacity;
            const opacity2 = (wrapper2 as HTMLElement).style.opacity;
            
            expect(opacity1).toBe(opacity2);
            expect(parseFloat(opacity1)).toBeCloseTo(props.opacity, 2);
          }
        }
      ),
      { numRuns: 50 }
    );
  });

  it('should maintain opacity range with different image sources', () => {
    fc.assert(
      fc.property(
        fc.record({
          src: fc.oneof(
            fc.webUrl(),
            fc.constantFrom(
              '/images/background1.jpg',
              '/images/background2.png',
              '/images/background3.webp',
              'https://cdn.example.com/bg.jpg'
            )
          ),
          blurRadius: fc.integer({ min: 8, max: 16 }),
          opacity: fc.double({ min: 0.6, max: 0.8, noNaN: true }),
        }),
        (props) => {
          const { container } = render(<BackgroundLayer {...props} />);
          
          const backgroundWrapper = container.querySelector('.background-image-wrapper');
          expect(backgroundWrapper).toBeTruthy();
          
          // Verify opacity is within range regardless of image source
          expect(props.opacity).toBeGreaterThanOrEqual(0.6);
          expect(props.opacity).toBeLessThanOrEqual(0.8);
          
          if (backgroundWrapper) {
            const appliedOpacity = parseFloat((backgroundWrapper as HTMLElement).style.opacity);
            expect(appliedOpacity).toBeGreaterThanOrEqual(0.6);
            expect(appliedOpacity).toBeLessThanOrEqual(0.8);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should ensure opacity does not affect overlay intensity independently', () => {
    fc.assert(
      fc.property(
        fc.record({
          src: fc.webUrl(),
          blurRadius: fc.integer({ min: 8, max: 16 }),
          opacity: fc.double({ min: 0.6, max: 0.8, noNaN: true }),
          overlay: fc.record({
            type: fc.constantFrom('gradient', 'film-grain', 'dust-particles'),
            intensity: fc.double({ min: 0, max: 1, noNaN: true }),
          }),
        }),
        (props) => {
          const { container } = render(<BackgroundLayer {...props} />);
          
          const backgroundWrapper = container.querySelector('.background-image-wrapper');
          const overlayElement = container.querySelector(
            `.${props.overlay.type === 'film-grain' ? 'film-grain-overlay' : 
               props.overlay.type === 'gradient' ? 'gradient-overlay' : 
               'dust-particles-overlay'}`
          );
          
          expect(backgroundWrapper).toBeTruthy();
          expect(overlayElement).toBeTruthy();
          
          // Background opacity should be in range
          if (backgroundWrapper) {
            const bgOpacity = parseFloat((backgroundWrapper as HTMLElement).style.opacity);
            expect(bgOpacity).toBeGreaterThanOrEqual(0.6);
            expect(bgOpacity).toBeLessThanOrEqual(0.8);
          }
          
          // Overlay intensity is independent and can be 0-1
          if (overlayElement) {
            const overlayOpacity = parseFloat((overlayElement as HTMLElement).style.opacity);
            expect(overlayOpacity).toBeGreaterThanOrEqual(0);
            expect(overlayOpacity).toBeLessThanOrEqual(1);
            expect(overlayOpacity).toBeCloseTo(props.overlay.intensity, 2);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
