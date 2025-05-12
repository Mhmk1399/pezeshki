'use client'

import { Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    'صفحه اصلـی',
    'خدمات ویژه',
    'مجله آموزشی',
    'درباره ما',
    'تماس با ما'
  ];

  return (
    <nav className='relative flex justify-between p-5 shadow-2xs' dir='rtl'>
      <div className='flex gap-3'>
        <Phone className='w-12 h-10 bg-pink-300 rounded-full p-2 text-black cursor-pointer' />
        <p className='text-2xl font-black'>مجیک سالن</p>    
      </div>

      {/* Desktop Menu */}
      <ul className='hidden md:flex gap-5 items-center font-bold'>
        {menuItems.map((item, index) => (
          <li key={index} className='cursor-pointer hover:text-pink-500'>{item}</li>
        ))}
      </ul>

      <div className='hidden md:flex gap-4 items-center'>
      <span className='text-gray-700 font-medium'>۰۹۱۲۳۴۵۶۷۸۹</span>
      <Phone className='w-5 h-5 text-black cursor-pointer' />
        <button className='bg-pink-300 rounded-full px-4 py-2 cursor-pointer hover:bg-pink-400'>عضویت</button> 
        <div className='flex items-center gap-2'>
          <Phone className='w-12 h-10 bg-pink-300 rounded-full p-2 text-black cursor-pointer' />
        </div>
      </div>
      

      {/* Mobile Menu Button */}
      <button 
        className='md:hidden z-50'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <X className='w-8 h-8 text-pink-500' />
        ) : (
          <Menu className='w-8 h-8 text-pink-500' />
        )}
      </button>

      {/* Mobile Sliding Menu */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
        style={{ zIndex: 40 }}
      >
        <div className='pt-20 px-4'>
          <ul className='flex flex-col gap-4'>
            {menuItems.map((item, index) => (
              <li 
                key={index} 
                className='px-4 py-2 cursor-pointer hover:bg-pink-50 rounded-lg transition-colors'
              >
                {item}
              </li>
            ))}
          </ul>
          <div className='mt-8 flex flex-col gap-4'>
            <button className='bg-pink-300 rounded-full px-4 py-2 cursor-pointer hover:bg-pink-400 transition-colors'>
              عضویت
            </button>
            <div className='flex justify-center items-center gap-2'>
              <span className='text-gray-700 font-medium'>۰۹۱۲۳۴۵۶۷۸۹</span>
              <Phone className='w-12 h-10 bg-pink-300 rounded-full p-2 text-black cursor-pointer' />
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className='fixed inset-0 bg-black bg-opacity-50 md:hidden'
          style={{ zIndex: 30 }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
