# Discover — aim the work at a real problem, then open the space

Two jobs, in order: pick a problem worth having solved, and fill the space
around it with directions that could not have appeared by default. An
agent's "random" is entropy-shaped text, and a brilliant direction aimed at
nothing is still nothing.

## 1. Frame the problem

The first idea is a hypothesis, not a need.

```
List 5–8 hypotheses for what real users of <product/scenario> struggle
with — one line each: who hurts, and in which moment.
Then pick the one most worth solving and write it as a single-sentence
problem brief.
```

- Work from scenes, not feature lists;
- The brief — who, where, stuck on what — is the question every direction
  card below has to answer.

## 2. The seed roll (entropy from outside the model)

Ask an agent to "design something random" and it lands on the mode of its
training data; ask it to be "unique" and it writes a string that merely
sounds random. Real entropy has to be imported:

```
Step 1: Roll 8 characters (letters + digits) in a shell. No thinking.
Step 2: Read the roll as a brief — let the characters pick an era, a
        subculture, a material, a light or weather, a type mood. Dig for
        sub-patterns and odd numbers. Write the mapping down; it must be
        reproducible.
Step 3: Build <artifact> fully inside that direction. Do not blend it back
        toward safe modern defaults. Never show the string — it is fuel,
        not content.
```

- The mapping is written down so later stages can trace it;
- Strange is allowed here — later stages converge; this stage opens;
- One re-roll is permitted when the roll truly cannot fit the subject, and
  the re-roll goes on record.

**The cheaper equivalent**: skip the dice and name the axes — "four
directions, four different typefaces, palettes, and layouts, nothing
repeated". Same effect, less ceremony, easier to control.

## 3. Briefs with a point of view

The agent is loyal to the brief; a vague brief fills itself in with the
average. Grand adjectives carry no information. Write directions specific
enough to picture — three shapes that reliably diverge, each anchored to a
studied site's core move:

- **The working board** (chronoswiss / rhine) — "an observatory control
  desk where every function is a gauge or a switch: mono type, engraved
  panels, backlit dials — and it still works as a page."
- **The gallery plate** (vallone) — "one object on a seamless field; the
  interface colorless; hairline captions; the photograph carrying every
  drop of color on the page."
- **The broadsheet poster** (offbrand) — "a front page whose headline is
  set like a poster and whose captions read like ticker tape; typography
  carries the entire composition."

A line that stacks onto any direction: "Commit to the composition. Do not
defend a single conventional decision."

### Intent first — the prompt can wait

When no brief comes, diverge with the agent — but ask for intents, not a
prompt:

```
I want a bold, unmistakable design language for <product>.
List as many directions as you can, one line each. Wide, not deep.
```

Filter on first reaction, write your taste notes, hand them back:

```
- I want it to read like polished stone under gallery light — quiet,
  cold, expensive;
- no gradient washes anywhere; the color should come from one material
  photograph and nowhere else;
- motion only where the eye already is: the hero image finishes
  sharpening on load, nothing else moves.
Sharpen this direction along my tastes.
```

Taste lives in the first reaction, not in the wording. Once the intent is
settled, start building — do not spend a step asking the model to convert
it into "a full prompt".

Two habits:

- Keep the directions that sound unbuildable — they surprise the most; the
  ones that truly fail get thrown away without ceremony.
- Archive briefs that failed. Re-run them when a new model ships: what
  failed last quarter may be this quarter's signature.

## 4. Direction cards (3–4, unmistakably different)

```
### Direction A — "Name"
- One line: what it reminds you of
- The problem it answers: from §1
- Inspiration/era: from the roll or the brief
- Palette: #hex ×3
- Type mood: e.g. "vintage magazine headline", "terminal mono"
- Layout metaphor: e.g. "newspaper front page", "instrument panel"
- Signature element: one thing you'd remember it by (not a gradient/glow)
- Risk: where this direction tends to break
```

Rules:

- Build them **one at a time**, feeding the finished cards back as
  reference with an explicit "avoid the palette, layout, and typefaces
  they already claim";
- The name-cover test: if you cannot tell the cards apart, they are one
  idea in costume — redo.

User online: present the cards and let them pick. Autonomous: pick by the
risk each card declares, write the reason down, move into Define.

## 5. The anti-academic pass

Polite, rule-following output is a process artifact: when every step
optimizes for avoiding mistakes, the result is well-made and unsurprising.
Force the leaps:

1. **Conventions audit** — list what this category always does (SaaS: hero,
   three feature cards, pricing, FAQ; portfolio: fullscreen image, thin
   caption). **Forbid 2–3 of those habits** for this project; a forbidden
   habit that appears is a blocking issue.
2. **The wild card** — one extra direction that breaks a forbidden habit,
   pushes an element to an extreme, or steals its structure from another
   medium (album cover, magazine spread, game HUD, boarding pass,
   architectural plan). It may lose the pick; it may not be absent.
3. **The share shot** — name the moment people screenshot, and why it
   deserves it. A direction with no share shot does not enter Define.
4. **Cross-pollination** — the taste library is a floor, not a boundary:
   borrow structure from another medium and it reads as new faster than
   inventing inside web conventions.
5. **Mutations over polish** — before fixing a critique list, generate two
   mutations: push one element to an extreme, or merge the direction with
   an unrelated reference. Polish turns 8 into 8.5; mutation is what turns
   8 into 9.

## 6. The device budget

A **device** is a built mechanism the page carries — a mount, a numbering
system, a board, a magnifier, a seal, a ruler. Devices are where ambition
lives, and also where every future defect will live: device count is the
strongest predictor of how long Define will run.

1. List candidates for the chosen direction (6–10, no self-censoring);
2. Keep **at most 5**: 1 signature (the share shot usually lives here) +
   2 supporting + up to 2 optional. Each kept device answers one sentence
   from the problem brief. Write one line per killed candidate — if
   nothing is lost, it was never a device;
3. Freeze the list at the concept gate. From then on: one in, one out, and
   the trade goes in the score log. A critic asking for a new move must
   name the cut that pays for it.

**The budget counts mechanisms, never content.** Sections, photographs,
copy blocks, and required animations are content: they do not count against
the budget and they are not cut to satisfy it. When budget pressure meets
content, decoration loses. (A documented failure: a run read "cut a device"
as "cut the product photography" and shipped a hero page without its hero
image.)

Five devices built flawlessly is an exhibition piece. Fifteen devices is a
defect surface no number of rounds can polish.
