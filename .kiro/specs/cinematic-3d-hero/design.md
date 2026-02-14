# Design Document: Cinematic 3D Hero Section

## Overview

This design document outlines the technical architecture for transforming a Next.js portfolio website into a cinematic 3D layered hero experience. The implementation leverages GSAP for animations, React hooks for state management, and CSS transforms for GPU-accelerated performance. The design creates a depth-rich, interactive hero section where a character image appears sandwiched between solid and outlined text layers, with mouse-driven parallax effects creating an immersive 3D illusion.

The core innovation is the z-index layering technique combined with real-time parallax calculations that respond to cursor movement, creating the perception that the subject exists in three-dimensional space between text layers.

## Architecture

### Component Hierarchy

```
HeroSection (Container)
├── BackgroundLayer (Blurred environment image)
├── ParallaxContainer (Handles mouse tracking)
│   ├── SolidTextLayer (z-index: 5)
│   ├── SubjectLayer (Character PNG, z-index: 7)
│   └── OutlineTextLayer (Transparent fill with stroke, z-index: 10)
├── GlassmorphicNav (Fixed top navigation)
├── BioContextBox (Bottom-left info card)
├── ProjectSliderControls (Bottom-right navigation)
└── CustomCursor (Global cursor replacement)
```

### Technology Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript for type safety
- **Animation**: GSAP 3.12+ (gsap.core, gsap.to, gsap.timeline)
- **Smooth Scroll**: Lenis 1.0+ for cinematic scrolling
- **Styling**: Tailwind CSS with custom utilities
- **State Management**: React hooks (useState, useEffect, useRef)
- **Performance**: React.memo, useMemo, useCallback for optimization

### File Structure

```
app/
├── components/
│   ├── hero/
│   │   ├── HeroSection.tsx (Main container)
│   │   ├── ParallaxContainer.tsx (Mouse tracking logic)
│   │   ├── TextLayers.tsx (Solid and outline text)
│   │   ├── SubjectLayer.tsx (Character image)
│   │   ├── BackgroundLayer.tsx (Blurred background)
│   │   └── types.ts (TypeScript interfaces)
│   ├── ui/
│   │   ├── GlassmorphicNav.tsx
│   │   ├── BioContextBox.tsx
│   │   ├── ProjectSliderControls.tsx
│   │   ├── MagneticButton.tsx
│   │   └── CustomCursor.tsx
│   └── animations/
│       ├── useParallax.ts (Custom hook)
│       ├── useEntranceAnimation.ts (GSAP timeline)
│       └── useMagneticEffect.ts (Button magnetism)
├── hooks/
│   ├── useMousePosition.ts
│   └── useSmoothScroll.ts
└── styles/
    └── hero.css (Custom CSS for text stroke)
```

## Components and Interfaces

### 1. HeroSection Component

**Purpose**: Main container orchestrating all hero elements and managing global state.

**Interface**:
```typescript
interface HeroSectionProps {
  backgroundImage: string;
  subjectImage: string;
  heroText: string;
  tagline: string;
  description: string;
  projects: Project[];
}

interface Project {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
}
```

**Responsibilities**:
- Initialize GSAP and Lenis on mount
- Coordinate entrance animations
- Manage responsive breakpoints
- Handle prefers-reduced-motion detection

**Key Methods**:
- `initializeAnimations()`: Sets up GSAP timeline for entrance
- `handleResize()`: Adjusts layout for responsive breakpoints
- `cleanup()`: Removes event listeners and kills GSAP instances

### 2. ParallaxContainer Component

**Purpose**: Tracks mouse position and applies parallax transforms to child layers.

**Interface**:
```typescript
interface ParallaxConfig {
  backgroundSpeed: number;  // 0.2-0.3 (opposite direction)
  subjectSpeed: number;     // 0.1-0.15 (same direction)
  solidTextSpeed: number;   // 0.05-0.1
  outlineTextSpeed: number; // 0.15-0.2
  smoothing: number;        // 0.3-0.5 (easing duration)
  maxOffset: number;        // Maximum pixel offset (e.g., 50)
}

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
}
```

