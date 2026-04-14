import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Copy, Check } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const Postcard: React.FC = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const email = "zy18964266810@outlook.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-[92vw] max-w-[572px] min-h-[264px]">
      <div className="origin-top-left scale-[0.88] w-[650px] min-h-[300px] bg-white p-8 shadow-2xl border border-gray-100 flex gap-12 relative overflow-visible">
        <div className="absolute top-6 right-8 w-16 h-20 border-2 border-dashed border-gray-300 flex items-center justify-center grayscale opacity-50 z-0">
          <span className="text-[10px] text-center font-mono uppercase tracking-tighter">Postage<br/>Required</span>
        </div>
        <div className="absolute left-[40%] top-10 bottom-10 w-px bg-gray-200" />
        
        <div className="w-[40%] pr-4 flex flex-col justify-center relative z-10">
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-2">
              <h1 className="text-xl font-bold text-text-dark tracking-tight">Yan Zhu</h1>
            </div>
            
            <div className="space-y-3">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">{t.hero.locationLabel}</span>
                <span className="text-xs font-medium text-text-dark">{t.hero.locationValue}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">{t.hero.workModeLabel}</span>
                <span className="text-xs font-medium text-text-dark">{t.hero.workModeValue}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">{t.hero.statusLabel}</span>
                <span className="text-xs font-medium text-text-dark">{t.hero.statusValue}</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <div className="space-y-1">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">{t.hero.focusLabel}</span>
                  <span className="text-[11px] font-bold text-[#8E6BBF]">{t.hero.focusValue}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">{t.hero.specLabel}</span>
                  <span className="text-[11px] font-bold text-text-dark border-b border-[#f5b002]/50 inline-block">{t.hero.specValue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[60%] pl-8 flex flex-col justify-end gap-6 pb-4 relative z-10">
          <div className="space-y-4">
            <div 
              onClick={handleCopy}
              className="border-b border-gray-300 pb-1 flex items-center gap-2 cursor-pointer group/email"
            >
              {copied ? <Check size={14} className="text-green-500" /> : <Mail size={14} className="text-gray-400 group-hover/email:text-[#8e6bbf]" />}
              <span className={`text-xs font-mono whitespace-nowrap transition-colors ${copied ? 'text-green-500' : 'text-gray-500 group-hover/email:text-[#8e6bbf]'}`}>
                {copied ? t.contact.btnCopied : email}
              </span>
              {!copied && <Copy size={10} className="text-gray-300 opacity-0 group-hover/email:opacity-100 transition-opacity" />}
            </div>
            <a 
              href="https://www.linkedin.com/in/ayna-yan-zhu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-b border-gray-300 pb-1 flex items-center gap-2 group/link"
            >
              <Linkedin size={14} className="text-[#0077b5]" />
              <span className="text-xs font-mono text-gray-500 group-hover/link:text-[#0077b5] transition-colors">ayna-yan-zhu</span>
            </a>
            <div className="border-b border-gray-300 pb-1 flex items-center gap-2 group/wechat">
              <svg 
                viewBox="0 0 24 24" 
                className="w-3.5 h-3.5 fill-[#07C160] transition-colors group-hover/wechat:fill-[#07C160]"
              >
                <path d="M8.224 4C4.345 4 1.2 6.613 1.2 9.833c0 1.83.998 3.46 2.548 4.582-.12.433-.44 1.585-.44 1.585l-.01.042c-.005.025-.008.053-.008.082 0 .145.08.273.198.34.053.03.113.045.174.045.07 0 .14-.02.203-.058l2.115-1.22c.71.19 1.465.295 2.244.295.343 0 .678-.02 1.004-.06-.24-.63-.374-1.31-.374-2.024 0-3.314 2.865-6 6.4-6 .31 0 .61.02.902.06C14.945 5.483 11.83 4 8.224 4zm9.376 6.667c-3.148 0-5.7 2.126-5.7 4.75 0 1.487.81 2.81 2.07 3.723-.097.352-.358 1.288-.358 1.288l-.008.034c-.004.02-.006.043-.006.067 0 .118.065.222.16.276.044.025.092.037.142.037.057 0 .114-.016.165-.047l1.72-1c.577.155 1.19.24 1.815.24 3.148 0 5.7-2.126 5.7-4.75s-2.552-4.75-5.7-4.75zM6.35 7.5a.85.85 0 1 1 0 1.7.85.85 0 0 1 0-1.7zm3.75 0a.85.85 0 1 1 0 1.7.85.85 0 0 1 0-1.7zm6.4 8.333a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm3 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z"/>
              </svg>
              <span className="text-xs font-mono text-gray-500 group-hover/wechat:text-[#07C160] transition-colors">
                {t.aboutBoard.postcard.wechatLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
