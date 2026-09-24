# world-class-designer

[English](README.md) | [简体中文](README.zh-CN.md)

三阶段流程（Discover → Define → Deliver）把 AI 做成世界级设计师：产出惊艳、不落俗套的网页、落地页、海报、社交卡片、幻灯片与 UI。

一个 Claude Code Agent Skill，专门对抗 AI 生成设计的"平均值"——蓝紫渐变、圆角卡片阵列、Inter 字体、万金油文案。

## 它解决什么问题

LLM 做设计时，每个决策都选"最可能让所有人满意"的解，结果就是委员会式平庸；而且它只加不减、倾向在 6/10 分时宣布完成。本 skill 用三个阶段把它推出去：

1. **Discover（~15%）** — 先定问题再发散：种子字符串注入真随机（或点名差异维度），意向先行，产出 3–4 张显著不同的方向卡，外加一张打破品类惯例的野卡；
2. **Define（~70%）** — 客观评分表（含原创性）+ 全新上下文 critic 子代理循环，按"顶尖团队会怎么做"找差距并给伪代码级修改意见，critic 独立给出 ≥9/10 才停；用生成图片、着色器/3D、视频动画充实设计；
3. **Deliver（~15%）** — 减法 pass（以理解成本为界）→ AI tells 视觉/文案双 pass（不允许未经思考的默认用法）→ 标题、主 CTA、空状态、错误提示亲手重写。

## 安装

把整个文件夹复制到 Claude Code 的 skills 目录：

- macOS / Linux：`~/.claude/skills/world-class-designer/`
- Windows：`%USERPROFILE%\.claude\skills\world-class-designer\`

或者直接把下面这段话发给 agent，一键安装：

> 帮我安装 world-class-designer。请把 https://github.com/Lex1slt/world-class-designer 克隆到 ~/.claude/skills/world-class-designer，安装完成后检查 SKILL.md、references/ 是否存在。

## 触发

直接说"设计/做一个落地页、海报、卡片、幻灯片"或"太 AI 味了，重做"，skill 自动加载；也可显式 `/world-class-designer <需求>`。

要在需求里直接钉死模型分工：

> 用 world-class-designer 给「产品」做落地页。所有评审子代理通过 dynamic workflow 的 subagent_model 指定为你最强的设计模型——严格只读、只出意见、不许动手改；改稿由你（会话模型）按意见执行；评审独立给出 ≥9/10 才算完成。

## 目录结构

```
world-class-designer/
├── SKILL.md              # 核心理念、三阶段总览、硬性规则
├── references/
│   ├── discover.md       # 先定问题、种子串、野心 brief、意向先行、方向卡
│   ├── define.md         # critic 循环与 prompt 模板、模型分工、生图/shader/视频素材、截图命令
│   ├── deliver.md        # 减法 pass、AI tells 双 pass、手写文案、交付 checklist
│   ├── taste-library.md  # 十个站点研究蒸馏出的手法武器库（何时用 + 来源）
│   └── site-study-*.md   # 十个站点的完整研究：vallone、chronoswiss、offbrand、grair、rhine、family、cosmos、obys、igloo、exoape
└── .gitignore
```

## 核心规则速记

1. 先定问题，再掷种子字符串/点名差异维度发散，产出 3–4 张显著不同的方向卡，外加一张打破品类惯例的野卡；
2. fresh-context critic 子代理按客观评分表打分、给伪代码级意见，critic 独立给出 ≥9/10 才能停；
3. 交付前：减法 pass → AI tells 双 pass（不允许未经思考的默认用法）→ 标题/主 CTA/空状态/错误提示亲手重写。
