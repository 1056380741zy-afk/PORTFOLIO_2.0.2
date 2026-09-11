import React, { useRef, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Postcard } from '../about/sections/Postcard';
import { Blueprint, LanguageProficiency, Toolbox, StickyNote } from '../about/sections/AboutCards';
import { BoardBackground } from './about-board/BoardBackground';
import { BoardControls } from './about-board/BoardControls';
import { DraggableCard } from './about-board/DraggableCard';
import type { CardAdjustOffset, CardControl, CardId } from './about-board/types';

const CARD_CONTROLS: CardControl[] = [
  { id: 'postcardBack', label: 'Postcard A' },
  { id: 'postcardFront', label: 'Postcard B' },
  { id: 'blueprint', label: 'Blueprint' },
  { id: 'language', label: 'Language' },
  { id: 'toolbox', label: 'Toolbox' },
  { id: 'sticky', label: 'Sticky' },
];

const CARD_OFFSET_STORAGE_KEY = 'aboutBoardCardOffsets_v24';

const DEFAULT_CARD_OFFSETS: Record<CardId, CardAdjustOffset> = {
  postcardBack: { x: 100, y: 188, scale: 0.9 },
  postcardFront: { x: 378, y: 107, scale: 1 },
  blueprint: { x: -23, y: 3, scale: 1 },
  language: { x: -6, y: -86, scale: 1 },
  toolbox: { x: 231, y: 28, scale: 1 },
  sticky: { x: -60, y: -240, scale: 1 },
};

const ARCHIVE_CARD_OFFSETS: Record<CardId, CardAdjustOffset> = {
  postcardBack: { x: 0, y: 0, scale: 1 },
  postcardFront: { x: 10, y: 0, scale: 1 },
  blueprint: { x: 0, y: 0, scale: 1 },
  language: { x: 0, y: 0, scale: 1 },
  toolbox: { x: 0, y: 0, scale: 1 },
  sticky: { x: 0, y: 0, scale: 1 },
};

const normalizeCardOffsets = (
  offsets: Partial<Record<CardId, Partial<CardAdjustOffset>>>,
  defaults: Record<CardId, CardAdjustOffset>,
): Record<CardId, CardAdjustOffset> => {
  return CARD_CONTROLS.reduce((acc, card) => {
    const current = offsets[card.id] ?? {};
    const fallback = defaults[card.id];
    acc[card.id] = {
      x: typeof current.x === 'number' ? current.x : fallback.x,
      y: typeof current.y === 'number' ? current.y : fallback.y,
      scale: typeof current.scale === 'number' ? current.scale : fallback.scale,
    };
    return acc;
  }, {} as Record<CardId, CardAdjustOffset>);
};

