import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { useLanguage } from '../../../contexts/LanguageContext';
import type { CardAdjustOffset } from '../../sections/about-board/types';

type PostcardProps = {
  variant?: 'default' | 'archive';
  frontAdjust?: CardAdjustOffset;
  hideFront?: boolean;
  onFrontAdjustChange?: (nextOffset: CardAdjustOffset) => void;
};

export const Postcard: React.FC<PostcardProps> = ({
  variant = 'default',
  frontAdjust,
  hideFront = false,
  onFrontAdjustChange,
}) => {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [wechatQrOpen, setWechatQrOpen] = useState(false);
  const frontDragStartRef = useRef({ x: 0, y: 0 });
  const email = "zy18964266810@outlook.com";
  const linkedInHandle = 'ayna-yan-zhu';
  const linkedInDisplayName = 'Yan ZHU';
  const wechatId = 'MeshSuha';
  const isCn = language === 'cn';
  const resolvedFrontAdjust = frontAdjust ?? { x: 10, y: 0, scale: 1 };

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (variant === 'archive') {
    return (
      <motion.div
        className="archive-material-card relative w-[630px] max-w-[92vw]"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="relative z-20 w-[445px] overflow-visible rounded-[18px] border border-[#2d2d2d]/10 bg-[#fcf9f0]/88 px-6 py-6 shadow-[0_18px_34px_rgba(90,70,45,0.12),0_2px_8px_rgba(45,45,45,0.06)] backdrop-blur-[1px]">
          <div
            className="absolute inset-0 overflow-hidden rounded-[18px] opacity-[0.45]"
            aria-hidden="true"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(45,45,45,0.08) 0.65px, transparent 0)',
              backgroundSize: '7px 7px',
            }}
          />
          <div className="halftone opacity-[0.13]" aria-hidden="true" />
          <div className="absolute right-6 top-5 z-10 flex h-16 w-14 items-center justify-center border border-dashed border-[#2d2d2d]/18 text-center font-mono text-[8px] uppercase leading-tight tracking-[0.08em] text-[#2d2d2d]/30">
            Postage<br />Required
          </div>

          <div className="relative z-10 grid gap-5 text-[#2d2d2d]">
            <div>
              <div className="font-mono text-[8px] uppercase tracking-[0.24em] text-[#2d2d2d]/35">
                Field Contact Card
              </div>
              <h1 className="mt-1 text-[30px] font-bold leading-none tracking-tight">Suha ZHU</h1>
            </div>

            <div className="grid gap-2.5 pr-16 text-[14px] text-text-dark/80">
              <div>
                <span className={`block text-[9px] font-mono text-[#2d2d2d]/38 ${isCn ? 'tracking-normal' : 'uppercase tracking-[0.18em]'}`}>
                  {t.hero.locationLabel}
                </span>
                <span className="mt-1 block text-[14px] font-bold text-[#9f8fdb]">{t.hero.locationValue}</span>
              </div>
              <div>
                <span className={`block text-[9px] font-mono text-[#2d2d2d]/38 ${isCn ? 'tracking-normal' : 'uppercase tracking-[0.18em]'}`}>
                  {t.hero.statusLabel}
                </span>
                <span className="mt-1 inline-block border-b border-[#f2b642]/60 text-[14px] font-bold text-text-dark">
                  {t.hero.statusValue}
                </span>
              </div>
            </div>

            <div className="rounded-[14px] border border-[#2d2d2d]/8 bg-[#fcf9f0]/70 p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.36)]">
              <div className="mb-2 font-mono text-[8px] uppercase tracking-[0.22em] text-[#2d2d2d]/34">
                Contact Folder
              </div>
              <div className="grid gap-2.5 text-[13px]">
                <div className="group flex items-center gap-2.5">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-text-dark/58 group-hover:text-[#9f8fdb]">
                    <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.236-7.447 4.659a1 1 0 0 1-1.106 0L4 8.236V6l8 5 8-5v2.236Z" />
                  </svg>
                  <a
                    href={`mailto:${email}`}
                    aria-label={`Email ${email}`}
                    className="min-w-0 truncate text-text-dark/72 transition-colors duration-200 hover:text-[#9f8fdb]"
                  >
                    {email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopy}
                    aria-label={copied ? 'Copied' : 'Copy email'}
                    className="ml-auto p-1.5 text-text-dark/32 transition-colors duration-200 hover:text-[#9f8fdb]"
                  >
                    {copied ? (
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
                        <path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
                        <path fill="currentColor" d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1Zm4 4H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 18H8V7h12v16Z" />
                      </svg>
                    )}
                  </button>
                </div>

                <a
                  href={`https://www.linkedin.com/in/${linkedInHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open LinkedIn profile ${linkedInDisplayName}`}
                  className="group flex items-center gap-2.5"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#8fafc3] transition-colors duration-200 group-hover:text-[#0077b5]">
                    <path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM0 24h5V7H0v17Zm7.5-17H12v2.3h.1c.6-1.1 2.1-2.3 4.3-2.3 4.6 0 5.5 3 5.5 6.9V24h-5v-8.6c0-2 0-4.6-2.8-4.6s-3.2 2.2-3.2 4.4V24h-5V7Z" />
                  </svg>
                  <span className="min-w-0 truncate text-text-dark/72 transition-colors duration-200 group-hover:text-[#0077b5]">
                    {linkedInDisplayName}
                  </span>
                  <span className="ml-auto rounded-full border border-[#8fafc3]/35 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-[#2d2d2d]/42 transition-colors duration-200 group-hover:border-[#0077b5]/25 group-hover:text-[#0077b5]">
                    click
                  </span>
                </a>

                <button
                  type="button"
                  onPointerDown={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    setWechatQrOpen((open) => !open);
                  }}
                  aria-expanded={wechatQrOpen}
                  aria-controls="wechat-meshsuha-archive-qr"
                  aria-label={wechatQrOpen ? 'Collapse WeChat QR code' : 'Expand WeChat QR code'}
                  className="group flex w-full items-center gap-2.5 text-left"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#7e8966] transition-colors duration-200 group-hover:text-[#07C160]">
                    <path fill="currentColor" d="M8.224 4C4.345 4 1.2 6.613 1.2 9.833c0 1.83.998 3.46 2.548 4.582l-.44 1.627a.42.42 0 0 0 .198.467.41.41 0 0 0 .377-.013l2.115-1.22c.71.19 1.465.295 2.244.295.343 0 .678-.02 1.004-.06-.24-.63-.374-1.31-.374-2.024 0-3.314 2.865-6 6.4-6 .31 0 .61.02.902.06C14.945 5.483 11.83 4 8.224 4Zm-1.874 5.2a.85.85 0 1 1 0-1.7.85.85 0 0 1 0 1.7Zm3.75 0a.85.85 0 1 1 0-1.7.85.85 0 0 1 0 1.7Zm7.5 1.467c-3.148 0-5.7 2.126-5.7 4.75 0 1.487.81 2.81 2.07 3.723l-.358 1.322a.35.35 0 0 0 .16.39.34.34 0 0 0 .307-.01l1.72-1c.577.155 1.19.24 1.815.24 3.148 0 5.7-2.126 5.7-4.75s-2.552-4.75-5.7-4.75Zm-1.1 6.666a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm3 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                  </svg>
                  <span className="min-w-0 truncate text-text-dark/72 transition-colors duration-200 group-hover:text-[#7e8966]">
                    {wechatId}
                  </span>
                  <span className="ml-auto rounded-full border border-[#07C160]/24 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-[#07C160]/75 transition-colors duration-200 group-hover:border-[#07C160]/30 group-hover:text-[#07C160]">
                    {wechatQrOpen ? 'hide' : 'pull'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {wechatQrOpen && (
            <motion.aside
              id="wechat-meshsuha-archive-qr"
              initial={{ x: -72, opacity: 0, rotate: -1 }}
              animate={{ x: 0, opacity: 1, rotate: 1.5 }}
              exit={{ x: -72, opacity: 0, rotate: -1 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              style={{ backgroundColor: 'rgba(252, 249, 240, 0.62)' }}
              className="absolute bottom-[-48px] left-[412px] z-10 w-[216px] rounded-[12px] border border-[#7e8966]/22 bg-[rgba(252,249,240,0.62)] p-4 shadow-[0_18px_30px_rgba(90,70,45,0.14)] backdrop-blur-md"
            >
              <div className="mb-2 font-mono text-[8px] uppercase tracking-[0.22em] text-[#7e8966]/72">Scan Here</div>
              <div className="rounded-[8px] border border-[#7e8966]/18 bg-[rgba(255,255,255,0.7)] p-2 shadow-sm backdrop-blur-sm">
                <img
                  src="/images/wechat-meshsuha-qr.jpeg"
                  alt="WeChat QR code for MeshSuha"
                  className="block w-full rounded-[5px]"
                />
              </div>
              <div className="mt-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-[#26342f]/50">
                <span>{wechatId}</span>
                <span>QR</span>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative w-[630px] max-w-[92vw]"
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div
        className="pointer-events-none absolute -left-[120px] -top-[165px] z-0 h-[390px] w-[540px] rotate-[-8deg] overflow-hidden rounded-[8px] border border-[#8b785d]/22 bg-[#efe2c9] shadow-[0_18px_32px_rgba(76,58,34,0.2)]"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/bg/Sidr%20tree.png')",
          }}
        />
        <div className="absolute inset-0 bg-[#fcf9f0]/10" />
        <div className="absolute inset-[16px] border border-[#fcf9f0]/24" />
      </div>

      {!hideFront && (
      <motion.div
        className="relative z-20 w-[510px]"
        drag
        dragMomentum={false}
        initial={false}
        animate={{
          x: resolvedFrontAdjust.x,
          y: resolvedFrontAdjust.y,
          rotate: 5,
          scale: resolvedFrontAdjust.scale,
        }}
        onPointerDown={(e) => e.stopPropagation()}
        onDragStart={() => {
          frontDragStartRef.current = { x: resolvedFrontAdjust.x, y: resolvedFrontAdjust.y };
        }}
        onDragEnd={(_, info: PanInfo) => {
          onFrontAdjustChange?.({
            ...resolvedFrontAdjust,
            x: Math.round(frontDragStartRef.current.x + info.offset.x),
            y: Math.round(frontDragStartRef.current.y + info.offset.y),
          });
        }}
        style={{
          transformOrigin: 'top left',
        }}
      >
      <div className="card relative h-[366px] w-[510px] overflow-visible rounded-[8px] border border-[#2d2d2d]/12 bg-[#fcf9f0] px-5 py-5 text-[#2d2d2d] shadow-[0_18px_34px_rgba(90,70,45,0.2),0_2px_8px_rgba(45,45,45,0.1)]">
        <div
          className="absolute inset-0 overflow-hidden rounded-[8px] opacity-[0.12]"
          aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(45,45,45,0.08) 0.65px, transparent 0)',
            backgroundSize: '7px 7px',
          }}
        />
        <div className="halftone opacity-[0.035]" aria-hidden="true" />
        <div className="absolute right-6 top-5 z-10 flex h-16 w-14 items-center justify-center border border-dashed border-[#2d2d2d]/18 text-center font-mono text-[10px] uppercase leading-tight tracking-[0.08em] text-[#2d2d2d]/30">
          Postage<br />Required
        </div>

        <div className="relative z-10 grid gap-5 text-[18px] leading-[1.5] font-sans">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#2d2d2d]/35">
              Field Contact Card
            </div>
            <h1 className="mt-1 text-[32px] font-bold leading-none tracking-tight">Suha ZHU</h1>
          </div>

          <div className="grid gap-2.5 pr-16 text-[16px] text-text-dark/80">
            <div>
              <span className={`block text-[11px] font-mono text-[#2d2d2d]/38 ${isCn ? 'tracking-normal' : 'uppercase tracking-[0.18em]'}`}>
                {t.hero.locationLabel}
              </span>
              <span className="mt-1 block text-[16px] font-bold text-[#9f8fdb]">{t.hero.locationValue}</span>
            </div>
            <div>
              <span className={`block text-[11px] font-mono text-[#2d2d2d]/38 ${isCn ? 'tracking-normal' : 'uppercase tracking-[0.18em]'}`}>
                {t.hero.statusLabel}
              </span>
              <span className="mt-1 inline-block border-b border-[#f2b642]/60 text-[16px] font-bold text-text-dark">
                {t.hero.statusValue}
              </span>
            </div>
          </div>

          <div className="rounded-[8px] border border-[#2d2d2d]/10 bg-transparent p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.32)]">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#2d2d2d]/34">
              Contact Folder
            </div>
            <div className="grid gap-2.5 text-[15px]">
              <div className="group flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-text-dark/58 transition-colors duration-200 group-hover:text-[#9f8fdb]">
                  <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.236-7.447 4.659a1 1 0 0 1-1.106 0L4 8.236V6l8 5 8-5v2.236Z" />
                </svg>
                <a
                  href={`mailto:${email}`}
                  aria-label={`Email ${email}`}
                  className="min-w-0 truncate text-text-dark/72 transition-colors duration-200 hover:text-[#9f8fdb]"
                >
                  {email}
                </a>
                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label={copied ? 'Copied' : 'Copy email'}
                  className="ml-auto p-1.5 text-text-dark/32 transition-colors duration-200 hover:text-[#9f8fdb]"
                >
                  {copied ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
                      <path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
                      <path fill="currentColor" d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1Zm4 4H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 18H8V7h12v16Z" />
                    </svg>
                  )}
                </button>
              </div>

              <a
                href={`https://www.linkedin.com/in/${linkedInHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open LinkedIn profile ${linkedInDisplayName}`}
                className="group flex items-center gap-2.5"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#0077b5] transition-colors duration-200 group-hover:text-[#0077b5]">
                  <path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM0 24h5V7H0v17Zm7.5-17H12v2.3h.1c.6-1.1 2.1-2.3 4.3-2.3 4.6 0 5.5 3 5.5 6.9V24h-5v-8.6c0-2 0-4.6-2.8-4.6s-3.2 2.2-3.2 4.4V24h-5V7Z" />
                </svg>
                <span className="min-w-0 truncate text-text-dark/72 transition-colors duration-200 group-hover:text-[#0077b5]">
                  {linkedInDisplayName}
                </span>
                <span className="ml-auto inline-flex h-[18px] w-[48px] items-center justify-center rounded-full border border-[#0077b5]/20 px-0 py-0 font-mono text-[10px] uppercase tracking-[0.16em] text-[#0077b5]/75 transition-colors duration-200 group-hover:border-[#0077b5]/25 group-hover:bg-[#0077b5] group-hover:text-white">
                  click
                </span>
              </a>

              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  setWechatQrOpen((open) => !open);
                }}
                aria-expanded={wechatQrOpen}
                aria-controls="wechat-meshsuha-qr"
                aria-label={wechatQrOpen ? 'Collapse WeChat QR code' : 'Expand WeChat QR code'}
                className="group flex w-full items-center gap-2.5 text-left"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#07C160] transition-colors duration-200 group-hover:text-[#07C160]">
                  <path fill="currentColor" d="M8.224 4C4.345 4 1.2 6.613 1.2 9.833c0 1.83.998 3.46 2.548 4.582l-.44 1.627a.42.42 0 0 0 .198.467.41.41 0 0 0 .377-.013l2.115-1.22c.71.19 1.465.295 2.244.295.343 0 .678-.02 1.004-.06-.24-.63-.374-1.31-.374-2.024 0-3.314 2.865-6 6.4-6 .31 0 .61.02.902.06C14.945 5.483 11.83 4 8.224 4Zm-1.874 5.2a.85.85 0 1 1 0-1.7.85.85 0 0 1 0 1.7Zm3.75 0a.85.85 0 1 1 0-1.7.85.85 0 0 1 0 1.7Zm7.5 1.467c-3.148 0-5.7 2.126-5.7 4.75 0 1.487.81 2.81 2.07 3.723l-.358 1.322a.35.35 0 0 0 .16.39.34.34 0 0 0 .307-.01l1.72-1c.577.155 1.19.24 1.815.24 3.148 0 5.7-2.126 5.7-4.75s-2.552-4.75-5.7-4.75Zm-1.1 6.666a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm3 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
                <span className="min-w-0 truncate text-text-dark/72 transition-colors duration-200 group-hover:text-[#07C160]">
                  {wechatId}
                </span>
                <span className="ml-auto inline-flex h-[18px] w-[48px] items-center justify-center rounded-full border border-[#07C160]/20 px-0 py-0 font-mono text-[10px] uppercase tracking-[0.16em] text-[#07C160]/75 transition-colors duration-200 group-hover:border-[#07C160]/25 group-hover:bg-[#07C160] group-hover:text-white">
                  {wechatQrOpen ? 'hide' : 'pull'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {wechatQrOpen && (
          <motion.aside
            id="wechat-meshsuha-qr"
            initial={{ x: -72, opacity: 0, rotate: -2 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            exit={{ x: -72, opacity: 0, rotate: -2 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            style={{ backgroundColor: 'rgba(252, 249, 240, 0.62)' }}
            className="absolute bottom-[-50px] left-[476px] z-10 h-[236px] w-[236px] rounded-[10px] border border-[#7e8966]/22 bg-[rgba(252,249,240,0.62)] px-9 py-5 shadow-[0_18px_30px_rgba(90,70,45,0.14)] backdrop-blur-md"
          >
            <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7e8966]/72">Scan Here</div>
            <div className="mx-auto w-[90%] rounded-[7px] border border-[#7e8966]/18 bg-[rgba(255,255,255,0.7)] p-1.5 shadow-sm backdrop-blur-sm">
              <img
                src="/images/wechat-meshsuha-qr.jpeg"
                alt="WeChat QR code for MeshSuha"
                className="block w-full rounded-[5px]"
              />
            </div>
            <div className="mt-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-[#26342f]/50">
              <span>{wechatId}</span>
              <span>QR</span>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      </motion.div>
      )}
    </motion.div>
  );
};
