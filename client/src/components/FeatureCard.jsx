import React from 'react';
import { motion } from 'framer-motion';
import { Scan, BellDot, Smile, Zap, Monitor, Cpu } from 'lucide-react';

const FEATURES = [
  {
    icon: Scan,
    title: 'Real-Time Detection',
    desc: 'Blazing-fast object detection powered by ONNX Runtime with sub-30ms latency.',
    color: '#38bdf8',
    glow: 'rgba(56,189,248,0.3)',
    gradient: 'linear-gradient(135deg, #0ea5e9, #2563eb)',
  },
  {
    icon: BellDot,
    title: 'AI Smart Alerts',
    desc: 'Context-aware notifications triggered by detected objects with cooldown management.',
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.3)',
    gradient: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
  },
  {
    icon: Smile,
    title: 'Fun Meme Filters',
    desc: 'Snapchat-style AR overlays with cat ears, laser eyes, and explosion effects.',
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.3)',
    gradient: 'linear-gradient(135deg, #db2777, #9333ea)',
  },
  {
    icon: Zap,
    title: 'High Performance',
    desc: 'GPU-accelerated inference pipeline delivering 60+ FPS with optimized WebGL backend.',
    color: '#34d399',
    glow: 'rgba(52,211,153,0.3)',
    gradient: 'linear-gradient(135deg, #10b981, #0ea5e9)',
  },
  {
    icon: Monitor,
    title: 'Cyberpunk UI',
    desc: 'Cinematic glassmorphism interface with neon glow, animated grids, and hologram effects.',
    color: '#fb923c',
    glow: 'rgba(251,146,60,0.3)',
    gradient: 'linear-gradient(135deg, #ea580c, #dc2626)',
  },
  {
    icon: Cpu,
    title: 'Real-Time Processing',
    desc: 'Edge-ready AI model runs entirely in the browser — zero server latency, full privacy.',
    color: '#fbbf24',
    glow: 'rgba(251,191,36,0.3)',
    gradient: 'linear-gradient(135deg, #d97706, #b45309)',
  },
];

const FeatureCard = () => {
  return (
    <section id="features" className="relative py-20 px-4" style={{ zIndex: 2 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="text-xs font-bold tracking-widest px-4 py-2 rounded-full"
          style={{ color: '#8b5cf6', background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}>
          CAPABILITIES
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white mt-4"
          style={{ fontFamily: "'Outfit', sans-serif" }}>
          Core{' '}
          <span style={{ background: 'linear-gradient(90deg,#8b5cf6,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Features
          </span>
        </h2>
        <p className="text-sm mt-3 max-w-xl mx-auto" style={{ color: 'rgba(148,163,184,0.7)' }}>
          Everything you need for an AI-powered vision experience — from real-time detection to immersive AR effects.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map((f, i) => (
          <FeatureItem key={f.title} feature={f} index={i} />
        ))}
      </div>
    </section>
  );
};

const FeatureItem = ({ feature, index }) => {
  const Icon = feature.icon;
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ y: -6, scale: 1.02 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-xl p-6 overflow-hidden"
      style={{
        background: 'rgba(8,13,26,0.8)',
        border: `1px solid ${hovered ? feature.color + '40' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hovered ? `0 0 30px ${feature.glow}` : 'none',
        backdropFilter: 'blur(16px)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      {/* BG gradient */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 0% 0%, ${feature.color}10, transparent 60%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ background: feature.gradient, boxShadow: `0 0 20px ${feature.glow}` }}
      >
        <Icon size={22} className="text-white" />
      </div>

      <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: 'rgba(148,163,184,0.75)' }}>{feature.desc}</p>

      {/* Corner accent */}
      <div
        className="absolute bottom-0 right-0 w-16 h-16 rounded-tl-2xl pointer-events-none transition-opacity duration-300"
        style={{ background: `linear-gradient(135deg, transparent 50%, ${feature.color}12)`, opacity: hovered ? 1 : 0 }}
      />
    </motion.div>
  );
};

export default FeatureCard;
