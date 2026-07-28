import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Maximize2, X } from 'lucide-react';

interface EvidenceFrameProps {
  children: React.ReactNode;
  caption: string;
  source?: string;
  mediaType?: string;
  expandSrc?: string;
  expandAlt?: string;
  className?: string;
  captionClassName?: string;
  showCaption?: boolean;
}

export const EvidenceFrame: React.FC<EvidenceFrameProps> = ({
  children,
  caption,
  source,
  mediaType = 'EVIDENCE',
  expandSrc,
  expandAlt,
  className = '',
  captionClassName = '',
  showCaption = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <figure className={`evidence-frame ${className}`}>
        <div className="evidence-frame-media">{children}</div>
        {showCaption && (
          <figcaption className={`evidence-caption ${captionClassName}`}>
            <span className="evidence-caption-type">{mediaType}</span>
            <span className="evidence-caption-copy">{caption}</span>
            {source && <span className="source-note">{source}</span>}
          </figcaption>
        )}
        {expandSrc && (
          <button
            type="button"
            className="evidence-expand"
            aria-label={`Enlarge ${expandAlt || caption}`}
            title={`Enlarge ${expandAlt || caption}`}
            onClick={() => setIsExpanded(true)}
          >
            <Maximize2 size={15} strokeWidth={1.8} />
          </button>
        )}
      </figure>

      {isExpanded && expandSrc && typeof document !== 'undefined' && createPortal((
        <div className="evidence-lightbox" role="dialog" aria-modal="true" aria-label={expandAlt || caption} onClick={() => setIsExpanded(false)}>
          <button type="button" className="evidence-lightbox-close" aria-label="Close enlarged evidence" onClick={() => setIsExpanded(false)}>
            <X size={18} strokeWidth={1.8} />
          </button>
          <div className="evidence-lightbox-surface" onClick={(event) => event.stopPropagation()}>
            <img src={expandSrc} alt={expandAlt || caption} />
            <div className="evidence-lightbox-caption">
              <span>{caption}</span>
              {source && <span>{source}</span>}
            </div>
          </div>
        </div>
      ), document.body)}
    </>
  );
};

interface FieldNoteProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  tone?: 'standard' | 'contribution' | 'result';
}

export const FieldNote: React.FC<FieldNoteProps> = ({ children, tone = 'standard', className = '', ...props }) => (
  <article className={`field-note field-note-${tone} ${className}`} {...props}>
    {children}
  </article>
);

interface EvidenceSlipProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const EvidenceSlip: React.FC<EvidenceSlipProps> = ({ children, className = '', ...props }) => (
  <div className={`evidence-slip ${className}`} {...props}>
    {children}
  </div>
);
