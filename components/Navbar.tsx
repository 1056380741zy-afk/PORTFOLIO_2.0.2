import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    // Intersection Observer for scroll spy
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        // Trigger when the element is in the middle of the viewport
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
      }
    );

    const sections = ['home', 'competencies', 'journey', 'projects', 'skills', 'contact'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'competencies', label: t.nav.competencies },
    { id: 'journey', label: t.nav.journey },
    { id: 'projects', label: t.nav.projects },
    { id: 'skills', label: t.nav.skills },
    { id: 'contact', label: t.nav.contact },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'cn' : 'en');
  };

  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-4 bg-base-bg/90 backdrop-blur-md border-b border-[#2d2d2d]/5">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div 
          className="font-bold text-xl text-text-dark tracking-tight cursor-pointer hover:text-[#8E6BBF] transition-colors" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Yan Zhu
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`hover:text-[#8E6BBF] transition-colors relative pb-1 ${
                  activeSection === item.id ? 'text-text-dark' : ''
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#8E6BBF] rounded-full animate-fade-in" />
                )}
              </button>
            ))}
          </div>
          
          <div className="h-6 w-px bg-[#2d2d2d]/5 hidden md:block" />

          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-[#8E6BBF] transition-colors px-3 py-1.5 rounded-full hover:bg-base-bg"
          >
            <Globe size={16} />
            <span>{language === 'en' ? 'CN' : 'EN'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};