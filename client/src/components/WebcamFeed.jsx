import React from 'react';

const WebcamFeed = React.forwardRef(({ isDetecting }, ref) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black rounded-2xl overflow-hidden">
      <video
        ref={ref}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />
      {/* Scanning effect overlay */}
      {isDetecting && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="w-full h-0.5 bg-brand-primary/50 shadow-[0_0_10px_rgba(37,99,235,0.5)] animate-[scan_2.5s_ease-in-out_infinite]" />
        </div>
      )}

      {/* CSS Animation for scanning effect */}
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-10px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
});

WebcamFeed.displayName = 'WebcamFeed';

export default WebcamFeed;
