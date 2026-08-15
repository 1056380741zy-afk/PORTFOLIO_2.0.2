import React from 'react';

type BoardBackgroundProps = {
  layout?: 'default' | 'archive';
};

export const BoardBackground: React.FC<BoardBackgroundProps> = ({ layout = 'default' }) => (
  <div
    className={`home-board-background pointer-events-none absolute inset-0 z-[1] overflow-hidden ${
      layout === 'archive' ? 'rounded-[8px]' : 'rounded-l-[48px] rounded-r-[8px]'
    }`}
    aria-hidden="true"
  >
    <picture className="flex h-full w-full items-center justify-center">
      <source
        media="(max-width: 768px)"
        srcSet="/home/board/background/archive-grid-mobile.jpg"
        type="image/jpeg"
      />
      <source
        srcSet="/home/board/background/archive-grid-desktop.jpg"
        type="image/jpeg"
      />
      <img
        src="/home/board/background/archive-grid-desktop.jpg"
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
