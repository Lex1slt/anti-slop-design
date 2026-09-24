# Signature Techniques — 高端前端手法深度参考

 eleven techniques that separate award-tier work from competent output.
Each names **what it is**, **when to reach for it**, **how to build it**,
**how it fails**, and **why it differentiates from generic AI output**.

Rules that apply to all eleven:

- One page, at most **2–3 techniques**. More is noise, not ambition.
- Every technique must serve the **concept** — if you can't say what it
  communicates, cut it.
- Performance is part of the technique: `transform` + `opacity` only,
  `will-change` on animated layers, `prefers-reduced-motion` fallback
  mandatory.

## 1. Scrollytelling / 滚动叙事

**What**: The scroll position IS the timeline. Every visual state — color,
position, scale, opacity, content visibility — is a continuous function of
`p ∈ [0,1]` where p = normalized scroll progress. The user can play,
reverse, and freeze the narrative at any point.

**When**: Brand stories, data journalism, product journeys, process
explanations — anywhere a sequence or transformation is the core message.

**Implementation**:
- Fixed stage (`position:fixed; inset:0`) + scroll body (`height: N00vh`)
- Normalize `scrollY / (scrollHeight - innerHeight)` to `p ∈ [0,1]`
- Lerp inertia: `current += (target - current) * 0.08` per rAF
- All state = pure functions of `p`: color, position, scale, opacity,
  content visibility, even camera position in 3D
- Scene windows: `opacity = max(0, min(1, (w - |p - center|) / fade))`

**Failure modes**: IntersectionObserver-triggered one-shot reveals (that's
"scroll-triggered display", not scrollytelling); scroll-jacking (taking
control from the user); content locked behind JS (no-JS fallback missing).

**Full reference**: `scrollytelling.md`

## 2. WebGL & 3D Immersive

**What**: Browser-rendered 3D via Three.js/WebGL — real spatial depth,
custom shaders, post-processing, procedural geometry.

**When**: The product or concept is inherently spatial (architecture,
product design, data topology) or the brand promise is immersion.
Abstract/procedural 3D often outperforms photoreal attempts.

**Implementation**:
- Three.js scene + `PerspectiveCamera` + `WebGLRenderer({alpha:true})`
- Scroll-driven camera: map `p` to camera position/rotation
- Shaders: `ShaderMaterial` with custom vertex/fragment for unique
  visual language
- Post-processing: `EffectComposer` + bloom/vignette/chromatic
  aberration
- Responsive: `ResizeObserver` + `renderer.setSize()`

**Failure modes**: WebGL context lost on tab switch; no fallback for
unsupported browsers; physics that doesn't feel physical; 60fps
broken by unbatched draw calls.

**Anti-slop**: Procedural 3D (particles, geometry, line-based) often
outperforms loading external models — igloo-class sites are mostly
procedural shapes + one good shader.

## 3. Microinteractions

**What**: Small, purposeful responses to user actions — button states,
hover feedback, toggles, drags. They communicate state changes through
motion, not labels.

**When**: Every interactive element. But restraint: if every element has
a microinteraction, none feels special.

**Implementation**:
- Magnetic buttons: `translate(dx * 0.15, dy * 0.15)` clamped, ease-out
- Custom cursor: fixed element following mouse with lerp, blend mode
- State transitions: `transform` + `opacity` with spring easing
  (`cubic-bezier(.2, .9, .3, 1.2)` for overshoot)
- Drag inertia: velocity tracking + exponential decay on release

**Failure modes**: Micro-interactions on every element = visual noise.
Restraint: 2–3 well-chosen interactions per page.

## 4. HTML-in-Canvas

**What**: Render DOM content into a canvas (via `html2canvas` or
`SVG foreignObject` → `drawImage`), then apply shader effects (displacement,
glitch, liquid, halftone) that CSS cannot achieve on DOM elements.

**When**: The content must respond to cursor or audio in ways CSS
cannot — liquid distortion, shattering, fluid displacement of text.

**Implementation**:
```js
// 1. Render the DOM section to an offscreen canvas
const canvas = await html2canvas(element);
// 2. Use as a texture in WebGL
const texture = new THREE.CanvasTexture(canvas);
// 3. Apply displacement/glow/shatter shader
```

