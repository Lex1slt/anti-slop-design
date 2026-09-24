# Define — converge inside a frozen scope

The score is decided before the loop starts: a concept with a 9 ceiling, a
frozen device list, a frozen rubric. The rounds exist only to close the
distance — and three rules decide when they stop.

## Rendering (at delivery, or whenever seeing is required)

The loop's evidence is versioned HTML plus the renders taken from it.
Source review catches broken states, lying copy, unloaded fonts, and dead
motion; renders catch what only pixels show. Both are cheap — render at
delivery, and any time judgment needs eyes.

Edge headless (silent, windowless):

```bash
"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless --disable-gpu \
  --hide-scrollbars --virtual-time-budget=3000 \
  --window-size=1440,900 \
  --screenshot=D:\path\shot-desktop.png \
  "file:///D:/path/artifact.html"
```

- Mobile: `--window-size=390,844`.
- Forward slashes after `file:///`.
- Long pages: taller window, or capture in segments.
- Single-screen pieces: size the window to the piece.

## The rubric (written before the loop, then frozen)

6–9 items, each independently checkable. "Beautiful" and "impressive" are
not criteria. Landing-page example:

1. Three seconds in, the page has said what this is and who it's for — and
   the first look is striking, not merely tidy.
2. Color reads as a decision — however many hues, applied with discipline.
   A single-accent palette is one good answer, not the only one.
3. One signature element people will remember (not a gradient/glow), built
   without a single sloppy edge.
4. Copy is concrete — real numbers, real scenes — zero marketing fog.
5. Defaults: nothing on the inherited-defaults list (deliver.md) appears
   without a deliberate, top-tier justification.
6. Craft at 2× zoom: optical alignment, 3+ type levels, one hairline
   weight, spacing with rhythm.
7. Motion & interaction: one choreographed moment plus at least one
   pointer-answer, both in service of the idea. Static perfection scores
   ≤5 here.
8. At 390px: nothing overflows, nothing overlaps.

## Pre-flight (every submission passes this, or it isn't submitted)

The critic is not QA — known failure modes are the executor's to catch.
Run the battery before asking for judgment:

- **Render first.** Unrendered HTML ships broken images, dead animations,
  and missing sections, and nobody notices until a human looks.
- **Asset integrity**: every `src`/`href` in the artifact resolves to a
  file on disk; every animation from the previous accepted version is
  still present unless removal was ordered.
- **Completeness floor**: every section, image, and copy block the last
  accepted version had is still there — removals only by critic order.
- Console clean. Every font weight actually used is verifiably loaded
  (a "declared 400, bundled 600 only" mismatch is a real incident).
- No horizontal overflow; interactive states reachable.

Written down, not held in memory:

- The rubric self-scored item by item, one line of justification each —
  the gap between self-score and critic score is a signal in itself;
- Defaults pass, copy pass, subtraction pass done.

A submission that skipped pre-flight wastes a review. The critic exists
for the *unknown* problems; a known failure class recurring is an executor
failure and goes on the delivery record.

## The concept ceiling gate (before the loop)

One question, asked when the direction is fixed and the piece is only
30–50% built: **if this were executed without flaw, would it be a 9?**

- Yes → freeze the device list, start the loop.
- No → do not enter the loop. Return to Discover, take another direction
  (at most twice; then ship the best of them and say so).

Polish can recover execution deficits; it can never raise a ceiling. A
loop that runs for twenty rounds on an 8-ceiling concept is not persistence
— it is the protocol's failure mode, and this gate is where it dies.

