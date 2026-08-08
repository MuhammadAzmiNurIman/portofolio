import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header({ activeTab, setActiveTab, onOpenContact }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (id) => {
    if (id === 'contact') {
      onOpenContact();
    } else {
      setActiveTab(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <div className="h-20 w-full px-4 md:px-margin flex items-center justify-between">

        {/* Availability Status Badge & Location Pill (Blue & White Theme, No Logo) */}
        <div className="flex items-center gap-4 md:gap-5">
          {/* Status Badge */}
          <div
            onClick={() => setActiveTab('home')}
            className="border-4 border-black bg-primary text-white px-3 py-1.5 font-display text-xs md:text-sm font-extrabold uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 cursor-pointer hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            title="Go to Home"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <span>AVAILABLE FOR WORK</span>
          </div>

          {/* Location Badge */}
          <div className="hidden sm:flex items-center gap-1.5 border-4 border-black bg-white text-primary px-3 py-1.5 font-display text-xs md:text-sm font-extrabold uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span>📍</span>
            <span>INDONESIA</span>
          </div>
        </div>

        {/* Desktop Navigation (Original Style Restored) */}
        <nav className="hidden md:flex items-center gap-md">
          {navItems.map((item) => {
            const isActive = activeTab === item.id && item.id !== 'contact';
            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick(item.id)}
                className={`px-sm py-xs border-4 border-black font-display font-bold text-sm tracking-wider uppercase transition-all ${isActive
                    ? 'bg-primary text-white translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-primary-container text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  }`}
              >
                {item.label}
              </motion.button>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 border-4 border-black bg-primary text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          <span className="material-symbols-outlined font-bold">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Drawer Menu (Original Style Restored) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t-4 border-black px-4 py-6 flex flex-col gap-4 shadow-[0px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="w-full text-left bg-primary text-white border-4 border-black p-3 font-display font-bold text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
