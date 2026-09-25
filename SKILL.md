---
name: anti-slop-design
description: A scope-disciplined, critic-gated design protocol for coding agents — three stages (Discover → Define → Deliver), a device budget, a concept ceiling gate, regression invariants, and three stopping rules. Use whenever the user asks you to "design / beautify / make" any visual artifact (web page, landing page, app screen, poster, social card, slide deck, UI), or complains that output looks "too AI, too generic, like a template" — even if they never say the word "design".
---

# Anti-Slop Design

A working protocol for coding agents that design. It exists because of one
reliable failure: when an AI agent designs, every decision resolves to the
choice least likely to offend anyone. It also never deletes anything, and it
calls "done" at 6/10.

The protocol replaces that behavior with three stages, a frozen scope, and a
reviewer that cannot be pleased by effort. It optimizes for convergence, not
grinding: ambition is spent before the first round starts, and the rounds
only close the distance.

## Why output converges to mush

1. A model predicts the next token and was tuned to please everyone — so
   every design decision resolves to the safest option on the table.
2. Strong design is the opposite: a point of view, a feeling, a rule broken
   on purpose.
3. It never deletes. Volume reads as progress.
4. It declares victory at 6/10.

The countermeasures are exactly three, and everything below serves them:

- **Entropy from outside the model** (seed rolls, named variation axes) —
  a model asked to "be random" only predicts randomness-shaped text;
- **Judgment from a reviewer with no history** — a fresh-context critic that
  scores against a frozen rubric;
- **The last pass removes more than it adds.**

Scope is the other half of the contract. A loop can only converge inside a
frozen scope: the device list is budgeted in Discover, frozen at the concept
gate, and the bar never moves mid-loop.

## The three stages

| Stage | Goal | Share | What happens |
| --- | --- | --- | --- |
| 0. Align | 澄清意图，产出书面 brief | 视交互深度 | 设计树式多轮 QA（每轮前沿问题 + 推荐答案）→ PROJECT-BRIEF.md →（可选）方向卡雏形给用户挑选 |
| 1. Discover | Aim at a real problem, then open the space | ~15% | problem brief → seed roll / named variation axes → intent first → 3–4 direction cards + 1 wild card |
| 2. Define | Close the distance to 9/10 | ~70% | concept ceiling gate → frozen rubric + fresh-context critic loop → device one-in-one-out → assets only as the concept needs |
| 3. Deliver | Restraint | ~15% | subtraction pass → defaults double pass → hand-written load-bearing copy |

Templates, checklists, and commands live in `references/` and are read when
the stage starts:

- `references/align.md` — Stage 0 alignment protocol: rounds of frontier
  questions with recommended answers, the brief document, the artifact-form
  question, and the reviewer-model question
- `references/discover.md` — problem framing, the seed roll, ambitious
  briefs, intent first, direction cards, the device budget, the
  anti-academic engine
- `references/define.md` — pre-flight, the ceiling gate, the critic loop and
  its prompt, triage, model split, asset rules, rendering
- `references/deliver.md` — subtraction, defaults on trial, hand-written
  copy, the delivery checklist
- `references/taste-library.md` — concrete moves distilled from studied
  sites, each with when-to-use and known failure modes
- `references/techniques.md` — the full technique map (scroll narrative,
  motion, layout, styles, 3D/immersive, APIs, combos) for direction cards,
  wild cards, and LEAP rounds
- `references/scrollytelling.md` — the scroll-as-timeline paradigm: fixed
  stage, continuous functions, shared elements, camera model — read this
  when the brief involves scroll-driven narrative
- `references/signature-techniques.md` — 11 signature techniques with
  implementation depth (HTML-in-Canvas, physics, motion narrative,
  SVG masks, barely-there UI…) and a selection matrix by project type

## Stage 0 — Align

- **Intent before prompts** → 意向访谈（align.md）：设计树式多轮 QA，
  每轮前沿问题 + 推荐答案，产出 PROJECT-BRIEF.md；可选地给用户看
  3–4 张简化方向卡先排除明显不想要的。

