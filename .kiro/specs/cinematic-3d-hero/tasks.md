# Implementation Plan: Cinematic 3D Hero Section

## Overview

This implementation plan breaks down the cinematic 3D hero section into discrete, incremental coding tasks. Each task builds on previous work, starting with core infrastructure, then implementing visual layers, adding interactivity, and finally polishing with animations and responsive behavior. The plan follows a bottom-up approach: establish the foundation, build the visual layers, add motion and interactivity, then optimize and test.

## Tasks

- [x] 1. Set up project structure and dependencies
  - Install required packages: `gsap`, `lenis`, `fast-check` (dev)
  - Create directory structure: `components/hero/`, `components/ui/`, `components/animations/`, `hooks/`
  - Define TypeScript interfaces in `components/hero/types.ts` for all configuration objects, props, and state
  - Set up custom CSS file at `styles/hero.css` for text stroke and glassmorphic styles
  - _Requirements: 15.1, 15.2, 15.3, 15.4_

- [x] 1.1 Write property test for TypeScript type safety
  - **Property 37: TypeScript Component Props**
  - **Validates: Requirements 15.4**

- [ ] 2. Implement BackgroundLayer component
  - [x] 2.1 Create BackgroundLayer.tsx with Next.js Image component
    - Accept props: src, blurRadius, opacity, overlay configuration
    - Apply CSS blur filter and opacity
    - Implement 110% width/height for parallax overflow
    - Add film grain overlay with CSS animation (if enabled)
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

  - [x] 2.2 Write property test for background blur range
    - **Property 17: Background Blur Range**
    - **Validates: Requirements 9.2**

  - [x] 2.3 Write property test for background opacity range
    - **Property 18: Background Opacity Range**
    - **Validates: Requirements 9.3**

  - [x] 2.4 Write property test for viewport coverage
    - **Property 20: Background Viewport Coverage**
    - **Validates: Requirements 9.6**

  - [x] 2.5 Write unit tests for BackgroundLayer
    - Test image rendering with correct props
    - Test film grain overlay when enabled
    - Test error handling for missing image

- [ ] 3. Implement TextLayers component
  - [x] 3.1 Create TextLayers.tsx with solid and outline text
    - Render two absolutely positioned text elements
    - Apply custom font (Bebas Neue/Anton/Oswald) with clamp() sizing
    - Implement solid text with full color
    - Implement outline text with transparent fill and -webkit-text-stroke
    - Set z-index: 5 for solid, z-index: 10 for outline
    - Add pointer-events: none to outline text
    - _Requirements: 1.1, 1.2, 1.3, 1.5, 1.6_

  - [ ] 3.2 Write property test for text content consistency
    - **Property 2: Text Content Consistency**
    - **Validates: Requirements 1.3**

  - [ ] 3.3 Write unit tests for TextLayers
    - Test both text layers render with same content
    - Test font sizing with clamp()
    - Test z-index ordering
    - Test text stroke styling

- [ ] 4. Implement SubjectLayer component
  - [x] 4.1 Create SubjectLayer.tsx with Next.js Image
    - Accept props: src, alt, width, height, priority
    - Use Next.js Image with priority={true} for LCP optimization
    - Apply object-fit: contain and z-index: 7
    - Center positioning with transform: translate(-50%, -50%)
    - Implement responsive sizing with clamp()
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

  - [ ] 4.2 Write property test for subject size range
    - **Property 21: Subject Layer Size Range**
    - **Validates: Requirements 10.3**

  - [ ] 4.3 Write property test for aspect ratio preservation
    - **Property 22: Subject Aspect Ratio Preservation**
    - **Validates: Requirements 10.4**

  - [ ] 4.4 Write unit tests for SubjectLayer
    - Test image renders with correct props
    - Test z-index positioning
    - Test priority loading
    - Test error handling for missing image

