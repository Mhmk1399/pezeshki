"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  AnimatePresence,
} from "framer-motion";

type Comment = {
  id: number;
  text: string;
  author?: string;
  role?: string;
  avatar?: string;
};

const comments: Comment[] = [
  {
    id: 1,
    text: "سلام خیلی ممنونیم که زوتر روشو به ما یاد دادین. من با کمک شما تونستم یه روزه مساله ام رو حل کنم و به نتیجه برسم.",
    author: "سارا محمدی",
    role: "مشتری دائمی",
    avatar: "/image3.jpg",
  },
  {
    id: 2,
    text: "بسیار عالی بود، پشتیبانی فوق العاده ای دارید. من واقعا راضی ام و حتما باز هم از خدمات شما استفاده می کنم.",
    author: "علی رضایی",
    role: "مشتری جدید",
    avatar: "/image1.jpg",
  },
  {
    id: 3,
    text: "کیفیت کارتون بی نظیره، خیلی سریع و حرفه ای عمل کردید. ممنون از تیم خوبتون.",
    author: "مریم احمدی",
    role: "مشتری وفادار",
    avatar: "/image2.jpg",
  },
  {
    id: 4,
    text: "من از نتیجه کار بسیار راضی هستم. همه چیز دقیقا همانطور که می‌خواستم انجام شد.",
    author: "رضا کریمی",
    role: "مشتری جدید",
    avatar: "/image1.jpg",
  },
  {
    id: 5,
    text: "خدمات شما فراتر از انتظارات من بود. قطعا شما را به دوستانم معرفی خواهم کرد.",
    author: "زهرا حسینی",
    role: "مشتری دائمی",
    avatar: "/image3.jpg",
  },
  {
    id: 6,
    text: "سرعت عمل و دقت شما در انجام کار بسیار عالی بود. از همکاری با شما خوشحالم.",
    author: "امیر محمدی",
    role: "مشتری جدید",
    avatar: "/image1.jpg",
  },
  {
    id: 7,
    text: "من تجربه بسیار خوبی با خدمات شما داشتم و قطعا در آینده هم از شما خدمات خواهم گرفت.",
    author: "نیلوفر صادقی",
    role: "مشتری وفادار",
    avatar: "/image2.jpg",
  },
];

const CommentSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Motion values
  const y = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate the maximum index
  const maxIndex = comments.length - 1;

  // Get previous and next indices with wrapping
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
  const nextIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;

  // Handle navigation
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setAutoSlide(false);
    } else {
      // Wrap to the end
      setCurrentIndex(maxIndex);
      setAutoSlide(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
      setAutoSlide(false);
    } else {
      // Wrap to the beginning
      setCurrentIndex(0);
      setAutoSlide(false);
    }
  };

  // Handle drag start
  const handleDragStart = () => {
    setIsDragging(true);
    setAutoSlide(false);
  };

  // Handle drag end
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: any
  ) => {
    setIsDragging(false);

    // Determine if we should change slides based on drag velocity and distance
    if (info.velocity.y < -500) {
      // Fast swipe up - go to next slide
      handleNext();
    } else if (info.velocity.y > 500) {
      // Fast swipe down - go to previous slide
      handlePrev();
    } else if (info.offset.y < -50) {
      // Dragged up - go to next slide
      handleNext();
    } else if (info.offset.y > 50) {
      // Dragged down - go to previous slide
      handlePrev();
    }

    // Re-enable autoplay after 5 seconds
    const timer = setTimeout(() => setAutoSlide(true), 5000);
    return () => clearTimeout(timer);
  };

  // Autoplay functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoSlide && !isHovering) {
      interval = setInterval(() => {
        handleNext();
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [autoSlide, currentIndex, isHovering]);

  // Animation variants
  const mainCardVariants = {
    initial: {
      scale: 0.9,
      opacity: 0,
      y: 50,
    },
    animate: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.3,
      },
    },
    hover: {
      scale: 1.02,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    },
  };

  // Preview card variants
  const prevCardVariants = {
    initial: {
      y: -80,
      opacity: 0,
      scale: 0.8,
    },
    animate: {
      y: -70,
      opacity: 0.7,
      scale: 0.85,
      rotateX: 10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    hover: {
      y: -90,
      opacity: 0.9,
      scale: 0.9,
      transition: {
        duration: 0.3,
      },
    },
  };

  const nextCardVariants = {
    initial: {
      y: 80,
      opacity: 0,
      scale: 0.8,
    },
    animate: {
      y: 70,
      opacity: 0.7,
      scale: 0.85,
      rotateX: -10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    hover: {
      y: 90,
      opacity: 0.9,
      scale: 0.9,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section className="bg-gradient-to-t from-pink-50 to-white py-16" dir="rtl">
      <div className="max-w-4xl mx-auto text-center px-4" dir="rtl">
        <div className="flex items-center justify-between mb-28">
          <motion.h2
            className="text-3xl font-bold text-pink-600"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            نظرات مشتریان
          </motion.h2>

          <div className="flex space-x-2">
            <motion.button
              onClick={handleNext}
              className="bg-white text-xl rounded-full w-10 h-10 flex items-center justify-center shadow-md text-pink-600 hover:bg-pink-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </motion.button>
            <motion.button
              onClick={handlePrev}
              className="bg-white text-xl rounded-full w-10 h-10 flex items-center justify-center shadow-md text-pink-600 hover:bg-pink-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Comment cards stack with visible previews */}
        <div
          className="relative h-[200px] perspective-1000 mx-auto max-w-2xl"
          ref={containerRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Previous comment preview (visible at top) */}
          <motion.div
            className="absolute top-0 left-0 right-0 z-10 cursor-pointer"
            variants={prevCardVariants}
            initial="initial"
            animate={isHovering ? "hover" : "animate"}
            onClick={handlePrev}
            style={{
              transformOrigin: "bottom center",
              filter: "blur(1px)",
              pointerEvents: isHovering ? "auto" : "none",
            }}
          >
            <div className="bg-white rounded-2xl shadow-md p-6 text-right mx-auto transform-style-3d">
              <p className="text-gray-700 line-clamp-2 text-sm">
                {comments[prevIndex].text}
              </p>

              {/* Scroll up indicator */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-pink-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Main comment card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-20 cursor-grab"
              variants={mainCardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              whileHover="hover"
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.1}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              style={{ y }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 text-right mx-auto">
                {/* Quote icon */}
                <svg
                  className="w-10 h-10 text-pink-100 mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                <p className="text-lg text-gray-700 mb-6">
                  {comments[currentIndex].text}
                </p>

                {/* Author information */}
                <div className="flex items-center justify-start mt-auto">
                  {comments[currentIndex].avatar && (
                    <motion.div
                      className="w-12 h-12 rounded-full overflow-hidden border-2 border-pink-200 mr-4"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <img
                        src={comments[currentIndex].avatar}
                        alt={comments[currentIndex].author || "مشتری"}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  )}
                  <div className="text-right">
                    <motion.p
                      className="font-bold text-gray-800"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {comments[currentIndex].author || "مشتری"}
                    </motion.p>
                    <motion.p
                      className="text-sm text-pink-600"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {comments[currentIndex].role || ""}
                    </motion.p>
                  </div>
                </div>

                {/* Drag indicators */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-pink-300 opacity-50">
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <path d="m18 15-6-6-6 6" />
                  </motion.svg>
                </div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-pink-300 opacity-50">
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{ y: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </motion.svg>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Next comment preview (visible at bottom) */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-10 cursor-pointer"
            variants={nextCardVariants}
            initial="initial"
            animate={isHovering ? "hover" : "animate"}
            onClick={handleNext}
            style={{
              transformOrigin: "top center",
              filter: "blur(1px)",
              pointerEvents: isHovering ? "auto" : "none",
            }}
          >
            <div className="bg-white rounded-2xl shadow-md p-6 text-right mx-auto transform-style-3d">
              <p className="text-gray-700 line-clamp-2 text-sm">
                {comments[nextIndex].text}
              </p>

              {/* Scroll down indicator */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-pink-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Side indicators for dragging */}
          <div className="absolute top-1/2 right-[-40px] transform -translate-y-1/2 z-10">
            <motion.div
              className="flex flex-col items-center space-y-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="w-1 h-20 bg-gradient-to-b from-pink-200 to-pink-400 rounded-full"
                animate={{
                  height: [20, 40, 20],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="w-2 h-2 bg-pink-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
            </motion.div>
          </div>

          <div className="absolute top-1/2 left-[-40px] transform -translate-y-1/2 z-10">
            <motion.div
              className="flex flex-col items-center space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="w-1 h-20 bg-gradient-to-b from-pink-400 to-pink-200 rounded-full"
                animate={{
                  height: [20, 40, 20],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="w-2 h-2 bg-pink-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-pink-100 rounded-full mt-24 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentIndex + 1) / comments.length) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </section>
  );
};

const CommentSliderWithKeyboardNav: React.FC = () => {
  return (
    <>
      <CommentSlider />
    </>
  );
};

export default CommentSliderWithKeyboardNav;
