'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BackgroundLayer } from './BackgroundLayer';
import { SubjectLayer } from './SubjectLayer';
import { GlassmorphicNav } from '../ui/GlassmorphicNav';
import { BioContextBox } from '../ui/BioContextBox';
import { ProjectSliderControls } from '../ui/ProjectSliderControls';
import CustomCursor from '../ui/CustomCursor';
import { HeroSectionProps } from './types';
import { gsap } from 'gsap';

/**
 * HeroSection - Main cinematic 3D hero component
 * 
 * Orchestrates all hero elements with parallax effects, animations,
 * and interactive UI components.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage,
  subjectImage,
  heroText,
  tagline,
  description,
  projects,
  navLinks,
  logo,
  ctaButton,
  theme,
}) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Refs for parallax layers
  const backgroundRef = useRef<HTMLDivElement>(null);
  const solidTextRef = useRef<HTMLDivElement>(null);
  const subjectRef = useRef<HTMLDivElement>(null);
  const outlineTextRef = useRef<HTMLDivElement>(null);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Parallax effect
  useEffect(() => {
    let hasMouseMoved = false;
    
    // Small delay to ensure all refs are set
    const timer = setTimeout(() => {
      // Entrance animations - skip or reduce if prefers-reduced-motion
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      if (prefersReducedMotion) {
        // Instant appearance without animation
        if (backgroundRef.current) backgroundRef.current.style.opacity = '1';
        if (solidTextRef.current) solidTextRef.current.style.opacity = '1';
        if (subjectRef.current) subjectRef.current.style.opacity = '1';
        if (outlineTextRef.current) outlineTextRef.current.style.opacity = '1';
      } else {
        // Normal entrance animations
        if (backgroundRef.current) {
          tl.fromTo(backgroundRef.current, 
            { scale: 1.1, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.2 }
          );
        }
        
        if (solidTextRef.current) {
          tl.fromTo(solidTextRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 },
            '-=0.6'
          );
        }
        
        if (subjectRef.current) {
          tl.fromTo(subjectRef.current,
            { y: 150, opacity: 0, scale: 0.8 },
            { y: 0, opacity: 1, scale: 1, duration: 1 },
            '-=0.5'
          );
        }
        
        if (outlineTextRef.current) {
          tl.fromTo(outlineTextRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 },
            '-=0.7'
          );
        }
      }
    }, 100);
    
    const handleMouseMove = (e: MouseEvent) => {
      // Skip parallax if prefers-reduced-motion or mobile
      if (prefersReducedMotion || isMobile) return;
      
      hasMouseMoved = true;
      
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const normalizedX = (clientX - centerX) / centerX;
      const normalizedY = (clientY - centerY) / centerY;
      
      const maxOffset = 50;
      
      // Background moves opposite direction
      if (backgroundRef.current) {
        gsap.to(backgroundRef.current, {
          x: -normalizedX * 0.25 * maxOffset,
          y: -normalizedY * 0.25 * maxOffset,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
      
      // Solid text (slower)
      if (solidTextRef.current) {
        gsap.to(solidTextRef.current, {
          x: normalizedX * 0.08 * maxOffset,
          y: normalizedY * 0.08 * maxOffset,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
      
      // Subject (medium speed)
      if (subjectRef.current) {
        gsap.to(subjectRef.current, {
          x: normalizedX * 0.12 * maxOffset,
          y: normalizedY * 0.12 * maxOffset,
          duration: 0.4,
          ease: 'power2.out',
          transformOrigin: 'center center',
        });
      }
      
      // Outline text (faster)
      if (outlineTextRef.current) {
        gsap.to(outlineTextRef.current, {
          x: normalizedX * 0.18 * maxOffset,
          y: normalizedY * 0.18 * maxOffset,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    };
    
    const handleMouseLeave = () => {
      if (!hasMouseMoved) return;
      
      // Return all to center
      [backgroundRef, solidTextRef, subjectRef, outlineTextRef].forEach(ref => {
        if (ref.current) {
          gsap.to(ref.current, {
            x: 0,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          });
        }
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prefersReducedMotion, isMobile]);

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor
        size={12}
        expandedSize={32}
        color="rgba(255, 255, 255, 0.8)"
        glowIntensity={0.5}
      />

      {/* Glassmorphic Navigation */}
      <GlassmorphicNav
        logo={logo}
        links={navLinks}
        ctaButton={ctaButton}
        theme={theme}
      />

      {/* Hero Section Container */}
      <section 
        className="relative w-full h-screen overflow-hidden" 
        aria-label="Hero section"
        role="banner"
        style={{
          contain: 'layout style paint',
          willChange: 'transform',
        }}
      >
        {/* Background Layer */}
        <div ref={backgroundRef} style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}>
          <BackgroundLayer
            src={backgroundImage}
            blurRadius={12}
            opacity={0.7}
            overlay={{
              type: 'film-grain',
              intensity: 0.05,
            }}
          />
        </div>

        {/* Solid Text Layer - Behind subject */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 5,
        }}>
          <div ref={solidTextRef} style={{
            fontSize: "clamp(2.5rem, 12vw, 16rem)",
            fontFamily: "'Bebas Neue', 'Anton', 'Oswald', sans-serif",
            ...(theme === 'light' ? {
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            } : {
              color: '#ffffff',
            }),
            fontWeight: 900,
            lineHeight: 0.85,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            transition: 'color 0.5s ease-in-out, background 0.5s ease-in-out',
          }}>
            {heroText}
          </div>
        </div>

        {/* Subject Layer */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 7,
          width: 'auto',
          height: isMobile ? '150vh' : '95vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <div ref={subjectRef} style={{
            width: 'auto',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <SubjectLayer
              src={subjectImage}
              alt={heroText}
              width={1600}
              height={2000}
              priority={true}
              scale={isMobile ? 5.5 : 2.2}
            />
          </div>
        </div>

        {/* Outline Text Layer - In front of subject */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
        }}>
          <div ref={outlineTextRef} style={{
            fontSize: "clamp(2.5rem, 12vw, 16rem)",
            fontFamily: "'Bebas Neue', 'Anton', 'Oswald', sans-serif",
            color: 'transparent',
            WebkitTextStroke: theme === 'light' 
              ? (isMobile ? '2px rgba(102, 126, 234, 0.4)' : '4px rgba(102, 126, 234, 0.4)')
              : (isMobile ? '2px rgba(255, 255, 255, 0.4)' : '4px rgba(255, 255, 255, 0.4)'),
            fontWeight: 900,
            lineHeight: 0.85,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            transition: '-webkit-text-stroke 0.5s ease-in-out',
          }}>
            {heroText}
          </div>
        </div>

        {/* Bio Context Box */}
        <BioContextBox
          tagline={tagline}
          description={description}
          theme={theme}
          isMobile={isMobile}
        />

        {/* Project Slider Controls */}
        <ProjectSliderControls
          projects={projects}
          currentIndex={currentProjectIndex}
          onNavigate={setCurrentProjectIndex}
          theme={theme}
          isMobile={isMobile}
        />
      </section>
    </>
  );
};

export default HeroSection;