- [ ] 5. Checkpoint - Verify static layers render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Implement mouse position tracking hook
  - [x] 6.1 Create useMousePosition.ts custom hook
    - Track mouse x, y coordinates
    - Calculate normalized coordinates (-1 to 1) relative to viewport center
    - Return MousePosition interface with x, y, normalizedX, normalizedY
    - Add event listeners for mousemove and mouseleave
    - Clean up listeners on unmount
    - _Requirements: 2.1_

  - [ ] 6.2 Write unit tests for useMousePosition
    - Test mouse position tracking
    - Test normalization calculation
    - Test cleanup on unmount

- [ ] 7. Implement parallax system
  - [x] 7.1 Create useParallax.ts custom hook
    - Accept ParallaxConfig with speed values for each layer
    - Use useMousePosition hook for cursor tracking
    - Calculate offset for each layer: normalizedPosition × speed × maxOffset
    - Apply negative multiplier for background (opposite direction)
    - Use GSAP.to() with smoothing duration for interpolation
    - Return to center position on mouse leave
    - Use requestAnimationFrame for smooth updates
    - _Requirements: 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 13.5_

  - [ ] 7.2 Write property test for parallax speed ratios
    - **Property 3: Parallax Speed Ratios**
    - **Validates: Requirements 2.2, 2.3, 2.4, 2.5, 2.6**

  - [ ] 7.3 Write property test for parallax reset on exit
    - **Property 4: Parallax Reset on Exit**
    - **Validates: Requirements 2.7**

  - [ ] 7.4 Write property test for requestAnimationFrame usage
    - **Property 29: Parallax RequestAnimationFrame Usage**
    - **Validates: Requirements 13.5**

  - [ ] 7.5 Write unit tests for useParallax
    - Test offset calculations
    - Test direction multipliers
    - Test GSAP integration
    - Test cleanup

- [ ] 8. Create ParallaxContainer component
  - [ ] 8.1 Implement ParallaxContainer.tsx
    - Use useParallax hook with configuration
    - Apply transforms to child layers via refs
    - Wrap BackgroundLayer, TextLayers, and SubjectLayer
    - Pass calculated offsets to each layer
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [ ] 8.2 Write integration tests for ParallaxContainer
    - Test all layers receive correct transforms
    - Test mouse tracking integration
    - Test layer coordination

- [ ] 9. Implement entrance animations
  - [ ] 9.1 Create useEntranceAnimation.ts custom hook
    - Create GSAP timeline on mount
    - Sequence 1: Background fade from 0 to 1 opacity (0.8-1.2s)
    - Sequence 2: Subject scale from 0.8 to 1.0 (0.6-1.0s)
    - Sequence 3: Solid text slide up from below viewport (0.5-0.8s)
    - Sequence 4: Outline text slide up with 0.1-0.2s delay (0.5-0.8s)
    - Sequence 5: UI elements fade in (0.4-0.6s)
    - Use easing functions: power2.out, back.out, power3.out
    - Play timeline only once on initial mount
    - Kill timeline on unmount
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

  - [ ] 9.2 Write property test for entrance animation sequence
    - **Property 7: Entrance Animation Sequence**
    - **Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5**

  - [ ] 9.3 Write property test for animation easing functions
    - **Property 8: Animation Easing Functions**
    - **Validates: Requirements 4.6**

  - [ ] 9.4 Write property test for single playback
    - **Property 9: Single Entrance Animation Playback**
    - **Validates: Requirements 4.7**

  - [ ] 9.5 Write unit tests for useEntranceAnimation
    - Test timeline creation
    - Test animation sequence order
    - Test cleanup on unmount

