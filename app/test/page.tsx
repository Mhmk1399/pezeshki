"use client";
import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Create an empty component as a placeholder
const KonvaComponent = () => <div>Loading...</div>;

// Dynamically import the actual Konva component with SSR disabled
const DynamicKonvaComponent = dynamic(
  () => import("../../components/CustomShapeKonva"),
  { ssr: false }
);

const CustomShapeKonva = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <motion.div
        className="w-[400px] bg-red-500 rounded-lg shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* White section */}
        <motion.div
          className="bg-white "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-4 pb-0">
            <h3 className="text-lg font-bold text-gray-800">بخش بالایی</h3>
            <p className="text-sm text-gray-600 mb-2">
              این قسمت بالای خط قرار دارد
            </p>
          </div>
        </motion.div>

        {/* Konva line as separator */}
        <div className="relative -mt-[88px]">
          <div className="p-10 absolute top-8 right-36 sm:right-40 bg-white rounded-full w-fit  "></div>
          <DynamicKonvaComponent />
        </div>

        {/* Red section */}
        <motion.div
          className="bg-red-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="p-4 pt-0">
            <h3 className="text-lg font-bold text-white mt-2">بخش پایینی</h3>
            <p className="text-sm text-white">این قسمت زیر خط قرار دارد</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CustomShapeKonva;
