/**
 * TypeScript interfaces for the Cinematic 3D Hero Section
 * Feature: cinematic-3d-hero
 */

// ============================================================================
// Component Props Interfaces
// ============================================================================

export interface HeroSectionProps {
  backgroundImage: string;
  subjectImage: string;
  heroText: string;
  tagline: string;
  description: string;
  projects: Project[];
  navLinks: NavLink[];
  logo: string | React.ReactNode;
  ctaButton: {
    label: string;
    href: string;
    onClick?: () => void;
  };
  theme?: string;
}

export interface BackgroundLayerProps {
  src: string;
  blurRadius: number;    // 8-16 pixels
  opacity: number;       // 0.6-0.8
  overlay?: {
    type: 'gradient' | 'film-grain' | 'dust-particles';
    intensity: number;
  };
}

export interface TextLayersProps {
  text: string;
  fontSize: string;      // e.g., "clamp(4rem, 15vw, 20rem)"
  fontFamily: string;    // "Bebas Neue", "Anton", or "Oswald"
  solidColor: string;    // e.g., "#ffffff"
  strokeColor: string;   // e.g., "rgba(255, 255, 255, 0.5)"
  strokeWidth: number;   // 2-4 pixels
}

export interface SubjectLayerProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean; // Next.js Image priority loading
  scale?: number;
}

export interface ParallaxContainerProps {
  children: React.ReactNode;
  config: ParallaxConfig;
}

export interface GlassmorphicNavProps {
  logo: string | React.ReactNode;
  links: NavLink[];
  ctaButton: {
    label: string;
    href: string;
    onClick?: () => void;
  };
  theme?: string;
}

export interface BioContextBoxProps {
  tagline: string;
  description: string;
}

export interface ProjectSliderControlsProps {
  projects: Project[];
  currentIndex: number;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export interface MagneticButtonProps {
  children: React.ReactNode;
  magneticRadius: number; // 80-120 pixels
  magneticStrength: number; // 0.3-0.5 (percentage of distance)
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface CustomCursorProps {
  size: number;           // 8-16 pixels default
  expandedSize: number;   // 24-40 pixels on hover
  color: string;
  glowIntensity: number;  // 0-1
}

// ============================================================================
// Data Models
// ============================================================================

export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  tags: string[];
  featured: boolean;
}

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

// ============================================================================
// Configuration Objects
// ============================================================================

export interface ParallaxConfig {
  backgroundSpeed: number;  // 0.2-0.3 (opposite direction)
  subjectSpeed: number;     // 0.1-0.15 (same direction)
  solidTextSpeed: number;   // 0.05-0.1
  outlineTextSpeed: number; // 0.15-0.2
  smoothing: number;        // 0.3-0.5 (easing duration)
  maxOffset: number;        // Maximum pixel offset (e.g., 50)
}

export interface AnimationConfig {
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

export interface ResponsiveConfig {
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

export interface PerformanceConfig {
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

// ============================================================================
// State Management
// ============================================================================

export interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
}

export interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isClicking: boolean;
}

export interface HeroState {
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
