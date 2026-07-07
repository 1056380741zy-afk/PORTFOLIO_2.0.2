import React, { useRef, useState } from 'react';
import { AboutBoard } from '../components/sections/AboutBoard';
import { StampCluster } from '../components/home/stamps/StampCluster';
import { useLanguage } from '../contexts/LanguageContext';

type HomeProps = {
  globalCardDrag?: boolean;
};

export const Home: React.FC<HomeProps> = ({ globalCardDrag = false }) => {
  const { t } = useLanguage();
  const pageRef = useRef<HTMLDivElement>(null);
  const [isStampEditMode, setIsStampEditMode] = useState(false);
  const [isStampVisible, setIsStampVisible] = useState(false);
  const year = new Date().getFullYear();
  const pageBackgroundColor = globalCardDrag ? 'rgba(252, 249, 240, 0.3)' : '#fcf9f0';

  return (
    <main
      className="relative overflow-hidden min-h-[600px] lg:h-full lg:min-h-0"
      style={{
        width: '100%',
        borderRadius: '28px',
        boxSizing: 'content-box',
      }}
    >
      <div
        ref={pageRef}
        className={`min-h-full lg:h-full w-full ${globalCardDrag ? 'block' : 'flex flex-col lg:flex-row'} relative`}
        style={{
          padding: 0,
          margin: 0,
          borderRadius: '28px',
          backgroundColor: pageBackgroundColor,
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

        <div
          className={
            globalCardDrag
              ? 'absolute left-[42px] top-[52px] z-[80] w-[270px] flex flex-col px-0 py-0'
              : 'relative z-20 w-full lg:w-[320px] lg:h-full shrink-0 flex flex-col px-[50px] py-5'
          }
          style={globalCardDrag ? undefined : { backgroundColor: pageBackgroundColor, boxShadow: '3px 0 10px rgba(90, 70, 45, 0.12)' }}
        >
          <div className="max-w-[520px] my-auto mx-[-6px]">
            <div className="space-y-[clamp(2rem,5vh,3rem)]">
              <div className="inline-flex w-full flex-col items-end text-right">
                <div dir="rtl" className="w-full text-[34px] leading-[1.1] text-text-dark font-makina text-right">
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

          <div className={`${globalCardDrag ? 'mt-10' : 'mt-8 border-t border-[#2d2d2d]/10 pt-5'} text-[10px] leading-none text-text-dark/65 font-mono`}>
            © {year} Yan Zhu. {t.footer.rights}
          </div>
        </div>

        <div
          className={
            globalCardDrag
              ? 'absolute inset-0 z-30 overflow-visible rounded-[28px]'
              : 'w-full lg:flex-1 shrink-0 relative z-10 overflow-visible min-h-[400px] lg:min-h-0 lg:h-full rounded-[28px]'
          }
          style={
            globalCardDrag
              ? { backgroundColor: pageBackgroundColor }
              : {
                  margin: '10px 0',
                  padding: '15px',
                  width: 'calc(100% - 320px)',
                  height: 'calc(100% - 15px)',
                  backgroundColor: pageBackgroundColor,
                }
          }
        >
          <div
            className="w-full h-full overflow-visible rounded-[28px] flex items-center justify-center"
            style={{ backgroundColor: pageBackgroundColor }}
          >
            <AboutBoard
              cardDragConstraintsRef={globalCardDrag ? pageRef : undefined}
              releaseCardFrame={globalCardDrag}
              layout={globalCardDrag ? 'archive' : 'default'}
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
