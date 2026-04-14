import React from 'react';

interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode | string;
  subtitle?: string;
  className?: string;
  withLine?: boolean;
}

/**
 * 可复用的章节标题组件
 * 用于Projects、Journey等多个章节
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  icon,
  subtitle,
  className = '',
  withLine = true
}) => {
  return (
    <div className={`flex items-center gap-4 mb-12 ${className}`}>
      {withLine && <div className="w-12 h-[2px] bg-text-dark" />}
      <div className="flex items-center gap-3">
        {icon && (
          <span className="flex items-center justify-center text-lg md:text-xl">
            {typeof icon === 'string' ? icon : icon}
          </span>
        )}
        <div>
          <h3 className="text-xl md:text-2xl font-bold tracking-wide text-text-dark">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
};
