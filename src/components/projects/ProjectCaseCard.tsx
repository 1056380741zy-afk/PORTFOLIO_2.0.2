import React from 'react';
import { Card } from '../shared/Card';

interface ProjectCaseCardProps {
  title: string;
  tag: string;
  icon: string;
  imageSrc: string;
  imageTitle: string;
  imageDesc: string;
  children: React.ReactNode;
}

export const ProjectCaseCard: React.FC<ProjectCaseCardProps> = ({
  title,
  tag,
  icon,
  imageSrc,
  imageTitle,
  imageDesc,
  children
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column: Image/PDF Block */}
      <Card depth={2} className="p-6 flex flex-col h-full hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-center mb-6">
          <h6 className="font-bold text-text-dark flex items-center gap-3 text-sm tracking-wide">
            <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-[#2d2d2d]/5 shadow-sm text-sm">{icon}</span>
            {title}
          </h6>
          <span className="border border-[#8e6bbf]/30 text-[#8e6bbf] px-3 py-1 rounded-full text-xs font-bold tracking-wider">{tag}</span>
        </div>
        
        <Card depth={3} className="flex-1 overflow-hidden shadow-sm relative min-h-[400px]">
          {imageSrc.endsWith('.pdf') ? (
            <embed 
              src={imageSrc} 
              type="application/pdf"
              className="w-full h-full min-h-[400px]"
              title={imageTitle}
            />
          ) : (
            <iframe 
              src={imageSrc} 
              className="w-full h-full min-h-[400px]" 
              title={imageTitle}
              allow="autoplay"
            />
          )}
        </Card>
        <p className="text-xs text-gray-400 mt-3 text-center italic">{imageDesc}</p>
      </Card>

      {/* Right Column: Content Blocks */}
      <div className="flex flex-col gap-4 h-full">
        {children}
      </div>
    </div>
  );
};
