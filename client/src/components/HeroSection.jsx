import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center text-center px-4 w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-sm font-medium border border-blue-500/20 bg-blue-500/10 text-blue-400"
      >
        <Shield size={14} />
        Enterprise-Grade Computer Vision
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-slate-100"
      >
        Intelligent Vision <br className="hidden sm:block" />
        <span className="text-blue-500">for Modern Workflows</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl"
      >
        Advanced real-time object detection and contextual analysis powered by edge AI. 
        Enhance productivity with secure, local processing.
      </motion.p>
    </div>
  );
};

export default HeroSection;
