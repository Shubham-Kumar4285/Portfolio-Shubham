import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const Projects = () => {
  const { theme } = useTheme();
  const projects = [
    {
      title: 'Reel Pick - Movie Recommender app',
      description: 'Discover your next favorite film with personalized recommendations tailored to your tastes. Simply select the genres and movie types you love, and our system—powered by Natural Language Processing and Machine Learning—analyzes your preferences to suggest similar titles and hidden gems just for you.',
      tags: ['Python', 'Machine Learning', 'Streamlit','Numpy','Pandas','NLP'],
      image: '/r13.png', // Add your project image
      link: 'https://github.com/Shubham-Kumar4285/ReelPick',
    },
    {
      title: 'Recipe App',
      description: 'A modern Recipe App built with Jetpack Compose that fetches meals from the MealDB API and displays them using a LazyVerticalGrid for smooth, efficient browsing. It leverages Retrofit for networking, Coil for image loading, and follows the MVVM architecture with Navigation Compose for seamless screen transitions.',
      tags: ["Jetpack Compose",
                "LazyVerticalGrid",
                "Retrofit",
                "Coil",
                "MVVM Architecture",
                "Navigation Compose",
                "Kotlin",
                "REST API Integration",
                "Asynchronous Programming",
  "State Management"],
      image: '/r31.png', // Add your project image
      link: 'https://github.com/Shubham-Kumar4285/RecipeApp',
    },
    {
      title: 'VoyageX – AI Travel Planner App',
      description: 'Developed a cross-platform travel app that generates AI-powered itineraries using the Gemini API. Integrated Firebase for user authentication and cloud storage, managing data in JSON format. Designed an intuitive, responsive UI/UX with features like trip creation, destination discovery, and itinerary review.',
      tags: ['React-Native', 'API Integration', 'Material UI','Gemini','Expo',"RESTful API Integration",
  "Cloud-based Data Management",
  "Mobile Navigation & Routing","Firebase Authentication & Cloud Storage"],
      image: '/r21.png', // Add your project image
      link: 'https://github.com/Shubham-Kumar4285/VoyageX',
    },
  ];

  return (
    <section id="projects" className={`py-20 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>My Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-750'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className={`relative h-48 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                                            <Image
        src={project.image} // Make sure this is a valid URL or imported image
        alt="Project"
        className="absolute inset-0 w-full h-full object-contain"
        fill // This replaces width and height when you use absolute positioning
        style={{ objectFit: 'contain' }}
        />
                  <div className="absolute inset-0 bg-blue-500/10" />
                </div>

                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>{project.title}</h3>
                  <p className={`mb-4 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className={`px-3 py-1 rounded-full text-sm ${
                          theme === 'dark'
                            ? 'bg-blue-900/50 text-blue-200'
                            : 'bg-blue-100 text-blue-600'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.link}
                    className={`inline-block font-medium transition-colors duration-200 ${
                      theme === 'dark'
                        ? 'text-blue-400 hover:text-blue-300'
                        : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    View Project →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
