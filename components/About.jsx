'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import gsap from 'gsap';
import {
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiReact,
  SiBootstrap,
  SiSpring,
  SiSpringboot,
  SiAndroidstudio,
  SiEclipseide,
  SiGit,
  SiAndroid,
  SiNumpy,
  SiPandas,
  SiTensorflow,
  SiOpencv
} from 'react-icons/si';
import {
  FaJava,
  FaPython,
  FaCode,
  FaTools,
  FaMobile,
  FaDatabase,
  FaChartLine
} from 'react-icons/fa';
import {
  DiVisualstudio,
  DiIntellij
} from 'react-icons/di';
import {
  BiCodeAlt,
  BiMobileAlt
} from 'react-icons/bi';
import portfolioData from '../data/portfolio.json';
import '../styles/about.css';

// Magnetic Skill Card Component
const SkillCard = ({ skill, mounted, currentTheme }) => {
  const cardRef = useRef(null);
  const Icon = skill.icon;

  useEffect(() => {
    const magneticRadius = 80;
    const magneticStrength = 0.25;

    const handleMouseMove = (e) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const cardCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      const distance = Math.sqrt(
        Math.pow(e.clientX - cardCenter.x, 2) +
        Math.pow(e.clientY - cardCenter.y, 2)
      );

      if (distance < magneticRadius) {
        const angle = Math.atan2(
          e.clientY - cardCenter.y,
          e.clientX - cardCenter.x
        );

        const offsetDistance = (magneticRadius - distance) * magneticStrength;

        const offset = {
          x: Math.cos(angle) * offsetDistance,
          y: Math.sin(angle) * offsetDistance,
        };

        gsap.to(cardRef.current, {
          x: offset.x,
          y: offset.y,
          duration: 0.4,
          ease: 'power2.out',
        });
      } else {
        gsap.to(cardRef.current, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = () => {
      if (cardRef.current) {
        gsap.to(cardRef.current, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-xl p-4 cursor-pointer transition-all duration-200 ${
        mounted && currentTheme === 'dark'
          ? 'bg-gray-800/40 hover:bg-gray-800/60'
          : 'bg-white/60 hover:bg-white/80'
      } backdrop-blur-sm border ${
        mounted && currentTheme === 'dark'
          ? 'border-white/10 hover:border-white/20'
          : 'border-gray-200 hover:border-gray-300'
      } shadow-md hover:shadow-lg`}
      style={{ 
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)'
      }}
    >
      <div className="flex flex-col items-center space-y-3">
        {/* Icon container */}
        <div className={`p-3 rounded-lg ${
          mounted && currentTheme === 'dark' 
            ? 'bg-gray-700/50' 
            : 'bg-white/70'
        } shadow-md transition-transform duration-200 group-hover:scale-110`}>
          <Icon
            className="w-8 h-8"
            style={{ color: skill.color }}
          />
        </div>

        {/* Skill name */}
        <span className={`text-sm font-semibold text-center ${
          mounted && currentTheme === 'dark' 
            ? 'text-gray-200' 
            : 'text-gray-800'
        }`}>
          {skill.name}
        </span>
      </div>
    </div>
  );
};

const About = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const currentTheme = resolvedTheme || theme;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Icon mapping object
  const iconMap = useMemo(() => ({
    FaJava, FaPython, FaCode, FaTools, FaMobile, FaDatabase, FaChartLine,
    SiJavascript, SiHtml5, SiCss3, SiReact, SiBootstrap, SiSpring, SiSpringboot,
    SiAndroidstudio, SiEclipseide, SiGit, SiAndroid, SiNumpy, SiPandas,
    SiTensorflow, SiOpencv, DiVisualstudio, DiIntellij, BiCodeAlt, BiMobileAlt
  }), []);

  // Memoized skill categories from JSON data
  const skillCategories = useMemo(() => 
    portfolioData.skills.map(category => ({
      name: category.category,
      skills: category.items.map(skill => ({
        name: skill.name,
        icon: iconMap[skill.icon],
        color: skill.color
      }))
    })), [iconMap]);

  // Theme classes
  const themeClass = mounted
    ? currentTheme === 'dark'
      ? 'bg-gray-900 text-white'
      : 'bg-gray-50 text-gray-800'
    : 'bg-gray-50 text-gray-800';

  // Simplified animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`py-24 transition-colors duration-300 relative overflow-hidden ${themeClass}`}
      aria-label="About me and my skills"
    >
      {/* Simplified static background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute inset-0 ${
          mounted && currentTheme === 'dark'
            ? 'bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-pink-900/10'
            : 'bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50'
        }`} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          {/* Profile Section */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
            {/* Simplified Profile Picture */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="relative w-64 h-64 lg:w-72 lg:h-72 flex-shrink-0"
            >
              {/* Single static gradient ring */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-20 blur-2xl" />

              {/* Main image container */}
              <div className={`relative w-full h-full rounded-full overflow-hidden border-4 ${
                mounted && currentTheme === 'dark'
                  ? 'border-white/10 bg-gray-800/30'
                  : 'border-white/30 bg-white/30'
              } backdrop-blur-sm shadow-2xl`}>
                <Image
                  src={portfolioData.personal.profileImage}
                  alt="Profile Picture"
                  fill
                  className={`object-cover transition-opacity duration-500 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  priority
                />
              </div>

              {/* Static badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
                className={`absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full ${
                  mounted && currentTheme === 'dark'
                    ? 'bg-gray-800/90 border-white/20'
                    : 'bg-white/90 border-gray-200'
                } backdrop-blur-md border shadow-xl`}
              >
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold text-sm">
                  {portfolioData.personal.title}
                </span>
              </motion.div>
            </motion.div>

            {/* About Text */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex-1 space-y-6"
            >
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  About Me
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full" />
              </div>

              <div className="space-y-4">
                {portfolioData.about.description.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className={`text-lg leading-relaxed ${
                      mounted && currentTheme === 'dark' 
                        ? 'text-gray-300' 
                        : 'text-gray-600'
                    }`}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Optimized Skills Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl lg:text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Skills & Technologies
                </span>
              </h3>
              <p className={`text-base ${
                mounted && currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Tools and technologies I work with
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-12"
            >
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.name}
                  variants={itemVariants}
                  className="relative"
                >
                  {/* Category header */}
                  <h4 className={`text-xl font-semibold mb-6 ${
                    mounted && currentTheme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>
                    {category.name}
                  </h4>

                  {/* Skills grid with magnetic effect */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {category.skills.map((skill) => (
                      <SkillCard
                        key={skill.name}
                        skill={skill}
                        mounted={mounted}
                        currentTheme={currentTheme}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
