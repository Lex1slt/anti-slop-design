# Define — scoring rubric, the critic loop, and asset enrichment

Goal: push the chosen direction to 9/10. Quality doesn't come from "writing it a bit better" — it's extracted by a critic.

## Rendering (only at delivery, or when the critic asks to see a render)

Screenshots are **not part of the review loop** — the loop's evidence is the versioned HTML, and source review catches what matters most: broken states, lying copy, unloaded fonts, dead motion. What source review can miss is pure rendering optics (optical spacing, contrast in the wild), so render once at delivery — and immediately whenever the critic says "I need to see this rendered".

Edge headless screenshot (silent, windowless, quiet-friendly):

```bash
"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless --disable-gpu \
  --hide-scrollbars --virtual-time-budget=3000 \
  --window-size=1440,900 \
  --screenshot=D:\path\shot-desktop.png \
  "file:///D:/path/artifact.html"
```

- Mobile viewport: `--window-size=390,844`.
- Use forward slashes after `file:///` (`file:///D:/path/artifact.html`).
- For long pages, increase the `--window-size` height or capture in segments.
- Same works for single-screen artifacts like posters/cards (set the window to the artifact's real size).

## Scoring rubric (write it before rendering)

6–9 items, each objectively checkable. Words like "beautiful" or "impressive" are not allowed. Landing-page example:

1. Within 3 seconds the hero says what the product is and who it's for — and the first impression lands as *striking*, not merely clean.
2. Color reads as a deliberate decision — however many hues, chosen and applied with discipline. A single-accent palette is one good answer, not the only one.
3. At least one signature element people will remember (and it's not a gradient/glow), executed flawlessly.
4. **Originality & memorability**: at least one decision is one a competitor could not produce next week — a structure, interaction, or voice with no obvious precedent. Safe-but-perfect fails this item.
5. Copy is concrete (real numbers, real scenarios), zero marketing fluff.
6. No AI defaults: any tell pattern that appears (references/deliver.md list) must be a deliberate, top-studio-grade choice — the unconsidered default use is the tell, not the element itself.
7. Craft holds up at 2× zoom: optical alignment, a typographic hierarchy of 3+ distinct levels, consistent hairlines and spacing rhythm.
8. Motion & interaction: one choreographed signature moment (a load sequence or one-take assembly) plus at least one pointer-reactive behavior, both serving the concept — a flawless but static page cannot score above 5 here.
9. At 390px mobile: no horizontal scroll, no overlapping elements.

## The executor pre-flight gate

The #1 reason review runs long: known failure modes are left for the critic to discover, and every defect class burns a full round. **The critic is not QA.** Before the first submission — and before every submission — the executor runs the whole known-checks battery itself:

Deterministic, zero-tolerance (script what you can):
- **Render the current build first** (desktop full + hero + the widths you claim support). If you have not rendered it, you have not built it — unrendered HTML ships with broken images, dead animations, and missing sections and nobody notices.
- Browser console: zero errors; every font weight actually used is verifiably loaded (e.g. `document.fonts` check — "declared 400, loaded only 600/800" is a real incident);
- **Asset integrity**: every `src`/`href` in the artifact resolves to a file on disk (no 404 images, no missing fonts); animations/keyframes from the previous accepted version are present unless removal was critic-ordered;
- **Completeness floor**: every section, image, and copy block the last accepted version had is still present, unless the critic explicitly ordered its removal;
- Every image/link resolves; no horizontal overflow; every interactive state reachable; self-diff the render against the previous accepted render and against your design intent.

Checklist, honestly written down:
- Rubric self-scored item by item, with one-line justifications (the gap between self-score and critic score is itself a signal);
- AI-tells double pass done; subtraction pass done; copy pass done.

A submission that hasn't passed pre-flight is wasted review. The critic exists for the *unknown* problems; a known failure class recurring is an executor failure and goes into the delivery record.

## Concept ceiling gate (before the loop)

The first critique happens when the direction is fixed but the piece is only ~30–50% polished — structure and the signature moment readable, lo-fi fine. It judges **one question**: *if this were executed flawlessly, would it be a 9?*

- **Ceiling ≥ 9** → pass; the device list freezes (see below) and the loop starts.
- **Ceiling < 9** → **do not enter the loop.** Return to Discover and take another direction (at most twice; then pick the best available and accept execution-mode). Polish can recover execution deficits; it can never raise a concept's ceiling.

This gate is where quality is actually won. A 25-round loop is almost always the symptom of grinding an 8-ceiling concept — the rounds cannot fix what only a different concept can.

The gate also **freezes the device list** (from Discover's budget of ≤5). From here on, one in, one out: any new element must be paid for by removing one, and the trade is recorded in the score log. When a critic demands a new move, the answer is "what gets cut?" — never a bare addition. Scope may shrink mid-loop; it may never quietly grow.

**The device budget counts built mechanisms only — never content.** Recurring constructs (mounts, numbering systems, magnifiers, rulers, seals) are devices. Sections, photographs, copy blocks, and animations the brief requires are **content**: they are never counted against the budget and never cut to satisfy it. If budget pressure conflicts with content, cut decoration, not information — misreading "cut a device" as "cut the product photography" is a documented failure (a run shipped a page missing its own hero image).

## Rubric freeze

The rubric freezes before round 1. Changing standards mid-loop (adding motion, shifting voice) restarts the loop explicitly and is recorded — standard drift is the second-biggest cause of slow convergence.

## Regression invariants

Every defect fixed becomes an item on a **do-not-regress list** kept in the score log (device inventory intact, no text collisions at the named widths, contrast tokens, mobile 390, fonts loaded, caption-in-margin rules…). Pre-flight re-checks the list every round, and a regression is **BLOCKING regardless of everything else**. Without this, each round's new work silently breaks an earlier round's win and the loop churns: fix A, break B, fix B, break A.

## Stopping rules (the bar never moves)

Three ways the loop ends — and only these:

1. **≥ 9/10** from the critic at frozen scope (primary; the bar is unchanged);
2. **Plateau rule** — two consecutive rounds at the same overall score whose blocking lists contain **no structural items** (instrument-level nits only) → stop, deliver, write the residual report. The critic's own verdict that "the gap is execution bugs, not ambition" is the trigger signal;
3. **Hard cap: 8 rounds** → stop, deliver the best-scoring version, write the residual report.

**Structural-or-stop on a plateau**: after any plateau, the next round must be **one structural move — usually a removal** (cut the weakest device, recompose a section), never another batch of micro-fixes. If that move does not move the score, rule 2 fires. Grinding micro-fixes on a plateau is the failure mode this rule exists to kill.

**The residual report** (attached to every delivery that stopped below 9): the score trajectory; what is unresolved and why; the recommended cut; and a **head-to-head** — the current version vs. the version with the recommended cut applied — so the human makes the last taste call. Design's final 8→9 step is often a taste decision, not a defect list; hand it over cleanly instead of grinding toward it.

## The critic loop (core)

**Why it can't self-review**: the executing agent carries the implementation history and its past design decisions; it can't step outside the current situation to see the whole — "make it a bit better" just spins in place. Hand quality judgment to a reviewer agent with no baggage.

Each round:

1. **Snapshot the current artifact into `versions/`** (e.g. `versions/r3-hero.html`) — every reviewed version is kept, nothing is overwritten. **Render the snapshot** (desktop full + hero + every width you claim to support) into `shots/`. The submission is **the snapshot plus its renders** — the source is the record, the render is the evidence.
2. **Continue from the latest accepted version.** Each round edits the last accepted snapshot — never rewrite from scratch, never start from an empty file, and the new version must be at least as complete as the one it replaces (removals only when the critic ordered them).
3. **Spawn a fresh-context subagent** (the Agent tool). Its prompt contains only: the full rubric, the snapshot's file path, the render paths, **the project root (it may Read anything under it — assets, fonts, styles, notes, earlier versions — to verify references and completeness)**, the output format, and the read-only fence. **No past scores or past critiques** — that prevents anchoring and people-pleasing.
3. The critic returns four things: a 1–10 score per rubric item + a one-sentence justification; the **biggest gaps** between "how a top design studio would execute this aesthetic" and the current draft; an overall score (out of 10); and when the total is < 9, mandatory blocking issues — each with its exact location (in the source or on the page), written to **pseudo-code level**, directly actionable.
4. Fix substantively per the blocking issues (layout / color / information hierarchy — not copy tweaks), in one pass.
5. Back to step 1 and apply the **stopping rules** (≥9 / plateau / 8-round cap — see above). The threshold never goes into the critic prompt — its scoring must stay objective — and the critic prompt stays identical every round.

Critic prompt template:

```
You are a world-class design critic — the reviewer top studios fear showing
unfinished work to. Judge this design against the highest bar that exists:
award-winning studio output (Awwwards Site-of-the-Day / FWA caliber for web,
museum-catalog polish for print) — never against "pretty good for AI".

Score anchors — use the full scale honestly:
- ≤ 5  typical AI output: competent but generic, could be from anyone
- 6    professionally clean but forgettable; safe choices everywhere
- 7    a competent agency shipped this — real craft, no wow
- 8    strong studio work — distinctive and well-crafted; a peer would nod
- 9    top-studio showpiece: memorable at first glance AND immaculate in
       detail — typographic rhythm, spacing, hierarchy, cohesion, and one
       signature idea executed perfectly. You would ship it unchanged and
       put your name on it.
- 10   historic. Do not hand this out.

Rules:
- Grade what you see, not the effort or the concept's promise. A great idea
  executed at 80% is an 8 at best.
- Name the emotion first: in one line, what should a visitor FEEL in the
  first 3 seconds? If the design doesn't produce that feeling, that is a
  blocking issue — beauty and mood are requirements, not decoration.
- Motion and interaction are part of the bar for screen artifacts. Demand
  (a) one choreographed signature moment — a load sequence or one-take
  assembly that makes the page arrive alive — and (b) at least one
  pointer-reactive behavior (cursor ripple, magnetic hover, parallax,
  reveal). A flawless but static page caps at 8.
- Escalate, don't nibble. Lead every blocking list with the single biggest
  structural or expressive move the design is missing (composition, motion,
  emotion, concept), then the details. If all your issues are sub-2px nits
  while overall < 9, you have missed the gap — go back and name the bold
  move.
- Hunt for flaws even when impressed: typographic detail (hierarchy,
  optical alignment, line length, contrast), spacing rhythm, color
  discipline, cohesion, and whether the signature element truly lands.
- Penalize safe, average, or "assembled from components" decisions harshly;
  reward a strong point of view.
- Flawless but familiar caps at 8: craft cannot buy originality. Name the
  decision a competitor could not produce next week — if there is none,
  this is not a 9, no matter how clean it is.
- One AI cliché (purple gradient, glow, glassmorphism, three identical
  cards, emoji icon, filler copy) caps the overall score at 7.
- Give tight, specific, executable feedback — pseudo-code is welcome.
  No vague prose.
- Be harsh by default. If you score a 9, add one sentence on why this
  deserves to be remembered.
- The device set is frozen. Demand a new element only by naming which
  existing one gets cut to pay for it ("add X, remove Y") — a demand that
  cannot name its cut is not a blocking issue.
If overall < 9: list blocking issues, each with its exact location on the
page, led by the biggest structural move. Classify every issue
BLOCKING / MAJOR / MINOR — minors are batched by the executor into one
pass and never consume a round on their own.

Criteria:
<full rubric>

Artifact (Read it; modify nothing): <artifact file path>
```

Note: "done means 9+" is the outer process's stop condition — **never** put it in the critic's prompt. It must score objectively, not be nudged to score high.

### Three cheats and their guards

| Cheat | Consequence | Guard |
|---|---|---|
| Giving the critic last round's scores/critiques | Score inflation, a comfy string of 8s | Fresh context every round |
| Asking the critic "is this good enough?" | Leading the witness | Only the rubric and the artifact snapshot, no lean |
| Grinding past a plateau | 20 rounds, same score, scope quietly doubled | Structural-or-stop; plateau rule; 8-round cap |
| Stopping early because rounds piled up | Shipping a 7/10 | The loop ends only by the three stopping rules — and when it ends below 9, the residual report says so |

### The critic is advisory-only — but project-aware

**A critic that starts fixing stops being a critic.** Fence every critic subagent in its brief: it may **Read anything in the project** (artifact, assets, fonts, styles, design notes, earlier versions) and **view the provided renders** — that is how it verifies references, completeness, and honesty (a caption is only checkable against the real asset). But it must **not** edit, create, or delete files, must not run commands, and must not render images itself (the executor's renders are the evidence). Every finding goes into the verdict text as an executable instruction for the executor. The premium model's job is judgment, not labor; the cheap model's job is labor, not judgment.

### Triage — one round absorbs every class of issue

Every critique classifies its issues, and the executor clears them all in one pass:

- **BLOCKING (at most 3)** — structural or conceptual; unfixed, the round cannot advance;
- **MAJOR** — completion problems fixed in this round;
- **MINOR (batched)** — all nits collected into one batch pass before the next submission; a minor never consumes a round on its own.

A round whose feedback is entirely MINOR must not exist: either the piece is at ≥9 (loop over), or the critic missed the real gap — escalate per the rules above. **Two such rounds in a row is the plateau signal: stop and deliver with the residual report; do not spend round three on the same class.**

### Dual critics in parallel (optional, coverage ×2 at half the rounds)

When budget is no object, spawn two read-only critics per round with different lenses — **Craft** (typography, detail, spacing, finish) and **Concept** (idea, emotion, motion, originality) — and merge their blocking lists into one fix pass. Two lenses find disjoint problems; serial rounds find the same problems twice.

### Model split — expensive taste reviews, cheap hands build

The split is the point: **a premium, high-taste model plays critic; a cost-effective workhorse does the grunt work.** The critic's taste is the ceiling of the entire loop; the executor's job is to follow pseudo-code-level instructions precisely, which a cheap fast model does well.

- **Pin both roles explicitly** on harnesses with per-subagent model selection (e.g. a dynamic-workflow `subagent_model`, or equivalent API knobs): critic → the strongest design-judgment model configured on the machine (flagship / "pro" tier); executor → a cost-effective tier. Never let both roles silently inherit whatever model the session happens to run.
- **Critic precondition (before round 1)**: if the critic cannot be pinned to a top-tier design model, say so up front, and stop by the **plateau rule** — not the 9-threshold. A same-tier critic cannot certify "immaculate" (so the 9 never arrives) and compensates by finding ever-finer defects and demanding ever-more ambition, which drives scope growth instead of convergence. Its escalation ideas then go to `v2-list.md`, not into the fix batch.
- "Strong at coding ≠ strong at design creativity": pick the critic for design reputation, not benchmarks — and re-pick it whenever a stronger model ships.
- Which is why critic feedback must be **concrete to the pseudo-code level**: any executor model then knows exactly what to change.
- On single-model harnesses the split degrades to one model playing both roles — but **fresh context + an objective rubric** are non-negotiable; without them even the best critic degrades.

### Keeping the critic's output stable and honest

1. **The more objective the criteria, the better.** Bad: "judge whether it looks beautiful and not AI-generated" (subjective; results jump wildly). OK: "review the aesthetic we're going for, imagine how a top studio would execute it, and score against that bar" (a framework). **Great: "here are 5 images — 4 professional examples and 1 screenshot of our product — rank them by polish and taste."** (concrete, objective, and carries its own visual baseline).
2. **Give the critic reference images as a baseline/moodboard**: find 2–3 world-class references and mark them "baseline, not a target — don't copy". mcp image-search works for this.
3. **Iterate on quality, never on budget**: the loop ends when the critic stops finding real gaps — never because rounds piled up or tokens burned. If scores oscillate without rising, the fixes have been cosmetic: change something structural (composition, hierarchy, palette), not details.
4. **Track the size of each round's delta**: if a round produced only sub-2px fixes, the next round must ship a structural move — recompose, add the signature motion, introduce pointer interaction. Cosmetic rounds cannot cross the 8→9 gap; only expressive ones can.

## Asset enrichment (use as available)

Code can only produce text and simple shapes — gradients, blobs, and patterns are precisely the AI-slop hot zone. Great design is often "one great image plus a few words". Add assets as needed, then return to the critic loop for another pass.

### 1. Generated images (highest priority)

Models rarely generate images unprompted — **you must ask explicitly**. Example prompt:

```
The design is pretty plain. Add more personality using image generation.
Consider shaders or 3D effects in combination with images to create more
interesting visuals. Verify that your work looks right frame-by-frame
in the browser.
```

Access routes (pick per environment):

- The agent has a built-in image tool (Codex/Antigravity/Grok Build class): just tell it to use it;
- You have a ChatGPT subscription: route through the Codex CLI so it bills the subscription, not an API key;
- API key only: a dedicated, tightly-capped OpenAI/Gemini key. **Key hygiene**: keep it in `.env.agents` (gitignored) and state in AGENTS.md/CLAUDE.md that it's "for development only, must not ship with the product"; a separate key with a spend cap means a leak is a single-key revoke;
- Local order: image-generation API (when a key exists) → mcp image-search for real photos/textures (mind licensing; prefer CC0 and official assets) → else the restrained-typography route (big type scale, generous white space, one accent color — a premium solution in itself, not a compromise).

**Product images are Apple-grade or they don't ship.** Wherever the page shows a product (cards, spec areas, object-featured heroes), the image must be clean studio cutout work:
- seamless neutral background, or a precise transparent cutout — never an inherited messy environment;
- ultra-high resolution, razor-sharp edges — no halo, no jaggies from a lazy knockout;
- controlled light: one soft contact shadow or a subtle reflection, never a random environment shadow;
- one consistent angle and zoom across the entire set.

Pipeline: generate with an explicit studio prompt (`product photography of <object>, seamless pure-white background, studio softbox lighting, ultra sharp, centered, commercial catalog style`) → cut out with a removal model (rembg-class tool or a background-removal API, alpha matting on) → verify edges at 2× zoom. In-situ "life" photography (vallone-style) is the other legitimate mode — for heroes and mood sections; never mix the two modes within the same product set.

### 2. Shaders / 3D

Dot fields, ripples, coronal glows, light streaks — shader/modeled effects layered with images at container junctions and section transitions sharpen the style instantly. CSS-first; WebGL/Three.js only when the effect truly needs it.

### 3. Video animation (for complex physics and materials)

Plain motion goes through CSS transitions / scroll-driven animations first. Reach for video generation only in these two cases (an aggregator platform like fal.ai means one key lets the agent pick the current best model):

- **Green-screen loop assets** — "video that doesn't look like video":
  1. Generate a looping clip on a solid background (e.g. a crystal splintering and slowly spinning, glass refracting the page behind it);
  2. For refraction-class effects, **render the video over the page's background colors first** (baking the refraction in), then remove the background with chroma key / a video-matting model;
  3. Layer the transparent asset anywhere in the UI.

  ```
  Replace the <image> with a looping video clip: <describe motion and material>.
  To get convincing <refraction/glass> effects, render the video over the
  page background colors first (baking in the effects), then remove the
  background with a video matting model. Use <platform> key: ...
  Find appropriate recent models for video generation and background removal.
  ```

- **Keyframe-interpolation transitions** — one continuous shot under the scrollbar:
  1. Generate the first frame with image generation (product state A);
  2. Generate the A→B transition clip (pick a model with strong physics and consistency, Seedance-class);
  3. **Seed the next transition from that clip's final frame** so they join seamlessly;
  4. Scrub the clips frame-by-frame as the user scrolls or swipes.

  ```
  Build a demo that transitions between <N> states of <product> as the user
  scrolls: <one line per state>. Generate the initial frame with image
  generation, then a video clip from that frame to the next state. Use the
  final frame to seed the next transition so it continues seamlessly. Scrub
  through the transitions as the user scrolls. Use <platform> key: ...
  ```

After adding assets, return to the critic loop — assets are a bonus, not a way around review.
