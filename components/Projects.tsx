import React from 'react';
import { WEB3_PROJECTS, EXHIBITIONS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { ExhibitionPerformance } from './ExhibitionPerformance';
import { Web3Strategy } from './Web3Strategy';
import { useReveal } from '../hooks/useReveal';
import { Card } from './Card';
import { MetricItem } from './projects/MetricItem';
import { StrategicBlock, StrategicItem } from './projects/StrategicBlock';
import { ExhibitionGridCard } from './projects/ExhibitionGridCard';
import { DigitalMatrixItem } from './projects/DigitalMatrixItem';
import { ProjectCaseCard } from './projects/ProjectCaseCard';



export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useReveal();

  return (
    <section id="projects" className="py-20 px-6 max-w-7xl mx-auto md:snap-start">
      <div 
        ref={ref}
        className={`transition-all duration-1000 transform opacity-100 translate-y-0`}
      >
        <h2 className="text-3xl font-bold mb-16 text-text-dark uppercase">{t.projects.title}</h2>

        <Web3Strategy />

        {/* Part B: Global B2B Campaigns (Vertical Blocks) */}
        <div>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-[2px] bg-text-dark" />
            <h3 className="text-xl md:text-2xl font-bold tracking-wide text-text-dark">
              {t.projects.b2bTitle}
            </h3>
          </div>

          <Card depth={1} className="p-8 mb-8">
            <div className="mb-8">
              <h4 className="text-xl font-bold text-text-dark tracking-wide border-b border-[#2d2d2d]/5 pb-2 inline-block">
                {t.projects.exhibitionTitle}
              </h4>
            </div>

            <div className="flex flex-col gap-12">
              
              {/* Channel Strategy Wrapper */}
              <div>
                {/* Unified Channel Strategy Header */}
                <div className="flex items-center gap-3 mb-6">
                   <span className="w-10 h-10 rounded-full bg-[#f7f6f3] flex items-center justify-center border border-[#2d2d2d]/5 text-accent-purple shadow-sm text-lg">📧</span>
                   <h5 className="font-bold text-text-dark text-xl tracking-wide">{t.projects.channelStrategy}</h5>
                </div>

                <div className="flex flex-col gap-8 pl-0 md:pl-4 border-l-0 md:border-l-2 md:border-[#2d2d2d]/5 md:ml-5 transition-all">
                  
                  {/* Split Layout for CASE 1: EDM Optimization */}
                  <ProjectCaseCard
                    title={t.projects.case1.title}
                    tag={t.projects.case1.tag}
                    icon="📈"
                    imageSrc="/images/freecompress-EDM.pdf"
                    imageTitle="eDM Design PDF"
                    imageDesc={t.projects.case1.desc}
                  >
                      {/* Block 1: Task / Challenge */}
                      <Card depth={2} className="p-6 flex-1 hover:bg-white transition-colors">
                         <StrategicBlock 
                           icon="🎯" 
                           title={t.projects.case1.taskTitle} 
                           description={t.projects.case1.taskDesc}
                         >
                           <StrategicItem label="Pain Point" text={t.projects.case1.painPoint} />
                           <StrategicItem label="Limitation" text={t.projects.case1.limitation} />
                         </StrategicBlock>
                      </Card>

                      {/* Block 2: Action / Strategy */}
                      <Card depth={2} className="p-6 flex-1 hover:bg-white transition-colors">
                         <StrategicBlock 
                           icon="⚡" 
                           title={t.projects.case1.actionTitle} 
                           description={t.projects.case1.actionDesc}
                         >
                           <StrategicItem text={t.projects.case1.action1} type="tag" />
                           <StrategicItem text={t.projects.case1.action2} type="tag" />
                           <StrategicItem text={t.projects.case1.action3} type="tag" />
                         </StrategicBlock>
                      </Card>

                      {/* Block 3: Result / Effect (UPDATED) */}
                      <Card depth={2} className="p-6 flex-1 hover:bg-white transition-colors">
                         <h5 className="font-bold text-text-dark mb-4 flex items-center gap-2 text-sm tracking-wide">
                           <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-[#2d2d2d]/5 text-accent-purple">🏆</span>
                           {t.projects.case1.resultTitle}
                         </h5>
                         
                         <div className="grid grid-cols-3 gap-2 mb-5 border-b border-[#2d2d2d]/5 pb-5">
                            <MetricItem 
                              label={t.projects.case1.metrics?.deliver.label}
                              value={t.projects.case1.metrics?.deliver.value}
                              avg={t.projects.case1.metrics?.deliver.avg}
                              status={t.projects.case1.metrics?.deliver.status}
                              tooltip={t.projects.case1.metrics?.deliver.tooltip}
                            />
                            <MetricItem 
                              label={t.projects.case1.metrics?.open.label}
                              value={t.projects.case1.metrics?.open.value}
                              avg={t.projects.case1.metrics?.open.avg}
                              delta={t.projects.case1.metrics?.open.delta}
                              isInteractive
                            />
                            <MetricItem 
                              label={t.projects.case1.metrics?.ctr.label}
                              value={t.projects.case1.metrics?.ctr.value}
                              avg={t.projects.case1.metrics?.ctr.avg}
                              delta={t.projects.case1.metrics?.ctr.delta}
                              isInteractive
                            />
                         </div>

                         <p className="text-xs text-gray-500 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.projects.case1.impact }} />
                      </Card>
                  </ProjectCaseCard>

                  {/* Split Layout for CASE 2: EDM Localization */}
                  <div className="pt-8 border-t border-[#2d2d2d]/5 border-dashed">
                    <ProjectCaseCard
                      title={t.projects.case2.title}
                      tag={t.projects.case2.tag}
                      icon="🌍"
                      imageSrc="/images/Landing Page_1420x4000.pdf"
                      imageTitle="Landing Page Localization PDF"
                      imageDesc={t.projects.case2.desc}
                    >
                       {/* Block 1: Task / Challenge */}
                       <Card depth={2} className="p-6 flex-1 hover:bg-white transition-colors">
                          <StrategicBlock 
                            icon="🎯" 
                            title={t.projects.case2.taskTitle} 
                            description={t.projects.case2.taskDesc}
                          >
                            <StrategicItem label="Difficulty" text={t.projects.case2.difficulty} />
                            <StrategicItem label="Requirement" text={t.projects.case2.req} />
                          </StrategicBlock>
                       </Card>

                       {/* Block 2: Action / Strategy */}
                       <Card depth={2} className="p-6 flex-1 hover:bg-white transition-colors">
                          <StrategicBlock 
                            icon="⚡" 
                            title={t.projects.case2.actionTitle} 
                            description={t.projects.case2.actionDesc}
                          >
                            <StrategicItem text={t.projects.case2.action1} type="tag" />
                            <StrategicItem text={t.projects.case2.action2} type="tag" />
                          </StrategicBlock>
                       </Card>

                       {/* Block 3: Result / Effect */}
                       <Card depth={2} className="p-6 flex-1 hover:bg-white transition-colors">
                          <h5 className="font-bold text-text-dark mb-4 flex items-center gap-2 text-sm tracking-wide">
                            <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-[#2d2d2d]/5 text-accent-purple">🏆</span>
                            {t.projects.case2.resultTitle}
                          </h5>
                          
                          <p className="text-sm font-bold text-text-dark mb-2 leading-snug">
                            {t.projects.case2.impactTitle}
                          </p>

                          <div className="space-y-3">
                             <StrategicItem label="MENA Market Coverage" text={t.projects.case2.impact1} type="tag" />
                             <StrategicItem label="WA Channel Activation" text={t.projects.case2.impact2} type="tag" />
                          </div>
                       </Card>
                    </ProjectCaseCard>
                  </div>
                </div>
              </div>

              {/* Digital & Social Matrix */}
              <div className="pt-8">
                 <div className="mb-6">
                    <div className="flex items-center gap-3">
                       <span className="w-10 h-10 rounded-full bg-[#f7f6f3] flex items-center justify-center border border-[#2d2d2d]/5 text-[#8e6bbf] shadow-sm text-lg">📣</span>
                       <h5 className="font-bold text-text-dark text-xl tracking-wide">{t.projects.digitalMatrix.title}</h5>
                    </div>
                    <p className="text-gray-400 text-sm md:text-base italic font-medium mt-1 ml-[3.25rem]">
                      {t.projects.digitalMatrix.subtitle}
                    </p>
                 </div>

                 <div className="pl-0 md:pl-5 border-l-0 md:border-l-2 md:border-[#2d2d2d]/5 md:ml-5">
                    
                    {/* Top Block: Featured Video (Full Width) */}
                    <Card depth={2} className="w-full p-4 relative group mb-10">
                       <div className="absolute top-4 right-4 bg-[#2d2d2d]/60 text-white px-3 py-1 rounded-full text-[10px] font-bold backdrop-blur-sm z-10">
                          {t.projects.digitalMatrix.featuredVideo}
                       </div>
                       <div className="w-full aspect-video bg-[#2d2d2d] rounded-xl overflow-hidden shadow-sm relative">
                          <video 
                             src="/images/freecompress-demo.mp4" 
                             controls 
                             className="w-full h-full object-cover"
                          />
                       </div>
                    </Card>

                    {/* Subheader Block: Text & Icons */}
                    <div className="flex flex-col items-center justify-center py-6 mb-8">
                        <p className="text-text-dark italic text-lg font-medium text-center mb-6">
                           {t.projects.digitalMatrix.adsSubheader}
                        </p>
                        <div className="flex items-center justify-center gap-8 md:gap-12">
                             <div className="group flex flex-col items-center gap-2 hover:-translate-y-1 transition-transform duration-300">
                               <img src="/images/icons8-facebook-240.png" alt="Facebook" className="w-10 h-10 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                             </div>
                             <div className="group flex flex-col items-center gap-2 hover:-translate-y-1 transition-transform duration-300">
                               <img src="/images/icons8-whatsapp-240.png" alt="WhatsApp" className="w-10 h-10 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                             </div>
                             <div className="group flex flex-col items-center gap-2 hover:-translate-y-1 transition-transform duration-300">
                               <img src="/images/icons8-linkedin-240.png" alt="LinkedIn" className="w-10 h-10 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                             </div>
                             <div className="group flex flex-col items-center gap-2 hover:-translate-y-1 transition-transform duration-300">
                               <img src="/images/icons8-tiktok-240.png" alt="TikTok" className="w-10 h-10 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                             </div>
                             <div className="group flex flex-col items-center gap-2 hover:-translate-y-1 transition-transform duration-300">
                               <img src="/images/icons8-wordpress-240.png" alt="WordPress" className="w-10 h-10 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                             </div>
                        </div>
                    </div>

                    {/* Grid Container (2 Columns) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        {/* Column 1 (Left): 6 vertical placeholders */}
                        <div className="flex flex-col gap-6">
                            <DigitalMatrixItem src="/images/KV%20Banner.png" alt="KV Banner" className="aspect-[2700/1478]" />
                            <DigitalMatrixItem src="/images/AD-Square.gif" alt="AD Square" className="aspect-[1438/1198]" />
                            {[1, 2, 3, 4].map((num) => (
                                <DigitalMatrixItem key={num} src={`/images/Countdown%20Banner-${num}.gif`} alt={`Countdown Banner ${num}`} className="aspect-[1536/400]" />
                            ))}
                        </div>

                        {/* Column 2 (Right): 3 vertical placeholders */}
                        <div className="flex flex-col gap-6">
                            <DigitalMatrixItem src="/images/MKT%20Banner.png" alt="MKT Banner" className="aspect-[1584/396]" />
                            <DigitalMatrixItem src="/images/AD-Horizon.gif" alt="AD Horizon" className="aspect-[728/91]" />
                            <DigitalMatrixItem src="/images/AD-Vertical.png" alt="AD Vertical" className="aspect-[628/1200]" />
                        </div>
                    </div>

                 </div>
              </div>

              {/* Exhibition Performance Analysis */}
              <div className="pt-8">
                 <ExhibitionPerformance />
              </div>

            </div>
          </Card>
          

          {/* Regional Market Activation (Grid) */}
          <Card depth={1} className="p-8 mb-8">
            <div className="mb-8">
              <h4 className="text-xl font-bold text-text-dark tracking-wide border-b border-[#2d2d2d]/5 pb-2 inline-block">
                {t.projects.activationTitle}
              </h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {EXHIBITIONS.map((exhibition, idx) => {
                  const exKey = `e${idx + 1}` as keyof typeof t.projects.exhibitions;
                  const data = t.projects.exhibitions[exKey] as any;
                  if (!data) return null;

                  return (
                    <ExhibitionGridCard 
                      key={exhibition.id}
                      image={exhibition.image}
                      name={data.name}
                      org={data.org}
                      languages={data.languages}
                      roles={data.roles}
                      langLabel={t.projects.activation.lang}
                      roleLabel={t.projects.activation.role}
                      fit={exhibition.fit as any}
                      padding={(exhibition as any).padding}
                    />
                  );
               })}
            </div>
          </Card>

        </div>
      </div>
    </section>
  );
};