const SpinePunchHoles: React.FC = () => {
  const holes = [
    { top: 0, height: 10 },
    { top: 86, height: 16 },
    { top: 132, height: 16 },
    { top: 218, height: 10 },
    { top: 304, height: 16 },
    { top: 350, height: 16 },
    { top: 436, height: 10 },
  ];
  const stripWidth = 30;
  const stripCenterX = stripWidth / 2;
  const svgHeight = 600;
  const holeGroupHeight = 446;
  const yOffset = 0;
  const holeStartY = svgHeight / 2 - holeGroupHeight / 2 + yOffset;

  return (
    <div
      className="absolute top-0 bottom-0 z-[220] pointer-events-none"
      style={{ top: '8px', bottom: '8px', left: '-28px', width: `${stripWidth}px` }}
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
        <path fill="rgba(252, 249, 240, 0.97)" d={`M 0 0 H ${stripWidth} V ${svgHeight} H 0 Z`} />
        {holes.map((hole) => (
          <rect
            key={hole.top}
            x={stripCenterX - 4}
            y={holeStartY + hole.top - hole.height / 2}
            width="8"
            height={hole.height}
            rx="4"
            ry="4"
            fill="#B69567"
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
  releaseCardFrame?: boolean;
  layout?: 'default' | 'archive';
};

export const AboutBoard: React.FC<AboutBoardProps> = ({
  releaseCardFrame = false,
  layout = 'default',
}) => {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState<CardId>('toolbox');
  const panelRef = useRef<HTMLDivElement>(null);
  const [cardMenuOpen, setCardMenuOpen] = useState(false);
  const [scaleMenuOpen, setScaleMenuOpen] = useState(false);
  const defaultCardOffsets = layout === 'archive' ? ARCHIVE_CARD_OFFSETS : DEFAULT_CARD_OFFSETS;
  const cardOffsetStorageKey = layout === 'archive' ? `${CARD_OFFSET_STORAGE_KEY}_archive_v2` : CARD_OFFSET_STORAGE_KEY;
  const [cardOffsets, setCardOffsets] = useState<Record<CardId, CardAdjustOffset>>(defaultCardOffsets);
  const [hiddenCards, setHiddenCards] = useState<Set<CardId>>(new Set());
  const isArchiveLayout = layout === 'archive';
  const rootStyle = isArchiveLayout
    ? { boxSizing: 'border-box' as const, height: '100%', width: '100%' }
    : { boxSizing: 'border-box' as const, top: '-5px', height: 'calc(100% + 15px)', width: 'calc(100% - 5px)', marginRight: 0 };
  const panelStyle = isArchiveLayout
    ? { position: 'absolute' as const, inset: 0 }
    : { position: 'absolute' as const, top: '8px', right: 0, bottom: '10px', left: '27px', marginRight: '35px', marginLeft: '10px' };

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

  const updateCardOffsetSnapshot = (id: CardId, nextOffset: CardAdjustOffset) => {
    setCardOffsets((current) => ({
      ...current,
      [id]: {
        x: Math.round(nextOffset.x),
        y: Math.round(nextOffset.y),
        scale: Math.max(0.2, Math.min(2, nextOffset.scale)),
      },
    }));
  };

  const updateCardScale = (id: CardId, scale: number) => {
    updateCardOffsetSnapshot(id, {
      ...cardOffsets[id],
      scale,
    });
  };

  const resetCardScales = () => {
    setCardOffsets((current) => normalizeCardOffsets(
      Object.fromEntries(CARD_CONTROLS.map(({ id }) => [
        id,
        { ...current[id], scale: defaultCardOffsets[id].scale },
      ])) as Record<CardId, CardAdjustOffset>,
      defaultCardOffsets,
    ));
  };

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(cardOffsetStorageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return;
      setCardOffsets((current) => normalizeCardOffsets({ ...current, ...(parsed as Record<CardId, Partial<CardAdjustOffset>>) }, defaultCardOffsets));
    } catch {
      // Keep default card offsets when stored data is malformed.
    }
  }, [cardOffsetStorageKey, defaultCardOffsets]);

  React.useEffect(() => {
    localStorage.setItem(cardOffsetStorageKey, JSON.stringify(cardOffsets));
  }, [cardOffsetStorageKey, cardOffsets]);

  return (
    <div 
      className="relative h-full min-h-0"
      style={rootStyle}
    >
      <BoardControls
        cardControls={CARD_CONTROLS}
        cardMenuOpen={cardMenuOpen}
        scaleMenuOpen={scaleMenuOpen}
        cardOffsets={cardOffsets}
        hiddenCards={hiddenCards}
        onToggleCardMenu={() => {
          setCardMenuOpen((open) => !open);
          setScaleMenuOpen(false);
        }}
        onToggleScaleMenu={() => {
          setScaleMenuOpen((open) => !open);
          setCardMenuOpen(false);
        }}
        onToggleCardVisibility={toggleCardVisibility}
        onCardScaleChange={updateCardScale}
        onResetCardScales={resetCardScales}
      />

      {!isArchiveLayout && <SpinePunchHoles />}

      <div
        ref={panelRef}
        className={`${isArchiveLayout ? 'archive-panel' : 'main-panel'} ${releaseCardFrame ? 'overflow-visible' : 'overflow-hidden'}`}
        style={panelStyle}
      >
      <BoardBackground layout={layout} />

      {!isArchiveLayout && releaseCardFrame && (
        <div className="home-board-drag-hint" aria-label={t.homePage.experience}>
          <span>Click and drag cards to explore</span>
          <span>点击并拖动卡片以探索</span>
        </div>
      )}

      {!hiddenCards.has('sticky') && (
      <div
        className={isArchiveLayout ? 'absolute left-[22%] top-[75%] z-40' : 'absolute right-[4%] top-[61%] z-40'}
        style={{
          transform: `translate(${cardOffsets.sticky.x}px, ${cardOffsets.sticky.y}px) scale(${cardOffsets.sticky.scale})`,
          transformOrigin: 'top left',
        }}
      >
        <StickyNote variant={isArchiveLayout ? 'archive' : 'default'} />
      </div>
      )}
      
      {!hiddenCards.has('postcardBack') && (
      <DraggableCard
        id="postcardBack"
        initialPos={isArchiveLayout ? { top: '7%', left: '30%' } : { top: '5%', left: '3%' }}
        initialRotate={isArchiveLayout ? -1 : -4}
        activeId={activeId}
        setActiveId={setActiveId}
        className={isArchiveLayout ? 'archive-card-postcard' : ''}
        visualScale={isArchiveLayout ? 0.82 : 0.72975}
        adjustOffset={cardOffsets.postcardBack}
        onAdjustOffsetChange={updateCardOffsetSnapshot}
      >
        <Postcard
          variant={isArchiveLayout ? 'archive' : 'default'}
          frontAdjust={cardOffsets.postcardFront}
          hideFront={hiddenCards.has('postcardFront')}
        />
      </DraggableCard>
      )}

      {!hiddenCards.has('blueprint') && (
      <DraggableCard
        id="blueprint"
        initialPos={isArchiveLayout ? { top: '45%', left: '35%' } : { top: 'calc(55% - 25px)', left: '8%' }}
        initialRotate={isArchiveLayout ? 0 : -5.5}
        activeId={activeId}
        setActiveId={setActiveId}
        className={isArchiveLayout ? 'archive-card-blueprint' : ''}
        visualScale={isArchiveLayout ? 0.74 : 0.76}
        adjustOffset={cardOffsets.blueprint}
        onAdjustOffsetChange={updateCardOffsetSnapshot}
      >
        <Blueprint variant={isArchiveLayout ? 'archive' : 'default'} />
      </DraggableCard>
      )}

      {!hiddenCards.has('language') && (
      <DraggableCard
        id="language"
        initialPos={isArchiveLayout ? { top: '40%', left: '63%' } : { top: '23%', left: '62%' }}
        initialRotate={isArchiveLayout ? 0 : -1}
        activeId={activeId}
        setActiveId={setActiveId}
        className={isArchiveLayout ? 'archive-card-language' : ''}
        visualScale={isArchiveLayout ? 0.74 : 0.783}
        adjustOffset={cardOffsets.language}
        onAdjustOffsetChange={updateCardOffsetSnapshot}
      >
        <LanguageProficiency variant={isArchiveLayout ? 'archive' : 'default'} />
      </DraggableCard>
      )}

      {!hiddenCards.has('toolbox') && (
      <DraggableCard
        id="toolbox"
        initialPos={isArchiveLayout ? { top: '70%', left: '79%' } : { top: '54%', left: '47%' }}
        initialRotate={isArchiveLayout ? 0 : 4}
        activeId={activeId}
        setActiveId={setActiveId}
        className={isArchiveLayout ? 'archive-card-toolbox' : ''}
        visualScale={isArchiveLayout ? 0.68 : 0.684}
        footprintScale={isArchiveLayout ? 1 : 0.85}
        adjustOffset={cardOffsets.toolbox}
        onAdjustOffsetChange={updateCardOffsetSnapshot}
      >
        <Toolbox variant={isArchiveLayout ? 'archive' : 'default'} />
      </DraggableCard>
      )}

      {/* Page Hint */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-30 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-gray-400 opacity-50">
        {t.aboutBoard.hint}
      </div>
      </div>
    </div>
  );
};
