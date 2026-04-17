import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { Postcard } from '../about/sections/Postcard';
import { Blueprint, LanguageProficiency, Toolbox, StickyNote } from '../about/sections/AboutCards';

// --- Card Types ---
type CardId =
  | 'postcard'
  | 'blueprint'
  | 'language'
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
  const [activeId, setActiveId] = useState<CardId>('toolbox');
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
          <div className="w-full max-w-[360px] transform scale-[0.95] origin-top md:scale-100">
            <LanguageProficiency />
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
      className="w-full h-[350px] md:h-[480px] lg:h-full bg-[#f7f6f3] relative overflow-hidden"
      style={{ boxSizing: 'content-box', top: '15px' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(45,45,45,0.18) 0.65px, transparent 0)',
            backgroundSize: '28px 28px',
            backgroundPosition: '0 0',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(45,45,45,0.16) 0.6px, transparent 0)',
            backgroundSize: '18px 18px',
            backgroundPosition: '0 0',
            WebkitMaskImage: 'radial-gradient(circle at 54% 52%, #000 0%, #000 30%, transparent 58%)',
            maskImage: 'radial-gradient(circle at 54% 52%, #000 0%, #000 30%, transparent 58%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage: [
              'radial-gradient(circle at 54% 52%, rgba(45,45,45,0.14) 0 1px, transparent 1px)',
              'radial-gradient(circle at 54% 52%, transparent 0 118px, rgba(45,45,45,0.22) 118px 119px, transparent 119px 172px, rgba(45,45,45,0.18) 172px 173px, transparent 173px 232px, rgba(45,45,45,0.12) 232px 233px, transparent 233px)',
              'radial-gradient(circle at 54% 52%, rgba(255,255,255,0.85), rgba(247,246,243,0) 62%)',
            ].join(', '),
            backgroundSize: ['10px 10px', '100% 100%', '100% 100%'].join(', '),
            backgroundPosition: '0 0, 0 0, 0 0',
          }}
        />
        <div className="absolute left-0 right-0 top-[70%] h-px bg-[#2d2d2d]/10" />
        <div
          className="absolute left-7 bottom-10 h-px w-[140px] opacity-60"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, rgba(45,45,45,0.18) 0 18px, transparent 18px 30px)',
          }}
        />
        <div
          className="absolute top-0 right-0 bottom-0 w-24 opacity-70"
          style={{
            backgroundImage: [
              'linear-gradient(to bottom, transparent 0, transparent 100%)',
              'repeating-linear-gradient(to bottom, rgba(45,45,45,0.16) 0 1px, transparent 1px 34px)',
            ].join(', '),
            backgroundSize: '100% 100%, 54px 100%',
            backgroundPosition: '0 0, right 10px top 0',
            backgroundRepeat: 'no-repeat, repeat',
          }}
        />
        <div className="absolute right-2 top-3 text-[9px] font-mono text-text-dark/40 tracking-[0.22em]">
          00:00:00
        </div>
        <div className="absolute right-2 top-12 text-[9px] font-mono text-text-dark/40 tracking-[0.22em]">
          00:01:28
        </div>
        <div className="absolute right-2 top-[44%] text-[9px] font-mono text-text-dark/35 tracking-[0.22em]">
          N 31.23
        </div>
        <div className="absolute right-2 top-[60%] text-[9px] font-mono text-text-dark/35 tracking-[0.22em]">
          E 121.47
        </div>
      </div>

      <div className="absolute top-6 right-8 z-40">
        <StickyNote />
      </div>
      
      <DraggableCard
        id="postcard"
        initialPos={{ top: '-2%', left: '23%' }}
        initialRotate={-6}
        activeId={activeId}
        setActiveId={setActiveId}
        constraintsRef={constraintsRef}
      >
        <div className="origin-top-left scale-[0.94]">
          <Postcard />
        </div>
      </DraggableCard>

      <DraggableCard
        id="blueprint"
        initialPos={{ top: '48%', left: '27%' }}
        initialRotate={2}
        activeId={activeId}
        setActiveId={setActiveId}
        constraintsRef={constraintsRef}
      >
        <div className="origin-top-left scale-[0.76]">
          <Blueprint />
        </div>
      </DraggableCard>

      <DraggableCard
        id="language"
        initialPos={{ top: '21%', left: '53%' }}
        initialRotate={-2}
        activeId={activeId}
        setActiveId={setActiveId}
        constraintsRef={constraintsRef}
      >
        <div className="origin-top-left scale-[0.92]">
          <LanguageProficiency />
        </div>
      </DraggableCard>

      <DraggableCard
        id="toolbox"
        initialPos={{ top: '50%', left: '66%' }}
        initialRotate={6}
        activeId={activeId}
        setActiveId={setActiveId}
        constraintsRef={constraintsRef}
      >
        <div className="origin-top-left scale-[0.82]">
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
