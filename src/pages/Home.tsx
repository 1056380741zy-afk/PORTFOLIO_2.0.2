import React, { useState } from 'react';
import { AboutBoard } from '../components/sections/AboutBoard';
import { StampCluster } from '../components/home/stamps/StampCluster';
import { useLanguage } from '../contexts/LanguageContext';

export const Home: React.FC = () => {
  const { t } = useLanguage();
  const [isStampEditMode, setIsStampEditMode] = useState(false);

  return (
    <main
      className="relative overflow-hidden min-h-[600px] lg:h-full lg:min-h-0"
      style={{
        width: '100%',
        borderRadius: '32px',
        boxSizing: 'content-box',
      }}
    >
      <div
        className="min-h-full lg:h-full w-full flex flex-col lg:flex-row relative"
        style={{
          paddingTop: '2px',
          paddingBottom: '2px',
          paddingLeft: '2px',
          paddingRight: '2px',
          marginTop: '-2px',
          marginBottom: '-2px',
          marginLeft: '-2px',
          marginRight: '-2px',
          borderRadius: '32px',
          backgroundImage:
            "linear-gradient(110deg, rgba(247, 246, 243, 0.95) 0%, rgba(247, 246, 243, 0.88) 36%, rgba(247, 246, 243, 0.82) 100%)",
          backgroundColor: '#f7f6f3',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% auto',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="hidden lg:block absolute top-[clamp(92px,14vh,132px)] z-[230] pointer-events-none"
          style={{ left: '38%' }}
        >
          <div className="relative" style={{ transform: 'translateX(calc(-50% - 80px))' }}>
            <StampCluster isEditMode={isStampEditMode} setIsEditMode={setIsStampEditMode} />
          </div>
        </div>

        <div className="w-full lg:w-[32%] shrink-0 flex flex-col justify-center pl-10 pr-10 lg:pl-14 lg:pr-[clamp(5.5rem,9vw,11rem)] py-6 lg:py-3">
          <div className="max-w-[520px]">
            <div className="space-y-[clamp(2rem,5vh,3rem)]">
              <div dir="rtl" className="text-[34px] leading-[1.1] text-text-dark font-makina text-right">
                {t.homePage.greetingArabic}
              </div>
              <div className="text-[13px] leading-[1.1] text-text-dark font-mono font-bold tracking-tight">
                Hi, I’m Suha.
              </div>
            </div>

            <div className="mt-[clamp(2rem,5vh,2.5rem)] space-y-[clamp(1.125rem,3vh,1.5rem)] text-[13px] leading-relaxed text-text-dark/80 font-mono">
              <p>{t.homePage.intro}</p>
              <p className="text-[11px] leading-relaxed text-text-dark/55">{t.homePage.experience}</p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[68%] lg:flex-1 shrink-0 relative overflow-hidden p-3 md:p-4 lg:pt-[clamp(1.5rem,5vh,2.5rem)] min-h-[400px] lg:min-h-0 lg:h-full">
          <div className="w-full h-full bg-[#f7f6f3]/70 shadow-[0_0_30px_rgba(0,0,0,0.04)] overflow-hidden flex items-center justify-center">
            <AboutBoard
              stampControl={{
                isActive: isStampEditMode,
                onToggle: () => setIsStampEditMode((active) => !active),
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
};
