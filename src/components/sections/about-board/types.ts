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
  exportText: string;
  copied: boolean;
  onToggle: () => void;
  onChange: (id: CardId, axis: keyof CardAdjustOffset, value: number) => void;
  onReset: () => void;
  onCopy: () => void;
};
