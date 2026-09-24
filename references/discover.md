# Discover — fix the problem first, then explore the possibility space

Goal: force real diversity before converging on a single direction. An AI's "random" is pseudo-random; you must inject real randomness — and a direction is only worth as much as the problem behind it.

## 1. Fix the problem first (first half of the Double Diamond)

Never assume your first reaction is the need (e.g. for a calorie-tracking app, "photo → calorie analysis" is just one hypothesis). Diverge on problems, then focus:

```
List 5–8 hypotheses for problems real users hit with <product/scenario>,
one sentence each, plus one line on who hurts and in which scenario.
Then pick the single most worth-solving one and write it up as a
one-sentence problem brief.
```

- Diverge over real usage scenarios, not feature lists;
- The focused brief (who, in which scenario, stuck on what) is the question every direction card below must answer.

## 2. Inject randomness with a seed string (String Seed of Thought)

Asked to "just design something", an LLM collapses onto the mode of its training distribution — purple gradients, Inter, rounded cards. And merely saying "unique, random, totally free" doesn't help: the model predicts a string that *sounds* random. Real randomness must come from outside the model:

```
Step 1: Generate a random string of 8 characters (letters + digits).
        Do not think. Just roll.
Step 2: Map the string to a design direction. Use the characters to pick:
        an era/decade, an art movement or subculture, a primary material or
        texture, a time-of-day/weather, a typographic mood.
        Look beyond the surface for subpatterns and special numbers.
        Write the mapping down (reproducible).
Step 3: Design <artifact> fully committed to that direction.
        Do not blend it back toward "safe modern SaaS".
        Do not reveal the string in the design — it's only for inspiration.
```

Notes:

- Always write the mapping down — later stages need to trace it;
- The direction is allowed to be weird — Define converges; Discover opens the space;
- If the rolled direction clearly doesn't fit the subject (cyberpunk for a funeral service), one re-roll is allowed — record it.

**The cheaper equivalent**: skip the string and name the variation dimensions outright — "give me four directions using four completely different typefaces, palettes, and layouts". About as effective as seeds and more controllable when time is tight.

## 3. Ambitious briefs (bring your own taste)

AI is overly faithful to the brief — the shorter and vaguer it is, the more average it fills in. Don't rely on grand adjectives ("be bold", "don't be conventional" carry little force alone); write instructions **specific enough to picture a world**. Three canonical patterns:

- **Pixel art**: "A bold pixel-art theme with gorgeous graphics; each section feels like a frozen frame of a video game, yet the whole thing still works as a landing page."
- **Isometric micro city**: "The hero is a 45° bird's-eye miniature 3D city; each feature is represented by a building or a neighborhood, and the copy unfolds from there."
- **Dissonant order**: "A radically asymmetric layout, dissonant colors and type, uncomfortable negative space. Break all the rules — but still make it look good."

Safety line (stacks onto any direction): "Make the typography bold. Do not stay within conventional design patterns."

### Intent first — you can skip the prompt

When you can't produce a good brief, let AI help you diverge — but **ask for intents, not a prompt**:

1. **List intents, broad not deep**:

   ```
   I want a bold, unique design language for <product>.
   List as many ideas as you can, one short line each. Go broad, not deep.
   ```

2. **Filter on first reaction, jot taste notes, have AI sharpen the direction**. Example (industrial control panel direction):

   ```
   - I'm imagining something tactile: clicky, satisfying buttons, pleasant sounds;
   - the cartoony/skeuomorphic look I first pictured feels tacky — avoid it;
   - gray gradients are boring, I want more texture — maybe some color,
     but keep the control-panel feel.
   Sharpen this direction along my tastes.
   ```

   Taste lives in your first reaction, not in the wording.

3. **Once the intent is formed, start building the page directly** — don't have the model "rewrite the intent into a full prompt" as a separate step; one step is enough.

Two mindset rules:

- **Don't fear ideas that sound like they'll fail** — the "this can't possibly work" directions often surprise the most; if it truly fails, discard and move on.
- **Archive failed prompts** and retest them when new models ship — that's how you know you're using the model's full ability.

## 4. Direction cards (exactly 3–4, and significantly different)

```
### Direction A — "Name"
- One line: what this design reminds you of
- Problem it answers: from step 1's problem brief
- Inspiration/era: from the seed mapping or the ambitious brief
- Palette: #hex ×3
- Type mood: e.g. "vintage magazine headline", "terminal mono", "journal rounded"
- Layout metaphor: e.g. "newspaper front page", "instrument panel", "museum label"
- Signature element: one thing you'd remember it by (not a gradient/glow)
- Risk: where this direction tends to break
```

Generation rules:

- **Generate one at a time**, feeding the already-generated cards back as reference with an explicit "avoid the palette/layout/typefaces they already occupy";
- **Differentiation self-check**: cover the names — if you can't tell the cards apart, they're variants of one idea; redo.

User online: present the cards and let them pick. Autonomous mode: pick one by risk assessment, note the reason, and move into Define.

## 5. The anti-academic engine

Academic output is not a style failure — it's a process artifact: when every step optimizes for avoiding mistakes, the result is "well-made but unsurprising". Force the leaps:

1. **Category conventions audit (mandatory)**: list what websites in this category always look like (SaaS: hero + three feature cards + pricing + FAQ; portfolio: fullscreen image + thin caption; ...). Explicitly **forbid 2–3 of those conventions** for this project. If a forbidden convention appears, the critic counts it blocking.
2. **The wild card (mandatory)**: besides the 3–4 direction cards, produce exactly one wild card that breaks one of the forbidden conventions, pushes one element to an extreme, or steals its structure from another medium (album cover, magazine spread, game HUD, boarding pass, architectural plan). The wild card may lose the pick — it may not be absent. Sometimes it wins, and that's the "eye-brightener".
3. **The share shot (mandatory deliverable)**: name the one moment designed to be screenshotted and shared — and why it deserves it. A design with no share shot doesn't enter Define.
4. **Cross-pollination**: the taste-library is a starting point, not the boundary. Stealing structure from a different medium (magazine grid on a landing page, musical-score layout on a spec sheet, control-panel physics on a form) reads as "new" faster than inventing inside web conventions.
5. **Mutation before polish**: in Define, before fixing the critic's list, generate two mutations of the current direction — exaggerate one element to an extreme; merge it with an unrelated reference — and consider pushing one. Polish makes 8s; mutations make 9s.

## 6. Device inventory and budget

A **device** is one built mechanism the page carries — an instrument, a system, a recurring construct (specimen mount, issue numbering, loupe, ruler, archive strip, seal, leader lines…). Devices are where the ambition lives *and* where every future defect will live: device count is the strongest predictor of how long the Define loop will run.

Do this before Define, and record it in the design notes:

1. **List candidate devices** for the chosen direction (aim for 6–10 candidates, don't self-censor yet);
2. **Keep at most 5**: 1 main signature (the share shot usually lives here) + 2 supporting + up to 2 optional. Everything else is killed — write one line per kill saying what the design loses by cutting it (if nothing, it was never a device);
3. **Each kept device must name the sentence it carries** from the problem brief — a device that answers nothing is decoration, and decoration is what the subtraction pass will eat first;
4. **Freeze the list** once the concept gate passes. From then on: one in, one out — any addition is paid for by a removal, and the trade is recorded. Critics demanding "more" are answered with "what gets cut?".

The budget is why a 9 is reachable: five devices executed flawlessly is a showpiece; fifteen devices is a permanent defect surface no number of rounds can polish.
