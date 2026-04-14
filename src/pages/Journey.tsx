import React from 'react';
import { JourneyMap } from '../components/sections/JourneyMap';

export const Journey: React.FC = () => {
  return (
    <main className="flex-1 min-h-full flex flex-col">
      <JourneyMap />
    </main>
  );
};
