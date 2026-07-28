import React, { useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  ClipboardList,
  Lightbulb,
  Network,
  Search,
  Target,
  UserCheck,
  Users,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { EvidenceFrame, FieldNote } from './ArchivePrimitives';
import { ScrambleHoverTitle } from './ScrambleHoverTitle';

const DETAIL_ICONS = [Users, Target];
const SKILL_ICONS = [Network, ClipboardList, Search, Lightbulb, BarChart3, UserCheck];

const stripTerminalPunctuation = (text: string) => text.replace(/[。？?]+$/u, '');

export const Web3Strategy: React.FC = () => {
  const { t, language } = useLanguage();
  const strategyData = t.projects.web3Strategy || [];
  const [activeId, setActiveId] = useState(strategyData[0]?.id || 'uae');

  if (!strategyData.length) return null;

  const activeProject = strategyData.find((item) => item.id === activeId) || strategyData[0];
  const activeIndex = Math.max(0, strategyData.findIndex((item) => item.id === activeProject.id));
  const isCn = language === 'cn';
  const englishCaseGuideLabels: Record<string, string> = {
    uae: 'Independent Research Project',
    sandbox: 'Team Leadership',
    binance: 'Team Collaboration',
  };
  const contributionTags: Record<string, string[]> = isCn
    ? {
        uae: ['研究框架设计', '问卷与访谈规划', '一手资料研究', '洞察提炼', '市场洞察', '独立研究推进'],
        sandbox: ['中东市场研究', '合作匹配评估', '本地用户分析', '风险梳理', '联盟方案设计', '领导小组推进'],
        binance: ['区域市场研究', 'PESTEL 分析', 'SWOT 分析', '监管比较', '合规映射', '小组团队协作'],
      }
    : {
        uae: ['Research Framework', 'Survey & Interview Planning', 'Primary Research', 'Insight Synthesis', 'Market Insight', 'Independent Research'],
        sandbox: ['MENA Market Research', 'Partnership Fit', 'Local User Analysis', 'Risk Mapping', 'Alliance Design', 'Team Leadership'],
        binance: ['Regional Research', 'PESTEL Analysis', 'SWOT Analysis', 'Regulatory Comparison', 'Compliance Mapping', 'Team Collaboration'],
      };
  const detailBlocks = [
    {
      label: isCn ? '背景与目标' : 'CONTEXT & OBJECTIVE',
      text: activeProject.focus,
      Icon: DETAIL_ICONS[0],
      kind: 'standard',
    },
    {
      label: isCn ? '研究与分析路径' : 'APPROACH',
      text: activeProject.method,
      Icon: Search,
      kind: 'standard',
    },
    {
      label: isCn ? '我的贡献' : 'MY CONTRIBUTION',
      text: activeProject.role,
      Icon: UserCheck,
      kind: 'contribution',
    },
    {
      label: isCn ? '成果与交付' : 'OUTCOME & DELIVERABLE',
      text: activeProject.output,
      Icon: DETAIL_ICONS[1],
      kind: 'standard',
    },
  ];
  const contributionItems = contributionTags[activeProject.id] || contributionTags.uae;
  const visualPanels = [
    {
      label: 'Banner',
      src: activeProject.banner,
      alt: activeProject.fullTitle,
    },
    {
      label: (activeProject as any).infographicTag || 'Infographic',
      src: activeProject.infographic,
      alt: `${activeProject.fullTitle} infographic`,
    },
  ];

  return (
    <div className="web3-strategy-page relative h-full min-h-0 w-full overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(126,137,102,0.14) 1px, transparent 0), linear-gradient(rgba(159,143,219,0.08) 1px, transparent 1px)',
          backgroundSize: '18px 18px, 100% 42px',
        }}
      />

      <div className="web3-layout-grid relative z-10 -mt-[10px] grid h-full min-h-0 gap-3 overflow-hidden pt-[5px]">
        <section
          className="web3-research-dossier relative grid h-full min-h-0 grid-rows-[205px_minmax(0,1fr)] content-stretch gap-2.5 overflow-visible"
        >
          <div className="project-file-card relative z-10 h-full rounded-[8px] border-2 border-[#7e8966]/42 bg-[#7e8966]/8 p-3.5">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[12px] font-bold uppercase text-[#5f6849]">
                Case guide
              </span>
              <span className="h-1.5 w-16 rounded-full bg-[#7e8966]" />
            </div>

            <div className="mt-[5px] grid h-[151px] grid-cols-3 gap-2">
              {strategyData.map((item, itemIdx) => {
                const isActive = activeProject.id === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveId(item.id)}
                    className={`web3-case-guide-item group relative flex h-full flex-col overflow-hidden rounded-[8px] border border-transparent p-2.5 text-left${isActive ? ' is-active' : ''}`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="web3-case-active-surface"
                        className="absolute inset-0 rounded-[8px] bg-[#7e8966]/10"
                        transition={{ type: 'spring', stiffness: 150, damping: 23, mass: 0.85 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center justify-between gap-2">
                      <span
                        className={`web3-case-guide-index flex h-7 w-7 items-center justify-center rounded-full font-mono text-[11px] font-bold ${
                          isActive ? 'bg-[#7e8966] text-white' : 'bg-[#7e8966]/12 text-[#7e8966]'
                        }`}
                      >
                        0{itemIdx + 1}
                      </span>
                      <ArrowRight
                        size={14}
                        strokeWidth={1.5}
                        className={`web3-case-guide-arrow ${
                          isActive ? 'text-[#7e8966]' : 'text-[#7e8966]/52'
                        }`}
                      />
                    </span>
                    <span className="web3-case-title relative z-10 mt-1.5 block text-[15px] font-bold leading-[1.14] text-[#25211d]">
                      {item.sidebarTitle}
                    </span>
                    <span className="relative z-10 mt-auto flex flex-col items-start gap-1 pt-1.5">
                      {item.sidebarTags.map((tag: string, tagIndex: number) => (
                        <span
                          key={tag}
                          className={`web3-project-pill${tagIndex === 0 ? ' web3-project-pill-primary' : ''}`}
                        >
                          {tagIndex === 0
                            ? (isCn
                                ? item.projectTag || item.label
                                : englishCaseGuideLabels[item.id] || item.projectTag || item.label)
                            : tag}
                        </span>
                      ))}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="web3-project-record relative z-10 mt-0 flex h-full max-h-full min-h-0 flex-col overflow-hidden rounded-[8px] border border-[#7e8966]/20 bg-[#fffdf7]/[0.9]">
          <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={`${activeProject.id}-record`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="web3-project-record-body flex h-full min-h-0 flex-col"
          >
          <div className="web3-project-record-header border-b border-[#7e8966]/14 px-6 pb-3 pt-[15px]">
            <div>
              <p className="font-mono text-[9px] font-bold uppercase text-[#7e8966]/68">
                0{activeIndex + 1} / 03
              </p>
              <span aria-hidden="true" className="mt-1 block h-[12px]" />
            </div>

            <ScrambleHoverTitle
              as="h2"
              text={activeProject.fullTitle}
              className="web3-record-title mt-3 block text-[23px] font-bold leading-[1.02] text-[#25211d]"
            />
            <p className="web3-record-description mt-1.5 max-w-[92%] text-[12px] font-medium leading-[1.28] text-[#443d35]/72">
              {(activeProject as any).description}
            </p>

          </div>

          <div className="web3-project-details relative z-10 grid min-h-0 flex-1 py-3">
            <div className="web3-detail-grid grid h-full min-h-0 content-center gap-y-2.5">
              {detailBlocks.map(({ label, text, Icon, kind }, blockIdx) => (
                <FieldNote
                  key={`${activeProject.id}-${label}`}
                  tone={kind === 'contribution' ? 'contribution' : blockIdx === 3 ? 'result' : 'standard'}
                  className={`information-hover-card web3-information-card overflow-visible rounded-[8px] border border-[#7e8966]/12 bg-[#fffdf7]/25 p-3.5 ${
                    blockIdx < 2 ? 'h-[150px]' : 'h-[145px]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[#7e8966]/12 text-[#7e8966]">
                      <Icon size={15} strokeWidth={1.55} />
                    </span>
                    <h3 className="information-card-title web3-field-title font-mono text-[14px] font-bold uppercase tracking-[0.02em] text-[#5f6849]">
                      {label}
                    </h3>
                  </div>
                  {kind === 'contribution' ? (
                    <div className="web3-contribution-grid mt-2.5 grid grid-cols-3 overflow-hidden rounded-[8px] border border-[#9f8fdb]/18 bg-[#fffdf7]/45">
                      {contributionItems.map((tag, tagIdx) => {
                        const SkillIcon = SKILL_ICONS[tagIdx % SKILL_ICONS.length];
                        return (
                          <span
                            key={tag}
                            className="web3-contribution-tag inline-flex min-h-[39px] min-w-0 items-center justify-center gap-1.5 px-2 py-1 text-center text-[11px] font-semibold leading-[1.12] text-[rgb(40,35,31)]"
                          >
                            <SkillIcon
                              size={11}
                              strokeWidth={1.45}
                              className="shrink-0 text-[#7e8966]"
                            />
                            <span className="min-w-0">{tag}</span>
                          </span>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="web3-field-copy mt-2.5 text-[15px] font-medium leading-[1.3] text-[#2f2922]/82">
                      {stripTerminalPunctuation(text)}
                    </p>
                  )}
                </FieldNote>
              ))}
            </div>
          </div>
          </motion.div>
          </AnimatePresence>
          </div>
        </section>

        <aside
          className="web3-evidence-rail grid h-full min-h-0 grid-rows-2 gap-3 overflow-hidden justify-self-end self-stretch"
        >
          {visualPanels.map((panel, panelIndex) => (
            <EvidenceFrame
              key={panel.label}
              className="web3-evidence-panel group relative h-full min-h-0 w-full overflow-hidden"
              caption={panel.label}
              source={activeProject.fullTitle}
              mediaType={panel.label === 'Banner' ? 'POSTER' : 'INFOGRAPHIC'}
              showCaption={false}
              expandSrc={panelIndex === 1 ? panel.src : undefined}
              expandAlt={panelIndex === 1 ? panel.alt : undefined}
            >
              <AnimatePresence initial={false} mode="popLayout">
                <motion.img
                  key={`${activeProject.id}-${panel.label}`}
                  src={panel.src}
                  alt={panel.alt}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  loading="eager"
                  decoding="async"
                  className="block h-full w-full rounded-[8px] object-contain"
                />
              </AnimatePresence>
              <span className="web3-evidence-tag">
                {panelIndex === 1 ? panel.label : 'POSTER'}
              </span>
            </EvidenceFrame>
          ))}
        </aside>
      </div>
    </div>
  );
};
