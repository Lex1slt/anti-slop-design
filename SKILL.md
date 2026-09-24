---
name: anti-slop-design
description: A three-stage protocol (Discover → Define → Deliver) that forces AI out of its default design taste — stunning, un-generic web pages, landing pages, posters, social cards, slides, and UI. Use whenever the user asks you to "design / beautify / make" any visual artifact, or complains that output looks "too AI, too generic, like a template" — even if they never say the word "design".
---

# Anti-Slop Design — three stages that force AI out of its default taste

## Why

Left to its defaults, AI design is slop: purple gradients, Inter, rounded-card grids. The root cause is not a lack of capability:

1. **Prediction instinct** — an LLM is a next-token predictor tuned on human feedback; at every design decision it fills in the token "most likely to please everyone", which adds up to committee-grade mediocrity;
2. **Great design is the opposite** — it starts from feeling, aims for emotional resonance, and breaks rules with memorable, unexpected choices — exactly what the model avoids by default;
3. **It only adds, never subtracts** — models rarely delete elements; piling up is mediocrity;
4. **It finishes too early** — it loves to declare "done!" at 6/10.

The countermeasures are exactly three: **inject randomness from outside the model** (seed strings / named variation dimensions); **hand quality judgment to a critic agent with no baggage**; **premium comes from deleting, not adding**.

This skill chases the ceiling: **quality is the only stop condition**. Token cost, round count, and wall-clock time are explicitly not constraints — the loop runs as long as the critic finds real gaps.

The process skeleton is borrowed from the Double Diamond — diverge on problems → focus one problem → diverge on solutions → focus and deliver — translated into the three stages below.

## Process overview

| Stage | Goal | Effort | Key moves |
|---|---|---|---|
| 1. Discover | Breadth: fix the problem, then explore the possibility space | ~15% | converge problem hypotheses → seed string / named dimensions → 3–4 direction cards |
| 2. Define | Depth: push the chosen direction to 9/10 | ~70% | scoring rubric → fresh-context critic loop → enrich with generated images / shaders / video |
| 3. Deliver | Restraint: subtraction and de-AI-ing | ~15% | subtraction pass → AI-tells double pass → hand-written key copy |

Read detailed templates and commands on demand:

- `references/discover.md` — problem framing, seed strings, ambitious briefs, intent-first, direction-card format
- `references/define.md` — critic loop and prompt template, model split, image/shader/video enrichment, local screenshot command
- `references/deliver.md` — subtraction pass, AI-tells double pass, hand-written copy, delivery checklist
- `references/taste-library.md` — distilled moves from studied sites (vallone, chronoswiss, offbrand, grair, rhine): what each is for, when to use it, plus the full site studies

## Stage 1 — Discover (mandatory, never skip)

- **Fix the problem first**: list several "problems worth solving" hypotheses from real user scenarios, then converge. Never assume your first reaction is the need.
- **Roll a seed string (or name the variation dimensions) before diverging**. Never go straight to "design me X" — that returns the average; words like "unique, random, unconventional" don't work either.
- **Intent first**: have the model list design intents broad-not-deep, filter and iterate on your taste; once the intent is formed, start building directly — don't ask the model to rewrite it into a full prompt first. For ambitious briefs, mine `references/taste-library.md` first: translate "feel" into sourced, concrete moves — at most 2–3 per page.
- **Wild card + conventions audit**: audit what this category always looks like and explicitly forbid 2–3 of those conventions; always produce one wild-card direction that breaks one of them (it may lose, but it must exist). Every direction must name its **share shot** — the moment people screenshot. A design with no share shot doesn't enter Define.
- **Device inventory and budget**: a *device* is one built mechanism (specimen mount, issue numbering, loupe, ruler, archive strip, seal…). List the candidate devices, keep at most **5** for a single page (1 main signature + 2 supporting + up to 2 optional), and make each name the sentence it carries from the problem brief. Kill the rest before Define and record why. Device count is the strongest predictor of loop length — every device is a permanent defect surface.
- **Produce exactly 3–4 direction cards** that differ significantly (not one idea recolored); generate them one at a time, each one explicitly avoiding what the previous cards already occupy.
- User online: present the cards and let them pick. Autonomous mode: pick one by the card's own risk assessment, note the reason, and continue.

## Stage 2 — Define (convergence, not grinding)

Quality is won at the front — a strong concept at a disciplined scope — not by grinding many rounds. Rounds are for convergence; the ambition is set before the loop.

