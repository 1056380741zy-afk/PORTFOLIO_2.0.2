import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'cn';

const nodeDetailsDataEn = {
  shanghai: {
    experiences: [
      {
        company: "Herui Group",
        roles: [
          { title: "MENA Marketing Consultant (Part-time)", isPrimary: true, period: "Mar 2025 – Jun 2025" },
          { title: "Marketing Assistant (Internship)", isPrimary: false, period: "Aug 2023 – Aug 2024" }
        ]
      }
    ],
    educations: [
      {
        school: "Shanghai International Studies University",
        subSchool: "Xianda College",
        degree: "Bachelor's Degree",
        period: "Sep 2020 – Jun 2024",
        focus: "Arabic and International Business background",
        honor: "Multiple Academic Excellence Scholarships"
      }
    ],
    impacts: [
      {
        title: "YoY Growth in Overseas Buyers",
        desc: "Driven a massive surge in overseas attendance covering 175+ countries, delivering precise MENA leads for the sales team.",
        statsType: "boxes",
        stats: [
          { value: "8,221", label: "Overseas Visitors", theme: "purple" },
          { value: "+128%", label: "YoY Surged", theme: "yellow" }
        ]
      },
      {
        title: "Digital Marketing & Traffic Conversion",
        desc: "Spearheaded English SEO and eDM design, significantly boosting the conversion rates of digital assets.",
        statsType: "tags",
        tags: ["~800 Daily Peak Visits", "30.2% eDM Open Rate", "8.5% CTR"]
      },
      {
        title: "MENA Multilingual Market Reach",
        desc: "Coordinated trilingual (EN/ZH/AR) materials, accumulating nearly 3,000 effective overseas visitors across all channels."
      }
    ]
  },
  dubai: {
    educations: [
      {
        school: "University of Birmingham",
        subSchool: "Dubai Campus",
        degree: "MSc International Business",
        period: "Oct 2024 – Nov 2025",
        focus: "Market strategy, Web3 ecosystems, MENA institutional context",
        honor: "Full Scholarship Recipient"
      }
    ],
    impacts: [
      {
        title: "On-site Operations at Huawei Global Summit",
        desc: "Coordinated overseas human resources on-site, ensuring the smooth execution of exhibition assistance and technical forum support.",
        statsType: "boxes",
        stats: [
          { value: "30+", label: "Part-time Staff Coordinated", theme: "purple" }
        ]
      },
      {
        title: "Premium Reception & Cross-Cultural Interpreting",
        desc: "Provided on-site EN/ZH/AR interpreting and guest guidance for the Consulate General of China in Dubai and the AIB-MENA Conference.",
        statsType: "tags",
        tags: ["Diplomatic Reception", "Academic Summit Coordination"]
      },
      {
        title: "Insights into MENA Tech Ecosystem",
        desc: "Conducted in-depth research on MENA Web3 and AI, delivering high-quality reports on Women's Web3 Participation, Binance, and The Sandbox strategies."
      }
    ]
  },
  alexandria: {
    educations: [
      {
        school: "Alexandria University",
        degree: "Exchange Program",
        period: "Sep 2022 – Jun 2023",
        focus: "Arabic Language & Cultural Immersion",
        honor: "Ranked 1st in GPA Evaluation"
      }
    ],
    impacts: [
      {
        title: "Perfect Academic Achievement",
        desc: "Achieved a perfect GPA (4.0/4.0) during the exchange program in Egypt, ranking 1st in the comprehensive evaluation and receiving the Academic Excellence Certificate from Alexandria University.",
        statsType: "tags",
        tags: ["Top 1 Comprehensive Evaluation", "Academic Excellence Certificate"]
      },
      {
        title: "Cultural Immersion & Linguistic Breakthrough",
        desc: "Deeply immersed in a native Arabic environment, mastering both Modern Standard Arabic (MSA) and the Egyptian dialect for daily communication, breaking down core cultural and linguistic barriers.",
        statsType: "boxes",
        stats: [
          { value: "MSA + Egyptian", label: "Dual-Track Linguistic Capability", theme: "yellow" }
        ]
      },
      {
        title: "Insights into Cross-Border Informal Business Communication",
        desc: "Through academic and field immersion, preemptively experienced and profoundly understood the unique \"network-based\" decision-making mechanisms and negotiation rhythms of the MENA market, building a solid localization foundation for complex business implementations."
      }
    ]
  }
};

