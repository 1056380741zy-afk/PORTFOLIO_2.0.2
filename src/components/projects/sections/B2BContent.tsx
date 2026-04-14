import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { EXHIBITIONS } from '../../../constants';
import { ExhibitionPerformance } from '../../shared/ExhibitionPerformance';
import { Card } from '../../shared/Card';
import { MetricItem } from '../MetricItem';
import { StrategicBlock, StrategicItem } from '../StrategicBlock';
import { ExhibitionGridCard } from '../ExhibitionGridCard';
import { DigitalMatrixItem } from '../DigitalMatrixItem';
import { ProjectCaseCard } from '../ProjectCaseCard';

// ─── Category Line (editorial text link) ────────────────────────────────
interface CategoryLineProps {
  label: string;
  sublabel: string;
  onClick: () => void;
}

export const CategoryLine: React.FC<CategoryLineProps> = ({ label, sublabel, onClick }) => (
  <motion.button
    onClick={onClick}
    className="w-full group cursor-pointer py-7 border-b border-[#2d2d2d]/10 flex items-center justify-between text-left"
    whileHover={{ x: 6 }}
    transition={{ duration: 0.2, ease: 'easeOut' }}
  >
    <div>
      <div className="text-2xl md:text-3xl font-bold text-text-dark group-hover:text-[#8e6bbf] transition-colors duration-300 tracking-tight">
        {label}
      </div>
      <div className="text-sm text-[#2d2d2d]/35 group-hover:text-[#8e6bbf]/50 mt-1.5 font-mono tracking-wide transition-colors duration-300">
        {sublabel}
      </div>
    </div>
    <ArrowRight className="w-5 h-5 text-[#2d2d2d]/20 group-hover:text-[#8e6bbf] group-hover:translate-x-1.5 transition-all duration-300 flex-none ml-8 shrink-0" />
  </motion.button>
);

// ─── Section Divider Line ──────────────────────────────────────────────────
export const SectionDividerLine: React.FC<{ label: string; sublabel?: string }> = ({ label, sublabel }) => (
  <div className="flex items-center gap-4 mb-10">
    <div className="flex-1 h-px bg-[#2d2d2d]/10" />
    <div className="text-center px-2">
      <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2d2d2d]/35 whitespace-nowrap">
        {label}
      </div>
      {sublabel && (
        <div className="text-[9px] text-[#2d2d2d]/22 mt-0.5 tracking-wider">{sublabel}</div>
      )}
    </div>
    <div className="flex-1 h-px bg-[#2d2d2d]/10" />
  </div>
);