**Parallax Calculation Algorithm**:
```
1. Track mouse position relative to viewport center
2. Normalize coordinates to range [-1, 1]
3. For each layer:
   - Calculate offset = normalizedPosition * speed * maxOffset
   - Apply direction multiplier (negative for background)
   - Use GSAP.to() with smoothing duration for interpolation
4. Return layers to center when mouse leaves viewport
```

**Implementation Details**:
- Uses `requestAnimationFrame` for smooth 60fps updates
- Implements throttling to prevent excessive calculations
- Applies CSS `will-change: transform` for GPU acceleration
- Disables on mobile devices (viewport width < 768px)

### 3. TextLayers Component

**Purpose**: Renders both solid and outlined text with precise positioning.

**Interface**:
```typescript
interface TextLayersProps {
  text: string;
  fontSize: string;      // e.g., "clamp(4rem, 15vw, 20rem)"
  fontFamily: string;    // "Bebas Neue", "Anton", or "Oswald"
  solidColor: string;    // e.g., "#ffffff"
  strokeColor: string;   // e.g., "rgba(255, 255, 255, 0.5)"
  strokeWidth: number;   // 2-4 pixels
}
```

**CSS Implementation**:
```css
.solid-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  font-weight: 900;
  line-height: 0.85;
  letter-spacing: -0.02em;
  color: var(--solid-color);
  text-transform: uppercase;
}

.outline-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  font-weight: 900;
  line-height: 0.85;
  letter-spacing: -0.02em;
  color: transparent;
  -webkit-text-stroke: var(--stroke-width) var(--stroke-color);
  text-stroke: var(--stroke-width) var(--stroke-color);
  pointer-events: none; /* Critical: allows interaction with layers below */
  text-transform: uppercase;
}
```

**Responsive Scaling**:
- Desktop (>1280px): Full size (clamp max)
- Tablet (768-1280px): 70% scale
- Mobile (<768px): 50% scale with adjusted line-height

### 4. SubjectLayer Component

**Purpose**: Displays the character PNG with transparency between text layers.

**Interface**:
```typescript
interface SubjectLayerProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean; // Next.js Image priority loading
}
```

**Implementation**:
- Uses Next.js `<Image>` component with `priority={true}` for LCP optimization
- Applies `object-fit: contain` to maintain aspect ratio
- Sets `z-index: 7` to position between text layers
- Implements lazy loading for non-critical viewport positions
- Provides WebP format with PNG fallback

**Positioning Strategy**:
```typescript
// Center the subject with slight offset for visual balance
const subjectStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'clamp(300px, 50vw, 800px)',
  height: 'auto',
  zIndex: 7,
};
```

### 5. BackgroundLayer Component

**Purpose**: Renders blurred environmental background with optional overlays.

**Interface**:
```typescript
interface BackgroundLayerProps {
  src: string;
  blurRadius: number;    // 8-16 pixels
  opacity: number;       // 0.6-0.8
  overlay?: {
    type: 'gradient' | 'film-grain' | 'dust-particles';
    intensity: number;
  };
}
```

**CSS Implementation**:
```css
.background-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

.background-image {
  width: 110%; /* Slight overflow for parallax movement */
  height: 110%;
  object-fit: cover;
  filter: blur(var(--blur-radius));
  opacity: var(--opacity);
  transform: translate(-5%, -5%); /* Center the overflow */
}

.film-grain-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/textures/grain.png');
  opacity: 0.05;
  mix-blend-mode: overlay;
  pointer-events: none;
  animation: grain-animation 0.5s steps(1) infinite;
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
```

### 6. GlassmorphicNav Component

**Purpose**: Fixed navigation bar with glassmorphism styling.

**Interface**:
```typescript
interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

interface GlassmorphicNavProps {
  logo: string | React.ReactNode;
  links: NavLink[];
  ctaButton: {
    label: string;
    href: string;
    onClick?: () => void;
  };
}
```

**Glassmorphism CSS**:
```css
.glassmorphic-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.75);
  border-bottom: 1px solid rgba(255, 255, 255, 0.125);
  padding: 1rem 2rem;
}

.nav-link {
  position: relative;
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}
```