**Failure modes**: HTML-in-Canvas is expensive — only one instance per
page. Does not handle interactive content (canvas is a snapshot).

**Anti-slop**: This technique is inherently anti-slop — it makes DOM
content feel physical/malleable rather than flat/templated.

## 5. Motion Narrative / 动效叙事

**What**: Motion as storytelling, not decoration. Every movement advances
the narrative — a card sliding in isn't "appearing", it's "arriving from
somewhere, with a reason".

**When**: Any sequential narrative, data story, or product journey.
The test: mute the page — can you still follow the story from motion
alone?

**Implementation**:
- Choreography: elements enter in narrative order (not all at once)
- Each motion has a source and a destination (from where, to where)
- Easing communicates character: ease-out for arrivals, ease-in for
  departures, spring for playfulness
- Timing is rhythm: fast-slow-fast mirrors sentence structure
- GSAP timeline for complex sequences; CSS `@keyframes` for simple
  loops

**Failure modes**: Motion that repeats identically on every visit (use
session storage to vary); motion that blocks reading (always
`prefers-reduced-motion` fallback); motion without narrative purpose.

**Anti-slop**: Generic AI output has no motion narrative — elements just
appear. Choreographed arrival IS the differentiator.

## 6. SVG Mask Transitions / SVG 遮罩过渡

**What**: SVG `clipPath` / `mask` elements animate to reveal/hide
content — circles expand, paths morph, shapes dissolve — creating
transitions that feel hand-crafted, not templated.

**When**: Scene transitions in scrollytelling; page sections that
morph into each other; a shape that is the brand motif used as a
recurring transition device.

**Implementation**:
- `clip-path: circle(r at x y)` → animate `r` from 0 to full
- `clip-path: polygon(...)` → interpolate between shapes
- SVG `<mask>` with animated `<rect>` or gradient fill
- `path d` attribute interpolation (same point count required)
- CSS `transition: clip-path .6s ease` for simple cases

