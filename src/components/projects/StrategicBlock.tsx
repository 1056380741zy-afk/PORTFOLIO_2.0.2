import React from 'react';

interface StrategicBlockProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const StrategicBlock: React.FC<StrategicBlockProps> = ({
  icon,
  title,
  description,
  children
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <span className="decorative-icon">{icon}</span>
        <h5 className="information-card-title font-bold text-text-dark text-sm uppercase tracking-wide">{title}</h5>
      </div>
      <p className="text-sm font-bold text-text-dark leading-snug">
        {description}
      </p>
      {children && (
        <ul className="space-y-1.5 pl-1">
          {children}
        </ul>
      )}
    </div>
  );
};

export const StrategicItem: React.FC<{ label?: string; text: string; type?: 'bullet' | 'tag' }> = ({
  label,
  text,
  type = 'bullet'
}) => {
  if (type === 'tag') {
    return (
      <li className="flex items-start gap-2">
        <span className="text-xs text-gray-400 mt-0.5">•</span>
        <span className="text-xs text-gray-500 leading-relaxed" dangerouslySetInnerHTML={{ __html: text }} />
      </li>
    );
  }

  return (
    <li className="flex items-start gap-2">
      <span className="text-xs text-gray-400 mt-0.5">•</span>
      <p className="text-xs text-gray-500 leading-relaxed">
        {label && <strong className="text-text-dark">{label}: </strong>}
        {text}
      </p>
    </li>
  );
};
