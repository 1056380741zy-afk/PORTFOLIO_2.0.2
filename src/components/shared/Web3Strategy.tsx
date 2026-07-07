import React, { useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  ClipboardList,
  Lightbulb,
  Maximize2,
  Network,
  Search,
  Target,
  UserCheck,
  Users,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrambleHoverTitle } from './ScrambleHoverTitle';
import { useLanguage } from '../../contexts/LanguageContext';

const DETAIL_ICONS = [Users, Target, BadgeCheck];
const SKILL_ICONS = [Network, ClipboardList, Search, Lightbulb, BarChart3, UserCheck];

const splitDetailTags = (text: string) =>
  text
    .split(/[,，、｜|]/)
    .map((tag) => tag.trim().replace(/[.。]$/, ''))
    .filter(Boolean);

export const Web3Strategy: React.FC = () => {
  const { t, language } = useLanguage();
  // Ensure we have data even if context update is pending or type mismatch
  const strategyData = t.projects.web3Strategy || [];
  const [activeId, setActiveId] = useState(strategyData[0]?.id || 'uae');
  const [expandedImage, setExpandedImage] = useState<null | { src: string; alt: string }>(null);

  if (!strategyData.length) return null;

  const activeProject = strategyData.find((item) => item.id === activeId) || strategyData[0];
  const isCn = language === 'cn';
  let focusCopy = isCn
    ? '从监管、平台能力和区域机会判断交易所扩张路径。'
    : 'Regulatory, platform and regional signals for exchange expansion strategy.';

  if (activeProject.id === 'uae') {
    focusCopy = isCn
      ? '制度、文化与平台因素如何影响阿联酋 Web3 女性参与。'
      : "Institutional, cultural and platform factors shaping women's participation in UAE Web3.";
  } else if (activeProject.id === 'sandbox') {
    focusCopy = isCn
      ? '围绕 MENA 市场进入、社交平台协同与低风险联盟路线展开。'
      : 'MENA market entry, social platform synergy and a lower-risk alliance route.';
  }

  return (
    <div className="mb-0 w-full">
      <div className="grid w-full grid-cols-1 gap-3 lg:min-h-[520px] lg:grid-cols-[730px_459px]">
        <div className="flex min-w-0 max-w-[730px] flex-col gap-3">
          <div className="grid w-full max-w-[700px] grid-cols-1 gap-3 md:grid-cols-[repeat(3,220px)] md:justify-between">
            {strategyData.map((item) => {
              const isActive = activeId === item.id;
              const accentText = isActive ? 'text-[#9f8fdb]' : 'text-[#7E8966] group-hover:text-[#9f8fdb]';
              return (
                <button
                  key={item.id}
                  id={`card${item.num}`}
                  onClick={() => setActiveId(item.id)}
                  className={`group relative flex min-h-[132px] flex-col items-start overflow-visible rounded-xl border bg-white/[0.76] px-4 py-4 text-left shadow-[0_8px_18px_rgba(52,35,24,0.08)] transition-all duration-300 before:absolute before:left-5 before:right-5 before:top-0 before:h-2 before:-translate-y-[3px] before:rounded-t-md before:content-[''] hover:border-[#9f8fdb]/42 hover:bg-white hover:before:bg-[#9f8fdb] ${
                    isActive
                      ? 'border-[#9f8fdb]/40 before:bg-[#9f8fdb] shadow-[0_10px_22px_rgba(73,48,34,0.12),0_3px_0_#32136f]'
                      : 'border-[#7E8966]/24 before:bg-[#7E8966]'
                  }`}
                >
                  <div className="flex w-full items-start justify-between gap-3">
                    <span
                      className={`font-serif text-[30px] font-semibold leading-none transition-colors duration-200 ${accentText}`}
                    >
                      {item.num}
                    </span>
                    <ArrowRight
                      size={20}
                      strokeWidth={1.5}
                      className="mt-1 shrink-0 text-[#7E8966] transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#9f8fdb]"
                    />
                  </div>

                  <span
                    className={`mt-2 font-mono text-[14px] font-bold uppercase leading-tight tracking-normal transition-colors duration-200 ${accentText}`}
                  >
                    {item.label}
                  </span>
                  <ul className="mt-3 flex flex-col gap-1 pl-4 text-[12px] font-medium leading-tight text-[#15120f]">
                    {[item.sidebarTitle, ...item.sidebarTags].map((tag: string) => (
                      <li key={tag} className="list-disc marker:text-[#7E8966] group-hover:marker:text-[#9f8fdb]">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>

          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <ScrambleHoverTitle
              text={activeProject.fullTitle}
              className="block max-w-none whitespace-nowrap pt-[15px] text-[24px] font-bold leading-[1.05] text-[#21194d]"
            />
            <div className="mt-3 h-1 w-10 rounded-full bg-[#f2b642]" />
            <p
              className="mt-3 w-full max-w-[700px] whitespace-nowrap text-[14px] leading-[1.45] text-[#15120f]"
              style={{ fontFamily: '"Inter Variable", Arial, sans-serif' }}
            >
              {focusCopy}
            </p>

            <div className="mt-[5px] h-[256px] w-full max-w-[700px] overflow-hidden rounded-xl border border-[#2d2d2d]/10 bg-white/70 px-4 py-3 shadow-[0_6px_16px_rgba(52,35,24,0.05)]">
              {[
                { label: 'PROCESS', text: activeProject.process },
                { label: 'OUTPUT', text: activeProject.output },
                { label: 'SKILLS', text: activeProject.skills },
              ].map((block, idx) => {
                const Icon = DETAIL_ICONS[idx];
                const isSkills = block.label === 'SKILLS';
                return (
                  <div
                    key={`${activeProject.id}-${block.label}`}
                    className={`grid grid-cols-[58px_92px_minmax(0,1fr)] items-start gap-3 ${
                      isSkills ? 'min-h-[92px] py-2' : 'py-2.5'
                    } ${
                      idx === 0 ? 'pt-0.5' : 'border-t border-dashed border-[#7E8966]/24'
                    }`}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#7E8966]/28 bg-[#fcf9f0]/72 text-[#7E8966]">
                      <Icon size={23} strokeWidth={1.55} />
                    </div>
                    <div className="pt-3 text-[15px] font-bold uppercase leading-none text-[#32136f]">
                      {block.label}
                    </div>
                    {isSkills ? (
                      <div className="grid grid-cols-3 overflow-hidden rounded-lg border border-[#7E8966]/24 bg-[#fcf9f0]/58">
                        {splitDetailTags(block.text).map((tag, tagIdx) => {
                          const SkillIcon = SKILL_ICONS[tagIdx % SKILL_ICONS.length];
                          return (
                            <span
                              key={tag}
                              className="inline-flex min-w-0 items-center justify-center gap-2 border-b border-r border-[#7E8966]/18 px-2.5 py-1.5 text-center text-[11px] font-semibold leading-tight text-[#32136f] last:border-r-0"
                            >
                              <SkillIcon size={15} strokeWidth={1.45} className="shrink-0 text-[#7E8966]" />
                              <span className="min-w-0">{tag}</span>
                            </span>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="m-0 pt-1.5 text-[13px] font-medium leading-[1.38] text-[#15120f]/82">
                        {block.text}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <motion.div
          key={`${activeProject.id}-visuals`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="grid w-full gap-2 lg:-mr-[15px] lg:w-[459px] lg:justify-self-end"
        >
          <div className="relative aspect-[1672/941] overflow-hidden rounded-xl border border-[#2d2d2d]/10 bg-white shadow-[0_8px_18px_rgba(52,35,24,0.08)]">
            <img
              src={activeProject.banner}
              alt={activeProject.fullTitle}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative aspect-[1672/941] overflow-hidden rounded-xl border border-[#2d2d2d]/10 bg-white shadow-[0_8px_18px_rgba(52,35,24,0.08)]">
            <div className="absolute right-3 top-2 z-10 rounded-full bg-white/90 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[#32136f]/68 shadow-sm">
              {(activeProject as any).infographicTag || 'Infographic'}
            </div>
            <button
              type="button"
              aria-label="Enlarge infographic"
              title="Enlarge infographic"
              onClick={() =>
                setExpandedImage({
                  src: activeProject.infographic,
                  alt: `${activeProject.fullTitle} infographic`,
                })
              }
              className="absolute left-2 top-2 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#32136f] shadow-sm transition-transform duration-200 hover:scale-105 hover:bg-white"
            >
              <Maximize2 size={15} strokeWidth={1.8} />
            </button>
            <img
              src={activeProject.infographic}
              alt={`${activeProject.fullTitle} infographic`}
              onClick={() =>
                setExpandedImage({
                  src: activeProject.infographic,
                  alt: `${activeProject.fullTitle} infographic`,
                })
              }
              className="h-full w-full cursor-zoom-in object-cover"
            />
          </div>
        </motion.div>
      </div>

      {expandedImage && (
        <div
          className="fixed inset-0 z-[10020] flex items-center justify-center bg-[#15120f]/72 p-6 backdrop-blur-sm"
          onClick={() => setExpandedImage(null)}
        >
          <button
            type="button"
            aria-label="Close enlarged infographic"
            onClick={() => setExpandedImage(null)}
            className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/92 text-[#32136f] shadow-md transition-transform duration-200 hover:scale-105"
          >
            <X size={18} strokeWidth={1.8} />
          </button>
          <img
            src={expandedImage.src}
            alt={expandedImage.alt}
            className="max-h-[86vh] max-w-[86vw] rounded-xl object-contain shadow-[0_24px_70px_rgba(0,0,0,0.36)]"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};
