import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { Postcard } from '../about/sections/Postcard';
import { Blueprint, Toolbox, StickyNote } from '../about/sections/AboutCards';

// --- Card Types ---
type CardId =
  | 'postcard'
  | 'blueprint'
  | 'toolbox'
  | 'sticky';

interface DraggableCardProps {
  id: CardId;
  children: React.ReactNode;
  initialPos: { top: string; left: string };
  initialRotate: number;
  activeId: CardId;
  setActiveId: (id: CardId) => void;
  constraintsRef: React.RefObject<HTMLDivElement>;
  className?: string;
}

const DraggableCard: React.FC<DraggableCardProps> = ({
  id,
  children,
  initialPos,
  initialRotate,
  activeId,
  setActiveId,
  constraintsRef,
  className = "",
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
        scale: 0.9
      }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        zIndex: activeId === id ? 50 : 10
      }}
      whileDrag={{ 
        scale: 1.05, 
        cursor: "grabbing", 
        zIndex: 100,
        transition: { duration: 0 }
      }}
      className={`absolute cursor-grab select-none ${className}`}
      style={{ top: initialPos.top, left: initialPos.left }}
    >
      {children}
    </motion.div>
  );
};

// --- Main Board Component ---

export const AboutBoard: React.FC = () => {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState<CardId>('postcard');
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="w-full h-full bg-[#f7f6f3] px-6 py-10 flex flex-col gap-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-text-dark uppercase tracking-tight mb-4 border-b border-[#2d2d2d]/10 pb-4">
          About Me
        </h1>
        <div className="flex flex-col gap-8 items-center pb-10">
          <div className="w-full max-w-[572px] transform scale-[0.92] origin-top md:scale-100">
            <Postcard />
          </div>
          <div className="w-full max-w-[450px] transform scale-[0.9] origin-top md:scale-100">
            <Blueprint />
          </div>
          <div className="w-full max-w-[380px] transform scale-[0.9] origin-top md:scale-100">
            <Toolbox />
          </div>
          <StickyNote />
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={constraintsRef}
      className="w-full h-[430px] md:h-[560px] lg:h-[610px] bg-[#f7f6f3] relative overflow-hidden rounded-[28px] border border-[#2d2d2d]/5"
      style={{
        backgroundImage: `radial-gradient(#d1d5db 1px, transparent 1px)`,
        backgroundSize: '32px 32px'
      }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border-2 border-gray-200 rounded-full opacity-20" />
      <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-gray-200 rounded-full opacity-20" />

      <div className="absolute top-6 right-8 z-40">
        <StickyNote />
      </div>
      
      <DraggableCard
        id="postcard"
        initialPos={{ top: '8%', left: '6%' }}
        initialRotate={-5}
        activeId={activeId}
        setActiveId={setActiveId}
        constraintsRef={constraintsRef}
      >
        <Postcard />
      </DraggableCard>

      <DraggableCard
        id="blueprint"
        initialPos={{ top: '48%', left: '10%' }}
        initialRotate={3}
        activeId={activeId}
        setActiveId={setActiveId}
        constraintsRef={constraintsRef}
      >
        <div className="origin-top-left scale-[0.86]">
          <Blueprint />
        </div>
      </DraggableCard>

      <DraggableCard
        id="toolbox"
        initialPos={{ top: '40%', left: '50%' }}
        initialRotate={0}
        activeId={activeId}
        setActiveId={setActiveId}
        constraintsRef={constraintsRef}
      >
        <div className="origin-top-left scale-[0.9]">
          <Toolbox />
        </div>
      </DraggableCard>

      {/* Page Hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 font-mono text-[10px] uppercase tracking-[0.3em] pointer-events-none opacity-50">
        {t.aboutBoard.hint}
      </div>
    </div>
  );
};
