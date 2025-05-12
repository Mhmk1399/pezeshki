"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const Intro: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const circleVariants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: {
      opacity: 0.6,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };

  // Handle video play
  const handlePlayVideo = () => {
    setIsPlaying(true);
    // Here you would typically trigger your video player
    setTimeout(() => setIsPlaying(false), 300); // Reset button state after animation
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-20 relative z-1 -mt-30">
      <motion.div
        className="flex flex-col md:flex-row items-center justify-center gap-12 p-8 bg-white rounded-3xl shadow-lg relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Image with play button - positioned relative for the circle to be positioned relative to it */}
        <div className="relative">
          {/* Circle positioned outside to the right of the video container */}
          <motion.div
            className="absolute top-1/2 -right-16 w-45 h-50 bg-pink-100 rounded-full -translate-y-1/2 z-0"
            style={{ clipPath: "inset(0 0 0 50%)" }}
            variants={circleVariants}
            initial="hidden"
            animate="visible"
          />

          <motion.div
            className="relative w-[300px] h-[350px] rounded-2xl overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform duration-300"
            variants={itemVariants}
            whileHover={{
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <Image
              src="/image1.jpg"
              alt="Video Thumbnail"
              fill
              sizes="(max-width: 300px) 100vw, 300px"
              priority
              className="object-cover rounded-2xl bg-pink-300"
            />
            <motion.button
              type="button"
              aria-label="Play video"
              className="absolute inset-0 flex items-center justify-center z-10"
              onClick={handlePlayVideo}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="bg-opacity-80 rounded-full flex items-center justify-center text-white"
                animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <svg
                  className="w-6 h-6 text-pink-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 4l12 6-12 6V4z" />
                </svg>
              </motion.div>
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          className="max-w-md text-center md:text-right"
          variants={itemVariants}
        >
          <motion.h2
            className="text-5xl font-black text-pink-700 mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            ویدئو معرفی
          </motion.h2>
          <motion.p
            className="text-gray-700 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            در سالن جادویی صورتی، با ارائه خدمات تخصصی زیبایی، هدف ما این است که
            هر مشتری تجربه‌ای خاص و متفاوت از زیبایی داشته باشد. با استفاده از
            روش‌ها و متدهای روز دنیا، زیبایی شما را به بالاترین سطح ممکن
            می‌رسانیم.
          </motion.p>

          <motion.button
            className="mt-6 bg-pink-600 text-white py-2 px-6 rounded-full font-medium hover:bg-pink-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            مشاهده خدمات
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Intro;
