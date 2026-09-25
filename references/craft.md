# Craft — 从"干净"到"震撼"的视觉技法手册

定位：**执行者的弹药库**。process（SKILL.md + define.md）保证不烂；
这份文件保证不平庸。每条附带具体 CSS/JS 模式，可以直接抄。

使用纪律：**每页最多 2–3 个手法**。多了互相稀释。选哪 2–3 个由
概念决定——手法服务概念，不是概念给手法找借口。

## 一、字体工艺

### 变量字体轴动画

字重/字宽/斜度绑定滚动或光标——字体本身在"呼吸"。

```css
@font-face { font-family: 'C wahr'; src: url('…variable.woff2'); }
h1 { font-variation-settings: 'wght' 900, 'wdth' 75; transition: font-variation-settings .4s; }
h1:hover { font-variation-settings: 'wght' 300, 'wdth' 120; }
/* 滚动驱动：*/
h1 { font-variation-settings: 'wght' calc(100 + var(--scroll-p) * 800); }
```

来源：Fraunces（SOFT/WONK 轴）、Anybody（wdth 50–150）、Climate Crisis（ YEAR 轴）。免费可用的轴字体超过 4000 个。

### 逐字拆分 + 随机延迟

把标题拆成单字 span，每个字独立延迟入场——不是整块淡入。

```js
const text = el.textContent;
el.innerHTML = [...text].map((c,i) =>
  `<span style="animation-delay:${i*60+Math.random()*80}ms" class="ch">${c}</span>`
).join('');
```
```css
.ch { display:inline-block; animation: ch-in .5s cubic-bezier(.2,.9,.3,1.1) both; }
@keyframes ch-in { from { opacity:0; transform:translateY(.3em) rotate(4deg); } }
```

### 负字距 optical correction

Display 字号的字距需要负修正，否则视觉上偏松。

```css
h1 { letter-spacing: -0.04em; }   /* 96px display */
p  { letter-spacing: 0; }          /* 16px body */
.tag { letter-spacing: 0.2em; }    /* 10px tracked caps */
```

### 衬线 + mono + 手写的三声部

同一个页面三种字体，各管一个信息通道：
- 衬线大字 = 叙事/标题（Cormorant Garamond、Fraunces、Noto Serif SC）
- mono 小字 = 数据/标签/坐标（IBM Plex Mono、Space Mono、JetBrains Mono）
- 手写/装饰 = 注释/手写标记（Caveat、Kalam——仅限一处，否则像便签墙）

规则：**三声部中最大和最小的字号比 ≥ 8:1**。层级靠尺寸差而不是颜色。

### 中文竖排

`writing-mode: vertical-rl` 不是日文专属——中文竖排在当代设计里极
罕见，天然醒目。

```css
.vertical { writing-mode: vertical-rl; letter-spacing: .3em; }
```

用于：页边注释、诗句引用、导航标签。每页最多出现一次。

## 二、色彩纪律

### 单色 + 一个金属

全页只允许三种色：底色、文字色、一个强调色。强调色用金属渐变
（金/铜/铬），不是纯色——金属材质天然有明暗过渡，不需要额外渐变。

```css
--accent: linear-gradient(135deg, #C9A84C 0%, #F0D060 40%, #A07828 100%);
```

### 照片提色

从 hero 图片提取主色作为全页强调色——页面与图片呼吸同一色系。

```js
// 从图片提取 2-3 个主色
const palette = await ColorThief.getPalette(img, 3);
document.documentElement.style.setProperty('--accent', palette[0]);
```

### 全页色温随滚动变

背景色温随滚动进度从暖到冷（或反过来）——页面本身的色温在讲故事。

```js
const warm = [235, 220, 200];   // 面色
const cold = [8, 12, 18];       // 墨色
const p = scrollProgress;
document.body.style.backgroundColor =
  `rgb(${warm.map((c,i)=>Math.round(c+(cold[i]-c)*p)).join(',')})`;
```

### 混合模式做自动对比

文字压在图片上时，不用手动选颜色——`mix-blend-mode: difference` 让
文字在亮区自动变暗、暗区自动变亮。

```css
.overlay-text { mix-blend-mode: difference; color: white; }
```

## 三、缓动工艺

### 多段缓动（起快→过冲→回弹）

不是 cubic-bezier 单点，而是三段关键帧——起手快、过冲 8–15%、回落
稳定。这是物理感的来源。

