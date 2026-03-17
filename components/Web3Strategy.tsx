import React, { useState } from 'react';
import { BookOpen, Users, Lightbulb, Globe, ShieldCheck, Zap, TrendingUp, Scale, Layers, ClipboardList, ArrowRight, Milestone, Puzzle, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrambleHoverTitle } from './ScrambleHoverTitle';
import { useLanguage } from '../contexts/LanguageContext';

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
      
      // Unified highlight yellow style from theme (#edab05)
      const tagStyle = "bg-[#edab05]/10 text-[#edab05] border border-[#edab05]/20";

      return (
        <div key={idx} className="flex items-start gap-2 mb-2 last:mb-0">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight shrink-0 mt-0.5 ${tagStyle}`}>
            {tag}
          </span>
          <span className="text-[13px] font-medium text-text-dark leading-snug">{content}</span>
        </div>
      );
    }
    return <div key={idx} className="text-[13px] font-medium text-text-dark leading-snug">{line}</div>;
  });
};

export const Web3Strategy: React.FC = () => {
  const { t } = useLanguage();
  // Ensure we have data even if context update is pending or type mismatch
  const strategyData = t.projects.web3Strategy || [];
  const [activeId, setActiveId] = useState(strategyData[0]?.id || 'uae');

  if (!strategyData.length) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-[2px] bg-text-dark" />
        <h3 className="text-xl md:text-2xl font-bold tracking-wide text-text-dark">
          {t.projects.web3Title}
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-stretch w-full relative">
        {/* 1. Navigator (Left Sidebar) */}
        <div className="w-full flex flex-row lg:grid lg:grid-rows-3 gap-6 overflow-x-auto lg:overflow-visible py-4 lg:py-0 no-scrollbar h-full">
          {strategyData.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                id={`card${item.num}`}
                onClick={() => setActiveId(item.id)}
                className={`group relative flex flex-col items-start px-3 py-3 rounded-xl text-left transition-all duration-300 flex-1 lg:h-full min-w-[180px] lg:min-w-0 ${
                  isActive 
                    ? 'bg-white border border-gray-200 shadow-sm' 
                    : 'bg-transparent border border-transparent hover:bg-white/50'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className={`font-mono text-xl leading-none ${isActive ? 'text-black font-semibold' : 'text-gray-400'}`}>
                    {item.num}
                  </span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></div>}
                </div>
                
                <div className="flex flex-col gap-1 w-full">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-gray-500">
                    {item.label}
                  </span>
                  <span className={`text-sm font-bold leading-tight my-1 ${isActive ? 'text-black' : 'text-gray-600'}`}>
                    {item.sidebarTitle}
                  </span>
                  
                  <div className="flex flex-col gap-1.5 mt-2 items-start">
                    {item.sidebarTags.map((tag: string) => (
                      <span key={tag} className="text-[13px] text-gray-500 font-mono leading-tight bg-gray-100/50 px-1.5 py-0.5 rounded">
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
          <div className="h-[715px]">
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
                      className="absolute inset-0 w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white overflow-y-auto lg:overflow-hidden"
                    >
                      {/* Banner & Text Area */}
                      <div className="lg:col-span-6 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-100 h-fit lg:h-full">
                        <div className="p-3 pb-0 shrink-0">
                          <div className="relative w-full aspect-video overflow-hidden bg-[#f0f0f0] shrink-0 rounded-xl">
                            <motion.img 
                              animate={{ scale: isActive ? 1 : 1.05 }}
                              transition={{ duration: 0.7, ease: "easeOut" }}
                              src={project.banner} 
                              alt={project.fullTitle} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        </div>

                        <div className="flex flex-col flex-1 p-4 gap-3 overflow-y-auto">
                          <motion.span 
                            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="inline-block px-2.5 py-0.5 bg-gray-100 text-gray-500 font-mono text-[9px] rounded-full w-fit tracking-wider uppercase"
                          >
                            {project.projectTag}
                          </motion.span>

                          <div className="relative z-10">
                            <ScrambleHoverTitle 
                              text={project.fullTitle} 
                              className="text-lg md:text-xl font-bold text-text-dark leading-tight whitespace-pre-line" 
                            />
                          </div>

                          <motion.p 
                            animate={{ opacity: isActive ? 1 : 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="text-gray-600 text-[10px] leading-relaxed"
                          >
                            {project.subtitle}
                          </motion.p>

                          <div className="flex flex-col gap-2 mt-1 pb-4">
                            {project.blocks.map((block: any, idx: number) => {
                              const isEmoji = typeof block.icon === 'string' && !ICON_MAP[block.icon];
                              const IconComponent = !isEmoji ? ICON_MAP[block.icon] : null;
                              
                              return (
                                <motion.div 
                                  key={`${project.id}-block-${idx}`}
                                  animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 10 }}
                                  transition={{ duration: 0.3, delay: 0.3 + (idx * 0.05) }}
                                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-sm transition-all duration-300 group"
                                >
                                  <div className="p-1.5 bg-white rounded-lg text-gray-400 group-hover:text-black border border-gray-100 shadow-sm transition-colors shrink-0 flex items-center justify-center w-8 h-8">
                                    {isEmoji ? <span className="text-base">{block.icon}</span> : (IconComponent && <IconComponent size={14} />)}
                                  </div>
                                  <div className="flex flex-col gap-0.5 w-full">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="font-mono text-[13px] uppercase text-gray-400 tracking-wider font-bold">
                                        {block.label}
                                      </span>
                                      <span className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[13px] font-medium text-gray-500">
                                        {block.badge}
                                      </span>
                                    </div>
                                    {(block as any).isList ? (
                                      <div className="w-full">
                                        {renderTextWithTags(block.text)}
                                      </div>
                                    ) : (
                                      <span className="text-[13px] font-medium text-text-dark leading-snug">
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
                      <div className="lg:col-span-6 bg-white relative flex flex-col p-3 h-full overflow-hidden">
                         <div className="absolute top-4 right-4 z-10 font-mono text-[9px] bg-white/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm text-gray-600 border border-gray-100">
                            {(project as any).infographicTag || 'INFOGRAPHIC_9:16'}
                         </div>
                         <motion.img 
                           animate={{ scale: isActive ? 1 : 0.98, opacity: isActive ? 1 : 0 }}
                           transition={{ duration: 0.5 }}
                           src={project.infographic} 
                           alt="Infographic Analysis" 
                           className="w-full h-full object-contain object-top rounded-3xl"
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
