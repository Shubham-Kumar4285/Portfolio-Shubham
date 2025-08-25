// 'use client';
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiChevronLeft, FiChevronRight, FiPause, FiPlay } from 'react-icons/fi';

// interface ProjectCarouselProps {
//   images: string[];
//   autoPlayInterval?: number; // in milliseconds
// }

// const ProjectCarousel = ({ images, autoPlayInterval = 5000 }: ProjectCarouselProps) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     if (!isPlaying) return;

//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, autoPlayInterval);

//     return () => clearInterval(interval);
//   }, [images.length, autoPlayInterval, isPlaying]);

//   const handleDotClick = (index: number) => {
//     setCurrentIndex(index);
//   };

//   const handlePrevious = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
//   };

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const togglePlayPause = () => {
//     setIsPlaying(!isPlaying);
//   };

//   return (
//     <div
//       className="relative w-full h-[400px] overflow-hidden rounded-t-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 group"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Background gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-pink-500/5" />

//       {/* Main Image */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentIndex}
//           className="relative w-full h-full flex items-center justify-center p-4"
//           initial={{ opacity: 0, scale: 0.95, rotateY: -15 }}
//           animate={{ opacity: 1, scale: 1, rotateY: 0 }}
//           exit={{ opacity: 0, scale: 1.05, rotateY: 15 }}
//           transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
//         >
//           {/* Image shadow backdrop */}
//           <div className="absolute inset-4 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20 rounded-xl blur-xl" />

//           <motion.img
//             src={images[currentIndex]}
//             alt={`Project screenshot ${currentIndex + 1}`}
//             className="relative w-full h-full object-contain rounded-xl shadow-2xl"
//             initial={{ y: 20 }}
//             animate={{ y: 0 }}
//             transition={{ delay: 0.2, duration: 0.4 }}
//           />
//         </motion.div>
//       </AnimatePresence>

//       {/* Navigation Arrows - show on hover */}
//       <AnimatePresence>
//         {isHovered && images.length > 1 && (
//           <>
//             <motion.button
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               onClick={handlePrevious}
//               className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 group/btn"
//               aria-label="Previous image"
//             >
//               <FiChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover/btn:text-purple-600 dark:group-hover/btn:text-purple-400 transition-colors" />
//             </motion.button>

//             <motion.button
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 20 }}
//               onClick={handleNext}
//               className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 group/btn"
//               aria-label="Next image"
//             >
//               <FiChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover/btn:text-purple-600 dark:group-hover/btn:text-purple-400 transition-colors" />
//             </motion.button>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Play/Pause Button - show on hover */}
//       <AnimatePresence>
//         {isHovered && images.length > 1 && (
//           <motion.button
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             onClick={togglePlayPause}
//             className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-200"
//             aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
//           >
//             {isPlaying ? (
//               <FiPause className="w-4 h-4 text-gray-700 dark:text-gray-300" />
//             ) : (
//               <FiPlay className="w-4 h-4 text-gray-700 dark:text-gray-300" />
//             )}
//           </motion.button>
//         )}
//       </AnimatePresence>

//       {/* Progress Bar */}
//       {isPlaying && images.length > 1 && (
//         <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200/50 dark:bg-gray-700/50">
//           <motion.div
//             key={currentIndex}
//             className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500"
//             initial={{ width: "0%" }}
//             animate={{ width: "100%" }}
//             transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
//           />
//         </div>
//       )}

//       {/* Enhanced Dots Navigation */}
//       {images.length > 1 && (
//         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg">
//           {images.map((_, index) => (
//             <motion.button
//               key={index}
//               onClick={() => handleDotClick(index)}
//               className={`relative rounded-full transition-all duration-300 ${
//                 index === currentIndex
//                   ? 'w-8 h-3 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500'
//                   : 'w-3 h-3 bg-gray-400 dark:bg-gray-500 hover:bg-gray-600 dark:hover:bg-gray-400'
//               }`}
//               whileHover={{ scale: 1.2 }}
//               whileTap={{ scale: 0.9 }}
//               aria-label={`Go to image ${index + 1}`}
//             >
//               {index === currentIndex && (
//                 <motion.div
//                   layoutId="activeDot"
//                   className="absolute inset-0 rounded-full bg-white/30"
//                 />
//               )}
//             </motion.button>
//           ))}

//           {/* Image counter */}
//           <div className="ml-3 text-xs font-medium text-gray-600 dark:text-gray-400 min-w-fit">
//             {currentIndex + 1} / {images.length}
//           </div>
//         </div>
//       )}

//       {/* Corner gradient accents */}
//       <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-transparent pointer-events-none" />
//       <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-pink-500/20 to-transparent pointer-events-none" />
//     </div>
//   );
// };

// export default ProjectCarousel;
