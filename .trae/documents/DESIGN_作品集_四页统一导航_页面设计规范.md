# 四页作品集：统一导航（标签页/书签式）页面设计规范（Desktop-first）

## Global Styles（设计令牌/全局规范）
- Background：页面底色 `#f7f6f3`（全站一致）。
- Typography：导航与少量 UI 文字使用等宽字体（Monospace），正文/标题保持你现有字体体系不变。
- Radius：保持现有卡片圆角值不变（导航圆角与卡片同一 token）。
- Color/Border：导航默认态为低对比“纸张/书签”质感；选中态更明确但不刺眼；边框/阴影与现有卡片体系一致。
- Interaction：
  - Hover：仅轻微明度/边框变化（不位移、不弹跳）。
  - Active：仅轻微按压（可选）或颜色加深。
  - Focus：清晰可见的 focus ring（符合无障碍）。
  - Motion：默认无动效；若存在过渡，≤120ms 且尊重 `prefers-reduced-motion`。

## Layout（响应式与布局策略）
- Desktop-first：内容容器固定最大宽度（与当前作品集一致），居中；导航与页面标题同一节奏对齐。
- 布局：推荐 Flexbox；导航区域为一行横向 Tab（四个等宽）。
- Breakpoints：
  - ≥1024px：导航横向四等分，靠近页头；与标题/导语形成稳定层级。
  - <768px：仍保持一行（如空间不足可缩小字级/内边距），避免换行造成“装饰感”抢戏。

## Component Spec：UnifiedNav（共用）
- 结构：`<nav>` 内含 4 个链接 Tab（Home / Journey / Projects / About）。
- 视觉：标签页/书签式外观（像插在页面上方的书签）；边框与背景轻量化。
- 状态：
  - Default：低对比，清晰可点。
  - Active：像“当前页的书签被翻到上面”，可通过更高层级（更实的底色/更清晰的边框）体现。
  - Hover/Focus：仅用于提示交互，不改变布局。
- 无障碍：当前页 `aria-current="page"`；Tab 顺序自然；点击热区高度建议 ≥40px。

---

## Page 1：首页
### Meta Information
- Title：你的名字 / Portfolio
- Description：一句话定位 + 关键词（作品领域）
- Open Graph：同 Title/Description，封面图为现有主视觉（如有）

### Page Structure
- 顶部：UnifiedNav + 页面标题/导语
- 主体：精选作品卡片（保持现有圆角与排版）

### Sections & Components
1. Header
   - 左侧/居中：标题（优先级最高）
   - 下方：UnifiedNav（视觉比标题更轻，服务于切换）
2. Featured Projects
   - 卡片样式不改；仅确保与导航的边框/阴影属于同一体系

---

## Page 2：Journey 页
### Meta Information
- Title：Journey
- Description：经历路径与节点式信息浏览
- Open Graph：同上

### Page Structure
- 顶部：UnifiedNav + 页标题
- 主体：Journey 主内容（现有地图/路径交互保留）

### Sections & Components
1. Header
   - UnifiedNav 固定位置（与首页一致），避免每页“找导航”
2. Journey Content
   - 交互聚焦信息可读性（滚动联动/节点切换），不引入额外装饰噪音

---

## Page 3：Projects 页
### Meta Information
- Title：Projects / 作品
- Description：作品列表与案例索引
- Open Graph：同上

### Page Structure
- 顶部：UnifiedNav + 页标题
- 主体：作品卡片网格/列表（保持现有圆角）

### Sections & Components
1. Header
   - UnifiedNav 固定位置（与首页一致），避免每页“找导航” 
2. Project List
   - 卡片间距与现有一致
   - 导航选中态明确但不抢作品卡片视觉中心

---

## Page 4：About 页
### Meta Information
- Title：About / 关于
- Description：个人简介、能力摘要与联系方式信息
- Open Graph：同上

### Page Structure
- 顶部：UnifiedNav + 页标题
- 主体：AboutBoard（卡片式信息组织），其中 Astrolabe 作为单独卡片

### Sections & Components
1. Header
   - UnifiedNav 与其他页面一致
2. About Content
   - 保持现有可拖拽卡片结构
   - Astrolabe 独立为一张卡片（可后续统一微调视觉）

---

## Background Assets（当前约定）
- Home：`/public/bg/oasis.svg`
- Projects：`/public/bg/sand dune.svg`
