# Taste Library — 从站点研究中蒸馏的手法武器库

来源研究：`site-study-vallone.md`、`site-study-chronoswiss.md`、`site-study-offbrand.md`、`site-study-grair.md`、`site-study-rhine.md`、`site-study-family.md`、`site-study-cosmos.md`、`site-study-obys.md`、`site-study-igloo.md`、`site-study-exoape.md`（各含证据与弱点）。
用法：Discover 阶段的野心式 brief 不必凭空发明——先翻这里，把"感觉"翻译成具体手法；每个手法都注明何时该用、何时不该。

## 高端站的共同结论（先读这个）

五站（vallone / chronoswiss / offbrand / grair / rhine）的公分母：**界面消隐**——无彩或近无彩的 UI、无边框容器、无多余按钮，内容承担全部表达；**动效慢而稳**（长缓动、发丝进度线、淡入淡出，没有弹跳）；**工程细节不可见但可感**（webp、懒加载、关键 CSS 内联、自托管字体）。AI 味的反面不是某种风格，而是"界面在抢内容的戏"。

## 手法清单

| 手法 | 做法 | 来源 | 何时用 / 不何时用 |
|---|---|---|---|
| 色彩来自内容 | UI 全无彩色（黑/白/#c7c7c7 发丝线），色相只由摄影与材料承担 | vallone | 产品有强材质/摄影时；界面本身需要表达情绪时不用 |
| 双声部排版 | grotesque 小号大写字距管界面与标签；高反差衬线大号管叙事；字标可嵌进句子 | vallone | 品牌叙事页；纯工具界面不适用 |
| 无边框商品卡 | 图片 + 小号大写名 + 右端对齐价格，一条基线，零容器 | vallone | 商品即图片的产品页；需要比价/筛选的工具页不适用 |
| 慢动效=奢侈 | 过渡 1–2s、cubic-bezier(0,0.5,0.5,1) / (0.25,1,0.5,1)；加载进度条做成仪式 | vallone | 品牌/奢侈品；效率工具禁用 |
| 工艺微距 hero | 100vh 工艺微距视频/摄影，无标题，工艺即论证；限量编号入镜 | chronoswiss | 有可拍摄的工艺/材质；纯数字产品不适用 |
| 小写品类词导航叠压摄影 | 菜单项作为画面一部分叠在 hero 上 | vallone | 沉浸式首屏；多级复杂导航不适用 |
| 衬线字标 + 仪表导航 | 双行衬线字标 + 字距大写无衬线导航；token 化管理 | chronoswiss | 制表/珠宝/律所等"传承"语感 |
| Boot 门 / OS 隐喻 | 站点伪装成启动中的机器：状态文本（"INTERNAL DATABASE / READY"）、Enter 进入、双线框按钮、PWA meta | rhine | 档案/研究/数据/工具类产品；轻消费品类不适用 |
| 档案色系 | 暖纸 #e8e5e1 + 近黑绿 #080a08 + 青铜 #a67d48 + 灰卡其 | rhine | 想躲开蓝紫 AI 味的任何深色或浅色页 |
| 一镜到底滚动时间轴 | scrollY 归一化 0–1 → 缓动 → 驱动 SVG 路径/场景窗口；只动 transform/opacity；支持倒放 | 本仓 one-take-probe.html / rhine | 叙事型 landing；表单/工具页禁用 |
| 大小写混排当语气 | 句内用大写做重音记号；H1 断行换字体 | offbrand | 工作室/文化类语气；法律/医疗文本禁用 |
| 名册与奖项段落 | "Trusted by" 与 "Recognitions + Awards" 各占完整 section，事实陈列不自夸 | offbrand | 有真实客户/奖项时；没有就别编 |
| 产品即 3D 对象 | Three.js/WebGL 让产品可旋转可近看 | grair | 产品本身是立体作品；平面内容硬上 3D 是装饰 |
| Apple 式产品图 | seamless 中性背景或精确抠图（rembg 类，alpha matting 开）、超清锐边、单一受控接触阴影、全组同一角度与缩放；生成 prompt 直接写 studio catalog 风格 | apple.com 惯例 | 产品卡/规格区必须用；hero 氛围区可用 vallone 式 in-situ 实景——同一产品集内两种模式不得混用 |
| 一屏一句收益宣言 | 每个 viewport 只有一句"主语+收益"的大字 H1（零形容词），全页即一张宣言清单 | family.co | 任何产品 landing 的骨架首选；效率工具/文档不适用 |
| 零摄影纯矢量场景 | 每句宣言配一段手工矢量/Lottie 动画，一张 stock 图都不用 | family.co | 行业 stock 味重灾区（加密/AI）；没有插画产能时降级为抽象几何 |
| 信任写成事实 | 审计机构实名、迁移成本一句话归零（"Import from MetaMask"），不写"银行级安全" | family.co | 有真实背书时；背书不足时宁可沉默 |
| 工具动词浪漫化 | 把功能写成世界观："Every search opens a new world." / "Know what you're looking at." | cosmos.so | 效率/AI 工具的文案三连句式；需要真实产品力兜底 |
| 光标手电筒 | 暗场画布 + 光标作为揭示光源，扫到哪里亮到哪里 | family.co | 品牌 boot/首屏；内容密集页禁用 |
| 斜切揭示转场 | 图像以倾斜边缘从黑场中滑出（不是淡入）——运动带方向感 | exoape | 纯 CSS transform 可实现的高辨识度转场签名 |
| 一个字体家族的全字重 | 300/400/500 单一家族管全部层级，不拼字体盘 | exoape (Lausanne) / family (LFE Sans) | 追求单一纯粹的声部；需要强对比叙事时配衬线第二声部 |
| 自研/独占字体当护城河 | 自托管自研字体，永不撞字 | obys / family / exoape | 有预算与工期时；否则选 Lineto/Klim 级的独占授权款 |
| Canvas 排版表演 | 文字用 canvas 绘制做 kinetic 效果——排版从内容升级为表演 | obys | 作品本身就是排版的场合；代价：不可选中/搜索/爬取 |
| 一个隐喻贯穿全部 | 品牌→视觉母题→交互拧在同一个物象上（冰屋=冰：透明、结晶、消融），信息密度让位给记忆度 | igloo.inc (SOTY 2024) | 概念能一以贯之的项目；拼贴型需求禁用 |
| 深色要有色温 | 深色底不等于纯黑：带紫的夜幕、带绿的墨色、带暖的炭色 | grair / rhine / family | 任何深色页面 |

| 工艺微距摄影的限量编号入镜 | "No.34/99" 这类叙事细节直接进画面 | chronoswiss | 限量/手作属性的真实产品 |

## 使用纪律

- 每页最多取 2–3 个手法；手法之间必须共享同一种"语感"（vallone 的慢 + rhine 的 boot 门会互相打架）。
- 手法是起点不是终点：引用后仍要过 critic 循环，由评审判断"是否成了顶级工作室的选择"。
- **学习前沿站的模式，不照搬渲染策略**：igloo/obys/family 这类站的 canvas/WebGL/交互揭示使爬虫、慢设备、无头截图全部失明（本次研究的截图大多只有暗场预载）——内容页与电商页禁用这种渲染策略。
- 每学习一个新站，按同格式追加研究笔记，并把手法定期蒸馏进本表。
