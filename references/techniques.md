# Techniques — 前端设计手法总图

定位：原始技法菜单。taste-library 是从优秀站点蒸馏的"成品手法"（带何时用/风险）；
这里是完整的技法分类地图——方向卡的形式语言、野卡、LEAP 轮都从这里取材。
图例：★🎯 = 协议旗舰组合（与 one-take 探针同源）；◆ = 高辨识度、易翻车——
野卡与 LEAP 的好材料，但需要概念论证；用于内容页时按"选择还是继承"审查。

总览地图：
滚动叙事 → 动效微交互 → 布局排版 → 视觉风格 → 3D/生成/沉浸 → 技术 API → 后现代组合拳

常见用途：品牌官网、作品集、发布会专题、年度报告、数据新闻、互动故事、产品配置器。

## 1. 滚动与叙事类

**Scrollytelling 滚动叙事 ★🎯**
滚动进度驱动故事、动画、图表、3D 或视频播放。别名：scroll-driven
narrative。常见形式：sticky 图文（一侧文字固定，另一侧图/动画切换）；
pinned 3D（滚动时产品旋转、拆解、组装）；滚动控制视频/图像序列（Apple
产品页）；滚动驱动图表；章节式叙事。工具：GSAP ScrollTrigger、
Scrollama、Lenis、Locomotive Scroll、IntersectionObserver、CSS
`scroll()` / `view()`。案例：NYT Snow Fall、Apple AirPods Pro、The Boat、
Every Last Drop。风险：移动端性能、可访问性、滚动劫持反感、
prefers-reduced-motion。

- **Sticky Scrollytelling** — 一侧固定，另一侧滚动。产品卖点、时间线、
  教程步骤。
- **Parallax 视差滚动** — 背景、前景不同速度移动。关键词：depth、
  layers、scroll speed。
- **Horizontal Scroll 水平滚动** — 滚轮向下，页面横向移动。作品集、
  画廊、时间线。
- **Scroll Hijacking 滚动劫持** — 接管滚动按设计节奏播放。体验强，
  容易挨骂，慎用。
- **Scroll Snap 滚动捕捉** — 一屏一屏停。CSS：`scroll-snap-type`。
- **Scroll-driven Animations ⚙** — CSS 原生 `animation-timeline:
  scroll() / view()`，轻量滚动动画。
- **滚动控制视频/图像序列** — 滚动进度映射到视频帧或图片序列。苹果
  常用，性能要求高。
- **Page Transition 页面过渡** — 路由切换动画。Barba.js、Swup、View
  Transitions API。
- **Shared Element Transition 共享元素转场** — 列表图片飞到详情页。
  关键词：FLIP、View Transitions。
- **Preloader 预加载动画** — 进入前的 loading 叙事；可结合进度、品牌
  符号、3D。

## 2. 动效与微交互类

**Microinteractions 微交互** — 按钮、点赞、开关的小反馈。
**Magnetic Button 磁性按钮** — 鼠标靠近，按钮被吸过去。
**Custom Cursor 自定义光标** — 圆点、文字、混合模式。
**光标跟随/拖尾** — 粒子、残影、流体。
**Hover Effects 悬停动效** — 缩放、遮罩、文字切换。
**Drag & Inertia 拖拽惯性** — 拖卡片、拖画廊。
**Spring Physics 弹簧物理** — 回弹、自然缓动。
**Skeleton 骨架屏** — 加载占位。
**Loading 加载动画** — 进度、脉冲、呼吸。
**State Transition 状态过渡** — 展开、收起、切换。
**Sound Feedback 声音反馈** — 悬停/点击音效，慎用。

## 3. 布局与排版类

**Bento Grid 便当盒网格** — 苹果、Vercel 常用。
**Asymmetry 不对称布局** — 故意左右不平衡。
**Broken Grid 打破网格** — 越界、错位。
**Overlap 重叠** — 文字压图片、卡片叠卡片。
**Collage 拼贴** — 杂志剪贴感。
**Editorial 杂志编辑风** — 大标题、分栏、引用。
**Split Screen 分屏** — 左右/上下对比。
**Sticky Sidebar 粘性侧边** — 一边固定，一边滚。
**Infinite Scroll 无限滚动** — 信息流。
**Masonry 瀑布流** — Pinterest 那种。
**Kinetic Typography 动态排版** — 文字会动、会变形。
**Variable Fonts 可变字体** — 字重、字宽、斜度随交互变。
**Oversized Type 超大字** — 文字当主视觉。
**Text Mask 文字遮罩** — 文字里透出视频/图片。
**Text on Path 路径文字** — 文字沿曲线排。
**Glitch Text 故障文字** — RGB 分离、抖动。
**Fluid Typography 流体排版** — `clamp()` 自适应。
**Vertical Writing 垂直排版** — 日式竖排、中文竖排。
**Blend Modes 混合模式** — `mix-blend-mode` 做叠加。

