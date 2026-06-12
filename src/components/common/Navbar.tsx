import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { path: '/', label: 'HOME / / ABOUT INFO' },
    { path: '/journey', label: t.nav.journey || 'Journey' },
    { path: '/projects', label: t.nav.projects },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'cn' : 'en');
  };

  return (
    <>
      {/* 桌面端语言切换 */}
      <div className="hidden lg:block absolute top-3 right-4 z-[100]">
        <button
          onClick={toggleLanguage}
          className="flex h-7 min-w-[58px] items-center justify-center gap-2 rounded-full border border-[#2d2d2d]/12 bg-white/55 px-3.5 text-[9px] font-mono uppercase tracking-[0.18em] text-text-dark/60 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8e6bbf]/25"
          aria-label="Toggle language"
        >
          <Globe size={11} />
          <span>{language === 'en' ? 'CN' : 'EN'}</span>
        </button>
      </div>

      {/* 桌面端侧边导航 (相对于 card 容器) */}
      <nav
        className="hidden lg:flex side-nav-container"
        aria-label="Primary Desktop"
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              aria-current={isActive ? 'page' : undefined}
              className={`side-tab ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* 移动端顶部导航 (保持现状或微调) */}
      <nav
        className="lg:hidden sticky top-0 z-50 w-full bg-[#ece9e0]/80 backdrop-blur-md border-b border-[#2d2d2d]/5 px-3 py-2"
        aria-label="Primary Mobile"
      >
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-[10px] font-mono uppercase tracking-widest ${isActive ? 'text-[#8e6bbf] font-bold' : 'text-text-dark/60'}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <button
            onClick={toggleLanguage}
            className="flex h-7 items-center gap-1 rounded-full border border-[#2d2d2d]/10 bg-white/45 px-2 text-[9px] font-mono uppercase tracking-[0.14em] text-text-dark/60"
            aria-label="Toggle language"
          >
            <Globe size={12} />
            <span>{language === 'en' ? 'CN' : 'EN'}</span>
          </button>
        </div>
      </nav>
    </>
  );
};
