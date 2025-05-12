"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";

const cardsData = [
  { id: 1, title: "پزشکی", type: "موز", price: "1000000", discount: 20 },
  { id: 2, title: "پزشکی", type: "موز", price: "1000000", discount: 0 },
  { id: 3, title: "پزشکی", type: "موز", price: "1000000", discount: 15 },
  { id: 4, title: "پزشکی", type: "موز", price: "1000000", discount: 0 },
  { id: 5, title: "پزشکی", type: "موز", price: "1000000", discount: 10 },
  { id: 6, title: "پزشکی", type: "موز", price: "1000000", discount: 0 },
  { id: 7, title: "پزشکی", type: "موز", price: "1000000", discount: 25 },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

const CardSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);

  // Format price with discount
  const calculateDiscountedPrice = (price: string, discount: number) => {
    if (!discount) return price;
    const numPrice = parseInt(price.replace(/,/g, ""));
    const discountedPrice = numPrice - (numPrice * discount / 100);
    return new Intl.NumberFormat('fa-IR').format(discountedPrice);
  };

  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsPerView(1); // mobile
      } else if (width < 1024) {
        setCardsPerView(2); // tablet
      } else if (width < 1280) {
        setCardsPerView(3); // small desktop
      } else {
        setCardsPerView(4); // large desktop
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < cardsData.length - cardsPerView ? prev + 1 : prev
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className="w-full max-w-6xl mx-auto text-center px-4 py-8 sm:py-12">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-2">محصولات ما</h2>
        <p className="text-gray-600">محصولات با کیفیت و قیمت مناسب</p>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={handleNext}
          disabled={currentIndex >= cardsData.length - cardsPerView}
          className="bg-pink-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          بعدی
        </motion.button>
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="bg-pink-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          قبلی
        </motion.button>
      </div>

      <motion.div 
        className="overflow-hidden w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(100 / cardsPerView) * currentIndex}%)`,
          }}
        >
          {cardsData.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              style={{ flex: `0 0 ${100 / cardsPerView}%` }}
              className="p-2 sm:p-3 md:p-4"
            >
              <motion.div 
                className="relative w-full h-full border border-gray-200 rounded-md bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="p-4">
                  <div className="rounded-lg overflow-hidden mb-4">
                    <Image
                      src="/image1.jpg"
                      width={200}
                      height={200}
                      alt={card.title}
                      className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                
                  <div className="flex text-right flex-col mb-3">
                    <h2 className="text-lg sm:text-xl font-bold text-pink-500">
                      {card.title}
                    </h2>
                    <p className="text-md sm:text-lg font-bold">{card.type}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <motion.div whileHover={{ scale: 1.2, rotate: 15 }}>
                      <motion.div 
                        initial={{ color: "#ec4899" }} // Initial pink color
                        whileHover={{ color: "#3b82f6" }} // Change to blue on hover
                      >
                        <Phone className="text-current" />
                      </motion.div>
                    </motion.div>
                    <div className="text-right">
                      {card.discount > 0 ? (
                        <>
                          <p className="text-xs text-gray-500 line-through">
                            {new Intl.NumberFormat('fa-IR').format(parseInt(card.price))} تومان
                          </p>
                          <p className="text-md sm:text-lg font-bold text-red-500">
                            {calculateDiscountedPrice(card.price, card.discount)} تومان
                          </p>
                        </>
                      ) : (
                        <p className="text-md sm:text-lg font-bold">
                          {new Intl.NumberFormat('fa-IR').format(parseInt(card.price))} تومان
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Mobile pagination dots */}
      <div className="flex justify-center mt-6 md:hidden">
        {Array.from({ length: Math.ceil(cardsData.length / cardsPerView) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * cardsPerView)}
            className={`w-2 h-2 mx-1 rounded-full ${
              index === Math.floor(currentIndex / cardsPerView) ? 'bg-pink-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CardSlider;
