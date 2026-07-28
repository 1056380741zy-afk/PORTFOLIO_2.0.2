import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarDays,
  Globe2,
  Mail,
  Megaphone,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  UsersRound,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { EXHIBITIONS } from '../../../constants';
import { Card } from '../../shared/Card';
import { MetricItem } from '../MetricItem';
import { StrategicBlock, StrategicItem } from '../StrategicBlock';
import { ExhibitionGridCard } from '../ExhibitionGridCard';
import { ProjectCaseCard } from '../ProjectCaseCard';
import { EvidenceFrame, EvidenceSlip } from '../../shared/ArchivePrimitives';
import { ArchiveCtaLink, DecorativeIcon } from '../../shared/DecorativeIcon';

const ExhibitionPerformance = lazy(() => import('../../shared/ExhibitionPerformance').then((module) => ({
  default: module.ExhibitionPerformance,
})));
const projectCardSurface = 'project-case-strategy-card information-hover-card channel-strategy-card';
const FEATURED_VIDEO_SRC = '/images/freecompress-demo.mp4?v=20260709c';

// ─── Section Divider Line ──────────────────────────────────────────────────
export const SectionDividerLine: React.FC<{ label: string; sublabel?: string; className?: string }> = ({ label, sublabel, className = '' }) => (
  <div className={`section-label mt-[15px] mb-[30px] flex items-center gap-4 ${className}`}>
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
  date?: string;
  eventType?: string;
  description: string;
  responsibilities: string[];
  tags: string[];
  languages: string[];
  roles: string[];
  image: string;
  imageMode?: 'cover' | 'contain';
  metrics: ActivationPreviewMetric[];
}

const activationImageDimensions: Record<string, { width: number; height: number }> = {
  '/images/aib-mena-Header-Logo.png': { width: 1280, height: 256 },
  '/projects/card04-transparent.webp': { width: 2172, height: 724 },
  '/projects/card02-transparent.webp': { width: 1448, height: 1086 },
  '/images/Consulate%20General%20of%20China%20in%20Dubai.jpg': { width: 1280, height: 853 },
  '/images/Huawei.jpeg': { width: 1280, height: 580 },
  '/images/Banner%202425.jpg': { width: 1280, height: 693 },
};

