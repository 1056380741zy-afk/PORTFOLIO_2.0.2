import React, { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Eye, EyeOff, RotateCcw, Scaling, SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import type { CardAdjustOffset, CardControl, CardId } from './types';

type BoardControlsProps = {
  cardControls: CardControl[];
  cardMenuOpen: boolean;
  scaleMenuOpen: boolean;
  cardOffsets: Record<CardId, CardAdjustOffset>;
  hiddenCards: Set<CardId>;
  onToggleCardMenu: () => void;
  onToggleScaleMenu: () => void;
  onToggleCardVisibility: (id: CardId) => void;
  onCardScaleChange: (id: CardId, scale: number) => void;
  onResetCardScales: () => void;
};

export const BoardControls: React.FC<BoardControlsProps> = ({
  cardControls,
  cardMenuOpen,
  scaleMenuOpen,
  cardOffsets,
  hiddenCards,
  onToggleCardMenu,
  onToggleScaleMenu,
  onToggleCardVisibility,
  onCardScaleChange,
  onResetCardScales,
}) => {
  const { language } = useLanguage();
  const isCardVisible = (id: CardId) => !hiddenCards.has(id);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    setPortalTarget(document.querySelector<HTMLElement>('.portfolio-main-board'));
  }, []);

  const controls = (
    <div
      className="board-controls absolute z-[10000] flex items-start gap-1"
      style={{
        top: '-24px',
        left: '437px',
      }}
    >
      <div className="relative">
        <button
          type="button"
          onClick={onToggleCardMenu}
          aria-expanded={cardMenuOpen}
          className={`board-file-tab ${cardMenuOpen ? 'active' : ''}`}
        >
          <SlidersHorizontal size={13} />
          <span>Cards</span>
        </button>

        {cardMenuOpen && (
          <div className="board-card-menu board-card-visibility-menu absolute top-full mt-2 w-[164px] rounded-lg border border-[#2d2d2d]/10 bg-[#fcf9f0]/95 p-2 shadow-md">
            {cardControls.map((card) => {
              const visible = isCardVisible(card.id);
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => onToggleCardVisibility(card.id)}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[10px] font-mono uppercase tracking-[0.14em] text-text-dark/65 transition-colors hover:bg-[#efe1d1] hover:text-text-dark"
                >
                  {visible ? (
                    <Eye size={13} className="text-[#9f8fdb]" />
                  ) : (
                    <EyeOff size={13} className="text-text-dark/35" />
                  )}
                  <span>{card.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={onToggleScaleMenu}
          aria-expanded={scaleMenuOpen}
          className={`board-file-tab ${scaleMenuOpen ? 'active' : ''}`}
        >
          <Scaling size={13} />
          <span>Scale</span>
        </button>

        {scaleMenuOpen && (
          <div className="board-card-menu board-scale-menu absolute top-full mt-2 w-[224px] rounded-lg border border-[#2d2d2d]/10 bg-[#fcf9f0]/95 p-3 shadow-md">
            <div className="space-y-2.5">
              {cardControls.map((card) => (
                <label key={card.id} className="block">
                  <span className="mb-1 flex items-center justify-between font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-text-dark/65">
                    <span>{card.label}</span>
                    <span className="text-[#7f65bf]">{Math.round(cardOffsets[card.id].scale * 100)}%</span>
                  </span>
                  <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.05"
                    value={cardOffsets[card.id].scale}
                    onChange={(event) => onCardScaleChange(card.id, Number(event.target.value))}
                    className="board-scale-range block w-full"
                    style={{
                      '--scale-progress': `${(cardOffsets[card.id].scale - 0.5) * 100}%`,
                    } as React.CSSProperties}
                    aria-label={`${card.label} scale`}
                  />
                </label>
              ))}
            </div>
            <button
              type="button"
              onClick={onResetCardScales}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-[#2d2d2d]/10 px-2 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-text-dark/60 transition-colors hover:border-[#9f8fdb]/35 hover:bg-[#9f8fdb]/10 hover:text-[#7f65bf]"
            >
              <RotateCcw size={12} />
              {language === 'cn' ? '重置缩放' : 'Reset scale'}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return portalTarget ? createPortal(controls, portalTarget) : null;
};
