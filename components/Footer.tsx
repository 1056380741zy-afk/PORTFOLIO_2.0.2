import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t border-[#2d2d2d]/5 bg-base-bg md:snap-start">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-sm text-gray-400">
        <div className="font-medium">
            © {year} Yan Zhu. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
};