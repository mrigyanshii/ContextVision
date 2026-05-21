import React from 'react';
import { Eye, ArrowLeft, Download, Expand } from 'lucide-react';
import { Link } from 'react-router-dom';

const FunNavbar = ({ onScreenshot, onFullscreen }) => {
  return (
    <nav className="h-16 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md flex items-center justify-between px-6 z-50">
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors">
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Dashboard</span>
        </Link>
        <div className="w-px h-4 bg-zinc-700" />
        <div className="flex items-center gap-2">
          <Eye size={20} className="text-purple-500" />
          <span className="text-zinc-100 font-semibold tracking-wide">
            Context<span className="text-purple-500">Vision</span> <span className="font-light text-zinc-500">| Studio</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={onScreenshot}
          className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          title="Take Screenshot"
        >
          <Download size={18} />
        </button>
        <button 
          onClick={onFullscreen}
          className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          title="Toggle Fullscreen"
        >
          <Expand size={18} />
        </button>
      </div>
    </nav>
  );
};

export default FunNavbar;
