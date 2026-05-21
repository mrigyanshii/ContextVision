import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Glasses, Zap, Crown, Cpu, Volume2, VolumeX, EyeOff } from 'lucide-react';
import { FILTERS } from '../hooks/useFunEffects';
import { soundManager } from '../utils/soundManager';

const EffectOption = ({ icon: Icon, label, isActive, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02, x: 4 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => {
      soundManager.playUIClick();
      onClick();
    }}
    onMouseEnter={() => soundManager.playUIHover()}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 ${
      isActive 
        ? 'bg-purple-500/20 border border-purple-500/50 text-purple-300' 
        : 'bg-zinc-800/40 border border-zinc-700/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
    }`}
  >
    <Icon size={18} className={isActive ? 'text-purple-400' : ''} />
    <span className="text-sm font-medium">{label}</span>
    {isActive && (
      <motion.div layoutId="active-indicator" className="ml-auto w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
    )}
  </motion.button>
);

const EffectsSidebar = ({ activeFilter, setActiveFilter, intensity, setIntensity }) => {
  const [soundEnabled, setSoundEnabled] = React.useState(soundManager.enabled);

  const toggleSound = () => {
    setSoundEnabled(soundManager.toggleSound());
  };

  return (
    <div className="w-64 bg-zinc-900/50 border-r border-zinc-800 p-4 flex flex-col gap-6 backdrop-blur-md h-full overflow-y-auto">
      <div>
        <h3 className="text-xs font-bold tracking-wider text-zinc-500 mb-4 px-2 uppercase">AR Filters</h3>
        <div className="flex flex-col gap-2">
          <EffectOption 
            icon={EyeOff} label="None" 
            isActive={activeFilter === FILTERS.NONE} 
            onClick={() => setActiveFilter(FILTERS.NONE)} 
          />
          <EffectOption 
            icon={Sparkles} label="Cat Ears" 
            isActive={activeFilter === FILTERS.CAT_EARS} 
            onClick={() => setActiveFilter(FILTERS.CAT_EARS)} 
          />
          <EffectOption 
            icon={Glasses} label="Holo Glasses" 
            isActive={activeFilter === FILTERS.GLASSES} 
            onClick={() => setActiveFilter(FILTERS.GLASSES)} 
          />
          <EffectOption 
            icon={Zap} label="Laser Eyes" 
            isActive={activeFilter === FILTERS.LASER_EYES} 
            onClick={() => setActiveFilter(FILTERS.LASER_EYES)} 
          />
          <EffectOption 
            icon={Crown} label="Digital Crown" 
            isActive={activeFilter === FILTERS.CROWN} 
            onClick={() => setActiveFilter(FILTERS.CROWN)} 
          />
          <EffectOption 
            icon={Cpu} label="RGB Glitch" 
            isActive={activeFilter === FILTERS.GLITCH} 
            onClick={() => setActiveFilter(FILTERS.GLITCH)} 
          />
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-zinc-800/50">
        <h3 className="text-xs font-bold tracking-wider text-zinc-500 mb-4 px-2 uppercase">Settings</h3>
        
        <div className="px-2 mb-4">
          <div className="flex justify-between text-xs text-zinc-400 mb-2">
            <span>Intensity</span>
            <span>{Math.round(intensity * 100)}%</span>
          </div>
          <input 
            type="range" min="0" max="1" step="0.1" 
            value={intensity} onChange={(e) => setIntensity(parseFloat(e.target.value))}
            className="w-full accent-purple-500 bg-zinc-800 h-1 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <button
          onClick={toggleSound}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-800/40 border border-zinc-700/50 text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          <span className="text-sm font-medium">{soundEnabled ? 'Sound On' : 'Sound Off'}</span>
        </button>
      </div>
    </div>
  );
};

export default EffectsSidebar;