### 7. MagneticButton Component

**Purpose**: Interactive button with magnetic cursor attraction effect.

**Interface**:
```typescript
interface MagneticButtonProps {
  children: React.ReactNode;
  magneticRadius: number; // 80-120 pixels
  magneticStrength: number; // 0.3-0.5 (percentage of distance)
  onClick?: () => void;
  className?: string;
}
```

**Magnetic Algorithm**:
```typescript
function calculateMagneticOffset(
  cursorPos: { x: number; y: number },
  buttonPos: { x: number; y: number },
  buttonSize: { width: number; height: number },
  config: { radius: number; strength: number }
): { x: number; y: number } {
  // Calculate button center
  const buttonCenter = {
    x: buttonPos.x + buttonSize.width / 2,
    y: buttonPos.y + buttonSize.height / 2,
  };

  // Calculate distance from cursor to button center
  const distance = Math.sqrt(
    Math.pow(cursorPos.x - buttonCenter.x, 2) +
    Math.pow(cursorPos.y - buttonCenter.y, 2)
  );

  // If cursor is within magnetic radius
  if (distance < config.radius) {
    // Calculate offset toward cursor
    const angle = Math.atan2(
      cursorPos.y - buttonCenter.y,
      cursorPos.x - buttonCenter.x
    );
    
    const offsetDistance = (config.radius - distance) * config.strength;
    
    return {
      x: Math.cos(angle) * offsetDistance,
      y: Math.sin(angle) * offsetDistance,
    };
  }

  return { x: 0, y: 0 };
}
```

**GSAP Integration**:
```typescript
useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    const offset = calculateMagneticOffset(
      { x: e.clientX, y: e.clientY },
      buttonPosition,
      buttonSize,
      { radius: magneticRadius, strength: magneticStrength }
    );

    gsap.to(buttonRef.current, {
      x: offset.x,
      y: offset.y,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  window.addEventListener('mousemove', handleMouseMove);
  return () => window.removeEventListener('mousemove', handleMouseMove);
}, [buttonPosition, buttonSize, magneticRadius, magneticStrength]);
```

### 8. CustomCursor Component

**Purpose**: Replaces default cursor with custom animated element.

**Interface**:
```typescript
interface CustomCursorProps {
  size: number;           // 8-16 pixels default
  expandedSize: number;   // 24-40 pixels on hover
  color: string;
  glowIntensity: number;  // 0-1
}

interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isClicking: boolean;
}
```

**Implementation**:
```typescript
const CustomCursor: React.FC<CustomCursorProps> = ({
  size,
  expandedSize,
  color,
  glowIntensity,
}) => {
  const [cursorState, setCursorState] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    isClicking: false,
  });

  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Smooth interpolation with slight delay
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"]');
      
      if (isInteractive) {
        setCursorState(prev => ({ ...prev, isHovering: true }));
        gsap.to(cursorRef.current, {
          scale: expandedSize / size,
          duration: 0.3,
          ease: 'back.out(1.7)',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [size, expandedSize]);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        boxShadow: `0 0 ${glowIntensity * 20}px ${color}`,
      }}
    />
  );
};
```

**CSS**:
```css
.custom-cursor {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  z-index: 10000;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
}

body {
  cursor: none; /* Hide default cursor */
}

/* Restore default cursor on mobile */
@media (max-width: 768px) {
  .custom-cursor {
    display: none;
  }
  
  body {
    cursor: auto;
  }
}
```

## Data Models

### Configuration Objects

