'use client'

import React, { useEffect, useState } from "react";

type Service = {
  id: number;
  title: string;
  icon: string;
};

const services: Service[] = [
  { id: 1, title: "مانیکور", icon: "💅" },
  { id: 2, title: "کوتاهی مو", icon: "✂️" },
  { id: 3, title: "کراتین", icon: "💆‍♀️" },
  { id: 4, title: "شنیون", icon: "👩‍🎤" },
  { id: 5, title: "پاکسازی صورت", icon: "🧖‍♀️" },
  { id: 6, title: "اپیلاسیون", icon: "🚿" },
];

const ServiceSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto text-center mt-20 mb-10">
      <div className="flex items-center justify-between mb-4" dir='rtl'>
        <h2 className="text-3xl text-pink-600 mb-10">خدمات</h2>
        <div>
        <button onClick={handleNext} className="bg-gray-100 text-3xl rounded-2xl w-10 h-10 mx-2 shadow-sm hover:bg-gray-100">‹</button>
        <button onClick={handlePrev} className="bg-gray-100 text-3xl rounded-2xl w-10 h-10 mx-2 shadow-sm hover:bg-gray-100">›</button>
        </div>
      </div>

      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / 4)}%)` }}
        >
          {services.concat(services).map((service, index) => (
            <div key={index} className="flex-none w-1/4 p-2">
              <div className="bg-white rounded-2xl shadow-md p-5">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3>{service.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSlider;
