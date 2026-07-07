import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Database,
  Globe2,
  Megaphone,
  Network,
  Sparkles,
} from 'lucide-react';
import { B2BContent } from '../components/projects/sections/B2BContent';
import { Web3Strategy } from '../components/shared/Web3Strategy';
import { useLanguage } from '../contexts/LanguageContext';

type PreviewDetail = 'web3' | 'exhibition' | 'activation';
type LanguageCode = 'en' | 'cn';
type LocalizedString = Record<LanguageCode, string>;
type LocalizedList = Record<LanguageCode, string[]>;

const detailContent: Record<PreviewDetail, Record<'en' | 'cn', { title: string; kicker: string }>> = {
  web3: {
    en: {
      title: 'Web3 Market Strategy & Growth',
      kicker: 'STRATEGY · WEB3',
    },
    cn: {
      title: 'Web3 市场战略与增长',
      kicker: '策略 · WEB3',
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
      title: 'Regional Market Activation',
      kicker: 'GLOBAL B2B MARKETING CAMPAIGNS · REGIONAL MARKET ACTIVATION',
    },
    cn: {
      title: '区域市场激活',
      kicker: '全球 B2B 营销活动 · 区域市场激活',
    },
  },
};

const isPreviewDetail = (value: string | undefined): value is PreviewDetail =>
  value === 'web3' || value === 'exhibition' || value === 'activation';

const projects = [
  {
    id: 'web3',
    number: '01',
    meta: {
      en: 'Research / Strategy / Web3',
      cn: '研究 / 战略 / Web3',
    } satisfies LocalizedString,
    title: {
      en: 'Web3 Market Strategy & Growth',
      cn: 'Web3 市场战略与增长',
    } satisfies LocalizedString,
    tags: {
      en: ['UAE Web3', 'Gender Insight', 'Alliance Strategy', 'Compliance'],
      cn: ['阿联酋Web3', '女性洞察', '联盟战略', '合规分析'],
    } satisfies LocalizedList,
    description: {
      en: 'Research and strategy work focused on UAE Web3 growth, covering women’s participation, partnership design, and exchange expansion analysis.',
      cn: '聚焦阿联酋 Web3 增长的研究与战略项目，涵盖女性参与、平台合作设计与交易所扩张分析。',
    } satisfies LocalizedString,
    visualImage: '/projects/card01.png',
    target: '/projects/preview/web3',
    metrics: [
      { label: 'SUB-CASES', value: '3' },
      { label: 'METHODS', value: 'Survey + Strategy' },
    ],
  },
  {
    id: 'campaigns',
    number: '02',
    meta: {
      en: 'Campaigns / B2B / Marketing',
      cn: '营销活动 / B2B / 市场传播',
    } satisfies LocalizedString,
    title: {
      en: 'International Exhibition Campaigns',
      cn: '国际展会营销项目',
    } satisfies LocalizedString,
    tags: {
      en: ['eDM Optimization', 'Localization', 'Performance', 'MENA'],
      cn: ['eDM优化', '本地化', '效果分析', 'MENA'],
    } satisfies LocalizedList,
    description: {
      en: 'B2B exhibition campaign work covering eDM optimization, Arabic localization, and performance analysis across channels and markets.',
      cn: '围绕 B2B 展会营销展开，包含 eDM 优化、阿语本地化以及跨渠道效果分析。',
    } satisfies LocalizedString,
    visualImage: '/projects/card02.png',
    target: '/projects/preview/exhibition',
    metrics: [
      { label: 'HIGHLIGHT', value: '128% YoY' },
      { label: 'CHANNELS', value: 'eDM + Social + Web' },
    ],
  },
  {
    id: 'activation',
    number: '03',
    meta: {
      en: 'Activation / Localization / Operations',
      cn: '市场激活 / 本地化 / 运营执行',
    } satisfies LocalizedString,
    title: {
      en: 'Regional Market Activation',
      cn: '区域市场激活与现场支持',
    } satisfies LocalizedString,
    tags: {
      en: ['On-site Coordination', 'Language Support', 'Event Support'],
      cn: ['现场协调', '语言支持', '活动支持'],
    } satisfies LocalizedList,
    description: {
      en: 'Regional activation work across MENA-related events, combining multilingual support, on-site coordination, and business-facing event execution.',
      cn: '围绕 MENA 相关活动的区域激活项目，结合多语言支持、现场协调与面向业务的活动执行。',
    } satisfies LocalizedString,
    visualImage: '/projects/card03.png',
    target: '/projects/preview/activation',
    metrics: [
      { label: 'EVENT CASES', value: '4' },
      { label: 'LANGUAGES', value: 'EN + ZH + AR' },
    ],
  },
];

