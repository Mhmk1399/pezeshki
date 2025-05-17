"use client";

import {
  Phone,
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MegaMenu from "./megaMenu";
import Dropdown from "./dropdown";
import Link from 'next/link';

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

// Define menu item interface
interface MenuItem {
  text: string;
  href: string;
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
    ],
  },
];
// Blog categories for dropdown

// const blogCategories = [
//   { id: 1, name: "سلامت و زیبایی", slug: "health-beauty" },
//   { id: 2, name: "تغذیه", slug: "nutrition" },
//   { id: 3, name: "مراقبت پوست", slug: "skin-care" },
//   { id: 4, name: "مراقبت مو", slug: "hair-care" },
//   { id: 5, name: "آرایش", slug: "makeup" },
// ];

const blogCategories = [
  { id: 1, name: "سلامت و زیبایی", slug: "" },
  { id: 2, name: "تغذیه", slug: "" },
  { id: 3, name: "مراقبت پوست", slug: "" },
  { id: 4, name: "مراقبت مو", slug: "" },
  { id: 5, name: "آرایش", slug: "" },
];



// Define menu items



// Define subcategory children for mobile menu
interface SubCategoryChild {
  id: number;
  name: string;
  slug: string;
}

// Add children to subcategories
const subCategoryChildren: Record<number, SubCategoryChild[]> = {
  // فشارسنج children
  101: [
    { id: 1011, name: "فشارسنج دیجیتال", slug: "digital-blood-pressure" },
    { id: 1012, name: "فشارسنج بازویی", slug: "arm-blood-pressure" },
    { id: 1013, name: "فشارسنج مچی", slug: "wrist-blood-pressure" },
  ],
  // گلوکومتر children
  102: [
    { id: 1021, name: "گلوکومتر خانگی", slug: "home-glucometer" },
    { id: 1022, name: "نوار تست قند خون", slug: "blood-sugar-test-strip" },
  ],
  // پالس اکسیمتر children
  103: [
    { id: 1031, name: "پالس اکسیمتر انگشتی", slug: "finger-pulse-oximeter" },
    { id: 1032, name: "پالس اکسیمتر رومیزی", slug: "desktop-pulse-oximeter" },
  ],
  // دماسنج children
  104: [
    { id: 1041, name: "دماسنج دیجیتال", slug: "digital-thermometer" },
    { id: 1042, name: "دماسنج پیشانی", slug: "forehead-thermometer" },
    { id: 1043, name: "دماسنج گوشی", slug: "ear-thermometer" },
  ],
  // Add more children for other subcategories as needed
  201: [
    { id: 2011, name: "میکروسکوپ نوری", slug: "optical-microscope" },
    { id: 2012, name: "میکروسکوپ دیجیتال", slug: "digital-microscope" },
  ],
  301: [
    { id: 3011, name: "یونیت دندانپزشکی پایه دار", slug: "pedestal-dental-unit" },
    { id: 3012, name: "یونیت دندانپزشکی سیار", slug: "mobile-dental-unit" },
  ],
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [expandedBlogCategory, setExpandedBlogCategory] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [expandedSubCategory, setExpandedSubCategory] = useState<number | null>(null);
  
  // Add timeout refs to handle menu open/close delays
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const megaMenuTriggerRef = useRef<HTMLLIElement | null>(null);
  const dropdownTriggerRef = useRef<HTMLLIElement | null>(null);
  const megaMenuRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Updated menu items with href
  const menuItems: MenuItem[] = [
    { text: "صفحه اصلـی", href: "/" },
    { text: "خدمات ویژه", href: "#" },
    { text: "مجله آموزشی", href: "/blog" },
    { text: "درباره ما", href: "/about" },
    { text: "تماس با ما", href: "/contact" },
  ];

  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  // Handle clicks outside the mega menu and dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close mega menu if clicked outside
      if (
        isMegaMenuOpen &&
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target as Node) &&
        megaMenuTriggerRef.current &&
        !megaMenuTriggerRef.current.contains(event.target as Node)
      ) {
        setIsMegaMenuOpen(false);
      }

      // Close dropdown if clicked outside
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        dropdownTriggerRef.current &&
        !dropdownTriggerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMegaMenuOpen, isDropdownOpen]);

  // Handlers for mega menu
  const handleMegaMenuEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
    
    megaMenuTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(true);
      setIsDropdownOpen(false);
    }, 100);
  };

  const handleMegaMenuLeave = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
    
    megaMenuTimeoutRef.current = setTimeout(() => {
      if (megaMenuRef.current && !megaMenuRef.current.matches(':hover') && 
      megaMenuTriggerRef.current && !megaMenuTriggerRef.current.matches(':hover')) {
    setIsMegaMenuOpen(false);
      }
    }, 300);
  };

  // Handlers for dropdown menu
  const handleDropdownEnter = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
      megaMenuTimeoutRef.current = null;
    }
    
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(true);
      setIsMegaMenuOpen(false);
    }, 100);
  };

  const handleDropdownLeave = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    
    dropdownTimeoutRef.current = setTimeout(() => {
      if (!dropdownRef.current?.matches(':hover') && 
          !dropdownTriggerRef.current?.matches(':hover')) {
        setIsDropdownOpen(false);
      }
    }, 300);
  };

  // Handle mouse enter for menu items
  const handleMouseEnter = (item: string) => {
    if (item === "خدمات ویژه") {
      handleMegaMenuEnter();
    } else if (item === "مجله آموزشی") {
      handleDropdownEnter();
    } else {
      // For other menu items, close both menus with a delay
      if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
      
      megaMenuTimeoutRef.current = setTimeout(() => {
        setIsMegaMenuOpen(false);
      }, 300);
      
      dropdownTimeoutRef.current = setTimeout(() => {
        setIsDropdownOpen(false);
      }, 300);
    }
  };
  
  const toggleCategory = (categoryId: number) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
      setExpandedSubCategory(null); // Also close any expanded subcategory
    } else {
      setExpandedCategory(categoryId);
      setExpandedSubCategory(null); // Reset subcategory when changing category
    }
  };

  const toggleSubCategory = (subCategoryId: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering parent category toggle
    
    if (expandedSubCategory === subCategoryId) {
      setExpandedSubCategory(null);
    } else {
      setExpandedSubCategory(subCategoryId);
    }
  };

  const handleCategoryMouseLeave = () => {
    setExpandedCategory(null);
  };
  
  const toggleBlogCategories = () => {
    setExpandedBlogCategory(!expandedBlogCategory);
  };

  // New function to handle mobile link clicks
  const handleMobileLinkClick = () => {
    // Close the mobile menu when a link is clicked
    setIsMenuOpen(false);
    
    // Also close any expanded categories or dropdowns
    setExpandedCategory(null);
    setExpandedSubCategory(null);
    setExpandedBlogCategory(false);
  };

  // Helper function to check if a subcategory has children
  const hasChildren = (subCategoryId: number): boolean => {
    return !!subCategoryChildren[subCategoryId] && subCategoryChildren[subCategoryId].length > 0;
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
                item.text === "خدمات ویژه"
                  ? megaMenuTriggerRef
                  : item.text === "مجله آموزشی"
                  ? dropdownTriggerRef
                  : null
                }
                className="cursor-pointer hover:text-pink-500 relative"
                onMouseEnter={() => handleMouseEnter(item.text)}
                onMouseLeave={
                  item.text === "خدمات ویژه"
                    ? handleMegaMenuLeave
                    : item.text === "مجله آموزشی"
                    ? handleDropdownLeave
                    : undefined
                }
              >
                {/* Link for all menu items */}
                <Link href={item.href}>
                  <div className="flex items-center gap-1">
                    {item.text}
                    {(item.text === "خدمات ویژه" || item.text === "مجله آموزشی") && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          (item.text === "خدمات ویژه" && isMegaMenuOpen) ||
                          (item.text === "مجله آموزشی" && isDropdownOpen)
                            ? "transform rotate-180"
                            : ""
                        }`}
                      />
                    )}
                  </div>
                </Link>
  
                {item.text === "مجله آموزشی" && isDropdownOpen && (
                  <div
                    className="absolute top-full right-0"
                    ref={dropdownRef}
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                    dir="rtl"
                  >
                    <Dropdown
                      isOpen={isDropdownOpen}
                      items={blogCategories.map((category) => ({
                        ...category,
                        title: category.name,
                        href: "/blog" // Set all blog category links to /blog
                      }))}
                    />
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
            <div className="p-6">
              
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold">منو</h2>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  {/* <X className="w-6 h-6 text-gray-500" /> */}
                </button>
              </div>
  
              <ul className="space-y-4">
                {menuItems.map((item, index) => (
                  <li key={index} className="py-2">
                    {item.text === "خدمات ویژه" ? (
                      <div>
                        <button
                          className="flex items-center justify-between w-full text-right"
                          onClick={() => toggleCategory(0)}
                        >
                          <span className="font-medium">{item.text}</span>
                          <ChevronLeft
                            className={`w-5 h-5 transition-transform duration-300 ${
                              expandedCategory === 0 ? "transform rotate-90" : ""
                            }`}
                          />
                        </button>
  
                        <AnimatePresence>
                          {expandedCategory === 0 && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <ul className="mt-2 space-y-2 pr-4 border-r border-gray-200">
                                {categories.map((category) => (
                                  <li key={category.id}>
                                    <div className="flex items-center justify-between w-full text-right py-1">
                                      <Link 
                                        href={`/category/${category.slug}`}
                                        onClick={handleMobileLinkClick}
                                        className="hover:text-pink-500 transition-colors"
                                      >
                                        {category.name}
                                      </Link>
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          toggleCategory(category.id);
                                        }}
                                        className="p-1"
                                      >
                                        <ChevronLeft
                                          className={`w-4 h-4 transition-transform duration-300 ${
                                            expandedCategory === category.id
                                              ? "transform rotate-90"
                                              : ""
                                          }`}
                                        />
                                      </button>
                                    </div>
  
                                    <AnimatePresence>
                                      {expandedCategory === category.id && (
                                        <motion.ul
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{
                                            height: "auto",
                                            opacity: 1,
                                          }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.3 }}
                                          className="mt-1 space-y-1 pr-4 border-r border-gray-100"
                                        >
                                          {category.subCategories.map(
                                            (subCategory) => (
                                              <li
                                                key={subCategory.id}
                                                className="text-sm"
                                              >
                                                <div className="flex items-center justify-between py-1">
                                                  {/* costumize the link with href={`/category/${category.slug}/${subCategory.slug}`} */}
                                                  <Link 
                                                    href={`/blog`}
                                                    onClick={hasChildren(subCategory.id) ? undefined : handleMobileLinkClick}
                                                    className="text-gray-600 hover:text-pink-500"
                                                  >
                                                    {subCategory.name}
                                                  </Link>
                                                  
                                                  {/* Only show expand button if subcategory has children */}
                                                  {hasChildren(subCategory.id) && (
                                                    <button
                                                      onClick={(e) => toggleSubCategory(subCategory.id, e)}
                                                      className="p-1"
                                                    >
                                                      <ChevronLeft
                                                        className={`w-3 h-3 transition-transform duration-300 ${
                                                          expandedSubCategory === subCategory.id
                                                            ? "transform rotate-90"
                                                            : ""
                                                        }`}
                                                      />
                                                    </button>
                                                  )}
                                                </div>
                                                
                                                {/* Subcategory children */}
                                                <AnimatePresence>
                                                  {expandedSubCategory === subCategory.id && hasChildren(subCategory.id) && (
                                                    <motion.ul
                                                      initial={{ height: 0, opacity: 0 }}
                                                      animate={{
                                                        height: "auto",
                                                        opacity: 1,
                                                      }}
                                                      exit={{ height: 0, opacity: 0 }}
                                                      transition={{ duration: 0.3 }}
                                                      className="mt-1 mb-2 space-y-1 pr-3 border-r border-gray-100"
                                                    >
                                                      {subCategoryChildren[subCategory.id]?.map((child) => (
                                                        <li 
                                                          key={child.id}
                                                          className="text-xs text-gray-500 hover:text-pink-500"
                                                        >
                                                          <Link 
                                                            href={`/category/${category.slug}/${subCategory.slug}/${child.slug}`}
                                                            onClick={handleMobileLinkClick}
                                                            className="block py-1"
                                                          >
                                                            {child.name}
                                                          </Link>
                                                        </li>
                                                      ))}
                                                    </motion.ul>
                                                  )}
                                                </AnimatePresence>
                                              </li>
                                            )
                                          )}
                                        </motion.ul>
                                      )}
                                    </AnimatePresence>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : item.text === "مجله آموزشی" ? (
                      <div>
                        <button
                          className="flex items-center justify-between w-full text-right"
                          onClick={toggleBlogCategories}
                        >
                          <span className="font-medium">{item.text}</span>
                          <ChevronLeft
                            className={`w-5 h-5 transition-transform duration-300 ${
                              expandedBlogCategory ? "transform rotate-90" : ""
                            }`}
                          />
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
                              <ul className="mt-2 space-y-2 pr-4 border-r border-gray-200">
                                {blogCategories.map((category) => (
                                  <li
                                    key={category.id}
                                    className="text-sm text-gray-600 hover:text-pink-500"
                                  >
                                    <Link 
                                      href="/blog" 
                                      onClick={handleMobileLinkClick}
                                      className="block py-1"
                                    >
                                      {category.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="block font-medium hover:text-pink-500"
                        onClick={handleMobileLinkClick}
                      >
                        {item.text}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
  
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition-colors">
                  عضویت
                </button>
                <div className="flex items-center justify-center mt-4 gap-2">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">۰۹۱۲۳۴۵۶۷۸۹</span>
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
            ref={megaMenuRef}
            className="absolute top-full left-0 right-0 w-full z-40"
            onMouseEnter={handleMegaMenuEnter}
            onMouseLeave={handleMegaMenuLeave}
          >
            <MegaMenu isOpen={isMegaMenuOpen} />
          </div>
        )}
      </div>
    );
  };
  
  export default Navbar;
  
