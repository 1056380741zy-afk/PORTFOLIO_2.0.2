import React from 'react';

interface NotionBlockProps {
  children: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  className?: string;
}

export const NotionBlock: React.FC<NotionBlockProps> = ({ children, title, icon, rightElement, className = '' }) => {
  return (
    <div className={`mb-8 p-6 bg-surface border border-[#2d2d2d]/10 rounded-xl shadow-sm ${className}`}>
      {(title || rightElement) && (
        <div className="flex items-center justify-between mb-4 border-b border-[#2d2d2d]/5 pb-2">
           {title && (
             <h3 className="text-lg font-bold text-text-main flex items-center gap-2">
               {icon && <span className="flex items-center justify-center text-xl">{icon}</span>}
               {title}
             </h3>
           )}
           {rightElement}
        </div>
      )}
      <div className="text-text-main leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export const NotionTag: React.FC<{ children: React.ReactNode; color?: string; className?: string }> = ({ children, color = 'gray', className = '' }) => {
  const colors: Record<string, string> = {
    gray:   'bg-[#2d2d2d]/5 text-text-main/60',
    brown:  'bg-[#E9E5E3] text-[#64473A]', // Keeping some specific notion colors if they don't map well, or map to closest brand
    orange: 'bg-group-1-a/10 text-group-1-a',
    yellow: 'bg-group-2-b/10 text-group-2-b',
    green:  'bg-brand-green/10 text-brand-green',
    blue:   'bg-brand-blue/10 text-brand-blue',
    purple: 'bg-brand-purple/10 text-brand-purple',
    pink:   'bg-[#F4DFEB] text-[#AD1A72]',
    red:    'bg-brand-red/10 text-brand-red',
  };
  
  const selectedColor = colors[color] || colors.gray;

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded text-sm ${selectedColor} ${className} whitespace-nowrap`}>
      {children}
    </span>
  );
};

export const NotionCallout: React.FC<{ children: React.ReactNode; icon?: React.ReactNode; className?: string }> = ({ children, icon, className = '' }) => {
  return (
    <div className={`p-4 rounded-lg bg-surface flex gap-4 text-text-main border border-transparent hover:border-[#2d2d2d]/10 transition-colors ${className}`}>
      {icon && <div className="text-2xl select-none flex items-start pt-0.5">{icon}</div>}
      <div className="flex-1 leading-relaxed text-base">
        {children}
      </div>
    </div>
  );
};

export const NotionProperty: React.FC<{ name: string; value: React.ReactNode; icon?: React.ReactNode }> = ({ name, value, icon }) => {
  return (
    <div className="flex items-start py-1.5 text-[15px]">
      <div className="w-32 min-w-[8rem] text-text-main/60 flex items-center gap-2 truncate">
         {icon}
         <span>{name}</span>
      </div>
      <div className="flex-1 text-text-main flex flex-wrap gap-2 items-center font-medium min-h-[24px]">
        {value}
      </div>
    </div>
  );
};