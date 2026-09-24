# Scrollytelling — 滚动即时间轴

## 核心范式

滚动不是翻页，是**时间轴擦洗**。屏幕上所有视觉状态都是滚动进度的连续
函数——不是"滚到这里触发一个动画"，而是"滚到任何位置，画面就精确地
是那个位置该有的样子"。用户可以正放、倒放、停在任何一帧——这就是
一镜到底的本质。

## 架构：固定舞台 + 滚动轴

```
<body style="height: N00vh">     ← N 倍视口高度的滚动轴
  <div class="stage">            ← position:fixed; inset:0
    …所有视觉内容…
  </div>
  <div class="spacer">           ← 产生滚动高度
</body>
```

- 舞台固定在视口，不随文档滚动；
- body 高度 = 叙事时长（滚动距离）；
- JS 把 `scrollY / (scrollHeight - innerHeight)` 归一化为 `p ∈ [0,1]`；
- 所有视觉状态 = `f(p)` 的连续函数；
- 惯性插值（lerp）让滚动与画面之间有物理质感。

```js
let target = 0, current = 0;
addEventListener('scroll', () => {
  target = scrollY / (document.body.scrollHeight - innerHeight);
});
function raf(){
  current += (target - current) * 0.08;   // lerp 惯性
  render(current);                          // 所有视觉状态 = f(current)
  requestAnimationFrame(raf);
}
```

## 八个机制

### 1. 时间轴擦洗，不是翻页
滚动进度驱动**连续变化**——颜色、位置、缩放、透明度都是 p 的函数。
反模式：IntersectionObserver 触发一次性动画然后固定。

### 2. 固定舞台 + 粘性场景
舞台不滚——变的是舞台里的东西。`position:fixed` 或 `position:sticky`
把视觉容器钉在视口，滚动改变的是**容器内部的状态**。

### 3. 共享元素与连续转场
同一个元素在不同场景之间**变形**而非消失再出现：圆形变成文字、卡片
展开成全屏、图标旋转成新图标。SVG path morph（`d` 属性插值）或
CSS clip-path 过渡。

### 4. 空间连续与相机运动
把滚动映射为虚拟相机的运动：平移（pan）、缩放（zoom）、推拉（dolly）。
所有元素在同一坐标系内，相机移动时它们的相对位置和视差保持一致。

### 5. 叙事因果，不是信息并列
场景之间要有因果：上一个场景的**结果**是下一个场景的**原因**。
不是"这里是信息 A，那里是信息 B"，而是"A 导致了 B"。

### 6. 用户控制感 = 沉浸感
用户往回滚，时间就倒流；停住，画面就定格。**永远不要劫持滚动**——
用户的滚轮是时间轴的控制权。惯性插值让操作有重量感，但不能没收
控制权。

### 7. 多感官一致
颜色、文字、动效、声音（如果有）全部讲同一个故事。当背景变暗时，
文字也变暗；当相机推近时，字号也变大——所有通道同步。

### 8. 性能与预加载
只动 `transform` 和 `opacity`（合成器线程）；`will-change` 提前声明；
重资源（图片/视频/音频）预加载或懒加载；`prefers-reduced-motion`
时降级为静态叙事（全部内容可见，无动画依赖）。

## 实现分层

| 复杂度 | 技术 | 适用 |
| --- | --- | --- |
| 简单 | CSS `animation-timeline: scroll()/view()` | 少量属性的连续绑定 |
| 中等 | rAF + lerp + 手动映射 | 完全控制、物理感、多元素同步 |
| 重 | GSAP ScrollTrigger + pin + scrub | 复杂时间线、多场景编排 |
| 特殊 | 3D（Three.js）+ 相机绑定滚动 | 沉浸式空间叙事 |

规则：**从简单开始，只有在简单方案确实无法表达概念时才升级**。

## 反模式（每个都是一次真实的失败）

- 滚动只是触发 IntersectionObserver 淡入——那是"滚动触发展示"，
  不是 Scrollytelling；
- 场景之间用 `opacity: 0 → 1` 切换——没有共享元素、没有因果；
- 所有内容都塞进一屏然后靠滚动换文字——那是翻页器不是叙事；
- 动画只在 CSS `@keyframes` 里，不跟滚动绑定——那是装饰不是时间轴；
- `scroll` 事件没有 rAF 节流——60fps 变成了抽搐。
