export function drawGlasses(ctx, face) {
  const landmarks = face.landmarks;
  const leftEye = landmarks.getLeftEye();
  const rightEye = landmarks.getRightEye();

  const getCenter = (pts) => {
    const x = pts.reduce((sum, p) => sum + p.x, 0) / pts.length;
    const y = pts.reduce((sum, p) => sum + p.y, 0) / pts.length;
    return { x, y };
  };

  const leftCenter = getCenter(leftEye);
  const rightCenter = getCenter(rightEye);
  
  const dx = rightCenter.x - leftCenter.x;
  const dy = rightCenter.y - leftCenter.y;
  const angle = Math.atan2(dy, dx);
  const dist = Math.sqrt(dx*dx + dy*dy);
  
  const glassWidth = dist * 2.2;
  const glassHeight = glassWidth * 0.4;
  
  ctx.save();
  ctx.translate((leftCenter.x + rightCenter.x) / 2, (leftCenter.y + rightCenter.y) / 2);
  ctx.rotate(angle);
  
  // Draw sleek futuristic glasses
  ctx.strokeStyle = '#0ea5e9'; // cyan glow
  ctx.shadowColor = '#0ea5e9';
  ctx.shadowBlur = 15;
  ctx.lineWidth = 3;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.7)'; // dark slate glassmorphism
  
  ctx.beginPath();
  ctx.roundRect(-glassWidth/2, -glassHeight/2, glassWidth, glassHeight, 8);
  ctx.fill();
  ctx.stroke();

  // Bridge
  ctx.beginPath();
  ctx.moveTo(-dist/4, 0);
  ctx.lineTo(dist/4, 0);
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.restore();
}

export function drawCatEars(ctx, face) {
  const landmarks = face.landmarks;
  const jawline = landmarks.getJawOutline();
  
  if(jawline.length < 17) return;
  
  const leftPoint = jawline[0]; // Leftmost temple
  const rightPoint = jawline[16]; // Rightmost temple
  
  const dx = rightPoint.x - leftPoint.x;
  const dy = rightPoint.y - leftPoint.y;
  const width = Math.sqrt(dx*dx + dy*dy);
  const angle = Math.atan2(dy, dx);
  
  const earSize = width * 0.35;
  
  ctx.save();
  ctx.translate(leftPoint.x + dx/2, leftPoint.y + dy/2);
  ctx.rotate(angle);
  
  ctx.strokeStyle = '#d946ef'; // pink/fuchsia glow
  ctx.shadowColor = '#d946ef';
  ctx.shadowBlur = 20;
  ctx.lineWidth = 3;
  ctx.fillStyle = 'rgba(217, 70, 239, 0.2)';
  
  // Left ear
  ctx.beginPath();
  ctx.moveTo(-width/2 + earSize*0.2, -width*0.4);
  ctx.lineTo(-width/2 + earSize*0.6, -width*0.8);
  ctx.lineTo(-width/2 + earSize, -width*0.4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Right ear
  ctx.beginPath();
  ctx.moveTo(width/2 - earSize, -width*0.4);
  ctx.lineTo(width/2 - earSize*0.6, -width*0.8);
  ctx.lineTo(width/2 - earSize*0.2, -width*0.4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  ctx.restore();
}

export function drawLaserEyes(ctx, face, intensity = 1) {
  const landmarks = face.landmarks;
  const leftEye = landmarks.getLeftEye();
  const rightEye = landmarks.getRightEye();

  const getCenter = (pts) => {
    const x = pts.reduce((sum, p) => sum + p.x, 0) / pts.length;
    const y = pts.reduce((sum, p) => sum + p.y, 0) / pts.length;
    return { x, y };
  };

  const leftCenter = getCenter(leftEye);
  const rightCenter = getCenter(rightEye);

  const drawLaser = (start) => {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    // Lasers shoot straight down/out
    ctx.lineTo(start.x, start.y + 1000);
    
    ctx.strokeStyle = `rgba(239, 68, 68, ${intensity})`; // red laser
    ctx.lineWidth = 15;
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 30;
    ctx.stroke();
    
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 4;
    ctx.shadowBlur = 10;
    ctx.stroke();
  };

  drawLaser(leftCenter);
  drawLaser(rightCenter);
}

export function drawCrown(ctx, face) {
  const landmarks = face.landmarks;
  const jawline = landmarks.getJawOutline();
  
  const leftPoint = jawline[0];
  const rightPoint = jawline[16];
  
  const dx = rightPoint.x - leftPoint.x;
  const dy = rightPoint.y - leftPoint.y;
  const width = Math.sqrt(dx*dx + dy*dy);
  const angle = Math.atan2(dy, dx);
  
  ctx.save();
  ctx.translate(leftPoint.x + dx/2, leftPoint.y + dy/2 - width*0.6); // above head
  ctx.rotate(angle);
  
  const cw = width * 0.8;
  const ch = cw * 0.4;
  
  ctx.strokeStyle = '#f59e0b'; // amber/gold
  ctx.shadowColor = '#f59e0b';
  ctx.shadowBlur = 25;
  ctx.lineWidth = 3;
  ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
  
  ctx.beginPath();
  ctx.moveTo(-cw/2, 0);
  ctx.lineTo(-cw/2, -ch*0.6);
  ctx.lineTo(-cw/4, -ch);
  ctx.lineTo(0, -ch*0.5);
  ctx.lineTo(cw/4, -ch);
  ctx.lineTo(cw/2, -ch*0.6);
  ctx.lineTo(cw/2, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  ctx.restore();
}

export function applyGlitch(ctx, canvasWidth, canvasHeight, intensity = 0.8) {
  if (Math.random() > intensity) return;
  
  const sliceY = Math.random() * canvasHeight;
  const sliceH = Math.random() * 50 + 10;
  const offset = (Math.random() - 0.5) * 40 * intensity;
  
  const imageData = ctx.getImageData(0, sliceY, canvasWidth, sliceH);
  ctx.putImageData(imageData, offset, sliceY);
  
  // Color channel shift
  ctx.fillStyle = `rgba(255, 0, 0, ${intensity * 0.2})`;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}