```typescript
// Animation configuration
interface AnimationConfig {
  entrance: {
    backgroundFade: {
      duration: number;      // 0.8-1.2 seconds
      ease: string;          // "power2.out"
    };
    subjectScale: {
      from: number;          // 0.8
      to: number;            // 1.0
      duration: number;      // 0.6-1.0 seconds
      ease: string;          // "back.out(1.7)"
    };
    textSlideUp: {
      distance: number;      // pixels from bottom
      duration: number;      // 0.5-0.8 seconds
      stagger: number;       // 0.1-0.2 seconds between layers
      ease: string;          // "power3.out"
    };
    uiFadeIn: {
      duration: number;      // 0.4-0.6 seconds
      ease: string;          // "power2.out"
    };
  };
  parallax: ParallaxConfig;
  magnetic: {
    radius: number;          // 80-120 pixels
    strength: number;        // 0.3-0.5
    duration: number;        // 0.2-0.4 seconds
    ease: string;            // "power2.out"
  };
}

// Responsive breakpoints
interface ResponsiveConfig {
  mobile: {
    maxWidth: number;        // 768px
    textScale: number;       // 0.5
    disableParallax: boolean;
    disableMagnetic: boolean;
    disableCustomCursor: boolean;
  };
  tablet: {
    maxWidth: number;        // 1024px
    textScale: number;       // 0.7
    parallaxIntensity: number; // 0.5 (50% of desktop)
  };
  desktop: {
    minWidth: number;        // 1280px
    textScale: number;       // 1.0
  };
}

// Performance thresholds
interface PerformanceConfig {
  targetFPS: number;         // 60
  fcpTarget: number;         // 1500ms
  maxParallaxUpdates: number; // 60 per second
  imageQuality: {
    background: number;      // 75-85
    subject: number;         // 90-95
  };
  prefersReducedMotion: {
    disableParallax: boolean;
    disableEntrance: boolean;
    reduceDuration: number;  // 0.5 (50% of normal)
  };
}
```

### State Management

