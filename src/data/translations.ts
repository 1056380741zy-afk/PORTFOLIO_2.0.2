import { nodeDetailsDataEn, nodeDetailsDataCn } from './nodeDetails';

export const translations = {
  en: {
    homePage: {
      greetingArabic: "مرحبا، انا سها",
      greetingEnglish: "Hi, I’m Suha.",
      intro: "I work across international marketing and project operations, with experience in B2B exhibitions, multilingual campaigns and cross-company coordination. I connect channel strategy with hands-on execution, helping international projects move smoothly across Chinese and MENA business contexts.",
      experience: "Drag the panels on the right to explore more about me, or click the assistant in the bottom-right corner to ask anything 👉"
    },
    nav: {
      home: "Home",
      competencies: "Competencies",
      journey: "Journey",
      projects: "Projects",
      skills: "Skills",
      about: "About",
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
      btnProjects: "Projects",
      btnContact: "About",
    },
    competencies: {
      title: "Core Competencies",
      items: [
        {
          title: 'International Marketing & Channel Operations',
          list: ['B2B Campaigns', 'eDM', 'Social Media', 'Website Content']
        },
        {
          title: 'Project Operations & Cross-company Coordination',
          list: ['Timeline Delivery', 'Partner Alignment', 'On-site Execution', 'Issue Response']
        },
        {
          title: 'China–MENA Communication & Stakeholder Support',
          list: ['Trilingual Communication', 'Buyer Reception', 'Localization', 'Partner Support']
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
      title: "PROJECTS",
      web3Title: "MENA Web3 Research & Strategy",
      hint: "Click arrows to view more projects",
      web3Strategy: [
        {
          id: 'uae',
          num: '01',
          label: 'Independent Research',
          sidebarTitle: "Women’s Participation in UAE Web3",
          sidebarTags: ['Independent', 'Mixed Methods', 'User Insight'],
          banner: '/projects/web3/uae-women-banner.webp',
          projectTag: 'Independent Research Project',
          fullTitle: "Research-Driven Strategy: UAE & Women Participation",
          description: "Institutional, cultural and platform factors shaping women's participation in UAE Web3.",
          subtitle: 'Selected academic and strategy projects exploring users, partnerships and market expansion in the UAE and wider MENA ecosystem.',
          duration: 'Academic Research Project',
          focusLabel: 'QUESTION',
          focus: 'How do institutional, cultural and platform factors shape women’s entry, retention and advancement in the UAE Web3 ecosystem.',
          roleLabel: 'MY ROLE',
          role: 'Research framework · Survey and interview planning · Primary research · Insight synthesis',
          methodLabel: 'METHOD',
          method: 'Studied women’s participation in UAE Web3 through institutional, cultural, and platform factors. Collected survey and interview data, then grouped findings around access, recognition and platform inclusiveness.',
          skills: 'Mixed-method Research｜User Insight｜Inclusion Strategy',
          process: 'Survey responses · Interviews · Mixed-method analysis',
          output: 'A research report mapping barriers and support mechanisms related to access, recognition and platform inclusiveness, with implications for segmentation and inclusive user growth.',
          infographic: '/projects/web3/uae-women-infographic.webp',
          infographicTag: 'Edited by AnyGen',
          blocks: [
            { icon: '📋', label: 'METHOD', badge: 'Mixed methods', text: 'Survey responses and interviews · Entry → Retention → Advancement framework.' },
            { icon: '💡', label: 'KEY FINDING', badge: 'Banking > Culture', text: 'Post-licensing banking access is the tightest bottleneck — not cultural resistance.' },
            { icon: '→', label: 'FEEDS INTO', badge: 'Phase 02 Alliance Design', text: 'Defines the underserved segment any market entry strategy must address first.' }
          ]
        },
        {
          id: 'sandbox',
          num: '02',
          label: '',
          sidebarTitle: 'The Sandbox × Yalla Strategy',
          sidebarTags: ['Team Project', 'Partnership', 'Localization'],
          banner: '/projects/web3/sandbox-yalla-banner.webp',
          projectTag: 'Team Collaboration Project',
          fullTitle: 'Platform Collaboration Strategy: The Sandbox & Yalla',
          description: 'MENA market entry, social platform synergy and a lower-risk alliance route.',
          subtitle: 'Selected academic and strategy projects exploring users, partnerships and market expansion in the UAE and wider MENA ecosystem.',
          duration: 'Team Collaboration Project',
          focusLabel: 'OBJECTIVE',
          focus: 'Evaluate how a partnership with Yalla could support The Sandbox’s localized market entry and ecosystem growth across MENA.',
          roleLabel: 'MY CONTRIBUTION',
          role: 'MENA market research · Partnership fit analysis · Localization risks · Strategy coordination',
          methodLabel: 'METHOD',
          method: 'Analysed The Sandbox’s MENA entry challenges across users, social engagement, culture, regulation, and growth. Evaluated Yalla Group’s fit and compared alliance, marketing, content, and future JV options.',
          skills: 'Partnership Analysis｜Localization',
          process: 'Market-entry analysis · Partnership-fit assessment · Risk mapping',
          output: 'A staged partnership roadmap moving from lower-risk pilots toward localized operations, covering community activation, content collaboration, user conversion and execution risks.',
          infographic: '/projects/web3/sandbox-infographic.webp',
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
          label: '',
          sidebarTitle: 'Binance Expansion & Compliance',
          sidebarTags: ['Team Project', 'Regulation', 'Compliance'],
          banner: '/projects/web3/binance-banner.webp',
          projectTag: 'Team Collaboration Project',
          fullTitle: 'Exchange Market Strategy: Binance Case Project',
          description: 'Regulatory, platform and regional signals for exchange expansion strategy.',
          subtitle: 'Selected academic and strategy projects exploring users, partnerships and market expansion in the UAE and wider MENA ecosystem.',
          duration: 'Team Collaboration Project',
          focusLabel: 'OBJECTIVE',
          focus: 'Assess expansion opportunities and regulatory constraints while balancing market growth, trust, compliance and localization.',
          roleLabel: 'MY CONTRIBUTION',
          role: 'Regional research · PESTEL and SWOT support · Regulatory analysis · Compliance mapping',
          methodLabel: 'METHOD',
          method: 'Analysed Binance’s global expansion through PESTEL and SWOT. Assessed platform strengths, regulatory pressure, market opportunities, compliance risks, and regional business conditions.',
          skills: 'Compliance Mapping｜Strategic Analysis',
          process: 'PESTEL · SWOT · Regional regulation comparison · Compliance mapping',
          output: 'A strategic analysis distinguishing growth-ready and cautious-entry markets, with proposed directions for balancing expansion, regulatory readiness and local operating conditions.',
          infographic: '/projects/web3/binance-infographic.webp',
          infographicTag: 'Edited by ChatGPT',
          blocks: [
            { icon: '🧩', label: 'FRAMEWORK', badge: 'Dynamic Capabilities', text: 'Sensing / Seizing / Transforming applied post $4.3B DOJ settlement and executive exodus.' },
            { icon: '💡', label: 'KEY FINDING', badge: 'Compliance = moat', text: '$213M compliance investment reframed as market-access strategy. Web3 Wallet lag = strategic blind spot.' },
            { icon: '📅', label: 'PROPOSED DIRECTION', badge: 'Recommendation', text: 'Strengthen compliance capability\nPrioritize regulation-ready markets\nLocalize operating and trust-building strategy', isList: true }
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
        taskTitle: "TASK & CHALLENGE",
        taskDesc: "Achieve high-conversion eDM design under the constraint of highly redundant brand information.",
        painPoint: "Stakeholders required excessive content per issue, with strict prohibitions on text reduction.",
        limitation: "Avoid the risk of email clients blocking complex images and tables.",
        actionTitle: "ACTION & STRATEGY",
        actionDesc: "Implemented the following multi-dimensional optimizations",
        action1: "<strong class='text-[#37352f]'>Interaction & Layout:</strong> Restructured visual hierarchy using 'Limited Image + High-Frequency CTA' strategy, utilizing color blocks instead of large backgrounds.",
        action2: "<strong class='text-[#37352f]'>Matrix Placement:</strong> Precisely embedded Website Links in all modules to shorten the path from viewing to conversion.",
        action3: "<strong class='text-[#37352f]'>AI Empowerment:</strong> Established a 'Safe Master Template' and used AI to rapidly extend sub-versions for concurrent marketing.",
        resultTitle: "RESULT",
        metrics: {
          deliver: { 
            label: "Click-to-registration Rate", 
            value: "26.07%", 
            avg: "Click-to-registration from eDM traffic", 
            delta: "Direct result"
          },
          open: { label: "Open Rate", value: "30.18%", avg: "Campaign audience engagement", delta: "High engagement" },
          ctr: { label: "CTR", value: "8.50%", avg: "Direct click-through from eDM", delta: "Direct result" }
        },
        impact: "The eDM flow produced measurable direct engagement and click-to-registration results, supporting a more traceable conversion path from campaign content to visitor registration."
      },
      case2: {
        tag: "Case 2",
        title: "eDM Localization",
        desc: "RTL Adaptation & Cultural Localization",
        taskTitle: "TASK & CHALLENGE",
        taskDesc: "Localization design for Arabic graphic content.",
        difficulty: "Handle RTL (Right-to-Left) layout logic for the MENA market without altering the original design aesthetic.",
        req: "Ensure text flow, visual focus, and interactive elements align with local reading habits.",
        actionTitle: "ACTION & STRATEGY",
        actionDesc: "Agile Design Support & RTL Adaptation Scheme",
        action1: "<strong class='text-[#37352f]'>Tool Synergy:</strong> Flexibly utilized Canva and professional tools for secondary creation, strictly following brand visual guidelines.",
        action2: "<strong class='text-[#37352f]'>Localized Visual Calibration:</strong> Mirrored visual layouts to ensure CTAs, icons, and information flow perfectly match the intuition of native Arabic speakers.",
        resultTitle: "RESULT",
        impactTitle: "Regional Coverage Expansion & Private Domain Conversion",
        impact1: "Successfully achieved deep coverage of brand materials in the MENA region, eliminating language and cultural barriers.",
        impact2: "Significantly boosted website traffic and real-time inquiry response rates on social channels like WhatsApp."
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
        { language: 'Arabic', level: 'Professional Proficiency', color: '#f5b002' },
        { language: 'English', level: 'Professional Proficiency', color: '#f5b002' },
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
    aboutBoard: {
      postcard: {
        intro: "\"An explorer navigating the intersections of cross-cultural strategy and digital execution.\"",
        inspired: "I'm inspired by the infinite possibilities of merging worlds.",
        signature: "— Suha",
        wechatLabel: "AynaSuha"
      },
      hint: "Click and drag cards to explore"
    },
    footer: {
      rights: "All Rights Reserved.",
    },
    aiChat: {
      title: "AI Assistant",
      welcome: "Hi! I'm Suha's web assistant. I can help you understand her background, projects, and skills. Feel free to ask me anything!",
      placeholder: "Ask about Suha’s experience or projects...",
      error: "Sorry, I encountered an error. Please try again later.",
      matchBtn: "JD Match Analysis"
    }
  },
  cn: {
    homePage: {
      greetingArabic: "مرحبا، انا سها",
      greetingEnglish: "Hi, I’m Suha.",
      intro: "我拥有国际市场营销与项目运营经验，参与过大型B2B展会、多语言营销及跨企业协作。我擅长将渠道策略与实际执行衔接起来，支持国际项目在中国与中东商业环境中顺利推进。\n在多语言、多合作方与高节奏的项目环境中，我能够持续推进营销内容、资源协同与现场交付。",
      experience: "拖动右侧的版块查看相关信息，或点击右下角的助手询问任何内容 👉"
    },
    nav: {
      home: "Home",
      competencies: "Competencies",
      journey: "Journey",
      projects: "Projects",
      skills: "Skills",
      about: "About",
      contact: "Contact",
    },
    hero: {
      locationLabel: "所在地",
      locationValue: "上海",
      workModeLabel: "工作模式",
      workModeValue: "支持Web3远程",
      statusLabel: "当前状态",
      statusValue: "接受中东/北非外派",
      title: "连接文化语境与高效执行。",
      focusLabel: "专注于",
      focusValue: " B2B 营销活动",
      specLabel: "擅长",
      specValue: "中东及北非（MENA）市场策略",
      btnProjects: "Projects",
      btnContact: "关于我",
    },
    competencies: {
      title: "核心胜任力",
      items: [
        {
          title: '国际市场营销与渠道运营',
          list: ['B2B营销', '电子邮件营销', '社交媒体', '网站内容']
        },
        {
          title: '项目运营与跨企业协同',
          list: ['进度执行', '合作方协调', '现场支持', '突发问题处理']
        },
        {
          title: '中国—中东沟通与利益相关者支持',
          list: ['三语沟通', '买家接待', '内容本地化', '合作方支持']
        }
      ]
    },
    journey: {
      title: "Journey",
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
      title: "PROJECTS",
      web3Title: "中东 Web3 研究与战略",
      hint: "点击箭头查看更多项目",
      web3Strategy: [
        {
          id: 'uae',
          num: '01',
          label: '独立研究',
          sidebarTitle: "阿联酋 Web3 行业中的女性参与",
          sidebarTags: ['独立研究', '混合研究', '用户洞察'],
          banner: '/projects/web3/uae-women-banner.webp',
          projectTag: '独立研究项目',
          fullTitle: "调研驱动策略：阿联酋与女性参与",
          description: '制度、文化与平台因素如何影响阿联酋 Web3 女性参与。',
          subtitle: '围绕阿联酋及更广泛中东生态中的用户、平台合作与市场扩张展开的研究及战略项目。',
          duration: '学术研究项目',
          focusLabel: '研究问题',
          focus: '制度、文化与平台因素如何影响女性进入、留存并发展于阿联酋 Web3 生态？',
          roleLabel: '我的职责',
          role: '研究框架 · 问卷与访谈规划 · 一手研究 · 洞察提炼',
          methodLabel: '研究方法',
          method: '围绕 UAE Web3 行业中的女性参与问题，将研究拆成三个方向：制度支持、文化影响和技术平台体验。通过问卷和访谈收集一手资料，并整理出政策认知、资金和银行准入、职业认可、学习成本和平台包容性等核心主题。',
          skills: '混合研究｜用户洞察｜包容性增长策略',
          process: '问卷调查 · 访谈记录 · 混合研究方法',
          output: '形成研究报告，梳理与准入、认可及平台包容性相关的主要障碍与支持机制，并提炼其对用户细分及包容性增长的启示。',
          infographic: '/projects/web3/uae-women-infographic.webp',
          infographicTag: 'Edited by AnyGen',
          blocks: [
            { icon: '📋', label: '方法论', badge: '混合研究', text: '问卷与访谈 · 进入 → 留存 → 发展框架。' },
            { icon: '💡', label: '核心发现', badge: '银行服务 > 文化因素', text: '获得牌照后的银行服务接入是最大瓶颈，而非文化阻力。' },
            { icon: '→', label: '输入至', badge: '阶段 02 联盟设计', text: '定义了市场进入策略必须优先解决的服务不足群体。' }
          ]
        },
        {
          id: 'sandbox',
          num: '02',
          label: '',
          sidebarTitle: 'The Sandbox × Yalla 合作战略',
          sidebarTags: ['团队项目', '合作分析', '本地化'],
          banner: '/projects/web3/sandbox-yalla-banner.webp',
          projectTag: '团队合作项目',
          fullTitle: '平台协作策略：The Sandbox & Yalla',
          description: '围绕 MENA 市场进入、社交平台协同与低风险联盟路线展开。',
          subtitle: '围绕阿联酋及更广泛中东生态中的用户、平台合作与市场扩张展开的研究及战略项目。',
          duration: '团队合作项目',
          focusLabel: '项目目标',
          focus: '评估与 Yalla 的合作如何支持 The Sandbox 在中东市场的本地化进入及生态增长。',
          roleLabel: '我的贡献',
          role: '中东市场研究 · 合作匹配度分析 · 本地化风险 · 战略协调',
          methodLabel: '研究方法',
          method: '分析 The Sandbox 进入 MENA 市场时需要解决的本地用户触达、社交场景、文化适配、监管环境和平台增长问题。随后评估 Yalla Group 的匹配度，并比较非股权战略联盟、联合营销、内容合作和未来合资等合作方式。',
          skills: '合作分析｜本地化',
          process: '市场进入分析 · 合作匹配度评估 · 风险梳理',
          output: '形成分阶段合作路线，从低风险试点逐步推进至本地化运营，覆盖社区激活、内容合作、用户转化与执行风险。',
          infographic: '/projects/web3/sandbox-infographic.webp',
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
          label: '',
          sidebarTitle: 'Binance 扩张与合规分析',
          sidebarTags: ['团队项目', '监管研究', '合规分析'],
          banner: '/projects/web3/binance-banner.webp',
          projectTag: '团队合作项目',
          fullTitle: '交易所市场策略：币安案例项目',
          description: '从监管、平台能力和区域机会判断交易所扩张路径。',
          subtitle: '围绕阿联酋及更广泛中东生态中的用户、平台合作与市场扩张展开的研究及战略项目。',
          duration: '团队合作项目',
          focusLabel: '项目目标',
          focus: '评估市场扩张机会与监管约束，并平衡增长、信任、合规及本地化要求。',
          roleLabel: '我的贡献',
          role: '区域研究 · PESTEL 与 SWOT 支持 · 监管分析 · 合规映射',
          methodLabel: '研究方法',
          method: '从政治、经济、社会、技术、环境和法律因素出发，分析 Binance 在不同地区扩张时受到的外部影响。结合 SWOT 等方法，梳理平台优势、监管压力、市场机会和合规风险，并比较不同区域的监管态度和业务环境。',
          skills: '合规映射｜战略分析',
          process: 'PESTEL · SWOT · 区域监管比较 · 合规映射',
          output: '形成战略分析，区分适合增长与需要谨慎进入的市场，并提出平衡扩张、监管准备度及本地运营条件的建议方向。',
          infographic: '/projects/web3/binance-infographic.webp',
          infographicTag: 'Edited by ChatGPT',
          blocks: [
            { icon: '🧩', label: '分析框架', badge: '动态能力', text: '在 43 亿美元 DOJ 和解及高管离职后应用 感知 / 捕捉 / 转型 框架。' },
            { icon: '💡', label: '核心发现', badge: '合规 = 护城河', text: '2.13 亿美元合规投资重构为 market-access 策略。Web3 钱包滞后是战略盲点。' },
            { icon: '📅', label: '建议方向', badge: '研究建议', text: '强化合规能力\n优先进入监管准备度较高的市场\n推进运营与信任建设本地化', isList: true }
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
      b2bTitle: "海外 B2B 营销",
      exhibitionTitle: "国际展会营销：上海国际水展 (WATERTECH CHINA) & 世环会 (WieTec)",
      channelStrategy: "渠道策略",
      case1: {
        tag: "案例 1",
        title: "eDM 邮件优化",
        desc: "高转化 eDM 设计案例研究",
        taskTitle: "TASK & CHALLENGE",
        taskDesc: "在品牌信息高度冗余的限制下，实现高转化的 eDM 设计",
        painPoint: "在高文本量且要求不对文字做删减的情况下进行图文排版",
        limitation: "需要避免复杂图片和表格被邮件客户端拦截的风险。",
        actionTitle: "ACTION & STRATEGY",
        actionDesc: "实施了以下多维度优化",
        action1: "<strong class='text-[#37352f]'>交互与布局：</strong> 重构视觉层级，采用“少图 + 高频 CTA”策略，利用色块代替大背景图。",
        action2: "<strong class='text-[#37352f]'>矩阵布局：</strong> 在所有模块中精准植入官网链接，缩短从浏览到转化的路径。",
        action3: "<strong class='text-[#37352f]'>AI 赋能：</strong> 建立“母版”，利用 AI 快速延展子版本以支持并发营销。",
        resultTitle: "RESULT",
        metrics: {
          deliver: { 
            label: "点击后预登记率", 
            value: "26.07%", 
            avg: "来自 eDM 流量的点击后预登记", 
            delta: "直接结果"
          },
          open: { label: "打开率", value: "30.18%", avg: "项目受众互动表现", delta: "高互动" },
          ctr: { label: "点击率", value: "8.50%", avg: "来自 eDM 的直接点击", delta: "直接结果" }
        },
        impact: "该 eDM 流程形成了可追踪的直接互动与点击后预登记结果，证明内容触达、CTA 路径与观众登记之间的转化链路更清晰。"
      },
      case2: {
        tag: "案例 2",
        title: "eDM 本地化",
        desc: "RTL 适配与文化本地化",
        taskTitle: "TASK & CHALLENGE",
        taskDesc: "跨文化视觉重构：阿拉伯语图文内容的本地化设计",
        difficulty: "在要求不改变原有设计的前提下，处理针对 MENA 市场的 RTL（从右至左）排版逻辑。",
        req: "确保文本流、视觉焦点和交互元素符合当地阅读习惯。",
        actionTitle: "ACTION & STRATEGY",
        actionDesc: "敏捷设计支持与 RTL 适配方案",
        action1: "<strong class='text-[#37352f]'>工具协同：</strong> 灵活运用 Canva 和专业工具进行二次创作，严格遵循品牌视觉规范。",
        action2: "<strong class='text-[#37352f]'>本地化视觉校准：</strong> 镜像翻转视觉布局，确保 CTA、图标和信息流完美契合阿拉伯语母语者的直觉。",
        resultTitle: "RESULT",
        impactTitle: "区域覆盖扩展与私域转化",
        impact1: "成功实现了品牌物料在 MENA 地区的深度覆盖，消除了语言和文化障碍。",
        impact2: "显著提升了网站流量以及WhatsApp等社交渠道的实时询盘响应率。"
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
        insight: "展商规模较 2023 年峰值有所调整， 2025 年海外观众数量翻倍，显示出国际化进程的结构性加速。",
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
      regionalDesc: "凭借专业的阿拉伯语沟通能力与深厚的跨文化洞察，架起中国与<strong>中东及北非地区 (MENA)</strong> 之间的商务桥梁。",
      regionalTags: ["市场进入", "本地化", "跨境贸易"],
      languages: [
        { language: '阿拉伯语', level: '专业工作水平', color: '#f5b002' },
        { language: '英语', level: '专业工作水平', color: '#f5b002' },
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
    aboutBoard: {
      postcard: {
        intro: "“跨文化战略与数字执行领域的探索者。”",
        inspired: "我致力于通过跨界的视角，建立连接与创造力。",
        signature: "— Suha",
        wechatLabel: "AynaSuha"
      },
      hint: "拖拽卡片探索更多"
    },
    footer: {
      rights: "保留所有权利。",
    },
    aiChat: {
      title: "AI 助手",
      welcome: "你好呀，我是这个网页的助手，帮助您了解网页中关于 Suha 的各个板块和信息。有任何不清楚的地方可以直接发给我。",
      placeholder: "询问Suha的经历或项目...",
      error: "抱歉，我遇到了一些问题。请稍后再试。",
      matchBtn: "JD 匹配分析"
    }
  }
};
