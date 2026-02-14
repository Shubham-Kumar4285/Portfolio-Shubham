'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import gsap from 'gsap';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isClickDisabled, setIsClickDisabled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Magnetic effect
  useEffect(() => {
    if (!mounted) return;

    const magneticRadius = 80;
    const magneticStrength = 0.3;

    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current || isClickDisabled) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const buttonCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      const distance = Math.sqrt(
        Math.pow(e.clientX - buttonCenter.x, 2) +
        Math.pow(e.clientY - buttonCenter.y, 2)
      );

      if (distance < magneticRadius) {
        const angle = Math.atan2(
          e.clientY - buttonCenter.y,
          e.clientX - buttonCenter.x
        );

        const offsetDistance = (magneticRadius - distance) * magneticStrength;

        const offset = {
          x: Math.cos(angle) * offsetDistance,
          y: Math.sin(angle) * offsetDistance,
        };

        gsap.to(buttonRef.current, {
          x: offset.x,
          y: offset.y,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(buttonRef.current, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mounted, isClickDisabled]);

  const handleClick = () => {
    if (!buttonRef.current) return;

    setIsClickDisabled(true);

    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.2,
      ease: 'power2.out',
    });

    setTimeout(() => {
      setIsClickDisabled(false);
    }, 400);

    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return null;
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className="fixed top-4 right-4 p-3 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 shadow-lg border border-gray-200 dark:border-gray-700"
      style={{ 
        zIndex: 9999,
        willChange: 'transform'
      }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? (
          <FiSun className="w-6 h-6" />
        ) : (
          <FiMoon className="w-6 h-6" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle; 