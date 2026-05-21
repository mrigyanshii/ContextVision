export const captureScreenshot = (videoRef, canvasRef) => {
  if (!videoRef.current || !canvasRef.current) return;

  const video = videoRef.current;
  const overlayCanvas = canvasRef.current;

  // Create an offscreen canvas matching the video's actual dimensions
  const captureCanvas = document.createElement('canvas');
  captureCanvas.width = video.videoWidth;
  captureCanvas.height = video.videoHeight;
  
  const ctx = captureCanvas.getContext('2d');
  
  // Draw the video frame
  ctx.drawImage(video, 0, 0, captureCanvas.width, captureCanvas.height);
  
  // Draw the AR overlay (scale if needed)
  ctx.drawImage(overlayCanvas, 0, 0, captureCanvas.width, captureCanvas.height);

  // Convert to image and trigger download
  const dataUrl = captureCanvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `ContextVision_AR_${Date.now()}.png`;
  link.href = dataUrl;
  link.click();
};
