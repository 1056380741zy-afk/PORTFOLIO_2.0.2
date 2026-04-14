import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Web3Strategy } from '../shared/Web3Strategy';
import { B2BContent, CategoryLine } from '../projects/sections/B2BContent';

type View = 'entry' | 'web3' | 'b2b';

// ─── Main Component ───────────────────────────────────────────────────────────
export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [view, setView] = useState<View>('entry');

  useEffect(() => {
    if (view !== 'entry') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [view]);

  return (
    <AnimatePresence mode="wait">

      {/* ── Entry View ── */}
      {view === 'entry' && (
        <motion.div
          key="entry"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="min-h-[calc(100vh-3.75rem)] flex flex-col px-6"
        >
          <div className="max-w-6xl mx-auto w-full flex flex-col h-full py-16">

            {/* Large display title */}
            <div className="flex-none">
              <h1 className="page-title">
                {t.projects.title}
              </h1>
              <div className="h-px bg-[#2d2d2d]/10 w-full" />
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Category links */}
            <div className="flex-none">
              <CategoryLine
                label={t.projects.web3Title}
                sublabel="3 Research Projects · Academic & Strategy"
                onClick={() => setView('web3')}
              />
              <CategoryLine
                label={t.projects.b2bTitle}
                sublabel={`${t.projects.exhibitionTitle.split(':')[0]} · ${t.projects.activationTitle}`}
                onClick={() => setView('b2b')}
              />
            </div>

          </div>
        </motion.div>
      )}

      {/* ── Content Views ── */}
      {view !== 'entry' && (
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Breadcrumb / back bar */}
          <div className="sticky top-0 z-20 bg-base-bg/90 backdrop-blur-sm border-b border-[#2d2d2d]/6">
            <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2.5">
              <button
                onClick={() => setView('entry')}
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#2d2d2d]/40 hover:text-[#8e6bbf] transition-colors group"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                {t.projects.title}
              </button>
              <span className="text-[#2d2d2d]/20 text-xs">/</span>
              <span className="text-xs font-bold uppercase tracking-widest text-text-dark">
                {view === 'web3' ? t.projects.web3Title : t.projects.b2bTitle}
              </span>
            </div>
          </div>

          {/* Section content */}
          <div className="px-6 max-w-6xl mx-auto py-12 pb-20">
            {view === 'web3' ? (
              <Web3Strategy />
            ) : (
              <B2BContent />
            )}
          </div>
        </motion.div>
      )}

    </AnimatePresence>
  );
};