const capabilityCards = [
  {
    number: '01',
    title: {
      en: 'CROSS-CULTURAL MARKET INSIGHT',
      cn: '跨文化市场洞察',
    } satisfies LocalizedString,
    description: {
      en: 'Understanding markets through cultural & user lens.',
      cn: '通过文化与用户视角理解市场。',
    } satisfies LocalizedString,
    Icon: Globe2,
  },
  {
    number: '02',
    title: {
      en: 'PARTNERSHIP & ECOSYSTEM STRATEGY',
      cn: '伙伴关系与生态策略',
    } satisfies LocalizedString,
    description: {
      en: 'Building partnerships that create long-term value.',
      cn: '建立能够创造长期价值的合作关系。',
    } satisfies LocalizedString,
    Icon: Network,
  },
  {
    number: '03',
    title: {
      en: 'CAMPAIGN EXECUTION',
      cn: '营销活动执行',
    } satisfies LocalizedString,
    description: {
      en: 'From planning to delivery, driving engagement & growth.',
      cn: '从规划到交付，推动参与和增长。',
    } satisfies LocalizedString,
    Icon: Megaphone,
  },
  {
    number: '04',
    title: {
      en: 'LOCALIZATION WITH BUSINESS IMPACT',
      cn: '本地化与商业影响',
    } satisfies LocalizedString,
    description: {
      en: 'Adapting strategy and content to deliver measurable impact.',
      cn: '调整策略与内容，交付可衡量影响。',
    } satisfies LocalizedString,
    Icon: Database,
  },
];

export const ProjectPreview: React.FC = () => {
  const { detail } = useParams<{ detail?: string }>();
  const { language } = useLanguage();

  if (isPreviewDetail(detail)) {
    const activeDetail = detailContent[detail][language];

    return (
      <main className="project-preview-page project-preview-detail-page custom-scrollbar">
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
          </div>

          <div className="project-preview-detail-content">
            {detail === 'web3' ? (
              <Web3Strategy />
            ) : (
              <B2BContent initialSection={detail === 'activation' ? 'activation' : 'exhibition'} />
            )}
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

        <div className="project-preview-content">
          <header className="project-preview-header">
            <div className="project-preview-title-block">
              <h1>PROJECT PREVIEW</h1>
              <p className="project-preview-kicker">STRATEGY IN ACTION</p>
              <p className="project-preview-intro">
                {language === 'cn'
                  ? '近期项目展示战略、伙伴关系与创意如何协同，推动可衡量的影响。'
                  : 'Recent projects where strategy, partnerships, and creativity come together to drive measurable impact.'}
              </p>
            </div>

            <div className="project-preview-featured">
              <Sparkles size={15} strokeWidth={1.6} />
              <span>FEATURED WORK</span>
            </div>
          </header>

          <div className="project-preview-card-grid">
            {projects.map((project) => {
              const projectTitle = project.title[language];
              const projectTags = project.tags[language];

              return (
                <Link
                  key={project.id}
                  to={project.target}
                  className="project-preview-card"
                  aria-label={`Open ${projectTitle}`}
                >
                  <div className="project-preview-card-body">
                    <div className="project-preview-card-copy">
                      <p className="project-preview-card-number">{project.number}</p>
                      <p className="project-preview-card-meta">{project.meta[language]}</p>
                      <h2>{projectTitle}</h2>
                      <div className={`project-preview-tags project-preview-tags-${project.id}`}>
                        {projectTags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                      <p className="project-preview-card-description">
                        {project.description[language]}
                      </p>
                      <span className="project-preview-view-button" aria-hidden="true">
                        <span>VIEW PROJECT</span>
                        <ArrowRight size={22} strokeWidth={1.4} />
                      </span>
                    </div>

                    <div
                      className={`project-preview-visual project-preview-visual-${project.id}`}
                      aria-label={`${projectTitle} visual`}
                    >
                      <img src={project.visualImage} alt="" loading="lazy" />
                    </div>
                  </div>

                  <div
                    className="project-preview-metrics"
                    style={{
                      ['--project-preview-metric-count' as string]: project.metrics.length,
                    } as React.CSSProperties}
                  >
                    {project.metrics.map((metric) => (
                      <div key={metric.label}>
                        <span>{metric.label}</span>
                        <strong>{metric.value}</strong>
                      </div>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>

          <section className="project-preview-footer-panel" aria-label="Project Preview Summary">
            <div className="project-preview-index project-preview-capabilities">
              <div className="project-preview-capability-grid">
                {capabilityCards.map(({ number, title, description, Icon }) => (
                  <article key={number} className="project-preview-capability-card">
                    <span className="project-preview-capability-number">{number}</span>
                    <div className="project-preview-capability-copy">
                      <h3>{title[language]}</h3>
                      <p>{description[language]}</p>
                    </div>
                    <Icon size={30} strokeWidth={1.55} aria-hidden="true" />
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default ProjectPreview;
