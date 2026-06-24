import React, { useState } from 'react';
import { AboutBoard } from '../components/sections/AboutBoard';
import { StampCluster } from '../components/home/stamps/StampCluster';
import { useLanguage } from '../contexts/LanguageContext';

export const Home: React.FC = () => {
  const { t } = useLanguage();
  const [isStampEditMode, setIsStampEditMode] = useState(false);
  const [isStampVisible, setIsStampVisible] = useState(true);
  const year = new Date().getFullYear();

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
            "linear-gradient(110deg, rgba(247, 241, 230, 0.96) 0%, rgba(239, 225, 209, 0.92) 36%, rgba(239, 225, 209, 0.84) 100%)",
          backgroundColor: '#efe1d1',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% auto',
          backgroundPosition: 'center',
        }}
      >
        {isStampVisible && (
          <div
            className="hidden lg:block absolute top-[clamp(92px,14vh,132px)] z-[230] pointer-events-none"
            style={{ left: '38%' }}
          >
            <div className="relative" style={{ transform: 'translateX(calc(-50% - 80px)) scale(0.85)', transformOrigin: 'center top' }}>
              <StampCluster isEditMode={isStampEditMode} setIsEditMode={setIsStampEditMode} />
            </div>
          </div>
        )}

        <div className="w-full lg:w-[25%] lg:h-full shrink-0 flex flex-col bg-[#f9f4e8] pl-10 pr-10 lg:pl-[38px] lg:pr-[clamp(3.25rem,3.6vw,4.5rem)] py-6 lg:py-[21px]">
          <div className="max-w-[520px] my-auto">
            <div className="space-y-[clamp(2rem,5vh,3rem)]">
              <div className="inline-flex flex-col items-end">
                <div dir="rtl" className="text-[34px] leading-[1.1] text-text-dark font-makina text-right">
                  {t.homePage.greetingArabic}
                </div>
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

          <div className="mt-8 border-t border-[#2d2d2d]/10 pt-5 text-[10px] leading-none text-text-dark/65 font-mono">
            © {year} Yan Zhu. {t.footer.rights}
          </div>
        </div>

        <div className="w-full lg:w-[75%] lg:flex-1 shrink-0 relative overflow-visible bg-[#f9f4e8] p-3 md:p-4 lg:pt-[calc(clamp(1.5rem,5vh,2.5rem)-9px)] min-h-[400px] lg:min-h-0 lg:h-full">
          <div className="w-full h-full overflow-visible rounded-[28px] bg-[#f9f4e8] flex items-center justify-center">
            <AboutBoard
              stampControl={{
                isActive: isStampVisible,
                onToggle: () => setIsStampVisible((visible) => !visible),
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
};
