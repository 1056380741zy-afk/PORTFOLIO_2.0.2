export type CardId = 'postcard' | 'blueprint' | 'language' | 'toolbox' | 'sticky';

export type CardControl = {
  id: CardId;
  label: string;
};

export type StampControl = {
  isActive: boolean;
  onToggle: () => void;
};
