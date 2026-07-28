import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { Check, Copy, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import type { CardAdjustOffset } from '../../sections/about-board/types';
import { DecorativeIcon } from '../../shared/DecorativeIcon';

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
  const copyTimeoutRef = useRef<number | null>(null);
  const email = "zy18964266810@outlook.com";
  const linkedInHandle = 'suha-zhu';
  const linkedInDisplayName = 'Suha ZHU';
  const wechatId = 'MeshSuha';
  const isCn = language === 'cn';
  const resolvedFrontAdjust = frontAdjust ?? { x: 10, y: 0, scale: 1 };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Keep the visible acknowledgement even if the browser blocks clipboard access.
    }

    if (copyTimeoutRef.current) {
      window.clearTimeout(copyTimeoutRef.current);
    }

    setCopied(true);
    copyTimeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
  };

  if (variant === 'archive') {
    return (
      <motion.div
        className="archive-material-card relative w-[630px]"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="relative z-20 w-[445px] overflow-visible rounded-[8px] border border-[#2d2d2d]/10 bg-[#fcf9f0]/88 px-6 py-6 shadow-[0_18px_34px_rgba(90,70,45,0.12),0_2px_8px_rgba(45,45,45,0.06)] backdrop-blur-[1px]">
          <div
            className="absolute inset-0 overflow-hidden rounded-[8px] opacity-[0.45]"
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

            <div className="rounded-[8px] border border-[#2d2d2d]/8 bg-[#fcf9f0]/70 p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.36)]">
              <div className="mb-2 font-mono text-[8px] uppercase tracking-[0.22em] text-[#2d2d2d]/34">
                Contact Folder
              </div>
              <div className="grid gap-2.5 text-[13px]">
                <div className="group flex items-center gap-2.5">
                  <DecorativeIcon icon={Mail} size={16} className="text-text-dark/58 group-hover:text-[#9f8fdb]" />
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
                    className={`ml-auto inline-flex h-6 w-[34px] shrink-0 items-center justify-center rounded-full border p-0 transition-colors duration-200 ${
                      copied
                        ? 'border-[#7e8966]/34 bg-[#7e8966]/16 text-[#657447]'
                        : 'border-[#9f8fdb]/18 bg-transparent text-text-dark/38 hover:border-[#9f8fdb]/30 hover:bg-[#9f8fdb]/10 hover:text-[#9f8fdb]'
                    }`}
                  >
                    <DecorativeIcon icon={copied ? Check : Copy} size={14} />
                  </button>
                </div>

                <a
                  href={`https://www.linkedin.com/in/${linkedInHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open LinkedIn profile ${linkedInDisplayName}`}
                  className="group flex items-center gap-2.5"
                >
                  <DecorativeIcon icon={Linkedin} size={16} className="text-[#8fafc3] group-hover:text-[#0077b5]" />
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
                  <DecorativeIcon icon={MessageCircle} size={16} className="text-[#7e8966] group-hover:text-[#07C160]" />
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
              className="absolute bottom-[-48px] left-[412px] z-10 w-[216px] rounded-[8px] border border-[#7e8966]/22 bg-[rgba(252,249,240,0.62)] p-4 shadow-[0_18px_30px_rgba(90,70,45,0.14)] backdrop-blur-md"
            >
              <div className="mb-2 font-mono text-[8px] uppercase tracking-[0.22em] text-[#7e8966]/72">Scan Here</div>
              <div className="rounded-[8px] border border-[#7e8966]/18 bg-[rgba(255,255,255,0.7)] p-2 shadow-sm backdrop-blur-sm">
                <img
                  src="/images/wechat-meshsuha-qr.jpeg"
                  alt="WeChat QR code for MeshSuha"
                  className="block w-full rounded-[8px]"
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
      className="home-contact-card relative w-[630px]"
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div
        className="home-postcard-enlarged pointer-events-none absolute -left-[120px] -top-[165px] z-0 h-[390px] w-[540px] rotate-[-8deg] overflow-hidden rounded-[8px] border border-[#8b785d]/22 bg-[#efe2c9] shadow-[0_18px_32px_rgba(76,58,34,0.2)]"
        aria-hidden="true"
      >
        <img
          src="/images/postcard-desert-background.png"
          alt=""
          width={1459}
          height={1049}
          draggable={false}
          className="h-full w-full select-none object-cover"
        />
      </div>

      {!hideFront && (
      <motion.div
        className="home-postcard-enlarged relative z-20 w-[510px]"
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
      <div className="home-contact-surface card relative h-[366px] w-[510px] overflow-visible rounded-[8px] border border-[#2d2d2d]/12 bg-[#fcf9f0] px-5 py-5 text-[#2d2d2d] shadow-[0_18px_34px_rgba(90,70,45,0.2),0_2px_8px_rgba(45,45,45,0.1)]">
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

          <div className="home-contact-folder -mt-[10px] rounded-[8px] border border-[#2d2d2d]/10 bg-transparent p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.32)]">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#2d2d2d]/34">
              Contact Folder
            </div>
            <div className="grid gap-2.5 text-[15px]">
              <div className="group flex items-center gap-2.5">
                <DecorativeIcon icon={Mail} size={16} className="text-text-dark/58 group-hover:text-[#9f8fdb]" />
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
                  className={`ml-auto inline-flex h-6 w-[34px] shrink-0 items-center justify-center rounded-full border p-0 transition-colors duration-200 ${
                    copied
                      ? 'border-[#7e8966]/34 bg-[#7e8966]/16 text-[#657447]'
                      : 'border-[#9f8fdb]/18 bg-transparent text-text-dark/38 hover:border-[#9f8fdb]/30 hover:bg-[#9f8fdb]/10 hover:text-[#9f8fdb]'
                  }`}
                >
                  <DecorativeIcon icon={copied ? Check : Copy} size={14} />
                </button>
              </div>

              <a
                href={`https://www.linkedin.com/in/${linkedInHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open LinkedIn profile ${linkedInDisplayName}`}
                className="group flex items-center gap-2.5"
              >
                <Linkedin size={16} strokeWidth={2.1} className="shrink-0 text-[#0077b5]" aria-hidden="true" />
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
                <MessageCircle size={16} strokeWidth={2.1} className="shrink-0 text-[#07C160]" aria-hidden="true" />
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
