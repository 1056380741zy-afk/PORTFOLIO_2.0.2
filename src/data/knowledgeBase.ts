export const SuhaKnowledgeBase = {
  siteAssistantScope: {
    canAnswer: [
      "Suha's education, languages, regional background and relocation fit",
      "Project summaries and evidence shown in the portfolio",
      "B2B exhibition marketing, MENA buyer recruitment, event operations and vendor coordination",
      "Web3 research and strategy projects covering UAE participation, The Sandbox x Yalla and Binance",
      "JD matching based on the facts in this portfolio"
    ],
    cannotAnswerReliably: [
      "Information not present in the portfolio or knowledge base",
      "Live company/news/market updates",
      "Private documents, unlisted metrics or confidential project details"
    ]
  },
  projectPages: [
    {
      route: "/projects/preview",
      title: "Selected Projects / Project Register",
      intent: "Overview page for three active project files.",
      answerFocus: [
        "Explain the three project groups before going into details.",
        "Card 01: International Exhibition Campaigns, WATERTECH CHINA and WieTec.",
        "Card 02: Regional Market Activation, including academic, government, technology and industrial events in Dubai and Shanghai.",
        "Card 03: MENA Web3 Research and Strategy, including UAE participation research, The Sandbox x Yalla and Binance."
      ],
      facts: [
        "The project section is organized as a portfolio register, not a chronological resume.",
        "The three files map to Suha's B2B marketing execution, regional event operations and Web3 research/strategy capability."
      ]
    },
    {
      route: "/projects/preview/exhibition",
      title: "International Exhibition Campaigns: WATERTECH CHINA & WieTec",
      intent: "B2B exhibition marketing and operations case centered on overseas visitor growth, MENA buyer acquisition and digital channel execution.",
      answerFocus: [
        "Use this page when users ask about WATERTECH, WieTec, exhibition marketing, eDM, buyer recruitment, conversion metrics or B2B marketing.",
        "Answer with concrete task-action-result details from the exhibition case.",
        "Do not replace this case with Web3 strategy examples unless the user explicitly asks to compare them."
      ],
      facts: [
        "Suha worked on international B2B exhibition campaigns for WATERTECH CHINA and WieTec, with a MENA-facing marketing and visitor acquisition focus.",
        "eDM optimization challenge: stakeholders required high information density and strict content preservation, while the design still had to avoid email-client blocking risks.",
        "eDM actions: rebuilt visual hierarchy with a limited-image and high-frequency CTA approach, used color blocks instead of heavy background images, embedded website links across modules, and created a safe master template that could be extended with AI-supported sub-versions.",
        "eDM direct metrics: open rate 30.18%, CTR 8.50%, click-to-registration rate from eDM traffic 26.07%.",
        "Arabic localization challenge: adapt MENA-facing visual content for RTL reading without breaking the original brand aesthetic.",
        "Localization actions: used Canva and professional tools for secondary creation, mirrored layouts for Arabic reading habits, and calibrated CTA/icon/information flow for local users.",
        "Digital and social matrix included Meta Ads, Google Ads, TikTok Ads, LinkedIn Ads, website content and social media banners.",
        "Performance context: overseas visitors reached 8,221 in 2025, up 128% year over year; MENA share of overseas participation reached 11%; two-thirds of overseas attendees were direct buyers.",
        "Channel performance data: Website 56.0%, Call Center 54.2%, WhatsApp 48.9%, eDM 43.3%, TikTok 3.1%."
      ]
    },
    {
      route: "/projects/preview/activation",
      title: "Regional Market Activation",
      intent: "Regional event execution case covering on-site operations, multilingual support and stakeholder coordination.",
      answerFocus: [
        "Use this page when users ask about event operations, Dubai events, Huawei GDC, consulate event, AIB-MENA, on-site execution or language support.",
        "Show how Suha handled registration, guest communication, staff allocation, VIP reception and real-time issue response.",
        "If asked about marketing conversion metrics, point users to the exhibition page."
      ],
      facts: [
        "AIB Middle East & North Africa 2024 Chapter Conference: supported an academic conference hosted by University of Birmingham Dubai, serving 130+ delegates from 31 countries; work covered registration workflows, attendee check-in, venue setup, session coordination and Chinese-English communication.",
        "Encounter Among Blossoms Song Dynasty Culture Event: supported a cultural exchange event hosted by the Consulate-General of China in Dubai for 150+ international guests; work covered Chinese-English-Arabic communication, guest reception, guidance, venue arrangement and event coordination.",
        "Huawei Global Data Center Facility Summit 2025 Dubai: supported a technology summit with 500+ experts, leaders and partners; coordinated 30+ international staff, managed allocation across event areas, supported VIP reception and real-time issue handling.",
        "WieTec / WATERTECH CHINA 2024 and 2025: supported international water-industry exhibition operations, visitor services, multilingual assistance for overseas exhibitors and visitors, on-site coordination and VIP reception."
      ]
    },
    {
      route: "/projects/preview/web3",
      title: "MENA Web3 Research & Strategy",
      intent: "Research and strategy case page for UAE Web3 participation, platform collaboration and exchange expansion/compliance.",
      answerFocus: [
        "Use this page when users ask about Web3, UAE research, women participation, The Sandbox, Yalla, Binance, PESTEL, SWOT, compliance or MENA market entry.",
        "Keep the three Web3 projects distinct; do not collapse them into one generic Web3 answer.",
        "Mention Suha's role and research method before conclusions when users ask what she actually did."
      ],
      facts: [
        "UAE women participation research question: how institutional, cultural and platform factors shape women's entry, retention and advancement in the UAE Web3 ecosystem.",
        "UAE research role: research framework, survey and interview planning, primary research and insight synthesis. Method included survey responses, interviews and mixed-method analysis around access, recognition and platform inclusiveness.",
        "UAE research output: mapped barriers and support mechanisms related to access, recognition and platform inclusiveness, with implications for segmentation and inclusive user growth. Key finding: post-licensing banking access was a tighter bottleneck than cultural resistance.",
        "The Sandbox x Yalla objective: evaluate how a partnership with Yalla could support The Sandbox's localized market entry and ecosystem growth across MENA.",
        "The Sandbox role: MENA market research, partnership-fit analysis, localization risk analysis and strategy coordination. The work compared non-equity strategic alliance, joint marketing, content collaboration and future JV options.",
        "The Sandbox output: staged partnership roadmap from lower-risk pilots toward localized operations, covering community activation, content collaboration, user conversion and execution risks. Key finding: cultural-linguistic gap, not blockchain infrastructure, was the main barrier to MENA Web3 adoption.",
        "Binance objective: assess expansion opportunities and regulatory constraints while balancing growth, trust, compliance and localization.",
        "Binance role: regional research, PESTEL and SWOT support, regulatory analysis and compliance mapping.",
        "Binance output: strategic analysis distinguishing growth-ready and cautious-entry markets, with recommendations to strengthen compliance capability, prioritize regulation-ready markets and localize operating/trust-building strategy."
      ]
    }
  ],
  web3Projects: [
    {
      id: "web3_research_uae",
      title: "UAE Web3 Sector Participation Research",
      keywords: ["Data Analysis", "Market Research", "Policy & Compliance", "Mixed-Methods", "NVivo", "Web3 女性参与度", "Women's Participation in UAE Web3"],
      pillar: "The System Builder",
      story: "主导阿联酋 Web3 行业市场调研。采用混合研究方法（N=50问卷及深度半结构化访谈），使用 NVivo 进行数据清洗与主题编码。提炼出 Web3 平台落地阿联酋的核心痛点（合规成本、银行通道对接、本地信任成本），并为企业与政策制定者输出分层入场策略与数据追踪指标。"
    },
    {
      id: "web3_consulting_sandbox",
      title: "The Sandbox MENA Market Entry Strategy",
      keywords: ["Market Entry", "Strategic Alliance", "Web3 Consulting", "Localization", "B2B Partnership", "Sandbox × Yalla 联盟"],
      pillar: "The Cultural Bridge",
      story: "针对 The Sandbox 进入阿联酋市场出具战略咨询方案。通过波特五力模型分析中东 Web3 生态，针对其本地化运营经验不足的痛点，设计了与中东本土社交巨头 Yalla Group（3899万MAU）建立非股权战略联盟（Non-equity Strategic Alliance）的商业路径，实现全球元宇宙基础设施与中东本土语音社交生态的商业闭环。"
    },
    {
      id: "web3_strategy_binance",
      title: "Binance Global Strategic Analysis",
      keywords: ["Strategic Planning", "Compliance", "Competitor Analysis", "PESTEL", "SWOT", "币安全球策略"],
      pillar: "The Agile PM",
      story: "基于动态能力理论（Dynamic Capabilities Theory）对币安（Binance）面临的全球合规压力与高管流失危机进行商业定性分析。输出 3 年期战略执行路径，涵盖设立本地合规独立董事会、部署 Web3 钱包生态以及在中东等核心市场通过传统金融通道获取牌照的业务拓展指南。"
    }
  ],
  b2bExperiences: [
    {
      id: "b2b_watertech",
      title: "WATERTECH CHINA MENA Marketing",
      keywords: ["Vendor Management", "B2B Lead Gen", "A/B Testing", "Data-driven", "Cross-border Coordination"],
      pillar: "The Cultural Bridge",
      story: "负责阿联酋与沙特市场的 B2B 买家定向招募。统筹数字营销机构、数据呼叫中心等多层级供应商。针对复杂工业设备（如 POU 净水处理）建立全英文标准术语库以跨越沟通壁垒。通过 EDM A/B 测试优化投放策略，实现单一展期内海外观众同比增加 128%（达到 8221 人次），中东买家占比从 3% 提升至 11%。"
    },
    {
      id: "b2b_huawei",
      title: "Huawei Global Data Center Forum Dubai",
      keywords: ["Crisis Management", "Resource Allocation", "Onsite Operations", "Agile Execution"],
      pillar: "The Agile PM",
      story: "现场统筹 30 余名外籍员工。面对突发性人员短缺与高压流程管控需求，建立基于 WhatsApp 的敏捷备用签到与数据流转机制。动态重组现场人力资源，优先保障 VIP 迎宾与核心登记环节，确保跨国千人级高规格峰会核心流程零中断。"
    },
    {
      id: "b2b_sop",
      title: "Digital Marketing & Operations SOP Build",
      keywords: ["SOP Development", "Financial Compliance", "AI Integration", "Process Optimization"],
      pillar: "The System Builder",
      story: "在出海营销团队从 1 人扩张至 8 人的成长期，从 0 到 1 搭建标准化业务运转体系（SOP）。整合 K3 星蝶云采购审批与发票合规审查机制，并在业务流中植入自动化 AI 内容生成工具。消除跨部门财务对接的合规风险，并将新员工上手时间大幅缩短，整体业务执行效率提升 50%。"
    },
    {
      id: "b2b_diplomacy",
      title: "Consulate-General Cultural Event",
      keywords: ["Trilingual", "Cross-cultural Communication", "Stakeholder Management"],
      pillar: "The Cultural Bridge",
      story: "在迪拜总领事馆文化活动中，为 150 余名外国代表提供中英阿三语翻译。降维解析复杂历史与文化概念，保障跨部门及多国代表团的信息精准传达与议程推进。"
    }
  ]
};