## Stage 1 — Discover

Never skip it. Everything downstream inherits its quality.

- **Frame the problem first.** List what real users actually struggle with,
  pick the worthiest, write a one-sentence problem brief. The first reaction
  is a hypothesis, not a need.
- **Roll for entropy.** 8 random characters from a shell; read them as an
  era, a subculture, a material, a light, a type mood. Named variation axes
  ("four directions, four typefaces, four palettes, no repeats") are the
  cheaper equivalent.
- **Intent before prompts.** Have the model list directions wide-not-deep,
  filter on first reaction, iterate on taste — then build directly. Do not
  ask the model to convert the intent into "a full prompt" first.
- **Audit the category, then break it.** List what these sites always do,
  forbid 2–3 of those habits, and make sure one direction breaks one of
  them.
- **Mine the taste library and the technique map.**
  `references/taste-library.md` translates "make it feel expensive / alive
  / radical" into sourced, concrete moves — at most 2–3 per page;
  `references/techniques.md` is the full menu when the wild card or the
  formal language needs a bolder pick.
- **The wild card.** Always produce one direction that breaks a forbidden
  convention or steals its structure from another medium. It may lose the
  pick; it may not be absent. Pull risky styles from
  `references/techniques.md` (◆-marked) — with a concept argument.
- **The share shot.** Every direction names the moment people screenshot.
  No share shot, no entry into Define.
- **Ground it in the subject.** The subject's industry, materials, and
  vocabulary are where distinct choices come from — a toy for 8-year-olds
  and a financial dashboard should not share a palette, a typeface, or a
  hero. Open the hero with the most characteristic thing in the subject's
  world.
- **Vary the formal language.** The axis-aligned rectangle grid is one
  geometry among several — curvilinear, diagonal, organic, fragmented.
  The card set must span at least three formal languages, and the wild
  card takes the riskiest one.
- **Choose the artifact form deliberately.** Web pages, native app
  screens (iOS/Android), slides, posters/prints, immersive 3D — if the
  user named no form, pick the one that best serves the problem brief
  and write the one-line reason; a default web landing page is not the
  default answer.
- **Device budget.** List the candidate *devices* — built mechanisms such
  as mounts, numbering systems, boards, magnifiers, seals. Keep at most 5
  (1 signature + 2 supporting + 2 optional), each answering a sentence from
  the problem brief; record why the others died. Sections, photos, copy,
  and required animations are content, not devices — the budget never cuts
  them.

Deliver 3–4 direction cards that are unmistakably different. User online:
they pick. Autonomous: pick by declared risk, write the reason, move on.

## Stage 2 — Define

Convergence, not grinding. The score is won at the front — a concept with a
9 ceiling at a disciplined scope — and the rounds only close the distance.

- **Concept ceiling gate (before the loop, at ~30–50% fidelity)**: probe
  the machine's enrichment capabilities first
  (`references/tools/capabilities.mjs`), then ask one question —
  *executed flawlessly with what is actually reachable, is this a 9?* —
  plus the **sameness test**: if this plan would look at home on any
  similar brief, it is not done; revise the plan before building. No →
  back to Discover, another direction (at most twice, then ship the best
  available). A 25-round loop is the signature of polishing an 8-ceiling
  concept.
- **SPAs and living products: the evidence harness is the first Define
  deliverable** — mocked network, a state driver for every reviewed
  state, final-state override, and recorded platform limits (render
  environment findings are tooling findings, not design defects).
- **One frozen rubric (6–9 items), originality included.** Freeze it before
  round 1; changing standards mid-loop restarts the loop explicitly.
