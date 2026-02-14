'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import Navigation from '../components/Navigation';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import { HeroSection } from '../components/hero/HeroSection';
//import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from 'next-themes';
import portfolioData from '../data/portfolio.json';

// Animated Loading Screen Component
const LoadingScreen = ({ theme }) => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.2 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-universal"
  >
    {/* Glassmorphism overlay */}
    <div className={`absolute inset-0 backdrop-blur-md ${
      theme === 'dark'
        ? 'bg-gray-900/80'
        : 'bg-white/70'
    }`} />

    <div className="text-center relative z-10">
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative w-20 h-20 mx-auto mb-6"
      >
        <div className={`absolute inset-0 rounded-full border-4 ${
          theme === 'dark'
            ? 'border-blue-400'
            : 'border-blue-600'
        } border-t-transparent animate-spin`} />
        <div className={`absolute inset-2 rounded-full ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20'
            : 'bg-gradient-to-br from-blue-300/30 to-purple-300/30'
        } blur-xl animate-pulse`} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className={`text-3xl font-bold mb-3 ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}
      >
        Welcome to My Portfolio
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className={`text-lg ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}
      >
        Crafting Digital Experiences
      </motion.p>
    </div>
  </motion.div>
);

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
    const sections = ['home', 'about', 'projects', 'contact'];
    const threshold = window.innerHeight * 0.3;
    
    const handleScroll = () => {
      let currentActiveSection = 'home';

      // Check sections in reverse order (bottom to top)
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= threshold) {
            currentActiveSection = section;
            break;
          }
        }
      }

      // Special handling for contact section when near bottom of page
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (windowHeight + window.scrollY >= documentHeight - 50) {
        currentActiveSection = 'contact';
      }

      setActiveSection(currentActiveSection);
    };

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

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', scrollListener, { passive: true });
    handleScroll();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      window.removeEventListener('scroll', scrollListener);
      clearTimeout(timer);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <style jsx global>{`
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        @keyframes subtle-zoom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        .bg-universal {
          background-image: url(/wallpapers/universal-wallpaper.jpg);
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          background-repeat: no-repeat;
          animation: subtle-zoom 30s ease-in-out infinite;
        }

        .animate-float-gentle {
          animation: float-gentle 8s ease-in-out infinite;
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 6s ease-in-out infinite;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: ${currentTheme === 'dark' ? 'rgba(17, 24, 39, 0.8)' : 'rgba(243, 244, 246, 0.8)'};
        }

        ::-webkit-scrollbar-thumb {
          background: ${currentTheme === 'dark'
            ? 'linear-gradient(45deg, #3B82F6, #8B5CF6)'
            : 'linear-gradient(45deg, #2563EB, #7C3AED)'};
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${currentTheme === 'dark'
            ? 'linear-gradient(45deg, #2563EB, #7C3AED)'
            : 'linear-gradient(45deg, #1D4ED8, #6D28D9)'};
        }

        /* Optimized glass effect - reduced blur */
        .glass-effect {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        body {
          overflow-x: hidden;
        }
      `}</style>

      <main className="min-h-screen relative overflow-hidden">
        <AnimatePresence>
          {isLoading && <LoadingScreen theme={currentTheme} />}
        </AnimatePresence>

        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            {/* CINEMATIC 3D HERO SECTION */}
            <div id="home">
              <HeroSection
                backgroundImage="/hero/background/hero-bg.jpg"
                subjectImage="/hero/subject/hero-subject.png"
                heroText="SHUBHAM"
                tagline={portfolioData.personal.title}
                description={portfolioData.personal.subtitle}
                projects={portfolioData.projects}
                navLinks={[
                  { label: 'About', href: '#about' },
                  { label: 'Projects', href: '#projects' },
                  { label: 'Contact', href: '#contact' },
                ]}
                logo={portfolioData.personal.name}
                ctaButton={{
                  label: 'Hire Me',
                  href: '#contact',
                }}
                theme={currentTheme}
              />
            </div>

            {/* Other sections with consistent glassmorphism theming */}
            <div className={`relative transition-all duration-700 ${
              currentTheme === 'dark'
                ? 'bg-gradient-to-b from-gray-900/80 to-gray-800/80'
                : 'bg-gradient-to-b from-white/80 to-gray-50/80'
            } backdrop-blur-sm`}>
              <About />
              <Projects />
              <Contact />
            </div>
          </motion.div>
        )}
      </main>
    </>
  );
}
