import React from 'react';
import { Eye, EyeOff, Move, RotateCcw, SlidersHorizontal } from 'lucide-react';
import type { CardAdjustControl, CardControl, CardId } from './types';

type BoardControlsProps = {
  cardControls: CardControl[];
  cardMenuOpen: boolean;
  hiddenCards: Set<CardId>;
  adjustControl?: CardAdjustControl;
  onToggleCardMenu: () => void;
  onToggleCardVisibility: (id: CardId) => void;
};

export const BoardControls: React.FC<BoardControlsProps> = ({
  cardControls,
  cardMenuOpen,
  hiddenCards,
  adjustControl,
  onToggleCardMenu,
  onToggleCardVisibility,
}) => {
  const isCardVisible = (id: CardId) => !hiddenCards.has(id);

  return (
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
          Cards
        </button>

        {cardMenuOpen && (
          <div className="absolute left-1/2 top-full mt-2 w-[164px] -translate-x-1/2 rounded-lg border border-[#2d2d2d]/10 bg-[#fcf9f0]/90 p-2 shadow-md backdrop-blur-sm">
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

      {adjustControl && (
        <div className="relative">
          <button
            type="button"
            onClick={adjustControl.onToggle}
            aria-expanded={adjustControl.isOpen}
            className={`board-file-tab ${adjustControl.isOpen ? 'active' : 'is-muted'}`}
          >
            <Move size={13} />
            Adjust
          </button>

          {adjustControl.isOpen && (
            <div className="absolute left-1/2 top-full mt-2 w-[330px] -translate-x-1/2 rounded-lg border border-[#2d2d2d]/10 bg-[#fcf9f0]/92 p-3 shadow-md backdrop-blur-sm">
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-dark/55">
                  Card Position / Scale
                </div>
                <button
                  type="button"
                  onClick={adjustControl.onReset}
                  className="inline-flex items-center gap-1 rounded-full px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-text-dark/45 transition-colors hover:bg-[#9f8fdb]/12 hover:text-[#9f8fdb]"
                >
                  <RotateCcw size={11} />
                  Reset
                </button>
              </div>

              <div className="grid grid-cols-[78px_repeat(3,minmax(0,1fr))] gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-text-dark/40">
                <div />
                <div>X</div>
                <div>Y</div>
                <div>Scale</div>
              </div>

              <div className="mt-1.5 space-y-1.5">
                {cardControls.map((card) => {
                  const offset = adjustControl.offsets[card.id];
                  return (
                    <div key={card.id} className="grid grid-cols-[78px_repeat(3,minmax(0,1fr))] items-center gap-1.5">
                      <label className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-dark/55">
                        {card.label}
                      </label>
                      <input
                        type="number"
                        value={offset.x}
                        onChange={(event) => adjustControl.onChange(card.id, 'x', Number(event.target.value))}
                        className="h-7 rounded-md border border-[#2d2d2d]/10 bg-white/72 px-2 font-mono text-[11px] text-text-dark outline-none transition-colors focus:border-[#9f8fdb]/55"
                      />
                      <input
                        type="number"
                        value={offset.y}
                        onChange={(event) => adjustControl.onChange(card.id, 'y', Number(event.target.value))}
                        className="h-7 rounded-md border border-[#2d2d2d]/10 bg-white/72 px-2 font-mono text-[11px] text-text-dark outline-none transition-colors focus:border-[#9f8fdb]/55"
                      />
                      <input
                        type="number"
                        min="0.2"
                        max="2"
                        step="0.01"
                        value={offset.scale}
                        onChange={(event) => adjustControl.onChange(card.id, 'scale', Number(event.target.value))}
                        className="h-7 rounded-md border border-[#2d2d2d]/10 bg-white/72 px-2 font-mono text-[11px] text-text-dark outline-none transition-colors focus:border-[#9f8fdb]/55"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