**Failure modes**: Complex mask paths can jank on low-end devices
(compile the path, don't recalculate per frame); mask transitions
between different point counts require path normalization.

**Anti-slop**: Template sites use `opacity` fade or `translateY` slide.
A custom SVG mask transition is immediately recognizable as handcrafted.

## 7. Ambient Animations / 环境动画

**What**: Background environmental movement — drifting particles, slow
color shifts, noise fields, subtle organic motion — that sets mood
without demanding attention. The design equivalent of ambient sound.

**When**: Pages that need emotional atmosphere (meditation, space,
underwater, forest). Pages where the hero is typography-driven and
needs a living backdrop. NEVER on content-dense pages (it competes
with reading).

**Implementation**:
- Canvas 2D: 30–80 particles with organic motion (perlin noise or
  sin/cos drift), very low opacity (0.05–0.15)
- CSS: subtle `background-position` animation on a noise texture
- Three.js: instanced mesh with per-instance drift
- Color: slow `hue-rotate` or `background-color` interpolation
- Rule: ambient motion should be subconsciously noticed, not consciously
  watched. If the user notices it, it's too strong.

**Failure modes**: Too many particles (competes with content); too
fast (reads as error); too visible (reads as decoration). The test:
squint — can you still read the text?

## 8. Physics-Based Interactions / 物理引擎驱动

**What**: UI elements obey physical rules — gravity, springs, momentum,
friction, collision — making the interface feel like a physical object
rather than a flat rendering.

**When**: Drag-and-drop interfaces, game-like pages, scroll-driven
scenes with weight, any page where "feel" is the product.

**Implementation**:
- Spring: `velocity += (target - position) * stiffness; velocity *=
  damping; position += velocity` (per rAF)
- Drag inertia: track velocity during drag, apply exponential decay
  on release
- Collision: AABB or circle overlap detection for element boundaries
- Libraries: matter.js (full physics), Framer Motion (spring
  primitives), manual rAF (custom)

**Failure modes**: Physics that fights accessibility (keyboard users
can't "throw" elements); physics that prevents reading (bouncy text);
physics without purpose (spring on everything = seizure).

**Anti-slop**: Physics-based interaction is inherently anti-slop —
templates don't have physics. But only when the physics serves the
concept (a ball that bounces on a play page; not a ball that bounces
on a banking page).

## 9. Procedural Generative Design / 程序化生成设计

**What**: Algorithm-driven visual patterns that are unique per load —
noise fields, L-systems, Voronoi diagrams, flow fields, recursive
subdivision. The page is slightly different every visit.

**When**: Pages that need organic/textural backgrounds, unique hero
visuals, or data-driven patterns. Works especially well for
creative/tech brands.

**Implementation**:
- Canvas 2D: perlin/simplex noise for organic textures; flow fields
  from vector math; recursive subdivision for Mondrian/McEscher
  patterns
- SVG: generated `path` data from math (polar curves, L-systems,
  Bezier chains)
- CSS: `conic-gradient` / `radial-gradient` compositions
- Three.js: instanced geometry + noise displacement

**Failure modes**: Generative patterns that are too regular (look
algorithmic); too random (look like noise); too prominent (compete
with content). The best generative design is barely noticeable but
changes the feel.

**Anti-slop**: Procedural generation is the opposite of template —
every load is unique. It's the strongest possible anti-slop signal.

## 10. View Transitions API / 视图过渡

**What**: Native browser API for animating between page states/routes.
The browser snapshots the old state, swaps content, then animates to
the new state — with shared element transitions built in.

**When**: Multi-page or route-based sites that need seamless
transitions. Works for both MPA (cross-document) and SPA (same-document
`document.startViewTransition()`).

**Implementation**:
```css
::view-transition-old(root) { animation: fade-out 300ms; }
::view-transition-new(root) { animation: fade-in 300ms; }
/* Shared element: same view-transition-name on both pages */
.hero-image { view-transition-name: hero; }
```

**Failure modes**: View Transitions API is Chrome/Edge-only (Safari
has partial support, Firefox none). Always provide a no-animation
fallback — the site must work without it.

**Anti-slop**: Native page transitions (not library-imitated) signal
engineering craft. Shared element transitions between routes are
rarely seen in AI-generated sites.

## 11. Barely-there UI / 极简界面

**What**: The interface disappears. No visible chrome, no navigation
bars, no buttons — content IS the interface. Typography carries all
hierarchy. Color carries all state. Space carries all structure.

**When**: Editorial pages, portfolio pieces, brand manifestos,
photography-driven narratives — anywhere the content is strong enough
to not need UI scaffolding.

**Implementation**:
- Typography: one serif for display, one mono for data; 2 sizes max
- Color: background + text + one accent, period
- Navigation: inline links within prose, not a nav bar
- Interaction: scroll is the only navigation; the cursor is the only
  pointer
- Whitespace IS the layout — don't fill it

**Failure modes**: Barely-there doesn't mean bare-bones — the
typography must be immaculate, the spacing precise, the pacing
deliberate. Without craft, barely-there becomes lazy.

**Anti-slop**: This is the strongest possible anti-slop signal —
slop needs chrome to hide behind. Barely-there exposes everything.

## Selection matrix

| Technique | Landing | Portfolio | Data story | Product | Editorial |
| --- | --- | --- | --- | --- | --- |
| Scrollytelling | ★★★ | ★★ | ★★★ | ★ | ★★ |
| WebGL/3D | ★★ | ★★ | ★ | ★★★ | ★ |
| Microinteractions | ★★ | ★ | ★ | ★★★ | ★★ |
| HTML-in-Canvas | ★★ | ★ | ★ | ★★ | ★ |
| Motion Narrative | ★★★ | ★★★ | ★★ | ★★ | ★★★ |
| SVG Mask Transitions | ★★ | ★★★ | ★ | ★★ | ★★ |
| Ambient Animations | ★★ | ★★★ | ★ | ★ | ★★★ |
| Physics Interactions | ★ | ★★ | ★ | ★★ | ★ |
| Procedural Generative | ★★ | ★★★ | ★★ | ★ | ★★ |
| View Transitions | ★ | ★★ | ★ | ★ | ★★ |
| Barely-there UI | ★★★ | ★★★ | ★ | ★★ | ★★★ |

★★★ = natural fit · ★★ = works well · ★ = possible but forced

## Combination rules

- Max 2–3 signature techniques per page (see SKILL.md hard rules)
- Techniques must share the same "voice" — Scrollytelling + Ambient
  works; Scrollytelling + Physics fights
- One technique should be the **primary** (the share shot), others are
  **supporting**
- All techniques serve the concept, or they are decoration