## 4. 视觉风格类

**Minimalism 极简** — 少即是多、大留白、网格。
**Maximalism 极繁** — 信息密集、高饱和、装饰多。
**Brutalism 粗野主义 ◆** — 原生 HTML、丑得有意、系统字体、高对比。
**Neo-Brutalism 新粗野主义 ◆** — 粗边框、硬阴影、亮色块。
**Glassmorphism 玻璃拟态** — 毛玻璃、模糊、半透明（默认簇条目，须论证）。
**Neumorphism 新拟态** — 同色凹凸、软阴影。
**Claymorphism 粘土拟态** — 圆润、厚、像黏土。
**Aurora Gradient 极光渐变** — 流动彩色光晕（默认簇邻区，须论证）。
**Mesh Gradient 网格渐变** — 多色柔和渐变（同上）。
**Noise / Grain 噪点颗粒** — 增加质感。
**Duotone 双色调** — 两张色版套图。
**Dark Mode 暗黑模式** — 重新调对比，不只是反色。
**Retro Futurism 复古未来 ◆** — 旧时代想象未来。
**Y2K ◆** — 千禧年金属、亮面、像素、气泡。
**Vaporwave 蒸汽波 ◆** — 粉紫、罗马柱、日文、怀旧。
**Cyberpunk 赛博朋克 ◆** — 霓虹、故障、雨夜、高对比。
**Memphis 孟菲斯 ◆** — 几何、亮色、波普。
**Wabi-sabi 侘寂** — 粗糙、自然、不完美。
**Swiss Style 瑞士国际主义** — 网格、无衬线、客观排版。
**Bauhaus 包豪斯** — 几何、原色、功能。
**Surrealism 超现实 ◆** — 不合逻辑的拼贴、梦境感。
**Deconstruction 解构 ◆** — 打碎、错位、反秩序。
**Glitch Art 故障艺术 ◆** — 数字错误美学。
**Liquid Metal 液态金属** — 铬色、流动、反射。
**Biomorphic 生物设计** — 有机形态、细胞、流体。
**Neon 霓虹** — 发光、暗底、高饱和（默认簇邻区，须论证）。

## 5. 3D、生成与沉浸类

**WebGL / Three.js** — 浏览器 3D。
**Shader / GLSL** — 写 GPU 特效。
**Particles 粒子系统** — 星云、点云、文字粒子。
**Fluid 流体模拟** — 鼠标搅动液体。
**Post-processing 后处理** — 辉光、景深、色差、噪点。
**3D 产品展示/配置器** — 换色、换材质、旋转。
**AR / VR / WebXR** — 手机 AR、头显 VR。
**Spatial UI 空间 UI** — 空间计算界面。
**Generative Art 生成艺术** — 算法生成画面。
**Data Viz 数据可视化** — 图表、地图、网络图。
**Interactive Storytelling 互动叙事** — 用户选择推动故事。
**Gamification 游戏化** — 进度、奖励、成就。
**Music Visualization 音乐可视化** — 声音驱动画面。
**Real-time Data 实时数据** — API 驱动。
**AIGC** — AI 生成图/文/视频。
**Digital Twin 数字孪生** — 真实世界映射到 3D。

## 6. 技术 / API 趋势类 ⚙

CSS Scroll-driven Animations（原生滚动动画）；View Transitions API（原
生页面转场）；Container Queries（按容器宽度响应）；Subgrid（网格对齐
更细）；Popover API（原生弹层）；Anchor Positioning（锚点定位）；
`@property`（CSS 变量类型化）；CSS Houdini（扩展 CSS 能力）；WebGPU
（更强 GPU 计算）；WebAssembly（高性能代码跑浏览器）；PWA（离线、安
装、推送）；Islands Architecture / Server Components（部分水合、流式
渲染）；Progressive Enhancement / Graceful Degradation（先可用，再加效
果）；`prefers-reduced-motion`（尊重减少动态效果）。

