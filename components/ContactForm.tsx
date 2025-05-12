"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const dropdownVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const submitButtonVariants = {
  initial: { scale: 1, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export default function ContactForm() {
  const categories = [
    "اپیلاسیون",
    "پاکسازی صورت",
    "شینیون",
    "کراتین",
    "کوتاهی مو",
    "مانیکور",
    "میکاپ",
  ];

  // Map categories to their skills
  const categoryToSkills: { [key: string]: string[] } = {
    "اپیلاسیون": [
      'اپیلاسیون با موم',
      'اپیلاسیون دست‌ها',
      'اپیلاسیون صورت',
      'اپیلاسیون کامل'
    ],
    "پاکسازی صورت": [
      'پاکسازی عمیق',
      'پاکسازی معمولی'
    ],
    "شینیون": [
      'شینیون ساده',
      'شینیون مجلسی'
    ],
    "کراتین": [
      'کراتین برزیلی',
      'کراتین ایرانی'
    ],
    "کوتاهی مو": [
      'کوتاهی ساده',
      'کوتاهی مدل دار'
    ],
    "مانیکور": [
      'مانیکور ساده',
      'مانیکور ژل'
    ],
    "میکاپ": [
      'میکاپ ساده',
      'میکاپ عروس'
    ],
    "default": ['لطفا ابتدا دسته بندی را انتخاب کنید']
  };

  const persons: { [key: string]: string[] } = {
    "اپیلاسیون با موم": ['سحر نعمتی', 'مریم احمدی'],
    "اپیلاسیون دست‌ها": ['سحر نعمتی', 'زهرا محمدی'],
    "اپیلاسیون صورت": ['مریم احمدی', 'زهرا محمدی'],
    "اپیلاسیون کامل": ['سحر نعمتی'],
    "پاکسازی عمیق": ['ممد اکبری', 'قاسم صمدی'],
    "پاکسازی معمولی": ['ممد اکبری'],
    "شینیون ساده": ['زهرا محمدی', 'سارا رضایی'],
    "شینیون مجلسی": ['سارا رضایی'],
    "کراتین برزیلی": ['مریم احمدی', 'سارا رضایی'],
    "کراتین ایرانی": ['مریم احمدی'],
    "کوتاهی ساده": ['قاسم صمدی', 'ممد اکبری'],
    "کوتاهی مدل دار": ['قاسم صمدی'],
    "مانیکور ساده": ['زهرا محمدی'],
    "مانیکور ژل": ['زهرا محمدی', 'سحر نعمتی'],
    "میکاپ ساده": ['سارا رضایی'],
    "میکاپ عروس": ['سارا رضایی', 'مریم احمدی'],
    "default": ['لطفا ابتدا خدمات را انتخاب کنید']
  };

  // State for each dropdown
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [selectedPerson, setSelectedPerson] = useState<string>("");
  
  // Refs for each dropdown
  const categoryRef = useRef<HTMLSelectElement>(null);
  const skillRef = useRef<HTMLSelectElement>(null);
  const personRef = useRef<HTMLSelectElement>(null);

  // Get available skills based on selected category
  const availableSkills = selectedCategory ? 
    (categoryToSkills[selectedCategory] || categoryToSkills.default) : 
    categoryToSkills.default;

  // Get available persons based on selected skill
  const availablePersons = selectedSkill ? 
    (persons[selectedSkill] || persons.default) : 
    persons.default;

  // Effect to focus on skill dropdown when category is selected
  useEffect(() => {
    if (selectedCategory && skillRef.current) {
      skillRef.current.focus();
    }
  }, [selectedCategory]);

  // Effect to focus on person dropdown when skill is selected
  useEffect(() => {
    if (selectedSkill && personRef.current) {
      personRef.current.focus();
    }
  }, [selectedSkill]);

  // Function to handle category selection
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSelectedSkill(""); // Reset skill when category changes
    setSelectedPerson(""); // Reset person when category changes
  };

  // Function to handle skill selection
  const handleSkillChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const skill = e.target.value;
    setSelectedSkill(skill);
    setSelectedPerson(""); // Reset person when skill changes
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="border-b-2 border-gray-200 border-dashed mx-auto mt-4 sm:mt-6 md:mt-8 py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8 lg:px-16"
    >
      <div className="flex flex-col items-center justify-center mb-4 sm:mb-6 md:mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-xl sm:text-2xl md:text-3xl text-[#BC0060] mb-4 sm:mb-6"
        >
          رزرو نوبت
        </motion.h1>
      </div>
      
      {/* Date selection buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-12 mb-6 sm:mb-8">
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className="w-full sm:w-auto text-base sm:text-lg md:text-xl bg-[#BC0060] text-white rounded-full h-10 md:h-12 px-4 sm:px-6 md:px-8 mb-3 sm:mb-0"
        >
          انتخاب تاریخ
        </motion.button>
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className="w-full sm:w-auto text-base sm:text-lg md:text-xl bg-gray-100 text-gray-700 rounded-full h-10 md:h-12 px-4 sm:px-6 md:px-8"
        >
          یک‌شنبه 21 اردیبهشت 1404
        </motion.button>
      </div>

      {/* Form fields */}
      <div className="flex flex-col md:flex-row justify-center gap-4 sm:gap-6 md:gap-10" dir="rtl">
        {/* Category dropdown */}
        <motion.div
          variants={dropdownVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="w-full md:w-64 text-right mb-4 md:mb-0"
        >
          <label className="block text-gray-700 font-semibold mb-2">
            دسته بندی
          </label>
          <select
            ref={categoryRef}
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="block w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 appearance-none bg-white"
            autoFocus
          >
            <option value="">انتخاب کنید...</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Skill dropdown */}
        <motion.div
          variants={dropdownVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ delay: 0.1, duration: 0.3 }}
          className="w-full md:w-64 text-right mb-4 md:mb-0"
        >
          <label className="block text-gray-700 font-semibold mb-2">
            خدمات
          </label>
          <select
            ref={skillRef}
            value={selectedSkill}
            onChange={handleSkillChange}
            className={`block w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 appearance-none bg-white ${!selectedCategory ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!selectedCategory}
          >
            <option value="">انتخاب کنید...</option>
            {availableSkills.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Person dropdown */}
        <motion.div
          variants={dropdownVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ delay: 0.2, duration: 0.3 }}
          className="w-full md:w-64 text-right"
        >
          <label className="block text-gray-700 font-semibold mb-2">
            متخصص
          </label>
          <select
            ref={personRef}
            value={selectedPerson}
            onChange={(e) => setSelectedPerson(e.target.value)}
            className={`block w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 appearance-none bg-white ${!selectedSkill ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!selectedSkill}
          >
            <option value="">انتخاب کنید...</option>
            {availablePersons.map((person) => (
              <option key={person} value={person}>
                {person}
              </option>
            ))}
          </select>
        </motion.div>
      </div>

      {/* Submit button - only enabled when all selections are made */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: selectedCategory && selectedSkill && selectedPerson ? 1 : 0, y: selectedCategory && selectedSkill && selectedPerson ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        className="flex justify-center mt-6 sm:mt-8"
      >
        <motion.button
          variants={submitButtonVariants}
          initial="initial"
          animate={selectedCategory && selectedSkill && selectedPerson ? "animate" : "initial"}
          whileHover="hover"
          whileTap="tap"
          className={`px-6 py-2 sm:py-3 rounded-full text-white font-bold text-base sm:text-lg ${
            selectedCategory && selectedSkill && selectedPerson
              ? 'bg-[#BC0060] hover:bg-pink-700 cursor-pointer'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={!(selectedCategory && selectedSkill && selectedPerson)}
        >
          ثبت نوبت
        </motion.button>
      </motion.div>
    </motion.section>
  );
}
