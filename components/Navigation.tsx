import React, { useState ,useEffect} from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';

interface NavigationProps {
  activeSection: string;
}

const Navigation = ({ activeSection }: NavigationProps) => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Monitor scroll position for navbar styling
  useMotionValueEvent(scrollY, "change", (latest) => {
    setHasScrolled(latest > 50);
  });

  const navItems = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const quotes = [
  "Design is intelligence made visible.",
  "Code is poetry.",
  "Simplicity is the ultimate sophistication.",
  "Creativity takes courage.",
  "Great work begins with great ideas."
];
    const [currentQuote, setCurrentQuote] = useState(0);

    useEffect(() => {
    const interval = setInterval(() => {
        setCurrentQuote(prev => (prev + 1) % quotes.length);
    }, 3500); // Change every 3.5 seconds
    return () => clearInterval(interval);
    }, []);


  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);
      setIsMenuOpen(false);
    }
  };

  const containerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { y: -20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25
      }
    }
  };

  return (
    <>
      {/* Backdrop blur overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-blue-900/5 to-pink-900/5" />
      </div>

      <motion.header
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className={`fixed w-full top-0 z-50 transition-all duration-700 ${
          hasScrolled
            ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/20 shadow-2xl shadow-purple-500/10'
            : 'bg-white/60 dark:bg-transparent backdrop-blur-sm'
        }`}
      >
        {/* Animated gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />

        <nav className="container mx-auto px-6 py-4 relative">
          <div className="flex items-center justify-between">
            {/* Logo with glowing effect */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link href="/" className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-0  transition-opacity duration-500" />
                <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                  <span className="text-2xl font-bold tracking-wider">
                    Portfolio
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className={`relative py-2 font-medium transition-all duration-300 ${
                      activeSection === item.id
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                    style={{
                      color: theme === 'light'
                        ? (activeSection === item.id ? '#111827' : '#374151')
                        : undefined
                    }}
                  >
                    {item.name}
                    {/* Animated underline */}
                    <AnimatePresence>
                      {activeSection === item.id && (
                        <motion.div
                          layoutId="activeUnderline"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-full"
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          exit={{ opacity: 0, scaleX: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                            scaleX: { duration: 0.3 }
                          }}
                        />
                      )}
                    </AnimatePresence>
                  </Link>
                </motion.div>
              ))}

              {/* Theme Toggle */}
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="ml-4 p-3 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-gray-200/50 dark:border-white/20 text-gray-700 dark:text-white hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-300"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ opacity: 0, rotate: -180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    {theme === 'dark' ? (
                      <FiSun className="w-5 h-5" />
                    ) : (
                      <FiMoon className="w-5 h-5" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-gray-200/50 dark:border-white/20 text-gray-700 dark:text-white overflow-hidden group"
                aria-label="Toggle menu"
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMenuOpen ? 'close' : 'open'}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    {isMenuOpen ? (
                      <FiX className="w-6 h-6" />
                    ) : (
                      <FiMenu className="w-6 h-6" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{
                  duration: 0.4,
                  ease: [0.4, 0.0, 0.2, 1]
                }}
                className="md:hidden overflow-hidden mt-6"
              >
                {/* Mobile menu backdrop */}
                <div className="absolute inset-x-4 bg-white/80 dark:bg-white/10 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-white/20 shadow-2xl shadow-purple-500/10" />
                <ul className="relative py-6 px-4 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => handleClick(e, item.href)}
                        className={`relative block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                          activeSection === item.id
                            ? 'bg-gradient-to-r from-purple-500/30 to-blue-500/30'
                            : 'hover:bg-gray-100/50 dark:hover:bg-white/10'
                        }`}
                        style={{
                          color: theme === 'light'
                            ? (activeSection === item.id ? '#111827' : '#374151')
                            : (activeSection === item.id ? '#ffffff' : '#d1d5db')
                        }}
                      >
                        {item.name}
                        {/* Active underline for mobile */}
                        {activeSection === item.id && (
                          <motion.div
                            layoutId="mobileActiveUnderline"
                            className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                      </Link>
                    </motion.li>
                  ))}

                  {/* Mobile Theme Toggle */}
                  <motion.li
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: navItems.length * 0.1,
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  >
                    <button
                      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium bg-gradient-to-r from-purple-500/20 to-blue-500/20 transition-all duration-300"
                      style={{
                        color: theme === 'light' ? '#374151' : '#ffffff'
                      }}
                    >
                      {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                      <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                  </motion.li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Animated border gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </motion.header>
    </>
  );
};

export default Navigation;
