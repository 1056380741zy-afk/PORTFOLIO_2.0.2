import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
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
  className?: string;
  visualScale?: number;
  footprintScale?: number;
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
  className = '',
  visualScale = 1,
  footprintScale = 1,
  adjustOffset = { x: 0, y: 0, scale: 1 },
  onAdjustOffsetChange,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentSize, setContentSize] = useState<{ width: number; height: number } | null>(null);
  const adjustedScale = visualScale * (adjustOffset.scale ?? 1);
  const adjustedFootprintScale = adjustedScale * footprintScale;
  const x = useMotionValue(adjustOffset.x);
  const y = useMotionValue(adjustOffset.y);

  useEffect(() => {
    x.set(adjustOffset.x);
    y.set(adjustOffset.y);
  }, [adjustOffset.x, adjustOffset.y, x, y]);

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
        width: contentSize.width * adjustedFootprintScale,
        height: contentSize.height * adjustedFootprintScale,
      }
    : undefined;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragTransition={{ bounceStiffness: 240, bounceDamping: 32, power: 0.12, timeConstant: 140 }}
      onDragStart={() => {
        setActiveId(id);
      }}
      onDragEnd={() => {
        onAdjustOffsetChange?.(id, {
          ...adjustOffset,
          x: Math.round(x.get()),
          y: Math.round(y.get()),
        });
      }}
      onMouseDown={() => setActiveId(id)}
      initial={{
        top: initialPos.top,
        left: initialPos.left,
        rotate: initialRotate,
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        rotate: initialRotate,
        zIndex: activeId === id ? 70 : RESTING_Z_INDEX[id],
      }}
      whileDrag={{
        cursor: 'grabbing',
        zIndex: 100,
        transition: { duration: 0 },
      }}
      className={`absolute cursor-grab select-none ${className}`}
      style={{ top: initialPos.top, left: initialPos.left, x, y, transformOrigin: 'top left', ...scaledSize }}
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
