'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import Navigation from '../components/Navigation';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
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

// Enhanced Typewriter Effect
const TypewriterHero = ({ text, speed = 120 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      const cursorTimer = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 530);
      return () => clearInterval(cursorTimer);
    }
  }, [currentIndex, text, speed]);

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: showCursor ? 1 : 0 }}
        transition={{ duration: 0.1 }}
        className="text-blue-500"
      >
        |
      </motion.span>
    </span>
  );
};

// Optimized Floating Particles - Reduced count and removed backdrop-blur
const FloatingParticles = ({ theme }) => {
  const particles = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 3,
      duration: Math.random() * 25 + 15,
      delay: Math.random() * 5,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-blue-400/20 to-purple-400/20'
              : 'bg-gradient-to-br from-white/50 to-blue-200/40'
          }`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, -150, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Stunning CTA Button with Glass Effect
const CTAButton = ({ href, children, theme, variant = 'primary' }) => (
  <motion.a
    href={href}
    whileHover={{
      scale: 1.05,
      boxShadow: theme === 'dark'
        ? "0 25px 50px rgba(59, 130, 246, 0.6)"
        : "0 25px 50px rgba(37, 99, 235, 0.4)"
    }}
    whileTap={{ scale: 0.98 }}
    className={`relative overflow-hidden px-10 py-5 rounded-2xl text-lg font-semibold transition-all duration-300 backdrop-blur-md group ${
      variant === 'primary'
        ? `text-white shadow-2xl ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-blue-500/80 via-purple-600/80 to-pink-600/80 border border-white/20'
              : 'bg-gradient-to-r from-blue-600/90 via-purple-700/90 to-pink-700/90 border border-white/30'
          }`
        : `${
            theme === 'dark'
              ? 'border-2 border-white/30 text-white hover:bg-white/10'
              : 'border-2 border-gray-800/30 text-gray-800 hover:bg-gray-800/10'
          } backdrop-blur-lg`
    }`}
  >
    {/* Animated background waves */}
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

    {/* Shimmer effect */}
    <motion.div
      animate={{ x: [-100, 200] }}
      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 opacity-0 group-hover:opacity-100"
    />

    {/* Button content */}
    <span className="relative z-10 flex items-center gap-3">
      {children}
      <motion.span
        animate={{ x: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-xl"
      >
        →
      </motion.span>
    </span>
  </motion.a>
);

// Optimized Magical Orbs - Reduced blur and simplified animations
const MagicalOrbs = ({ theme }) => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    {/* Large central orb */}
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        x: [0, 50, 0],
        y: [0, -40, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{ willChange: 'transform' }}
      className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full filter blur-2xl ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-blue-500/20 via-cyan-400/15 to-purple-500/20'
          : 'bg-gradient-to-br from-blue-300/30 via-cyan-300/25 to-purple-300/30'
      }`}
    />

    {/* Secondary orb */}
    <motion.div
      animate={{
        scale: [1.1, 1, 1.1],
        x: [0, -60, 0],
        y: [0, 50, 0],
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{ willChange: 'transform' }}
      className={`absolute top-1/3 right-1/4 w-80 h-80 rounded-full filter blur-2xl ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-purple-500/20 via-pink-400/15 to-red-500/20'
          : 'bg-gradient-to-br from-purple-300/30 via-pink-300/25 to-red-300/30'
      }`}
    />
  </div>
);

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showHero, setShowHero] = useState(false);
  const currentTheme = resolvedTheme || theme;

  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);
  const translateX = useTransform(mouseX, [-0.5, 0.5], [-50, 50]);
  const translateY = useTransform(mouseY, [-0.5, 0.5], [-30, 30]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let rafId;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (event) => {
      const x = (event.clientX - window.innerWidth / 2) / window.innerWidth;
      const y = (event.clientY - window.innerHeight / 2) / window.innerHeight;

      // Throttle updates using requestAnimationFrame
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        // Only update if movement is significant
        if (Math.abs(x - lastX) > 0.01 || Math.abs(y - lastY) > 0.01) {
          mouseX.set(x);
          mouseY.set(y);
          lastX = x;
          lastY = y;
        }
        rafId = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY]);

//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = ['home', 'about', 'projects', 'contact'];
//       const threshold = window.innerHeight * 0.3;

//       for (const section of sections) {
//         const element = document.getElementById(section);
//         if (element) {
//           const rect = element.getBoundingClientRect();
//           if (rect.top <= threshold && rect.bottom >= threshold) {
//             setActiveSection(section);
//             break;
//           }
//         }
//       }
//     };



