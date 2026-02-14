/**
 * Property-Based Tests for TypeScript Type Safety
 * Feature: cinematic-3d-hero
 * Property 37: TypeScript Component Props
 * Validates: Requirements 15.4
 */

import fc from 'fast-check';
import type {
  HeroSectionProps,
  BackgroundLayerProps,
  TextLayersProps,
  SubjectLayerProps,
  MagneticButtonProps,
  CustomCursorProps,
  Project,
  NavLink,
  ParallaxConfig,
  ResponsiveConfig,
  MousePosition,
  CursorState,
  HeroState,
} from '../types';

/**
 * Property 37: TypeScript Component Props
 * 
 * For any React component in the hero section, all props should have 
 * explicit TypeScript interface or type definitions.
 * 
 * This test verifies that:
 * 1. All interfaces are properly defined and can be imported
 * 2. Type checking works correctly for valid data
 * 3. TypeScript catches invalid data at compile time
 */

describe('Feature: cinematic-3d-hero, Property 37: TypeScript Component Props', () => {
  describe('Component Props Interfaces', () => {
    it('should accept valid HeroSectionProps', () => {
      fc.assert(
        fc.property(
          fc.record({
            backgroundImage: fc.webUrl(),
            subjectImage: fc.webUrl(),
            heroText: fc.string({ minLength: 1, maxLength: 50 }),
            tagline: fc.string({ minLength: 10, maxLength: 100 }),
            description: fc.string({ minLength: 20, maxLength: 200 }),
            projects: fc.array(
              fc.record({
                id: fc.uuid(),
                title: fc.string({ minLength: 1, maxLength: 50 }),
                description: fc.string({ minLength: 10, maxLength: 200 }),
                thumbnail: fc.webUrl(),
                url: fc.webUrl(),
                tags: fc.array(fc.string({ minLength: 1, maxLength: 20 }), { maxLength: 5 }),
                featured: fc.boolean(),
              }),
              { minLength: 1, maxLength: 10 }
            ),
          }),
          (props) => {
            // Type assertion verifies the interface is correctly defined
            const validProps: HeroSectionProps = props;
            
            // Verify all required properties exist
            expect(validProps).toHaveProperty('backgroundImage');
            expect(validProps).toHaveProperty('subjectImage');
            expect(validProps).toHaveProperty('heroText');
            expect(validProps).toHaveProperty('tagline');
            expect(validProps).toHaveProperty('description');
            expect(validProps).toHaveProperty('projects');
            expect(Array.isArray(validProps.projects)).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should accept valid BackgroundLayerProps', () => {
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
            const validProps: BackgroundLayerProps = props;
            
            expect(validProps.blurRadius).toBeGreaterThanOrEqual(8);
            expect(validProps.blurRadius).toBeLessThanOrEqual(16);
            expect(validProps.opacity).toBeGreaterThanOrEqual(0.6);
            expect(validProps.opacity).toBeLessThanOrEqual(0.8);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should accept valid TextLayersProps', () => {
      fc.assert(
        fc.property(
          fc.record({
            text: fc.string({ minLength: 1, maxLength: 50 }),
            fontSize: fc.constantFrom(
              'clamp(4rem, 15vw, 20rem)',
              'clamp(2rem, 10vw, 12rem)',
              'clamp(3rem, 12vw, 16rem)'
            ),
            fontFamily: fc.constantFrom('Bebas Neue', 'Anton', 'Oswald'),
            solidColor: fc.constantFrom('#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff'),
            strokeColor: fc.constantFrom(
              'rgba(255, 255, 255, 0.5)',
              'rgba(255, 255, 255, 0.3)',
              'rgba(0, 0, 0, 0.5)'
            ),
            strokeWidth: fc.integer({ min: 2, max: 4 }),
          }),
          (props) => {
            const validProps: TextLayersProps = props;
            
            expect(validProps.strokeWidth).toBeGreaterThanOrEqual(2);
            expect(validProps.strokeWidth).toBeLessThanOrEqual(4);
            expect(['Bebas Neue', 'Anton', 'Oswald']).toContain(validProps.fontFamily);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should accept valid SubjectLayerProps', () => {
      fc.assert(
        fc.property(
          fc.record({
            src: fc.webUrl(),
            alt: fc.string({ minLength: 5, maxLength: 100 }),
            width: fc.integer({ min: 300, max: 2000 }),
            height: fc.integer({ min: 300, max: 2000 }),
            priority: fc.option(fc.boolean(), { nil: undefined }),
          }),
          (props) => {
            const validProps: SubjectLayerProps = props;
            
            expect(validProps.width).toBeGreaterThan(0);
            expect(validProps.height).toBeGreaterThan(0);
            expect(typeof validProps.alt).toBe('string');
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should accept valid MagneticButtonProps', () => {
      fc.assert(
        fc.property(
          fc.record({
            magneticRadius: fc.integer({ min: 80, max: 120 }),
            magneticStrength: fc.double({ min: 0.3, max: 0.5, noNaN: true }),
            className: fc.option(fc.string(), { nil: undefined }),
          }),
          (props) => {
            const validProps: Partial<MagneticButtonProps> = props;
            
            if (validProps.magneticRadius !== undefined) {
              expect(validProps.magneticRadius).toBeGreaterThanOrEqual(80);
              expect(validProps.magneticRadius).toBeLessThanOrEqual(120);
            }
            if (validProps.magneticStrength !== undefined) {
              expect(validProps.magneticStrength).toBeGreaterThanOrEqual(0.3);
              expect(validProps.magneticStrength).toBeLessThanOrEqual(0.5);
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should accept valid CustomCursorProps', () => {
      fc.assert(
        fc.property(
          fc.record({
            size: fc.integer({ min: 8, max: 16 }),
            expandedSize: fc.integer({ min: 24, max: 40 }),
            color: fc.constantFrom('#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff'),
            glowIntensity: fc.double({ min: 0, max: 1, noNaN: true }),
          }),
          (props) => {
            const validProps: CustomCursorProps = props;
            
            expect(validProps.size).toBeGreaterThanOrEqual(8);
            expect(validProps.size).toBeLessThanOrEqual(16);
            expect(validProps.expandedSize).toBeGreaterThanOrEqual(24);
            expect(validProps.expandedSize).toBeLessThanOrEqual(40);
            expect(validProps.glowIntensity).toBeGreaterThanOrEqual(0);
            expect(validProps.glowIntensity).toBeLessThanOrEqual(1);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Configuration Objects', () => {
    it('should accept valid ParallaxConfig', () => {
      fc.assert(
        fc.property(
          fc.record({
            backgroundSpeed: fc.double({ min: 0.2, max: 0.3, noNaN: true }),
            subjectSpeed: fc.double({ min: 0.1, max: 0.15, noNaN: true }),
            solidTextSpeed: fc.double({ min: 0.05, max: 0.1, noNaN: true }),
            outlineTextSpeed: fc.double({ min: 0.15, max: 0.2, noNaN: true }),
            smoothing: fc.double({ min: 0.3, max: 0.5, noNaN: true }),
            maxOffset: fc.integer({ min: 30, max: 100 }),
          }),
          (config) => {
            const validConfig: ParallaxConfig = config;
            
            // Verify all speeds are within specified ranges
            expect(validConfig.backgroundSpeed).toBeGreaterThanOrEqual(0.2);
            expect(validConfig.backgroundSpeed).toBeLessThanOrEqual(0.3);
            expect(validConfig.subjectSpeed).toBeGreaterThanOrEqual(0.1);
            expect(validConfig.subjectSpeed).toBeLessThanOrEqual(0.15);
            expect(validConfig.solidTextSpeed).toBeGreaterThanOrEqual(0.05);
            expect(validConfig.solidTextSpeed).toBeLessThanOrEqual(0.1);
            expect(validConfig.outlineTextSpeed).toBeGreaterThanOrEqual(0.15);
            expect(validConfig.outlineTextSpeed).toBeLessThanOrEqual(0.2);
            expect(validConfig.smoothing).toBeGreaterThanOrEqual(0.3);
            expect(validConfig.smoothing).toBeLessThanOrEqual(0.5);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should accept valid ResponsiveConfig', () => {
      fc.assert(
        fc.property(
          fc.record({
            mobile: fc.record({
              maxWidth: fc.constant(768),
              textScale: fc.constant(0.5),
              disableParallax: fc.boolean(),
              disableMagnetic: fc.boolean(),
              disableCustomCursor: fc.boolean(),
            }),
            tablet: fc.record({
              maxWidth: fc.constant(1024),
              textScale: fc.constant(0.7),
              parallaxIntensity: fc.constant(0.5),
            }),
            desktop: fc.record({
              minWidth: fc.constant(1280),
              textScale: fc.constant(1.0),
            }),
          }),
          (config) => {
            const validConfig: ResponsiveConfig = config;
            
            expect(validConfig.mobile.maxWidth).toBe(768);
            expect(validConfig.tablet.maxWidth).toBe(1024);
            expect(validConfig.desktop.minWidth).toBe(1280);
            expect(validConfig.mobile.textScale).toBe(0.5);
            expect(validConfig.tablet.textScale).toBe(0.7);
            expect(validConfig.desktop.textScale).toBe(1.0);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('State Management Interfaces', () => {
    it('should accept valid MousePosition', () => {
      fc.assert(
        fc.property(
          fc.record({
            x: fc.integer({ min: 0, max: 3840 }),
            y: fc.integer({ min: 0, max: 2160 }),
            normalizedX: fc.double({ min: -1, max: 1, noNaN: true }),
            normalizedY: fc.double({ min: -1, max: 1, noNaN: true }),
          }),
          (position) => {
            const validPosition: MousePosition = position;
            
            expect(validPosition.normalizedX).toBeGreaterThanOrEqual(-1);
            expect(validPosition.normalizedX).toBeLessThanOrEqual(1);
            expect(validPosition.normalizedY).toBeGreaterThanOrEqual(-1);
            expect(validPosition.normalizedY).toBeLessThanOrEqual(1);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should accept valid CursorState', () => {
      fc.assert(
        fc.property(
          fc.record({
            x: fc.integer({ min: 0, max: 3840 }),
            y: fc.integer({ min: 0, max: 2160 }),
            isHovering: fc.boolean(),
            isClicking: fc.boolean(),
          }),
          (state) => {
            const validState: CursorState = state;
            
            expect(typeof validState.isHovering).toBe('boolean');
            expect(typeof validState.isClicking).toBe('boolean');
            expect(validState.x).toBeGreaterThanOrEqual(0);
            expect(validState.y).toBeGreaterThanOrEqual(0);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should accept valid HeroState', () => {
      fc.assert(
        fc.property(
          fc.record({
            isLoaded: fc.boolean(),
            isAnimating: fc.boolean(),
            currentProject: fc.integer({ min: 0, max: 10 }),
            mousePosition: fc.record({
              x: fc.integer({ min: 0, max: 3840 }),
              y: fc.integer({ min: 0, max: 2160 }),
              normalizedX: fc.double({ min: -1, max: 1, noNaN: true }),
              normalizedY: fc.double({ min: -1, max: 1, noNaN: true }),
            }),
            viewport: fc.record({
              width: fc.integer({ min: 320, max: 3840 }),
              height: fc.integer({ min: 568, max: 2160 }),
              breakpoint: fc.constantFrom('mobile', 'tablet', 'desktop'),
            }),
            prefersReducedMotion: fc.boolean(),
          }),
          (state) => {
            const validState: HeroState = state;
            
            expect(typeof validState.isLoaded).toBe('boolean');
            expect(typeof validState.isAnimating).toBe('boolean');
            expect(validState.currentProject).toBeGreaterThanOrEqual(0);
            expect(['mobile', 'tablet', 'desktop']).toContain(validState.viewport.breakpoint);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Data Models', () => {
    it('should accept valid Project', () => {
      fc.assert(
        fc.property(
          fc.record({
            id: fc.uuid(),
            title: fc.string({ minLength: 1, maxLength: 50 }),
            description: fc.string({ minLength: 10, maxLength: 200 }),
            thumbnail: fc.webUrl(),
            url: fc.webUrl(),
            tags: fc.array(fc.string({ minLength: 1, maxLength: 20 }), { maxLength: 5 }),
            featured: fc.boolean(),
          }),
          (project) => {
            const validProject: Project = project;
            
            expect(validProject.id).toBeTruthy();
            expect(validProject.title.length).toBeGreaterThan(0);
            expect(Array.isArray(validProject.tags)).toBe(true);
            expect(typeof validProject.featured).toBe('boolean');
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should accept valid NavLink', () => {
      fc.assert(
        fc.property(
          fc.record({
            label: fc.string({ minLength: 1, maxLength: 20 }),
            href: fc.webUrl(),
            external: fc.option(fc.boolean(), { nil: undefined }),
          }),
          (link) => {
            const validLink: NavLink = link;
            
            expect(validLink.label.length).toBeGreaterThan(0);
            expect(validLink.href).toBeTruthy();
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
