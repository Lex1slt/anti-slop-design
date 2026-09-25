# Anti-Slop Design

[English](README.md) | [简体中文](README.zh-CN.md)

一个四阶段协议——**Align → Discover → Define → Deliver**——强制 AI 编
码 agent 走出默认设计品味。它不承诺"世界级"——它禁止平庸：蓝紫渐变、
委员会式折中、Inter 万金油文案、亚像素级打磨循环。

一个兼容 SKILL.md 约定的 Agent Skill。

## 它解决什么问题

AI 做设计时，每个决策都选"最不可能得罪人"的选项，堆出来的是委员会输
出。它从不删除，6/10 分就宣布完成。评审循环随后花二十轮在亚像素间距
上打转。本协议改变的是流程，不是模型：

1. **Align（~5%）** — 设计树式多轮 QA 澄清意图，产出书面 brief：受众
   与场景、核心信息、审美方向、交付形态——事实自己查，决策问用户；
2. **Discover（~15%）** — 先定问题再发散：种子滚动注入真随机（或点名
   差异维度），意向先行，产出 3–4 张显著不同的方向卡，外加一张打破品
   类惯例的野卡，以及一份**装置预算**（最多 5 个自建机制）；
3. **Define（~70%）** — 概念天花板门（执行到完美能到 9 分吗？不能就
   换方向，而不是硬磨）→ 客观评分表 + 全新上下文 critic 子代理循环，
   LEAP/FIX 节奏交替；三条停止规则：≥9/10、平台期、8 轮上限；
4. **Deliver（~15%）** — 减法 pass（以理解成本为界）→ AI tells 双
   pass → 标题、主 CTA、空状态、错误提示亲手重写。

## 安装

```bash
wcd init ~/.claude/skills/anti-slop-design
```

或直接把下面这段话发给 agent，一键安装：

> 帮我安装 anti-slop-design。请把 https://github.com/Lex1slt/anti-slop-design
> 克隆到 ~/.claude/skills/anti-slop-design，安装完成后检查 SKILL.md、
> references/ 是否存在。

## 触发

直接说"设计/做一个落地页、海报、卡片、幻灯片"或"太 AI 味了，重做"，
skill 自动加载；也可显式 `/anti-slop-design <需求>`。

要在需求里直接钉死模型分工：

> /anti-slop-design，做一个精品咖啡品牌的落地页，评审子代理用 GPT6-Astra

评审模型可省略——省略时用当前会话模型。**推荐**：为这个角色指定一个
设计能力更强的模型——评审的品味就是整个循环的天花板。

## 目录结构

```
anti-slop-design/
├── SKILL.md              # 核心协议、四阶段总览、硬性规则
├── references/
│   ├── align.md          # Stage 0: 意图对齐访谈协议
│   ├── discover.md       # Stage 1: 问题框架、种子串、方向卡
│   ├── define.md         # Stage 2: 预检、天花板门、critic 循环、LEAP/FIX 节奏
│   ├── deliver.md        # Stage 3: 减法 pass、AI tells 双 pass、手写文案
│   ├── scrollytelling.md # 滚动=时间轴范式（8 机制）
│   ├── signature-techniques.md  # 11 种签名字法深度参考
│   ├── techniques.md     # 技法总图：7 类 + 组合拳 + 搜索关键词
│   ├── taste-library.md  # 十个站点研究蒸馏出的手法武器库
│   ├── site-study-*.md   # 十个站点的完整研究
│   └── tools/
│       ├── render.mjs    # 附带渲染器：全部宽度、确定性文件名
│       ├── preflight.mjs # 通用底线 + 状态矩阵（CDP 驱动）
│       └── capabilities.mjs  # 能力探针
├── wcd.mjs               # CLI：init / render / preflight
├── LICENSE               # MIT
├── CONTRIBUTING.md
├── CHANGELOG.md
└── .gitignore
```

## 核心规则速记

1. 设计树访谈澄清意图 → 种子滚动/差异维度发散 → 3–4 张方向卡 + 野
   卡，装置预算 ≤5；
2. 概念天花板门 → 客观评分表 + fresh-context critic 循环 → LEAP/FIX
   节奏；三条停止规则（≥9/10 / 平台期 / 8 轮上限）；低于 9 交付必附
   残留报告 + 现版 vs 删减版对照；
3. 交付前：减法 pass → AI tells 双 pass → 标题/主 CTA/空状态/错误提
   示亲手重写。

## Roadmap（欢迎贡献）

- taste-library 结构化（YAML moves + 社区提交审核）
- SKILL.md 约定之外的 agent 适配器
- 小型 benchmark：N 个 brief × baseline-vs-protocol 盲评排名
- 无 ?state harness 的 SPA 交互状态矩阵（CDP 逐态截图）

## License

MIT — see [LICENSE](LICENSE).
