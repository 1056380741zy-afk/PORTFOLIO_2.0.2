import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, BarChart3, Handshake, Download } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const Blueprint: React.FC = () => {
  const { t } = useLanguage();
  const ICONS = [
    <ClipboardCheck size={20} />,
    <BarChart3 size={20} />,
    <Handshake size={20} />
  ];

  return (
    <div className="w-[min(400px,90vw)] bg-[#2A4B8D] p-6 shadow-2xl border-4 border-[#3A5B9D] text-white relative overflow-hidden"
         style={{ 
           backgroundImage: `linear-gradient(#ffffff0a 1px, transparent 1px), linear-gradient(90deg, #ffffff0a 1px, transparent 1px)`,
           backgroundSize: '20px 20px'
         }}>
      {/* Technical markings */}
      <div className="absolute top-2 left-2 text-[8px] font-mono opacity-40 uppercase">Scale: 1:1 / Ref: {t.competencies.title}</div>
      <div className="absolute bottom-2 right-2 text-[8px] font-mono opacity-40 uppercase">Revision: 2.0 / 2024</div>
      
      <h2 className="text-2xl font-mono font-bold mb-6 uppercase tracking-[0.2em] border-b border-white/30 pb-4">
        {t.competencies.title}
      </h2>

      <div className="grid grid-cols-1 gap-6 py-4">
        {t.competencies.items.map((comp, idx) => (
          <div key={idx} className="flex items-center gap-6 group">
            <div className="w-12 h-12 border border-white/40 flex items-center justify-center shrink-0">
              {ICONS[idx]}
            </div>
            <h3 className="font-mono font-bold text-base uppercase text-white/90 underline decoration-white/20 underline-offset-8">
              {comp.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export const LanguageProficiency: React.FC = () => {
  const { language } = useLanguage();
  const isArabicLocale =
    typeof navigator !== 'undefined' && typeof navigator.language === 'string'
      ? navigator.language.toLowerCase() === 'ar-sa'
      : false;

  const isCn = language === 'cn';

  const FONT_CJK =
    "system-ui, -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC', sans-serif";
  const FONT_LATIN = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  const FONT_AR = "system-ui, -apple-system, BlinkMacSystemFont, 'Noto Naskh Arabic', 'Noto Sans Arabic', Tahoma, Arial, sans-serif";

  const rows = ([
    isCn
      ? { id: 'zh', name: '中文', level: '母语', dot: '#d3494b', nameLang: 'zh-Hans', levelLang: 'zh-Hans', fontFamily: FONT_CJK }
      : { id: 'zh', name: 'Chinese', level: 'Native', dot: '#d3494b', nameLang: 'en', levelLang: 'en', fontFamily: FONT_LATIN },
    isCn
      ? { id: 'en', name: '英语', level: '专业工作水平', dot: '#8e6bbf', nameLang: 'zh-Hans', levelLang: 'zh-Hans', fontFamily: FONT_CJK }
      : { id: 'en', name: 'English', level: 'Professional Proficiency', dot: '#8e6bbf', nameLang: 'en', levelLang: 'en', fontFamily: FONT_LATIN },
    (() => {
      if (isArabicLocale) {
        return { id: 'ar', name: 'العربية', level: 'كفاءة مهنية', dot: '#f5b002', nameLang: 'ar', levelLang: 'ar', fontFamily: FONT_AR } as const;
      }
      if (isCn) {
        return { id: 'ar', name: '阿拉伯语', level: '专业工作水平', dot: '#f5b002', nameLang: 'zh-Hans', levelLang: 'zh-Hans', fontFamily: FONT_CJK } as const;
      }
      return { id: 'ar', name: 'Arabic', level: 'Professional Proficiency', dot: '#f5b002', nameLang: 'en', levelLang: 'en', fontFamily: FONT_LATIN } as const;
    })(),
  ] as const);

  return (
    <section
      aria-label="Language Proficiency"
      className="w-[min(360px,90vw)] bg-white/55 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-[0_12px_40px_rgba(31,38,135,0.08)] overflow-hidden"
    >
      <div className="px-6 pt-6 pb-4 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 12% 10%, rgba(142,107,191,0.14), transparent 58%)' }} />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-800 tracking-tight">{isCn ? '语言能力' : 'Language Proficiency'}</h2>
          </div>
        </div>
      </div>
      <div className="px-6 pb-6">
        <div className="rounded-2xl border border-black/5 bg-white/55 overflow-hidden divide-y divide-[#2d2d2d]/8">
          {rows.map((row) => {
            const isArabicRow = row.id === 'ar';
            const dir = isArabicRow && isArabicLocale ? 'rtl' : 'ltr';
            const nameClassName = `text-[12px] font-semibold text-text-dark/85 ${isCn ? 'tracking-normal' : 'tracking-[0.06em]'} truncate`;
            const isLatinLevel = !isCn && row.levelLang !== 'ar';
            const levelClassName = `${isLatinLevel ? 'text-[10px]' : 'text-[11px]'} ${row.levelLang === 'ar' ? 'font-semibold' : 'font-mono font-bold'} text-text-dark/60 ${isCn || row.levelLang === 'ar' ? 'tracking-normal' : 'tracking-[0.16em] uppercase'} whitespace-nowrap`;
            return (
              <div
                key={row.id}
                dir={dir}
                className={`min-h-[44px] grid items-center gap-3 px-4 py-3 transition-colors ${dir === 'rtl' ? 'grid-cols-[minmax(160px,1.35fr)_minmax(108px,1fr)]' : 'grid-cols-[minmax(108px,1fr)_minmax(160px,1.35fr)]'} hover:bg-white/55`}
              >
                {dir === 'rtl' ? (
                  <>
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: row.dot }} aria-hidden="true" />
                      <span
                        lang={row.levelLang}
                        className={`${levelClassName} text-left`}
                        style={{ fontFamily: row.fontFamily }}
                      >
                        {row.level}
                      </span>
                    </div>
                    <span lang={row.nameLang} className={`${nameClassName} text-right`} style={{ fontFamily: row.fontFamily }}>
                      {row.name}
                    </span>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: row.dot }} aria-hidden="true" />
                      <span lang={row.nameLang} className={`${nameClassName} text-left min-w-0`} style={{ fontFamily: row.fontFamily }}>
                        {row.name}
                      </span>
                    </div>
                    <span
                      lang={row.levelLang}
                      className={`${levelClassName} text-right justify-self-end pr-3`}
                      style={{ fontFamily: row.fontFamily }}
                    >
                      {row.level}
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const Toolbox: React.FC = () => {
  const { t } = useLanguage();
  const tools = useMemo(
    () => [
      { name: 'WordPress', mark: 'WP', icon: '/toolsandsoftware/WordPress.png', iconScale: 1.22 },
      { name: 'Elementor', mark: 'E', icon: '/toolsandsoftware/Elementor.png', iconScale: 1.26 },
      { name: 'Canva', mark: 'C', icon: '/toolsandsoftware/Canva.png', iconScale: 1.0 },
      { name: 'Figma', mark: 'F', icon: '/toolsandsoftware/Figma.png', iconScale: 1.26 },
      { name: 'Adobe Illustrator', mark: 'Ai', icon: '/toolsandsoftware/AdobeIllustrator.png', iconScale: 1.0 },
      { name: 'Adobe Dreamweaver', mark: 'Dw', icon: '/toolsandsoftware/AdobeDreamweaver.png', iconScale: 1.0 },
      { name: 'Stripo', mark: 'S', icon: '/toolsandsoftware/Stripo.png', iconScale: 1.0 },
      { name: 'Meta Biz', mark: 'M', icon: '/toolsandsoftware/Meta.png', iconScale: 1.26 },
      { name: 'LinkedIn', mark: 'in', icon: '/toolsandsoftware/Linkedin.png', iconScale: 1.24 },
      { name: 'TikTok', mark: 'Tk', icon: '/toolsandsoftware/TikTok.png', iconScale: 1.24 },
      { name: 'Google Analytics', mark: 'GA', icon: '/toolsandsoftware/GoogleAnalytics.png', iconScale: 1.22 },
      { name: 'Microsoft Suite', mark: 'MS', icon: '/toolsandsoftware/Microsoft.png', iconScale: 1.22 },
    ],
    []
  );
  const [brokenIcons, setBrokenIcons] = useState<Record<string, boolean>>({});

  return (
    <div className="w-[360px] bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800 tracking-tight">{t.skills.toolsTitle}</h2>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {tools.map((tool, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center p-2 group-hover:scale-110 transition-transform relative overflow-hidden">
              {!!tool.icon && !brokenIcons[tool.name] && (
                <img
                  src={tool.icon}
                  alt={tool.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() => setBrokenIcons((prev) => ({ ...prev, [tool.name]: true }))}
                  className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  style={{ transform: `scale(${tool.iconScale ?? 1})` }}
                />
              )}
              <span
                className={[
                  'absolute inset-0 flex items-center justify-center text-[11px] font-mono font-bold text-gray-700 uppercase tracking-widest transition-opacity',
                  brokenIcons[tool.name] || !tool.icon ? 'opacity-100' : 'opacity-0',
                ].join(' ')}
              >
                {tool.mark}
              </span>
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter text-center">{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const StickyNote: React.FC = () => {
  const filePath = 'Yan ZHU_University of Birmingham_International Business_Arabic.pdf';
  const fileName = 'Yan ZHU_University of Birmingham_International Business & Arabic.pdf';
  return (
    <motion.a 
      href={`/images/${encodeURIComponent(filePath)}`}
      download={fileName}
      initial={{ rotate: -3 }}
      animate={{ rotate: -3 }}
      whileHover={{ scale: 1.05, rotate: -3 }}
      whileTap={{ scale: 0.98, rotate: -3 }}
      className="w-40 h-40 bg-[#fef08a] p-4 shadow-lg flex flex-col items-center justify-center text-center relative group overflow-hidden block"
      style={{
        boxShadow: '0 5px 15px rgba(0,0,0,0.05), inset 0 0 30px rgba(0,0,0,0.02)'
      }}
    >
      {/* Tape effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-8 bg-white/40 backdrop-blur-sm rotate-2 z-20" />
      
      <Download size={32} className="text-[#854d0e] mb-3 group-hover:bounce transition-all" />
      <span className="text-sm font-bold text-[#854d0e] tracking-tight leading-tight">
        Download<br/>CV.pdf
      </span>
      
      {/* Corner fold effect */}
      <div className="absolute bottom-0 right-0 w-6 h-6 bg-black/5 rounded-tl-xl" />
    </motion.a>
  );
};
