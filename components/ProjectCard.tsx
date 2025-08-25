// 'use client';
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FiGithub, FiExternalLink } from 'react-icons/fi';
// import ProjectCarousel from './ProjectCarousel';

// interface ProjectCardProps {
//   title: string;
//   description: string;
//   technologies: string[];
//   githubUrl: string;
//   liveUrl: string;
//   images: string[];
// }

// const ProjectCard = ({
//   title,
//   description,
//   technologies,
//   githubUrl,
//   liveUrl,
//   images,
// }: ProjectCardProps) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5 }}
//       whileHover={{ scale: 1.025, boxShadow: '0 8px 40px rgba(80, 50, 200, .10)', y: -4 }}
//       className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Accent bar on top */}
//       <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500" />

//       {/* Spotlight gradient overlay on hover */}
//       <AnimatePresence>
//         {isHovered && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.3 }}
//             exit={{ opacity: 0 }}
//             className="absolute inset-0 z-10 pointer-events-none rounded-2xl bg-gradient-to-br from-purple-500/30 via-blue-500/30 to-pink-500/30"
//           />
//         )}
//       </AnimatePresence>

//       <div className="relative z-0">
//         <ProjectCarousel images={images} />
//       </div>
//       <div className="p-6 relative z-20">
//         {/* Title */}
//         <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
//           {title}
//         </h3>
//         {/* Description */}
//         <p className="text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">
//           {description}
//         </p>
//         {/* Technologies - animate on hover */}
//         <div className="flex flex-wrap gap-2 mb-4">
//           {technologies.map((tech, i) => (
//             <motion.span
//               key={tech}
//               initial={{ scale: 1, opacity: 1 }}
//               whileHover={{ scale: 1.08, opacity: 1 }}
//               transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.08 * i }}
//               className="px-3 py-1 text-sm bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 text-blue-800 dark:text-blue-100 font-semibold rounded-full shadow-sm"
//             >
//               {tech}
//             </motion.span>
//           ))}
//         </div>
//         {/* Links */}
//         <div className="flex space-x-6 mt-1">
//           <a
//             href={githubUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-purple-400 hover:via-blue-400 hover:to-pink-400 dark:hover:from-purple-700 dark:hover:via-blue-700 dark:hover:to-pink-700 hover:text-white dark:hover:text-white transition-all duration-300"
//           >
//             <FiGithub className="mr-2" />
//             GitHub
//           </a>
//           <a
//             href={liveUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-purple-400 hover:via-blue-400 hover:to-pink-400 dark:hover:from-purple-700 dark:hover:via-blue-700 dark:hover:to-pink-700 hover:text-white dark:hover:text-white transition-all duration-300"
//           >
//             <FiExternalLink className="mr-2" />
//             Live Demo
//           </a>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ProjectCard;