The gate also freezes the device list (Discover's budget, ≤5): one in, one
out, trade recorded in the score log. When a reviewer asks for a new move,
the answer is "name the cut that pays for it" — never a bare addition.
Scope may shrink inside the loop; it may never quietly grow.

## Regression invariants

Every defect fixed becomes a line on a **do-not-regress list** kept in the
score log: device inventory intact, no text collisions at the named widths,
contrast tokens, mobile 390, fonts loaded, captions inside the margin.
Pre-flight re-checks the list every round, and a regression is **BLOCKING
regardless of everything else**. Without this, each round's new work
silently breaks an earlier round's win, and the loop churns forever: fix A,
break B, fix B, break A.

## Stopping rules

Three ways the loop ends. None of them lowers the bar; the bar is the same
in all three.

1. **≥ 9/10** from the critic at frozen scope — the primary exit.
2. **Plateau** — two consecutive rounds at the same overall score whose
   findings contain no structural items (instrument-level nits only).
   Stop, deliver, write the residual report. When the review itself says
   "the gap is execution bugs, not ambition", that is this rule firing.
3. **Hard cap: 8 rounds** — stop, deliver the best-scoring snapshot, write
   the residual report.

**Structural-or-stop**: after any plateau, the next round must ship one
structural move — usually a removal (cut the weakest device, recompose a
section). A batch of micro-fixes after a plateau is the one move this
protocol forbids.

**The residual report** travels with every delivery that stopped below 9:
the score trajectory; what is unresolved and why; the recommended cut; and
a head-to-head — current version against the cut version — so the final
taste call is made by a person, cleanly, instead of by a seventeenth round.

## The critic loop

Why a separate head: the builder carries its own history and its own past
decisions, and cannot see around them. Judgment goes to a reviewer with no
baggage — and the reviewer never learns what earlier reviewers said.

Each round:

1. Snapshot the artifact into `versions/`; render it. The submission is
   the snapshot plus its renders.
2. Spawn a fresh-context critic (read-only fence, below). Materials: the
   frozen rubric, the snapshot path, the render paths, the project root
   for reference checks. Nothing else — no history, no prior notes.
3. The critic returns: a score per rubric item with a one-line reason; the
   biggest gaps against "how a top studio would execute this aesthetic";
   an overall /10; and below 9, blocking issues — located, classified
   BLOCKING / MAJOR / MINOR, each writable as an instruction a builder
   applies without taste.
4. Clear all three classes in one pass. Below 9, the round must change
   structure — layout, color, hierarchy — not copy.
5. Apply the stopping rules. The threshold never enters the critic's
   prompt, and the prompt never changes between rounds.

Critic prompt (frozen; identical every round):

```
You are the last review before this design ships. Hold it to the standard
of award-winning studio work — the kind that gets featured, not the kind
that fills portfolios. "Competent for AI" is not a standard; it is the
problem being audited.

How to score (full scale, honestly):
- 1–4  broken, or a template with the serial numbers filed off
- 5–6  clean, correct, forgettable — nothing wrong, nothing chosen
- 7    professional craft; safe everywhere; forgotten in a minute
- 8    distinctive and well-made; a senior peer approves
- 9    exhibition grade: one idea carried perfectly and nothing accidental
       left in — type rhythm, spacing, hierarchy, cohesion all deliberate.
       You would sign it.
- 10   once in a career. Not this.

Non-negotiables while judging:
- Judge the artifact in front of you. Intent scores nothing; a great idea
  built to 80% is an 8.
- Say in one line what the viewer should FEEL in the first three seconds.
  If the design cannot produce that feeling, that is blocking — mood is a
  requirement, not garnish.
- On screens, motion and response are part of the work: expect one
  choreographed moment and at least one behavior that answers the cursor.
  Static perfection tops out at 8.
- Reject the unconsidered default. Any pattern associated with
  mass-produced AI output (purple gradients, glows, frosted panels,
  matched card trios, emoji icons, boilerplate copy) must either be a
  justified, top-tier choice or be removed — one unconsidered default
  caps the whole review at 7.
- Read the details: type hierarchy, optical alignment, measure, contrast,
  spacing rhythm, and whether the signature element actually lands.
- Be severe by default. Vague notes are useless notes: every comment names
  a place and a change a competent builder could apply verbatim.
- The device set is frozen. Ask for a new element only by naming which
  existing one gets cut to pay for it — a demand without a cut is not a
  finding.
- A 9 requires one sentence: what here will still be remembered tomorrow.
If the overall score is below 9, list what must change — biggest move
first — each pinned to a location, each writable as an instruction a
builder can apply without taste. Tag every item BLOCKING, MAJOR, or
MINOR; the executor clears all of them in one pass.
```

The "9 means done" threshold lives in this document, never in that prompt.
The reviewer scores; it is not nudged.

### Three failure modes and their guards

| Failure | Cost | Guard |
| --- | --- | --- |
| Critic sees last round's scores or notes | Grade inflation | Fresh context, every round |
| "Is this good enough?" | A leading question | Rubric + snapshot only, no lean |
| Grinding past a plateau | Twenty rounds, one score | Plateau rule, 8-round cap, structural-or-stop |

### The critic is advisory-only — but project-aware

**A critic that starts fixing stops being a critic.** The fence: the
critic may **Read anything in the project** (artifact, assets, fonts,
styles, notes, earlier versions) and **view the renders provided** — that
is how it checks references, completeness, and honesty. It must not edit,
create, or delete files, must not run commands, and must not produce
images itself. Every finding lands in the verdict as an instruction the
executor applies. Judgment is the reviewer's entire job; labor belongs to
the builder.

### Triage

Every finding is classified, and the executor clears all classes in one
pass:

- **BLOCKING (≤3)** — structural or conceptual; the round cannot advance
  past them;
- **MAJOR** — completion problems, fixed this round;
- **MINOR (batched)** — all nits, one pass, before the next submission. A
  minor never consumes a round.

Two consecutive MINOR-only rounds end the loop: either the piece is at ≥9,
or the reviewer has stopped finding real gaps. Deliver with the residual
report; do not spend a third round on the same class.

### Two critics, one pass (optional)

Craft lens and Concept lens, in parallel, merged into a single fix list.
Two lenses find disjoint problems; serial rounds rediscover the same ones.

### Model split — expensive taste reviews, cheap hands build

A premium, high-taste model reviews; a cost-effective workhorse builds.
The reviewer's taste is the ceiling of the loop; the builder only needs to
apply pseudo-code precisely, which a cheap fast model does well.

- **Pin both roles explicitly** where the harness allows per-subagent
  model selection (a dynamic-workflow `subagent_model`, or equivalent
  knobs): reviewer → the strongest design-judgment model on the machine;
  builder → a cost-effective tier. Never let both roles silently inherit
  the session model. **If the user names a reviewer model in the request,
  use that one verbatim — it overrides the default pick.**
- "Strong at code" is not "strong at taste": choose reviewers by design
  reputation, and re-choose whenever something stronger ships.
- This is why notes must be pseudo-code concrete — any builder can then
  apply them.
- **Critic precondition**: if no top-tier design model can be pinned, say
  so before round 1 and stop by the **plateau rule**, not the 9-threshold.
  A same-tier reviewer cannot certify "immaculate"; it compensates by
  finding ever-finer defects and demanding ever-more ambition, which grows
  scope instead of convergence. Its escalation ideas go to `v2-list.md`,
  not into the fix batch.
- On single-model setups the roles collapse into one model — but fresh
  context and the frozen rubric are not optional; without them even the
  best reviewer degrades.

### Keeping the reviewer honest

1. Objective criteria beat adjectives. Best form: "five images — four
   professional, one ours — rank them by finish and taste." Concrete,
   self-anchoring, immune to mood.
2. Reference images are a floor, not a target: 2–3 world-class references
   marked "baseline — never copy". Image search works for this.
3. Watch the delta: a round of sub-2px fixes must be followed by a
   structural move; cosmetic rounds never cross 8→9.

## Asset enrichment (as available)

Code gives you text and simple shapes — gradients, blobs, and patterns are
precisely the default-output hot zone. One strong image plus a few words
beats a page of CSS decoration. Add assets by need, then back into the
critic loop.

### Generated images (first choice)

Agents rarely generate images unprompted — ask explicitly:

```
The design is plain. Give it personality with generated imagery; consider
shaders or 3D effects combined with images. Verify the result frame by
frame in the browser.
```

Access routes, in order of preference:

- The agent ships an image tool — use it;
- A chat subscription exists — route through a CLI that bills the
  subscription, not an API key;
- Otherwise a dedicated, capped API key: stored in `.env.agents`
  (gitignored), documented as development-only in AGENTS.md, never shipped
  with the product; a leak is a single-key revoke;
- No key: image search for real photos and textures (license first: CC0,
  official assets); nothing available — the restrained-typography route
  (large type scale, air, one accent color) is a legitimate answer, not a
  fallback.

**Product images are Apple-grade or they don't ship.** Wherever the page
shows a product, the image is clean studio cutout work: seamless neutral
background or a precise transparent cutout; resolution and edges beyond
reproach (no halo, no jaggies from a lazy knockout); one controlled contact
shadow or reflection — never an inherited environment shadow; one angle
and one zoom across the whole set. Pipeline: generate with an explicit
studio prompt (`product photography of <object>, seamless pure-white
background, studio softbox lighting, ultra sharp, centered, commercial
catalog style`) → cut out with a removal model (alpha matting on) → check
edges at 2× zoom. In-situ "life" photography is the other legitimate mode
— for heroes and mood; never mix the two modes inside one product set.

### Shaders / 3D

Dot fields, ripples, coronal glows, light streaks — layered where sections
meet, CSS first, WebGL only when the effect earns it.

### Video animation (physics and materials)

Ordinary motion is CSS transitions and scroll-driven animation. Video
generation (one aggregator key; the agent picks the current best model) in
two cases:

- **Green-screen loops** — video that doesn't read as video: generate a
  loop on a solid background, render refraction over the page's own colors
  first so it bakes in, then remove the background with matting and layer
  the result anywhere;

  ```
  Replace the <image> with a looping video clip: <describe motion and
  material>. For convincing <refraction/glass> effects, render the video
  over the page background colors first (baking in the effects), then
  remove the background with a video matting model. Use <platform> key.
  ```

- **Keyframe interpolation** — one continuous shot scrubbed by the
  scrollbar: image-first-frame, clip to the next state, seed the next clip
  from the last frame, and let the user drag through the whole journey.

  ```
  Build a page that transitions between <N> states of <product> as the
  user scrolls: <one line per state>. Generate the first frame with image
  generation, then a clip from that frame to the next state; use each
  final frame to seed the next transition so it joins seamlessly. Scrub
  the clips with the scrollbar. Use <platform> key.
  ```

Assets are arguments, not escapes: after adding them, back into the critic
loop.
