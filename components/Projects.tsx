import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import portfolioData from '../data/portfolio.json';

const Projects = () => {
  const { theme } = useTheme();
  const projects = portfolioData.projects;

return (
  <section
    id="projects"
    className={`relative py-20 transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-blue-950'
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-pink-50'
    }`}
  >
    {/* Decorative Gradient Overlay */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-400/10 via-blue-400/10 to-pink-400/10" />
    </div>

    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-12 tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}
        >
          My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-blue-400/30 group ${
                theme === 'dark'
                  ? 'bg-gray-800 hover:bg-gray-750'
                  : 'bg-white hover:bg-blue-50'
              }`}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none z-10 rounded-2xl bg-gradient-to-tr from-purple-400/40 via-blue-400/40 to-pink-400/40" />

              <div className={`relative h-52 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <Image
                  src={project.image}
                  alt="Project"
                  className="absolute inset-0 w-full h-full object-contain rounded-t-2xl"
                  fill
                  style={{ objectFit: 'contain' }}
                />
                <div className="absolute inset-0 rounded-t-2xl bg-blue-500/10" />
              </div>

              <div className="p-6 relative z-20">
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`text-xl font-bold mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {project.title}
                </motion.h3>

                <p
                  className={`mb-4 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <motion.span
                      key={tag}
                      whileHover={{ scale: 1.12 }}
                      className={`px-3 py-1 rounded-full text-sm font-semibold transition-all duration-200 ${
                        theme === 'dark'
                          ? 'bg-blue-900/70 text-blue-100 shadow-blue-900/30'
                          : 'bg-blue-100 text-blue-700 shadow-blue-200'
                      }`}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                <motion.a
                  href={project.link}
                  whileHover={{
                    x: 4,
                    color: theme === 'dark' ? '#86b6f6' : '#2563eb',
                  }}
                  className={`inline-block font-medium transition-colors duration-200 ${
                    theme === 'dark'
                      ? 'text-blue-400 hover:text-blue-300'
                      : 'text-blue-600 hover:text-blue-700'
                  }`}
                >
                  View Project →
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
)
};

export default Projects;
