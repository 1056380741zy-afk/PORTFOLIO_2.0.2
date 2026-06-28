import React, { useState, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Postcard } from '../about/sections/Postcard';
import { Blueprint, LanguageProficiency, Toolbox, StickyNote } from '../about/sections/AboutCards';
import { BoardBackground } from './about-board/BoardBackground';
import { BoardControls } from './about-board/BoardControls';
import { DraggableCard } from './about-board/DraggableCard';
import type { CardAdjustOffset, CardControl, CardId, StampControl } from './about-board/types';

const CARD_CONTROLS: CardControl[] = [
  { id: 'postcard', label: 'Postcard' },
  { id: 'blueprint', label: 'Blueprint' },
  { id: 'language', label: 'Language' },
  { id: 'toolbox', label: 'Toolbox' },
  { id: 'sticky', label: 'Sticky' },
];

const CARD_OFFSET_STORAGE_KEY = 'aboutBoardCardOffsets_v4';

const DEFAULT_CARD_OFFSETS: Record<CardId, CardAdjustOffset> = {
  postcard: { x: 0, y: 150 },
  blueprint: { x: -176, y: 150 },
  language: { x: 0, y: 0 },
  toolbox: { x: 0, y: 0 },
  sticky: { x: 0, y: 0 },
};

const SpinePunchHoles: React.FC = () => {
  const holes = [
    { top: 0, height: 10 },
    { top: 60, height: 16 },
    { top: 96, height: 16 },
    { top: 156, height: 10 },
    { top: 216, height: 16 },
    { top: 252, height: 16 },
    { top: 312, height: 10 },
  ];
  const stripWidth = 30;
  const stripCenterX = stripWidth / 2;
  const svgHeight = 600;
  const holeGroupHeight = 328;
  const yOffset = 8;
  const holeStartY = svgHeight / 2 - holeGroupHeight / 2 + yOffset;

  return (
    <div
      className="absolute top-0 bottom-0 z-[220] hidden pointer-events-none lg:block"
      style={{ top: '7.5px', bottom: '7.5px', left: '-9px', width: `${stripWidth}px` }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${stripWidth} ${svgHeight}`}
        preserveAspectRatio="none"
        className="absolute inset-0"
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <path fill="#fdfcf4" d={`M 0 0 H ${stripWidth} V ${svgHeight} H 0 Z`} />
        {holes.map((hole) => (
          <ellipse
            key={hole.top}
            cx={stripCenterX}
            cy={holeStartY + hole.top}
            rx="3.2"
            ry={hole.height / 2}
            fill="#efe1d1"
            stroke="rgba(77, 57, 36, 0.22)"
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
};

type AboutBoardProps = {
  stampControl?: StampControl;
};

export const AboutBoard: React.FC<AboutBoardProps> = ({ stampControl }) => {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState<CardId>('blueprint');
  const constraintsRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [cardMenuOpen, setCardMenuOpen] = useState(false);
  const [cardAdjustOpen, setCardAdjustOpen] = useState(false);
  const [cardOffsets, setCardOffsets] = useState<Record<CardId, CardAdjustOffset>>(DEFAULT_CARD_OFFSETS);
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

  const updateCardOffset = (id: CardId, axis: keyof CardAdjustOffset, value: number) => {
    setCardOffsets((current) => {
      const next = {
        ...current,
        [id]: {
          ...(current[id] ?? { x: 0, y: 0 }),
          [axis]: value,
        },
      };
      localStorage.setItem(CARD_OFFSET_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const resetCardOffsets = () => {
    setCardOffsets(DEFAULT_CARD_OFFSETS);
    localStorage.removeItem(CARD_OFFSET_STORAGE_KEY);
  };

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(CARD_OFFSET_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return;
      setCardOffsets((current) => ({ ...current, ...(parsed as Record<CardId, CardAdjustOffset>) }));
    } catch {
      // Keep default card offsets when stored data is malformed.
    }
  }, []);

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
      className="relative h-full min-h-[400px] lg:min-h-0"
      style={{ boxSizing: 'border-box', top: '-5px', height: 'calc(100% + 15px)', width: 'calc(100% - 5px)' }}
    >
      <BoardControls
        cardControls={CARD_CONTROLS}
        cardMenuOpen={cardMenuOpen}
        hiddenCards={hiddenCards}
        stampControl={stampControl}
        cardAdjustControl={{
          isOpen: cardAdjustOpen,
          offsets: cardOffsets,
          onToggle: () => setCardAdjustOpen((open) => !open),
          onChange: updateCardOffset,
          onReset: resetCardOffsets,
        }}
        onToggleCardMenu={() => setCardMenuOpen((open) => !open)}
        onToggleCardVisibility={toggleCardVisibility}
      />

      <SpinePunchHoles />

      <div ref={panelRef} className="main-panel overflow-hidden" style={{ position: 'absolute', top: '8px', right: 0, bottom: '5px', left: '27px' }}>
      <BoardBackground />

      {!hiddenCards.has('sticky') && (
      <div
        className="absolute top-6 right-[calc(2rem+30px)] z-40"
        style={{ transform: `translate(${cardOffsets.sticky.x}px, ${cardOffsets.sticky.y}px)` }}
      >
        <StickyNote />
      </div>
      )}
      
      {!hiddenCards.has('postcard') && (
      <DraggableCard
        id="postcard"
        initialPos={{ top: '7%', left: '18%' }}
        initialRotate={-5}
        activeId={activeId}
        setActiveId={setActiveId}
        constraintsRef={panelRef}
        visualScale={0.86}
        adjustOffset={cardOffsets.postcard}
      >
        <Postcard />
      </DraggableCard>
      )}

      {!hiddenCards.has('blueprint') && (
      <DraggableCard
        id="blueprint"
        initialPos={{ top: '42%', left: '44%' }}
        initialRotate={-2}
        activeId={activeId}
        setActiveId={setActiveId}
        constraintsRef={panelRef}
        visualScale={0.58}
        adjustOffset={cardOffsets.blueprint}
      >
        <Blueprint />
      </DraggableCard>
      )}

      {!hiddenCards.has('language') && (
      <DraggableCard
        id="language"
        initialPos={{ top: '21%', left: 'calc(53% - 30px)' }}
        initialRotate={-2}
        activeId={activeId}
        setActiveId={setActiveId}
        constraintsRef={panelRef}
        visualScale={0.86}
        adjustOffset={cardOffsets.language}
      >
        <LanguageProficiency />
      </DraggableCard>
      )}

      {!hiddenCards.has('toolbox') && (
      <DraggableCard
        id="toolbox"
        initialPos={{ top: '50%', left: 'calc(66% - 30px)' }}
        initialRotate={6}
        activeId={activeId}
        setActiveId={setActiveId}
        constraintsRef={panelRef}
        visualScale={0.82}
        adjustOffset={cardOffsets.toolbox}
      >
        <Toolbox />
      </DraggableCard>
      )}

      {/* Page Hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 font-mono text-[10px] uppercase tracking-[0.3em] pointer-events-none opacity-50">
        {t.aboutBoard.hint}
      </div>
      </div>
    </div>
  );
};