```css
@keyframes arrive {
  0%   { transform: translateY(40px) scale(.96); opacity: 0; }
  60%  { transform: translateY(-8px) scale(1.01); opacity: 1; }
  80%  { transform: translateY(3px); }
  100% { transform: translateY(0); }
}
/* 每个元素随机延迟 0–200ms，整批错落 */
```

### 滚动速度响应

元素随滚动速度拉伸/倾斜——快滚时字形变形，停住恢复。这是"页面活
了"的信号。

```js
let lastY = 0;
addEventListener('scroll', () => {
  const velocity = scrollY - lastY; lastY = scrollY;
  document.documentElement.style.setProperty(
    '--skew', Math.max(-3, Math.min(3, velocity * 0.02)) + 'deg'
  );
}, {passive:true});
```
```css
.content { transform: skewY(var(--skew, 0deg)); transition: transform .1s; }
```

### 一元素反向

页面上 99% 的元素随滚动下移，选一个（通常是 hero 的某个装饰层）
以 0.3× 速度**反方向**移动——视差不需要三层，一层反向就够了。

```css
.anchored { transform: translateY(calc(var(--scroll-p) * -200px)); }
```

## 四、构图破格

### 一元素出框

一个元素超出其容器 20–30%——图片超出右边缘、文字超出上边缘、
装饰元素跨出 section 边界。

```css
.breakout { margin-right: calc(-1 * clamp(20px, 5vw, 80px)); }
```

### 30/70 或 15/85 的不对称分割

不要 50/50。极端比例天然产生张力——小的一侧越窄，张力越大。

```css
.split { display: grid; grid-template-columns: 1fr 2.5fr; }
```

### 文字骑在图片边缘

文字的一半在图片上、一半在图片外——不是居中叠加，而是**骑在边界线
上**。

```css
.caption { position: absolute; bottom: -0.5em; left: 24px;
  mix-blend-mode: difference; color: white; }
```

### 一条斜线分开两区

不用水平线，用一条从左下到右上的斜线（SVG 或 clip-path）把两个
section 分开——版式立即有方向感。

```css
.diagonal-cut {
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
}
```

### 满版的一个字

把一个字放大到占满整个视口宽（20vw），其他内容从它的笔画间穿过。

```css
.giant { font-size: 20vw; line-height: .8; opacity: .06;
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%,-50%); pointer-events: none; }
```

## 五、质感层

### 噪点颗粒

SVG `feTurbulence` 做一层 noise 覆盖在页面上，透明度 0.03–0.08——
数码感立刻消失，表面有了纸/膜的质感。

```html
<svg style="position:fixed;inset:0;width:100%;height:100%;
  opacity:.05;pointer-events:none;z-index:9999">
  <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".65"/></filter>
  <rect width="100%" height="100%" filter="url(#grain)"/>
</svg>
```

### 扫描线

2px 间隔的水平线覆盖，透明度 0.02——CRT/仪器感。

```css
body::after { content:""; position:fixed; inset:0; pointer-events:none;
  background: repeating-linear-gradient(0deg, transparent 0 2px,
  rgba(0,0,0,.03) 2px 4px); }
```

### 纸纹

真实纸张扫描图以 multiply 混合模式铺在浅色底上，透明度 0.06。

```css
.paper-texture { background-image: url(paper-scan.jpg);
  background-size: 400px; mix-blend-mode: multiply; }
```

## 六、LEAP 轮的大动作清单

LEAP 轮从这个清单选一个执行（跨类组合算一次）：

| 类 | 动作 |
| --- | --- |
| 构图 | 一元素出框 20%+；15/85 分割；满版单字；斜切分界 |
| 色彩 | 全页色温随滚动变；单色+金属强调色；照片提色作全页色系 |
| 字体 | 变量字体轴绑定滚动；逐字随机入场；三声部（衬线+mono+手写） |
| 质感 | 噪点颗粒 + 扫描线 + 纸纹三层叠加 |
| 运动 | 滚动速度响应（元素随速度 skew）；一元素反向移动 |
| 密度 | 满版单字作为背景层（透明度 .06，内容从笔画间穿过） |
| 形式 | 中文竖排注释页边；曲线 SVG 分割两区 |

## 反模式

- 噪点透明度 > 0.1 → 变成了"噪点页"
- 超大字 opacity > 0.15 → 抢内容
- 环境粒子 > 80 个 → 视觉噪声
- 金属渐变用于超过一个元素 → 不是强调是装饰
- 所有元素都有 stagger → 没有节奏，只有延迟
- `mix-blend-mode: difference` 在纯白底上 → 文字消失