//     let ticking = false;
//     const scrollListener = () => {
//       if (!ticking) {
//         window.requestAnimationFrame(() => {
//           handleScroll();
//           ticking = false;
//         });
//         ticking = true;
//       }
//     };

//     window.addEventListener('scroll', scrollListener);
//     handleScroll();

//     const timer = setTimeout(() => {
//       setIsLoading(false);
//       setTimeout(() => setShowHero(true), 500);
//     }, 2500);

//     return () => {
//       window.removeEventListener('scroll', scrollListener);
//       clearTimeout(timer);
//     };
//   }, []);

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
    setTimeout(() => setShowHero(true), 500);
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
        {/* Single Universal Background - Removed 3D transforms for better performance */}
        <div className="fixed inset-0 z-[-2] bg-universal" />

        {/* Theme-based overlay for different moods */}
        <div className={`fixed inset-0 z-[-1] transition-all duration-700 ${
          currentTheme === 'dark'
            ? 'bg-gray-900/30'
            : 'bg-white/20'
        }`} />

        <AnimatePresence>
          {isLoading && <LoadingScreen theme={currentTheme} />}
        </AnimatePresence>

        <Navigation activeSection={activeSection} />
        {/* <ThemeToggle /> */}

        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            {/* HERO SECTION */}
            <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 sm:pt-24 md:pt-20">

              {/* Simplified overlay - removed backdrop-blur for performance */}
              <div className={`absolute inset-0 z-0 transition-all duration-700 ${
                currentTheme === 'dark'
                  ? 'bg-gradient-to-br from-gray-900/60 via-gray-800/40 to-gray-900/60'
                  : 'bg-gradient-to-br from-white/50 via-gray-50/30 to-white/50'
              }`} />

              {/* Magical animated orbs */}
              <MagicalOrbs theme={currentTheme} />

              {/* Floating particles */}
              <FloatingParticles theme={currentTheme} />

              {/* Animated mesh gradient */}
              <div className="absolute inset-0 z-1">
                <div className={`absolute inset-0 animate-gradient-shift transition-opacity duration-700 ${
                  currentTheme === 'dark'
                    ? 'bg-gradient-to-r from-blue-600/20 via-purple-600/30 to-pink-600/20 opacity-40'
                    : 'bg-gradient-to-r from-blue-400/30 via-purple-400/40 to-pink-400/30 opacity-30'
                }`} />
              </div>

              {/* Grid pattern overlay */}
              <div className="absolute inset-0 z-1">
                <div
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    currentTheme === 'dark' ? 'opacity-5' : 'opacity-8'
                  }`}
                  style={{
                    backgroundImage: `
                      radial-gradient(circle, ${currentTheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 2px, transparent 2px)
                    `,
                    backgroundSize: '60px 60px',
                  }}
                />
              </div>

              {/* MAIN HERO CONTENT */}
              <div className="container mx-auto px-6 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 80 }}
                  animate={{ opacity: showHero ? 1 : 0, y: showHero ? 0 : 80 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="text-center"
                >
                  {/* Main heading with spectacular typography */}
                  <motion.h1
                    className={`text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight transition-all duration-700 ${
                      currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                    style={{
                      textShadow: currentTheme === 'dark'
                        ? '0 0 40px rgba(59, 130, 246, 0.5)'
                        : '0 4px 20px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <motion.span
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="block"
                    >
                      Hi, I'm
                    </motion.span>
                    <motion.span
                      className="block bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-shift"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8, duration: 1.2, type: "spring" }}
                    >
                      <TypewriterHero text={portfolioData.personal.name} />
                    </motion.span>
                  </motion.h1>

                  {/* Enhanced subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className={`text-xl md:text-3xl mb-12 max-w-5xl mx-auto leading-relaxed font-light transition-colors duration-700 ${
                      currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {portfolioData.personal.subtitle.split('seamless digital experiences')[0]}
                    <motion.span
                      className="font-semibold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                      whileHover={{ scale: 1.05 }}
                    >
                      seamless digital experiences
                    </motion.span>
                    {portfolioData.personal.subtitle.split('seamless digital experiences')[1]}
                  </motion.p>

                  {/* Call-to-action buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                  >
                    <CTAButton href="#projects" theme={currentTheme}>
                      ✨ View My Work
                    </CTAButton>

                    <CTAButton href="#contact" theme={currentTheme} variant="secondary">
                      💬 Get In Touch
                    </CTAButton>
                  </motion.div>
                </motion.div>
              </div>
            </section>

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
