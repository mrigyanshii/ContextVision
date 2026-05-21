import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Eye, Shield } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import FloatingParticles from '../components/FloatingParticles';
import DashboardNavbar from '../components/DashboardNavbar';
import ModeCard from '../components/ModeCard';

const NORMAL_MODE = {
  title: 'Focus Mode',
  subtitle: 'AI Productivity & Detection',
  description: 'Enterprise-grade object detection and smart productivity system for professionals who demand precision.',
  features: [
    'Real-time object detection',
    'Smart contextual alerts',
    'Historical analytics',
    'Privacy-first local processing',
  ],
  buttonText: 'Launch Focus Mode',
  route: '/normal-mode',
  icon: Shield,
  accentColor: '#3b82f6',
  badge: 'PRODUCTIVITY',
};

const FUN_MODE = {
  title: 'Fun Mode',
  subtitle: 'Interactive Filters & Effects',
  description: 'Engaging interactive filters and augmented reality overlays powered by real-time computer vision.',
  features: [
    'Face and expression filters',
    'Augmented reality overlays',
    'Interactive particle effects',
    'Customizable soundboard',
  ],
  buttonText: 'Launch Fun Mode',
  route: '/fun-mode',
  icon: Sparkles,
  accentColor: '#8b5cf6',
  badge: 'ENTERTAINMENT',
};

const Dashboard = () => {
  useEffect(() => {
    document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'hidden'; };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col text-slate-100" style={{ fontFamily: "'Inter', sans-serif", background: '#1a1a1c', overflowX: 'hidden' }}>
      <AnimatedBackground />
      <FloatingParticles />
      <DashboardNavbar />

      <main className="relative flex-1 flex flex-col items-center justify-center w-full" style={{ zIndex: 2 }}>
        <div className="w-full max-w-5xl mx-auto px-4 flex flex-col lg:flex-row gap-8 justify-center items-stretch">
          <ModeCard {...NORMAL_MODE} />
          <ModeCard {...FUN_MODE} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