- [ ] 10. Checkpoint - Verify animations work correctly
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Implement MagneticButton component
  - [x] 11.1 Create MagneticButton.tsx
    - Accept props: children, magneticRadius, magneticStrength, onClick, className
    - Track button position and size with useRef
    - Calculate distance from cursor to button center
    - If distance < magneticRadius, calculate offset toward cursor
    - Use GSAP.to() to move button with 0.2-0.4s duration
    - Return to origin when cursor exits radius
    - Disable magnetic effect temporarily on click
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [ ] 11.2 Write property test for magnetic button behavior
    - **Property 10: Magnetic Button Behavior**
    - **Validates: Requirements 5.1, 5.2, 5.3**

  - [ ] 11.3 Write property test for magnetic effect timing
    - **Property 11: Magnetic Effect Timing**
    - **Validates: Requirements 5.5**

  - [ ] 11.4 Write property test for magnetic disable on click
    - **Property 12: Magnetic Disable on Click**
    - **Validates: Requirements 5.6**

  - [ ] 11.5 Write unit tests for MagneticButton
    - Test offset calculation
    - Test GSAP integration
    - Test click handling
    - Test multiple buttons don't interfere

- [ ] 12. Implement CustomCursor component
  - [x] 12.1 Create CustomCursor.tsx
    - Accept props: size, expandedSize, color, glowIntensity
    - Track cursor position with GSAP.to() and 0.1-0.15s delay
    - Detect hover over interactive elements (a, button, [role="button"])
    - Expand cursor from default size to expandedSize on hover
    - Change opacity or color on hover
    - Apply glow effect with box-shadow
    - Hide default browser cursor with CSS
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

  - [ ] 12.2 Write property test for custom cursor tracking
    - **Property 13: Custom Cursor Tracking**
    - **Validates: Requirements 6.2, 6.3, 6.4**

  - [ ] 12.3 Write property test for cursor hover state
    - **Property 14: Custom Cursor Hover State**
    - **Validates: Requirements 6.5**

  - [ ] 12.4 Write property test for screen reader compatibility
    - **Property 33: Custom Cursor Screen Reader Compatibility**
    - **Validates: Requirements 14.3**

  - [ ] 12.5 Write unit tests for CustomCursor
    - Test cursor follows mouse
    - Test expansion on hover
    - Test default cursor hidden
    - Test disabled on mobile

- [ ] 13. Implement GlassmorphicNav component
  - [x] 13.1 Create GlassmorphicNav.tsx
    - Accept props: logo, links, ctaButton
    - Apply fixed positioning at top
    - Implement glassmorphic styling: backdrop-filter blur(12px), semi-transparent background
    - Render navigation links with hover underline animation
    - Render logo in top-left
    - Render CTA button (using MagneticButton) in top-right
    - Ensure sufficient contrast for readability
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

  - [ ] 13.2 Write property test for glassmorphic styling
    - **Property 5: Glassmorphic Styling**
    - **Validates: Requirements 3.2, 7.4**

  - [ ] 13.3 Write property test for navigation hover feedback
    - **Property 6: Navigation Hover Feedback**
    - **Validates: Requirements 3.4**

  - [ ] 13.4 Write unit tests for GlassmorphicNav
    - Test all links render
    - Test hover effects
    - Test CTA button integration
    - Test keyboard navigation

- [ ] 14. Implement BioContextBox component
  - [x] 14.1 Create BioContextBox.tsx
    - Accept props: tagline, description
    - Position in bottom-left of hero section
    - Apply glassmorphic styling (backdrop-filter, semi-transparent background)
    - Render tagline (1-2 sentences)
    - Render description (2-3 sentences)
    - Ensure readable typography with sufficient contrast
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [ ] 14.2 Write unit tests for BioContextBox
    - Test content renders
    - Test glassmorphic styling
    - Test positioning
    - Test responsive behavior

- [ ] 15. Implement ProjectSliderControls component
  - [x] 15.1 Create ProjectSliderControls.tsx
    - Accept props: projects, currentIndex, onNavigate
    - Position in bottom-right of hero section
    - Render "View My Work" button with MagneticButton
    - Render left/right navigation arrows with MagneticButton
    - Display current project preview/thumbnail
    - Handle arrow clicks to increment/decrement index with wrapping
    - Implement smooth transitions (0.4-0.6s duration)
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7_

  - [ ] 15.2 Write property test for project slider navigation
    - **Property 15: Project Slider Navigation**
    - **Validates: Requirements 8.4**

  - [ ] 15.3 Write property test for slider transition duration
    - **Property 16: Project Slider Transition Duration**
    - **Validates: Requirements 8.7**

  - [ ] 15.4 Write unit tests for ProjectSliderControls
    - Test navigation increments/decrements
    - Test wrapping at boundaries
    - Test transition timing
    - Test magnetic button integration

