import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardNavbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-[#1a1a1c]/90 border-b border-slate-800' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="w-full px-6 md:px-10 lg:px-12">
        <div className="flex items-center justify-start h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Eye size={22} className="text-blue-500" />
            <span className="text-slate-100 font-semibold text-lg tracking-wide">
              Context<span className="text-blue-500">Vision</span>
            </span>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default DashboardNavbar;
