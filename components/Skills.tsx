import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { useLanguage } from '../contexts/LanguageContext';
import { NotionBlock, NotionCallout } from './NotionBlock';
import { Wrench, Globe } from 'lucide-react';

const ToolCard: React.FC<{ name: string; icon: string }> = ({ name, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-surface border border-[#2d2d2d]/10 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group h-40">
      <div className="w-12 h-12 flex items-center justify-center mb-4 transition-all duration-300">
         <img src={icon} alt={name} className="w-full h-full object-contain" />
      </div>
      <span className="font-bold text-text-main text-sm md:text-base text-center leading-tight">{name}</span>
    </div>
  );
};

export const Skills: React.FC = () => {
  const { ref, isVisible } = useReveal();
  const { t } = useLanguage();

  const tools = [
    { name: 'WordPress', icon: 'https://cdn.simpleicons.org/wordpress/21759B' },
    { name: 'Elementor', icon: 'https://cdn.simpleicons.org/elementor/92003B' },
    { name: 'Canva', icon: 'https://brandlogovector.com/wp-content/uploads/2022/02/Canva-Icon-Logo.png' },
    { name: 'Figma', icon: 'https://cdn.simpleicons.org/figma/F24E1E' },
    { name: 'Adobe Illustrator', icon: 'https://brandlogovector.com/wp-content/uploads/2021/07/Adobe-Illustrator-Logo.png' },
    { name: 'Adobe Dreamweaver', icon: 'https://brandlogovector.com/wp-content/uploads/2021/07/Adobe-Dreamweaver-Logo.png' },
    { name: 'Stripo', icon: 'https://statusfield.com/logos/stripo.png' },
    { name: 'Meta Biz', icon: 'https://cdn.simpleicons.org/meta/0668E1' },
    { name: 'LinkedIn', icon: 'https://www.vectorlogo.zone/logos/linkedin/linkedin-icon.svg' },
    { name: 'TikTok', icon: 'https://cdn.simpleicons.org/tiktok/000000' },
    { name: 'Google Analytics', icon: 'https://cdn.simpleicons.org/googleanalytics/E37400' },
    { name: 'Microsoft Suite', icon: 'https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg' },
  ];

  return (
    <section id="skills" className="py-20 px-6 max-w-6xl mx-auto md:snap-start">
      <div 
        ref={ref}
        className={`transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="mb-12">
            <h1 className="text-3xl font-bold text-text-main uppercase mb-8">
                {t.skills.title}
            </h1>
            
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface border border-[#2d2d2d]/10 flex items-center justify-center text-text-main">
                   <Wrench size={20} />
                </div>
                <h2 className="text-xl font-bold text-text-main">
                    {t.skills.toolsTitle}
                </h2>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {tools.map((tool, idx) => (
             <ToolCard key={idx} {...tool} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
             {/* Languages */}
             <NotionBlock title={t.skills.languagesTitle} icon={<Globe size={20} />} className="h-full !mb-0">
                 <div className="space-y-3 mt-2">
                    {t.skills.languages.map((lang, idx) => (
                        <div key={idx} className="flex justify-between items-center border-b border-[#2d2d2d]/5 last:border-0 pb-2 last:pb-0">
                            <span className="font-medium text-text-main">{lang.language}</span>
                            <span 
                                className="text-xs px-2 py-1 rounded font-bold" 
                                style={{ 
                                    color: (lang as any).color,
                                    backgroundColor: `${(lang as any).color}1A` 
                                }}
                            >
                                {lang.level}
                            </span>
                        </div>
                    ))}
                 </div>
             </NotionBlock>

             {/* Regional Expertise */}
             <div className="h-full">
                <NotionBlock 
                    title={t.skills.regionalTitle} 
                    icon={<Globe className="text-[#2d2d2d]" size={20} />} 
                    className="h-full !mb-0"
                >
                    <p className="text-sm mb-4 leading-relaxed font-medium" style={{ color: '#2d2d2d' }} dangerouslySetInnerHTML={{ __html: t.skills.regionalDesc }} />
                    <div className="flex gap-2 flex-wrap">
                        {t.skills.regionalTags.map(tag => (
                            <span key={tag} className="text-xs font-bold px-2 py-1 rounded bg-brand-blue/10 text-brand-blue">
                                {tag}
                            </span>
                        ))}
                    </div>
                </NotionBlock>
             </div>
        </div>

      </div>
    </section>
  );
};