- [ ] 16. Checkpoint - Verify all UI components work together
  - Ensure all tests pass, ask the user if questions arise.

- [-] 17. Implement smooth scrolling integration
  - [x] 17.1 Create useSmoothScroll.ts custom hook
    - Initialize Lenis on mount
    - Configure with duration and easing parameters
    - Apply to entire page (not just hero section)
    - Support mouse wheel and trackpad gestures
    - Target 60fps performance
    - Dispose instance on unmount
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6_

  - [ ] 17.2 Write property test for smooth scroll interpolation
    - **Property 23: Smooth Scroll Interpolation**
    - **Validates: Requirements 11.2**

  - [ ] 17.3 Write property test for global application
    - **Property 24: Smooth Scroll Global Application**
    - **Validates: Requirements 11.3**

  - [ ] 17.4 Write property test for input support
    - **Property 25: Smooth Scroll Input Support**
    - **Validates: Requirements 11.5**

  - [ ] 17.5 Write property test for configuration
    - **Property 26: Smooth Scroll Configuration**
    - **Validates: Requirements 11.6**

  - [ ] 17.6 Write unit tests for useSmoothScroll
    - Test Lenis initialization
    - Test configuration applied
    - Test cleanup on unmount

- [ ] 18. Implement responsive design adaptations
  - [ ] 18.1 Add responsive breakpoint detection
    - Define breakpoints: 640px, 768px, 1024px, 1280px
    - Create useBreakpoint hook to detect current breakpoint
    - Update HeroState with viewport and breakpoint info
    - _Requirements: 12.7_

  - [ ] 18.2 Implement mobile adaptations
    - Scale text layers down proportionally below 768px
    - Reduce parallax intensity by 50% or disable below 768px
    - Scale subject layer down below 768px
    - Reposition bio box and slider controls to avoid overlap below 768px
    - Disable custom cursor below 768px
    - Disable magnetic button effects below 768px
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6_

  - [ ] 18.3 Write property test for responsive mobile adaptations
    - **Property 27: Responsive Mobile Adaptations**
    - **Validates: Requirements 12.1, 12.2, 12.3, 12.4, 12.5, 12.6**

  - [ ] 18.4 Write unit tests for responsive behavior
    - Test breakpoint detection
    - Test text scaling at different widths
    - Test effect disabling on mobile
    - Test layout repositioning

- [-] 19. Implement accessibility features
  - [x] 19.1 Add accessibility enhancements
    - Add alt text to SubjectLayer image
    - Ensure keyboard accessibility for all navigation links
    - Add visible focus indicators
    - Detect prefers-reduced-motion media query
    - Disable/reduce entrance animations when prefers-reduced-motion is enabled
    - Disable/reduce parallax effects when prefers-reduced-motion is enabled
    - Verify text contrast ratios meet WCAG AA (4.5:1 minimum)
    - Implement logical tab order for keyboard navigation
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7_

  - [ ] 19.2 Write property test for keyboard navigation focus indicators
    - **Property 32: Keyboard Navigation Focus Indicators**
    - **Validates: Requirements 14.2**

  - [ ] 19.3 Write property test for prefers-reduced-motion detection
    - **Property 34: Prefers-Reduced-Motion Detection**
    - **Validates: Requirements 14.4, 14.5**

  - [ ] 19.4 Write property test for text contrast ratio
    - **Property 35: Text Contrast Ratio**
    - **Validates: Requirements 14.6**

  - [ ] 19.5 Write property test for keyboard tab order
    - **Property 36: Keyboard Tab Order**
    - **Validates: Requirements 14.7**

  - [ ] 19.6 Write unit tests for accessibility
    - Test alt text present
    - Test focus indicators visible
    - Test keyboard navigation
    - Test reduced motion handling

