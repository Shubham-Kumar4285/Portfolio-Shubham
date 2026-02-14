'use client';

import React from 'react';
import { MagneticButton } from './MagneticButton';

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
  theme?: string;
}

/**
 * GlassmorphicNav - Fixed navigation bar with glassmorphism styling
 * 
 * Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7
 * 
 * Features:
 * - Fixed positioning at top of viewport
 * - Semi-transparent background with backdrop blur
 * - Navigation links with hover underline animation
 * - Logo in top-left corner
 * - CTA button (using MagneticButton) in top-right corner
 * - Sufficient contrast for readability
 * - Theme-aware styling for light and dark modes
 */
export const GlassmorphicNav: React.FC<GlassmorphicNavProps> = ({
  logo,
  links,
  ctaButton,
  theme = 'dark',
}) => {
  const bgColor = theme === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(17, 25, 40, 0.75)';
  const borderColor = theme === 'light' ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255, 255, 255, 0.125)';
  const textColor = theme === 'light' ? '#1f2937' : '#ffffff';
  const textHoverColor = theme === 'light' ? '#111827' : '#ffffff';
  const textOpacity = theme === 'light' ? 0.7 : 0.8;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[1000] px-8 py-4"
      style={{
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        backgroundColor: bgColor,
        borderBottom: `1px solid ${borderColor}`,
        transition: 'background-color 0.5s ease-in-out, border-color 0.5s ease-in-out',
      }}
    >
      <div className="max-w-[1920px] mx-auto flex items-center justify-between">
        {/* Logo - Top Left */}
        <div className="flex-shrink-0">
          {typeof logo === 'string' ? (
            <span className="text-base md:text-xl font-bold" style={{ 
              color: textColor,
              transition: 'color 0.5s ease-in-out',
            }}>
              {logo}
            </span>
          ) : (
            logo
          )}
        </div>

        {/* Navigation Links - Center - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="nav-link relative transition-colors duration-300 text-sm lg:text-base"
              style={{
                color: `rgba(${theme === 'light' ? '31, 41, 55' : '255, 255, 255'}, ${textOpacity})`,
                transition: 'color 0.5s ease-in-out',
              }}
            >
              {link.label}
              <span className="nav-link-underline absolute bottom-[-4px] left-0 h-[2px] w-0 bg-gradient-to-r from-[#667eea] to-[#764ba2] transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* CTA Button - Top Right */}
        <div className="flex-shrink-0">
          <MagneticButton
            magneticRadius={80}
            magneticStrength={0.25}
            onClick={ctaButton.onClick}
            className="px-3 py-1.5 md:px-6 md:py-2 text-xs md:text-base bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-shadow duration-300"
          >
            <a
              href={ctaButton.href}
              className="block"
              onClick={(e) => {
                if (ctaButton.onClick) {
                  e.preventDefault();
                }
              }}
            >
              {ctaButton.label}
            </a>
          </MagneticButton>
        </div>
      </div>

      <style jsx>{`
        .nav-link:hover .nav-link-underline {
          width: 100%;
        }
      `}</style>
    </nav>
  );
};
