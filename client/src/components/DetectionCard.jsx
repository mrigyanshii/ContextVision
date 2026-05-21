import React from 'react';
import { Activity, Clock } from 'lucide-react';

const DetectionCard = ({ history }) => {
  return (
    <div className="pro-card w-72 p-5 flex flex-col hidden md:flex border-[#333336] bg-[#1a1a1c]/60 backdrop-blur-md" style={{ height: 'calc(100vh - 80px)' }}>
      <div className="flex items-center gap-2 mb-6 border-b border-[#333336] pb-4">
        <Activity className="text-[#60c4f8] drop-shadow-[0_0_5px_rgba(96,196,248,0.5)]" size={20} />
        <h2 className="text-xs font-bold text-gray-200 tracking-[0.15em] uppercase">Vision Activity</h2>
      </div>

      <div className="flex-1 overflow-y-scroll pr-1 min-h-0" style={{ scrollbarWidth: 'thin', scrollbarColor: '#3f3f46 transparent' }}>
        {history.length === 0 ? (
          <div className="text-center text-gray-500 mt-10 text-sm">
            Waiting for detections...
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#242427] border border-[#333336] rounded-xl p-3 flex justify-between items-center animate-in fade-in slide-in-from-left-2 shadow-sm"
              >
                <div>
                  <div className="text-gray-200 font-medium capitalize text-sm">{item.className}</div>
                  <div className="text-[10px] text-gray-500 flex items-center gap-1 mt-1 font-medium">
                    <Clock size={10} />
                    {new Date(item.timestamp).toLocaleTimeString([], { hour12: false })}
                  </div>
                </div>
                <div className="bg-[#333336] text-[#60c4f8] px-2 py-1 rounded text-xs font-semibold">
                  {(item.score * 100).toFixed(0)}%
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetectionCard;
