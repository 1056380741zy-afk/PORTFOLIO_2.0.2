import React, { useState, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Postcard } from '../about/sections/Postcard';
import { Blueprint, LanguageProficiency, Toolbox, StickyNote } from '../about/sections/AboutCards';
import { BoardBackground } from './about-board/BoardBackground';
import { BoardControls } from './about-board/BoardControls';
import { DraggableCard } from './about-board/DraggableCard';
import type { CardControl, CardId, StampControl } from './about-board/types';

const CARD_CONTROLS: CardControl[] = [
  { id: 'postcard', label: 'Postcard' },
  { id: 'blueprint', label: 'Blueprint' },
  { id: 'language', label: 'Language' },
  { id: 'toolbox', label: 'Toolbox' },
  { id: 'sticky', label: 'Sticky' },
];

type AboutBoardProps = {
  stampControl?: StampControl;
};

export const AboutBoard: React.FC<AboutBoardProps> = ({ stampControl }) => {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState<CardId>('toolbox');
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [cardMenuOpen, setCardMenuOpen] = useState(false);
  const [hiddenCards, setHiddenCards] = useState<Set<CardId>>(new Set());

  const toggleCardVisibility = (id: CardId) => {
    setHiddenCards((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

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
      className="main-panel w-full h-full min-h-[400px] lg:min-h-0 relative overflow-hidden"
      style={{ boxSizing: 'border-box', top: 'clamp(10px, 2.5vh, 18px)' }}
    >
      <BoardBackground />

      <BoardControls
        cardControls={CARD_CONTROLS}
        cardMenuOpen={cardMenuOpen}
        hiddenCards={hiddenCards}
        stampControl={stampControl}
        onToggleCardMenu={() => setCardMenuOpen((open) => !open)}
        onToggleCardVisibility={toggleCardVisibility}
      />

      {!hiddenCards.has('sticky') && (
      <div className="absolute top-6 right-[calc(2rem+30px)] z-40">
        <StickyNote />
      </div>
      )}
      
      {!hiddenCards.has('postcard') && (
      <DraggableCard
        id="postcard"
        initialPos={{ top: 'calc(-2% - 5px)', left: 'calc(23% - 40px)' }}
        initialRotate={-6}
        activeId={activeId}
        setActiveId={setActiveId}
        constraintsRef={constraintsRef}
      >
        <div className="origin-top-left scale-[0.94]">
          <Postcard />
        </div>
      </DraggableCard>
      )}

      {!hiddenCards.has('blueprint') && (
      <DraggableCard
        id="blueprint"
        initialPos={{ top: '48%', left: 'calc(27% - 95px)' }}
        initialRotate={2}
        activeId={activeId}
        setActiveId={setActiveId}
        constraintsRef={constraintsRef}
      >
        <div className="origin-top-left scale-[0.76]">
          <Blueprint />
        </div>
      </DraggableCard>
      )}

      {!hiddenCards.has('language') && (
      <DraggableCard
        id="language"
        initialPos={{ top: '21%', left: 'calc(53% - 30px)' }}
        initialRotate={-2}
        activeId={activeId}
        setActiveId={setActiveId}
        constraintsRef={constraintsRef}
      >
        <div className="origin-top-left scale-[0.92]">
          <LanguageProficiency />
        </div>
      </DraggableCard>
      )}

      {!hiddenCards.has('toolbox') && (
      <DraggableCard
        id="toolbox"
        initialPos={{ top: '50%', left: 'calc(66% - 30px)' }}
        initialRotate={6}
        activeId={activeId}
        setActiveId={setActiveId}
        constraintsRef={constraintsRef}
      >
        <div className="origin-top-left scale-[0.82]">
          <Toolbox />
        </div>
      </DraggableCard>
      )}

      {/* Page Hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 font-mono text-[10px] uppercase tracking-[0.3em] pointer-events-none opacity-50">
        {t.aboutBoard.hint}
      </div>
    </div>
  );
};
