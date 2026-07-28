import React from 'react';

type BoardBackgroundProps = {
  layout?: 'default' | 'archive';
};

export const BoardBackground: React.FC<BoardBackgroundProps> = ({ layout = 'default' }) => (
  <div
    className={`pointer-events-none absolute inset-0 z-[1] overflow-hidden ${
      layout === 'archive' ? 'rounded-[8px]' : ''
    }`}
    style={layout === 'archive' ? undefined : { borderRadius: 'inherit' }}
    aria-hidden="true"
  >
    <picture className="flex h-full w-full items-center justify-center">
      <source
        media="(max-width: 768px)"
        srcSet="/bg/home-archive-document-grid-user-final-mobile.jpg"
        type="image/jpeg"
      />
      <source
        srcSet="/bg/home-archive-document-grid-user-final-desktop.jpg"
        type="image/jpeg"
      />
      <img
        src="/bg/home-archive-document-grid-user-final-desktop.jpg"
        alt=""
        width={1574}
        height={999}
        className="h-full w-full object-cover object-center"
        draggable={false}
        decoding="async"
      />
    </picture>
  </div>
);
