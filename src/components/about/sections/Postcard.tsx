import React, { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const Postcard: React.FC = () => {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [wechatQrOpen, setWechatQrOpen] = useState(false);
  const email = "zy18964266810@outlook.com";
  const linkedInHandle = 'suha-zhu';
  const linkedInDisplayName = 'Yan ZHU';
  const wechatId = 'MeshSuha';
  const isCn = language === 'cn';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-[92vw] max-w-[450px]">
      <div className="card w-full bg-white/85 rounded-[18px] border border-[#2d2d2d]/10 shadow-[0_18px_38px_rgba(45,45,45,0.13),0_2px_8px_rgba(45,45,45,0.08)] px-6 py-8 sm:px-7 sm:py-5 overflow-hidden">
        <div className="halftone" aria-hidden="true" />
        <div className="absolute top-6 right-8 w-16 h-20 border-2 border-dashed border-gray-300 flex items-center justify-center grayscale opacity-50 z-10">
          <span className="text-[10px] text-center font-mono uppercase tracking-tighter">Postage<br/>Required</span>
        </div>

        <div className="relative z-10 flex flex-col gap-6 text-[16px] leading-[1.5] font-sans text-text-dark">
          <div className="flex flex-col gap-1">
            <h1 className="text-[28px] leading-[1.1] font-bold tracking-tight">Suha Zhu</h1>
            <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
            </div>
          </div>

          <div className="flex flex-col gap-3 text-[14px] text-text-dark/80">
            <div className="flex flex-col gap-0.5">
              <span className={`text-[10px] font-mono text-gray-400 ${isCn ? 'tracking-normal' : 'uppercase tracking-[0.18em]'}`}>
                {t.hero.locationLabel}
              </span>
              <span className="text-[15px] font-bold text-[#8E6BBF]">{t.hero.locationValue}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className={`text-[10px] font-mono text-gray-400 ${isCn ? 'tracking-normal' : 'uppercase tracking-[0.18em]'}`}>
                {t.hero.statusLabel}
              </span>
              <span className="text-[15px] font-bold text-text-dark border-b border-[#f5b002]/50 inline-block self-start">
                {t.hero.statusValue}
              </span>
            </div>
          </div>

          <div className="grid gap-3 text-[14px]">
            <div className="group flex items-center gap-3">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 shrink-0 text-text-dark/70 group-hover:text-[#8e6bbf] transition-colors duration-200">
                <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.236-7.447 4.659a1 1 0 0 1-1.106 0L4 8.236V6l8 5 8-5v2.236Z" />
              </svg>
              <a
                href={`mailto:${email}`}
                aria-label={`Email ${email}`}
                className="min-w-0 truncate text-text-dark/75 hover:text-[#8e6bbf] transition-colors duration-200"
              >
                {email}
              </a>
              <button
                type="button"
                onClick={handleCopy}
                aria-label={copied ? 'Copied' : 'Copy email'}
                className="ml-auto p-2 -m-2 text-text-dark/35 hover:text-[#8e6bbf] transition-colors duration-200"
              >
                {copied ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4">
                    <path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4">
                    <path fill="currentColor" d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1Zm4 4H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 18H8V7h12v16Z" />
                  </svg>
                )}
              </button>
            </div>

            <a
              href={`https://www.linkedin.com/in/${linkedInHandle}/`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open LinkedIn profile ${linkedInDisplayName}`}
              className="group flex items-center gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 shrink-0 text-[#0077b5] group-hover:text-[#0077b5] transition-colors duration-200">
                <path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM0 24h5V7H0v17Zm7.5-17H12v2.3h.1c.6-1.1 2.1-2.3 4.3-2.3 4.6 0 5.5 3 5.5 6.9V24h-5v-8.6c0-2 0-4.6-2.8-4.6s-3.2 2.2-3.2 4.4V24h-5V7Z" />
              </svg>
              <span className="min-w-0 truncate text-text-dark/75 group-hover:text-[#0077b5] transition-colors duration-200">
                {linkedInDisplayName}
              </span>
              <span className="ml-auto shrink-0 rounded-full border border-[#0077b5]/20 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-[#0077b5]/75 group-hover:bg-[#0077b5] group-hover:text-white transition-colors duration-200">
                click
              </span>
            </a>

            <div className="flex flex-col gap-3">
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
                className="group flex w-full items-center gap-3 text-left"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 shrink-0 text-[#07C160] group-hover:text-[#07C160] transition-colors duration-200">
                  <path fill="currentColor" d="M8.224 4C4.345 4 1.2 6.613 1.2 9.833c0 1.83.998 3.46 2.548 4.582l-.44 1.627a.42.42 0 0 0 .198.467.41.41 0 0 0 .377-.013l2.115-1.22c.71.19 1.465.295 2.244.295.343 0 .678-.02 1.004-.06-.24-.63-.374-1.31-.374-2.024 0-3.314 2.865-6 6.4-6 .31 0 .61.02.902.06C14.945 5.483 11.83 4 8.224 4Zm-1.874 5.2a.85.85 0 1 1 0-1.7.85.85 0 0 1 0 1.7Zm3.75 0a.85.85 0 1 1 0-1.7.85.85 0 0 1 0 1.7Zm7.5 1.467c-3.148 0-5.7 2.126-5.7 4.75 0 1.487.81 2.81 2.07 3.723l-.358 1.322a.35.35 0 0 0 .16.39.34.34 0 0 0 .307-.01l1.72-1c.577.155 1.19.24 1.815.24 3.148 0 5.7-2.126 5.7-4.75s-2.552-4.75-5.7-4.75Zm-1.1 6.666a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm3 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
                <span className="min-w-0 truncate text-left text-text-dark/75 group-hover:text-[#07C160] transition-colors duration-200">
                  {wechatId}
                </span>
                <span className="ml-auto p-2 -m-2 text-text-dark/35 group-hover:text-[#07C160] transition-colors duration-200">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className={`w-4 h-4 transition-transform duration-200 ${wechatQrOpen ? 'rotate-180' : ''}`}
                  >
                    <path fill="currentColor" d="M12 16.5 5.5 10l1.4-1.4 5.1 5.1 5.1-5.1 1.4 1.4L12 16.5Z" />
                  </svg>
                </span>
              </button>

              <div
                id="wechat-meshsuha-qr"
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                  wechatQrOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="ml-6 flex items-start gap-2.5 pt-1">
                    <div className="w-[146px] rounded-xl border border-[#07C160]/15 bg-white p-2 shadow-sm">
                      <img
                        src="/images/wechat-meshsuha-qr.jpeg"
                        alt="WeChat QR code for MeshSuha"
                        className="block w-full rounded-lg"
                      />
                    </div>
                    <div className="mt-2 flex w-[76px] flex-col items-center text-[#07C160]">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#07C160]">
                        Scan Here
                      </span>
                      <svg
                        viewBox="0 0 86 124"
                        aria-hidden="true"
                        className="mt-1 h-[88px] w-[62px] shrink-0 rotate-[3deg]"
                      >
                        <path
                          d="M63 8C82 29 76 56 51 67C24 79 17 43 45 39C73 35 78 72 49 94C39 102 27 110 14 116"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 116l7-18M14 116l18-1"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