// Create CN version with translated titles and content
const nodeDetailsDataCn = {
  shanghai: {
    experiences: [
      {
        company: "上海荷瑞会展有限公司",
        roles: [
          { title: "海外市场专员 (实习)", period: "2023.08 – 2024.08", isPrimary: true },
          { title: "MENA市场顾问 (兼职)", period: "2025.03 – 2025.06", isPrimary: false }
        ]
      }
    ],
    educations: [
      {
        school: "上海外国语大学",
        subSchool: "贤达经济人文学院",
        degree: "阿拉伯语专业 (本科)",
        period: "2020.09 – 2024.06",
        focus: "阿拉伯语与国际商务背景",
        honor: "多次获得优秀学生奖学金"
      }
    ],
    impacts: [
      {
        title: "展会海外高质增长",
        desc: "助力世环会及水展海外观众大幅增长，有效覆盖 175+ 国家，为销售团队精准输送 MENA 区域高质量买家线索。",
        statsType: "boxes",
        stats: [
          { value: "8,221", label: "海外观众人次", theme: "purple" },
          { value: "+128%", label: "同比暴增 (YoY)", theme: "yellow" }
        ]
      },
      {
        title: "流量与内容引擎架构",
        desc: "制定英文 SEO 策略并主导 eDM 营销设计，显著提升品牌数字资产的自然流量与主动触达转化率。",
        statsType: "tags",
        tags: ["日访问峰值近 800 次", "eDM 打开率 30.18%", "点击率 8.50%"]
      },
      {
        title: "全渠道多语种触达",
        desc: "统筹中/英/阿三语物料，通过 WhatsApp、LinkedIn 及 Facebook 等渠道，累计触达近 3,000名 有效海外访客，深度渗透 MENA 市场。"
      }
    ]
  },
  dubai: {
    experiences: [],
    educations: [
      {
        school: "伯明翰大学",
        subSchool: "(QS100) 迪拜校区",
        degree: "国际商务 (硕士)",
        period: "2024.09 – 2025.11",
        focus: "市场战略、Web3 生态、中东非体制环境",
        honor: "GPA 3.6/4.0"
      }
    ],
    impacts: [
      {
        title: "大型跨国峰会场务统筹",
        desc: "在 2025 华为全球数据中心产业论坛 (迪拜) 中，现场统筹协调海外人力资源，有效保障展区协助与技术论坛支持的顺畅进行。",
        statsType: "boxes",
        stats: [
          { value: "30+", label: "统筹兼职人员", theme: "purple" }
        ]
      },
      {
        title: "跨文化多语种高端接待",
        desc: "为中国驻迪拜总领馆“邂逅花间”宋代雅集活动及 AIB-MENA 国际峰会提供现场翻译与嘉宾接待，消弭文化与沟通壁垒。",
        statsType: "tags",
        tags: ["中 / 英 / 阿 多语种", "外事活动接待", "学术峰会协调"]
      },
      {
        title: "前沿科技生态商业洞察",
        desc: "深入研究中东地区 Web3 及 AI 领域，产出包括《阿联酋 Web3 行业的女性参与驱动因素》、《币安战略分析》以及《Sandbox 与 Yalla 合作策略》等高质量商业报告。"
      }
    ]
  },
  alexandria: {
    experiences: [],
    educations: [
      {
        school: "亚历山大大学",
        subSchool: "交流项目",
        degree: "阿拉伯语专业 (本科交换)",
        period: "2022.09 – 2023.06",
        focus: "阿拉伯语语言与文化沉浸",
        honor: "GPA 4.0/4.0, 综测年级第一"
      }
    ],
    impacts: [
      {
        title: "满分学术成就",
        desc: "在埃及交流期间，以全科满分 (GPA 4.0/4.0) 的优异成绩位列综合测评年级第一，并荣获亚历山大大学官方颁发的学业优秀证明。",
        statsType: "tags",
        tags: ["Top 1 综合测评", "学业优秀证明"]
      },
      {
        title: "深度文化沉浸与本土语言破壁",
        desc: "深度沉浸于阿拉伯语母语环境，不仅掌握了阿拉伯语标准语 (MSA)，更熟练应用埃及方言进行日常交流，打破核心的文化与语言壁垒。",
        statsType: "boxes",
        stats: [
          { value: "MSA + Egyptian", label: "双轨语言能力构建", theme: "yellow" }
        ]
      },
      {
        title: "跨国非正式商业沟通洞察",
        desc: "通过实地生活与学术交流，前置体验并深刻理解了中东及北非市场特殊的“基于人际网络”的决策机制与谈判节奏，为后续复杂的商业落地夯实了本地化认知基础。"
      }
    ]
  }
};

