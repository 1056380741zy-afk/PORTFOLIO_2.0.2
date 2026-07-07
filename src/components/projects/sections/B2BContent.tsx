import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, Target, UsersRound } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
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
      <div className="text-2xl md:text-3xl font-bold text-text-dark group-hover:text-[#9f8fdb] transition-colors duration-300 tracking-tight">
        {label}
      </div>
      <div className="text-sm text-[#2d2d2d]/35 group-hover:text-[#9f8fdb]/50 mt-1.5 font-mono tracking-wide transition-colors duration-300">
        {sublabel}
      </div>
    </div>
    <ArrowRight className="w-5 h-5 text-[#2d2d2d]/20 group-hover:text-[#9f8fdb] group-hover:translate-x-1.5 transition-all duration-300 flex-none ml-8 shrink-0" />
  </motion.button>
);

const projectCardSurface = '!bg-white transition-shadow duration-300 hover:shadow-[0_14px_30px_rgba(90,70,45,0.12)]';

// ─── Section Divider Line ──────────────────────────────────────────────────
export const SectionDividerLine: React.FC<{ label: string; sublabel?: string; className?: string }> = ({ label, sublabel, className = '' }) => (
  <div className={`mt-[15px] mb-[30px] flex items-center gap-4 ${className}`}>
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

type B2BSection = 'exhibition' | 'activation' | null;

interface B2BContentProps {
  initialSection?: B2BSection;
}

interface ActivationPreviewMetric {
  icon: LucideIcon;
  label: string;
  value: string;
}

interface ActivationPreviewCase {
  number: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  languages: string[];
  roles: string[];
  image: string;
  imageMode?: 'cover' | 'contain';
  metrics: ActivationPreviewMetric[];
}

const activationPreviewCases: ActivationPreviewCase[] = [
  {
    number: 'Project 01',
    category: 'Academic',
    title: '12th AIB-MENA Conference 2024',
    description:
      'Supported the University of Birmingham (Dubai Campus) in delivering a two-day academic conference fostering global business research and collaboration.',
    tags: ['University', 'Conference'],
    languages: ['English', 'Chinese'],
    roles: ['Event Support', 'On-site Operations'],
    image: '/images/aib-mena-Header-Logo.png',
    imageMode: 'contain',
    metrics: [
      { icon: UsersRound, label: 'Scale', value: '130+ delegates\nfrom 31 countries' },
      { icon: CalendarDays, label: 'Coordination Scope', value: 'Registration, venue setup,\nagenda flow' },
      { icon: Target, label: 'Focus', value: 'Academic conference\noperations' },
    ],
  },
  {
    number: 'Project 02',
    category: 'Government',
    title: 'Encounter among Blossoms – The Elegant Gathering of the Song Dynasty',
    description:
      'Coordinated a high-level cultural event hosted by the Consulate General of China in Dubai, celebrating heritage and strengthening bilateral ties.',
    tags: ['Cultural', 'Diplomatic Event'],
    languages: ['Chinese', 'English', 'Arabic'],
    roles: ['Event Support', 'Language Support', 'On-site Operations'],
    image: '/images/Consulate%20General%20of%20China%20in%20Dubai.jpg',
    imageMode: 'cover',
    metrics: [
      { icon: UsersRound, label: 'Scale', value: '150+ international\nguests' },
      { icon: CalendarDays, label: 'Coordination Scope', value: 'Guest communication, venue\narrangement' },
      { icon: Target, label: 'Focus', value: 'Government cultural event\nsupport' },
    ],
  },
  {
    number: 'Project 03',
    category: 'Technological',
    title: 'Global Data Center Facility Summit 2025 (Dubai)',
    description:
      'Supported Huawei in organizing a global summit that brought together technology leaders to explore the future of data centers and digital infrastructure.',
    tags: ['Summit', 'Digital Infrastructure'],
    languages: ['English', 'Chinese', 'Arabic'],
    roles: ['Event Support', 'On-site Operations', 'Language Support'],
    image: '/images/Huawei.jpeg',
    imageMode: 'contain',
    metrics: [
      { icon: UsersRound, label: 'Scale', value: '30+ onsite staff' },
      { icon: CalendarDays, label: 'Coordination Scope', value: 'Staff allocation, VIP reception' },
      { icon: Target, label: 'Focus', value: 'Technology forum\noperations' },
    ],
  },
  {
    number: 'Project 04',
    category: 'Industrial',
    title: 'WieTec | WATERTECH CHINA 2024 & 2025',
    description:
      'Coordinated international exhibitions uniting environmental protection and water industry leaders across Asia and beyond, driving business and innovation.',
    tags: ['Exhibition', 'Water Industry'],
    languages: ['Chinese', 'English'],
    roles: ['Event Support', 'Language Support'],
    image: '/images/Banner%202425.png',
    imageMode: 'contain',
    metrics: [
      { icon: UsersRound, label: 'Scale', value: 'Large-scale international\nexhibition platform' },
      { icon: CalendarDays, label: 'Coordination Scope', value: 'Marketing, visitor support,\ngroup coordination' },
      { icon: Target, label: 'Focus', value: 'Industrial exhibition onsite\noperations & VIP reception' },
    ],
  },
];

const activationPreviewCasesCn: ActivationPreviewCase[] = [
  {
    number: '项目 01',
    category: 'Academic',
    title: '第12届 AIB-MENA 会议 2024',
    description:
      '支持伯明翰大学（迪拜校区）举办为期两天的学术会议，促进全球商业研究与合作。',
    tags: ['大学', '会议'],
    languages: ['英语', '中文'],
    roles: ['活动支持', '现场执行'],
    image: '/images/aib-mena-Header-Logo.png',
    imageMode: 'contain',
    metrics: [
      { icon: UsersRound, label: '规模', value: '130+ 参会代表\n来自31个国家' },
      { icon: CalendarDays, label: '协调范围', value: '注册、场地布置、\n议程流程' },
      { icon: Target, label: '重点', value: '学术会议\n现场执行' },
    ],
  },
  {
    number: '项目 02',
    category: 'Government',
    title: '邂逅花间 —— 宋代雅集',
    description:
      '协助中国驻迪拜总领馆举办高规格文化活动，呈现中华文化遗产并促进双边交流。',
    tags: ['文化', '外交活动'],
    languages: ['中文', '英语', '阿语'],
    roles: ['活动支持', '语言支持', '现场执行'],
    image: '/images/Consulate%20General%20of%20China%20in%20Dubai.jpg',
    imageMode: 'cover',
    metrics: [
      { icon: UsersRound, label: '规模', value: '150+ 国际嘉宾' },
      { icon: CalendarDays, label: '协调范围', value: '嘉宾沟通、场地安排' },
      { icon: Target, label: '重点', value: '政府文化活动\n支持' },
    ],
  },
  {
    number: '项目 03',
    category: 'Technological',
    title: '全球数据中心设施峰会 2025（迪拜）',
    description:
      '支持华为组织全球峰会，连接技术领袖，共同探讨数据中心与数字基础设施的未来。',
    tags: ['峰会', '数字基础设施'],
    languages: ['英语', '中文', '阿语'],
    roles: ['活动支持', '现场执行', '语言支持'],
    image: '/images/Huawei.jpeg',
    imageMode: 'contain',
    metrics: [
      { icon: UsersRound, label: '规模', value: '30+ 现场人员' },
      { icon: CalendarDays, label: '协调范围', value: '人员分配、VIP接待' },
      { icon: Target, label: '重点', value: '科技论坛\n执行' },
    ],
  },
  {
    number: '项目 04',
    category: 'Industrial',
    title: 'WieTec | WATERTECH CHINA 2024 & 2025',
    description:
      '协调国际展会执行，连接亚洲及更广市场的环保与水处理行业资源，推动商业合作与创新。',
    tags: ['展会', '水处理行业'],
    languages: ['中文', '英语'],
    roles: ['活动支持', '语言支持'],
    image: '/images/Banner%202425.png',
    imageMode: 'contain',
    metrics: [
      { icon: UsersRound, label: '规模', value: '大型国际\n展会平台' },
      { icon: CalendarDays, label: '协调范围', value: '营销、观众支持、\n团队协调' },
      { icon: Target, label: '重点', value: '工业展会现场执行\n与VIP接待' },
    ],
  },
];

interface ActivationPreviewBoardProps {
  isCn?: boolean;
}

const ActivationPreviewBoard: React.FC<ActivationPreviewBoardProps> = ({ isCn = false }) => {
  const cases = isCn ? activationPreviewCasesCn : activationPreviewCases;
  const languageLabel = isCn ? '语言' : 'Languages';
  const roleLabel = isCn ? '角色' : 'Role';

  return (
    <div id="regional-market-activation" className="activation-preview-board">
      <div className="activation-preview-grid">
        {cases.map((item, index) => (
          <article key={item.number} className="activation-preview-card">
            <div className="activation-preview-category-tab">{item.category}</div>
            <div className="activation-preview-card-main">
              <div
                className={`activation-preview-media activation-preview-media-${item.imageMode ?? 'cover'}`}
                aria-hidden="true"
              >
                <img src={item.image} alt="" loading={index < 2 ? 'eager' : 'lazy'} />
              </div>

              <div className="activation-preview-copy">
                <p className="activation-preview-card-number-detail">{String(index + 1).padStart(2, '0')}</p>
                <h2>{item.title}</h2>
                <p className="activation-preview-description">{item.description}</p>
                <div className="activation-preview-context" aria-label={`${item.title} languages and role`}>
                  <div className="activation-preview-context-row">
                    <span className="activation-preview-context-label">{languageLabel}</span>
                    <div className="activation-preview-context-tags">
                      {item.languages.map((language) => (
                        <span key={language}>{language}</span>
                      ))}
                    </div>
                  </div>
                  <div className="activation-preview-context-row">
                    <span className="activation-preview-context-label">{roleLabel}</span>
                    <div className="activation-preview-context-tags">
                      {item.roles.map((role) => (
                        <span key={role}>{role}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="activation-preview-metrics">
              {item.metrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div key={metric.label} className="activation-preview-metric">
                    <Icon size={25} strokeWidth={1.55} />
                    <div>
                      <span>{metric.label}</span>
                      <strong>{metric.value}</strong>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

// ─── B2B Content ──────────────────────────────────────────────────────────────
export const B2BContent: React.FC<B2BContentProps> = ({ initialSection = null }) => {
  const { t, language } = useLanguage();
  const [videoPoster, setVideoPoster] = React.useState<string | undefined>(undefined);
  const videoContainerRef = React.useRef<HTMLDivElement | null>(null);
  const hasCapturedRef = React.useRef(false);

  React.useEffect(() => {
    if (!initialSection) return;

    const targetId =
      initialSection === 'activation'
        ? 'regional-market-activation'
        : 'international-exhibition-campaigns';

    requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({
        block: 'start',
        behavior: 'instant' as ScrollBehavior,
      });
    });
  }, [initialSection]);

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

  if (initialSection === 'activation') {
    return <ActivationPreviewBoard isCn={language === 'cn'} />;
  }

  const showExhibition = initialSection !== 'activation';
  const showActivation = initialSection !== 'exhibition';

  return (
    <div className="flex flex-col gap-20">

      {/* Sub-section 1: International Exhibition Campaigns */}
      {showExhibition && (
      <div id="international-exhibition-campaigns">
        {!initialSection && (
          <SectionDividerLine
            label={t.projects.exhibitionTitle.split(':')[0]}
            sublabel={t.projects.exhibitionTitle.split(':')[1]?.trim()}
          />
        )}

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
                <Card depth={2} className={`p-6 flex-1 ${projectCardSurface}`}>
                  <StrategicBlock icon="🎯" title={t.projects.case1.taskTitle} description={t.projects.case1.taskDesc}>
                    <StrategicItem text={t.projects.case1.painPoint} />
                    <StrategicItem text={t.projects.case1.limitation} />
                  </StrategicBlock>
                </Card>

                <Card depth={2} className={`p-6 flex-1 ${projectCardSurface}`}>
                  <StrategicBlock icon="⚡" title={t.projects.case1.actionTitle} description={t.projects.case1.actionDesc}>
                    <StrategicItem text={t.projects.case1.action1} type="tag" />
                    <StrategicItem text={t.projects.case1.action2} type="tag" />
                    <StrategicItem text={t.projects.case1.action3} type="tag" />
                  </StrategicBlock>
                </Card>

                <Card depth={2} className={`p-6 flex-1 ${projectCardSurface}`}>
                  <h5 className="font-bold text-text-dark mb-4 flex items-center gap-3 text-sm tracking-wide">
                    <span className="text-sm">🏆</span>
                    {t.projects.case1.resultTitle}
                  </h5>
                  <div className="grid grid-cols-3 gap-2 mb-5 border-b border-[#2d2d2d]/5 pb-5">
                    <MetricItem label={t.projects.case1.metrics?.open.label} value={t.projects.case1.metrics?.open.value} avg={t.projects.case1.metrics?.open.avg} delta={t.projects.case1.metrics?.open.delta} isInteractive />
                    <MetricItem label={t.projects.case1.metrics?.ctr.label} value={t.projects.case1.metrics?.ctr.value} avg={t.projects.case1.metrics?.ctr.avg} delta={t.projects.case1.metrics?.ctr.delta} isInteractive />
                    <MetricItem label={t.projects.case1.metrics?.deliver.label} value={t.projects.case1.metrics?.deliver.value} avg={t.projects.case1.metrics?.deliver.avg} delta={t.projects.case1.metrics?.deliver.delta} isInteractive />
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
                  <Card depth={2} className={`p-6 flex-1 ${projectCardSurface}`}>
                    <StrategicBlock icon="🎯" title={t.projects.case2.taskTitle} description={t.projects.case2.taskDesc}>
                      <StrategicItem text={t.projects.case2.difficulty} />
                      <StrategicItem text={t.projects.case2.req} />
                    </StrategicBlock>
                  </Card>

                  <Card depth={2} className={`p-6 flex-1 ${projectCardSurface}`}>
                    <StrategicBlock icon="⚡" title={t.projects.case2.actionTitle} description={t.projects.case2.actionDesc}>
                      <StrategicItem text={t.projects.case2.action1} type="tag" />
                      <StrategicItem text={t.projects.case2.action2} type="tag" />
                    </StrategicBlock>
                  </Card>

                  <Card depth={2} className={`p-6 flex-1 ${projectCardSurface}`}>
                    <h5 className="font-bold text-text-dark mb-4 flex items-center gap-3 text-sm tracking-wide">
                      <span className="text-sm">🏆</span>
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
              <Card depth={2} className={`w-full p-4 relative group mb-10 ${projectCardSurface}`} ref={videoContainerRef}>
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

            </div>
          </div>

          {/* Exhibition Performance Analysis */}
          <div>
            <ExhibitionPerformance />
          </div>

        </div>
      </div>
      )}

      {/* Sub-section 2: Regional Market Activation */}
      {showActivation && (
      <div id="regional-market-activation">
        {!initialSection && (
          <SectionDividerLine label={t.projects.activationTitle} className={showExhibition ? '!-mt-9' : ''} />
        )}

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
      )}

    </div>
  );
};