```typescript
// Global hero state
interface HeroState {
  isLoaded: boolean;
  isAnimating: boolean;
  currentProject: number;
  mousePosition: MousePosition;
  viewport: {
    width: number;
    height: number;
    breakpoint: 'mobile' | 'tablet' | 'desktop';
  };
  prefersReducedMotion: boolean;
}

// Project data model
interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  tags: string[];
  featured: boolean;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Before writing the correctness properties, let me analyze the acceptance criteria for testability:



### Property 1: Layer Z-Index Ordering

*For any* rendered hero section, the computed z-index values should satisfy: solid text < subject layer < outline text, creating the visual sandwich effect where the subject appears between text layers.

**Validates: Requirements 1.1, 1.4, 10.2, 10.5**

### Property 2: Text Content Consistency

*For any* hero text value, the solid text layer and outline text layer should display identical text content, ensuring visual coherence.

**Validates: Requirements 1.3**

### Property 3: Parallax Speed Ratios

*For any* mouse movement within the hero section, all layers should move at their configured speed ratios: background (20-30% opposite direction), subject (10-15% same direction), solid text (5-10%), outline text (15-20%), with smooth easing transitions.

**Validates: Requirements 2.2, 2.3, 2.4, 2.5, 2.6**

### Property 4: Parallax Reset on Exit

*For any* mouse leave event from the hero section, all parallax layers should return to their center positions (transform: translate(0, 0)).

**Validates: Requirements 2.7**

### Property 5: Glassmorphic Styling

*For any* glassmorphic UI element (navigation, bio box), the element should have backdrop-filter containing blur() and background-color with alpha < 1.

**Validates: Requirements 3.2, 7.4**

### Property 6: Navigation Hover Feedback

*For any* navigation link, hovering should trigger a visual change (color, underline, or other CSS property modification).

**Validates: Requirements 3.4**

### Property 7: Entrance Animation Sequence

*For any* initial page load, the entrance animations should execute in order: background fade-in → subject scale → solid text slide → outline text slide (with delay) → UI fade-in, with each animation's duration within specified ranges.

**Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5**

### Property 8: Animation Easing Functions

*For any* GSAP animation tween in the hero section, the ease property should use power/back/expo easing functions (not linear), ensuring natural motion.

**Validates: Requirements 4.6**

### Property 9: Single Entrance Animation Playback

*For any* hero section instance, entrance animations should play exactly once on initial mount and not replay on subsequent re-renders or interactions.

**Validates: Requirements 4.7**

### Property 10: Magnetic Button Behavior

*For any* magnetic button, when the cursor enters within the magnetic radius (80-120px), the button should move toward the cursor at 30-50% of the distance, and return to origin when the cursor exits the radius.

**Validates: Requirements 5.1, 5.2, 5.3**

### Property 11: Magnetic Effect Timing

*For any* magnetic button movement, the GSAP animation duration should be between 0.2-0.4 seconds with smooth easing.

**Validates: Requirements 5.5**

### Property 12: Magnetic Disable on Click

*For any* magnetic button, clicking should temporarily disable the magnetic effect during the click animation, preventing conflicting transforms.

**Validates: Requirements 5.6**

### Property 13: Custom Cursor Tracking

*For any* mouse movement, the custom cursor should follow with smooth interpolation (0.1-0.15s delay) and expand from 8-16px to 24-40px when hovering over interactive elements.

**Validates: Requirements 6.2, 6.3, 6.4**

### Property 14: Custom Cursor Hover State

*For any* interactive element hover, the custom cursor should change at least one visual property (size, opacity, or color) to indicate interactivity.

**Validates: Requirements 6.5**

### Property 15: Project Slider Navigation

*For any* project slider arrow click, the current project index should increment (right arrow) or decrement (left arrow), wrapping around at boundaries.

**Validates: Requirements 8.4**

### Property 16: Project Slider Transition Duration

*For any* project transition, the animation duration should be between 0.4-0.6 seconds.

**Validates: Requirements 8.7**

### Property 17: Background Blur Range

*For any* background layer, the CSS filter blur radius should be between 8-16 pixels.

**Validates: Requirements 9.2**

### Property 18: Background Opacity Range

*For any* background layer, the opacity should be between 0.6-0.8 (60-80%).

**Validates: Requirements 9.3**

### Property 19: Film Grain Overlay Animation

*For any* background layer with film grain enabled, the overlay element should have a CSS animation applied.

**Validates: Requirements 9.4**

### Property 20: Background Viewport Coverage

*For any* viewport size, the background layer should have width and height >= 100% of viewport dimensions with object-fit: cover.

**Validates: Requirements 9.6**

### Property 21: Subject Layer Size Range

*For any* viewport, the subject image height should be between 40-60% of viewport height.

**Validates: Requirements 10.3**

### Property 22: Subject Aspect Ratio Preservation

*For any* viewport resize, the subject image aspect ratio should remain constant (width/height ratio unchanged).

**Validates: Requirements 10.4**

### Property 23: Smooth Scroll Interpolation

*For any* scroll event, the page position should update with eased interpolation rather than instant jumps (verified by measuring position changes over time).

**Validates: Requirements 11.2**

### Property 24: Smooth Scroll Global Application

*For any* scrollable element on the page, smooth scrolling behavior should apply, not just the hero section.

**Validates: Requirements 11.3**

### Property 25: Smooth Scroll Input Support

*For any* scroll input type (mouse wheel or trackpad), the smooth scrolling should function correctly.

**Validates: Requirements 11.5**

### Property 26: Smooth Scroll Configuration

*For any* Lenis/Locomotive instance, it should accept and apply configuration parameters for duration and easing.

**Validates: Requirements 11.6**

### Property 27: Responsive Mobile Adaptations

*For any* viewport width below 768px, the following should be true: text layers scale down, parallax is reduced/disabled, subject scales down, UI elements reposition, custom cursor is disabled, and magnetic effects are disabled.

**Validates: Requirements 12.1, 12.2, 12.3, 12.4, 12.5, 12.6**

### Property 28: Image Loading Strategy

*For any* image asset in the hero section, the Next.js Image component should have appropriate loading prop (priority for subject/background, lazy for others).

**Validates: Requirements 13.3**

### Property 29: Parallax RequestAnimationFrame Usage

*For any* parallax update cycle, the implementation should use requestAnimationFrame for scheduling updates.

**Validates: Requirements 13.5**

### Property 30: GPU-Accelerated Animation Properties

*For any* GSAP animation in the hero section, the animated properties should be limited to transform and opacity (GPU-accelerated).

**Validates: Requirements 13.6**

### Property 31: Performance Degradation Adaptation

*For any* detected performance degradation (low FPS), the system should reduce or disable animation effects.

**Validates: Requirements 13.7**

### Property 32: Keyboard Navigation Focus Indicators

*For any* interactive element, pressing Tab should move focus to it and display a visible focus indicator.

**Validates: Requirements 14.2**

### Property 33: Custom Cursor Screen Reader Compatibility

*For any* custom cursor element, it should have pointer-events: none or aria-hidden="true" to avoid interfering with screen readers.

**Validates: Requirements 14.3**

### Property 34: Prefers-Reduced-Motion Detection

*For any* system with prefers-reduced-motion enabled, the hero section should detect this and disable or significantly reduce entrance animations and parallax effects.

**Validates: Requirements 14.4, 14.5**

### Property 35: Text Contrast Ratio

*For any* text layer, the contrast ratio between text color and background should be >= 4.5:1 (WCAG AA).

**Validates: Requirements 14.6**

### Property 36: Keyboard Tab Order

*For any* sequence of Tab key presses, focus should move through interactive elements in a logical order (top-to-bottom, left-to-right).

**Validates: Requirements 14.7**

### Property 37: TypeScript Component Props

*For any* React component in the hero section, all props should have explicit TypeScript interface or type definitions.

**Validates: Requirements 15.4**

### Property 38: GSAP Type Annotations

*For any* GSAP usage, the imports and references should use TypeScript type annotations where available.

**Validates: Requirements 15.5**

## Error Handling

### Parallax System Errors

**Missing Mouse Position Data**:
- Fallback: Use center position (0, 0) if mouse position is undefined
- Log warning in development mode
- Continue rendering without parallax effect

**Invalid Speed Configuration**:
- Validation: Check speed values are between 0 and 1
- Fallback: Use default speeds if invalid
- Throw error in development, use defaults in production

**GSAP Animation Failures**:
- Try-catch around all GSAP.to() calls
- Fallback: Apply transforms directly via CSS if GSAP fails
- Log error and continue without animation

### Image Loading Errors

**Subject Image Load Failure**:
- Display placeholder with same dimensions
- Show error message in development
- Emit error event for monitoring

**Background Image Load Failure**:
- Use solid color fallback
- Continue with other hero elements
- Log error for debugging

**Image Format Not Supported**:
- Provide multiple format fallbacks (WebP → PNG → JPEG)
- Use Next.js Image component automatic format selection

### Animation Initialization Errors

**GSAP Not Loaded**:
- Check for GSAP global object before use
- Fallback: Use CSS transitions/animations
- Display warning in console

**Timeline Creation Failure**:
- Catch errors during timeline.to() calls
- Skip failed animation and continue with next
- Ensure UI is still functional without animations

**Entrance Animation Interruption**:
- If user interacts before animations complete, allow early exit
- Clean up incomplete animations
- Set final states immediately

### Responsive Breakpoint Errors

**Window Undefined (SSR)**:
- Check for window object before accessing
- Use default desktop configuration during SSR
- Apply correct breakpoint on client hydration

**Resize Event Throttling Failure**:
- Implement debounce as fallback
- Limit resize handler execution to max 10/second
- Prevent memory leaks from event listeners

### Smooth Scroll Errors

**Lenis/Locomotive Not Initialized**:
- Check for library instance before use
- Fallback: Use native browser scrolling
- Log warning in development

**Scroll Event Conflicts**:
- Disable smooth scroll if conflicts detected
- Provide manual disable option
- Ensure accessibility is maintained

### Performance Degradation

**Low FPS Detection**:
- Monitor frame times using performance.now()
- If average frame time > 33ms (< 30fps), reduce effects
- Disable parallax first, then entrance animations
- Keep core functionality working

**Memory Pressure**:
- Limit number of active GSAP tweens
- Clean up completed animations
- Remove event listeners when component unmounts

### Accessibility Errors

**Focus Trap**:
- Ensure Tab key can exit hero section
- Provide skip link to main content
- Test with keyboard-only navigation

**Screen Reader Issues**:
- Provide meaningful alt text for all images
- Use aria-labels for interactive elements
- Ensure custom cursor doesn't block interactions

**Reduced Motion Not Respected**:
- Always check prefers-reduced-motion before animations
- Provide manual toggle in settings
- Default to reduced motion if detection fails

## Testing Strategy

### Dual Testing Approach

This feature requires both unit tests and property-based tests for comprehensive coverage:

**Unit Tests**: Focus on specific examples, edge cases, and integration points
- Specific viewport sizes (320px, 768px, 1024px, 1920px)
- Specific mouse positions (center, corners, edges)
- Error conditions (missing images, GSAP not loaded)
- Component integration (nav + hero, slider + hero)

**Property Tests**: Verify universal properties across all inputs
- Random mouse positions within viewport
- Random viewport dimensions
- Random animation configurations
- Random project data

### Property-Based Testing Configuration

**Library**: Use `fast-check` for TypeScript/JavaScript property-based testing

**Test Configuration**:
- Minimum 100 iterations per property test
- Each test references its design document property
- Tag format: `Feature: cinematic-3d-hero, Property {number}: {property_text}`

**Example Property Test Structure**:
```typescript
import fc from 'fast-check';

