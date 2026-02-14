'use client';

import React, { useEffect, useState } from 'react';
import { HeroSection } from '@/components/hero/HeroSection';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from 'next-themes';

export default function HeroDemoPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Enable smooth scrolling for the entire page
  useSmoothScroll({
    duration: 1.2,
    smoothWheel: true,
    smoothTouch: false,
  });

  // Sample data for the hero section
  const heroData = {
    backgroundImage: '/wallpapers/universal-wallpaper.jpg',
    subjectImage: '/images/toji_2.png',
    heroText: 'SHUBHAM',
    tagline: 'Full-Stack Developer & Creative Technologist',
    description: 'Crafting seamless digital experiences with modern web technologies. Specializing in React, Next.js, and innovative UI/UX design.',
    projects: [
      {
        id: '1',
        title: 'E-Commerce Platform',
        description: 'Modern shopping experience',
        thumbnail: '/r13.png',
        url: '#',
        tags: ['React', 'Next.js'],
        featured: true,
      },
      {
        id: '2',
        title: 'Portfolio Website',
        description: 'Creative showcase',
        thumbnail: '/r21.png',
        url: '#',
        tags: ['TypeScript', 'GSAP'],
        featured: true,
      },
      {
        id: '3',
        title: 'Dashboard App',
        description: 'Data visualization',
        thumbnail: '/r31.png',
        url: '#',
        tags: ['React', 'D3.js'],
        featured: false,
      },
    ],
    navLinks: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Projects', href: '#projects' },
      { label: 'Contact', href: '#contact' },
    ],
    logo: 'SK',
    ctaButton: {
      label: 'Hire Me',
      href: '#contact',
    },
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
      <ThemeToggle />
      
      {/* Theme indicator for testing */}
      <div className="fixed top-20 right-4 px-4 py-2 bg-black/50 text-white rounded-lg text-sm" style={{ zIndex: 9999 }}>
        Current theme: {theme}
      </div>
      
      <HeroSection {...heroData} theme={theme} />
      
      {/* Placeholder sections for scrolling */}
      <section id="about" className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
        <h2 className={`text-4xl ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>About Section</h2>
      </section>
      
      <section id="projects" className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
        <h2 className={`text-4xl ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Projects Section</h2>
      </section>
      
      <section id="contact" className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
        <h2 className={`text-4xl ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Contact Section</h2>
      </section>
    </div>
  );
}
