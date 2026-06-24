import React, { useState } from 'react';
import { Box, Star, Workflow } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrambleHoverTitle } from './ScrambleHoverTitle';
import { useLanguage } from '../../contexts/LanguageContext';

const DETAIL_ICONS = [Star, Workflow, Box];

const splitDetailTags = (text: string) =>
  text
    .split(/[,，、｜|]/)
    .map((tag) => tag.trim().replace(/[.。]$/, ''))
    .filter(Boolean);

export const Web3Strategy: React.FC = () => {
  const { t } = useLanguage();
  // Ensure we have data even if context update is pending or type mismatch
  const strategyData = t.projects.web3Strategy || [];
  const [activeId, setActiveId] = useState(strategyData[0]?.id || 'uae');

  if (!strategyData.length) return null;

  return (
    <div className="mb-0 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr] gap-4 items-stretch w-full relative">
        {/* 1. Navigator (Left Sidebar / Top Grid) */}
        <div className="w-full grid grid-cols-3 lg:grid-cols-1 lg:grid-rows-3 gap-3 md:gap-4 h-full lg:h-[490px]">
          {strategyData.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                id={`card${item.num}`}
                onClick={() => setActiveId(item.id)}
                className={`group relative flex flex-col items-start px-3 py-2.5 rounded-xl text-left transition-all duration-300 flex-1 lg:h-full min-w-[180px] lg:min-w-0 ${
                  isActive 
                    ? 'bg-white border border-gray-200 shadow-sm' 
                    : 'bg-transparent border border-transparent hover:bg-white/50'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1.5">
                  <span className={`font-mono text-lg leading-none ${isActive ? 'text-black font-semibold' : 'text-gray-400'}`}>
                    {item.num}
                  </span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></div>}
                </div>
                
                <div className="flex flex-col gap-1 w-full">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-gray-500">
                    {item.label}
                  </span>
                  <span className={`text-[13px] font-bold leading-tight my-0.5 ${isActive ? 'text-black' : 'text-gray-600'}`}>
                    {item.sidebarTitle}
                  </span>
                  
                  <div className="flex flex-col gap-1 mt-1.5 items-start">
                    {item.sidebarTags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-[11px] text-gray-500 font-mono leading-tight bg-gray-100/50 px-1.5 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* 2. Content Area (Right Content) */}
        <div className="flex-1 w-full relative">
          
          {/* 2.1 Display Area */}
          <div className="h-[496px]">
             <div className="bg-white rounded-[1.5rem] shadow-sm border border-gray-200 overflow-hidden relative w-full h-full">
                
                {strategyData.map((project) => {
                  const isActive = activeId === project.id;
                  
                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: isActive ? 1 : 0,
                        zIndex: isActive ? 10 : 0,
                        pointerEvents: isActive ? 'auto' : 'none'
                      }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full grid grid-cols-1 lg:grid-cols-[minmax(0,2.35fr)_minmax(220px,0.8fr)] gap-0 bg-white overflow-y-auto lg:overflow-hidden"
                    >
                      {/* Banner & Text Area */}
                      <div className="flex h-fit flex-col border-b border-gray-100 bg-white lg:h-full lg:border-b-0 lg:border-r">
                        <div className="mx-auto flex h-full w-full max-w-[92%] flex-col py-5">
                          <motion.div
                            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
                            transition={{ duration: 0.35, delay: 0.05 }}
                            className="shrink-0"
                          >
                            <ScrambleHoverTitle
                              text={project.fullTitle}
                              className="text-sm md:text-base font-bold text-text-dark leading-tight whitespace-nowrap"
                            />
                          </motion.div>

                          <div className="mt-3 flex shrink-0 justify-center">
                            <div className="relative aspect-video w-[45%] overflow-hidden rounded-lg border border-gray-200 bg-[#f7f6f3]">
                              <motion.img
                                animate={{ scale: isActive ? 1 : 1.02 }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                                src={project.banner}
                                alt={project.fullTitle}
                                className="h-full w-full object-contain"
                              />
                            </div>
                          </div>

                          <div className="mt-4 grid min-h-0 flex-1 grid-cols-2 gap-3">
                            {[
                              { label: 'SKILLS', text: project.skills },
                              { label: 'PROCESS', text: project.process },
                              { label: 'OUTPUT', text: project.output }
                            ].map((block, idx) => {
                              const Icon = DETAIL_ICONS[idx];
                              return (
                                <motion.div
                                  key={`${project.id}-${block.label}`}
                                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
                                  transition={{ duration: 0.3, delay: 0.14 + idx * 0.04 }}
                                  className={`flex min-h-[74px] items-start gap-3 rounded-lg border border-gray-200 bg-white/80 p-3 shadow-[0_8px_20px_rgba(0,0,0,0.02)] ${
                                    block.label === 'SKILLS' ? 'col-span-2' : ''
                                  }`}
                                >
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#8e6bbf]/35 bg-[#8e6bbf]/5 text-[#8e6bbf]">
                                    <Icon size={20} strokeWidth={1.6} />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="text-[13px] font-bold uppercase leading-tight text-text-dark">
                                      {block.label}
                                    </div>
                                    <div className="mt-1 h-px w-7 bg-[#8e6bbf]" />
                                    {block.label === 'SKILLS' ? (
                                      <div className="mt-2 flex flex-wrap gap-1">
                                        {splitDetailTags(block.text).map((tag) => (
                                          <span
                                            key={tag}
                                            className="rounded border border-[#8e6bbf]/20 bg-[#8e6bbf]/5 px-1.5 py-0.5 text-[9px] font-medium leading-tight text-text-dark/70"
                                          >
                                            {tag}
                                          </span>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="mt-2 text-[10px] font-medium leading-snug text-text-dark/70">
                                        {block.text}
                                      </p>
                                    )}
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Infographic Area */}
                      <div className="bg-white relative flex flex-col items-center justify-center p-1 h-full overflow-hidden">
                         <div className="absolute top-2 right-2 z-10 font-mono text-[8px] bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded shadow-sm text-gray-600 border border-gray-100">
                            {(project as any).infographicTag || 'INFOGRAPHIC_9:16'}
                         </div>
                         <motion.img 
                           animate={{ scale: isActive ? 1 : 0.98, opacity: isActive ? 1 : 0 }}
                           transition={{ duration: 0.5 }}
                           src={project.infographic} 
                           alt="Infographic Analysis" 
                           className="h-[calc(100%-3rem)] w-auto max-w-[90%] object-contain object-center rounded-3xl"
                         />
                      </div>
                    </motion.div>
                  );
                })}

             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
