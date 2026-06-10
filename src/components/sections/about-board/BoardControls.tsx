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
    <div className="absolute bottom-5 left-5 z-[320] flex items-end gap-2">
      {stampControl && (
        <button
          type="button"
          onClick={stampControl.onToggle}
          aria-pressed={stampControl.isActive}
          className={`flex h-9 items-center gap-2 rounded-lg border px-3 text-[10px] font-mono uppercase tracking-[0.2em] shadow-sm backdrop-blur-sm transition-colors ${
            stampControl.isActive
              ? 'border-[#8e6bbf]/25 bg-[#8e6bbf]/10 text-[#8e6bbf]'
              : 'border-[#2d2d2d]/10 bg-white/75 text-text-dark/65 hover:bg-white hover:text-text-dark'
          }`}
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
          className="flex h-9 items-center gap-2 rounded-lg border border-[#2d2d2d]/10 bg-white/75 px-3 text-[10px] font-mono uppercase tracking-[0.2em] text-text-dark/65 shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-text-dark"
        >
          <SlidersHorizontal size={13} />
          Cards
        </button>

        {cardMenuOpen && (
          <div className="absolute bottom-full left-0 mb-2 w-[172px] rounded-xl border border-[#2d2d2d]/10 bg-white/85 p-2 shadow-lg backdrop-blur-sm">
            {cardControls.map((card) => {
              const visible = isCardVisible(card.id);
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => onToggleCardVisibility(card.id)}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[10px] font-mono uppercase tracking-[0.14em] text-text-dark/65 transition-colors hover:bg-[#f7f6f3] hover:text-text-dark"
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
