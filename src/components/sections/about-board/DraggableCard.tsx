import React, { useEffect, useRef, useState } from 'react';
import { motion, type PanInfo } from 'framer-motion';
import type { CardAdjustOffset, CardId } from './types';

const RESTING_Z_INDEX: Record<CardId, number> = {
  language: 20,
  sticky: 36,
  postcardBack: 40,
  postcardFront: 40,
  blueprint: 50,
  toolbox: 60,
};

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
  onAdjustOffsetChange?: (id: CardId, nextOffset: CardAdjustOffset) => void;
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
  adjustOffset = { x: 0, y: 0, scale: 1 },
  onAdjustOffsetChange,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const dragStartOffsetRef = useRef({ x: 0, y: 0 });
  const [contentSize, setContentSize] = useState<{ width: number; height: number } | null>(null);
  const adjustedScale = visualScale * (adjustOffset.scale ?? 1);

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
        width: contentSize.width * adjustedScale,
        height: contentSize.height * adjustedScale,
      }
    : undefined;

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.1}
      onDragStart={() => {
        dragStartOffsetRef.current = { x: adjustOffset.x, y: adjustOffset.y };
        setActiveId(id);
      }}
      onDragEnd={(_, info: PanInfo) => {
        onAdjustOffsetChange?.(id, {
          ...adjustOffset,
          x: Math.round(dragStartOffsetRef.current.x + info.offset.x),
          y: Math.round(dragStartOffsetRef.current.y + info.offset.y),
        });
      }}
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
        zIndex: activeId === id ? 70 : RESTING_Z_INDEX[id],
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
          transform: `scale(${adjustedScale})`,
          transformOrigin: 'top left',
          width: 'max-content',
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};
