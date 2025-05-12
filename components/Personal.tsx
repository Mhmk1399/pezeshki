'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaTelegram, FaTwitter, FaLinkedin, FaWhatsapp, FaYoutube } from 'react-icons/fa';

// Define types for team members
interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

interface TeamMember {
  name: string;
  title: string;
  description: string;
  image: string;
  socialLinks: SocialLink[];
}

// Sample team members data - expanded to 6 members
const teamMembers: TeamMember[] = [
  {
    name: 'دکتر سارا محمدی',
    title: 'متخصص پوست و مو',
    description: 'دکتر سارا محمدی با بیش از 10 سال تجربه در زمینه پوست و مو، خدمات تخصصی در زمینه زیبایی و سلامت پوست ارائه می‌دهد.',
    image: '/image1.jpg',
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com', icon: <FaInstagram size={20} /> },
      { platform: 'Telegram', url: 'https://telegram.org', icon: <FaTelegram size={20} /> },
      { platform: 'Twitter', url: 'https://twitter.com', icon: <FaTwitter size={20} /> },
    ]
  },
  {
    name: 'مریم احمدی',
    title: 'متخصص آرایش و زیبایی',
    description: 'مریم احمدی کارشناس ارشد آرایش و زیبایی با تخصص در میکاپ حرفه‌ای و طراحی ناخن است.',
    image: '/image2.jpg',
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com', icon: <FaInstagram size={20} /> },
      { platform: 'LinkedIn', url: 'https://linkedin.com', icon: <FaLinkedin size={20} /> },
    ]
  },
  {
    name: 'زهرا کریمی',
    title: 'متخصص مو و رنگ',
    description: 'زهرا کریمی متخصص در زمینه کراتینه، رنگ مو و ترمیم موهای آسیب دیده با بیش از 8 سال سابقه کار.',
    image: '/image3.jpg',
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com', icon: <FaInstagram size={20} /> },
      { platform: 'Telegram', url: 'https://telegram.org', icon: <FaTelegram size={20} /> },
    ]
  },
  {
    name: 'نیلوفر رضایی',
    title: 'متخصص ناخن',
    description: 'نیلوفر رضایی با 6 سال تجربه در زمینه طراحی و ترمیم ناخن، خدمات مانیکور و پدیکور حرفه‌ای ارائه می‌دهد.',
    image: '/image1.jpg',
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com', icon: <FaInstagram size={20} /> },
      { platform: 'WhatsApp', url: 'https://whatsapp.com', icon: <FaWhatsapp size={20} /> },
    ]
  },
  {
    name: 'فاطمه حسینی',
    title: 'متخصص اپیلاسیون',
    description: 'فاطمه حسینی متخصص در زمینه اپیلاسیون و خدمات مراقبت از پوست با استفاده از جدیدترین تکنیک‌های روز دنیا.',
    image: '/image2.jpg',
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com', icon: <FaInstagram size={20} /> },
      { platform: 'YouTube', url: 'https://youtube.com', icon: <FaYoutube size={20} /> },
    ]
  },
  {
    name: 'سمیرا نجفی',
    title: 'متخصص میکروبلیدینگ',
    description: 'سمیرا نجفی متخصص در زمینه میکروبلیدینگ ابرو و تاتو با بیش از 5 سال سابقه کار و گواهینامه‌های بین‌المللی.',
    image: '/image3.jpg',
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com', icon: <FaInstagram size={20} /> },
      { platform: 'Telegram', url: 'https://telegram.org', icon: <FaTelegram size={20} /> },
    ]
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
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

