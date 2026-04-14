import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, BarChart3, Handshake, Download } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const Blueprint: React.FC = () => {
  const { t } = useLanguage();
  const ICONS = [
    <ClipboardCheck size={20} />,
    <BarChart3 size={20} />,
    <Handshake size={20} />
  ];

  return (
    <div className="w-[450px] bg-[#2A4B8D] p-8 shadow-2xl border-4 border-[#3A5B9D] text-white relative overflow-hidden"
         style={{ 
           backgroundImage: `linear-gradient(#ffffff0a 1px, transparent 1px), linear-gradient(90deg, #ffffff0a 1px, transparent 1px)`,
           backgroundSize: '20px 20px'
         }}>
      {/* Technical markings */}
      <div className="absolute top-2 left-2 text-[8px] font-mono opacity-40 uppercase">Scale: 1:1 / Ref: {t.competencies.title}</div>
      <div className="absolute bottom-2 right-2 text-[8px] font-mono opacity-40 uppercase">Revision: 2.0 / 2024</div>
      
      <h2 className="text-2xl font-mono font-bold mb-8 uppercase tracking-[0.2em] border-b border-white/30 pb-4">
        {t.competencies.title}
      </h2>

      <div className="grid grid-cols-1 gap-8 py-4">
        {t.competencies.items.map((comp, idx) => (
          <div key={idx} className="flex items-center gap-6 group">
            <div className="w-12 h-12 border border-white/40 flex items-center justify-center shrink-0">
              {ICONS[idx]}
            </div>
            <h3 className="font-mono font-bold text-base uppercase text-white/90 underline decoration-white/20 underline-offset-8">
              {comp.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Toolbox: React.FC = () => {
  const { t } = useLanguage();
  const tools = useMemo(
    () => [
      { name: 'WordPress', mark: 'WP', icon: '/images/icons8-wordpress-240.png' },
      { name: 'Elementor', mark: 'E', icon: '' },
      { name: 'Canva', mark: 'C', icon: '' },
      { name: 'Figma', mark: 'F', icon: '' },
      { name: 'Adobe Illustrator', mark: 'Ai', icon: '' },
      { name: 'Adobe Dreamweaver', mark: 'Dw', icon: '' },
      { name: 'Stripo', mark: 'S', icon: '' },
      { name: 'Meta Biz', mark: 'M', icon: '' },
      { name: 'LinkedIn', mark: 'in', icon: '/images/icons8-linkedin-240.png' },
      { name: 'TikTok', mark: 'Tk', icon: '/images/icons8-tiktok-240.png' },
      { name: 'Google Analytics', mark: 'GA', icon: '' },
      { name: 'Microsoft Suite', mark: 'MS', icon: '' },
    ],
    []
  );
  const [brokenIcons, setBrokenIcons] = useState<Record<string, boolean>>({});

  return (
    <div className="w-[380px] bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800 tracking-tight">{t.skills.toolsTitle}</h2>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {tools.map((tool, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center p-2 group-hover:scale-110 transition-transform relative overflow-hidden">
              {!brokenIcons[tool.name] && tool.icon.startsWith('/') && (
                <img
                  src={tool.icon}
                  alt={tool.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() => setBrokenIcons((prev) => ({ ...prev, [tool.name]: true }))}
                  className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                />
              )}
              <span
                className={[
                  'absolute inset-0 flex items-center justify-center text-[11px] font-mono font-bold text-gray-700 uppercase tracking-widest transition-opacity',
                  brokenIcons[tool.name] || !tool.icon.startsWith('/') ? 'opacity-100' : 'opacity-0',
                ].join(' ')}
              >
                {tool.mark}
              </span>
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter text-center">{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const StickyNote: React.FC = () => {
  const filePath = 'Yan ZHU_University of Birmingham_International Business_Arabic.pdf';
  const fileName = 'Yan ZHU_University of Birmingham_International Business & Arabic.pdf';
  return (
    <motion.a 
      href={`/images/${encodeURIComponent(filePath)}`}
      download={fileName}
      whileHover={{ scale: 1.05 }}
      className="w-40 h-40 bg-[#fef08a] p-4 shadow-lg flex flex-col items-center justify-center text-center relative group overflow-hidden block -rotate-3"
      style={{
        boxShadow: '0 5px 15px rgba(0,0,0,0.05), inset 0 0 30px rgba(0,0,0,0.02)'
      }}
    >
      {/* Tape effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-8 bg-white/40 backdrop-blur-sm rotate-2 z-20" />
      
      <Download size={32} className="text-[#854d0e] mb-3 group-hover:bounce transition-all" />
      <span className="text-sm font-bold text-[#854d0e] tracking-tight leading-tight">
        Download<br/>CV.pdf
      </span>
      
      {/* Corner fold effect */}
      <div className="absolute bottom-0 right-0 w-6 h-6 bg-black/5 rounded-tl-xl" />
    </motion.a>
  );
};
