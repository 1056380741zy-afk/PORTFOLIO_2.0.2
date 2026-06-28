import React from 'react';
import { Eye, EyeOff, Move, RotateCcw, SlidersHorizontal, Stamp } from 'lucide-react';
import type { CardAdjustControl, CardControl, CardId, StampControl } from './types';

type BoardControlsProps = {
  cardControls: CardControl[];
  cardMenuOpen: boolean;
  hiddenCards: Set<CardId>;
  stampControl?: StampControl;
  cardAdjustControl?: CardAdjustControl;
  onToggleCardMenu: () => void;
  onToggleCardVisibility: (id: CardId) => void;
};

export const BoardControls: React.FC<BoardControlsProps> = ({
  cardControls,
  cardMenuOpen,
  hiddenCards,
  stampControl,
  cardAdjustControl,
  onToggleCardMenu,
  onToggleCardVisibility,
}) => {
  const isCardVisible = (id: CardId) => !hiddenCards.has(id);
  const adjustableCards = cardControls;

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
          <div className="absolute left-1/2 top-full mt-2 w-[164px] -translate-x-1/2 rounded-lg border border-[#2d2d2d]/10 bg-[#fdfcf4]/90 p-2 shadow-md backdrop-blur-sm">
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

      {cardAdjustControl && (
        <div className="relative">
          <button
            type="button"
            onClick={cardAdjustControl.onToggle}
            aria-expanded={cardAdjustControl.isOpen}
            className={`board-file-tab ${cardAdjustControl.isOpen ? 'active' : ''}`}
          >
            <Move size={13} />
            Adjust
          </button>

          {cardAdjustControl.isOpen && (
            <div className="absolute left-1/2 top-full mt-2 w-[260px] -translate-x-1/2 rounded-lg border border-[#2d2d2d]/10 bg-[#fdfcf4]/90 p-3 shadow-md backdrop-blur-sm">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-dark/60">
                  Card Position
                </span>
                <button
                  type="button"
                  onClick={cardAdjustControl.onReset}
                  className="flex items-center gap-1 rounded px-1.5 py-1 text-[9px] font-mono uppercase tracking-[0.12em] text-text-dark/45 hover:bg-[#efe1d1] hover:text-text-dark"
                >
                  <RotateCcw size={11} />
                  Reset
                </button>
              </div>

              <div className="grid gap-2">
                {adjustableCards.map((card) => {
                  const current = cardAdjustControl.offsets[card.id] ?? { x: 0, y: 0 };
                  return (
                    <div key={card.id} className="grid grid-cols-[76px_1fr_1fr] items-center gap-2">
                      <span className="text-[9px] font-mono uppercase tracking-[0.12em] text-text-dark/60">
                        {card.label}
                      </span>
                      {(['x', 'y'] as const).map((axis) => (
                        <label key={axis} className="flex items-center gap-1">
                          <span className="text-[9px] font-mono uppercase text-text-dark/35">{axis}</span>
                          <input
                            type="number"
                            value={current[axis]}
                            onChange={(event) => {
                              const next = Number(event.target.value);
                              cardAdjustControl.onChange(card.id, axis, Number.isFinite(next) ? next : 0);
                            }}
                            className="h-7 w-full rounded border border-[#2d2d2d]/10 bg-white/70 px-1.5 text-[10px] font-mono text-text-dark outline-none focus:border-[#8e6bbf]/45"
                          />
                        </label>
                      ))}
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
