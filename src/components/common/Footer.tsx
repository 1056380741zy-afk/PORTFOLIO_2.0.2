import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#f9f4e8]/80 bg-[#f9f4e8] rounded-b-[8px] overflow-hidden">

      {/* Copyright */}
      <div className="py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <div className="font-medium">
              © {year} Yan Zhu. {t.footer.rights}
          </div>
        </div>
      </div>
    </footer>
  );
};
