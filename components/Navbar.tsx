"use client";

import {
  Phone,
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MegaMenu from "./megaMenu";
import Dropdown from "./dropdown";

// Fake data structure for categories (same as in MegaMenu.tsx)
interface SubCategory {
  id: number;
  name: string;
  slug: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  subCategories: SubCategory[];
}

// Sample data
const categories: Category[] = [
  {
    id: 1,
    name: "تجهیزات پزشکی",
    slug: "medical-equipment",
    image: "/image1.jpg",
    subCategories: [
      { id: 101, name: "فشارسنج", slug: "blood-pressure-monitor" },
      { id: 102, name: "گلوکومتر", slug: "glucometer" },
      { id: 103, name: "پالس اکسیمتر", slug: "pulse-oximeter" },
      { id: 104, name: "دماسنج", slug: "thermometer" },
    ],
  },
  {
    id: 2,
    name: "لوازم آزمایشگاهی",
    slug: "laboratory-equipment",
    image: "/image1.jpg",
    subCategories: [
      { id: 201, name: "میکروسکوپ", slug: "microscope" },
      { id: 202, name: "سانتریفیوژ", slug: "centrifuge" },
      { id: 203, name: "اتوکلاو", slug: "autoclave" },
    ],
  },
  {
    id: 3,
    name: "تجهیزات دندانپزشکی",
    slug: "dental-equipment",
    image: "/image1.jpg",
    subCategories: [
      { id: 301, name: "یونیت دندانپزشکی", slug: "dental-unit" },
      { id: 302, name: "توربین", slug: "turbine" },
      { id: 303, name: "آمالگاماتور", slug: "amalgamator" },
    ],
  },
  {
    id: 4,
    name: "تجهیزات بیمارستانی",
    slug: "hospital-equipment",
    image: "/image1.jpg",
    subCategories: [
      { id: 401, name: "تخت بیمارستانی", slug: "hospital-bed" },
      { id: 402, name: "ونتیلاتور", slug: "ventilator" },
      { id: 403, name: "مانیتور علائم حیاتی", slug: "vital-signs-monitor" },
    ],
  },
  {
    id: 5,
    name: "لوازم مصرفی پزشکی",
    slug: "medical-consumables",
    image: "/image1.jpg",
    subCategories: [
      { id: 501, name: "سرنگ", slug: "syringe" },
      { id: 502, name: "دستکش", slug: "gloves" },
      { id: 503, name: "ماسک", slug: "mask" },
      { id: 504, name: "گاز استریل", slug: "sterile-gauze" },
    ],
  },
];
const blogCategories = [
  { id: 1, title: "آموزش پزشکی", slug: "medical-education" },
  { id: 2, title: "سلامت و تندرستی", slug: "health-wellness" },
  { id: 3, title: "تغذیه و رژیم غذایی", slug: "nutrition-diet" },
  { id: 4, title: "روانشناسی و سلامت روان", slug: "psychology-mental-health" },
  { id: 5, title: "اخبار پزشکی", slug: "medical-news" },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [expandedBlogCategory, setExpandedBlogCategory] = useState(false);

  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const megaMenuTriggerRef = useRef<HTMLLIElement>(null);
  const dropdownTriggerRef = useRef<HTMLLIElement>(null);

  const menuItems = [
    "صفحه اصلـی",
    "خدمات ویژه",
    "مجله آموزشی",
    "درباره ما",
    "تماس با ما",
  ];

  const handleMouseEnter = (item: string) => {
    if (item === "خدمات ویژه") {
      setIsMegaMenuOpen(true);
      setIsDropdownOpen(false);
    } else if (item === "مجله آموزشی") {
      setIsDropdownOpen(true);
      setIsMegaMenuOpen(false);
    } else {
      setIsMegaMenuOpen(false);
      setIsDropdownOpen(false);
    }
  };

  const handleMouseLeave = () => {
    setIsMegaMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const toggleCategory = (categoryId: number) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };
  const toggleBlogCategories = () => {
    setExpandedBlogCategory(!expandedBlogCategory);
  };

  return (
    <div className="relative">
      <nav className="relative flex justify-between p-5 shadow-2xs" dir="rtl">
        <div className="flex gap-3">
          <Phone className="w-12 h-10 bg-pink-300 rounded-full p-2 text-black cursor-pointer" />
          <p className="text-2xl font-black">مجیک سالن</p>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-5 items-center font-bold">
          {menuItems.map((item, index) => (
            <li
              key={index}
              ref={
                item === "خدمات ویژه"
                  ? megaMenuTriggerRef
                  : item === "مجله آموزشی"
                  ? dropdownTriggerRef
                  : null
              }
              className="cursor-pointer hover:text-pink-500 relative"
              onMouseEnter={() => handleMouseEnter(item)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center gap-1">
                {item}
                {(item === "خدمات ویژه" || item === "مجله آموزشی") && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      (item === "خدمات ویژه" && isMegaMenuOpen) ||
                      (item === "مجله آموزشی" && isDropdownOpen)
                        ? "transform rotate-180"
                        : ""
                    }`}
                  />
                )}
              </div>

              {item === "مجله آموزشی" && (
                <div
                  className="absolute top-full right-0"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                  dir="rtl"
                >
                  <Dropdown isOpen={isDropdownOpen} items={blogCategories} />
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden md:flex gap-4 items-center">
          <span className="text-gray-700 font-medium">۰۹۱۲۳۴۵۶۷۸۹</span>
          <Phone className="w-5 h-5 text-black cursor-pointer" />
          <button className="bg-pink-300 rounded-full px-4 py-2 cursor-pointer hover:bg-pink-400">
            عضویت
          </button>
          <div className="flex items-center gap-2">
            <Phone className="w-12 h-10 bg-pink-300 rounded-full p-2 text-black cursor-pointer" />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-8 h-8 text-pink-500" />
          ) : (
            <Menu className="w-8 h-8 text-pink-500" />
          )}
        </button>

        {/* Mobile Sliding Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
          style={{ zIndex: 40 }}
        >
          <div className="pt-20 px-4 pb-20">
            <ul className="flex flex-col gap-2">
              {menuItems.map((item, index) => {
                if (item === "خدمات ویژه") {
                  return (
                    <div key={index} className="mb-2">
                      <div className="px-4 py-3 cursor-pointer hover:bg-pink-50 rounded-lg transition-colors flex justify-between items-center bg-pink-100">
                        <span className="font-bold text-pink-600">{item}</span>
                        <ChevronDown className="w-5 h-5 text-pink-600" />
                      </div>

                      {/* Categories in Mobile Menu */}
                      <div className="mt-2 border-r-2 border-pink-200 pr-2 mr-2">
                        {categories.map((category) => (
                          <div key={category.id} className="mb-2">
                            <button
                              onClick={() => toggleCategory(category.id)}
                              className="w-full px-4 py-2 flex justify-between items-center rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <span className="font-medium">
                                {category.name}
                              </span>
                              <motion.div
                                animate={{
                                  rotate:
                                    expandedCategory === category.id ? 90 : 0,
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronLeft className="w-5 h-5 text-gray-500" />
                              </motion.div>
                            </button>

                            <AnimatePresence>
                              {expandedCategory === category.id && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <ul className="pr-4 mr-2 mt-1 border-r-2 border-gray-200">
                                    {category.subCategories.map(
                                      (subCategory) => (
                                        <motion.li
                                          key={subCategory.id}
                                          initial={{ x: -10, opacity: 0 }}
                                          animate={{ x: 0, opacity: 1 }}
                                          transition={{ duration: 0.2 }}
                                          className="py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors"
                                        >
                                          <a
                                            href={`/category/${category.slug}/${subCategory.slug}`}
                                            className="block"
                                          >
                                            <div className="flex items-center">
                                              <ChevronRight className="w-4 h-4 ml-2 text-gray-400" />
                                              <span>{subCategory.name}</span>
                                            </div>
                                          </a>
                                        </motion.li>
                                      )
                                    )}
                                    <motion.li
                                      initial={{ x: -10, opacity: 0 }}
                                      animate={{ x: 0, opacity: 1 }}
                                      transition={{ duration: 0.2, delay: 0.2 }}
                                    >
                                      <a
                                        href={`/category/${category.slug}`}
                                        className="block py-2 px-3 text-pink-600 font-medium mt-1"
                                      >
                                        مشاهده همه {category.name}
                                      </a>
                                    </motion.li>
                                  </ul>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                } else if (item === "مجله آموزشی") {
                  // Blog menu item with dropdown
                  return (
                    <div key={index} className="mb-2">
                      <button
                        onClick={toggleBlogCategories}
                        className="w-full px-4 py-3 cursor-pointer hover:bg-pink-50 rounded-lg transition-colors flex justify-between items-center"
                      >
                        <span className="font-medium">{item}</span>
                        <motion.div
                          animate={{ rotate: expandedBlogCategory ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {expandedBlogCategory && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <ul className="pr-4 mr-2 mt-1 border-r-2 border-pink-200">
                              {blogCategories.map((category) => (
                                <motion.li
                                  key={category.id}
                                  initial={{ x: -10, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ duration: 0.2 }}
                                  className="py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                  <a
                                    href={`/blog/${category.slug}`}
                                    className="block"
                                  >
                                    <div className="flex items-center">
                                      <ChevronRight className="w-4 h-4 ml-2 text-gray-400" />
                                      <span>{category.title}</span>
                                    </div>
                                  </a>
                                </motion.li>
                              ))}
                              <motion.li
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.2, delay: 0.2 }}
                              >
                                <a
                                  href="/blog"
                                  className="block py-2 px-3 text-pink-600 font-medium mt-1"
                                >
                                  مشاهده همه مقالات
                                </a>
                              </motion.li>
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <li
                    key={index}
                    className="px-4 py-3 cursor-pointer hover:bg-pink-50 rounded-lg transition-colors"
                  >
                    {item}
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-col gap-4">
              <button className="bg-pink-300 rounded-full px-4 py-2 cursor-pointer hover:bg-pink-400 transition-colors">
                عضویت
              </button>
              <div className="flex justify-center items-center gap-2">
                <span className="text-gray-700 font-medium">۰۹۱۲۳۴۵۶۷۸۹</span>
                <Phone className="w-12 h-10 bg-pink-300 rounded-full p-2 text-black cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
            style={{ zIndex: 30 }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </nav>

      {/* Full-width Mega Menu positioned outside the nav container */}
      {isMegaMenuOpen && (
        <div
          className="absolute top-full left-0 right-0 w-full z-40"
          onMouseEnter={() => setIsMegaMenuOpen(true)}
          onMouseLeave={() => setIsMegaMenuOpen(false)}
        >
          <MegaMenu isOpen={isMegaMenuOpen} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