## 7. 后现代组合拳 ◆

现成的风格组合，可作为野卡或 LEAP 的完整方向（概念门照常审查）：

- 粗野主义 + 故障文字 + 自定义光标
- Bento Grid + 玻璃拟态 + 微交互
- 极简布局 + 超大字 + 可变字体 + 滚动动画
- Y2K + 像素 + 金属渐变 + 弹窗
- 蒸汽波 + 拼贴 + 日文 + 怀旧素材
- 赛博朋克 + 霓虹 + 扫描线 + 3D
- 解构 + 打破网格 + 重叠 + 混合模式
- 杂志编辑风 + 分屏 + 粘性滚动 + 图片序列
- Scrollytelling + WebGL + 数据可视化 + 声音反馈

## 8. 工具 / 库 / 案例 / 搜索关键词

常用工具：GSAP ScrollTrigger；Scrollama；Lenis；Locomotive Scroll；
Barba.js / Swup；View Transitions API；Three.js / React Three Fiber；
Rive / Lottie；Framer Motion；VueUse `useScroll`；CSS `scroll()` /
`view()`。

案例 / 灵感：Apple 产品页；NYT Snow Fall；The Boat；Every Last Drop；
Awwwards Scrolling；Codrops Playground；GSAP Scroll 官方示例；
scroll-driven-animations.style；CodePen 搜 scroll animation。

搜索关键词——
中文：滚动叙事、视差滚动、滚动驱动动画、粘性滚动、页面过渡、微交互、
自定义光标、粗野主义、新粗野主义、玻璃拟态、新拟态、粘土拟态、极光渐
变、网格渐变、Y2K、蒸汽波、赛博朋克、故障艺术、生成艺术、空间 UI、可
变字体、动态排版、Bento Grid、打破网格、拼贴、解构、超现实、液态金属、
生物设计。
英文：scrollytelling, scroll-driven animations, parallax, horizontal
scroll, scroll hijacking, scroll snap, sticky scroll, page transition,
shared element transition, microinteractions, magnetic button, custom
cursor, hover effects, drag inertia, spring physics, bento grid, broken
grid, editorial layout, kinetic typography, variable fonts, oversized
type, text mask, glitch text, fluid typography, blend modes, brutalism,
neo-brutalism, glassmorphism, neumorphism, claymorphism, aurora gradient,
mesh gradient, noise grain, duotone, retro futurism, Y2K, vaporwave,
cyberpunk, memphis, wabi-sabi, swiss style, bauhaus, surrealism,
deconstruction, glitch art, liquid metal, biomorphic, neon, WebGL,
shader, GLSL, particles, fluid simulation, post-processing, WebXR,
spatial UI, generative art, data viz, interactive storytelling,
gamification, music visualization, real-time data, AIGC, digital twin,
CSS scroll-driven animations, View Transitions API, container queries,
subgrid, popover API, anchor positioning, @property, CSS Houdini, WebGPU,
WebAssembly, PWA, islands architecture, server components, progressive
enhancement, prefers-reduced-motion.

## 接入协议（本 skill 内怎么用）

- **Discover 方向卡**：每张卡的 formal language 与签名元素从本图选取；
  一组卡至少横跨三种形式语言，野卡优先取 ◆ 标记的高风险风格；
- **Define LEAP 轮**：bold-move 菜单（define.md）之外，可从本图选一个
  手法类或 §7 组合拳作为本轮跳跃，声明"什么跳出来、什么付账"；
- **选择还是继承**：任何手法——包括默认簇里的玻璃拟态、极光渐变——
  只要是这个 brief 的深思熟虑选择且执行到顶级，都合法；未经思考的
  默认用法才是 tell；
- **性能与可访问性**是手法的一部分：Scrollytelling/WebGL 必须回答
  移动端、`prefers-reduced-motion` 与降级路径，否则评审按 rubric 第 7
  条扣分。

**深度版**：十一种签名级手法（含实现模式与失败模式）见
`signature-techniques.md`；滚动叙事范式见 `scrollytelling.md`。
