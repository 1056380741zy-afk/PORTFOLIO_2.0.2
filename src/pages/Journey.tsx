import React from 'react';
import { JourneyMap } from '../components/sections/JourneyMap';

export const Journey: React.FC = () => {
  return (
    // 把 min-h-full 改为 h-full，并加上 min-h-0
    <main className="flex-1 h-full flex flex-col min-h-0">
      <JourneyMap />
    </main>
  );
};