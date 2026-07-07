export type CardId = 'postcardBack' | 'postcardFront' | 'blueprint' | 'language' | 'toolbox' | 'sticky';

export type CardControl = {
  id: CardId;
  label: string;
};

export type CardAdjustOffset = {
  x: number;
  y: number;
  scale: number;
};

export type CardAdjustControl = {
  isOpen: boolean;
  offsets: Record<CardId, CardAdjustOffset>;
  onToggle: () => void;
  onChange: (id: CardId, axis: keyof CardAdjustOffset, value: number) => void;
  onReset: () => void;
};

export type StampControl = {
  isActive: boolean;
  onToggle: () => void;
};
