'use client';

import React from 'react';
import Image from 'next/image';
import { MagneticButton } from './MagneticButton';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from 'next-themes';

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
  theme: themeProp = 'dark',
}) => {
  const { theme, setTheme } = useTheme();
  const currentTheme = theme || themeProp;
  
  const bgColor = currentTheme === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(17, 25, 40, 0.75)';
  const borderColor = currentTheme === 'light' ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255, 255, 255, 0.125)';
  const textColor = currentTheme === 'light' ? '#1f2937' : '#ffffff';
  const textHoverColor = currentTheme === 'light' ? '#111827' : '#ffffff';
  const textOpacity = currentTheme === 'light' ? 0.7 : 0.8;

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
          <a href="#home" className="block">
            <Image
              src="/favicon.png"
              alt="Logo"
              width={40}
              height={40}
              className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 hover:scale-110"
              priority
            />
          </a>
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
                color: `rgba(${currentTheme === 'light' ? '31, 41, 55' : '255, 255, 255'}, ${textOpacity})`,
                transition: 'color 0.5s ease-in-out',
              }}
            >
              {link.label}
              <span className="nav-link-underline absolute bottom-[-4px] left-0 h-[2px] w-0 bg-gradient-to-r from-[#667eea] to-[#764ba2] transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Right side: Theme Toggle + CTA Button */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg transition-all duration-300"
            style={{
              backgroundColor: currentTheme === 'light' ? 'rgba(102, 126, 234, 0.1)' : 'rgba(255, 255, 255, 0.1)',
              color: textColor,
            }}
            aria-label="Toggle theme"
          >
            {currentTheme === 'dark' ? (
              <FiSun className="w-5 h-5" />
            ) : (
              <FiMoon className="w-5 h-5" />
            )}
          </button>

          {/* CTA Button */}
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
