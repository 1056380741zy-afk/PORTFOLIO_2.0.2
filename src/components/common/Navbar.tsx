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
      {/* 桌面端语言切换 (置于 viewport 右上角) */}
      <div className="hidden lg:block fixed top-6 right-6 z-[100]">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 h-9 px-3 rounded-lg border border-[#2d2d2d]/15 bg-white/50 backdrop-blur-sm text-text-dark/60 hover:text-text-dark hover:bg-white transition-all duration-200 font-mono text-[11px] uppercase tracking-[0.22em] shadow-sm focus-visible:outline-none"
          aria-label="Toggle language"
        >
          <Globe size={14} />
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
            className="p-1.5 text-text-dark/60"
          >
            <Globe size={16} />
          </button>
        </div>
      </nav>
    </>
  );
};
