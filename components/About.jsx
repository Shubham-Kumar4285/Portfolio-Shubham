import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from 'next-themes';
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

// Typewriter Effect Component
const TypewriterText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, 50 + delay);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay]);

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="ml-1"
      >
        |
      </motion.span>
    </span>
  );
};

// Optimized Floating Elements - Reduced count
const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Floating geometric shapes - reduced from 6 to 3 */}
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-4 h-4 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-sm"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 10 + i * 2,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          left: `${10 + i * 30}%`,
          top: `${20 + i * 20}%`,
          willChange: 'transform',
        }}
      />
    ))}
  </div>
);

const About = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const currentTheme = resolvedTheme || theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Icon mapping object
  const iconMap = {
    FaJava, FaPython, FaCode, FaTools, FaMobile, FaDatabase, FaChartLine,
    SiJavascript, SiHtml5, SiCss3, SiReact, SiBootstrap, SiSpring, SiSpringboot,
    SiAndroidstudio, SiEclipseide, SiGit, SiAndroid, SiNumpy, SiPandas,
    SiTensorflow, SiOpencv, DiVisualstudio, DiIntellij, BiCodeAlt, BiMobileAlt
  };

  // Memoized skill categories from JSON data
  const skillCategories = useMemo(() => 
    portfolioData.skills.map(category => ({
      name: category.category,
      skills: category.items.map(skill => ({
        name: skill.name,
        icon: iconMap[skill.icon],
        color: skill.color
      }))
    })), []);

  // Theme classes
  const defaultThemeClass = 'bg-gray-50 text-gray-800';
  const themeClass = mounted
    ? currentTheme === 'dark'
      ? 'bg-gray-900 text-white'
      : 'bg-gray-50 text-gray-800'
    : defaultThemeClass;

  // Prevent theme-dependent rendering until mounted
  if (!mounted) {
    return (
      <section className={`py-20 transition-colors duration-300 ${defaultThemeClass}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-20 blur-xl" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-gray-200">
                  <Image
                    src="/profile.png"
                    alt="Profile Picture"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="flex-1 text-gray-600">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">About Me</h2>
                <p className="mb-4 text-gray-500">
                  I'm a passionate Full Stack Developer with a keen eye for creating elegant solutions.
                  My journey in web development started with curiosity and has evolved into a professional
                  pursuit of crafting exceptional digital experiences.
                </p>
                <p className="text-gray-500">
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source
                  projects, or sharing my knowledge through technical writing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-10deg); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>

      <section
        id="about"
        className={`py-20 transition-colors duration-300 relative ${themeClass}`}
        style={{ perspective: '1000px' }}
        aria-label="About me and my skills"
      >
        {/* Background gradient mesh */}
        <div className={`absolute inset-0 opacity-50 ${
          mounted && currentTheme === 'dark'
            ? 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20'
            : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
        }`} />

        {/* Animated background shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full filter blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full filter blur-xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
              {/* Enhanced Profile Picture */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative w-48 h-48 md:w-64 md:h-64"
              >
                {/* Multiple gradient rings - optimized */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-full opacity-30 blur-xl animate-pulse" />
                <div className="absolute inset-2 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-full opacity-20 blur-lg" style={{ animation: 'spin-slow 8s linear infinite' }} />

                {/* Floating orbs - optimized */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm" style={{ animation: 'float 3s ease-in-out infinite' }} />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-sm" style={{ animation: 'float-delayed 4s ease-in-out infinite' }} />

                {/* Main image container with glass effect */}
                <div className={`relative w-full h-full rounded-full overflow-hidden border-2 backdrop-blur-sm ${
                  mounted && currentTheme === 'dark'
                    ? 'border-white/20 bg-white/5'
                    : 'border-white/40 bg-white/20'
                } shadow-2xl shadow-purple-500/25`}>
                  <Image
                    src={portfolioData.personal.profileImage}
                    alt="Profile Picture"
                    fill
                    className={`object-cover hover:scale-110 transition-all duration-700 ease-out ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    priority
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10" />
                </div>
              </motion.div>

              {/* Enhanced About Text */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className={`flex-1 ${
                  mounted && currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  <TypewriterText text="About Me" delay={500} />
                </h2>
                {portfolioData.about.description.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + (index * 0.2) }}
                    className={`mb-4 ${
                      mounted && currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </motion.div>
            </div>

            {/* Enhanced Skills Section */}
            <div>
              <motion.div className="relative mb-16">
                <FloatingElements />
                <motion.h3
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-3xl md:text-4xl font-bold text-center relative z-10"
                >
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Skills & Technologies
                  </span>

                  {/* Underline animation */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                  />
                </motion.h3>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-16"
              >
                {skillCategories.map((category, categoryIndex) => (
                  <motion.div
                    key={category.name}
                    variants={itemVariants}
                    className="relative"
                  >
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full opacity-50" />
                    <h4 className={`text-xl font-semibold mb-8 pl-4 ${
                      mounted && currentTheme === 'dark' ? 'text-white' : 'text-gray-800'
                    }`}>
                      {category.name}
                    </h4>
                    <motion.div
                      variants={containerVariants}
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                    >
                      {category.skills.map((skill, index) => {
                        const Icon = skill.icon;
                        return (
                          <motion.div
                            key={skill.name}
                            variants={itemVariants}
                            whileHover={{
                              scale: 1.05,
                              rotateY: 10,
                              z: 50
                            }}
                            whileTap={{ scale: 0.95 }}
                            className={`group relative overflow-hidden rounded-xl p-4 cursor-pointer transform-gpu ${
                              mounted && currentTheme === 'dark'
                                ? 'bg-gradient-to-br from-gray-800/40 to-gray-900/60'
                                : 'bg-gradient-to-br from-white/60 to-gray-100/40'
                            } backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-purple-500/25`}
                            style={{
                              transformStyle: 'preserve-3d',
                            }}
                          >
                            {/* Animated background gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-600/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Glowing edge effect */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                            {/* Floating particles */}
                            <div className="absolute top-2 right-2 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-0 group-hover:opacity-100" />
                            <div className="absolute bottom-3 left-3 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-0 group-hover:opacity-100" style={{ animationDelay: '200ms' }} />

                            <div className="relative flex flex-col items-center space-y-3 transform-gpu">
                              {/* Icon container with 3D effect */}
                              <motion.div
                                className={`p-3 rounded-lg ${
                                  mounted && currentTheme === 'dark' ? 'bg-gray-700/50' : 'bg-white/50'
                                } backdrop-blur-sm shadow-lg group-hover:shadow-xl transition-all duration-300`}
                                whileHover={{ rotateX: 15, rotateY: 15 }}
                              >
                                <Icon
                                  className="w-8 h-8 transition-all duration-300 group-hover:scale-125 drop-shadow-lg"
                                  style={{
                                    color: skill.color,
                                    filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))'
                                  }}
                                />
                              </motion.div>

                              {/* Skill name with glow effect */}
                              <span className={`text-sm font-semibold ${
                                mounted && currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                              } group-hover:text-white transition-colors duration-300 drop-shadow-sm text-center`}>
                                {skill.name}
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
