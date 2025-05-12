'use client'

import React, { useState, useEffect } from "react";
import { ServiceContent } from "@/types"; 


const services: ServiceContent[] = [
  {
    id: 1,
    title: "اپیلاسیون با موم",
    content: "در خدمات اپیلاسیون با موم، ابتدا ناحیه مورد نظر با محلول‌های پاک‌کننده و ضدعفونی آماده می‌شود تا پوست تمیز و بدون چربی باشد. سپس با توجه به نوع پوست و ناحیه بدن، از موم سرد یا گرم استفاده می‌گردد. موم روی پوست مالیده شده و با پارچه مخصوص یا خود موم جدا می‌شود تا موها از ریشه کنده شوند. پس از اتمام کار، از ژل یا روغن ضدالتهاب برای تسکین پوست استفاده می‌شود."
  },
    {
    id: 2,
    title: "اپیلاسیون دست‌ها",
    content: "اپیلاسیون دست‌ها با استفاده از تکنیک‌های پیشرفته و مواد مرغوب انجام می‌شود. این فرآیند شامل پاکسازی، اپیلاسیون و مراقبت‌های پس از آن است که پوستی صاف و لطیف را به ارمغان می‌آورد."
  },
  {
    id: 3,
    title: "اپیلاسیون صورت",
    content: "اپیلاسیون صورت با حساسیت و دقت ویژه‌ای انجام می‌شود. از موم‌های مخصوص صورت استفاده می‌کنیم که برای پوست حساس صورت مناسب است و کمترین التهاب را ایجاد می‌کند."
  },
  {
    id: 4,
    title: "اپیلاسیون کامل",
    content: "اپیلاسیون کامل بدن شامل رسیدگی به تمام نواحی مورد نظر در یک جلسه است. این خدمت با برنامه‌ریزی دقیق و استفاده از بهترین محصولات انجام می‌شود تا نتیجه‌ای رضایت‌بخش حاصل شود."
  }
];

export default function ServiceTable() {
  const [selectedService, setSelectedService] = useState<ServiceContent>(services[0]);
  const [isContentVisible, setIsContentVisible] = useState(true);

  const handleServiceChange = (service: ServiceContent) => {
    setIsContentVisible(false);
    setTimeout(() => {
      setSelectedService(service);
      setIsContentVisible(true);
    }, 300);
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md max-w-7xl mx-auto my-10 mt-20" dir="rtl">
      <aside className="w-full md:w-1/3 p-4 border-l-2 border-gray-300 border-dashed">
        <nav className="flex flex-col space-y-2">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => handleServiceChange(service)}
              className={`text-right text-lg cursor-pointer ${
                selectedService.id === service.id
                  ? "font-semibold text-pink-500"
                  : "text-gray-700 hover:text-pink-400"
              }`}
            >
              {service.title}
            </button>
          ))}
        </nav>
      </aside>

      <div className="w-full md:w-2/3 p-6">
        <div className={`transition-opacity duration-300 ease-in-out ${isContentVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-2xl font-semibold mb-4">
            {selectedService.title} چگونه انجام میشود؟
          </h2>
          <p className="leading-relaxed">
            {selectedService.content}
          </p>
          <button className="bg-pink-500 text-white py-2 px-4 rounded-full mt-4 hover:bg-pink-600 cursor-pointer">
            رزرو نوبت
          </button>
        </div>
      </div>
    </div>
  );
}