describe('Feature: cinematic-3d-hero, Property 3: Parallax Speed Ratios', () => {
  it('should move all layers at correct speed ratios for any mouse position', () => {
    fc.assert(
      fc.property(
        fc.record({
          x: fc.integer({ min: 0, max: 1920 }),
          y: fc.integer({ min: 0, max: 1080 }),
        }),
        (mousePos) => {
          // Test implementation
          const layers = calculateParallaxOffsets(mousePos);
          
          // Verify speed ratios
          expect(layers.background.speed).toBeGreaterThanOrEqual(0.2);
          expect(layers.background.speed).toBeLessThanOrEqual(0.3);
          expect(layers.background.direction).toBe('opposite');
          
          expect(layers.subject.speed).toBeGreaterThanOrEqual(0.1);
          expect(layers.subject.speed).toBeLessThanOrEqual(0.15);
          expect(layers.subject.direction).toBe('same');
          
          // ... verify other layers
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Unit Test Coverage

**Component Rendering**:
- HeroSection renders all child components
- TextLayers renders both solid and outline text
- SubjectLayer renders image with correct props
- BackgroundLayer applies blur and opacity

**Animation Initialization**:
- GSAP timeline created on mount
- Entrance animations execute in correct order
- Animations play only once
- Cleanup on unmount

**Parallax Calculations**:
- Mouse position tracked correctly
- Layer offsets calculated with correct formulas
- Layers return to center on mouse leave
- Parallax disabled on mobile

**Magnetic Button Behavior**:
- Button moves toward cursor within radius
- Button returns to origin outside radius
- Magnetic effect disabled on click
- Multiple buttons don't interfere

**Custom Cursor**:
- Cursor follows mouse position
- Cursor expands on hover
- Default cursor hidden
- Cursor disabled on mobile

**Responsive Behavior**:
- Breakpoints trigger at correct widths
- Text scales appropriately
- Effects disabled on mobile
- Layout repositions correctly

**Accessibility**:
- Alt text present on images
- Focus indicators visible
- Keyboard navigation works
- Prefers-reduced-motion respected

### Integration Tests

**Hero + Navigation**:
- Navigation overlays hero correctly
- Glassmorphic effect works with hero background
- Navigation links don't interfere with parallax

**Hero + Smooth Scroll**:
- Lenis initializes correctly
- Scrolling from hero to next section is smooth
- Parallax doesn't conflict with scroll

**Hero + Project Slider**:
- Slider controls positioned correctly
- Project transitions don't affect hero animations
- Magnetic buttons work on slider arrows

### Performance Tests

**Animation Performance**:
- Entrance animations maintain 60fps
- Parallax updates maintain 60fps
- No layout thrashing during animations

**Image Loading**:
- Subject image loads with priority
- Background image doesn't block render
- WebP format used when supported

**Memory Usage**:
- No memory leaks from event listeners
- GSAP tweens cleaned up properly
- Smooth scroll instance disposed on unmount

### Visual Regression Tests

**Screenshot Comparisons**:
- Hero section at different breakpoints
- Text layers with different content lengths
- Subject layer with different image sizes
- Glassmorphic elements with different backgrounds

### Accessibility Tests

**Automated Testing**:
- Run axe-core on hero section
- Check contrast ratios programmatically
- Verify ARIA attributes

**Manual Testing**:
- Keyboard-only navigation
- Screen reader testing (NVDA, JAWS, VoiceOver)
- Reduced motion testing

### Browser Compatibility Tests

**Target Browsers**:
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari (iOS 15+)
- Chrome Mobile (Android 10+)

**Specific Tests**:
- Backdrop-filter support (fallback for older browsers)
- Text-stroke support
- GSAP compatibility
- Smooth scroll library compatibility

### Test Execution Strategy

1. **Development**: Run unit tests on file save
2. **Pre-commit**: Run all unit tests + linting
3. **CI Pipeline**: Run unit tests + property tests + integration tests
4. **Pre-deployment**: Run full test suite + visual regression + accessibility
5. **Post-deployment**: Monitor performance metrics and error rates

### Test Data Management

**Mock Data**:
```typescript
const mockHeroData = {
  backgroundImage: '/test-images/background.jpg',
  subjectImage: '/test-images/subject.png',
  heroText: 'TEST HERO',
  tagline: 'Test Tagline',
  description: 'Test description for hero section',
  projects: [
    { id: '1', title: 'Project 1', thumbnail: '/test-images/p1.jpg', url: '/p1' },
    { id: '2', title: 'Project 2', thumbnail: '/test-images/p2.jpg', url: '/p2' },
  ],
};
```

**Test Utilities**:
- `renderHero()`: Helper to render hero with default props
- `simulateMouseMove()`: Helper to trigger mouse events
- `waitForAnimations()`: Helper to wait for GSAP animations
- `setViewport()`: Helper to change viewport size
- `mockGSAP()`: Helper to mock GSAP for unit tests

## Implementation Notes

### Performance Optimization Strategies

1. **Use React.memo for static components**: Prevent unnecessary re-renders of TextLayers, BackgroundLayer
2. **Debounce resize handlers**: Limit resize calculations to max 10/second
3. **Throttle parallax updates**: Use requestAnimationFrame, skip frames if needed
4. **Lazy load non-critical images**: Only priority load subject and background
5. **Use CSS containment**: Apply `contain: layout style paint` to hero section
6. **Preload fonts**: Add font-display: swap and preload Bebas Neue/Anton/Oswald
7. **Code splitting**: Lazy load GSAP and Lenis only when hero is in viewport

### Browser Compatibility Considerations

1. **Backdrop-filter fallback**: Provide solid background for browsers without support
2. **Text-stroke fallback**: Use SVG text for browsers without -webkit-text-stroke
3. **GSAP polyfills**: Include polyfills for older browsers if needed
4. **Smooth scroll fallback**: Gracefully degrade to native scroll if library fails
5. **CSS Grid/Flexbox**: Use modern layout with fallbacks for IE11 (if required)

### Development Workflow

1. **Component-first development**: Build and test each component in isolation
2. **Storybook integration**: Create stories for each component with controls
3. **Animation playground**: Build separate page to test and tune animations
4. **Performance monitoring**: Use React DevTools Profiler during development
5. **Accessibility testing**: Test with keyboard and screen reader throughout development

### Deployment Considerations

1. **Image optimization**: Use Next.js Image optimization with WebP format
2. **CDN delivery**: Serve images and fonts from CDN
3. **Bundle size**: Monitor GSAP and Lenis bundle impact
4. **Error monitoring**: Set up Sentry or similar for production errors
5. **Performance monitoring**: Track Core Web Vitals (LCP, FID, CLS)
6. **A/B testing**: Consider testing different animation timings/styles

### Future Enhancements

1. **3D transforms**: Upgrade to true 3D with CSS transform: rotateX/Y
2. **WebGL effects**: Add particle systems or shaders for background
3. **Video background**: Support video instead of static image
4. **Multiple subjects**: Allow multiple character images with different parallax speeds
5. **Interactive text**: Make text interactive (hover effects, click to reveal)
6. **Theme switching**: Support light/dark mode with different color schemes
7. **Customization API**: Allow users to customize animations via UI controls
