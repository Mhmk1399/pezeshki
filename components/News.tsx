"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const cardsData = [
  {
    id: 1,
    title: "چرا در اینجا",
    work: "مو",
    image: "/image1.jpg",
    description: "چرا ریزش ممو خطرناک تر از سایر موارد است؟",
  },
  {
    id: 2,
    title: "چرا در اینجا",
    work: "مو",
    image: "/image2.jpg",
    description: "را ریزش ممو خطرناک تر از سایر موارد است؟",
  },
  {
    id: 3,
    title: "چرا در اینجا",
    work: "مو",
    image: "/image3.jpg",
    description: "را ریزش ممو خطرناک تر از سایر موارد است؟",
  },
  {
    id: 4,
    title: "چرا در اینجا",
    work: "مو",
    image: "/image2.jpg",
    description: "را ریزش ممو خطرناک تر از سایر موارد است؟",
  },
  {
    id: 5,
    title: "چرا در اینجا",
    work: "مو",
    image: "/image1.jpg",
    description: "را ریزش ممو خطرناک تر از سایر موارد است؟",
  },
  {
    id: 6,
    title: "چرا در اینجا",
    work: "مو",
    image: "/image2.jpg",
    description: "را ریزش ممو خطرناک تر از سایر موارد است؟",
  },
  {
    id: 7,
    title: "چرا در اینجا",
    work: "مو",
    image: "/image3.jpg",
    description: "را ریزش ممو خطرناک تر از سایر موارد است؟",
  },
];

const CardSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isDragging, setIsDragging] = useState(false);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const controls = useAnimation();
  const sliderRef = useRef<HTMLDivElement>(null);

  

  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsPerView(1); // mobile
      } else if (width < 1024) {
        setCardsPerView(2); // tablet
      } else {
        setCardsPerView(3); // desktop
      }

      if (sliderRef.current) {
        const containerWidth = sliderRef.current.clientWidth;
        setSliderWidth(containerWidth);
        setCardWidth(containerWidth / cardsPerView);
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, [cardsPerView]);

  // Update animation when currentIndex changes
  useEffect(() => {
    controls.start({
      x: -currentIndex * cardWidth,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    });
  }, [currentIndex, cardWidth, controls]);

  const handleNext = () => {
    if (currentIndex < cardsData.length - cardsPerView) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    
    const threshold = cardWidth / 4;
    
    if (info.offset.x > threshold && currentIndex > 0) {
      // Dragged right - go to previous slide
      handlePrev();
    } else if (info.offset.x < -threshold && currentIndex < cardsData.length - cardsPerView) {
      // Dragged left - go to next slide
      handleNext();
    } else {
      // Return to current position
      controls.start({
        x: -currentIndex * cardWidth,
        transition: { type: "spring", stiffness: 500, damping: 30 },
      });
    }
  };

  // Button animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, backgroundColor: "#9f1239" },
    tap: { scale: 0.95 },
    disabled: { opacity: 0.5, scale: 1 }
  };

  // Card animation variants
  const cardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    hover: { y: -10, transition: { duration: 0.3 } }
  };

  // Front box animation variants
  const frontBoxVariants = {
    initial: { y: 20, opacity: 0, scale: 0.9 },
    animate: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.4 } },
    hover: { 
      y: -5,
      // boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto text-center px-4 py-12">
      <div className="flex justify-between mb-6">
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover={currentIndex > 0 ? "hover" : "disabled"}
          whileTap={currentIndex > 0 ? "tap" : "disabled"}
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`bg-pink-600 text-white p-3 rounded-full overflow-hidden shadow-md ${
            currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </motion.button>
        
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover={currentIndex < cardsData.length - cardsPerView ? "hover" : "disabled"}
          whileTap={currentIndex < cardsData.length - cardsPerView ? "tap" : "disabled"}
          onClick={handleNext}
          disabled={currentIndex >= cardsData.length - cardsPerView}
          className={`bg-pink-600 text-white p-3 rounded-full overflow-hidden shadow-md ${
            currentIndex >= cardsData.length - cardsPerView ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      <div className="overflow-hidden w-full" ref={sliderRef}>
        <motion.div
          className="flex"
          drag="x"
          dragConstraints={{ left: -(cardWidth * (cardsData.length - cardsPerView)), right: 0 }}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 30 }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{ 
            cursor: isDragging ? "grabbing" : "grab",
            touchAction: "pan-y" // Enables vertical scrolling on mobile while allowing horizontal dragging
          }}
        >
          {cardsData.map((card, index) => (
            <motion.div
              key={index}
              className="w-full max-w-sm px-4 pt-4 pb-20"
              style={{ flex: `0 0 ${100 / cardsPerView}%` }}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              onHoverStart={() => setActiveCard(index)}
              onHoverEnd={() => setActiveCard(null)}
            >
              <div className="relative">
                {/* Image container */}
                <motion.div 
                  className="rounded-2xl overflow-hidden"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-80 object-cover transition duration-300"
                    style={{
                      filter: activeCard === index ? "grayscale(0)" : "grayscale(100%)",
                    }}
                  />
                </motion.div>

                {/* Card title that overlaps the bottom of the image */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 pointer-events-none"
                  variants={frontBoxVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                >
                  <motion.div 
                    className="bg-white p-5 rounded-2xl shadow-lg mx-auto w-4/5"
                    initial={{ backgroundColor: "#ffffff" }}
                    whileHover={{ 
                      backgroundColor: "#fdf2f8",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div
                      className="flex justify-between items-center"
                      dir="rtl"
                    >
                      <motion.h3 
                        className="text-xl pr-2 font-bold border-r-2 border-pink-600 border-solid"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                      >
                        {card.title}
                      </motion.h3>
                      <motion.span 
                        className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        whileHover={{ scale: 1.05, backgroundColor: "#f9a8d4" }}
                      >
                        {card.work}
                      </motion.span>
                    </div>
                    <motion.p 
                      className="mt-3 text-gray-600 text-right pr-2"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                    >
                      {card.description}
                    </motion.p>
                    
                    <motion.div 
                      className="mt-4 text-right"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      <motion.button 
                        className="text-pink-600 font-medium inline-flex items-center"
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        مطالعه بیشتر
                        <ArrowRight size={16} className="mr-1 rtl:rotate-180" />
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Pagination dots */}
      <div className="flex justify-center mt-16 space-x-2">
        {Array.from({ length: Math.ceil(cardsData.length - cardsPerView + 1) }).map((_, index) => (
          <motion.button
            key={index}
            className="w-3 h-3 rounded-full bg-gray-300 focus:outline-none"
            initial={false}
            animate={{
              scale: currentIndex === index ? 1.2 : 1,
              backgroundColor: currentIndex === index ? "#db2777" : "#d1d5db"
            }}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
};

export default CardSlider;
