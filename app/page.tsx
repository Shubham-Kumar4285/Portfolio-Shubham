'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from 'next-themes';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const currentTheme = resolvedTheme || theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const headerOffset = 80;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionTop = rect.top;
          const sectionBottom = rect.bottom;
          const viewportHeight = window.innerHeight;
          const threshold = viewportHeight * 0.3; // 30% of viewport height

          if (sectionTop <= threshold && sectionBottom >= threshold) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Add scroll event listener with throttling
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener);
    handleScroll(); // Initial check

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => {
      window.removeEventListener('scroll', scrollListener);
      clearTimeout(timer);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className={`min-h-screen transition-colors duration-300 ${
      currentTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <Navigation activeSection={activeSection} />
      <ThemeToggle />

      {!isLoading && (
        <div>
          {/* Hero Section */}
          <section id="home" className="h-screen flex items-center justify-center relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
              <div className="text-center">
                <h1 className={`text-5xl md:text-7xl font-bold mb-6 transition-colors duration-300 ${
                  currentTheme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                  Hi, I'm <span className={currentTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>Shubham Kumar</span>
                </h1>

                <p className={`text-xl md:text-2xl mb-8 transition-colors duration-300 ${
                  currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Full Stack Developer crafting seamless web and app experiences — from front-end finesse to back-end brilliance.
                </p>

                <div>
                  <a
                    href="#projects"
                    className={`px-8 py-3 rounded-full text-lg font-medium text-white transition-colors duration-200 shadow-lg hover:shadow-xl ${
                      currentTheme === 'dark'
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    View My Work
                  </a>
                </div>
              </div>
            </div>

            {/* Simplified background elements */}
            <div className="absolute inset-0 z-0 opacity-10">
              <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl ${
                currentTheme === 'dark' ? 'bg-blue-500' : 'bg-blue-400'
              }`} />
              <div className={`absolute top-1/3 right-1/4 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl ${
                currentTheme === 'dark' ? 'bg-purple-500' : 'bg-purple-400'
              }`} />
              <div className={`absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl ${
                currentTheme === 'dark' ? 'bg-pink-500' : 'bg-pink-400'
              }`} />
            </div>
          </section>

          <About />
          <Projects />
          <Contact />
        </div>
      )}
    </main>
  );
}
