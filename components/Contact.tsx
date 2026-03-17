import React, { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useLanguage } from '../contexts/LanguageContext';
import { Copy, Check, Mail, ArrowUpRight, Linkedin } from 'lucide-react';

export const Contact: React.FC = () => {
  const { ref, isVisible } = useReveal();
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const email = "zy18964266810@outlook.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-32 px-6 max-w-4xl mx-auto text-center md:snap-start">
      <div 
        ref={ref}
        className={`transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="inline-block px-3 py-1 bg-accent-purple/10 text-accent-purple rounded-full text-sm font-bold uppercase tracking-wider mb-8">
            {t.contact.tag}
        </div>
        
        <h2 className="text-5xl md:text-7xl font-black text-text-dark mb-8 tracking-tight leading-tight">
          {t.contact.titleStart} <span className="text-gray-400 italic">{t.contact.titleEnd}</span>
        </h2>

        <p className="text-xl md:text-2xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
          {t.contact.descStart} <span className="text-text-dark font-bold">{t.contact.descHighlight}</span> {t.contact.descEnd}
        </p>

        <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col md:flex-row gap-4">
                <button 
                    onClick={handleCopy}
                    className="group relative px-8 py-4 bg-[#2d2d2d] text-white rounded-xl font-bold text-lg hover:bg-[#2d2d2d]/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-3 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                    <span className="relative z-10">{copied ? t.contact.btnCopied : t.contact.btnCopy}</span>
                </button>

                <a 
                  href="https://www.linkedin.com/in/ayna-yan-zhu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group px-8 py-4 bg-white border border-[#2d2d2d]/5 text-text-dark rounded-xl font-bold text-lg hover:bg-base-bg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-3"
                >
                  <Linkedin size={20} className="text-[#0077b5] group-hover:scale-110 transition-transform" />
                  <span>LinkedIn</span>
                </a>
            </div>
            
            <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                {t.contact.orEmail}
                <a href={`mailto:${email}`} className="text-text-dark hover:text-accent-purple transition-colors flex items-center gap-1 border-b border-[#2d2d2d]/5 hover:border-accent-purple">
                   {email}
                   <ArrowUpRight size={14} />
                </a>
            </div>
        </div>

      </div>
    </section>
  );
};