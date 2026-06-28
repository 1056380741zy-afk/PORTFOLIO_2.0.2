import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { CardAdjustOffset, CardId } from './types';

type DraggableCardProps = {
  id: CardId;
  children: React.ReactNode;
  initialPos: { top: string; left: string };
  initialRotate: number;
  activeId: CardId;
  setActiveId: (id: CardId) => void;
  constraintsRef: React.RefObject<HTMLDivElement>;
  className?: string;
  visualScale?: number;
  adjustOffset?: CardAdjustOffset;
};

export const DraggableCard: React.FC<DraggableCardProps> = ({
  id,
  children,
  initialPos,
  initialRotate,
  activeId,
  setActiveId,
  constraintsRef,
  className = '',
  visualScale = 1,
  adjustOffset = { x: 0, y: 0 },
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentSize, setContentSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const element = contentRef.current;

    const updateSize = () => {
      setContentSize({
        width: element.offsetWidth,
        height: element.offsetHeight,
      });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(element);
    return () => observer.disconnect();
  }, [children]);

  const scaledSize = contentSize
    ? {
        width: contentSize.width * visualScale,
        height: contentSize.height * visualScale,
      }
    : undefined;

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.1}
      onDragStart={() => setActiveId(id)}
      onMouseDown={() => setActiveId(id)}
      initial={{
        top: initialPos.top,
        left: initialPos.left,
        x: adjustOffset.x,
        y: adjustOffset.y,
        rotate: initialRotate,
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        x: adjustOffset.x,
        y: adjustOffset.y,
        rotate: initialRotate,
        zIndex: activeId === id ? 50 : 10,
      }}
      whileDrag={{
        cursor: 'grabbing',
        zIndex: 100,
        transition: { duration: 0 },
      }}
      className={`absolute cursor-grab select-none ${className}`}
      style={{ top: initialPos.top, left: initialPos.left, transformOrigin: 'top left', ...scaledSize }}
    >
      <div
        ref={contentRef}
        style={{
          transform: `scale(${visualScale})`,
          transformOrigin: 'top left',
          width: 'max-content',
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};
