import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check } from 'lucide-react';

const ModeCard = ({
  title,
  subtitle,
  description,
  features,
  buttonText,
  route,
  icon: Icon,
  accentColor,
  badge,
  isComingSoon = false,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={!isComingSoon ? { y: -4 } : {}}
      className={`relative rounded-xl border border-zinc-800 bg-zinc-800/40 backdrop-blur-sm overflow-hidden flex flex-col flex-1 min-w-[280px] max-w-[540px] shadow-lg ${isComingSoon ? 'opacity-80' : ''}`}
    >
      <div className="p-8 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 rounded-lg bg-zinc-800/80 border border-zinc-700">
            <Icon size={24} style={{ color: accentColor }} />
          </div>
          {isComingSoon && (
            <span className="text-[10px] font-bold tracking-wider px-2 py-1 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
              COMING SOON
            </span>
          )}
          {!isComingSoon && (
            <span className="text-[10px] font-bold tracking-wider px-2 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
              {badge}
            </span>
          )}
        </div>

        <h3 className="text-2xl font-bold text-zinc-100 mb-1">{title}</h3>
        <p className="text-sm font-medium text-zinc-400 mb-4">{subtitle}</p>
        <p className="text-sm text-zinc-400 leading-relaxed mb-6 pb-6 border-b border-zinc-700/50">
          {description}
        </p>

        <ul className="flex flex-col gap-3 mb-8 flex-1">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
              <Check size={16} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => !isComingSoon && navigate(route)}
          disabled={isComingSoon}
          className={`w-full py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
            isComingSoon 
              ? 'bg-zinc-800 border border-zinc-700 text-zinc-500 cursor-not-allowed' 
              : 'bg-zinc-100 text-zinc-900 hover:bg-white'
          }`}
        >
          {buttonText}
          {!isComingSoon && <ChevronRight size={16} />}
        </button>
      </div>
    </motion.div>
  );
};

export default ModeCard;