const activationPreviewCases: ActivationPreviewCase[] = [
  {
    number: 'Project 01',
    category: 'Academic',
    title: 'AIB Middle East & North Africa 2024 Chapter Conference',
    date: 'Dec 2024',
    eventType: 'Academic Conference · Dubai',
    description:
      'Supported an international academic conference hosted by the University of Birmingham Dubai, welcoming delegates from 31 countries.',
    responsibilities: ['Managed registration workflows and attendee check-in.', 'Assisted venue setup and session coordination.', 'Supported bilingual communication during the conference.'],
    tags: ['University', 'Conference'],
    languages: ['English', 'Chinese'],
    roles: ['Event Support', 'On-site Operations', 'Chinese & English Communication'],
    image: '/images/aib-mena-Header-Logo.png',
    imageMode: 'contain',
    metrics: [
      { icon: UsersRound, label: 'Scale', value: '130+ Delegates · 31 Countries' },
      { icon: CalendarDays, label: 'Coordination Scope', value: 'Registration, venue setup,\nagenda flow' },
      { icon: Target, label: 'Focus', value: 'Academic conference\noperations' },
    ],
  },
  {
    number: 'Project 02',
    category: 'Government',
    title: '“Encounter Among Blossoms” Song Dynasty Culture Event',
    date: 'Jan 2025',
    eventType: 'Government Cultural Event · Dubai',
    description:
      'Supported a cultural exchange event hosted by the Consulate-General of China in Dubai, assisting international guest communication and event delivery.',
    responsibilities: ['Provided Chinese-English-Arabic communication support.', 'Assisted international guest reception and guidance.', 'Supported venue arrangement and event coordination.'],
    tags: ['Cultural', 'Diplomatic Event'],
    languages: ['Chinese', 'English', 'Arabic'],
    roles: ['Multilingual Guest Communication', 'Venue Support', 'On-site Coordination'],
    image: '/images/Consulate%20General%20of%20China%20in%20Dubai.jpg',
    imageMode: 'cover',
    metrics: [
      { icon: UsersRound, label: 'Scale', value: '150+ International Guests' },
      { icon: CalendarDays, label: 'Coordination Scope', value: 'Guest communication, venue\narrangement' },
      { icon: Target, label: 'Focus', value: 'Government cultural event\nsupport' },
    ],
  },
  {
    number: 'Project 03',
    category: 'Technological',
    title: 'Power the Digital Era Forward Global Data Center Facility Summit 2025',
    date: 'May 2025',
    eventType: 'Technology Summit · Dubai',
    description:
      'Supported a global technology summit by coordinating international staff and ensuring efficient on-site operations.',
    responsibilities: ['Coordinated 30+ international event staff.', 'Managed staff allocation across multiple event areas.', 'Supported VIP reception and real-time issue handling.'],
    tags: ['Summit', 'Digital Infrastructure'],
    languages: ['English', 'Chinese', 'Arabic'],
    roles: ['Staff Allocation', 'Cross-team Communication', 'VIP Reception', 'Real-time Issue Response'],
    image: '/images/Huawei.jpeg',
    imageMode: 'cover',
    metrics: [
      { icon: UsersRound, label: 'Scale', value: '500+ Experts · Leaders · Partners' },
      { icon: CalendarDays, label: 'Coordination Scope', value: 'Staff allocation, VIP reception' },
      { icon: Target, label: 'Focus', value: 'Technology forum\noperations' },
    ],
  },
  {
    number: 'Project 04',
    category: 'Industrial',
    title: 'WieTec | WATERTECH CHINA 2024 & 2025',
    date: 'Jun 2024 & Jun 2025',
    description:
      'Coordinated operations for a leading international water industry exhibition, connecting global exhibitors, buyers and industry professionals.',
    responsibilities: ['Supported international exhibition operations and visitor services.', 'Provided multilingual communication assistance for overseas exhibitors and visitors.', 'Assisted on-site coordination and operational execution.'],
    tags: ['Exhibition', 'Water Industry'],
    languages: ['Chinese', 'English'],
    roles: ['Event Support', 'Language Support'],
    image: '/images/Banner%202425.jpg',
    imageMode: 'contain',
    metrics: [
      { icon: UsersRound, label: 'Scale', value: '100,000+ Visitors · 175+ Countries' },
      { icon: CalendarDays, label: 'Coordination Scope', value: 'Marketing, visitor support,\ngroup coordination' },
      { icon: Target, label: 'Focus', value: 'Industrial exhibition onsite\noperations & VIP reception' },
    ],
  },
];

