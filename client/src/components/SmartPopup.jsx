import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Droplet, Smartphone, Laptop, Armchair, User } from 'lucide-react';

const iconMap = {
  Droplet,
  Smartphone,
  Laptop,
  Armchair,
  User
};

const SmartPopup = ({ popupData, onClose }) => {
  useEffect(() => {
    if (popupData) {
      const timer = setTimeout(() => {
        onClose(popupData.id);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [popupData, onClose]);

  if (!popupData) return null;

  const { id, title, message, actionText, color, iconName } = popupData;
  const IconComponent = iconMap[iconName] || User;
  const colorMap = {
    blue: 'border-blue-500 text-blue-600 bg-blue-500/10',
    red: 'border-red-500 text-red-600 bg-red-500/10',
    indigo: 'border-indigo-500 text-indigo-600 bg-indigo-500/10',
    slate: 'border-slate-500 text-slate-600 bg-slate-500/10',
    emerald: 'border-emerald-500 text-emerald-600 bg-emerald-500/10',
  };

  const selectedColors = colorMap[color] || colorMap.blue;
  const [borderColor, textColor, bgColor] = selectedColors.split(' ');

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className={`pro-card p-5 w-80 mb-4 border-l-4 ${borderColor} relative overflow-hidden`}
    >
      <button
        onClick={() => onClose(id)}
        className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition-colors"
      >
        <X size={16} />
      </button>

      <div className="flex items-center gap-2 mb-2">
        <div className={`p-2 rounded-lg ${bgColor} ${textColor}`}>
          <IconComponent size={20} />
        </div>
        <h3 className={`text-sm font-semibold ${textColor}`}>
          {title}
        </h3>
      </div>

      <p className="text-sm text-slate-600 mb-4">
        {message}
      </p>

      <button className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition-colors border border-slate-200">
        {actionText}
      </button>
    </motion.div>
  );
};

export default SmartPopup;
