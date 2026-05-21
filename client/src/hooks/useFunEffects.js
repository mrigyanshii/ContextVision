import { useState, useCallback } from 'react';

export const FILTERS = {
  NONE: 'none',
  GLASSES: 'glasses',
  CAT_EARS: 'cat_ears',
  LASER_EYES: 'laser_eyes',
  CROWN: 'crown',
  GLITCH: 'glitch'
};

export function useFunEffects() {
  const [activeFilter, setActiveFilter] = useState(FILTERS.NONE);
  const [intensity, setIntensity] = useState(0.8);
  const [showParticles, setShowParticles] = useState(true);

  const toggleFilter = useCallback((filter) => {
    setActiveFilter(prev => prev === filter ? FILTERS.NONE : filter);
  }, []);

  return {
    activeFilter,
    setActiveFilter: toggleFilter,
    intensity,
    setIntensity,
    showParticles,
    setShowParticles
  };
}
