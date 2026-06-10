import React from 'react';
import { motion } from 'framer-motion';
import type { CardId } from './types';

type DraggableCardProps = {
  id: CardId;
  children: React.ReactNode;
  initialPos: { top: string; left: string };
  initialRotate: number;
  activeId: CardId;
  setActiveId: (id: CardId) => void;
  constraintsRef: React.RefObject<HTMLDivElement>;
  className?: string;
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
}) => {
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
        rotate: initialRotate,
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        zIndex: activeId === id ? 50 : 10,
      }}
      whileDrag={{
        scale: 1.05,
        cursor: 'grabbing',
        zIndex: 100,
        transition: { duration: 0 },
      }}
      className={`absolute cursor-grab select-none ${className}`}
      style={{ top: initialPos.top, left: initialPos.left }}
    >
      {children}
    </motion.div>
  );
};
