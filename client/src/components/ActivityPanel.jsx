import React from 'react';
import { Activity, Camera, Layers } from 'lucide-react';
import { FILTERS } from '../hooks/useFunEffects';

const ActivityPanel = ({ fps, isFaceDetected, detections, activeFilter }) => {
  const filterNameMap = {
    [FILTERS.NONE]: 'Standby',
    [FILTERS.CAT_EARS]: 'Neural Ears Active',
    [FILTERS.GLASSES]: 'Holo-Visor Active',
    [FILTERS.LASER_EYES]: 'Laser Protocol Active',
    [FILTERS.CROWN]: 'Digital Crown Active',
    [FILTERS.GLITCH]: 'System Glitch Injected'
  };

  const detectedObjects = [...new Set(detections.map(d => d.className))].join(', ') || 'Scanning...';

  return (
    <div className="h-16 bg-zinc-900 border-t border-zinc-800 flex items-center px-6 justify-between text-sm shrink-0">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Activity size={16} className={isFaceDetected ? "text-emerald-500" : "text-zinc-500"} />
          <span className="text-zinc-400">
            Face Lock: <span className={isFaceDetected ? "text-emerald-400 font-mono" : "text-zinc-500 font-mono"}>{isFaceDetected ? 'ENGAGED' : 'SEARCHING'}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Layers size={16} className={activeFilter !== FILTERS.NONE ? "text-purple-500" : "text-zinc-500"} />
          <span className="text-zinc-400">
            AR Node: <span className="text-zinc-200">{filterNameMap[activeFilter]}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Camera size={16} className="text-blue-500" />
          <span className="text-zinc-400">
            Env Scan: <span className="text-blue-400 capitalize">{detectedObjects}</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="px-3 py-1 bg-zinc-800 rounded font-mono text-xs text-zinc-400 border border-zinc-700">
          SYS_FPS: <span className={fps > 20 ? "text-emerald-400" : "text-amber-400"}>{fps}</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityPanel;