const TeamMembers: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);

  // Create a duplicate array for infinite scrolling
  const extendedMembers = [...teamMembers, ...teamMembers, ...teamMembers];

  // Update visible items based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Autoplay functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoplayEnabled) {
      interval = setInterval(() => {
        handleNext();
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentIndex, autoplayEnabled]);

  // Scroll to index
  const scrollToIndex = (index: number) => {
    if (sliderRef.current) {
      // Calculate the width of each item including gap
      const itemWidth = sliderRef.current.offsetWidth / visibleItems;
      
      // Calculate the scroll position
      const scrollPosition = index * itemWidth;
      
      // Smooth scroll to the position
      sliderRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      
      // Update current index
      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    const newIndex = currentIndex === 0 
      ? teamMembers.length - 1 
      : currentIndex - 1;
    
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex === teamMembers.length - 1 
      ? 0 
      : currentIndex + 1;
    
    scrollToIndex(newIndex);
  };

  // Handle mouse events for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
    setAutoplayEnabled(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    if (sliderRef.current) {
      const x = e.pageX - (sliderRef.current.offsetLeft || 0);
      const walk = (x - startX) * 2; // Scroll speed multiplier
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setAutoplayEnabled(true);
    
    // Snap to closest item
    if (sliderRef.current) {
      const itemWidth = sliderRef.current.offsetWidth / visibleItems;
      const scrollPosition = sliderRef.current.scrollLeft;
      const newIndex = Math.round(scrollPosition / itemWidth) % teamMembers.length;
      
      scrollToIndex(newIndex);
    }
  };

  // Handle scroll event to update current index
  const handleScroll = () => {
    if (sliderRef.current && !isDragging) {
      const itemWidth = sliderRef.current.offsetWidth / visibleItems;
      const scrollPosition = sliderRef.current.scrollLeft;
      const newIndex = Math.round(scrollPosition / itemWidth) % teamMembers.length;
      
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', handleScroll);
      return () => slider.removeEventListener('scroll', handleScroll);
    }
  }, [currentIndex]);

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2" dir="rtl">تیم متخصصین ما</h2>
          <p className="text-gray-600 max-w-2xl mx-auto" dir="rtl">
            با تیم متخصص و حرفه‌ای ما آشنا شوید. ما با افتخار خدمات زیبایی با کیفیت را به شما ارائه می‌دهیم.
          </p>
        </motion.div>

        {/* Slider controls */}
        <div className="flex justify-between items-center mb-8 px-4">
          <motion.button
            onClick={handlePrev}
            className="bg-white border border-gray-200 text-pink-600 text-xl cursor-pointer rounded-full w-10 h-10 flex items-center justify-center hover:bg-pink-50 transition-colors shadow-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            ‹
          </motion.button>
          
          <div className="flex gap-2">
            {teamMembers.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => scrollToIndex(index)}
                className="w-2 h-2 rounded-full bg-pink-300"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  scale: index === currentIndex ? 1.2 : 1,
                  backgroundColor: index === currentIndex ? "rgb(244, 114, 182)" : "rgb(249, 168, 212)",
                }}
                transition={{ duration: 0.3 }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <motion.button
            onClick={handleNext}
            className="bg-white border border-gray-200 text-pink-600 text-xl cursor-pointer rounded-full w-10 h-10 flex items-center justify-center hover:bg-pink-50 transition-colors shadow-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            ›
          </motion.button>
        </div>

        {/* Slider container */}
        <div 
          className="overflow-hidden cursor-grab"
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <motion.div 
            className="flex"
            style={{ 
              display: 'flex',
              gap: '2rem',
              willChange: 'transform'
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {extendedMembers.map((member, index) => (
              <motion.div 
                key={index}
                className={`flex-none ${
                  visibleItems === 1 ? 'w-full' : 
                  visibleItems === 2 ? 'w-[calc(50%-1rem)]' : 
                  'w-[calc(33.333%-1.33rem)]'
                }`}
                variants={itemVariants}
              >
                <motion.div 
                  className="relative bg-white rounded-lg shadow-md overflow-visible p-6 pt-16 mt-16 border border-gray-100 h-full"
                  whileHover={{ 
                    y: -5, 
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    backgroundColor: '#fdf2f8' // Very light pink background on hover
                  }}
                >
                  {/* Image positioned at top-right, half extending outside the card */}
                  <div className="absolute -top-16 right-6">
                    <motion.div 
                                            className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg"
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.2, duration: 0.4 }}
                                          >
                                            <Image 
                                              src={member.image} 
                                              alt={member.name} 
                                              fill 
                                              style={{ objectFit: 'cover' }} 
                                              sizes="128px"
                                            />
                                          </motion.div>
                                        </div>
                      
                                        {/* Name and title next to the image */}
                                        <div className="flex flex-row justify-between items-center mb-6" dir="rtl">
                                          <div className="flex-1 pr-36"> {/* Add padding to avoid overlapping with image */}
                                            <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                                            <p className="text-pink-600 font-medium">{member.title}</p>
                                          </div>
                                        </div>
                      
                                        {/* Description */}
                                        <div className="mb-4 text-gray-600 text-sm" dir="rtl">
                                          <p>{member.description}</p>
                                        </div>
                      
                                        {/* Separator line */}
                                        <div className="border-t border-gray-200 my-4"></div>
                      
                                        {/* Social media section */}
                                        <div className="flex items-center justify-between" dir="rtl">
                                          <span className="text-gray-700 font-medium">شبکه‌های اجتماعی:</span>
                                          <div className="flex gap-3">
                                            {member.socialLinks.map((link, idx) => (
                                              <motion.a
                                                key={idx}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-500 hover:text-pink-600 transition-colors"
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}
                                              >
                                                {link.icon}
                                              </motion.a>
                                            ))}
                                          </div>
                                        </div>
                                      </motion.div>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              </div>
                            </div>
                          </section>
                        );
                      };
                      
                      export default TeamMembers;
                      
