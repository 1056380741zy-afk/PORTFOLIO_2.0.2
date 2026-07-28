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
    { path: '/projects/preview', label: t.nav.projects },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'cn' : 'en');
  };

  return (
    <>
      {/* 桌面端语言切换 */}
      <div className="absolute right-7 top-[-24px] z-[100]">
        <button
          onClick={toggleLanguage}
          className="language-tab"
          aria-label="Toggle language"
        >
          <Globe size={11} />
          <span>{language === 'en' ? 'CN' : 'EN'}</span>
        </button>
      </div>

      {/* 桌面端侧边导航 (相对于 card 容器) */}
      <nav className="side-nav-container" aria-label="Primary Desktop">
        {navItems.map((item) => {
          const isActive = item.path === '/projects/preview'
            ? location.pathname.startsWith('/projects/preview')
            : location.pathname === item.path;
          const tabKey = item.path === '/'
            ? 'home'
            : item.path.split('/').filter(Boolean).join('-');
          return (
            <Link
              key={item.path}
              to={item.path}
              aria-current={isActive ? 'page' : undefined}
              className={`side-tab side-tab-${tabKey} ${isActive ? 'active' : ''}`}
            >
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

    </>
  );
};