- [-] 20. Implement performance optimizations
  - [x] 20.1 Add performance enhancements
    - Wrap static components with React.memo (TextLayers, BackgroundLayer)
    - Debounce resize handlers to max 10/second
    - Implement image lazy loading strategy (priority for subject/background)
    - Apply CSS containment: contain: layout style paint to hero section
    - Ensure all animations use only transform and opacity (GPU-accelerated)
    - Implement performance degradation detection (low FPS)
    - Reduce or disable effects when performance degrades
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.6, 13.7_

  - [ ] 20.2 Write property test for image loading strategy
    - **Property 28: Image Loading Strategy**
    - **Validates: Requirements 13.3**

  - [ ] 20.3 Write property test for GPU-accelerated properties
    - **Property 30: GPU-Accelerated Animation Properties**
    - **Validates: Requirements 13.6**

  - [ ] 20.4 Write property test for performance degradation adaptation
    - **Property 31: Performance Degradation Adaptation**
    - **Validates: Requirements 13.7**

  - [ ] 20.5 Write unit tests for performance optimizations
    - Test React.memo prevents re-renders
    - Test debounce limits execution
    - Test lazy loading configuration
    - Test FPS monitoring

- [ ] 21. Checkpoint - Verify performance and accessibility
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 22. Assemble HeroSection main component
  - [ ] 22.1 Create HeroSection.tsx main container
    - Accept HeroSectionProps with all configuration
    - Initialize GSAP and Lenis on mount
    - Coordinate entrance animations with useEntranceAnimation
    - Handle responsive breakpoints with useBreakpoint
    - Detect prefers-reduced-motion
    - Render component hierarchy: BackgroundLayer → ParallaxContainer → GlassmorphicNav → BioContextBox → ProjectSliderControls → CustomCursor
    - Clean up event listeners and kill GSAP instances on unmount
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 3.1, 7.1, 8.1, 9.1_

  - [ ] 22.2 Write property test for layer z-index ordering
    - **Property 1: Layer Z-Index Ordering**
    - **Validates: Requirements 1.1, 1.4, 10.2, 10.5**

  - [ ] 22.3 Write integration tests for HeroSection
    - Test all components render together
    - Test entrance animation coordination
    - Test parallax with all layers
    - Test responsive behavior end-to-end
    - Test accessibility features integrated

- [ ] 23. Add error handling and fallbacks
  - [ ] 23.1 Implement error boundaries and fallbacks
    - Add try-catch around GSAP.to() calls
    - Fallback to CSS transforms if GSAP fails
    - Handle missing mouse position data (use center position)
    - Validate speed configuration values (0-1 range)
    - Display placeholder for failed image loads
    - Provide multiple image format fallbacks (WebP → PNG → JPEG)
    - Check for GSAP global object before use
    - Check for window object before accessing (SSR safety)
    - Fallback to native scrolling if Lenis fails
    - Implement focus trap prevention
    - _Requirements: All error handling scenarios from design document_

  - [ ] 23.2 Write unit tests for error handling
    - Test GSAP failure fallback
    - Test image load failure
    - Test SSR safety
    - Test scroll library failure

- [ ] 24. Final integration and polish
  - [ ] 24.1 Wire all components together in main page
    - Import HeroSection into main page component
    - Provide real data for backgroundImage, subjectImage, heroText, tagline, description, projects
    - Configure animation timings and parallax speeds
    - Test full page flow from hero to next sections
    - Verify smooth scroll works across entire page
    - _Requirements: All requirements integrated_

  - [ ] 24.2 Write end-to-end integration tests
    - Test complete user journey
    - Test hero to next section transition
    - Test all interactions work together
    - Test error scenarios

- [ ] 25. Final checkpoint - Complete testing and verification
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties across random inputs
- Unit tests validate specific examples, edge cases, and error conditions
- The implementation follows a layered approach: foundation → visuals → interactivity → polish
- All animations use GSAP for consistency and performance
- All components are TypeScript-typed for safety
- Responsive behavior and accessibility are built in from the start, not added later
