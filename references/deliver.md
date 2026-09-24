# Deliver — subtraction, de-AI-ing, and hand-written copy

Goal: restraint. The last step of world-class design is not adding more — it's removing the noise that's still ringing.

## 1. Subtraction pass (mandatory, its own round)

AI only adds — gradients, shadows, badges, copy pile up. **Restraint reads as premium**; most of a great designer's polishing effort goes into deleting.

For **every element** on the page ask: "does the design get worse without it?" If you can't name a concrete reason, delete.

Cut first:

- Decorative gradients, glows, layered shadows;
- Corner badges ("NEW!", "HOT");
- Cards and sections that exist to fill space;
- Repeated CTAs (more than one primary action per screen);
- The tidy "icon + title + two lines" feature grid;
- Descriptive text that re-explains what the graphic already says, empty labels, empty containers;
- Fluff copy (Chinese "赋能/引领/一站式"; English "Revolutionary / Seamless / Empower");
- Exclamation marks;
- Custom buttons/components that look worse than the native ones (switch to native).

**Give concrete instructions, not grand ones**: "Simplify into an image-centric grid; remove the gradients, glows, and extra containers" works well; "pursue true minimalism" barely lands — weakest models understand it least.

**Subtraction has a boundary — comprehension cost**: when a graphic/icon isn't self-explanatory, add a text label or a hover hint instead. Not everything gets deleted; "will users still understand it?" is a veto.

## 2. AI tells — the double pass (mandatory; visual and copy separately)

The scoring rubric's item 5 refers to this list.
The list is a set of habits to interrogate, **not banned elements**: the tell is the unconsidered default use, not the element itself. A purple gradient, a glow, even three matching cards — executed deliberately and at top-studio level — is a choice, and choices are allowed. The pass condition is that every instance reads as a considered decision, not that the patterns are absent.
Note the difference from the subtraction pass: subtraction asks "does deleting lose information/function?"; de-AI-ing asks "was this the AI's default, or the designer's choice?" **Subtract first, then interrogate.**

**Visual fingerprints** — habits to interrogate; presence puts the burden of proof on the design:

- [ ] Purple/blue gradient hero, purple CTA buttons, glow effects
- [ ] Three identical feature cards in a row
- [ ] Layered glassmorphism
- [ ] Default Inter / Roboto / system-ui, or too many fonts, no typographic identity
- [ ] Emoji as icons; ✨🚀 stuffed into headlines
- [ ] The "works for any startup" layout: copy left, graphic right; everything centered
- [ ] Stock-looking 3D blobs / wireframe globes
- [ ] Fake logo walls ("Trusted by ...")
- [ ] Custom buttons/components that look worse than native ones
- [ ] Product images with messy inherited backgrounds, low resolution, or halo/jagged cutout edges (product shots must be Apple-grade seamless cutouts)
- [ ] Rhythmless spacing (every section the same height, no room to breathe)

**Copy fingerprints** (a separate pass from the visual one):

- [ ] The "this isn't X — it's Y" construction
- [ ] Throat-clearing openers (circling before getting to the point)
- [ ] Fake-depth verbs (赋能/引领/革命性; Revolutionary / Seamless / Empower)
- [ ] Every sentence the exact same length and rhythm
- [ ] Marketing fluff, exclamation marks, same-length paragraphs

Audit prompt (run once per pass):

```
Audit this design for AI defaults.
Visual: purple gradients, glow, glassmorphism, three identical feature cards,
left-copy-right-graphic layout, too many fonts, no white space, custom
buttons that look worse than native ones. [extend from the visual list above]
Copy: ["isn't X but Y" constructions, throat-clearing openers, fake-depth
verbs, uniform sentence length...] Keep my meaning, jokes, and specific
facts. Do not make every sentence the same length.
For each pattern present: either state why it is a deliberate, top-studio-grade
choice, or fix it. Anything you cannot defend, fix.
```

**Every instance must either be gone or defensible as a deliberate, top-studio-grade choice.** "It's on the list" is never the reason to delete something — "it's here by default" always is. Audit output format: each pattern found, its location, the defense or the fix — then apply them all. The copy pass can also be checked with a humanizer-class de-AI writing tool.

## 3. Hand-written key copy (mandatory)

Title, primary CTA, empty states, error messages — these four are where "the average" survives longest, and the model's draft is guaranteed mediocre. **Rewrite them by hand** before shipping; "minor tweaks" don't count.

The test: **"If you wouldn't say this to a customer face-to-face over coffee, it doesn't go on the page."**

(Process philosophy: let the agents explore — but you make the final call.)

## 4. Delivery checklist

- [ ] The artifact file(s) (HTML / image / PPTX…)
- [ ] The version archive (every reviewed round's snapshot from `versions/`)
- [ ] Final screenshots (rendered once at delivery: desktop + mobile, or the artifact's real size)
- [ ] The score log (each round's critic total + one line per change + the do-not-regress list)
- [ ] **Residual report** — required whenever the loop stopped below 9 (plateau or cap): score trajectory, unresolved items and why, the recommended cut, current-vs-cut head-to-head
- [ ] Direction cards archived (from Discover, including the device list and budget)
- [ ] Hand-written copy archived (the four rewritten kinds from step 3)

Output goes where the user specifies; if unspecified, a new folder in the working directory. **Never touch the user's existing files.**
