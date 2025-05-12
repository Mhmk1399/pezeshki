"use client";

import React, { useState, useEffect } from "react";

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
    <div className="w-full max-w-7xl mx-auto text-center px-4 py-12">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="bg-gray-400 text-white px-4 py-2 rounded-full overflow-hidden"
        >
          prev
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex >= cardsData.length - cardsPerView}
          className="bg-gray-400 text-white px-4 py-2 rounded-full overflow-hidden"
        >
          next
        </button>
      </div>

      <div className="overflow-hidden w-full space-x-4">
        <div
          className="flex transition-transform duration-300 ease-in-out overflow-visible"
          style={{
            transform: `translateX(-${(100 / cardsPerView) * currentIndex}%)`,
          }}
        >
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="w-full max-w-sm px-4 pt-4 pb-20"
              style={{ flex: `0 0 ${100 / cardsPerView}%` }}
            >
              <div className="relative">
                {/* Image container */}
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-80 object-cover filter grayscale hover:grayscale-0 transition duration-300 cursor-pointer"
                  />
                </div>

                {/* Card title that overlaps the bottom of the image */}
                <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2">
                  <div className="bg-white p-4 rounded-2xl shadow-md mx-auto w-4/5">
                    <div
                      className="flex justify-between items-center"
                      dir="rtl"
                    >
                      <h3 className="text-xl pr-1 font-bold border-r border-pink-600 border-solid">{card.title}</h3>
                      <p className="mt-2 text-lg">{card.work}</p>
                    </div>
                    <p className="mt-2 text-lg">
                      {card.description ||
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
