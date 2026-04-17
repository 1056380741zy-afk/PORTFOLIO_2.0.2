import React, { useMemo, useRef, useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { useLanguage } from '../../contexts/LanguageContext';
import { NotionBlock } from '../shared/NotionBlock';
import { Wrench, Globe, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const ToolCard: React.FC<{ name: string; icon: string; compact?: boolean }> = ({ name, icon, compact = false }) => {
  return (
    <div
      className={[
        'flex flex-col items-center justify-center bg-surface border border-[#2d2d2d]/10 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group',
        compact ? 'p-4 h-28' : 'p-6 h-40',
      ].join(' ')}
    >
      <div className={['flex items-center justify-center transition-all duration-300', compact ? 'w-10 h-10 mb-2.5' : 'w-12 h-12 mb-4'].join(' ')}>
        <img src={icon} alt={name} className="w-full h-full object-contain" />
      </div>
      <span className={['font-bold text-text-main text-center leading-tight', compact ? 'text-[11px]' : 'text-sm md:text-base'].join(' ')}>
        {name}
      </span>
    </div>
  );
};

export const Skills: React.FC = () => {
  const { ref, isVisible } = useReveal();
  const { t } = useLanguage();
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [activeStampIndex, setActiveStampIndex] = useState<number | null>(null);

  const tools = [
    { name: 'WordPress', icon: 'https://cdn.simpleicons.org/wordpress/21759B' },
    { name: 'Elementor', icon: 'https://cdn.simpleicons.org/elementor/92003B' },
    { name: 'Canva', icon: 'https://brandlogovector.com/wp-content/uploads/2022/02/Canva-Icon-Logo.png' },
    { name: 'Figma', icon: 'https://cdn.simpleicons.org/figma/F24E1E' },
    { name: 'Adobe Illustrator', icon: 'https://brandlogovector.com/wp-content/uploads/2021/07/Adobe-Illustrator-Logo.png' },
    { name: 'Adobe Dreamweaver', icon: 'https://brandlogovector.com/wp-content/uploads/2021/07/Adobe-Dreamweaver-Logo.png' },
    { name: 'Stripo', icon: 'https://statusfield.com/logos/stripo.png' },
    { name: 'Meta Biz', icon: 'https://cdn.simpleicons.org/meta/0668E1' },
    { name: 'LinkedIn', icon: 'https://www.vectorlogo.zone/logos/linkedin/linkedin-icon.svg' },
    { name: 'TikTok', icon: 'https://cdn.simpleicons.org/tiktok/000000' },
    { name: 'Google Analytics', icon: 'https://cdn.simpleicons.org/googleanalytics/E37400' },
    { name: 'Microsoft Suite', icon: 'https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg' },
  ];

  const stamps = useMemo(
    () => [
      { name: 'Shanghai', src: '/stamps/shanghaioriental.png', top: '4%', left: '2%', rotate: -8, widthClass: 'w-[140px]' },
      { name: 'Riyadh', src: '/stamps/riyadh.png', top: '6%', left: '26%', rotate: 8, widthClass: 'w-[135px]' },
      { name: 'Red Sea', src: '/stamps/redsea.png', top: '30%', left: '10%', rotate: -6, widthClass: 'w-[135px]' },
      { name: 'Osaka', src: '/stamps/osaka.png', top: '28%', left: '36%', rotate: 10, widthClass: 'w-[135px]' },
      { name: 'Oman', src: '/stamps/oman.png', top: '2%', left: '52%', rotate: -14, widthClass: 'w-[135px]' },
      { name: 'Alexandria', src: '/stamps/alexandria.png', top: '46%', left: '26%', rotate: -18, widthClass: 'w-[135px]' },
      { name: "Pompey's Pillar", src: '/stamps/pompeyspillar.png', top: '50%', left: '50%', rotate: 8, widthClass: 'w-[140px]' },
    ],
    []
  );

  const closeStampViewer = () => setActiveStampIndex(null);
  const showPrevStamp = () => {
    if (activeStampIndex === null) return;
    setActiveStampIndex((activeStampIndex - 1 + stamps.length) % stamps.length);
  };
  const showNextStamp = () => {
    if (activeStampIndex === null) return;
    setActiveStampIndex((activeStampIndex + 1) % stamps.length);
  };

  React.useEffect(() => {
    if (activeStampIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeStampViewer();
      if (e.key === 'ArrowLeft') showPrevStamp();
      if (e.key === 'ArrowRight') showNextStamp();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeStampIndex, stamps.length]);

  return (
    <section id="skills" className="py-20 px-6 max-w-6xl mx-auto">
      <div 
        ref={ref}
        className={`transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="mb-12">
            <h1 className="page-title">
                {t.skills.title}
            </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <div className="flex flex-col gap-8">
            <div className="bg-surface border border-[#2d2d2d]/10 rounded-xl shadow-sm p-4 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-text-main/50">Stamps</span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-text-main/30">Public /stamps</span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-text-main/40">Click to view</span>
              </div>

              <div className="relative h-[260px] md:h-[300px]">
                {stamps.map((stamp, idx) => (
                  <button
                    key={stamp.src}
                    type="button"
                    onClick={() => setActiveStampIndex(idx)}
                    className={`absolute ${stamp.widthClass} cursor-pointer select-none active:scale-[0.99] transition-transform`}
                    style={{ top: stamp.top, left: stamp.left }}
                    aria-label={`View stamp: ${stamp.name}`}
                  >
                    <div style={{ transform: `rotate(${stamp.rotate}deg)` }} className="origin-center">
                      <img
                        src={stamp.src}
                        alt={stamp.name}
                        draggable={false}
                        className="w-full h-auto drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] select-none"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <NotionBlock title={t.skills.languagesTitle} icon={<Globe size={20} />} className="h-full !mb-0">
                <div className="space-y-3 mt-2">
                  {t.skills.languages.map((lang, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center border-b border-[#2d2d2d]/5 last:border-0 pb-2 last:pb-0"
                    >
                      <span className="font-medium text-text-main">{lang.language}</span>
                      <span
                        className="text-xs px-2 py-1 rounded font-bold"
                        style={{
                          color: (lang as any).color,
                          backgroundColor: `${(lang as any).color}1A`,
                        }}
                      >
                        {lang.level}
                      </span>
                    </div>
                  ))}
                </div>
              </NotionBlock>

              <NotionBlock
                title={t.skills.regionalTitle}
                icon={<Globe className="text-[#2d2d2d]" size={20} />}
                className="h-full !mb-0"
              >
                <p
                  className="text-sm mb-4 leading-relaxed font-medium"
                  style={{ color: '#2d2d2d' }}
                  dangerouslySetInnerHTML={{ __html: t.skills.regionalDesc }}
                />
                <div className="flex gap-2 flex-wrap">
                  {t.skills.regionalTags.map((tag) => (
                    <span key={tag} className="text-xs font-bold px-2 py-1 rounded bg-brand-blue/10 text-brand-blue">
                      {tag}
                    </span>
                  ))}
                </div>
              </NotionBlock>
            </div>
          </div>

          <div
            ref={constraintsRef}
            className="relative min-h-[520px] md:min-h-[680px] overflow-hidden bg-surface/40 border border-[#2d2d2d]/10 rounded-xl shadow-sm p-3 md:p-4"
          >
            <motion.div
              drag
              dragConstraints={constraintsRef}
              dragElastic={0.08}
              dragMomentum={false}
              whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
              className="w-full cursor-grab select-none"
            >
              <NotionBlock
                title={t.skills.toolsTitle}
                icon={<Wrench size={20} />}
                rightElement={<span className="text-[10px] font-mono uppercase tracking-[0.3em] text-text-main/40">Drag</span>}
                className="!mb-0"
              >
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-2">
                  {tools.map((tool, idx) => (
                    <ToolCard key={idx} {...tool} compact />
                  ))}
                </div>
              </NotionBlock>
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {activeStampIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-4"
              onClick={closeStampViewer}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 10 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-black/10 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-black/10">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-text-main/60">
                      {stamps[activeStampIndex].name}
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-text-main/30">
                      {activeStampIndex + 1}/{stamps.length}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={closeStampViewer}
                    className="p-2 rounded-lg hover:bg-black/5 transition-colors"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="relative bg-[#f7f6f3] p-4 md:p-8 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={showPrevStamp}
                    className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-white/80 hover:bg-white border border-black/10 shadow-sm transition-colors"
                    aria-label="Previous stamp"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <img
                    src={stamps[activeStampIndex].src}
                    alt={stamps[activeStampIndex].name}
                    className="max-h-[70vh] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
                    draggable={false}
                  />
                  <button
                    type="button"
                    onClick={showNextStamp}
                    className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-white/80 hover:bg-white border border-black/10 shadow-sm transition-colors"
                    aria-label="Next stamp"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
