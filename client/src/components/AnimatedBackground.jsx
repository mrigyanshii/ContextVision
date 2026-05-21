import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animFrame;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const drawGrid = () => {
      const cellSize = 80;
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 1;
      const cols = Math.ceil(canvas.width / cellSize) + 1;
      const rows = Math.ceil(canvas.height / cellSize) + 1;
      const offsetX = (t * 0.1) % cellSize;
      const offsetY = (t * 0.05) % cellSize;

      for (let i = 0; i < cols; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize - offsetX, 0);
        ctx.lineTo(i * cellSize - offsetX, canvas.height);
        ctx.stroke();
      }
      for (let j = 0; j < rows; j++) {
        ctx.beginPath();
        ctx.moveTo(0, j * cellSize - offsetY);
        ctx.lineTo(canvas.width, j * cellSize - offsetY);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#1a1a1c'; // matching productive mode black
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      
      // subtle gradient top
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.4);
      grad.addColorStop(0, 'rgba(255,255,255,0.02)'); // subtle white
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height * 0.4);

      t++;
      animFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default AnimatedBackground;
