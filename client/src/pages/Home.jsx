import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useDetection } from '../hooks/useDetection';
import Navbar from '../components/Navbar';
import WebcamFeed from '../components/WebcamFeed';
import DetectionCanvas from '../components/DetectionCanvas';
import DetectionCard from '../components/DetectionCard';
import SmartPopup from '../components/SmartPopup';
import { rules } from '../utils/objectRules';

const Home = () => {
  const threshold = 0.35;
  const { videoRef, isModelLoaded, detections, fps, isDetecting, toggleDetection, error } = useDetection(threshold);

  const [activePopups, setActivePopups] = useState([]);
  const [history, setHistory] = useState([]);
  const [cooldowns, setCooldowns] = useState({});

  useEffect(() => {
    if (!detections || detections.length === 0) return;

    const newHistoryItems = [];
    const now = Date.now();
    const COOLDOWN_MS = 15000;

    detections.forEach(det => {
      //add to historyyy
      if (det.score > threshold) {
        newHistoryItems.push({
          className: det.className,
          score: det.score,
          timestamp: now
        });
        const rule = rules[det.className];
        if (rule) {
          const lastSeen = cooldowns[det.className] || 0;
          if (now - lastSeen > COOLDOWN_MS) {
            setActivePopups(prev => {
              // Avoid duplicate popups
              if (prev.some(p => p.className === det.className)) return prev;

              return [...prev, {
                id: `${det.className}-${now}`,
                className: det.className,
                ...rule
              }];
            });

            // Update cooldown
            setCooldowns(prev => ({ ...prev, [det.className]: now }));
          }
        }
      }
    });

    if (newHistoryItems.length > 0) {
      setHistory(prev => {
        // last 50 history items
        const filteredNew = newHistoryItems.filter(item => {
          if (prev.length === 0) return true;
          const lastItem = prev[0];
          return !(lastItem.className === item.className && (now - lastItem.timestamp < 2000)); // 2s deduplication
        });
        return [...filteredNew, ...prev].slice(0, 30);
      });
    }

  }, [detections, threshold, cooldowns]);

  const removePopup = useCallback((id) => {
    setActivePopups(prev => prev.filter(p => p.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1c] text-white flex flex-col font-sans overflow-hidden">
      <Navbar
        isDetecting={isDetecting}
        toggleDetection={toggleDetection}
        fps={fps}
      />

      {error && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 bg-red-950 text-red-400 border border-red-800 px-6 py-3 rounded-xl shadow-sm">
          {error}
        </div>
      )}

      <main className="flex-1 flex gap-6 p-6 h-[calc(100vh-80px)] relative z-0">
        {/* Main View Area */}
        <div className="flex-1 relative flex flex-col">
          {!isModelLoaded && !error ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1a1a1c]/80 backdrop-blur-sm rounded-2xl border border-[#333336] z-20">
              <div className="w-12 h-12 border-4 border-[#333336] border-t-[#60c4f8] rounded-full animate-spin mb-4" />
              <h2 className="text-lg font-semibold text-white tracking-wide">
                Initializing AI Core...
              </h2>
              <p className="text-gray-400 mt-1 text-sm font-medium">Loading Inference Engine</p>
            </div>
          ) : null}

          {/* Camera Feed and Canvas Overlay */}
          <div className="relative flex-1 rounded-2xl overflow-hidden shadow-2xl border border-[#333336] bg-black" style={{ maxHeight: 'calc((100vw - 340px) * 9 / 16)' }}>
            <WebcamFeed ref={videoRef} isDetecting={isDetecting} />
            <DetectionCanvas detections={detections} videoRef={videoRef} />

            {/* Crosshair Overlay */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
              <div className="w-[80%] h-[80%] border border-white/20 relative rounded-3xl">
                <div className="absolute top-0 left-1/2 w-4 h-4 border-t-2 border-[#60c4f8] -translate-x-1/2 -translate-y-1" />
                <div className="absolute bottom-0 left-1/2 w-4 h-4 border-b-2 border-[#60c4f8] -translate-x-1/2 translate-y-1" />
                <div className="absolute left-0 top-1/2 w-4 h-4 border-l-2 border-[#60c4f8] -translate-y-1/2 -translate-x-1" />
                <div className="absolute right-0 top-1/2 w-4 h-4 border-r-2 border-[#60c4f8] -translate-y-1/2 translate-x-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Detection History */}
        <DetectionCard history={history} />
      </main>

      {/* Smart Popups Container */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col justify-end">
        <AnimatePresence>
          {activePopups.map(popup => (
            <SmartPopup key={popup.id} popupData={popup} onClose={removePopup} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
