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
    <div className={`project-metric-card ${isInteractive ? 'project-metric-card-interactive' : 'relative group/tooltip'}`}>
      <div className="project-metric-card-primary">
        <div
          className="project-metric-card-value"
          style={{ fontFamily: '"Inter Variable", Inter, Arial, sans-serif' }}
        >
          {value}
        </div>
        {tooltip && (
          <div className="relative cursor-help">
            <Info size={14} className="text-gray-400/60 hover:text-[#9f8fdb] transition-colors" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-text-dark text-white text-[10px] leading-relaxed rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 text-center font-medium pointer-events-none">
              {tooltip}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-text-dark"></div>
            </div>
          </div>
        )}
      </div>
      <div className="project-metric-card-meta">
        <div className="project-metric-card-label">{label}</div>
        <div className="project-metric-card-avg">{avg}</div>
      
        {status && (
          <div 
            className="project-metric-card-badge"
            style={{ 
              backgroundColor: 'rgba(245, 176, 2, 0.1)', 
              color: '#f5b002' 
            }}
          >
            {status}
          </div>
        )}
      
        {delta && (
          <div
            className="project-metric-card-badge"
            style={{
              backgroundColor: 'rgba(245, 176, 2, 0.1)',
              color: '#f5b002'
            }}
          >
            {delta}
          </div>
        )}
      </div>
    </div>
  );
};
