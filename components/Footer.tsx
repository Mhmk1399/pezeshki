'use client'

import Image from "next/image";
import { Phone, Mail, Instagram, Twitter } from 'lucide-react';
import Link from "next/link";

export default function Footer() {
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto" dir="rtl">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* First column - About */}
          <div className="flex flex-col max-w-md">
            <div className="flex flex-row items-center mb-4">
              <Image
                src="/image1.jpg"
                width={500}
                height={500}
                className="w-16 h-16 bg-pink-700 rounded-full"
                alt="Logo"
              />
              <h3 className="mr-4 text-xl font-bold text-gray-800">ممد سایت</h3>
            </div>
            <p className="text-right text-gray-500 text-sm sm:text-base">
              مجیک سالن با بهره‌گیری از جدیدترین تکنیک‌های زیبایی و آرایشی، بهترین
              خدمات آرایشی، مراقبتی و پوست را در فضایی حرفه‌ای، دل‌نشین و مدرن
              ارائه می‌دهد. ما با تمرکز بر کیفیت بالا، رضایت مشتری و به‌کارگیری
              محصولات اصل و معتبر، تلاش می‌کنیم تجربه‌ای متفاوت، خاص و
              به‌یادماندنی برای شما رقم بزنیم.
            </p>
          </div>

          {/* Second column - Gallery and Social */}
          <div className="flex flex-col gap-6">
            {/* Gallery */}
            <div className="flex flex-row gap-2 sm:gap-4">
              <Image
                src="/namad-1.png"
                width={200}
                height={200}
                className="rounded-lg overflow-hidden object-cover"
                alt="Gallery image 1"
              />
              <Image
                src="/namad-2.png"
                width={200}
                height={200}
                className="rounded-lg overflow-hidden object-cover"
                alt="Gallery image 2"
              />
              <Image
                src="/namad-3.png"
                width={200}
                height={200}
                className="rounded-lg overflow-hidden object-cover"
                alt="Gallery image 3"
              />
            </div>
            
            <div className="flex flex-row items-end justify-end gap-4 sm:gap-6">
              <div className="p-2 bg-gray-200 rounded-lg">
                <Link href="#" className="text-pink-500">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                </Link>
              </div>
              <div className="p-2 bg-gray-200 rounded-lg">
                <Link href="#" className="text-pink-500">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </Link>
              </div>
              <div className="p-2 bg-gray-200 rounded-lg">
                <Link href="#" className="text-pink-500">
                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                </Link>
              </div>
              <div className="p-2 bg-gray-200 rounded-lg">
                <Link href="#" className="text-pink-500">
                  <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pink block with scroll-to-top circle */}
      <div className="relative mt-5">
        {/* Circle button */}
        <button
          onClick={scrollToTop}
          className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 w-16 h-16 bg-pink-700 rounded-full shadow-lg flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-pink-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>

        {/* Pink footer content */}
        <div className="flex justify-between items-center bg-pink-600 p-10" dir="rtl">
          <div>
            <p className="text-white text-lg">تمام حقوق برای شرکت مجیک بیوتی محفوظ است</p>
            <p className="text-white text-lg">طراح گرافیک متیس دیزاین</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-white text-lg">© 2022 | Designed by</p>
            <p className="text-white text-lg">METISDESIGN.IR</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
