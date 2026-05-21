import React, { useEffect, useRef, forwardRef } from 'react';
import { FILTERS } from '../hooks/useFunEffects';
import { drawCatEars, drawGlasses, drawLaserEyes, drawCrown, applyGlitch } from '../filters/drawFilters';

const WebcamCanvas = forwardRef(({ videoRef, isDetecting, detections, faces, activeFilter, intensity }, ref) => {
  const canvasRef = ref || useRef(null);
  const requestRef = useRef();

  const drawOverlay = () => {
    if (!videoRef.current || !canvasRef.current) {
      requestRef.current = requestAnimationFrame(drawOverlay);
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Ensure canvas dimensions match video display dimensions precisely
    if (video.videoWidth > 0 && (canvas.width !== video.clientWidth || canvas.height !== video.clientHeight)) {
      canvas.width = video.clientWidth;
      canvas.height = video.clientHeight;
    }

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scaleX = canvas.width / video.videoWidth || 1;
    const scaleY = canvas.height / video.videoHeight || 1;

    // 1. Draw YOLO Object Detections (excluding person to keep it clean)
    detections.forEach(det => {
      if (det.className === 'person') return; // Fixed det.class to det.className

      const [x1, y1, x2, y2] = det.box;
      const x = x1 * scaleX;
      const y = y1 * scaleY;
      const w = (x2 - x1) * scaleX;
      const h = (y2 - y1) * scaleY;

      ctx.strokeStyle = det.className === 'cell phone' ? 'rgba(239, 68, 68, 0.8)' : 'rgba(56, 189, 248, 0.5)';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, w, h);

      ctx.fillStyle = ctx.strokeStyle;
      ctx.font = '12px monospace';
      ctx.fillText(`${det.className} ${Math.round(det.score * 100)}%`, x, y > 15 ? y - 5 : y + 15);
    });

    // 2. Draw Face AR Filters
    if (faces && faces.length > 0) {
      faces.forEach(face => {
        // Adjust face landmarks scaling just in case (face-api usually handles it, but verify)
        switch (activeFilter) {
          case FILTERS.CAT_EARS:
            drawCatEars(ctx, face);
            break;
          case FILTERS.GLASSES:
            drawGlasses(ctx, face);
            break;
          case FILTERS.LASER_EYES:
            drawLaserEyes(ctx, face, intensity);
            break;
          case FILTERS.CROWN:
            drawCrown(ctx, face);
            break;
          default:
            break;
        }
      });
    }

    // 3. Post-processing effects
    if (activeFilter === FILTERS.GLITCH) {
      applyGlitch(ctx, canvas.width, canvas.height, intensity);
    }

    requestRef.current = requestAnimationFrame(drawOverlay);
  };

  useEffect(() => {
    if (isDetecting) {
      requestRef.current = requestAnimationFrame(drawOverlay);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isDetecting, detections, faces, activeFilter, intensity]);

  return (
    <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex items-center justify-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute w-full h-full object-cover"
        style={{ transform: 'scaleX(-1)' }} // Mirror video
      />
      <canvas
        ref={canvasRef}
        className="absolute w-full h-full object-cover pointer-events-none"
        style={{ transform: 'scaleX(-1)' }} // Mirror canvas to match video
      />
      
      {/* Cinematic Scanning Line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl opacity-30">
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-[scan_3s_ease-in-out_infinite]" />
      </div>
      
      {/* Corner Brackets */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-zinc-500/50 rounded-tl-lg pointer-events-none" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-zinc-500/50 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-zinc-500/50 rounded-bl-lg pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-zinc-500/50 rounded-br-lg pointer-events-none" />
    </div>
  );
});

export default WebcamCanvas;
