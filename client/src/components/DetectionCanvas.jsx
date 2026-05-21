import React, { useRef, useEffect } from 'react';

const DetectionCanvas = ({ detections, videoRef }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !videoRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = videoRef.current.clientWidth;
    canvas.height = videoRef.current.clientHeight;

    const originalW = videoRef.current.videoWidth || canvas.width;
    const originalH = videoRef.current.videoHeight || canvas.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate scaling factors between original video size and actual video display size
    const scaleX = canvas.width / originalW;
    const scaleY = canvas.height / originalH;

    detections.forEach(det => {
      const [x1, y1, x2, y2] = det.box;

      const rectX = x1 * scaleX;
      const rectY = y1 * scaleY;
      const rectW = (x2 - x1) * scaleX;
      const rectH = (y2 - y1) * scaleY;

      // Draw bounding box
      ctx.strokeStyle = '#3b82f6'; // brand-accent
      ctx.lineWidth = 2;
      ctx.strokeRect(rectX, rectY, rectW, rectH);

      // Draw label background
      const text = `${det.className} ${(det.score * 100).toFixed(0)}%`;
      ctx.font = '500 12px Inter, sans-serif';
      const textWidth = ctx.measureText(text).width;

      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(rectX, rectY > 20 ? rectY - 22 : rectY, textWidth + 12, 22);

      // Draw label text
      ctx.fillStyle = '#ffffff';
      ctx.fillText(text, rectX + 6, rectY > 20 ? rectY - 6 : rectY + 16);
    });
  }, [detections, videoRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    />
  );
};

export default DetectionCanvas;
