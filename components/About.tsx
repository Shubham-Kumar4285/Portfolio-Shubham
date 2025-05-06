import React, { useEffect, useState } from 'react';
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

const About = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const currentTheme = resolvedTheme || theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use a default theme class that matches the initial server render
  const defaultThemeClass = 'bg-gray-50 text-gray-800';
  const themeClass = mounted
    ? currentTheme === 'dark'
      ? 'bg-gray-900 text-white'
      : 'bg-gray-50 text-gray-800'
    : defaultThemeClass;

  // Prevent any theme-dependent rendering until mounted
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

  const skillCategories = [
    {
      name: 'Programming Languages',
      skills: [
        { name: 'Java', icon: FaJava, color: '#007396' },
        { name: 'Kotlin', icon: FaCode, color: '#7F52FF' },
        { name: 'C/C++', icon: BiCodeAlt, color: '#00599C' },
        { name: 'Python', icon: FaPython, color: '#3776AB' },
        { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      ]
    },
    {
      name: 'Front-End',
      skills: [
        { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
        { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
        { name: 'React', icon: SiReact, color: '#61DAFB' },
        { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3' },
      ]
    },
    {
      name: 'Back-End',
      skills: [
        { name: 'Spring', icon: SiSpring, color: '#6DB33F' },
        { name: 'Spring Boot', icon: SiSpringboot, color: '#6DB33F' },
      ]
    },
    {
      name: 'Development Tools',
      skills: [
        { name: 'Android Studio', icon: SiAndroidstudio, color: '#3DDC84' },
        { name: 'Eclipse', icon: SiEclipseide, color: '#2C2255' },
        { name: 'Visual Studio', icon: DiVisualstudio, color: '#5C2D91' },
        { name: 'IntelliJ IDEA', icon: DiIntellij, color: '#000000' },
        { name: 'Git', icon: SiGit, color: '#F05032' },
      ]
    },
    {
      name: 'Android Development',
      skills: [
        { name: 'Android SDK', icon: SiAndroid, color: '#3DDC84' },
        { name: 'Jetpack Compose', icon: BiMobileAlt, color: '#4285F4' },
        { name: 'XML', icon: SiAndroid, color: '#3DDC84' },
        { name: 'Retrofit', icon: FaMobile, color: '#3DDC84' },
        { name: 'React Native', icon: SiReact, color: '#61DAFB' },
      ]
    },
    {
      name: 'Data Science',
      skills: [
        { name: 'NumPy', icon: SiNumpy, color: '#013243' },
        { name: 'Pandas', icon: SiPandas, color: '#150458' },
        { name: 'Matplotlib', icon: FaChartLine, color: '#11557C' },
        { name: 'Machine Learning', icon: SiTensorflow, color: '#FF6F00' },
        { name: 'Computer Vision', icon: SiOpencv, color: '#5C3EE8' },
      ]
    }
  ];

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
    <section id="about" className={`py-20 transition-colors duration-300 ${themeClass}`}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
            {/* Profile Picture */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative w-48 h-48 md:w-64 md:h-64"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-20 blur-xl" />
              <div className={`relative w-full h-full rounded-full overflow-hidden border-2 ${
                mounted && currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <Image
                  src="/profile.png"
                  alt="Profile Picture"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>

            {/* About Text */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className={`flex-1 ${
                mounted && currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
                mounted && currentTheme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>About Me</h2>
              <p className={`mb-4 ${
                mounted && currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                I'm a passionate Full Stack Developer with a keen eye for creating elegant solutions.
                My journey in development started with curiosity and has evolved into a professional
                pursuit of crafting exceptional digital experiences.
              </p>
              <p className={mounted && currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                When I'm not coding, you can find me exploring new technologies, contributing to open-source
                projects, or sharing my knowledge through technical writing.
              </p>
            </motion.div>
          </div>

          <div>
            <h3 className={`text-2xl font-bold mb-12 text-center ${
              mounted && currentTheme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>Skills & Technologies</h3>
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
                    className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                  >
                    {category.skills.map((skill, index) => {
                      const Icon = skill.icon;
                      return (
                        <motion.div
                          key={skill.name}
                          variants={itemVariants}
                          className={`group relative overflow-hidden rounded-lg p-3 ${
                            mounted && currentTheme === 'dark'
                              ? 'bg-gray-800/30 hover:bg-gray-800/50'
                              : 'bg-white/50 hover:bg-white/80'
                          } border border-gray-200/10 hover:border-gray-300/20 transition-all duration-300`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative flex flex-col items-center space-y-2">
                            <div className={`p-2 rounded-md ${
                              mounted && currentTheme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-100/50'
                            }`}>
                              <Icon
                                className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
                                style={{ color: skill.color }}
                              />
                            </div>
                            <span className={`text-sm font-medium ${
                              mounted && currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
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
  );
};

export default About;
