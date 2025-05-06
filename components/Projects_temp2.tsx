'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const { theme } = useTheme();

  const projects = [
    {
      title: 'Reel Pick - Movie Recommender app',
      description: 'Discover your next favorite film with personalized recommendations tailored to your tastes. Simply select the genres and movie types you love, and our system—powered by Natural Language Processing and Machine Learning—analyzes your preferences to suggest similar titles and hidden gems just for you.',
      technologies: ['Python', 'Machine Learning', 'Streamlit','Numpy','Pandas','NLP'],
      githubUrl: 'https://github.com/Shubham-Kumar4285/ReelPick',
      liveUrl: 'https://github.com/Shubham-Kumar4285',
      images: [
        '/r11.png',
        '/r12.png',
        '/r13.png',
        '/r14.png',
        '/r15.png'
      ]
    },
    {
      title: 'Recipe App',
      description: 'A modern Recipe App built with Jetpack Compose that fetches meals from the MealDB API and displays them using a LazyVerticalGrid for smooth, efficient browsing. It leverages Retrofit for networking, Coil for image loading, and follows the MVVM architecture with Navigation Compose for seamless screen transitions.',
      technologies: ["Jetpack Compose",
                "LazyVerticalGrid",
                "Retrofit",
                "Coil",
                "MVVM Architecture",
                "Navigation Compose",
                "Kotlin",
                "REST API Integration",
                "Asynchronous Programming",
  "State Management"],
      githubUrl: 'https://github.com/Shubham-Kumar4285/RecipeApp',
      liveUrl: 'https://github.com/Shubham-Kumar4285',
      images: [
        '/projects/ecommerce/home.png',
        '/projects/ecommerce/products.png',
        '/projects/ecommerce/cart.png',
        '/projects/ecommerce/checkout.png'
      ]
    },
    {
      title: 'VoyageX – AI Travel Planner App',
      description: 'Developed a cross-platform travel app that generates AI-powered itineraries using the Gemini API. Integrated Firebase for user authentication and cloud storage, managing data in JSON format. Designed an intuitive, responsive UI/UX with features like trip creation, destination discovery, and itinerary review.',
      technologies: ['React-Native', 'API Integration', 'Material UI','Gemini','Expo',"RESTful API Integration",
  "Cloud-based Data Management",
  "Mobile Navigation & Routing","Firebase Authentication & Cloud Storage"],
      githubUrl: 'https://github.com/Shubham-Kumar4285/VoyageX',
      liveUrl: 'https://github.com/Shubham-Kumar4285',
      images: [
        '/projects/taskmanager/dashboard.png',
        '/projects/taskmanager/tasks.png',
        '/projects/taskmanager/calendar.png',
        '/projects/taskmanager/team.png'
      ]
    }
  ];

  const themeClass = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const textClass = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';

  return (
    <section id="projects" className={`py-20 transition-colors duration-300 ${themeClass}`}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className={`text-4xl font-bold mb-12 text-center ${textClass}`}>
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                {...project}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
