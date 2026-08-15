import React, { lazy, Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  FolderKanban,
  Languages,
  Share2,
  Trophy,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const B2BContent = lazy(() => import('../components/projects/sections/B2BContent').then((module) => ({
  default: module.B2BContent,
})));
const Web3Strategy = lazy(() => import('../components/shared/Web3Strategy').then((module) => ({
  default: module.Web3Strategy,
})));

type PreviewDetail = 'web3' | 'exhibition' | 'activation';
type LanguageCode = 'en' | 'cn';
type LocalizedString = Record<LanguageCode, string>;
type LocalizedList = Record<LanguageCode, string[]>;

const detailContent: Record<PreviewDetail, Record<'en' | 'cn', { title: string; kicker: string }>> = {
  web3: {
    en: {
      title: 'MENA Web3 Research & Strategy',
      kicker: 'RESEARCH · STRATEGY · MENA',
    },
    cn: {
      title: '中东 Web3 研究与战略',
      kicker: '研究 · 战略 · 中东市场',
    },
  },
  exhibition: {
    en: {
      title: 'International Exhibition Campaigns',
      kicker: 'GLOBAL B2B MARKETING CAMPAIGNS · WATERTECH CHINA & WieTec',
    },
    cn: {
      title: '国际展会营销活动',
      kicker: '全球 B2B 营销活动 · WATERTECH CHINA & WieTec',
    },
  },
  activation: {
    en: {
      title: 'Selected International Event Operations',
      kicker: 'MULTILINGUAL COORDINATION · ON-SITE DELIVERY',
    },
    cn: {
      title: '国际运营活动',
      kicker: '多语言协调 · 现场执行',
    },
  },
};

const isPreviewDetail = (value: string | undefined): value is PreviewDetail =>
  value === 'web3' || value === 'exhibition' || value === 'activation';

const projects = [
  {
    id: 'campaigns',
    number: '01',
    meta: {
      en: 'Featured Project / B2B / Marketing',
      cn: '代表项目 / B2B / 市场营销',
    } satisfies LocalizedString,
    title: {
      en: 'International Exhibition Marketing',
      cn: '国际展会营销与运营',
    } satisfies LocalizedString,
    tags: {
      en: ['B2B Campaigns', 'Channel Strategy', 'eDM Campaigns', 'MENA'],
      cn: ['B2B营销', '渠道策略', '电子邮件营销', '中东市场'],
    } satisfies LocalizedList,
    description: {
      en: 'An international B2B exhibition project combining channel strategy, multilingual digital campaigns, partner coordination and buyer-facing operations.',
      cn: '结合渠道策略、多语言数字营销、合作方协同及海外买家支持的国际B2B展会项目。',
    } satisfies LocalizedString,
    visual: '/projects/index/cards/international-exhibition.png',
    visualPlaceholder: '880 × 960 PX',
    target: '/projects/preview/exhibition',
    metrics: [
      { label: { en: 'DIRECT RESULT · CTR', cn: '直接结果 · 点击率' }, value: { en: '8.50%', cn: '8.50%' }, icon: Trophy },
      { label: { en: 'DIRECT RESULT · REGISTRATION', cn: '直接结果 · 点击后预登记率' }, value: { en: '26.07%', cn: '26.07%' }, icon: Share2 },
    ],
  },
  {
    id: 'activation',
    number: '02',
    meta: {
      en: 'Operations / Events / Dubai',
      cn: '项目运营 / 国际活动 / 迪拜',
    } satisfies LocalizedString,
    title: {
      en: 'International Event Operations',
      cn: '国际活动运营',
    } satisfies LocalizedString,
    tags: {
      en: ['On-site Coordination', 'Multilingual Support', 'VIP Reception'],
      cn: ['现场协调', '多语言支持', 'VIP接待'],
    } satisfies LocalizedList,
    description: {
      en: 'Selected academic, government and technology events in Dubai, demonstrating multilingual communication, on-site coordination and rapid issue response.',
      cn: '迪拜学术、政府与科技活动，展示多语言沟通、现场协调及突发问题响应能力。',
    } satisfies LocalizedString,
    visual: '/projects/index/cards/event-operations.png',
    visualPlaceholder: '880 × 960 PX',
    target: '/projects/preview/activation',
    metrics: [
      { label: { en: 'EVENTS', cn: '代表活动' }, value: { en: '4 Selected', cn: '4个' }, icon: CalendarDays },
      { label: { en: 'LANGUAGES', cn: '语言' }, value: { en: 'ZH + EN + AR', cn: '中 + 英 + 阿' }, icon: Languages },
    ],
  },
  {
    id: 'web3',
    number: '03',
    meta: {
      en: 'Research / Strategy / Web3',
      cn: '研究 / 战略 / Web3',
    } satisfies LocalizedString,
    title: {
      en: 'MENA Web3 Research & Strategy',
      cn: '中东Web3研究与战略',
    } satisfies LocalizedString,
    tags: {
      en: ['Market Research', 'Partnership Strategy', 'Compliance Analysis'],
      cn: ['市场研究', '合作战略', '合规分析'],
    } satisfies LocalizedList,
    description: {
      en: 'Three research and strategy projects exploring participation, platform partnerships and exchange expansion in the UAE and wider MENA Web3 ecosystem.',
      cn: '围绕阿联酋及中东Web3生态中的用户参与、平台合作及交易所扩张展开的三个研究与战略项目。',
    } satisfies LocalizedString,
    visual: '/projects/index/cards/web3-research.png',
    visualPlaceholder: '880 × 960 PX',
    target: '/projects/preview/web3',
    metrics: [
      { label: { en: 'PROJECTS', cn: '研究项目' }, value: { en: '3 Research', cn: '3个' }, icon: FolderKanban },
      { label: { en: 'METHODS', cn: '方法' }, value: { en: 'Survey + Interviews + Strategy', cn: '问卷 + 访谈 + 战略' }, icon: ChartNoAxesColumnIncreasing },
    ],
  },
];

type ProjectArchiveVisualProps = {
  projectId: string;
  number: string;
};

const ProjectRegistryHeader: React.FC = () => (
  <div className="project-preview-registry" aria-hidden="true">
    <div className="project-preview-registry-cross project-preview-registry-cross-a" />
    <div className="project-preview-registry-route">
      <div className="project-preview-registry-node">
        <strong>01</strong>
        <span>CAMPAIGN</span>
        <small>CN - MENA</small>
      </div>
      <div className="project-preview-registry-node">
        <strong>02</strong>
        <span>OPERATIONS</span>
        <small>DUBAI</small>
      </div>
      <div className="project-preview-registry-node">
        <strong>03</strong>
        <span>RESEARCH</span>
        <small>UAE / WEB3</small>
      </div>
    </div>
    <div className="project-preview-registry-ruler">
      {Array.from({ length: 13 }, (_, idx) => (
        <span key={idx}>{idx * 10}</span>
      ))}
    </div>
    <div className="project-preview-registry-stamp">
      <span>03</span>
      <small>FILES</small>
    </div>
    <div className="project-preview-registry-cross project-preview-registry-cross-b" />
  </div>
);

const ProjectArchiveVisual: React.FC<ProjectArchiveVisualProps> = ({ projectId, number }) => {
  if (projectId === 'campaigns') {
    return (
      <div className="project-archive-visual project-archive-visual-campaign">
        <span className="project-archive-file-label">FILE {number} / MKT</span>
        <span className="project-archive-ruler" aria-hidden="true" />
        <span className="project-archive-city" aria-hidden="true" />
        <div className="project-archive-folder">
          <div className="project-archive-route-sheet">
            <strong>ROUTE PLAN</strong>
            <span>CHINA -&gt; MENA</span>
            <i className="route-dot route-dot-a" />
            <i className="route-dot route-dot-b" />
            <i className="route-dot route-dot-c" />
          </div>
          <div className="project-archive-pass">
            <strong>EXHIBITOR</strong>
            <span>WATERTECH CHINA 2024</span>
            <small>SHANGHAI</small>
          </div>
          <div className="project-archive-distribution">
            <strong>EDM DISTRIBUTION</strong>
            <span><i /> EMAIL 90%</span>
            <span><i /> WHATSAPP 75%</span>
            <span><i /> LINKEDIN 60%</span>
          </div>
          <em>CAMPAIGN DISPATCH FILE</em>
        </div>
        <span className="project-archive-crop project-archive-crop-a" />
        <span className="project-archive-crop project-archive-crop-b" />
      </div>
    );
  }

  if (projectId === 'activation') {
    return (
      <div className="project-archive-visual project-archive-visual-ops">
        <span className="project-archive-file-label">FILE {number} / OPS</span>
        <span className="project-archive-punches" aria-hidden="true" />
        <span className="project-archive-binder" aria-hidden="true" />
        <div className="project-archive-run-sheet">
          <strong>EVENT RUN SHEET</strong>
          {['08:30 Registration Open', '10:00 Opening Session', '13:40 VIP Reception', '18:00 Closing Remarks'].map((item) => (
            <span key={item}>{item}</span>
          ))}
          <div className="project-archive-floorplan" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="project-archive-vip-pass">
          <small>ALL ACCESS</small>
          <strong>VIP</strong>
          <span>PASS</span>
        </div>
        <div className="project-archive-checklist">
          {['Venue Setup', 'Guest Reception', 'Translation'].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <span className="project-archive-stamp">ON SITE</span>
      </div>
    );
  }

  return (
    <div className="project-archive-visual project-archive-visual-research">
      <span className="project-archive-file-label">FILE {number} / R&D</span>
      <span className="project-archive-target" aria-hidden="true" />
      <pre className="project-archive-ascii" aria-hidden="true">{'++..::\n+..::::\n..::==\n.::===\n..::::'}</pre>
      <div className="project-archive-research-sheet project-archive-research-main">
        <strong>RESEARCH OVERVIEW</strong>
        <span>MENA WEB3 ECOSYSTEM</span>
        <div className="project-archive-donut" aria-hidden="true" />
        <div className="project-archive-mini-bars" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="project-archive-research-sheet project-archive-compliance">
        <strong>COMPLIANCE CHECK</strong>
        {['KYC / AML', 'Data Security', 'License Clarity'].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="project-archive-network" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <span className="project-archive-verified">VERIFIED</span>
    </div>
  );
};

export const ProjectPreview: React.FC = () => {
  const { detail } = useParams<{ detail?: string }>();
  const { language } = useLanguage();

  if (isPreviewDetail(detail)) {
    const activeDetail = detailContent[detail][language];

    return (
      <main className={`project-preview-page project-preview-detail-page project-preview-detail-page-${detail} custom-scrollbar`}>
        <section className="project-preview-detail-shell" aria-label={activeDetail.title}>
          <div className="project-preview-detail-toolbar">
            <Link to="/projects/preview" className="project-preview-detail-back">
              <ArrowLeft size={16} strokeWidth={1.5} />
              <span>PROJECT PREVIEW</span>
            </Link>
            <span className="project-preview-detail-separator" aria-hidden="true">/</span>
            <div className="project-preview-detail-titlebar">
              <div className="project-preview-detail-heading">
                <h1>{activeDetail.title}</h1>
              </div>
            </div>
            <span className="project-preview-detail-ruler" aria-hidden="true" />
          </div>

          <div className="project-preview-detail-content">
            <Suspense fallback={<div className="project-preview-detail-loading" aria-hidden="true" />}>
              {detail === 'web3' ? (
                <Web3Strategy />
              ) : (
                <B2BContent initialSection={detail === 'activation' ? 'activation' : 'exhibition'} />
              )}
            </Suspense>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="project-preview-page custom-scrollbar">
      <section className="project-preview-paper" aria-label="Project Preview">
        <div className="project-preview-grain" aria-hidden="true" />
        <div className="project-preview-dots project-preview-dots-a" aria-hidden="true" />
        <div className="project-preview-dots project-preview-dots-b" aria-hidden="true" />
        <div className="project-preview-dots project-preview-dots-c" aria-hidden="true" />
        <img
          src="/projects/index/decorations/topographic-contours.webp"
          alt=""
          width={1692}
          height={930}
          className="project-preview-contours"
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />

        <div className="project-preview-content">
          <header className="project-preview-header">
            <div className="project-preview-title-block">
              <h1>SELECTED PROJECTS</h1>
              <p className="project-preview-kicker">STRATEGY IN ACTION</p>
              <p className="project-preview-intro font-semibold">
                {language === 'cn'
                  ? '覆盖中国与中东市场的营销、项目运营与市场研究实践。'
                  : 'Marketing, operations and market research across China and MENA.'}
              </p>
              <p className="project-preview-register-line">PROJECT REGISTER / 03 ACTIVE FILES / 2023-2026</p>
            </div>

            <ProjectRegistryHeader />
          </header>

          <div className="project-preview-card-grid">
            {projects.map((project, projectIdx) => {
              const projectTitle = project.title[language];
              const projectTags = project.tags[language];
              const isFeaturedProject = projectIdx === 0;

              return (
                <Link
                  key={project.id}
                  to={project.target}
                  className={`project-preview-card ${
                    isFeaturedProject ? 'project-preview-card-featured' : 'project-preview-card-compact'
                  }`}
                  aria-label={`Open ${projectTitle}`}
                >
                  <div className="project-preview-card-body">
                    <div className="project-preview-card-copy">
                      <div className="project-preview-card-heading">
                        <p className="project-preview-card-number">{project.number}</p>
                        <div>
                          <p className="project-preview-card-meta">
                            {isFeaturedProject ? `FEATURED / ${project.meta[language]}` : project.meta[language]}
                          </p>
                          <h2>{projectTitle}</h2>
                        </div>
                      </div>
                      <div className={`project-preview-tags project-preview-tags-${project.id}`}>
                        {projectTags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div className="project-preview-card-story">
                      <div
                        className={`project-preview-visual project-preview-visual-${project.id}`}
                        aria-label={`${projectTitle} visual`}
                      >
                        <img
                          src={project.visual}
                          alt=""
                          width={1536}
                          height={1024}
                          draggable={false}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>

                      <div className="project-preview-card-summary">
                        <p className="project-preview-card-description">
                          {project.description[language]}
                        </p>
                        <span className="project-preview-view-button" aria-hidden="true">
                          <span>VIEW PROJECT</span>
                          <ArrowRight size={22} strokeWidth={1.4} />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="project-preview-metrics"
                    style={{
                      ['--project-preview-metric-count' as string]: project.metrics.length,
                    } as React.CSSProperties}
                  >
                    {project.metrics.map((metric) => {
                      const MetricIcon = metric.icon;
                      const metricLabel = metric.label[language];
                      const metricValue = metric.value[language];

                      return (
                        <div key={metricLabel}>
                          <MetricIcon size={18} strokeWidth={1.35} aria-hidden="true" />
                          <span>{metricLabel}</span>
                          <strong>{metricValue}</strong>
                        </div>
                      );
                    })}
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>
    </main>
  );
};

export default ProjectPreview;
