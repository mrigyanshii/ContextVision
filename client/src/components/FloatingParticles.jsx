import React, { useState, useEffect } from 'react';

const PARTICLES_CONFIG = [
  ...Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.3 + 0.1,
    speedY: -((Math.random() * 0.03) + 0.01), // drifting slowly upwards
    color: '#94a3b8', // slate-400
  })),
];

const FloatingParticles = () => {
  const [particles, setParticles] = useState(PARTICLES_CONFIG);

  useEffect(() => {
    let raf;
    const animate = () => {
      setParticles(prev =>
        prev.map(p => {
          let ny = p.y + p.speedY;
          if (ny < -5) ny = 105;
          return { ...p, y: ny };
        })
      );
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            backgroundColor: p.color,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
