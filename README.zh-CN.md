# anti-slop-design

[English](README.md) | [简体中文](README.zh-CN.md)

一个强制 AI 离开默认设计品味的三阶段协议（Discover → Define → Deliver）：产出惊艳、不落俗套的网页、落地页、海报、社交卡片、幻灯片与 UI。它不承诺"世界级"——它禁止平庸。

一个 Agent Skill，专门对抗 AI 生成设计的"平均值"——蓝紫渐变、圆角卡片阵列、Inter 字体、万金油文案。兼容一切支持 SKILL.md 约定的 AI 编码 agent。

## 它解决什么问题

LLM 做设计时，每个决策都选"最可能让所有人满意"的解，结果就是委员会式平庸；而且它只加不减、倾向在 6/10 分时宣布完成。本 skill 用三个阶段把它推出去：

1. **Discover（~15%）** — 先定问题再发散：种子字符串注入真随机（或点名差异维度），意向先行，产出 3–4 张显著不同的方向卡，外加一张打破品类惯例的野卡，以及一份**装置预算**（最多 5 个自建机制，每个都要回答 brief 里的一句话）；
2. **Define（~70%）** — 先过**概念天花板门**（"如果执行到完美，它能到 9 分吗"——到不了就换方向，而不是硬磨），再过客观评分表（含原创性）+ 全新上下文 critic 循环，拿伪代码级修改意见。循环由三条规则停止：critic ≥9/10、**平台期规则**（连续两轮只挑出非结构性毛病）、或**硬上限 8 轮**；低于 9 分交付时必附**残留报告**与"现版 vs 删减版"对照，把最后一口审美判断交回给你。概念门后范围冻结：一进一出；
3. **Deliver（~15%）** — 减法 pass（以理解成本为界）→ AI tells 视觉/文案双 pass（不允许未经思考的默认用法）→ 标题、主 CTA、空状态、错误提示亲手重写。

## 安装

把整个文件夹复制到你所用 agent 的 skills 目录（`~/.claude/skills/` 是多数 agent 通用的约定路径）：

- macOS / Linux：`~/.claude/skills/anti-slop-design/`
- Windows：`%USERPROFILE%\.claude\skills\anti-slop-design\`

或者直接把下面这段话发给 agent，一键安装：

> 帮我安装 anti-slop-design。请把 https://github.com/Lex1slt/anti-slop-design 克隆到 ~/.claude/skills/anti-slop-design，安装完成后检查 SKILL.md、references/ 是否存在。

## 触发

直接说"设计/做一个落地页、海报、卡片、幻灯片"或"太 AI 味了，重做"，skill 自动加载；也可显式调用，格式：

`/anti-slop-design，（项目需求），评审子代理用什么模型`

> /anti-slop-design，做一个精品咖啡品牌的落地页，评审子代理用 GPT6-Astra

评审模型可省略——省略时用当前会话模型评审。**推荐**：为这个角色指定一个设计能力更强的模型——评审的品味就是整个循环的天花板。

## 目录结构

```
anti-slop-design/
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
2. 概念天花板门 → 装置预算内作业（一进一出、概念门后冻结）；fresh-context critic 按客观评分表打分、给伪代码级意见；
3. 三条停止规则（≥9 / 平台期 / 8 轮上限）；低于 9 分交付必附残留报告 + 删减版对照。
