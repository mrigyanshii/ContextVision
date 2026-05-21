import React, { useState, useEffect, useRef } from 'react';
import FunNavbar from '../components/FunNavbar';
import EffectsSidebar from '../components/EffectsSidebar';
import ActivityPanel from '../components/ActivityPanel';
import WebcamCanvas from '../components/WebcamCanvas';
import MemePopup from '../components/MemePopup';
import { useFunEffects } from '../hooks/useFunEffects';
import { useDetection } from '../hooks/useDetection';
import { useFaceTracking } from '../hooks/useFaceTracking';
import { captureScreenshot } from '../utils/screenshotUtils';

const FunMode = () => {
  const { activeFilter, setActiveFilter, intensity, setIntensity } = useFunEffects();
  const { videoRef, isModelLoaded, detections, fps, isDetecting, toggleDetection } = useDetection(0.4);
  const { isModelsLoaded, faces } = useFaceTracking(videoRef, isDetecting);
  const canvasRef = useRef(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPhoneWarning, setShowPhoneWarning] = useState(false);

  // Auto-start detection when models are loaded
  useEffect(() => {
    if (isModelLoaded && isModelsLoaded && !isDetecting) {
      toggleDetection();
    }
  }, [isModelLoaded, isModelsLoaded, isDetecting, toggleDetection]);

  // Check for cell phone
  useEffect(() => {
    const hasPhone = detections.some(d => d.className === 'cell phone');
    if (hasPhone && !showPhoneWarning) {
      setShowPhoneWarning(true);
      // Auto hide after 3 seconds
      const timer = setTimeout(() => setShowPhoneWarning(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [detections, showPhoneWarning]);

  const handleScreenshot = () => {
    captureScreenshot(videoRef, canvasRef);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="h-screen bg-[#1a1a1c] text-slate-100 flex flex-col font-sans overflow-hidden">
      <FunNavbar 
        onScreenshot={handleScreenshot} 
        onFullscreen={toggleFullscreen} 
      />

      <div className="flex-1 flex overflow-hidden">
        <EffectsSidebar 
          activeFilter={activeFilter} 
          setActiveFilter={setActiveFilter}
          intensity={intensity}
          setIntensity={setIntensity}
        />

        <main className="flex-1 relative p-6 bg-black/40 flex flex-col">
          {(!isModelLoaded || !isModelsLoaded) && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#1a1a1c]/80 backdrop-blur-md">
              <div className="w-12 h-12 border-4 border-zinc-800 border-t-purple-500 rounded-full animate-spin mb-4" />
              <h2 className="text-lg font-semibold text-zinc-100">Initializing AR Engine...</h2>
              <p className="text-zinc-500 mt-1 text-sm">Loading Neural Networks</p>
            </div>
          )}

          <MemePopup show={showPhoneWarning} />

          <div className="flex-1 w-full max-w-6xl mx-auto flex flex-col relative">
            <WebcamCanvas 
              ref={canvasRef}
              videoRef={videoRef}
              isDetecting={isDetecting}
              detections={detections}
              faces={faces}
              activeFilter={activeFilter}
              intensity={intensity}
            />
          </div>
        </main>
      </div>

      <ActivityPanel 
        fps={fps}
        isFaceDetected={faces && faces.length > 0}
        detections={detections}
        activeFilter={activeFilter}
      />
    </div>
  );
};

export default FunMode;