- **Pre-flight on every submission**: render the build first with
  `references/tools/render.mjs` (do not hand-write the invocation —
  unrendered HTML ships broken images and dead motion), assemble the
  **evidence pack** (all-width renders, the load-sequence strip, a
  calibration set: one plain-prompt baseline + award-tier genre
  references), then console clean, fonts truly loaded, every referenced
  asset on disk, completeness floor holds, no overflow, rubric
  self-scored, defaults/copy/subtraction passes done, and the unannounced
  floor: visible keyboard focus, reduced motion respected, AA contrast.
  The critic is not QA.
- **Loop**: snapshot into `versions/` + render + assemble the evidence
  pack → a fresh-context critic judges **eyes-first** (renders and the
  sequence strip before source), **ranks the design against the
  calibration set**, then audits the source only to locate causes →
  returns per-item scores, the biggest gaps, and blocking issues written
  as instructions a builder can apply verbatim → clear BLOCKING / MAJOR /
  MINOR in one pass.
- **The rhythm: alternate LEAP and FIX rounds.** A LEAP round ships one
  bold move from the menu in `references/define.md` — recomposition,
  palette inversion, type-scale inversion, device replacement, medium
  jump, density flip, art-language mutation — declared in the score log
  before building (what jumps, what pays for it). Two consecutive
  FIX-only rounds are forbidden below 9: detail rounds never move the
  needle, only leaps do.
- **Reach into the capability toolbox during Define** — generated images,
  cutouts/keying, super-resolution, 3D, video and motion — proactively,
  whenever the concept calls for something code alone can't produce well;
  then back into the critic loop.
- **Concept freeze**: after the gate, the Concept lens verifies delivery of
  the accepted concept. New ideas go to `v2-list.md`, not into this loop.
- **Regression invariants**: every fixed defect joins a do-not-regress list
  re-checked each round. A regression is blocking, always.
- **Model split**: default is the session model as both critic and
  workhorse — but the README recommends running the reviewer on the
  strongest design model available, because reviewer taste is the
  ceiling of the loop. If the user names a reviewer model, use it
  verbatim.

## Stage 3 — Deliver

- **Subtraction pass** (own round): "does the page get worse without it?"
  — no concrete answer, gone. Bounded by comprehension: if an icon stops
  understanding, add the label back instead.
- **Defaults double pass**: visual and copy habits interrogated separately;
  every instance is either a justified choice or removed.
- **Hand-written copy**: title, primary CTA, empty states, error messages —
  rewritten by hand; model drafts do not ship.

## Tools — call them, don't re-invent them

The protocol is rendering-agnostic: its only integration point with any
stack (Vue, React, Svelte, Astro, Next, plain HTML, slides, posters) is **a
renderable URL or file** — framework recipes live in
`references/define.md`.

- `references/tools/capabilities.mjs` — probe which enrichment
  capabilities (image/video/3D generation, super-resolution, keying) are
  actually enabled before the concept gate;
- `references/tools/render.mjs` — the renderer for every round and for
  delivery (all widths, deterministic file names, `--gpu` for WebGL-heavy
  pages);
- The **capability toolbox** (`references/define.md`): generated images,
  cutouts and keying, super-resolution, 3D, video and motion — reach for
  these proactively whenever code alone would look worse;
- Image generation / image search — assets before CSS decoration;
- Contrast, reduced-motion, and focus checks — scripted in pre-flight;
- Whatever else the job needs, call it proactively instead of hand-rolling
  it per project; if a needed tool doesn't exist, say so at the stopping
  rule.

## Hard rules

1. Stages run in order; no jumping into Deliver.
2. Below 9/10, the next round changes something structural (layout, color,
   hierarchy) — not copy polish.
3. The critic is fresh-context every round and never sees prior scores or
   notes.
4. Randomness enters from outside the model, or not at all.
5. Concrete instructions only; "more modern" is not an instruction.
6. Scope moves one way inside the loop: shrink. One device in, one out,
   trade recorded.
7. The loop stops by rule — ≥9, plateau, or the 8-round cap — and delivers
   with a residual report. It never runs past a stopping rule, and it never
   asks permission to stop.
8. Resume from the last accepted snapshot; never rewrite from scratch; the
   completeness floor always holds.
