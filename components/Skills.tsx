import { Phone, Heart, Scissors, Sparkles, Star, Zap } from "lucide-react";
import { useState } from "react";
import { ServiceContent } from "@/types";

interface SkillItem extends ServiceContent {
  level: number; 
  icon: React.ReactNode;
}

const skillsData: SkillItem[] = [
  {
    id: 1,
    title: "اپیلاسیون با موم",
    content: "در خدمات اپیلاسیون با موم، ابتدا ناحیه مورد نظر با محلول‌های پاک‌کننده آماده می‌شود.",
    level: 90,
    icon: <Phone className="text-pink-500" />
  },
  {
    id: 2,
    title: "اپیلاسیون دست‌ها",
    content: "اپیلاسیون دست‌ها با استفاده از تکنیک‌های پیشرفته و مواد مرغوب انجام می‌شود.",
    level: 75,
    icon: <Heart className="text-pink-500" />
  },
  {
    id: 3,
    title: "اپیلاسیون صورت",
    content: "اپیلاسیون صورت با حساسیت و دقت ویژه‌ای انجام می‌شود.",
    level: 85,
    icon: <Scissors className="text-pink-500" />
  },
  {
    id: 4,
    title: "اپیلاسیون کامل",
    content: "اپیلاسیون کامل بدن شامل رسیدگی به تمام نواحی مورد نظر در یک جلسه است.",
    level: 60,
    icon: <Sparkles className="text-pink-500" />
  },
  {
    id: 5,
    title: "کوتاهی مو",
    content: "کوتاهی مو با جدیدترین متدهای روز و توسط متخصصین حرفه‌ای انجام می‌شود.",
    level: 95,
    icon: <Star className="text-pink-500" />
  },
  {
    id: 6,
    title: "رنگ مو",
    content: "رنگ مو با استفاده از محصولات با کیفیت و تکنیک‌های مدرن انجام می‌شود.",
    level: 80,
    icon: <Zap className="text-pink-500" />
  }
];

export default function Skills() {
  return (
   <section className="relative bg-gradient-to-b from-gray-100 to-gray-200 pt-5 pb-12">
  {/* Section content */}
  <h2 className="text-3xl font-bold text-center mb-8 text-[#BC0060]">تخصص ها</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto px-4" dir="rtl">
    {skillsData.map((skill) => (
      <div 
        key={skill.id} 
        className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{skill.title}</h3>
          {skill.icon}
        </div>
        
        <p className="text-gray-600 text-lg mb-4">{skill.content}</p>
        
        {/* Progress Bar */}
        <div className="relative pt-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200">
                مهارت
              </span>
            </div>
            <div className="text-left">
              <span className="text-xs font-semibold inline-block text-pink-600">
                {skill.level}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
            <div 
              style={{ width: `${skill.level}%` }} 
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#BC0060] transition-all duration-500 ease-in-out"
            ></div>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

  );
}
