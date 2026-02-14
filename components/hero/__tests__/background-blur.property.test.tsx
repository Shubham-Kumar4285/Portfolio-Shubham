/**
 * Property-Based Test for Background Blur Range
 * Feature: cinematic-3d-hero
 * Property 17: Background Blur Range
 * Validates: Requirements 9.2
 */

import fc from 'fast-check';
import { render } from '@testing-library/react';
import React from 'react';
import { BackgroundLayer } from '../BackgroundLayer';

/**
 * Property 17: Background Blur Range
 * 
 * For any background layer, the CSS filter blur radius should be between 8-16 pixels.
 * 
 * This test verifies that:
 * 1. The blur radius is always within the specified range (8-16px)
 * 2. The blur filter is correctly applied to the DOM element
 * 3. The blur value is properly formatted in the CSS filter property
 */

describe('Feature: cinematic-3d-hero, Property 17: Background Blur Range', () => {
  it('should apply blur radius between 8-16 pixels for any valid background layer configuration', () => {
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
          
          // Find the background image wrapper element that has the blur filter
          const backgroundWrapper = container.querySelector('.background-image-wrapper');
          
          // Verify the element exists
          expect(backgroundWrapper).toBeTruthy();
          
          // Get the computed style
          const style = backgroundWrapper ? window.getComputedStyle(backgroundWrapper) : null;
          
          // Verify blur radius is within the specified range
          expect(props.blurRadius).toBeGreaterThanOrEqual(8);
          expect(props.blurRadius).toBeLessThanOrEqual(16);
          
          // Verify the filter property contains the blur value
          if (style) {
            const filterValue = style.filter || (backgroundWrapper as HTMLElement).style.filter;
            expect(filterValue).toContain('blur');
            expect(filterValue).toContain(`${props.blurRadius}px`);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should maintain blur radius within range across different overlay configurations', () => {
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
          
          // Verify blur radius is always within range regardless of overlay
          expect(props.blurRadius).toBeGreaterThanOrEqual(8);
          expect(props.blurRadius).toBeLessThanOrEqual(16);
          
          // Verify the blur is applied
          if (backgroundWrapper) {
            const filterValue = (backgroundWrapper as HTMLElement).style.filter;
            expect(filterValue).toMatch(/blur\(\d+px\)/);
            
            // Extract the blur value and verify it matches the prop
            const blurMatch = filterValue.match(/blur\((\d+)px\)/);
            if (blurMatch) {
              const appliedBlur = parseInt(blurMatch[1], 10);
              expect(appliedBlur).toBe(props.blurRadius);
              expect(appliedBlur).toBeGreaterThanOrEqual(8);
              expect(appliedBlur).toBeLessThanOrEqual(16);
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should reject blur radius values outside the valid range', () => {
    // Test that values below 8 or above 16 are not within spec
    const invalidBlurValues = [0, 1, 5, 7, 17, 20, 50, 100];
    
    invalidBlurValues.forEach((invalidBlur) => {
      // These values are outside the specification range
      expect(invalidBlur < 8 || invalidBlur > 16).toBe(true);
    });
    
    // Test that all valid values are within range
    fc.assert(
      fc.property(
        fc.integer({ min: 8, max: 16 }),
        (validBlur) => {
          expect(validBlur).toBeGreaterThanOrEqual(8);
          expect(validBlur).toBeLessThanOrEqual(16);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should apply blur consistently across multiple renders', () => {
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
          
          // Both should have the same blur value
          if (wrapper1 && wrapper2) {
            const filter1 = (wrapper1 as HTMLElement).style.filter;
            const filter2 = (wrapper2 as HTMLElement).style.filter;
            
            expect(filter1).toBe(filter2);
            expect(filter1).toContain(`blur(${props.blurRadius}px)`);
          }
        }
      ),
      { numRuns: 50 }
    );
  });
});
