import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { soundManager } from '../utils/soundManager';

const MemePopup = ({ show }) => {
  useEffect(() => {
    if (show) {
      soundManager.playAlert();
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 15 }}
          className="absolute top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <div className="bg-zinc-900/90 backdrop-blur-xl border border-red-500/50 p-6 rounded-2xl shadow-[0_0_40px_rgba(239,68,68,0.2)] flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center animate-pulse">
              <AlertTriangle className="text-red-500" size={24} />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-zinc-100 tracking-tight">Focus Recommended</h2>
              <p className="text-sm text-red-400 font-medium mt-1 uppercase tracking-widest">Phone Detected in frame</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MemePopup;
