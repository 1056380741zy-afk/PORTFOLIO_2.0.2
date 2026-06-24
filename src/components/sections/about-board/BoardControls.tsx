import React from 'react';
import { Eye, EyeOff, SlidersHorizontal, Stamp } from 'lucide-react';
import type { CardControl, CardId, StampControl } from './types';

type BoardControlsProps = {
  cardControls: CardControl[];
  cardMenuOpen: boolean;
  hiddenCards: Set<CardId>;
  stampControl?: StampControl;
  onToggleCardMenu: () => void;
  onToggleCardVisibility: (id: CardId) => void;
};

export const BoardControls: React.FC<BoardControlsProps> = ({
  cardControls,
  cardMenuOpen,
  hiddenCards,
  stampControl,
  onToggleCardMenu,
  onToggleCardVisibility,
}) => {
  const isCardVisible = (id: CardId) => !hiddenCards.has(id);

  return (
    <div
      className="fixed z-[10000] hidden items-start gap-1 lg:flex"
      style={{
        top: 'calc(clamp(1rem, 3vw, 2.5rem) - 24px)',
        left: 'calc(clamp(1rem, 4vw, 3rem) + 25vw)',
      }}
    >
      {stampControl && (
        <button
          type="button"
          onClick={stampControl.onToggle}
          aria-pressed={stampControl.isActive}
          className={`board-file-tab ${stampControl.isActive ? 'active' : 'is-muted'}`}
        >
          <Stamp size={13} />
          Stamps
        </button>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={onToggleCardMenu}
          aria-expanded={cardMenuOpen}
          className={`board-file-tab ${cardMenuOpen ? 'active' : ''}`}
        >
          <SlidersHorizontal size={13} />
          Cards
        </button>

        {cardMenuOpen && (
          <div className="absolute left-1/2 top-full mt-2 w-[164px] -translate-x-1/2 rounded-lg border border-[#2d2d2d]/10 bg-[#f9f4e8]/90 p-2 shadow-md backdrop-blur-sm">
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
                    <Eye size={13} className="text-[#8e6bbf]" />
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
    </div>
  );
};
