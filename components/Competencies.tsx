import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { useLanguage } from '../contexts/LanguageContext';
import { BarChart3, ClipboardCheck, Handshake } from 'lucide-react';
import { Card } from './Card';

export const Competencies: React.FC = () => {
  const { ref, isVisible } = useReveal();
  const { t } = useLanguage();

  const ICONS = [
    <ClipboardCheck size={32} />,
    <BarChart3 size={32} />,
    <Handshake size={32} />
  ];

  return (
    <section id="competencies" className="py-24 px-6 max-w-7xl mx-auto md:snap-start">
      <div 
        ref={ref}
        className={`transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-text-dark uppercase tracking-tight">{t.competencies.title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.competencies.items.map((comp, idx) => {
            return (
              <Card 
                key={idx} 
                depth={1}
                className="p-10 hover:shadow-xl hover:shadow-[#8E6BBF]/10 transition-all duration-500 group flex flex-col bg-white border border-gray-100 hover:border-[#8E6BBF]/30 rounded-xl"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div 
                  className="w-16 h-16 flex items-center justify-center mb-8 border border-[#8E6BBF]/20 bg-[#8E6BBF]/5 text-[#8E6BBF] group-hover:bg-[#8E6BBF] group-hover:text-white transition-all duration-500 rounded-2xl"
                >
                  {ICONS[idx]}
                </div>
                
                <h3 className="text-2xl font-bold mb-6 text-text-dark group-hover:text-[#8E6BBF] transition-colors">{comp.title}</h3>
                
                <ul className="space-y-4 flex-1">
                  {comp.list.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3 text-gray-500 text-base group-hover:text-gray-700 transition-colors">
                      <span 
                        className="mt-2 w-1.5 h-1.5 bg-[#f5b002] shrink-0 transition-colors" 
                      />
                      <span className="leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};