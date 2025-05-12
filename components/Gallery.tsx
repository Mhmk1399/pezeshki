"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pointer } from "lucide-react";

// Sample gallery items - replace with your actual data
const galleryItems = [
    { id: 1, category: "all", image: "/image1.jpg", title: "Gallery Item 1" }, 
    { id: 2, category: "makeup", image: "/image2.jpg", title: "Gallery Item 2" },
    { id: 3, category: "skincare", image: "/image3.jpg", title: "Gallery Item 3" },
    { id: 4, category: "hairstyle", image: "/image1.jpg", title: "Gallery Item 4" },
    { id: 5, category: "makeup", image: "/image2.jpg", title: "Gallery Item 5" },
    { id: 6, category: "skincare", image: "/image3.jpg", title: "Gallery Item 6" },
    { id: 7, category: "hairstyle", image: "/image1.jpg", title: "Gallery Item 7" },
    { id: 8, category: "makeup", image: "/image2.jpg", title: "Gallery Item 8" },
  ];
  

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredItems, setFilteredItems] = useState(galleryItems);

  // Filter categories
  const categories = [
    { id: "all", label: "نمایش همه" },
    { id: "skincare", label: "پاکسازی صورت" },
    { id: "hairstyle", label: "شنیون" },
    { id: "makeup", label: "میکاپ" },
  ];

  // Handle filter change
  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    
    if (category === "all") {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(galleryItems.filter(item => item.category === category));
    }
  };

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const buttonVariants = {
    inactive: { 
      backgroundColor: "rgb(252, 231, 243)",
      scale: 1
    },
    active: { 
      backgroundColor: "rgb(244, 114, 182)",
      color: "white",
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    },
    hover: { 
      scale: 1.1,
      transition: {
        duration: 0.2
      }
    },
    tap: { 
      scale: 0.95
    }
  };

  return (
    <section dir="rtl" className="py-12 px-4">
      <motion.h2 
        className="text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        گالری نمونه کارها
      </motion.h2>
      
      {/* Filter buttons */}
      <motion.div 
        className="flex flex-wrap justify-center items-center gap-4 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => handleFilterChange(category.id)}
            className="rounded-full py-2 px-4 font-medium cursor-pointer"
            variants={buttonVariants}
            initial="inactive"
            animate={activeFilter === category.id ? "active" : "inactive"}
            whileHover="hover"
            whileTap="tap"
            transition={{ duration: 0.3 }}
          >
            {category.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Gallery grid */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeFilter}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
              layoutId={`gallery-item-${item.id}`}
            >
              <motion.div className="relative h-64 w-full overflow-hidden">
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <motion.div className="p-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.category}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty state */}
      {filteredItems.length === 0 && (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xl text-gray-500">هیچ موردی یافت نشد.</p>
        </motion.div>
      )}
    </section>
  );
}
