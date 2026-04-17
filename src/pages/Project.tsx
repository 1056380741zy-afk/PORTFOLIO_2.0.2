import React from 'react';
import { Projects as ProjectsSection } from '../components/sections/Projects';

/**
 * 项目页面 - 展示全部项目
 * 包含：项目案例、Web3项目、展览
 */
export const Project: React.FC = () => {
  return (
    <main className="flex-1 min-h-full flex flex-col">
      <ProjectsSection />
    </main>
  );
};