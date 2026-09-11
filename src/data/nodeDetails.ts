export type JourneyCityId = 'shanghai' | 'alexandria' | 'dubai';

export type JourneyRole = {
  title: string;
  period: string;
  isPrimary?: boolean;
};

export type JourneyExperience = {
  company: string;
  roles: JourneyRole[];
};

export type JourneyEducation = {
  school: string;
  subSchool?: string;
  degree: string;
  period: string;
  focus?: string;
  honor?: string;
};

export type JourneyImpactStat = {
  value: string;
  label: string;
  theme?: 'purple' | 'yellow';
};

export type JourneyImpact = {
  title: string;
  desc: string;
  statsType?: 'boxes' | 'tags';
  stats?: JourneyImpactStat[];
  tags?: string[];
};

export type JourneyNodeDetails = {
  experiences?: JourneyExperience[];
  educations?: JourneyEducation[];
  impacts?: JourneyImpact[];
};

export type JourneyNodeDetailsMap = Record<JourneyCityId, JourneyNodeDetails>;

export const nodeDetailsDataEn =
{
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
        degree: "BA in Arabic",
        period: "Sep 2020 – Jun 2024",
        focus: "Arabic and International Business background · GPA 3.7 / 4.0",
        honor: "Multiple Academic Excellence Scholarships"
      }
    ],
    impacts: [
      {
        title: "Exhibition Overseas Audience Growth",
        desc: "Supported multilingual marketing, partner coordination and buyer-facing operations for WATERTECH CHINA and WieTec, contributing to the exhibitions’ international audience growth.",
        statsType: "tags",
        tags: ["+128% Audience Volume", "175+ Countries"]
      },
      {
        title: "Traffic, Content & Growth Engine",
        desc: "Delivered English SEO, eDM and WhatsApp operations that connected content production with measurable traffic, registration and MENA audience outcomes.",
        statsType: "tags",
        tags: ["+200 Daily Visits", "3,000+ Effective Target-region Reach"]
      }
    ]
  },
  dubai: {
    educations: [
      {
        school: "University of Birmingham",
        subSchool: "Dubai Campus",
        degree: "MSc International Business",
        period: "Sep 2024 – Jan 2026",
        focus: "International Business · GPA 3.5 / 4.0",
        honor: "Full Scholarship Recipient"
      }
    ],
    impacts: [
      {
        title: "Large-scale International Summit Operations",
        desc: "Coordinated 30+ overseas staff across VIP reception, logistics and technical-session support in a fast-moving summit environment."
      },
      {
        title: "Cross-cultural Multilingual Reception",
        desc: "Provided Chinese, English and Arabic communication and guest support across government cultural and international academic events in Dubai."
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
        focus: "Arabic Language & Cultural Immersion · GPA 4.0 / 4.0",
        honor: "Ranked 1st · Academic Excellence Certificate"
      }
    ],
    impacts: [
      {
        title: "Perfect Academic Achievement",
        desc: "Achieved a perfect GPA (4.0/4.0) during the exchange program in Egypt, ranking 1st in the comprehensive evaluation and receiving the Academic Excellence Certificate from Alexandria University.",
        statsType: "tags",
        tags: ["GPA 4.0 / 4.0", "Ranked 1st", "Academic Excellence"]
      },
      {
        title: "Deep Cultural Immersion & Local-language Development",
        desc: "Built practical Arabic communication through academic study and daily life in Egypt, covering Modern Standard Arabic and everyday Egyptian Arabic while developing first-hand cultural understanding.",
        statsType: "boxes",
        stats: [
          { value: "MSA + Egyptian", label: "Dual-Track Linguistic Capability", theme: "yellow" }
        ]
      }
    ]
  }
} satisfies JourneyNodeDetailsMap;

export const nodeDetailsDataCn =
{
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
        focus: "阿拉伯语与国际商务背景 · GPA 3.7 / 4.0",
        honor: "多次获得优秀学生奖学金"
      }
    ],
    impacts: [
      {
        title: "展会海外高质量增长",
        desc: "参与WATERTECH CHINA与WieTec的多语言营销、合作方协调及海外买家支持，助力展会扩大国际观众规模与全球覆盖。",
        statsType: "tags",
        tags: ["海外观众规模 +128%", "覆盖175+国家和地区"]
      },
      {
        title: "流量与内容引擎架构",
        desc: "通过英文SEO、eDM及WhatsApp运营，将内容生产与网站流量、预登记及MENA受众触达连接起来。",
        statsType: "tags",
        tags: ["日均访问 +200", "有效触达3,000+目标地区人次"]
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
        period: "2024.09 – 2026.01",
        focus: "国际商务 · GPA 3.5 / 4.0",
        honor: "全额奖学金"
      }
    ],
    impacts: [
      {
        title: "大型跨国峰会场务统筹",
        desc: "在高节奏的国际峰会现场统筹30余名海外工作人员，覆盖VIP接待、后勤分配及技术论坛支持。"
      },
      {
        title: "跨文化多语种高端接待",
        desc: "在迪拜政府文化活动与国际学术会议中提供中、英、阿三语沟通及嘉宾支持，协助不同文化背景的参与者顺利完成现场流程。"
      },
      {
        title: "前沿科技生态商业洞察",
        desc: "深入研究中东地区 Web3 及 AI 领域，项目包括《阿联酋 Web3 行业的女性参与驱动因素》、《币安战略分析》以及《Sandbox 与 Yalla 合作策略》等研究报告。"
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
        focus: "阿拉伯语语言与文化沉浸 · GPA 4.0 / 4.0",
        honor: "综合测评第一 · 学业优秀证明"
      }
    ],
    impacts: [
      {
        title: "满分学术成就",
        desc: "在埃及交流期间，以全科满分 (GPA 4.0/4.0) 的优异成绩位列综合测评年级第一，并荣获亚历山大大学官方颁发的学业优秀证明。",
        statsType: "tags",
        tags: ["GPA 4.0 / 4.0", "综合测评第一", "学业优秀证明"]
      },
      {
        title: "深度文化沉浸与本土语言破壁",
        desc: "通过在埃及的学习与日常生活积累阿拉伯语实地沟通经验，覆盖标准阿拉伯语及埃及方言，并形成对当地文化与沟通方式的直接理解。",
        statsType: "boxes",
        stats: [
          { value: "MSA + Egyptian", label: "双轨语言能力构建", theme: "yellow" }
        ]
      }
    ]
  }
} satisfies JourneyNodeDetailsMap;
