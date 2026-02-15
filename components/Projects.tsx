import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight, FiExternalLink } from 'react-icons/fi';
import portfolioData from '../data/portfolio.json';

const Projects = () => {
  const { theme } = useTheme();
  const projects = portfolioData.projects;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return prevIndex === projects.length - 1 ? 0 : prevIndex + 1;
      } else {
        return prevIndex === 0 ? projects.length - 1 : prevIndex - 1;
      }
    });
  };

  const currentProject = projects[currentIndex];

  return (
    <section
      id="projects"
      className={`relative py-20 transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-purple-950 via-gray-900 to-indigo-950'
          : 'bg-gray-50'
      }`}
    >
      {/* Simplified background */}
      <div className={`absolute inset-0 opacity-40 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20'
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      }`} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            My Projects
          </h2>

          {/* Main Slider Container */}
          <div className="relative">
            {/* Project Slider */}
            <div className="relative h-[600px] md:h-[500px] overflow-hidden rounded-2xl">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  className={`absolute w-full h-full rounded-2xl overflow-hidden ${
                    theme === 'dark'
                      ? 'bg-gray-800/60'
                      : 'bg-white/60'
                  } backdrop-blur-sm border ${
                    theme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <div className="grid md:grid-cols-2 h-full">
                    {/* Project Image */}
                    <div className="relative h-64 md:h-full">
                      <Image
                        src={currentProject.image}
                        alt={currentProject.title}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>

                    {/* Project Details */}
                    <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
                      <div>
                        <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-800'
                        }`}>
                          {currentProject.title}
                        </h3>

                        <p className={`mb-6 text-sm md:text-base leading-relaxed ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {currentProject.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {currentProject.tags.slice(0, 6).map((tag) => (
                            <span
                              key={tag}
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                theme === 'dark'
                                  ? 'bg-blue-900/50 text-blue-200'
                                  : 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                          {currentProject.tags.length > 6 && (
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              theme === 'dark'
                                ? 'bg-gray-700 text-gray-300'
                                : 'bg-gray-200 text-gray-700'
                            }`}>
                              +{currentProject.tags.length - 6} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* View Project Button */}
                      <a
                        href={currentProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                          theme === 'dark'
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50'
                            : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-blue-400/50'
                        }`}
                      >
                        View Project
                        <FiExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none z-10">
              <button
                onClick={() => paginate(-1)}
                className={`pointer-events-auto w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-800/80 hover:bg-gray-700 text-white'
                    : 'bg-white/80 hover:bg-white text-gray-800'
                } backdrop-blur-sm border ${
                  theme === 'dark' ? 'border-white/10' : 'border-gray-200'
                } hover:scale-110 shadow-lg`}
                aria-label="Previous project"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => paginate(1)}
                className={`pointer-events-auto w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-800/80 hover:bg-gray-700 text-white'
                    : 'bg-white/80 hover:bg-white text-gray-800'
                } backdrop-blur-sm border ${
                  theme === 'dark' ? 'border-white/10' : 'border-gray-200'
                } hover:scale-110 shadow-lg`}
                aria-label="Next project"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-500'
                      : theme === 'dark'
                      ? 'bg-gray-600 hover:bg-gray-500'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            {/* Project Counter */}
            <div className={`text-center mt-4 text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {currentIndex + 1} / {projects.length}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
