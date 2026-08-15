import React, { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Eye, EyeOff, SlidersHorizontal } from 'lucide-react';
import type { CardControl, CardId } from './types';

type BoardControlsProps = {
  cardControls: CardControl[];
  cardMenuOpen: boolean;
  hiddenCards: Set<CardId>;
  onToggleCardMenu: () => void;
  onToggleCardVisibility: (id: CardId) => void;
};

export const BoardControls: React.FC<BoardControlsProps> = ({
  cardControls,
  cardMenuOpen,
  hiddenCards,
  onToggleCardMenu,
  onToggleCardVisibility,
}) => {
  const isCardVisible = (id: CardId) => !hiddenCards.has(id);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    setPortalTarget(document.querySelector<HTMLElement>('.home-document-grid'));
  }, []);

  const controls = (
    <div
      className="fixed z-[10000] flex items-start gap-1"
      style={{
        top: '16px',
        left: '485px',
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
          <div className="board-card-menu absolute left-1/2 top-full ml-[22px] mt-2 w-[164px] -translate-x-1/2 rounded-lg border border-[#2d2d2d]/10 bg-[#fcf9f0]/90 p-2 shadow-md backdrop-blur-sm">
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
    </div>
  );

  return portalTarget ? createPortal(controls, portalTarget) : null;
};