- **Concept ceiling gate (at ~30–50% fidelity, before the loop)**: judges one question — *if this were executed flawlessly, would it be a 9?* If the ceiling is below 9, do **not** enter the loop: return to Discover and take another direction (at most twice, then pick the best available). Polish can recover execution deficits; it can never raise a concept's ceiling. A long loop is usually the symptom of polishing an 8-ceiling concept.
- **Device freeze + one-in-one-out**: after the gate the device set is frozen. Any new element must be paid for by removing one, and the trade is recorded. Critic demands for new moves are answered with "what gets cut?", never with a bare addition.
- **Executor pre-flight gate**: render the build first (desktop + claimed widths) — unrendered HTML ships with broken images and dead animations; then run the known-checks battery — console clean, fonts truly loaded, **every referenced asset exists on disk**, completeness floor holds, links resolve, no overflow, rubric self-scored, AI-tells/copy/subtraction passes done. The critic is not QA; known failure modes never cost a round.
- **Write an objective scoring rubric (6–9 items) — originality & memorability included — and freeze it before round 1**. Changing standards mid-loop restarts the loop explicitly.
- **Regression invariants**: every defect fixed becomes an item on a do-not-regress list re-checked each round; a regression is BLOCKING regardless of everything else.
- Loop: snapshot the artifact into `versions/` **and render it** (desktop + supported widths) — submit **both** the snapshot and its renders → a **fresh-context** critic subagent reads them plus anything else in the project (read-only: assets, fonts, notes, earlier versions) and returns the biggest gaps → fix substantively in one pass.
- **Triage**: the critic classifies issues BLOCKING (≤3) / MAJOR / MINOR-batch; the executor clears all three classes in one pass — a minor never consumes a round.
- **Critic escalation, not nibbling**: every round leads with the biggest structural/expressive move. Flawless-but-static caps at 8; flawless-but-familiar caps at 8 too — craft cannot buy originality.
- **Concept freeze**: once the gate passes, the Concept critic verifies delivery of the accepted concept and may only veto if the concept is *broken*; its new ideas go to `v2-list.md`, not into this loop.
- **Critic precondition**: the critic runs on the strongest design judgment available (pinned explicitly where the harness allows). If it can't be, say so before round 1 and stop by the plateau rule, not the 9-threshold.
- **Three stopping rules (the bar never moves)**:
  1. the critic independently scores **≥ 9/10** at frozen scope (primary);
  2. **plateau rule** — two consecutive rounds at the same score with no structural blocking items → stop, deliver, write the residual report;
  3. **hard cap: 8 rounds** → stop, deliver the best version, write the residual report.
- **Structural-or-stop on a plateau**: after any plateau the next round must be one structural move — usually a *removal* (cut the weakest device) — never another batch of micro-fixes. If that move doesn't move the score, the plateau rule fires.
- **Residual report** (with any non-9 delivery): score trajectory, what is unresolved and why, the recommended cut, and a head-to-head (current vs. cut version) so the human makes the last taste call.
- Never put the threshold into the critic prompt (keep its scoring objective); use the same critic prompt every round.
- **Model split, pinned explicitly**: a premium high-taste model is the critic, a cost-effective workhorse executes its pseudo-code-level notes. The critic's taste is the ceiling of the whole loop — never downgrade it to save cost.
- Enrich with three kinds of assets: generated images, shaders/3D, video animation (chroma-key loops, keyframe interpolation).

## Stage 3 — Deliver

- **Subtraction pass**: for every element ask "does the design get worse without it?" — no concrete reason, delete. Bounded by comprehension cost: if an icon isn't self-explanatory, add a text label or hover hint instead of deleting.
- **AI-tells double pass**: visual and copy fingerprints, checked in two separate passes. The list names habits to interrogate, not banned elements — every pattern that appears must be a deliberate, top-studio-grade choice; the default use is the tell, not the element.
- **Hand-write the key copy**: title, primary CTA, empty states, error messages — rewrite these yourself; don't ship the model's draft.

## Local toolchain

- **Screenshots**: Edge headless (silent, windowless, quiet-friendly), command in references/define.md.
- **Real imagery**: image-generation API first (when a key exists); else mcp image-search for real photos/textures; else the restrained-typography route.
- **Quiet operation**: fully silent, no pop-up windows, low load — never disturb.

## Hard rules

1. The three stages run in order; never jump from Discover straight to Deliver.
2. When the critic scores below 9/10, the next round must change something substantive (layout / color / information hierarchy), not tweak copy.
3. The critic gets a fresh context every round and never sees past scores or conversation (prevents anchoring and people-pleasing).
4. Randomness always comes from outside the model (seed strings or named variation dimensions) — never from the model "freestyling".
5. Concrete instructions only; grand adjectives are not instructions ("more modern", "minimal", "premium" don't count).
6. **Scope discipline**: work inside the device budget, one-in-one-out, frozen after the concept gate. The loop may shrink scope, never quietly grow it.
7. **The loop stops on its own**: ≥9, plateau, or the 8-round cap — then deliver with the residual report. Rounds are for convergence, never for discovering the idea; a concept with a sub-9 ceiling goes back to Discover instead of being ground down.
8. **Continue from the latest accepted version; never rewrite from scratch.** Every round edits the last accepted snapshot, and the completeness floor holds: everything the last accepted version had (sections, images, copy, animations) remains unless the critic ordered its removal.
9. In autonomous mode, run to a stopping rule and deliver — do not ask "want me to keep optimizing?", and do not run past a stopping rule either.