// ─── B2B Content ──────────────────────────────────────────────────────────────
export const B2BContent: React.FC = () => {
  const { t } = useLanguage();
  const [videoPoster, setVideoPoster] = React.useState<string | undefined>(undefined);
  const videoContainerRef = React.useRef<HTMLDivElement | null>(null);
  const hasCapturedRef = React.useRef(false);

  React.useEffect(() => {
    if (hasCapturedRef.current) return;
    const el = videoContainerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(async (entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting && !hasCapturedRef.current) {
        hasCapturedRef.current = true;
        try {
          const tempVideo = document.createElement('video');
          tempVideo.preload = 'metadata';
          tempVideo.src = '/images/freecompress-demo.mp4';
          tempVideo.muted = true;
          await tempVideo.play().catch(() => undefined);
          tempVideo.pause();
          tempVideo.currentTime = 0.01;
          await new Promise((res) => {
            const handler = () => {
              tempVideo.removeEventListener('seeked', handler);
              res(undefined);
            };
            tempVideo.addEventListener('seeked', handler);
          });
          const canvas = document.createElement('canvas');
          canvas.width = tempVideo.videoWidth || 1280;
          canvas.height = tempVideo.videoHeight || 720;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
            setVideoPoster(dataUrl);
          }
          tempVideo.src = '';
        } catch {
          // ignore capture errors and keep default poster behavior
        } finally {
          io.disconnect();
        }
      }
    }, { rootMargin: '0px 0px 200px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="flex flex-col gap-20">

      {/* Sub-section 1: International Exhibition Campaigns */}
      <div>
        <SectionDividerLine
          label={t.projects.exhibitionTitle.split(':')[0]}
          sublabel={t.projects.exhibitionTitle.split(':')[1]?.trim()}
        />

        <div className="flex flex-col gap-12">

          {/* Channel Strategy */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 rounded-full bg-[#f7f6f3] flex items-center justify-center border border-[#2d2d2d]/5 shadow-sm text-lg">📧</span>
              <h5 className="font-bold text-text-dark text-xl tracking-wide">{t.projects.channelStrategy}</h5>
            </div>

            <div className="flex flex-col gap-8 pl-0 md:pl-4 border-l-0 md:border-l-2 md:border-[#2d2d2d]/5 md:ml-5">

              {/* Case 1: EDM Optimization */}
              <ProjectCaseCard
                title={t.projects.case1.title}
                tag={t.projects.case1.tag}
                icon="📈"
                imageSrc="/images/freecompress-EDM.pdf"
                imageTitle="eDM Design PDF"
                imageDesc={t.projects.case1.desc}
              >
                <Card depth={2} className="p-6 flex-1 hover:bg-white transition-colors">
                  <StrategicBlock icon="🎯" title={t.projects.case1.taskTitle} description={t.projects.case1.taskDesc}>
                    <StrategicItem label="Pain Point" text={t.projects.case1.painPoint} />
                    <StrategicItem label="Limitation" text={t.projects.case1.limitation} />
                  </StrategicBlock>
                </Card>

                <Card depth={2} className="p-6 flex-1 hover:bg-white transition-colors">
                  <StrategicBlock icon="⚡" title={t.projects.case1.actionTitle} description={t.projects.case1.actionDesc}>
                    <StrategicItem text={t.projects.case1.action1} type="tag" />
                    <StrategicItem text={t.projects.case1.action2} type="tag" />
                    <StrategicItem text={t.projects.case1.action3} type="tag" />
                  </StrategicBlock>
                </Card>

                <Card depth={2} className="p-6 flex-1 hover:bg-white transition-colors">
                  <h5 className="font-bold text-text-dark mb-4 flex items-center gap-2 text-sm tracking-wide">
                    <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-[#2d2d2d]/5">🏆</span>
                    {t.projects.case1.resultTitle}
                  </h5>
                  <div className="grid grid-cols-3 gap-2 mb-5 border-b border-[#2d2d2d]/5 pb-5">
                    <MetricItem label={t.projects.case1.metrics?.deliver.label} value={t.projects.case1.metrics?.deliver.value} avg={t.projects.case1.metrics?.deliver.avg} status={t.projects.case1.metrics?.deliver.status} tooltip={t.projects.case1.metrics?.deliver.tooltip} />
                    <MetricItem label={t.projects.case1.metrics?.open.label} value={t.projects.case1.metrics?.open.value} avg={t.projects.case1.metrics?.open.avg} delta={t.projects.case1.metrics?.open.delta} isInteractive />
                    <MetricItem label={t.projects.case1.metrics?.ctr.label} value={t.projects.case1.metrics?.ctr.value} avg={t.projects.case1.metrics?.ctr.avg} delta={t.projects.case1.metrics?.ctr.delta} isInteractive />
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.projects.case1.impact }} />
                </Card>
              </ProjectCaseCard>

              {/* Case 2: EDM Localization */}
              <div className="pt-8 border-t border-[#2d2d2d]/5 border-dashed">
                <ProjectCaseCard
                  title={t.projects.case2.title}
                  tag={t.projects.case2.tag}
                  icon="🌍"
                  imageSrc="/images/Landing Page_1420x4000.pdf"
                  imageTitle="Landing Page Localization PDF"
                  imageDesc={t.projects.case2.desc}
                >
                  <Card depth={2} className="p-6 flex-1 hover:bg-white transition-colors">
                    <StrategicBlock icon="🎯" title={t.projects.case2.taskTitle} description={t.projects.case2.taskDesc}>
                      <StrategicItem label="Difficulty" text={t.projects.case2.difficulty} />
                      <StrategicItem label="Requirement" text={t.projects.case2.req} />
                    </StrategicBlock>
                  </Card>

                  <Card depth={2} className="p-6 flex-1 hover:bg-white transition-colors">
                    <StrategicBlock icon="⚡" title={t.projects.case2.actionTitle} description={t.projects.case2.actionDesc}>
                      <StrategicItem text={t.projects.case2.action1} type="tag" />
                      <StrategicItem text={t.projects.case2.action2} type="tag" />
                    </StrategicBlock>
                  </Card>

                  <Card depth={2} className="p-6 flex-1 hover:bg-white transition-colors">
                    <h5 className="font-bold text-text-dark mb-4 flex items-center gap-2 text-sm tracking-wide">
                      <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-[#2d2d2d]/5">🏆</span>
                      {t.projects.case2.resultTitle}
                    </h5>
                    <p className="text-sm font-bold text-text-dark mb-2 leading-snug">{t.projects.case2.impactTitle}</p>
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
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-[#f7f6f3] flex items-center justify-center border border-[#2d2d2d]/5 shadow-sm text-lg">📣</span>
                <h5 className="font-bold text-text-dark text-xl tracking-wide">{t.projects.digitalMatrix.title}</h5>
              </div>
              <p className="text-gray-400 text-sm md:text-base italic font-medium mt-1 ml-[3.25rem]">
                {t.projects.digitalMatrix.subtitle}
              </p>
            </div>

            <div className="pl-0 md:pl-5 border-l-0 md:border-l-2 md:border-[#2d2d2d]/5 md:ml-5">
              <Card depth={2} className="w-full p-4 relative group mb-10" ref={videoContainerRef}>
                <div className="absolute top-4 right-4 bg-[#2d2d2d]/60 text-white px-3 py-1 rounded-full text-[10px] font-bold backdrop-blur-sm z-10">
                  {t.projects.digitalMatrix.featuredVideo}
                </div>
                <div className="w-full aspect-video bg-[#2d2d2d] rounded-xl overflow-hidden shadow-sm relative">
                  <video controls preload="none" className="w-full h-full object-cover" poster={videoPoster}>
                    <source src="/images/freecompress-demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </Card>

              <div className="flex flex-col items-center justify-center py-6 mb-8">
                <p className="text-text-dark italic text-lg font-medium text-center mb-6">
                  {t.projects.digitalMatrix.adsSubheader}
                </p>
                <div className="flex items-center justify-center gap-8 md:gap-12">
                  {[
                    { src: '/images/icons8-facebook-240.png', alt: 'Facebook' },
                    { src: '/images/icons8-whatsapp-240.png', alt: 'WhatsApp' },
                    { src: '/images/icons8-linkedin-240.png', alt: 'LinkedIn' },
                    { src: '/images/icons8-tiktok-240.png', alt: 'TikTok' },
                    { src: '/images/icons8-wordpress-240.png', alt: 'WordPress' },
                  ].map(({ src, alt }) => (
                    <div key={alt} className="group flex flex-col items-center gap-2 hover:-translate-y-1 transition-transform duration-300">
                      <img src={src} alt={alt} className="w-10 h-10 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="flex flex-col gap-6">
                  <DigitalMatrixItem src="/images/KV%20Banner.png" alt="KV Banner" className="aspect-[2700/1478]" />
                  <DigitalMatrixItem src="/images/AD-Square.gif" alt="AD Square" className="aspect-[1438/1198]" />
                  {[1, 2, 3, 4].map((num) => (
                    <DigitalMatrixItem key={num} src={`/images/Countdown%20Banner-${num}.gif`} alt={`Countdown Banner ${num}`} className="aspect-[1536/400]" />
                  ))}
                </div>
                <div className="flex flex-col gap-6">
                  <DigitalMatrixItem src="/images/MKT%20Banner.png" alt="MKT Banner" className="aspect-[1584/396]" />
                  <DigitalMatrixItem src="/images/AD-Horizon.gif" alt="AD Horizon" className="aspect-[728/91]" />
                  <DigitalMatrixItem src="/images/AD-Vertical.png" alt="AD Vertical" className="aspect-[628/1200]" />
                </div>
              </div>
            </div>
          </div>

          {/* Exhibition Performance Analysis */}
          <div>
            <ExhibitionPerformance />
          </div>

        </div>
      </div>

      {/* Sub-section 2: Regional Market Activation */}
      <div>
        <SectionDividerLine label={t.projects.activationTitle} />

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
      </div>

    </div>
  );
};
