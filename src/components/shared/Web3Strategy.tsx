import React, { useState } from 'react';
import { BookOpen, Users, Lightbulb, Globe, ShieldCheck, Zap, TrendingUp, Scale, Layers, ClipboardList, ArrowRight, Milestone, Puzzle, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrambleHoverTitle } from './ScrambleHoverTitle';
import { useLanguage } from '../../contexts/LanguageContext';

const ICON_MAP: Record<string, React.ElementType> = {
  BookOpen,
  Users,
  Lightbulb,
  Globe,
  ShieldCheck,
  Zap,
  TrendingUp,
  Scale,
  Layers,
  ClipboardList,
  ArrowRight,
  Milestone,
  Puzzle,
  Calendar
};

const renderTextWithTags = (text: string) => {
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    // Matches: Short, Mid, Long, 0–12m, 1–3yr, 3yr+, 0–12月, 1–3年, 3年以上, 短期, 中期, 长期
    // The dash is now optional to support "删除破折号" request
    const tagMatch = line.match(/^(Short|Mid|Long|0–12m|1–3yr|3yr\+|0–12月|1–3年|3年以上|短期|中期|长期)\s*[—\-]?\s*(.*)$/);
    
    if (tagMatch) {
      const tag = tagMatch[1];
      const content = tagMatch[2];
      
      // Unified highlight yellow style from theme (#f5b002)
      const tagStyle = "bg-[#f5b002]/10 text-[#f5b002] border border-[#f5b002]/20";

      return (
        <div key={idx} className="flex items-start gap-1.5 mb-1 last:mb-0">
          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-tight shrink-0 mt-0.5 ${tagStyle}`}>
            {tag}
          </span>
          <span className="text-[10px] font-medium text-text-dark leading-snug">{content}</span>
        </div>
      );
    }
    return <div key={idx} className="text-[10px] font-medium text-text-dark leading-snug">{line}</div>;
  });
};

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
                      className="absolute inset-0 w-full h-full grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-0 bg-white overflow-y-auto lg:overflow-hidden"
                    >
                      {/* Banner & Text Area */}
                      <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-gray-100 h-fit lg:h-full">
                        <div className="pt-2 pb-0 px-0 shrink-0 flex justify-center">
                          <div className="relative w-full max-w-[92%] aspect-video max-h-[clamp(120px,24vh,210px)] overflow-hidden bg-[#f0f0f0] shrink-0 rounded-xl">
                            <motion.img 
                              animate={{ scale: isActive ? 1 : 1.05 }}
                              transition={{ duration: 0.7, ease: "easeOut" }}
                              src={project.banner} 
                              alt={project.fullTitle} 
                              className="w-full h-full object-contain" 
                            />
                          </div>
                        </div>

                        <div className="w-full max-w-[92%] mx-auto flex flex-col flex-1 py-2.5 gap-1.5 overflow-hidden">
                          <motion.span 
                            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="inline-block px-2 py-0.5 bg-gray-100 text-gray-500 font-mono text-[8px] rounded-full w-fit tracking-wider uppercase"
                          >
                            {project.projectTag}
                          </motion.span>

                          <div className="relative z-10">
                            <ScrambleHoverTitle 
                              text={project.fullTitle} 
                              className="text-sm md:text-base font-bold text-text-dark leading-tight whitespace-nowrap" 
                            />
                          </div>

                          {project.subtitle && (
                            <motion.p 
                              animate={{ opacity: isActive ? 1 : 0 }}
                              transition={{ duration: 0.4, delay: 0.2 }}
                              className="text-gray-600 text-[9px] leading-relaxed"
                            >
                              {project.subtitle}
                            </motion.p>
                          )}

                          <div className="flex flex-col gap-1 mt-0.5 pb-1">
                            {project.blocks.map((block: any, idx: number) => {
                              const isEmoji = typeof block.icon === 'string' && !ICON_MAP[block.icon];
                              const IconComponent = !isEmoji ? ICON_MAP[block.icon] : null;
                              
                              return (
                                <motion.div 
                                  key={`${project.id}-block-${idx}`}
                                  animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 10 }}
                                  transition={{ duration: 0.3, delay: 0.3 + (idx * 0.05) }}
                                  className="flex items-start gap-1.5 p-1.5 rounded-xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-sm transition-all duration-300 group"
                                >
                                  <div className="p-1 bg-white rounded-lg text-gray-400 group-hover:text-black border border-gray-100 shadow-sm transition-colors shrink-0 flex items-center justify-center w-6 h-6">
                                    {isEmoji ? <span className="text-sm">{block.icon}</span> : (IconComponent && <IconComponent size={12} />)}
                                  </div>
                                  <div className="flex flex-col gap-0.5 w-full">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span className="font-mono text-[9px] uppercase text-gray-400 tracking-wider font-bold">
                                        {block.label}
                                      </span>
                                      <span className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[9px] font-medium text-gray-500">
                                        {block.badge}
                                      </span>
                                    </div>
                                    {(block as any).isList ? (
                                      <div className="w-full">
                                        {renderTextWithTags(block.text)}
                                      </div>
                                    ) : (
                                      <span className="text-[10px] font-medium text-text-dark leading-snug">
                                        {block.text}
                                      </span>
                                    )}
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Infographic Area */}
                      <div className="bg-white relative flex flex-col items-center justify-start p-2 h-full overflow-hidden">
                         <div className="absolute top-3 right-3 z-10 font-mono text-[8px] bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded shadow-sm text-gray-600 border border-gray-100">
                            {(project as any).infographicTag || 'INFOGRAPHIC_9:16'}
                         </div>
                         <motion.img 
                           animate={{ scale: isActive ? 1 : 0.98, opacity: isActive ? 1 : 0 }}
                           transition={{ duration: 0.5 }}
                           src={project.infographic} 
                           alt="Infographic Analysis" 
                           className="h-[calc(100%-2.5rem)] w-auto max-w-[86%] object-contain object-top rounded-3xl mt-5"
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