export const translations = {
  en: {
    nav: {
      competencies: "Competencies",
      journey: "Journey",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
    },
    hero: {
      locationLabel: "Location",
      locationValue: "Shanghai",
      workModeLabel: "Work Mode",
      workModeValue: "Web3 Remote Capable",
      statusLabel: "Status",
      statusValue: "Open to MENA Relocation",
      title: "Bridging cultural context with execution.",
      focusLabel: "Focusing on",
      focusValue: "Global B2B Campaigns",
      specLabel: "Specializing in",
      specValue: "MENA Market Strategy",
      btnProjects: "Selected Projects",
      btnContact: "Contact Me",
    },
    competencies: {
      title: "Core Competencies",
      items: [
        {
          title: 'Project Management & Execution',
          list: ['End-to-end Project Delivery', 'Cross-functional Team Coordination', 'Resource & Timeline Management', 'Risk Mitigation & On-site Operations']
        },
        {
          title: 'Strategic Planning & Market Intelligence',
          list: ['Go-to-Market (GTM) Strategy', 'Regional Market Analysis (MENA)', 'Market & Competitor Research', 'Product & Campaign Lifecycle Management']
        },
        {
          title: 'Cross-Cultural & Stakeholder Relations',
          list: ['Internal & External Stakeholder Alignment', 'Multilingual Business Communication (ZH/EN/AR)', 'Key Account & Vendor Management', 'International Exhibitions & Activations']
        }
      ]
    },
    journey: {
      title: "Journey",
      hint: "Click on a node to view details",
      tabLabels: {
        research: "Research & Insights",
        insights: "Insights",
        capabilities: "Capabilities"
      },
      nodeDetails: nodeDetailsDataEn,
      items: [
        {
          type: "education",
          typeLabel: "education",
          title: "MSc International Business",
          organization: "University of Birmingham",
          location: "Dubai, UAE",
          period: "Oct 2024 – Nov 2025",
          focus: "Market strategy, Web3 ecosystems, MENA institutional context",
          honor: "Full Scholarship Recipient",
          icon: "GraduationCap"
        },
        {
          type: "experience",
          typeLabel: "experience",
          title: "Marketing & Growth Strategy",
          organization: "Herui Group",
          location: "Shanghai, China",
          period: "Aug 2023 – Jun 2025",
          roles: [
            { title: "MENA Marketing Consultant (Part-time)", period: "Mar 2025 – Jun 2025" },
            { title: "Marketing Assistant (Internship)", period: "Aug 2023 – Aug 2024" }
          ],
          detailedBullets: [
            { icon: "Layout", text: "Updated and optimized WordPress-based website content, including banner design, logo adjustments, and layout refinement." },
            { icon: "Search", text: "Performed English SEO (TDK) optimization across multiple site pages, keyword planning, and meta descriptions." },
            { icon: "Mail", text: "Designed and executed EDM email marketing campaigns, including copywriting, graphic design, and layout." },
            { icon: "Languages", text: "Produced multilingual (ZH/EN/AR) marketing materials, magazine layouts, and key visual assets." },
            { icon: "Share2", text: "Managed overseas digital marketing campaigns across EDM, WhatsApp, Facebook, and LinkedIn." }
          ],
          stats: [
            { value: "45.6%", label: "YoY Growth<br>in Pre-registration" },
            { value: "76%", label: "Decision Makers<br>in Audience Profile" },
            { value: "1,000+", label: "New Visitors<br>from MENA Region" },
            { value: "30%", label: "EDM Open Rate<br>High Engagement" }
          ],
          icon: "Briefcase"
        },
        {
          type: "education",
          typeLabel: "education",
          title: "Bachelor's Degree",
          organization: "Shanghai International Studies University",
          location: "Shanghai, China",
          period: "Sep 2020 – Jun 2024",
          focus: "Arabic and International Business background",
          honor: "Multiple Academic Excellence Scholarships",
          icon: "GraduationCap"
        },
        {
          type: "education",
          typeLabel: "education",
          title: "Exchange Program",
          organization: "Alexandria University",
          location: "Alexandria, Egypt",
          period: "Sep 2022 – Jun 2023",
          focus: "Arabic Language & Cultural Immersion",
          honor: "Ranked 1st in GPA Evaluation",
          icon: "GraduationCap"
        }
      ]
    },
    projects: {
      title: "Selected Projects",
      web3Title: "Web3 Market Strategy & Growth",
      hint: "Click arrows to view more projects",
      web3Strategy: [
        {
          id: 'uae',
          num: '01',
          label: 'Research',
          sidebarTitle: "Women's Participation in UAE Web3",
          sidebarTags: ['Empirical Survey', 'Interviews', 'Inclusiveness Signals'],
          banner: "/images/Project 3-Institutional and Cultural Drivers of Women's Participation in the UAE WEB3 Sector.png",
          projectTag: 'Phase 01 · Research',
          fullTitle: "Research-Driven Strategy:\nUAE & Women Participation",
          subtitle: 'Mixed Methods · MENA Web3 · 2025',
          infographic: '/images/Project 3.png',
          infographicTag: 'Edited by AnyGen',
          blocks: [
            { icon: '📋', label: 'METHOD', badge: '50 surveys + 5 interviews', text: 'Mixed-methods · Entry → Retention → Advancement framework.' },
            { icon: '💡', label: 'KEY FINDING', badge: 'Banking > Culture', text: 'Post-licensing banking access is the tightest bottleneck — not cultural resistance.' },
            { icon: '→', label: 'FEEDS INTO', badge: 'Phase 02 Alliance Design', text: 'Defines the underserved segment any market entry strategy must address first.' }
          ]
        },
        {
          id: 'sandbox',
          num: '02',
          label: 'Strategy',
          sidebarTitle: 'Sandbox × Yalla Alliance',
          sidebarTags: ['VARA Policy', 'Data Analysis', 'Metaverse Synergy'],
          banner: '/images/Project 1-Cooperative strategy between The SANDBOX & Yalla.png',
          projectTag: 'Phase 02 · Strategy',
          fullTitle: 'Platform Collaboration Strategy:\nThe Sandbox & Yalla',
          subtitle: "Porter's Five Forces · UAE Market Entry · 2024",
          infographic: '/images/Project 1.png',
          infographicTag: 'Edited by Canva',
          blocks: [
            { icon: '⚖️', label: 'FRAMEWORK', badge: "Porter's Five Forces", text: "VARA as entry enabler. Yalla's 38.99M MAU as localization moat." },
            { icon: '💡', label: 'KEY FINDING', badge: 'Localization = moat', text: 'Cultural-linguistic gap — not blockchain infra — is the primary barrier to MENA Web3 adoption.' },
            { icon: '→', label: '3-PHASE ROADMAP', badge: 'Action Plan', text: 'Short NFT issuance + co-marketing\nMid Content moats + social layer\nLong JV + ecosystem expansion', isList: true }
          ]
        },
        {
          id: 'binance',
          num: '03',
          label: 'Scale',
          sidebarTitle: 'Binance Global Strategy',
          sidebarTags: ['PESTEL Analysis', 'SWOT Analysis', 'Compliance Mapping'],
          banner: '/images/Project 2-Stategic Analysis and Recommendations for BINANCE.png',
          projectTag: 'Phase 03 · Scale',
          fullTitle: 'Exchange Market Strategy:\nBinance Case Project',
          subtitle: 'PESTEL + Dynamic Capabilities · Global Strategy · 2024',
          infographic: '/images/Project 2.png',
          infographicTag: 'Edited by ChatGPT',
          blocks: [
            { icon: '🧩', label: 'FRAMEWORK', badge: 'Dynamic Capabilities', text: 'Sensing / Seizing / Transforming applied post $4.3B DOJ settlement and executive exodus.' },
            { icon: '💡', label: 'KEY FINDING', badge: 'Compliance = moat', text: '$213M compliance investment reframed as market-access strategy. Web3 Wallet lag = strategic blind spot.' },
            { icon: '📅', label: '36-MONTH PLAN', badge: 'Timeline', text: '0–12m 1,000-person compliance build\n1–3yr 5 DeFi products + regional offices\n3yr+ 1M+ daily transactions platform', isList: true }
          ]
        }
      ],
      web3Projects: [
        {
          category: "Platform Collaboration",
          title: "Platform Collaboration Strategy:\nThe Sandbox & Yalla",
          description: "A strategic alliance analysis leveraging the voice-based social giant Yalla (39M+ users) for Metaverse expansion. Analyzed VARA policy entry, $34B UAE crypto trading growth, and synergy through 'Dubaiverse' localized scenes.",
          infographicCredit: "Edited by Canva",
          insights: ["VARA Policy Entry Strategy", "Yalla Key Data Analysis", "Metaverse Synergy Value", "Action Path: NFT Issuance"]
        },
        {
          category: "Go-to-Market Planning",
          title: "Exchange Market Strategy:\nBinance Case Project",
          description: "Deep-dive into global exchange leadership utilizing PESTEL/SWOT frameworks. Examined the $213M compliance investment progress, MiCA regulatory tightering, and ecosystem growth across BNB Chain and Trust Wallet.",
          infographicCredit: "Edited by ChatGPT",
          insights: ["PESTEL External Analysis", "SWOT Internal Analysis", "Compliance & MiCA Mapping", "2024 Expansion Progress"]
        },
        {
          category: "Market & Customer Research",
          title: "Research-Driven Strategy:\nUAE & Women Participation",
          description: "Evidence-based study on institutional and cultural drivers. Identified operational themes: policy awareness as a barrier-mitigator, program access, and the impact of family/social expectations on platform inclusiveness signals.",
          infographicCredit: "Edited by AnyGen",
          insights: ["Empirical Survey & Interviews", "Institutional Mechanisms", "Operational Themes", "Inclusiveness Signals"]
        }
      ],
      b2bTitle: "Global B2B Marketing Campaigns",
      exhibitionTitle: "International Exhibition Campaigns: WATERTECH CHINA & WieTec",
      channelStrategy: "Channel Strategy",
      case1: {
        tag: "Case 1",
        title: "eDM Optimization",
        desc: "High-conversion eDM Design Case Study",
        taskTitle: "Task / Challenge",
        taskDesc: "Achieve high-conversion eDM design under the constraint of highly redundant brand information.",
        painPoint: "Stakeholders required excessive content per issue, with strict prohibitions on text reduction.",
        limitation: "Avoid the risk of email clients blocking complex images and tables.",
        actionTitle: "Action / Strategy",
        actionDesc: "Implemented the following multi-dimensional optimizations",
        action1: "<strong class='text-[#37352f]'>Interaction & Layout:</strong> Restructured visual hierarchy using 'Limited Image + High-Frequency CTA' strategy, utilizing color blocks instead of large backgrounds.",
        action2: "<strong class='text-[#37352f]'>Matrix Placement:</strong> Precisely embedded Website Links in all modules to shorten the path from viewing to conversion.",
        action3: "<strong class='text-[#37352f]'>AI Empowerment:</strong> Established a 'Safe Master Template' and used AI to rapidly extend sub-versions for concurrent marketing.",
        resultTitle: "Result / Effect",
        metrics: {
          deliver: { 
            label: "Deliver Rate", 
            value: "90.35%", 
            avg: "Industry Avg: 98.1%", 
            status: "Maintenance Req.",
            tooltip: "Managed through a strategic domain transition & lead quality sanitization."
          },
          open: { label: "Open Rate", value: "30.18%", avg: "Industry Avg: 21.5%", delta: "+40% vs Avg" },
          ctr: { label: "CTR", value: "8.50%", avg: "Industry Avg: 2.6%", delta: "+220% vs Avg" }
        },
        impact: "Outperformed B2B industry benchmarks by up to 220% in engagement, validating the high quality of lead segmentation and content localization (Source: Mailchimp 2024)."
      },
      case2: {
        tag: "Case 2",
        title: "eDM Localization",
        desc: "RTL Adaptation & Cultural Localization",
        taskTitle: "Task / Challenge",
        taskDesc: "Cross-cultural visual reconstruction: Localization design for Arabic graphic content.",
        difficulty: "Handle RTL (Right-to-Left) layout logic for the MENA market without altering the original design aesthetic.",
        req: "Ensure text flow, visual focus, and interactive elements align with local reading habits.",
        actionTitle: "Action / Strategy",
        actionDesc: "Agile Design Support & RTL Adaptation Scheme",
        action1: "<strong class='text-[#37352f]'>Tool Synergy:</strong> Flexibly utilized Canva and professional tools for secondary creation, strictly following brand visual guidelines.",
        action2: "<strong class='text-[#37352f]'>Localized Visual Calibration:</strong> Mirrored visual layouts to ensure CTAs, icons, and information flow perfectly match the intuition of native Arabic speakers.",
        resultTitle: "Result / Effect",
        impactTitle: "Regional Coverage Expansion & Private Domain Conversion",
        impact1: "Successfully achieved deep coverage of brand materials in the MENA region, eliminating language and cultural barriers.",
        impact2: "Significantly boosted website traffic and real-time inquiry response rates on social channels like <strong class='text-[#166534]'>WhatsApp</strong>."
      },
      digitalMatrix: {
        title: "Digital & Social Matrix",
        subtitle: "Content Marketing (Social Media & Website)",
        featuredVideo: "Featured Video",
        adsSubheader: "Meta Ads, Google Ads, TikTok Ads, LinkedIn Ads, Website & Social Media Banners"
      },
      performance: {
        title: "Overall Performance Impact",
        dashboardTitle: "Exhibition Performance Analysis",
        opsTitle: "Operational Excellence & Process Architecture",
        cards: [
          { title: "CMS Mastery", desc: "Standardized WordPress & Elementor workflows to ensure design consistency." },
          { title: "Digital Automation", desc: "AI-driven workflows for multi-channel EDM & Social Media content." },
          { title: "MENA Operations", desc: "Protocols for WhatsApp Private Domain & Visa Approval workflows." }
        ],
        dashboard: {
          intlReach: "International Reach",
          audienceQuality: "Audience Quality",
          productDemand: "Product Demand",
          regionalExp: "Capturing Global Demand: The MENA Strategic Pivot",
          signals: "Forward Signals",
          yoyBadge: "YoY +45.6%",
          procurement: "Procurement",
          engineering: "Engineering",
          others: "Others",
          growth: "Growth",
          decisionMakers: "Decision Makers",
          openRate: "Avg Open Rate",
          intlAttendance: "Int'l Attendance",
          annotationScale: "Scale is driven by Quality",
          annotationShift: "Quality buyers are shifting demand toward Membrane technologies",
          catMembrane: "Membrane Tech",
          catIndustrial: "Industrial",
          catCivilian: "Civilian"
        }
      },
      activationTitle: "Regional Market Activation",
      activation: {
        lang: "Languages",
        role: "Role"
      },
      exhibitions: {
        e1: { 
          name: '12th AIB-MENA Conference 2024', 
          org: 'University of Birmingham (Dubai Campus)', 
          languages: ['English', 'Chinese'],
          roles: ['Event Support', 'On-site Operations'] 
        },
        e2: { 
          name: 'Encounter among Blossoms – The Elegant Gathering of the Song Dynasty', 
          org: 'Consulate General of China in Dubai, UAE', 
          languages: ['Chinese', 'English', 'Arabic'],
          roles: ['Event Support', 'Language Support', 'On-site Operations'] 
        },
        e3: { 
          name: 'Global Data Center Facility Summit 2025 (Dubai)', 
          org: 'Huawei', 
          languages: ['English', 'Chinese', 'Arabic'],
          roles: ['Event Support', 'On-site Operations', 'Language Support'] 
        },
        e4: { 
          name: 'WieTec｜WATERTECH CHINA 2024 & 2025', 
          org: 'Herui Group', 
          languages: ['Chinese', 'English'],
          roles: ['Event Support', 'Language Support'] 
        }
      }
    },
    exhibitionPerformance: {
      title: "Exhibition Performance Analysis",
      sec1: {
        title: "Exhibition Scale Overview",
        subtitle: "2023–2025",
        insight: "While exhibitor scale adjusted from the 2023 peak, overseas participation more than doubled in 2025, indicating structural internationalization acceleration.",
        legendExhibitors: "Exhibitors",
        legendOverseas: "Overseas Visitors"
      },
      sec2: {
        title: "Overseas Growth & Quality",
        subtitle: "Breakthrough",
        insight: "2025 marked a structural breakthrough in overseas attendance, reaching 8.6% of total visitor volume.",
        annotation: "+128% YoY",
        tooltipBuyer: "Two-thirds of overseas attendees were direct buyers, reinforcing strong commercial value density."
      },
      sec3: {
        title: "Buyer Quality Structure",
        insight: "Direct buyers constitute 66% of the audience, ensuring high commercial conversion potential."
      },
      sec4: {
        title: "Geographic Expansion & MENA Focus",
        insight: "MENA accounted for 11% of overseas participation in 2025, perfectly aligning with exhibitor expansion intent toward Middle East markets.",
        footprintTitle: "Global Footprint Trend (Countries)",
        shareTitle: "2025 Regional Share",
        trendTitle: "MENA Pivot Trend"
      },
      sec5: {
        title: "Channel Performance Analysis",
        insight: "Owned digital channels maintained competitive conversion rates, with direct internal management matching outsourced professional campaigns.",
        conversionTitle: "Conversion Rate",
        structureTitle: "Lead Structure",
        owned: "Owned",
        outsourced: "Outsourced"
      },
      summary: {
        title1: "Scale Stabilization",
        desc1: "Optimized exhibitor quality while maintaining 100k+ traffic pool.",
        title2: "International Penetration",
        desc2: "Overseas visitors doubled (+128%), proving global appeal.",
        title3: "MENA Expansion",
        desc3: "Strategic pivot success with 11% share from Middle East."
      }
    },
    skills: {
      title: "Skills & Tools",
      toolsTitle: "Tools & Software",
      languagesTitle: "Languages",
      regionalTitle: "Regional Expertise",
      regionalDesc: "Leveraging professional Arabic proficiency and deep cultural understanding to bridge <strong>China-MENA</strong> business gaps.",
      regionalTags: ["Market Entry", "Localization", "Cross-border"],
      languages: [
        { language: 'Arabic', level: 'Professional Proficiency', color: '#e59936' },
        { language: 'English', level: 'Professional Proficiency', color: '#e59936' },
        { language: 'Chinese', level: 'Native', color: '#d3494b' },
      ]
    },
    contact: {
      tag: "Get in Touch",
      titleStart: "Let's work",
      titleEnd: "together.",
      descStart: "",
      descHighlight: "Open for Opportunities,",
      descEnd: "and Emerging Tech Growth Discussions.",
      btnCopy: "Copy Email",
      btnCopied: "Email Copied",
      orEmail: "Or email directly:",
    },
    footer: {
      rights: "All Rights Reserved.",
    },
    aiChat: {
      title: "Suha - AI Assistant",
      welcome: "Hi! I'm Suha, Yan's web assistant. I can help you understand her background, projects, and skills. Feel free to ask me anything!",
      placeholder: "Ask Suha anything...",
      error: "Sorry, I encountered an error. Please try again later.",
      matchBtn: "JD Match Analysis"
    }
  },
  cn: {
    nav: {
      competencies: "核心胜任力",
      journey: "职场历程",
      projects: "项目案例",
      skills: "技能与工具",
      contact: "联系我",
    },
    hero: {
      locationLabel: "所在地",
      locationValue: "上海",
      workModeLabel: "工作模式",
      workModeValue: "支持Web3远程",
      statusLabel: "当前状态",
      statusValue: "可接受中东/北非外派",
      title: "连接文化语境与高效执行。",
      focusLabel: "专注于",
      focusValue: "全球 B2B 营销活动",
      specLabel: "擅长于",
      specValue: "中东及北非（MENA）市场策略",
      btnProjects: "精选项目",
      btnContact: "联系我",
    },
    competencies: {
      title: "核心胜任力",
      items: [
        {
          title: '项目管理与执行',
          list: ['端到端项目交付', '跨部门团队协作', '资源与时间线管理', '风险控制与现场运营']
        },
        {
          title: '战略规划与市场情报',
          list: ['市场进入策略 (GTM)', '区域市场分析 (MENA)', '市场与竞品调研', '产品与活动全生命周期管理']
        },
        {
          title: '跨文化沟通与多方统筹',
          list: ['内外部利益相关者对齐', '多语言商业沟通 (中/英/阿)', '关键客户与供应商管理', '国际展会与活动落地']
        }
      ]
    },
    journey: {
      title: "职场与教育历程",
      hint: "点击节点查看详情",
      tabLabels: {
        research: "研究与洞察",
        insights: "市场洞察",
        capabilities: "核心能力"
      },
      nodeDetails: nodeDetailsDataCn,
      items: [
        {
          type: "education",
          typeLabel: "教育背景",
          title: "国际商务硕士",
          organization: "伯明翰大学",
          location: "阿联酋，迪拜",
          period: "2024年10月 – 2025年11月",
          focus: "市场战略、Web3 生态、中东非地区体制环境",
          honor: "全额奖学金获得者",
          icon: "GraduationCap"
        },
        {
          type: "experience",
          typeLabel: "工作经验",
          title: "市场营销与增长战略",
          organization: "荷瑞集团",
          location: "中国，上海",
          period: "2023年8月 – 2025年6月",
          roles: [
            { title: "中东北非市场营销顾问（远程兼职）", period: "2025年3月 – 2025年6月" },
            { title: "市场助理 (实习)", period: "2023年8月 – 2024年8月" }
          ],
          detailedBullets: [
            { icon: "Layout", text: "更新并优化基于 WordPress 的网站内容，包括 Banner 设计、Logo 调整及版面视觉精修。" },
            { icon: "Search", text: "负责多个网站页面的英文 SEO (TDK) 优化、关键词规划及元描述撰写。" },
            { icon: "Mail", text: "策划并执行 EDM 邮件营销活动，负责文案撰写、视觉设计及排版。" },
            { icon: "Languages", text: "制作多语种 (中/英/阿) 营销材料、杂志排版及核心视觉资产。" },
            { icon: "Share2", text: "管理海外数字营销活动，覆盖 EDM、WhatsApp、Facebook 及 LinkedIn 渠道。" }
          ],
          stats: [
            { value: "45.6%", label: "预登记人数<br>同比增长" },
            { value: "76%", label: "观众画像中的<br>决策者占比" },
            { value: "1,000+", label: "中东非地区<br>新增访客数" },
            { value: "30%", label: "EDM 打开率<br>高用户参与度" }
          ],
          icon: "Briefcase"
        },
        {
          type: "education",
          typeLabel: "教育背景",
          title: "学士学位",
          organization: "上海外国语大学贤达经济人文学院",
          location: "中国，上海",
          period: "2020年9月 – 2024年6月",
          focus: "阿拉伯语与国际商务背景",
          honor: "多次获得优秀学生奖学金",
          icon: "GraduationCap"
        },
        {
          type: "education",
          typeLabel: "教育背景",
          title: "交换生项目",
          organization: "亚历山大大学",
          location: "埃及，亚历山大",
          period: "2022年9月 – 2023年6月",
          focus: "阿拉伯语语言与文化沉浸",
          honor: "平均学分绩点 (GPA) 排名第一",
          icon: "GraduationCap"
        }
      ]
    },
    projects: {
      title: "项目案例",
      web3Title: "Web3 市场战略与增长",
      hint: "点击箭头查看更多项目",
      web3Strategy: [
        {
          id: 'uae',
          num: '01',
          label: '调研',
          sidebarTitle: "阿联酋 Web3 女性参与度",
          sidebarTags: ['实证调查', '深度访谈', '包容性信号'],
          banner: "/images/Project 3-Institutional and Cultural Drivers of Women's Participation in the UAE WEB3 Sector.png",
          projectTag: '阶段 01 · 调研',
          fullTitle: "调研驱动策略：\n阿联酋与女性参与",
          subtitle: '混合方法 · 中东 Web3 · 2025',
          infographic: '/images/Project 3.png',
          infographicTag: 'Edited by AnyGen',
          blocks: [
            { icon: '📋', label: '方法论', badge: '50份问卷 + 5次访谈', text: '混合方法 · 入门 → 留存 → 晋升框架。' },
            { icon: '💡', label: '核心发现', badge: '银行服务 > 文化因素', text: '获得牌照后的银行服务接入是最大瓶颈，而非文化阻力。' },
            { icon: '→', label: '输入至', badge: '阶段 02 联盟设计', text: '定义了市场进入策略必须优先解决的服务不足群体。' }
          ]
        },
        {
          id: 'sandbox',
          num: '02',
          label: '策略',
          sidebarTitle: 'Sandbox × Yalla 联盟',
          sidebarTags: ['VARA 政策', '数据分析', '元宇宙协同'],
          banner: "/images/Project 1-Cooperative strategy between The SANDBOX & Yalla.png",
          projectTag: '阶段 02 · 策略',
          fullTitle: '平台协作策略：\nThe Sandbox & Yalla',
          subtitle: "波特五力模型 · 阿联酋市场进入 · 2024",
          infographic: '/images/Project 1.png',
          infographicTag: 'Edited by Canva',
          blocks: [
            { icon: '⚖️', label: '分析框架', badge: "波特五力模型", text: "VARA 作为准入推动者。Yalla 的 3899 万月活作为本地化护城河。" },
            { icon: '💡', label: '核心发现', badge: '本地化 = 护城河', text: '文化语言隔阂——而非区块链基建——是中东 Web3 普及的主要障碍。' },
            { icon: '→', label: '三阶段路线图', badge: '行动计划', text: '短期 NFT 发行 + 联合营销\n中期 内容护城河 + 社交层\n长期 合资企业 + 生态扩张', isList: true }
          ]
        },
        {
          id: 'binance',
          num: '03',
          label: '扩张',
          sidebarTitle: '币安全球策略',
          sidebarTags: ['PESTEL 分析', 'SWOT 分析', '合规映射'],
          banner: 'images/Project 2-Stategic Analysis and Recommendations for BINANCE.png',
          projectTag: '阶段 03 · 扩张',
          fullTitle: '交易所市场策略：\n币安案例项目',
          subtitle: 'PESTEL + 动态能力 · 全球策略 · 2024',
          infographic: '/images/Project 2.png',
          infographicTag: 'Edited by ChatGPT',
          blocks: [
            { icon: '🧩', label: '分析框架', badge: '动态能力', text: '在 43 亿美元 DOJ 和解及高管离职后应用 感知 / 捕捉 / 转型 框架。' },
            { icon: '💡', label: '核心发现', badge: '合规 = 护城河', text: '2.13 亿美元合规投资重构为 market-access 策略。Web3 钱包滞后是战略盲点。' },
            { icon: '📅', label: '36个月计划', badge: '时间线', text: '0–12月 组建 1000 人合规团队\n1–3年 5 款 DeFi 产品 + 区域办事处\n3年以上 日交易量百万级平台', isList: true }
          ]
        }
      ],
      web3Projects: [
        {
          category: "平台合作",
          title: "平台合作策略：The Sandbox × Yalla",
          description: "针对语音社交巨头 Yalla（3900万+用户）进军元宇宙的战略联盟分析。分析了 VARA 政策准入、阿联酋 340 亿美元的加密交易增长，以及通过“Dubaiverse”本地化场景实现的协同效应。",
          infographicCredit: "由 Canva 编辑",
          insights: ["VARA 政策准入策略", "Yalla 关键数据分析", "元宇宙协同价值", "行动路径：NFT 发行"]
        },
        {
          category: "市场进入规划 (GTM)",
          title: "交易所市场策略：币安案例项目",
          description: "利用 PESTEL/SWOT 框架深入剖析全球交易所龙头的市场策略。审视了其 2.13 亿美元的合规投资进展、MiCA 监管紧缩下的应对，以及 BNB Chain 和 Trust Wallet 的生态增长。",
          infographicCredit: "由 ChatGPT 编辑",
          insights: ["PESTEL 外部环境分析", "SWOT 内部优势分析", "合规与 MiCA 映射", "2024 扩张进程"]
        },
        {
          category: "市场与客户调研",
          title: "研究驱动策略：阿联酋女性在 Web3 的参与度",
          description: "基于证据的体制与文化驱动因素研究。确定了关键运营主题：作为障碍缓解因素的政策认知、项目准入渠道，以及家庭/社会期望对平台包容性信号的影响。",
          infographicCredit: "由 AnyGen 编辑",
          insights: ["实证调查与访谈", "制度机制分析", "运营主题洞察", "包容性信号研究"]
        }
      ],
      b2bTitle: "全球 B2B 营销战役",
      exhibitionTitle: "国际展会营销：上海国际水展 (WATERTECH CHINA) & 世环会 (WieTec)",
      channelStrategy: "渠道策略",
      case1: {
        tag: "案例 1",
        title: "eDM 邮件优化",
        desc: "高转化 eDM 设计案例研究",
        taskTitle: "任务 / 挑战",
        taskDesc: "在品牌信息高度冗余的限制下，实现高转化的 eDM 设计",
        painPoint: "在高文本量且要求不对文字做删减的情况下进行图文排版",
        limitation: "避免复杂的图片和表格被邮件客户端拦截的风险。",
        actionTitle: "行动 / 策略",
        actionDesc: "实施了以下多维度优化",
        action1: "<strong class='text-[#37352f]'>交互与布局：</strong> 重构视觉层级，采用“少图 + 高频 CTA”策略，利用色块代替大背景图。",
        action2: "<strong class='text-[#37352f]'>矩阵布局：</strong> 在所有模块中精准植入官网链接，缩短从浏览到转化的路径。",
        action3: "<strong class='text-[#37352f]'>AI 赋能：</strong> 建立“安全母版”，利用 AI 快速延展子版本以支持并发营销。",
        resultTitle: "结果 / 成效",
        metrics: {
          deliver: { 
            label: "送达率", 
            value: "90.35%", 
            avg: "行业平均: 98.1%", 
            status: "需维护",
            tooltip: "受战略性域名迁移及潜在客户数据库清洗影响。"
          },
          open: { label: "打开率", value: "30.18%", avg: "行业平均: 21.5%", delta: "+40% 领先" },
          ctr: { label: "点击率", value: "8.50%", avg: "行业平均: 2.6%", delta: "+220% 领先" }
        },
        impact: "在互动指标上超出 B2B 行业基准高达 220%，验证了线索分层与内容本地化的高质量策略 (来源: Mailchimp 2024)。"
      },
      case2: {
        tag: "案例 2",
        title: "eDM 本地化",
        desc: "RTL 适配与文化本地化",
        taskTitle: "Task / 挑战",
        taskDesc: "跨文化视觉重构：阿拉伯语图文内容的本地化设计",
        difficulty: "在不改变原有设计美感的前提下，处理针对 MENA 市场的 RTL（从右至左）排版逻辑。",
        req: "确保文本流、视觉焦点和交互元素符合当地阅读习惯。",
        actionTitle: "行动 / 策略",
        actionDesc: "敏捷设计支持与 RTL 适配方案",
        action1: "<strong class='text-[#37352f]'>工具协同：</strong> 灵活运用 Canva 和专业工具进行二次创作，严格遵循品牌视觉规范。",
        action2: "<strong class='text-[#37352f]'>本地化视觉校准：</strong> 镜像翻转视觉布局，确保 CTA、图标和信息流完美契合阿拉伯语母语者的直觉。",
        resultTitle: "结果 / 成效",
        impactTitle: "区域覆盖扩展与私域转化",
        impact1: "成功实现了品牌物料在 MENA 地区的深度覆盖，消除了语言和文化障碍。",
        impact2: "显著提升了网站流量以及 <strong class='text-[#166534]'>WhatsApp</strong> 等社交渠道的实时询盘响应率。"
      },
      digitalMatrix: {
        title: "数字与社交矩阵",
        subtitle: "内容营销（社交媒体与网站）",
        featuredVideo: "精选视频",
        adsSubheader: "Meta Ads, Google Ads, TikTok Ads, LinkedIn Ads, Website & Social Media Banners"
      },
      performance: {
        title: "Overall Performance Impact",
        dashboardTitle: "Exhibition Performance Analysis",
        opsTitle: "卓越运营与流程架构",
        cards: [
          { title: "CMS 精通", desc: "标准化 WordPress & Elementor 工作流，确保设计一致性。" },
          { title: "数字化自动化", desc: "AI 驱动的多渠道 EDM 和社交媒体内容工作流。" },
          { title: "MENA 运营", desc: "WhatsApp 私域管理及签证审批工作流协议。" }
        ],
        dashboard: {
          intlReach: "国际影响力",
          audienceQuality: "观众质量分布",
          productDemand: "产品需求趋势",
          regionalExp: "把握全球需求：中东北非 (MENA) 战略支点",
          signals: "前瞻性信号",
          yoyBadge: "同比 +45.6%",
          procurement: "采购/决策",
          engineering: "工程技术",
          others: "其他",
          growth: "增长",
          decisionMakers: "拥有决策权",
          openRate: "EDM 打开率",
          intlAttendance: "国际观众占比",
          annotationScale: "规模源于质量",
          annotationShift: "优质买家需求正向膜技术转移",
          catMembrane: "膜技术",
          catIndustrial: "工业水处理",
          catCivilian: "民用水处理"
        }
      },
      activationTitle: "区域市场活动落地",
      activation: {
        lang: "语言",
        role: "角色"
      },
      exhibitions: {
        e1: { 
          name: '第12届 AIB-MENA 会议 2024', 
          org: '伯明翰大学（迪拜校区）', 
          languages: ['英语', '中文'],
          roles: ['会议支持', '现场运营'] 
        },
        e2: { 
          name: '花间相遇——宋代雅集', 
          org: '中国驻迪拜总领事馆', 
          languages: ['中文', '英语', '阿拉伯语'],
          roles: ['活动支持', '语言支持', '现场运营'] 
        },
        e3: { 
          name: '2025华为全球数据中心设施峰会（迪拜）', 
          org: '华为', 
          languages: ['英语', '中文', '阿拉伯语'],
          roles: ['活动支持', '现场运营', '语言支持'] 
        },
        e4: { 
          name: '世环会｜上海国际水展 2024 & 2025', 
          org: '荷瑞集团', 
          languages: ['中文', '英语'],
          roles: ['活动支持', '语言支持'] 
        }
      }
    },
    exhibitionPerformance: {
      title: "展会绩效分析",
      sec1: {
        title: "展会规模概览",
        subtitle: "2023–2025",
        insight: "尽管展商规模较 2023 年峰值有所调整，但 2025 年海外观众数量翻倍，显示出国际化进程的结构性加速。",
        legendExhibitors: "参展商",
        legendOverseas: "海外观众"
      },
      sec2: {
        title: "海外增长与质量",
        subtitle: "突破",
        insight: "2025 年海外观众出席率实现结构性突破，达到总观众量的 8.6%。",
        annotation: "同比增长 +128%",
        tooltipBuyer: "三分之二的海外观众为直接买家，强化了极高的商业价值密度。"
      },
      sec3: {
        title: "买家质量结构",
        insight: "直接买家占观众总数的 66%，确保了极高的商业转化潜力。"
      },
      sec4: {
        title: "中东及北非地区聚焦",
        insight: "2025 年 MENA（中东及北非）地区占海外观众的 11%，完美契合展商向中东市场扩张的意图。",
        footprintTitle: "全球足迹趋势（国家）",
        shareTitle: "2025 区域份额",
        trendTitle: "MENA 战略支点趋势"
      },
      sec5: {
        title: "渠道绩效分析",
        insight: "自营数字渠道保持了具有竞争力的转化率，内部直接管理的成效与外包专业活动相当。",
        conversionTitle: "转化率",
        structureTitle: "线索结构",
        owned: "自营",
        outsourced: "外包"
      },
      summary: {
        title1: "规模稳固",
        desc1: "在保持 10万+ 流量池的同时优化展商质量。",
        title2: "国际渗透",
        desc2: "海外观众翻倍 (+128%)，证明了全球吸引力。",
        title3: "MENA 扩张",
        desc3: "战略支点成功，中东地区份额达到 11%。"
      }
    },
    skills: {
      title: "技能与工具",
      toolsTitle: "工具与软件",
      languagesTitle: "语言能力",
      regionalTitle: "区域专家",
      regionalDesc: "凭借专业的阿拉伯语沟通能力与深厚的跨文化洞察，架起<strong>中国与中东非地区 (MENA)</strong> 之间的商务桥梁。",
      regionalTags: ["市场进入", "本地化", "跨境贸易"],
      languages: [
        { language: '阿拉伯语', level: '专业工作水平', color: '#e59936' },
        { language: '英语', level: '专业工作水平', color: '#e59936' },
        { language: '中文', level: '母语', color: '#d3494b' },
      ]
    },
    contact: {
      tag: "保持联系",
      titleStart: "期待与您",
      titleEnd: "携手合作。",
      descStart: "",
      descHighlight: "欢迎合作机会",
      descEnd: "，以及前沿科技增长相关课题。",
      btnCopy: "复制邮箱",
      btnCopied: "邮箱已复制",
      orEmail: "或直接发送邮件：",
    },
    footer: {
      rights: "保留所有权利。",
    },
    aiChat: {
      title: "Suha - AI 助手",
      welcome: "你好呀，我是这个网页的助手Suha，帮助您了解网页中关于Yan的各个板块和信息。有任何不清楚的地方可以直接发给我。",
      placeholder: "向 Suha 提问...",
      error: "抱歉，我遇到了一些问题。请稍后再试。",
      matchBtn: "JD 匹配分析"
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
