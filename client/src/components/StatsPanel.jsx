import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const StatsPanel = () => {
  const stats = [
    { label: 'AI Accuracy', value: 97.4, unit: '%', decimals: 1, color: '#38bdf8', glow: 'rgba(56,189,248,0.4)' },
    { label: 'Detection Speed', value: 28, unit: 'ms', decimals: 0, color: '#8b5cf6', glow: 'rgba(139,92,246,0.4)' },
    { label: 'Active Filters', value: 12, unit: '', decimals: 0, color: '#ec4899', glow: 'rgba(236,72,153,0.4)' },
    { label: 'Real-Time FPS', value: 60, unit: ' fps', decimals: 0, color: '#34d399', glow: 'rgba(52,211,153,0.4)' },
  ];

  return (
    <section id="stats" className="relative py-20 px-4" style={{ zIndex: 2 }}>
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="text-xs font-bold tracking-widest px-4 py-2 rounded-full"
          style={{ color: '#38bdf8', background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)' }}>
          SYSTEM METRICS
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white mt-4"
          style={{ fontFamily: "'Outfit', sans-serif" }}>
          Performance{' '}
          <span style={{ background: 'linear-gradient(90deg,#38bdf8,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Dashboard
          </span>
        </h2>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatCard key={s.label} stat={s} delay={i * 0.12} />
        ))}
      </div>
    </section>
  );
};

const StatCard = ({ stat, delay }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          let start = 0;
          const end = stat.value;
          const duration = 1600;
          const step = 16;
          const increment = end / (duration / step);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [stat.value, started]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.04, y: -4 }}
      className="relative rounded-2xl p-6 flex flex-col items-center text-center overflow-hidden"
      style={{
        background: 'rgba(8,13,26,0.8)',
        border: `1px solid ${stat.color}25`,
        boxShadow: `0 0 30px ${stat.glow}10`,
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* BG glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${stat.color}12, transparent 70%)` }} />

      {/* Circular progress ring */}
      <div className="relative w-20 h-20 mb-4">
        <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
          <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
          <circle
            cx="40" cy="40" r="34" fill="none"
            stroke={stat.color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 34}`}
            strokeDashoffset={`${2 * Math.PI * 34 * (1 - Math.min(count / (stat.value * 1.1), 1))}`}
            style={{ filter: `drop-shadow(0 0 6px ${stat.color})`, transition: 'stroke-dashoffset 0.05s' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-black" style={{ color: stat.color, fontFamily: "'Outfit',sans-serif" }}>
            {stat.decimals > 0 ? count.toFixed(stat.decimals) : Math.round(count)}
          </span>
        </div>
      </div>

      <div className="text-2xl font-black text-white mb-1">
        {stat.decimals > 0 ? count.toFixed(stat.decimals) : Math.round(count)}
        <span className="text-base font-semibold" style={{ color: stat.color }}>{stat.unit}</span>
      </div>
      <div className="text-xs font-semibold tracking-wide" style={{ color: 'rgba(148,163,184,0.7)' }}>{stat.label}</div>

      {/* Live pulse dot */}
      <div className="flex items-center gap-1.5 mt-3">
        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: stat.color }} />
        <span className="text-[10px] font-medium" style={{ color: stat.color }}>LIVE</span>
      </div>
    </motion.div>
  );
};

export default StatsPanel;
