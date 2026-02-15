'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MagneticButton } from './MagneticButton';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';

interface Project {
  title: string;
  description?: string;
  image?: string;
  thumbnail?: string;
  link?: string;
  url?: string;
  tags?: string[];
}

interface ProjectSliderControlsProps {
  projects: Project[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  theme?: string;
  isMobile?: boolean;
}

/**
 * ProjectSliderControls - Bottom-right navigation controls for project slider
 * 
 * Validates: Requirements 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7
 * 
 * Positioned in the bottom-right of the hero section, displays a "View My Work"
 * button and left/right navigation arrows with magnetic effects. Shows current
 * project preview with smooth transitions.
 */
export const ProjectSliderControls: React.FC<ProjectSliderControlsProps> = ({
  projects,
  currentIndex,
  onNavigate,
  theme = 'dark',
  isMobile = false,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const textColor = theme === 'light' ? '#000000' : '#e9d5ff';
  const glassColor = theme === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(30, 20, 50, 0.85)';
  const borderColor = theme === 'light' ? 'rgba(102, 126, 234, 0.2)' : 'rgba(147, 112, 219, 0.3)';
  const counterColor = theme === 'light' ? '#4b5563' : 'rgba(233, 213, 255, 0.7)';


  // Handle navigation with wrapping
  const handleNavigate = (direction: 'prev' | 'next') => {
    if (isTransitioning || projects.length === 0) return;

    setIsTransitioning(true);

    let newIndex: number;
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    }

    onNavigate(newIndex);

    // Reset transition state after animation completes (0.5s duration)
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // Handle View My Work button click
  const handleViewWork = () => {
    // Scroll to projects section
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get current project
  const currentProject = projects[currentIndex];
  const projectImage = currentProject?.image || currentProject?.thumbnail || '/placeholder.png';
  const projectUrl = currentProject?.link || currentProject?.url || '#';

  return (
    <>
      <div className="absolute z-50 flex flex-col items-end" style={{
        bottom: isMobile ? '0.75rem' : '2rem',
        right: isMobile ? '0.75rem' : '2rem',
        gap: isMobile ? '0.375rem' : '1rem',
        animation: 'slideInRight 0.8s ease-out 1.3s both',
      }}>
        {/* View My Work Button */}
        <MagneticButton
          magneticRadius={isMobile ? 0 : 80}
          magneticStrength={0.25}
          onClick={handleViewWork}
          className="flex items-center rounded-lg"
          style={{
            padding: isMobile ? '0.5rem 1rem' : '0.75rem 1.5rem',
            fontSize: isMobile ? '0.75rem' : '1rem',
            fontWeight: 600,
            gap: isMobile ? '0.375rem' : '0.5rem',
            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            backgroundColor: glassColor,
            border: `1px solid ${borderColor}`,
            color: textColor,
            transition: 'background-color 0.5s ease-in-out, border-color 0.5s ease-in-out, color 0.5s ease-in-out',
          }}
        >
          <span>View My Work</span>
          <FiArrowRight style={{ width: isMobile ? '0.875rem' : '1.25rem', height: isMobile ? '0.875rem' : '1.25rem' }} />
        </MagneticButton>

        {/* Project Preview and Navigation */}
        {projects.length > 0 && (
          <div className="flex items-center rounded-lg" style={{
            gap: isMobile ? '0.375rem' : '1rem',
            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            backgroundColor: glassColor,
            border: `1px solid ${borderColor}`,
            padding: isMobile ? '0.375rem' : '0.5rem',
            transition: 'all 0.5s ease-in-out',
          }}>
            {/* Navigation Arrows */}
            <div style={{ display: 'flex', gap: isMobile ? '0.25rem' : '0.5rem' }}>
              {/* Left Arrow */}
              <MagneticButton
                magneticRadius={isMobile ? 0 : 60}
                magneticStrength={0.2}
                onClick={() => handleNavigate('prev')}
                className="flex items-center justify-center rounded-lg"
                style={{ 
                  width: isMobile ? '1.75rem' : '2.5rem',
                  height: isMobile ? '1.75rem' : '2.5rem',
                  color: textColor,
                  border: `1px solid ${borderColor}`,
                  backgroundColor: 'transparent',
                  transition: 'color 0.5s ease-in-out, border-color 0.5s ease-in-out, background-color 0.5s ease-in-out',
                }}
              >
                <FiChevronLeft style={{ width: isMobile ? '1.125rem' : '1.5rem', height: isMobile ? '1.125rem' : '1.5rem' }} />
              </MagneticButton>

              {/* Right Arrow */}
              <MagneticButton
                magneticRadius={isMobile ? 0 : 60}
                magneticStrength={0.2}
                onClick={() => handleNavigate('next')}
                className="flex items-center justify-center rounded-lg"
                style={{ 
                  width: isMobile ? '1.75rem' : '2.5rem',
                  height: isMobile ? '1.75rem' : '2.5rem',
                  color: textColor,
                  border: `1px solid ${borderColor}`,
                  backgroundColor: 'transparent',
                  transition: 'color 0.5s ease-in-out, border-color 0.5s ease-in-out, background-color 0.5s ease-in-out',
                }}
              >
                <FiChevronRight style={{ width: isMobile ? '1.125rem' : '1.5rem', height: isMobile ? '1.125rem' : '1.5rem' }} />
              </MagneticButton>
            </div>

            {/* Project Preview */}
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-lg overflow-hidden group"
              style={{
                width: isMobile ? '3rem' : '6rem',
                height: isMobile ? '3rem' : '6rem',
              }}
            >
              <Image
                src={projectImage}
                alt={currentProject?.title || 'Project preview'}
                fill
                className={`object-cover transition-all duration-500 ${
                  isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                } group-hover:scale-110`}
                sizes="(max-width: 768px) 64px, 96px"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-xs font-semibold">View</span>
              </div>
            </a>

            {/* Project Info */}
            <div className="flex flex-col" style={{ 
              gap: isMobile ? '0.125rem' : '0.25rem',
              maxWidth: isMobile ? '4.5rem' : '12.5rem',
            }}>
              <p style={{ 
                fontSize: isMobile ? '0.625rem' : '0.75rem',
                color: counterColor,
                transition: 'color 0.5s ease-in-out',
              }}>
                {currentIndex + 1} / {projects.length}
              </p>
              <h3
                className={`line-clamp-2 transition-all duration-500 ${
                  isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
                }`}
                style={{ 
                  fontSize: isMobile ? '0.625rem' : '0.875rem',
                  fontWeight: 600,
                  color: textColor,
                  lineHeight: 1.3,
                  transition: 'color 0.5s ease-in-out',
                }}
              >
                {currentProject?.title || 'Untitled Project'}
              </h3>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};
