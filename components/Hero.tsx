import React, { useEffect, useRef } from 'react';
import { MapPin, Globe, Plane, ArrowRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { useLanguage } from '../contexts/LanguageContext';

export const Hero: React.FC = () => {
  const { ref: revealRef, isVisible } = useReveal();
  const { t } = useLanguage();

  // Refs for Astrolabe Interaction
  const astrolabeRef = useRef<HTMLDivElement>(null);
  const needleRef = useRef<HTMLDivElement>(null);
  const currentAngle = useRef(90);
  const targetAngle = useRef(90);
  const requestRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!astrolabeRef.current) return;
      const rect = astrolabeRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const angleRad = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      targetAngle.current = angleRad * (180 / Math.PI) + 90;
    };

    const smoothAnimate = () => {
      // Shortest path calculation
      let delta = targetAngle.current - currentAngle.current;
      delta = ((delta + 180) % 360 + 360) % 360 - 180;
      
      // Lerp (Damping factor 0.08 for smooth magnetic feel)
      currentAngle.current += delta * 0.08;
      
      if (needleRef.current) {
        needleRef.current.style.transform = `rotate(${currentAngle.current}deg)`;
      }
      
      requestRef.current = requestAnimationFrame(smoothAnimate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(smoothAnimate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      {/* Embedded CSS for Astrolabe specific animations and textures */}
      <style>{`
        @keyframes spinSlowly {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .astrolabe-external-frame {
          position: absolute;
          inset: -60px; 
          border-radius: 50%;
          animation: spinSlowly 200s linear infinite;
          z-index: -1;
        }
        .astrolabe-scale {
          position: absolute;
          inset: -34px; 
          border-radius: 50%;
          background: repeating-conic-gradient(from 0deg, #887966 0deg 0.5deg, transparent 0.5deg 4deg);
          -webkit-mask-image: radial-gradient(circle, transparent 69%, #2d2d2d 70%, #2d2d2d 100%);
          mask-image: radial-gradient(circle, transparent 69%, #2d2d2d 70%, #2d2d2d 100%);
          opacity: 0.4; 
          z-index: 0; 
          animation: spinSlowly 200s linear infinite; 
        }
        .astrolabe-scale::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: repeating-conic-gradient(from 0deg, #887966 0deg 1deg, transparent 1deg 30deg);
          -webkit-mask-image: radial-gradient(circle, transparent 67%, #2d2d2d 68%, #2d2d2d 100%);
          mask-image: radial-gradient(circle, transparent 67%, #2d2d2d 68%, #2d2d2d 100%);
          opacity: 0.8;
        }
      `}</style>

      <section className="pt-32 pb-12 px-6 max-w-7xl mx-auto min-h-[90vh] flex flex-col justify-center overflow-x-hidden">
        <div 
          ref={revealRef}
          className={`relative ${
            isVisible ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-1000`}
        >
          
          <div className="relative z-10 mt-16 md:mt-24 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-12">
            
            {/* ====== LEFT COLUMN: NOTION TYPOGRAPHY ====== */}
            <div className="flex-1 w-full max-w-2xl relative z-20">
              
              {/* Title */}
              <h1 className="text-5xl md:text-8xl font-black text-text-dark tracking-tighter mb-8">
                  Yan Zhu
              </h1>

              {/* Notion Properties Grid */}
              <div className="flex flex-col gap-2 mb-10 max-w-2xl">
                  {/* Property 1 */}
                  <div className="flex items-center gap-4 text-gray-500 py-1 font-mono text-sm border-l-2 border-transparent hover:border-[#f5b002] pl-3 transition-colors duration-300">
                      <div className="w-28 flex items-center gap-2 font-medium shrink-0 uppercase tracking-wider text-xs">
                          <MapPin size={14} className="text-[#8E6BBF]" /> {t.hero.locationLabel}
                      </div>
                      <div className="flex-1">
                          <span className="text-text-dark font-medium">
                              {t.hero.locationValue}
                          </span>
                      </div>
                  </div>
                  {/* Property 2 */}
                  <div className="flex items-center gap-4 text-gray-500 py-1 font-mono text-sm border-l-2 border-transparent hover:border-[#f5b002] pl-3 transition-colors duration-300">
                      <div className="w-28 flex items-center gap-2 font-medium shrink-0 uppercase tracking-wider text-xs">
                          <Globe size={14} className="text-[#8E6BBF]" /> {t.hero.workModeLabel}
                      </div>
                      <div className="flex-1">
                          <span className="text-text-dark font-medium">
                              {t.hero.workModeValue}
                          </span>
                      </div>
                  </div>
                  {/* Property 3 */}
                  <div className="flex items-center gap-4 text-gray-500 py-1 font-mono text-sm border-l-2 border-transparent hover:border-[#f5b002] pl-3 transition-colors duration-300">
                      <div className="w-28 flex items-center gap-2 font-medium shrink-0 uppercase tracking-wider text-xs">
                          <Plane size={14} className="text-[#8E6BBF]" /> {t.hero.statusLabel}
                      </div>
                      <div className="flex-1">
                          <span className="text-text-dark font-medium">
                              {t.hero.statusValue}
                          </span>
                      </div>
                  </div>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-[#2d2d2d]/5 mb-10" />

              {/* Intro Text Block */}
              <div className="max-w-4xl">
                  <h2 className="text-xl md:text-2xl font-bold text-text-dark leading-tight mb-8 whitespace-nowrap overflow-hidden text-ellipsis">
                      {t.hero.title}
                  </h2>
                  
                  <div className="space-y-4 text-lg md:text-xl text-text-dark leading-relaxed mb-10 font-medium">
                      <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-3">
                          <span className="text-gray-400 text-sm uppercase tracking-wider font-mono shrink-0">{t.hero.focusLabel}</span>
                          <span className="px-0 py-0 font-bold text-[#8E6BBF] text-lg">
                              {t.hero.focusValue}
                          </span>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-3">
                          <span className="text-gray-400 text-sm uppercase tracking-wider font-mono shrink-0">{t.hero.specLabel}</span>
                          <span className="px-0 py-0 font-bold text-text-dark text-lg border-b-2 border-[#f5b002]/50">
                              {t.hero.specValue}
                          </span>
                      </div>
                  </div>

                  {/* Notion-style Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                          className="group flex items-center justify-center gap-2 px-8 py-3 bg-[#8E6BBF] text-white rounded-xl font-medium hover:bg-[#7A59AB] transition-all shadow-sm hover:shadow-md"
                      >
                          {t.hero.btnProjects}
                          <ArrowRight size={16} className="text-white/70 group-hover:translate-x-1 transition-transform group-hover:text-white" />
                      </button>
                      <button 
                          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                          className="flex items-center justify-center gap-2 px-8 py-3 bg-transparent border border-gray-300 text-text-dark rounded-xl font-medium hover:border-[#8E6BBF] hover:text-[#8E6BBF] transition-colors"
                      >
                          {t.hero.btnContact}
                      </button>
                  </div>
              </div>
            </div>

            {/* ====== RIGHT COLUMN: CULTURAL ASTROLABE ====== */}
            <div className="flex-1 flex justify-center w-full relative h-[600px] lg:h-[700px]">
              
              <div 
                id="astrolabe" 
                ref={astrolabeRef}
                className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full flex items-center justify-center top-1/2 -translate-y-1/2"
              >
                {/* External Texture Frame & Scale */}
                <div className="astrolabe-external-frame"></div>
                <div className="astrolabe-scale"></div>

                {/* Inner Decorative Rings */}
                <div className="absolute inset-4 rounded-full border border-dashed border-gray-300/40"></div>
                <div className="absolute inset-16 rounded-full border border-gray-200/30"></div>
                <div className="absolute inset-24 rounded-full border border-dashed border-gray-200/30"></div>

                {/* Magnetic Pointer */}
                <div ref={needleRef} className="absolute inset-0 pointer-events-none origin-center">
                  <div className="absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-[#887966]/50 to-transparent -translate-x-1/2"></div>
                  <div className="absolute top-4 left-1/2 w-2 h-2 bg-[#887966] rounded-full -translate-x-1/2 shadow-[0_0_10px_rgba(136,121,102,0.3)]"></div>
                </div>

                {/* Core Interactive Hub */}
                <div className="group absolute w-28 h-28 bg-[#F7F6F3] border border-gray-300/80 rounded-full flex items-center justify-center cursor-crosshair z-20 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
                  
                  {/* SVG Hub: Rub el Hizb + Constellations */}
                  <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
                    {/* Islamic 8-pointed star */}
                    <g stroke="#887966" strokeWidth="1.2" opacity="0.4">
                      <rect x="15" y="15" width="70" height="70" />
                      <rect x="15" y="15" width="70" height="70" transform="rotate(45 50 50)" />
                    </g>
                    
                    {/* Inner Split (China vs MENA) */}
                    <g style={{ transform: 'scale(0.55)', transformOrigin: '50px 50px' }}>
                      {/* Left: China (Ink Black) */}
                      <path d="M50,0 A50,50 0 0,0 50,100 L50,0 Z" fill="#F7F6F3" stroke="#37352F" strokeWidth="2.5" />
                      <circle cx="25" cy="40" r="2.5" fill="#37352F" opacity="0.9"/>
                      <circle cx="30" cy="45" r="1.5" fill="#37352F" opacity="0.7"/>
                      <circle cx="35" cy="42" r="2" fill="#37352F" opacity="0.8"/>
                      <circle cx="28" cy="55" r="1.5" fill="#37352F" opacity="0.6"/>
                      
                      {/* Right: MENA (Desert Gold) */}
                      <path d="M50,0 A50,50 0 0,1 50,100 L50,0 Z" fill="#F7F6F3" stroke="#8E6BBF" strokeWidth="2.5" />
                      <circle cx="70" cy="50" r="2.5" fill="#8E6BBF" opacity="0.9"/>
                      <circle cx="75" cy="55" r="2.5" fill="#8E6BBF" opacity="0.9"/>
                      <circle cx="65" cy="45" r="2.5" fill="#8E6BBF" opacity="0.9"/>
                    </g>
                  </svg>
                  
                  {/* Hover Popups: Trilingual Greetings */}
                  {/* Top: Chinese */}
                  <div className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out delay-75 pointer-events-none whitespace-nowrap">
                    <span className="px-4 py-1.5 rounded-full text-sm font-black tracking-widest bg-white text-[#2d2d2d] border border-gray-200 shadow-md">
                      你好
                    </span>
                  </div>
                  
                  {/* Right: English */}
                  <div className="absolute -right-20 opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-500 ease-out delay-100 pointer-events-none whitespace-nowrap">
                    <span className="px-4 py-1.5 bg-white text-[#8E6BBF] rounded-full text-sm font-black tracking-widest border border-gray-200 shadow-md">
                      HELLO
                    </span>
                  </div>
                  
                  {/* Left: Arabic */}
                  <div className="absolute -left-20 opacity-0 group-hover:opacity-100 group-hover:-translate-x-4 transition-all duration-500 ease-out delay-150 pointer-events-none whitespace-nowrap">
                    <span className="px-4 py-1 text-lg font-bold bg-white text-[#8E6BBF] rounded-full border border-gray-200 shadow-md" dir="rtl" style={{ fontFamily: "'Times New Roman', serif" }}>
                      مرحباً
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
};
