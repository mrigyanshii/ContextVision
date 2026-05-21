import React from 'react';
import { ScanEye, Power } from 'lucide-react';

const Navbar = ({ isDetecting, toggleDetection, fps }) => {
  return (
    <nav className="w-full h-20 px-8 flex items-center justify-between z-10 relative bg-[#131315]/80 backdrop-blur-xl border-b border-[#2d2d30] shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-5">
        {/* Stylish Logo Icon */}
        <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-[#60c4f8]/20 to-transparent border border-[#60c4f8]/30 shadow-[0_0_15px_rgba(96,196,248,0.2)] group overflow-hidden">
          <div className="absolute inset-0 bg-[#60c4f8]/10 animate-pulse"></div>
          <ScanEye className="text-[#60c4f8] relative z-10" size={24} strokeWidth={1.5} />
        </div>

        {/* Logo Text with Playwrite GB S */}
        <div className="flex flex-col justify-center">
          <h1
            className="text-[26px] font-normal text-white tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-[#60c4f8]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            ContextVision
          </h1>
          <div className="flex items-center gap-2 -mt-1">
            {/* <div className="w-1.5 h-1.5 rounded-full bg-[#60c4f8] animate-pulse shadow-[0_0_5px_#60c4f8]"></div> */}
            {/* <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.25em]">
              Neural Engine
            </p> */}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">

        <div className="flex items-center gap-6 h-12">
          <div className="flex flex-col items-end min-w-[50px]">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">FPS</span>
            <span className={`text-xl font-black font-mono tracking-tighter ${fps > 15 ? 'text-[#60c4f8]' : 'text-amber-500'}`}>
              {fps}
            </span>
          </div>

          <button
            onClick={toggleDetection}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-md hover:-translate-y-0.5 ${isDetecting
              ? 'bg-[#242427] text-red-400 border border-red-900/50 hover:bg-[#2d2d30]'
              : 'bg-[#60c4f8] hover:bg-[#4ebaf0] text-black border border-transparent'
              }`}
          >
            <Power size={18} strokeWidth={2.5} />
            {isDetecting ? 'Stop Detecting' : 'Start Detecting'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
