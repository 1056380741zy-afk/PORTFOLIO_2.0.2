import React from 'react';
import { JourneyMap } from '../components/sections/JourneyMap';

export const Journey: React.FC = () => {
  return (
    <main className="flex-1 h-full max-h-full flex flex-col min-h-0 overflow-hidden">
      <JourneyMap />
    </main>
  );
};
