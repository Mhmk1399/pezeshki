'use client'

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { section } from "framer-motion/client";

type Comment = {
  id: number;
  text: string;
};

const comments: Comment[] = [
  { id: 1, text: "سلام خیلی ممنونیم که زوتر روشو به ما یاد دادین. من با کمک شما تونستم یه روزه مساله ام رو حل کنم و به نتیجه برسم." },
  { id: 2, text: "بسیار عالی بود، پشتیبانی فوق العاده ای دارید. من واقعا راضی ام و حتما باز هم از خدمات شما استفاده می کنم." },
  { id: 3, text: "کیفیت کارتون بی نظیره، خیلی سریع و حرفه ای عمل کردید. ممنون از تیم خوبتون." },
  { id: 4, text: "کیفیت کارتون بی نظیره، خیلی سریع و حرفه ای عمل کردید. ممنون از تیم خوبتون." },
  { id: 5, text: "کیفیت کارتون بی نظیره، خیلی سریع و حرفه ای عمل کردید. ممنون از تیم خوبتون." },
  { id: 6, text: "کیفیت کارتون بی نظیره، خیلی سریع و حرفه ای عمل کردید. ممنون از تیم خوبتون." },
  { id: 7, text: "کیفیت کارتون بی نظیره، خیلی سریع و حرفه ای عمل کردید. ممنون از تیم خوبتون." },
];

const CommentSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [direction, setDirection] = useState(1);
  
  // Calculate the maximum index
  const maxIndex = comments.length - 1;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
      setAutoSlide(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
      setAutoSlide(false);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoSlide) {
      interval = setInterval(() => {
        setDirection(1);
        setCurrentIndex(prevIndex => {
          if (prevIndex >= maxIndex) {
            // Reset to beginning when reaching the end
            return 0;
          }
          return prevIndex + 1;
        });
      }, 3000);
    }
    
    return () => clearInterval(interval);
  }, [autoSlide, maxIndex]);

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0
    })
  };

  return (
    <section className="bg-gradient-to-b from-gray-200 to-gray-100 z-0">
    <div className="max-w-4xl mx-auto text-center mt-20" dir="rtl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl text-pink-600">نظرات مشتریان</h2>
        <div>
          <button 
            onClick={handleNext} 
            className={`bg-gray-100 text-3xl rounded-full w-10 h-10 mx-2 shadow-md ${
              currentIndex === maxIndex 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'hover:bg-gray-200'
            }`}
            disabled={currentIndex === maxIndex}
          >‹</button>
          <button 
            onClick={handlePrev} 
            className={`bg-gray-100 text-3xl rounded-full w-10 h-10 mx-2 shadow-md ${
              currentIndex === 0 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'hover:bg-gray-200'
            }`}
            disabled={currentIndex === 0}
          >›</button>
        </div>
      </div>

      <div className="overflow-hidden relative h-25">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute w-full"
          >
            <div className="bg-white rounded-2xl shadow-lg p-5 text-right mx-auto">
              <p>{comments[currentIndex].text}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Indicator dots */}
      <div className="flex justify-center">
        {comments.map((_, index) => (
          <span 
            key={index}
            className={`w-2 h-2 mx-1 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentIndex ? 'bg-pink-600 scale-125' : 'bg-gray-300'
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
              setAutoSlide(false);
            }}
          ></span>
        ))}
      </div>
    </div>
    </section>
  );
};

export default CommentSlider;
