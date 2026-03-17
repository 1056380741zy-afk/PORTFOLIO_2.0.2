import React from 'react';
import { Info } from 'lucide-react';

interface MetricItemProps {
  label: string;
  value: string;
  avg: string;
  status?: string;
  delta?: string;
  tooltip?: string;
  isInteractive?: boolean;
}

export const MetricItem: React.FC<MetricItemProps> = ({
  label,
  value,
  avg,
  status,
  delta,
  tooltip,
  isInteractive = false
}) => {
  return (
    <div className={`flex flex-col items-center p-2 rounded-lg transition-all ${
      isInteractive 
        ? 'border-l border-[#2d2d2d]/5 hover:bg-white hover:shadow-[0_0_20px_rgba(105,64,165,0.15)] cursor-pointer' 
        : 'relative group/tooltip'
    }`}>
      <div className="flex items-center gap-1.5">
        <div className="text-xl sm:text-2xl font-black text-accent-purple">{value}</div>
        {tooltip && (
          <div className="relative cursor-help">
            <Info size={14} className="text-gray-400/60 hover:text-accent-purple transition-colors" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-text-dark text-white text-[10px] leading-relaxed rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 text-center font-medium pointer-events-none">
              {tooltip}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-text-dark"></div>
            </div>
          </div>
        )}
      </div>
      <div className="text-[10px] font-bold text-gray-400 mt-1 mb-1">{label}</div>
      <div className="text-[9px] text-gray-400 mb-1">{avg}</div>
      
      {status && (
        <div 
          className="px-1.5 py-0.5 rounded text-[9px] font-bold"
          style={{ 
            backgroundColor: 'rgba(245, 176, 2, 0.1)', 
            color: '#f5b002' 
          }}
        >
          {status}
        </div>
      )}
      
      {delta && (
        <div className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${delta.includes('+') ? 'bg-accent-purple/10 text-accent-purple animate-pulse' : 'bg-gray-100 text-gray-500'}`}>
          {delta}
        </div>
      )}
    </div>
  );
};