const activationPreviewCasesCn: ActivationPreviewCase[] = [
  {
    number: '项目 01',
    category: '学术研讨',
    title: 'AIB中东与北非分会会议 2024',
    date: '2024年12月',
    eventType: '国际学术会议 · 迪拜',
    description:
      '支持伯明翰大学迪拜校区举办的国际学术会议，服务来自31个国家的参会代表。',
    responsibilities: ['负责嘉宾签到及注册流程管理。', '协助会场布置与会议流程协调。', '提供会议期间中英双语沟通支持。'],
    tags: ['大学', '会议'],
    languages: ['英语', '中文'],
    roles: ['活动支持 · 现场运营', '中英双语沟通'],
    image: '/images/aib-mena-Header-Logo.png',
    imageMode: 'contain',
    metrics: [
      { icon: UsersRound, label: '规模', value: '130+ 位代表 · 来自31个国家' },
      { icon: CalendarDays, label: '协调范围', value: '注册、场地布置、议程流程' },
      { icon: Target, label: '重点', value: '学术会议\n现场执行' },
    ],
  },
  {
    number: '项目 02',
    category: '政府活动',
    title: '邂逅花间——宋代雅集走进总领馆（中国驻迪拜总领馆）',
    date: '2025年1月',
    eventType: '政府文化活动 · 迪拜',
    description:
      '支持中国驻迪拜总领馆举办的文化交流活动，协助国际嘉宾沟通与现场执行。',
    responsibilities: ['提供中英阿三语沟通支持。', '协助国际嘉宾接待与现场引导。', '支持会场布置与活动协调。'],
    tags: ['文化', '外交活动'],
    languages: ['中文', '英语', '阿语'],
    roles: ['多语种嘉宾沟通', '会场支持 · 现场协调'],
    image: '/images/Consulate%20General%20of%20China%20in%20Dubai.jpg',
    imageMode: 'cover',
    metrics: [
      { icon: UsersRound, label: '规模', value: '150+ 位国际嘉宾' },
      { icon: CalendarDays, label: '协调范围', value: '嘉宾沟通、场地安排' },
      { icon: Target, label: '重点', value: '政府文化活动\n支持' },
    ],
  },
  {
    number: '项目 03',
    category: '技术峰会',
    title: '2025华为全球数据中心产业论坛（迪拜）',
    date: '2025年5月',
    eventType: '科技峰会 · 迪拜',
    description:
      '支持国际科技峰会运营，协调海外工作人员并保障现场高效执行。',
    responsibilities: ['统筹30+名国际活动工作人员。', '负责多区域人员调度与岗位分配。', '支持VIP接待及现场问题快速处理。'],
    tags: ['峰会', '数字基础设施'],
    languages: ['英语', '中文', '阿语'],
    roles: ['人员调度 · 跨团队沟通', 'VIP接待 · 实时问题响应'],
    image: '/images/Huawei.jpeg',
    imageMode: 'cover',
    metrics: [
      { icon: UsersRound, label: '规模', value: '500+ 技术专家 · 行业领袖 · 合作伙伴' },
      { icon: CalendarDays, label: '协调范围', value: '人员分配、VIP接待' },
      { icon: Target, label: '重点', value: '科技论坛\n执行' },
    ],
  },
  {
    number: '项目 04',
    category: '工业展会',
    title: '世环会｜上海国际水展 2024 & 2025',
    date: '2024年6月、2025年6月',
    description:
      '参与国际水处理行业大型展览运营，连接全球展商、采购商及行业专业人士。',
    responsibilities: ['支持国际展会运营及海外观众服务。', '为海外展商及观众提供多语种沟通支持。', '协助现场协调与活动执行。'],
    tags: ['展会', '水处理行业'],
    languages: ['中文', '英语'],
    roles: ['展会支持 · 语言支持'],
    image: '/images/Banner%202425.jpg',
    imageMode: 'contain',
    metrics: [
      { icon: UsersRound, label: '规模', value: '10万+ 观众 · 覆盖175+国家和地区' },
      { icon: CalendarDays, label: '协调范围', value: '营销、观众支持、团队协调' },
      { icon: Target, label: '重点', value: '工业展会现场执行\n与VIP接待' },
    ],
  },
];

interface ActivationPreviewBoardProps {
  isCn?: boolean;
}

