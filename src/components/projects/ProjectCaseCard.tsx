import React from 'react';
import { Card } from '../shared/Card';
import { EvidenceFrame } from '../shared/ArchivePrimitives';

interface ProjectCaseCardProps {
  title: string;
  tag: string;
  icon: React.ReactNode;
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
  const isPdf = imageSrc.endsWith('.pdf');

  return (
    <div className="archive-case-layout grid grid-cols-2 gap-6">
      {/* Left Column: Image/PDF Block */}
      <Card depth={2} className="archive-surface evidence-document !rounded-[8px] p-6 flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <h6 className="font-bold text-text-dark flex items-center gap-3 text-sm tracking-wide">
            <span className="decorative-icon decorative-icon-framed">{icon}</span>
            {title}
          </h6>
          <span className="border border-[#9f8fdb]/30 text-[#9f8fdb] px-3 py-1 rounded-full text-xs font-bold tracking-wider">{tag}</span>
        </div>
        
        <EvidenceFrame
          className="evidence-document-frame flex-1 min-h-[400px]"
          caption={imageDesc}
          source={imageTitle}
          mediaType={isPdf ? 'PDF' : 'SLIDE'}
          showCaption={false}
        >
          {isPdf ? (
            <iframe
              src={imageSrc}
              className="w-full h-full min-h-[400px]"
              title={imageTitle}
              loading="eager"
            />
          ) : (
            <iframe
              src={imageSrc}
              className="w-full h-full min-h-[400px]" 
              title={imageTitle}
              allow="autoplay"
              loading="lazy"
            />
          )}
        </EvidenceFrame>
      </Card>

      {/* Right Column: Content Blocks */}
      <div className="flex flex-col gap-4 h-full pr-2.5">
        {children}
      </div>
    </div>
  );
};
