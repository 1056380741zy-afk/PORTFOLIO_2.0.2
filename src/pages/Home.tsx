import React from 'react';
import { AboutBoard } from '../components/sections/AboutBoard';
import { useLanguage } from '../contexts/LanguageContext';

export const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const year = new Date().getFullYear();
  const pageBackgroundColor = 'var(--portfolio-paper)';

  return (
    <main
      className="home-page-shell relative h-full min-h-0 overflow-hidden"
      style={{
        width: '100%',
        borderRadius: '8px',
        boxSizing: 'content-box',
      }}
    >
      <div
        className="home-document-grid relative grid h-full w-full grid-cols-[25%_75%]"
        style={{
          padding: 0,
          margin: 0,
          borderRadius: '8px',
          backgroundColor: pageBackgroundColor,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% auto',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="home-cover-panel relative z-20 flex h-full w-full min-w-0 flex-col px-[70px] py-[30px]"
          style={{ backgroundColor: pageBackgroundColor, boxShadow: '3px 0 10px rgba(90, 70, 45, 0.12)' }}
        >
          <div className="max-w-[520px] my-auto mx-[-6px]">
            <div className="home-greeting-stack space-y-[37px]">
              <div className="inline-flex w-full flex-col items-end text-right">
                <div dir="rtl" className="home-arabic-greeting w-full text-[34px] leading-[1.1] text-text-dark font-makina text-right">
                  {t.homePage.greetingArabic}
                </div>
              </div>
              <div className="home-hi-line text-[13px] leading-[1.1] text-text-dark font-mono font-bold tracking-tight">
                {t.homePage.greetingEnglish}
              </div>
            </div>

            <div className="home-intro-copy mt-[37px] space-y-[22px] text-[13px] leading-relaxed text-text-dark/80 font-mono">
              <p className={`home-intro-main ${language === 'cn' ? 'whitespace-pre-line' : ''}`}>{t.homePage.intro}</p>
              <p className="home-intro-hint text-[11px] leading-relaxed text-text-dark/55">{t.homePage.experience}</p>
            </div>
          </div>

          <div className="home-footer-note mt-8 border-t border-[#2d2d2d]/10 pt-5 text-[10px] leading-none text-text-dark/65 font-mono">
            © {year} Yan Zhu. {t.footer.rights}
          </div>
        </div>

        <div
          className="home-profile-board relative z-10 h-full min-h-0 w-full min-w-0 overflow-hidden rounded-[8px]"
          style={{
            margin: '0 0 0 -25px',
            padding: 0,
            width: 'calc(100% + 25px)',
            height: '100%',
            backgroundColor: pageBackgroundColor,
          }}
        >
          <AboutBoard releaseCardFrame />
        </div>
      </div>
    </main>
  );
};
