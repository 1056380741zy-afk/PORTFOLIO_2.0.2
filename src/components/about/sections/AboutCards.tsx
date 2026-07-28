import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, ClipboardCheck, Download, Handshake, Languages } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

type ArchiveVariant = {
  variant?: 'default' | 'archive';
};

export const Blueprint: React.FC<ArchiveVariant> = ({ variant = 'default' }) => {
  const { t, language } = useLanguage();
  const ICONS = [
    <ClipboardCheck size={20} />,
    <BarChart3 size={20} />,
    <Handshake size={20} />
  ];

  if (variant === 'archive') {
    return (
      <motion.section
        aria-label={t.competencies.title}
        className="archive-material-card relative w-[455px] overflow-hidden rounded-[8px] border border-[#c4c2b7]/45 bg-[#fcf9f0]/56 p-5 text-[#2d2d2d] shadow-[0_18px_34px_rgba(90,70,45,0.09)] backdrop-blur-[2px]"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.28]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(95,128,96,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(95,128,96,0.14) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        />
        <div className="pointer-events-none absolute inset-x-5 top-[54px] border-t border-[#8fafc3]/45" />
        <div className="relative z-10 flex items-start justify-between gap-5 border-b border-[#2d2d2d]/10 pb-4">
          <div>
            <div className="font-mono text-[8px] uppercase tracking-[0.24em] text-[#7e8966]/70">
              Scale 1:1 / Vellum Copy
            </div>
            <h2 className="mt-2 font-mono text-[18px] font-bold uppercase tracking-[0.18em] text-[#26342f]">
              {t.competencies.title}
            </h2>
          </div>
          <div className="h-11 w-11 rounded-full border border-[#8fafc3]/45 bg-[#fcf9f0]/45" />
        </div>

        <div className="relative z-10 mt-4 grid gap-3">
          {t.competencies.items.map((comp, idx) => (
            <div key={idx} className="grid grid-cols-[42px_1fr] items-center gap-4 rounded-xl border border-[#2d2d2d]/8 bg-[#fcf9f0]/38 px-3 py-3">
              <div className="flex h-10 w-10 items-center justify-center border border-[#7e8966]/28 bg-[#fcf9f0]/34 text-[#7e8966]">
                {ICONS[idx]}
              </div>
              <h3 className="font-mono text-[12px] font-bold uppercase leading-tight tracking-[0.1em] text-[#26342f]/85">
                {comp.title}
              </h3>
            </div>
          ))}
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      aria-label={t.competencies.title}
      className="home-core-card relative w-[390px] text-[#fcf9f0]"
      animate={{ y: [0, -1.5, 0] }}
      transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div
        className="pointer-events-none absolute -top-2 right-12 z-20 h-7 w-24 rotate-[2deg] border border-[#8b785d]/10 bg-[#d7c7a8]/78 shadow-[0_2px_8px_rgba(65,48,28,0.1)]"
        aria-hidden="true"
      />
      <div className="relative h-[290px] overflow-hidden rounded-[8px] border-2 border-white/78 bg-[#596149] px-8 py-[27px] shadow-[0_16px_28px_rgba(54,61,42,0.23),0_1px_0_rgba(255,255,255,0.5)_inset]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.32]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(110deg, rgba(255,255,255,0.16), transparent 42%, rgba(30,38,26,0.14))',
            backgroundSize: '24px 24px, 24px 24px, 100% 100%',
            backgroundPosition: '0 0, 0 0, 0 0',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(20,25,18,0.42) 0.55px, transparent 0), radial-gradient(circle at 8px 9px, rgba(255,255,255,0.38) 0.45px, transparent 0)',
            backgroundSize: '17px 17px, 19px 19px',
          }}
        />
        <div className="pointer-events-none absolute -right-11 top-16 h-32 w-32 rounded-full border border-white/28 opacity-45" aria-hidden="true">
          <div className="absolute inset-3 rounded-full border border-white/18" />
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/14" />
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/14" />
        </div>

        <div className="relative z-10 border-b border-white/28 pb-4">
          <div>
            <h2 className="font-mono text-[18px] font-bold uppercase tracking-[0.22em] text-[#fcf9f0]">
              {t.competencies.title}
            </h2>
          </div>
        </div>

        <div className="relative z-10 mt-4 grid grid-rows-[52px_52px_52px] gap-2">
          {t.competencies.items.map((comp, idx) => (
            <div key={idx} className="group grid grid-cols-[44px_minmax(0,1fr)] items-start gap-4">
              <div className="mt-1 flex h-9 w-10 items-center justify-center rounded-[8px] border border-white/34 bg-white/[0.03] font-mono text-[16px] font-bold text-[#fcf9f0] transition-colors duration-200 group-hover:border-[#baaef6]/70 group-hover:text-[#baaef6]">
                {String(idx + 1).padStart(2, '0')}
              </div>
              <div className="min-w-0">
                <h3 className={`${language === 'cn' ? 'whitespace-nowrap' : 'max-w-[390px] whitespace-normal'} font-mono text-[14px] font-bold uppercase leading-[1.35] tracking-[0.045em] text-[#fcf9f0]`}>
                  {comp.title}
                </h3>
                {language === 'cn' && (
                  <p className="mt-1 whitespace-nowrap font-mono text-[10px] leading-[1.35] tracking-[0.025em] text-[#fcf9f0]/62">
                    {comp.list.join(' · ')}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export const LanguageProficiency: React.FC<ArchiveVariant> = ({ variant = 'default' }) => {
  const { language } = useLanguage();
  const isArabicLocale =
    typeof navigator !== 'undefined' && typeof navigator.language === 'string'
      ? navigator.language.toLowerCase() === 'ar-sa'
      : false;

  const isCn = language === 'cn';

  const FONT_CJK =
    "'DengXian', '等线', 'Microsoft YaHei', 'Noto Sans CJK SC', system-ui, sans-serif";
  const FONT_LATIN = "'Segoe UI', 'DengXian', '等线', system-ui, -apple-system, BlinkMacSystemFont, Roboto, Helvetica, sans-serif";
  const FONT_AR = "'Noto Naskh Arabic', 'Noto Sans Arabic', 'Segoe UI', system-ui, Tahoma, sans-serif";

  const rows = ([
    isCn
      ? { id: 'zh', name: '中文', level: '母语', dot: '#a65f3f', nameLang: 'zh-Hans', levelLang: 'zh-Hans', fontFamily: FONT_CJK }
      : { id: 'zh', name: 'Chinese', level: 'Native', dot: '#a65f3f', nameLang: 'en', levelLang: 'en', fontFamily: FONT_LATIN },
    isCn
      ? { id: 'en', name: '英语', level: '专业工作水平', dot: '#c89a3d', nameLang: 'zh-Hans', levelLang: 'zh-Hans', fontFamily: FONT_CJK }
      : { id: 'en', name: 'English', level: 'Professional Proficiency', dot: '#c89a3d', nameLang: 'en', levelLang: 'en', fontFamily: FONT_LATIN },
    (() => {
      if (isArabicLocale) {
        return { id: 'ar', name: 'العربية', level: 'كفاءة مهنية', dot: '#657a3f', nameLang: 'ar', levelLang: 'ar', fontFamily: FONT_AR } as const;
      }
      if (isCn) {
        return { id: 'ar', name: '阿拉伯语', level: '专业工作水平', dot: '#657a3f', nameLang: 'zh-Hans', levelLang: 'zh-Hans', fontFamily: FONT_CJK } as const;
      }
      return { id: 'ar', name: 'Arabic', level: 'Professional Proficiency', dot: '#657a3f', nameLang: 'en', levelLang: 'en', fontFamily: FONT_LATIN } as const;
    })(),
  ] as const);

  if (variant === 'archive') {
    return (
      <motion.section
        aria-label="Language Proficiency"
        className="archive-material-card relative w-[332px] overflow-hidden rounded-[8px] border border-[#7e8966]/22 bg-[#dfe6d3]/86 p-5 text-[#26342f] shadow-[0_16px_30px_rgba(90,70,45,0.11)]"
        animate={{ y: [0, 2, 0] }}
        transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 opacity-[0.24]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(45,45,45,0.32) 0.75px, transparent 0)', backgroundSize: '14px 14px' }} />
        <div className="relative z-10 flex items-center justify-between border-b border-[#26342f]/12 pb-4">
          <div>
            <h2 className="mt-1 text-[18px] font-bold tracking-tight text-[#26342f]">{isCn ? '语言能力' : 'Language Proficiency'}</h2>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#26342f]/15 bg-[#fcf9f0]/45 text-[#7e8966]">
            <Languages size={20} strokeWidth={1.7} />
          </div>
        </div>

        <div className="relative z-10 mt-4 grid gap-2.5">
          {rows.map((row, idx) => {
            const isArabicRow = row.id === 'ar';
            const dir = isArabicRow && isArabicLocale ? 'rtl' : 'ltr';
            return (
              <div
                key={row.id}
                dir={dir}
                className="group relative min-h-[54px] rounded-[8px] border border-[#26342f]/10 bg-[#fcf9f0]/70 px-3 py-2.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="absolute right-3 top-2 font-mono text-[8px] uppercase tracking-[0.18em] text-[#26342f]/24">
                  0{idx + 1}
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: row.dot }} aria-hidden="true" />
                  <span
                    lang={row.nameLang}
                    className={`text-[12px] font-bold text-[#26342f]/85 ${isCn ? 'tracking-normal' : 'uppercase tracking-[0.08em]'}`}
                    style={{ fontFamily: row.fontFamily }}
                  >
                    {row.name}
                  </span>
                </div>
                <div
                  lang={row.levelLang}
                  className={`mt-2 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#26342f]/50 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                  style={{ fontFamily: row.fontFamily }}
                >
                  {row.level}
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative z-10 mt-4 grid grid-cols-[1fr_72px] gap-3 border-t border-[#26342f]/10 pt-3">
          <div className="h-6 rounded-sm bg-[repeating-linear-gradient(90deg,#26342f_0_2px,transparent_2px_6px)] opacity-[0.18]" />
          <div className="font-mono text-[8px] uppercase leading-tight tracking-[0.18em] text-[#26342f]/38">
            Field File
          </div>
        </div>
      </motion.section>
    );
  }

  return (
      <motion.section
      aria-label="Language Proficiency"
      className="home-language-card relative h-[295px] w-[430px] overflow-hidden rounded-[8px] border border-[#7e8966]/24 bg-[#fcf9f0]/82 py-5 pl-0 pr-[30px] text-[#26342f] shadow-[0_14px_26px_rgba(90,70,45,0.16)] backdrop-blur-[3px]"
      style={{
        backgroundColor: 'rgb(252 249 240 / 0.78)',
        borderColor: 'rgb(126 137 102 / 0.24)',
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%)',
      }}
      animate={{ y: [0, 1.8, 0] }}
      transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(45,45,45,0.28) 0.72px, transparent 0), linear-gradient(90deg, rgba(126,137,102,0.13) 0 1px, transparent 1px), linear-gradient(0deg, rgba(126,137,102,0.1) 0 1px, transparent 1px)',
          backgroundSize: '14px 14px, 28px 28px, 28px 28px',
        }}
      />
      <div className="absolute left-5 top-9 h-2.5 w-2.5 rounded-full border border-[#9f8fdb]/20 bg-[#fcf9f0]/60" aria-hidden="true" />
      <div className="absolute bottom-9 left-5 h-2.5 w-2.5 rounded-full border border-[#9f8fdb]/20 bg-[#fcf9f0]/60" aria-hidden="true" />
      <div className="absolute left-10 top-0 h-full w-px bg-[#9f8fdb]/14" aria-hidden="true" />
      <div className="relative z-10 ml-[25px] flex items-center justify-between border-b border-[#26342f]/10 pb-3">
        <div className="min-w-0">
          <h2 className="text-[24px] font-bold tracking-tight text-[#26342f]">{isCn ? '语言能力' : 'Language Proficiency'}</h2>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#26342f]/15 bg-[#fcf9f0]/45 text-[#7e8966] shadow-[0_8px_18px_rgba(90,70,45,0.08)]">
          <Languages size={23} strokeWidth={1.7} />
        </div>
      </div>

      <div className="relative z-10 ml-[25px] mt-3 grid grid-cols-1 gap-2">
        {rows.map((row, idx) => {
          const isArabicRow = row.id === 'ar';
          const dir = isArabicRow && isArabicLocale ? 'rtl' : 'ltr';
          return (
            <div
              key={row.id}
              dir={dir}
              className="group relative grid min-h-[40px] grid-cols-[1fr_1.3fr_28px] items-center gap-4 rounded-[8px] border border-[#26342f]/12 bg-[#fcf9f0]/72 px-0 py-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)] transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-[#9f8fdb]/24 hover:bg-[#fcf9f0]/90"
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: row.dot }} aria-hidden="true" />
                <span
                  lang={row.nameLang}
                  className={`text-[14px] font-bold text-[#26342f]/85 ${isCn ? 'tracking-normal' : 'uppercase tracking-[0.11em]'}`}
                  style={{ fontFamily: row.fontFamily }}
                >
                  {row.name}
                </span>
              </div>
              <div
                lang={row.levelLang}
                className={`font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#26342f]/50 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                style={{ fontFamily: row.fontFamily }}
              >
                {row.level}
              </div>
              <div className="justify-self-end font-mono text-[8px] uppercase tracking-[0.18em] text-[#26342f]/24">
                0{idx + 1}
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative z-10 ml-5 mt-3 grid w-[345px] grid-cols-[1fr_96px] gap-3 border-t border-[#26342f]/10 pt-2.5">
        <div className="h-6 rounded-sm bg-[repeating-linear-gradient(90deg,#26342f_0_2px,transparent_2px_6px)] opacity-[0.16]" />
        <div className="ml-[45px] whitespace-nowrap pl-2.5 pt-0 font-mono text-[10px] uppercase leading-tight tracking-[0.18em] text-[#26342f]/58">
          Field File
        </div>
      </div>
    </motion.section>
  );
};

export const Toolbox: React.FC<ArchiveVariant> = ({ variant = 'default' }) => {
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
      { name: 'CodeX', mark: 'CX', icon: '/toolsandsoftware/codex.png', iconScale: 1.18 },
      { name: 'Microsoft Suite', mark: 'MS', icon: '/toolsandsoftware/Microsoft.png', iconScale: 1.22 },
    ],
    []
  );
  const [brokenIcons, setBrokenIcons] = useState<Record<string, boolean>>({});
  const toolLookup = useMemo(
    () => new Map(tools.map((tool) => [tool.name, tool] as const)),
    [tools]
  );
  const toolGrid = useMemo(
    () => [
      'WordPress',
      'Elementor',
      'Canva',
      'Figma',
      'Adobe Illustrator',
      'Adobe Dreamweaver',
      'Stripo',
      'Meta Biz',
      'LinkedIn',
      'TikTok',
      'CodeX',
      'Microsoft Suite',
    ],
    []
  );

  if (variant === 'archive') {
    return (
      <motion.section
        aria-label={t.skills.toolsTitle}
        className="archive-material-card relative w-[300px] overflow-hidden rounded-[8px] border border-[#2d2d2d]/10 bg-[#fcf9f0]/82 p-4 shadow-[0_14px_28px_rgba(90,70,45,0.1)]"
        animate={{ y: [0, -1.5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute -right-6 top-4 h-20 w-20 rounded-full border border-[#8fafc3]/30" />
        <div className="relative z-10 mb-3 flex items-center justify-between">
          <h2 className="text-[15px] font-bold tracking-tight text-[#26342f]">{t.skills.toolsTitle}</h2>
          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#2d2d2d]/32">tool sleeve</span>
        </div>

        <div className="relative z-10 grid grid-cols-6 gap-2.5">
          {tools.map((tool) => (
            <div key={tool.name} className="group flex flex-col items-center gap-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#2d2d2d]/8 bg-white/72 p-1.5 shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5">
                {!!tool.icon && !brokenIcons[tool.name] && (
                  <img
                    src={tool.icon}
                    alt={tool.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={() => setBrokenIcons((prev) => ({ ...prev, [tool.name]: true }))}
                    className="h-full w-full object-contain opacity-80 transition-opacity group-hover:opacity-100"
                    style={{ transform: `scale(${tool.iconScale ?? 1})` }}
                  />
                )}
                {(brokenIcons[tool.name] || !tool.icon) && (
                  <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#26342f]/70">
                    {tool.mark}
                  </span>
                )}
              </div>
              <span className="sr-only">{tool.name}</span>
            </div>
          ))}
        </div>
      </motion.section>
    );
  }

  return (
      <motion.section
        aria-label={t.skills.toolsTitle}
        className="home-toolbox-card relative w-[483px] overflow-visible"
        animate={{ y: [0, -1.4, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="relative origin-center scale-[0.9025]">
      <div className="absolute -left-12 top-1/2 z-10 h-[413px] w-[80px] -translate-y-1/2 drop-shadow-[0_12px_22px_rgba(53,65,41,0.16)]" aria-hidden="true">
        <svg className="h-full w-full overflow-visible" viewBox="0 0 80 413" preserveAspectRatio="none">
          <path
            fill="#71855e"
            fillRule="evenodd"
            d={[
              'M6 0H74Q80 0 80 6V407Q80 413 74 413H6Q0 413 0 407V6Q0 0 6 0Z',
              'M22 54m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0',
              'M22 78m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0',
              'M22 272m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0',
              'M22 296m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0',
            ].join(' ')}
          />
          {[54, 78, 272, 296].map((cy) => (
            <circle key={cy} cx="22" cy={cy} r="6" fill="none" stroke="rgba(38,52,47,0.14)" strokeWidth="1" />
          ))}
        </svg>
      </div>

      <div
        className="home-toolbox-paperclip pointer-events-none absolute right-8 top-[-6px] z-[80] h-[64px] w-[30px] rotate-12 drop-shadow-[0_4px_5px_rgba(90,70,45,0.2)]"
        aria-hidden="true"
      >
        <img
          src="/decorations/pin.png"
          alt=""
          width={272}
          height={577}
          draggable={false}
          className="h-full w-full select-none object-contain"
        />
      </div>

      <div className="relative z-20 h-[408px] w-[483px] origin-center -translate-x-0.5 scale-95 overflow-hidden rounded-[8px] border border-[#2d2d2d]/12 bg-[#fcf9f0] shadow-[0_12px_22px_rgba(90,70,45,0.14)]">
        <div className="absolute inset-y-0 left-0 w-9 border-r border-[#26342f]/12 bg-[#fcf9f0]/78" aria-hidden="true">
          <div className="absolute left-1/2 top-7 h-3 w-3 -translate-x-1/2 rounded-full border border-[#26342f]/10 bg-[#fcf9f0] shadow-[inset_0_1px_3px_rgba(23,34,30,0.12)]" />
          <div className="absolute left-1/2 top-1/2 h-[132px] w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c4bd97]/48 bg-[#e5dfd4] shadow-[inset_0_1px_3px_rgba(80,70,45,0.12)]" />
          <div className="absolute bottom-7 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-[#26342f]/10 bg-[#fcf9f0] shadow-[inset_0_1px_3px_rgba(23,34,30,0.12)]" />
        </div>
        <div className="absolute -right-7 top-4 h-20 w-20 rounded-full border border-[#7e8966]/20" />
        <div
          className="absolute inset-x-0 bottom-0 h-16 opacity-[0.16]"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, rgba(45,45,45,0.5) 0 1px, transparent 1px 7px)',
          }}
        />
        <div className="relative z-10 h-full py-10 pl-[50px] pr-[50px]">
          <div className="mb-4 flex items-start justify-between gap-3 border-b border-[#2d2d2d]/10 pb-3">
            <div>
              <h2 className="text-[21px] font-bold tracking-tight text-[#26342f]">{t.skills.toolsTitle}</h2>
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-[#9f8fdb]/62">
                Digital Tools In My Kit
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-x-6 gap-y-3 pb-1">
            {toolGrid.map((toolName) => {
              const tool = toolLookup.get(toolName);
              if (!tool) return null;
              return (
                <div key={tool.name} className="group flex min-h-[72px] flex-col items-center justify-start gap-1.5 text-center">
                  <div className="relative flex h-[50px] w-[50px] items-center justify-center rounded-[8px] border border-[#cfd3cc] bg-[#fdfcf4] p-1.5 shadow-[0_2px_5px_rgba(45,45,45,0.12)] transition-[transform,border-color,box-shadow] duration-200 group-hover:-translate-y-0.5 group-hover:border-[#9f8fdb]/32 group-hover:shadow-[0_4px_8px_rgba(45,45,45,0.14)]">
                    {!!tool.icon && !brokenIcons[tool.name] && (
                      <img
                        src={tool.icon}
                        alt={tool.name}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={() => setBrokenIcons((prev) => ({ ...prev, [tool.name]: true }))}
                        className="h-full w-full object-contain opacity-90 saturate-90 transition-[filter,opacity] duration-200 group-hover:opacity-100 group-hover:saturate-100"
                        style={{ transform: `scale(${tool.iconScale ?? 1})` }}
                      />
                    )}
                    <span
                      className={[
                        'absolute inset-0 flex items-center justify-center font-mono text-[10px] font-bold uppercase tracking-widest text-[#26342f]/70 transition-opacity',
                        brokenIcons[tool.name] || !tool.icon ? 'opacity-100' : 'opacity-0',
                      ].join(' ')}
                    >
                      {tool.mark}
                    </span>
                  </div>
                  <span className="max-w-[68px] font-mono text-[10px] font-bold uppercase leading-[1.05] tracking-[0.02em] text-[#26342f]/88">
                    {tool.name}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-1 grid grid-cols-4 gap-x-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="h-7 opacity-[0.12]"
                style={{
                  backgroundImage: 'repeating-linear-gradient(90deg, rgba(45,45,45,0.55) 0 1px, transparent 1px 6px)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
        </div>
    </motion.section>
  );
};

export const StickyNote: React.FC<ArchiveVariant> = ({ variant = 'default' }) => {
  const filePath = 'Yan ZHU_University of Birmingham_International Business_Arabic.pdf';
  const fileName = 'Yan ZHU_University of Birmingham_International Business & Arabic.pdf';

  if (variant === 'archive') {
    return (
      <motion.a
        href={`/images/${encodeURIComponent(filePath)}`}
        download={fileName}
        aria-label="Download CV.pdf"
        className="archive-material-card group relative block h-[128px] w-[292px] overflow-hidden rounded-[8px] border border-[#2d2d2d]/10 bg-[#f2b642]/32 p-4 text-[#26342f] shadow-[0_14px_26px_rgba(90,70,45,0.12)]"
        animate={{ y: [0, 1.5, 0] }}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 7.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-y-0 right-9 border-l border-dashed border-[#2d2d2d]/18" />
        <div className="absolute -right-5 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full bg-[#fcf9f0]" />
        <div className="absolute -left-5 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full bg-[#fcf9f0]" />
        <div className="relative z-10 flex h-full items-center justify-between gap-4">
          <div>
            <div className="font-mono text-[8px] uppercase tracking-[0.24em] text-[#26342f]/45">Boarding Pass</div>
            <span className="mt-4 block text-[18px] font-bold leading-tight tracking-tight text-[#26342f]">
              Download<br />CV.pdf
            </span>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#26342f]/15 bg-[#fcf9f0]/55 text-[#26342f] transition-transform duration-200 group-hover:-translate-y-1">
            <Download size={22} />
          </div>
        </div>
      </motion.a>
    );
  }

  return (
    <motion.a
      href={`/images/${encodeURIComponent(filePath)}`}
      download={fileName}
      aria-label="Download CV.pdf"
      className="home-cv-ticket group relative mt-9 block h-[198px] w-[116px] overflow-visible text-[#17221e]"
      initial={{ rotate: -2 }}
      animate={{ y: [0, 1.5, 0], rotate: -2 }}
      whileHover={{ rotate: -2 }}
      whileTap={{ scale: 0.98, rotate: -2 }}
      transition={{ duration: 7.6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="absolute -right-1 -top-10 h-16 w-20 rotate-[22deg] rounded-[50%] border-t-2 border-[#5c5347]/58" aria-hidden="true" />
      <div
        className="relative h-full w-full overflow-hidden rounded-b-[8px] bg-[#c4a66f] px-3 pb-3 pt-6 shadow-[0_12px_20px_rgba(90,70,45,0.2)]"
        style={{
          clipPath: 'polygon(0 18px, 30% 18px, 38% 0, 62% 0, 70% 18px, 100% 18px, 100% 100%, 0 100%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 14px, transparent 0 6px, #000 6.8px)',
          maskImage: 'radial-gradient(circle at 50% 14px, transparent 0 6px, #000 6.8px)',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.36]"
          style={{
            backgroundImage:
              'linear-gradient(145deg, rgba(253,247,244,0.22), transparent 42%, rgba(50,34,18,0.16)), radial-gradient(circle at 1px 1px, rgba(50,34,18,0.26) 0.55px, transparent 0)',
            backgroundSize: '100% 100%, 12px 12px',
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-x-3 top-[54px] h-px bg-[#17221e]/24" aria-hidden="true" />
        <div className="absolute inset-x-3 top-[91px] h-px bg-[#17221e]/18" aria-hidden="true" />
        <div className="absolute inset-x-3 top-[128px] h-px bg-[#17221e]/18" aria-hidden="true" />
        <div className="absolute right-3 bottom-3 top-[44px] border-l border-[#17221e]/16" aria-hidden="true" />
        <div className="absolute bottom-4 right-5 top-[48px] w-[6px] opacity-[0.16]" style={{ backgroundImage: 'repeating-linear-gradient(180deg, #17221e 0 5px, transparent 5px 11px)' }} aria-hidden="true" />

        <div className="relative z-10 flex h-full flex-col justify-between" style={{ marginLeft: '-2px' }}>
          <div className="pt-3">
            <span className="mt-2 block font-mono text-[8px] uppercase tracking-[0.18em] text-[#17221e]/42">
              Download File
            </span>
          </div>
          <div>
            <div className="bg-[#fcf9f0]/24 px-2 py-1">
              <span className="block font-mono text-[13px] font-bold uppercase leading-none tracking-[0.02em] text-[#17221e]/88 transition-colors duration-200 group-hover:text-white">
                Download
              </span>
              <span className="mt-1.5 block font-mono text-[13px] font-bold leading-none tracking-[0.02em] text-[#17221e]/88 transition-colors duration-200 group-hover:text-white">
                CV.pdf
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between font-mono text-[7px] uppercase tracking-[0.14em] text-[#17221e]/48">
              <span>No. 2505</span>
              <span>04</span>
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
};