const ActivationPreviewBoard: React.FC<ActivationPreviewBoardProps> = ({ isCn = false }) => {
  const cases = isCn ? activationPreviewCasesCn : activationPreviewCases;
  const featured = cases[3];
  const secondary = [cases[0], cases[1], cases[2]];
  const overviewLabel = isCn ? '项目概述' : 'OVERVIEW';
  const responsibilitiesLabel = isCn ? '主要职责' : 'KEY RESPONSIBILITIES';
  const roleLabel = isCn ? '我的角色' : 'MY ROLE';
  const scaleLabel = isCn ? '活动规模' : 'EVENT SCALE';
  const secondaryMeta = isCn
    ? ['学术研讨｜2024年12月', '政府活动｜2025年01月', '技术峰会｜2025年05月']
    : ['ACADEMIC FORUM | DEC 2024', 'GOVERNMENT EVENT | JAN 2025', 'TECH SUMMIT | MAY 2025'];
  const featuredMeta = isCn
    ? '国际工业展览｜2024年6月 & 2025年6月'
    : 'INDUSTRIAL EXHIBITION｜2024.06 & 2025.06';
  const formatTagText = (text: string) => text.replace(/[。.]+$/u, '');

  const renderCaseDetails = (item: ActivationPreviewCase, condensed = false) => (
    <div className="activation-case-details">
      <section>
        <span>{overviewLabel}</span>
        <p>{item.description}</p>
        <div className="activation-overview-scale">
          <span>{scaleLabel}</span>
          <p>{item.metrics[0].value}</p>
        </div>
      </section>
      {!condensed && (
        <section>
          <span>{responsibilitiesLabel}</span>
          <ul>{item.responsibilities.map((responsibility) => <li key={responsibility}>{formatTagText(responsibility)}</li>)}</ul>
        </section>
      )}
      {!condensed && (
        <div className="activation-case-meta-grid">
          <section>
            <span>{roleLabel}</span>
            <ul className="activation-role-tags">
              {item.roles.map((role) => <li key={role}>{formatTagText(role)}</li>)}
            </ul>
          </section>
        </div>
      )}
    </div>
  );

  return (
    <div id="regional-market-activation" className={`activation-archive${isCn ? ' activation-archive-cn' : ''}`}>
      <article className="activation-featured-card">
        <EvidenceFrame
          className="activation-featured-media"
          caption={featured.title}
          source={featured.date}
          mediaType={isCn ? '活动影像' : 'EVENT VISUAL'}
          showCaption={false}
        >
          <img
            src={featured.image}
            alt=""
            {...activationImageDimensions[featured.image]}
            loading="lazy"
            decoding="async"
          />
          <span className="activation-featured-meta">{featuredMeta}</span>
        </EvidenceFrame>
        <div className="activation-featured-copy">
          <span className="activation-featured-label">
            <DecorativeIcon icon={Sparkles} size={16} />
            {isCn ? '重点案例' : 'FEATURED EVENT'}
          </span>
          <h3>{featured.title}</h3>
          {renderCaseDetails(featured)}
          <ArchiveCtaLink to="/projects/preview/exhibition" className="activation-featured-link">
            {isCn ? '前往 Card 01：国际展会营销与运营' : 'View Card 01: International Exhibition Marketing & Operations'}
          </ArchiveCtaLink>
        </div>
      </article>

      <div className="activation-secondary-grid">
        {secondary.map((item, index) => {
          const isIndustrial = item.category === 'Industrial' || item.category === '工业展会';
          return (
            <article key={item.number} className="activation-secondary-card">
              <EvidenceFrame
                className={`activation-secondary-media activation-preview-media-${item.imageMode ?? 'cover'}`}
                caption={item.title}
                source={item.eventType || item.date}
                mediaType={isCn ? '现场证据' : 'EVENT EVIDENCE'}
                showCaption={false}
              >
                <img
                  src={item.image}
                  alt=""
                  {...activationImageDimensions[item.image]}
                  loading="lazy"
                  decoding="async"
                />
                <span className="activation-secondary-meta">{secondaryMeta[index]}</span>
                <div className="activation-secondary-hover-note" aria-hidden="true">
                  <section>
                    <span>{roleLabel}</span>
                    <ul className="activation-role-tags">
                      {item.roles.map((role) => <li key={role}>{formatTagText(role)}</li>)}
                    </ul>
                  </section>
                  <section>
                    <span>{responsibilitiesLabel}</span>
                    <ul>
                      {item.responsibilities.map((responsibility) => (
                        <li key={responsibility}>{formatTagText(responsibility)}</li>
                      ))}
                    </ul>
                  </section>
                </div>
              </EvidenceFrame>
              <div className="activation-secondary-copy">
                <h3>{item.title}</h3>
                {renderCaseDetails(item, true)}
                {isIndustrial && (
                  <Link to="/projects/preview/exhibition" className="activation-related-link">
                    <span>{isCn ? '前往 Card 01：国际展会营销与运营' : 'View Card 01: International Exhibition Marketing & Operations'}</span>
                    <ArrowRight size={14} strokeWidth={1.7} />
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <div className="activation-working-method">
        <span>01 <strong>{isCn ? '活动前' : 'BEFORE'}</strong>{isCn ? '流程确认 · 人员分工 · 嘉宾信息' : 'Workflow · Staffing · Guest Information'}</span>
        <span>02 <strong>{isCn ? '现场' : 'ON-SITE'}</strong>{isCn ? '动态协调 · 多语沟通 · 问题响应' : 'Coordination · Multilingual Support · Issue Response'}</span>
        <span>03 <strong>{isCn ? '活动后' : 'FOLLOW-UP'}</strong>{isCn ? '信息整理 · 团队交接 · 执行复盘' : 'Documentation · Handover · Delivery Review'}</span>
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
          tempVideo.src = FEATURED_VIDEO_SRC;
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
          <div className="mt-[10px] pr-[5px]">
            <div className="flex items-center gap-3 mb-6">
              <span className="decorative-icon decorative-icon-framed decorative-icon-framed-lg"><Mail /></span>
              <h5 className="font-bold text-text-dark text-xl tracking-wide">{t.projects.channelStrategy}</h5>
            </div>

            <div className="flex flex-col gap-8 pl-4 border-l-2 border-[#2d2d2d]/5 ml-5">

              {/* Case 1: EDM Optimization */}
              <ProjectCaseCard
                title={t.projects.case1.title}
                tag={t.projects.case1.tag}
                icon={<TrendingUp />}
                imageSrc="/images/freecompress-EDM.pdf"
                imageTitle="eDM Design PDF"
                imageDesc={t.projects.case1.desc}
              >
                <Card depth={2} className={`field-note !rounded-[8px] p-6 flex-1 ${projectCardSurface}`}>
                  <StrategicBlock icon={<Target />} title={t.projects.case1.taskTitle} description={t.projects.case1.taskDesc}>
                    <StrategicItem text={t.projects.case1.painPoint} />
                    <StrategicItem text={t.projects.case1.limitation} />
                  </StrategicBlock>
                </Card>

                <Card depth={2} className={`field-note !rounded-[8px] p-6 flex-1 ${projectCardSurface}`}>
                  <StrategicBlock icon={<Zap />} title={t.projects.case1.actionTitle} description={t.projects.case1.actionDesc}>
                    <StrategicItem text={t.projects.case1.action1} type="tag" />
                    <StrategicItem text={t.projects.case1.action2} type="tag" />
                    <StrategicItem text={t.projects.case1.action3} type="tag" />
                  </StrategicBlock>
                </Card>

                <Card depth={2} className={`evidence-slip !rounded-[8px] p-6 flex-1 ${projectCardSurface}`}>
                  <h5 className="information-card-title font-bold text-text-dark mb-4 flex items-center gap-3 text-sm tracking-wide">
                    <span className="decorative-icon"><Trophy /></span>
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
                  icon={<Globe2 />}
                  imageSrc="/images/Landing Page_1420x4000.pdf"
                  imageTitle="Landing Page Localization PDF"
                  imageDesc={t.projects.case2.desc}
                >
                  <Card depth={2} className={`field-note !rounded-[8px] p-6 flex-1 ${projectCardSurface}`}>
                    <StrategicBlock icon={<Target />} title={t.projects.case2.taskTitle} description={t.projects.case2.taskDesc}>
                      <StrategicItem text={t.projects.case2.difficulty} />
                      <StrategicItem text={t.projects.case2.req} />
                    </StrategicBlock>
                  </Card>

                  <Card depth={2} className={`field-note !rounded-[8px] p-6 flex-1 ${projectCardSurface}`}>
                    <StrategicBlock icon={<Zap />} title={t.projects.case2.actionTitle} description={t.projects.case2.actionDesc}>
                      <StrategicItem text={t.projects.case2.action1} type="tag" />
                      <StrategicItem text={t.projects.case2.action2} type="tag" />
                    </StrategicBlock>
                  </Card>

                  <Card depth={2} className={`evidence-slip !rounded-[8px] p-6 flex-1 ${projectCardSurface}`}>
                    <h5 className="information-card-title font-bold text-text-dark mb-4 flex items-center gap-3 text-sm tracking-wide">
                      <span className="decorative-icon"><Trophy /></span>
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
          <div className="pr-[10px]">
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <span className="decorative-icon decorative-icon-framed decorative-icon-framed-lg"><Megaphone /></span>
                <h5 className="font-bold text-text-dark text-xl tracking-wide">{t.projects.digitalMatrix.title}</h5>
              </div>
              <p className="text-gray-400 text-base italic font-medium mt-1 ml-[3.25rem]">
                {t.projects.digitalMatrix.subtitle}
              </p>
            </div>

            <div className="pl-5 border-l-2 border-[#2d2d2d]/5 ml-5">
              <Card depth={2} className="project-case-strategy-card !rounded-[8px] !bg-transparent w-full p-4 relative group mb-10 shadow-none" ref={videoContainerRef}>
                <div className="absolute top-4 right-4 bg-[#2d2d2d]/60 text-white px-3 py-1 rounded-full text-[10px] font-bold backdrop-blur-sm z-10">
                  {t.projects.digitalMatrix.featuredVideo}
                </div>
                <div className="w-full aspect-video bg-[#2d2d2d] rounded-[8px] overflow-hidden shadow-sm relative">
                  <video key={FEATURED_VIDEO_SRC} controls preload="none" className="h-full w-full rounded-[8px] object-cover" poster={videoPoster}>
                    <source src={FEATURED_VIDEO_SRC} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </Card>

              <div className="flex flex-col items-center justify-center py-6 mb-8">
                <p className="text-text-dark italic text-lg font-medium text-center mb-6">
                  {t.projects.digitalMatrix.adsSubheader}
                </p>
                <div className="flex items-center justify-center gap-12">
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
          <div className="-mt-[35px]">
            <Suspense fallback={null}>
              <ExhibitionPerformance />
            </Suspense>
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

        <div className="grid grid-cols-2 gap-6">
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
