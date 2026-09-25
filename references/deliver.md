# Deliver — subtraction, defaults on trial, and hand-written copy

Goal: restraint. The last stage is not about adding anything — it is about
removing everything that still makes noise.

## 1. Subtraction pass (mandatory, its own round)

An agent only adds — gradients, shadows, badges, copy pile up. **Restraint
is what reads as expensive**, and most finishing work is deletion.

For every element ask one question: "does the page get worse without it?"
No concrete answer, no element.

First against the wall:

- decorative gradients, glows, stacked shadows;
- corner badges ("NEW!", "HOT");
- cards and sections that exist to fill space;
- repeated CTAs (never more than one primary action per screen);
- the icon-title-two-liner feature grid;
- captions that re-explain what the picture already says; empty labels and
  empty containers;
- fog words (中文"赋能/引领/一站式"; English "seamless / empower /
  revolutionary");
- exclamation marks;
- custom controls that lose to the platform's own — ship the native one.

Give concrete instructions, not moods: "collapse to an image-first grid;
strip gradients, glows, and extra containers" works; "pursue true
minimalism" does nothing, and weaker models understand it least.

Subtraction has one boundary — comprehension. If a graphic or icon stops
the user from understanding, add the text label or hover hint back. "What
does the user lose?" vetoes everything above.

Subtraction also has a **counterweight — density check**: after removing,
render and scan every 100vh scroll segment. If any stretch >50vh has no
visual event (transition, reveal, composition shift, interaction), the
subtraction went too far. Compress section heights or add content — not
decoration.

## 2. Defaults on trial — the double pass (visual and copy, separately)

The rubric's item 5 points here. The list below names habits, not banned
elements: the question is never "is this pattern present?" but "was this
pattern chosen or inherited?" A glow with a reason stays; a glow by muscle
memory goes. Subtraction first, this second — they ask different questions.

**Visual defaults** (the critic screens for these too). Two lists: the
classic kit, and the newer clusters that generated design currently
collapses into — a brief that pins one of these looks may use it; a brief
that doesn't should not land there by accident:

- [ ] purple-to-blue hero washes, glowing edges, gradient buttons
- [ ] a row of three identical feature cards
- [ ] frosted-glass panels stacked on frosted-glass panels
- [ ] default Inter/Roboto/system-ui, or more fonts than hierarchy
- [ ] emoji standing in for icons; ✨🚀 inside headlines
- [ ] the skeleton that fits any startup: copy left, picture right,
      everything centered
- [ ] clip-art 3D blobs and wireframe globes
- [ ] logo walls of companies that never signed off
- [ ] bespoke buttons that lose to the platform's own
- [ ] spacing with no rhythm — every section the same height, nowhere to
      breathe
- [ ] the all-rectangle page: every edge axis-aligned, zero curves,
      diagonals, or overlaps — geometry by default, not by choice

Newer clusters the whole field currently collapses into:

- [ ] warm cream + high-contrast serif display + one terracotta/warm-clay
      accent
- [ ] near-black ground + a single acid-green or vermilion accent
- [ ] the broadsheet costume: hairline rules, zero border-radius, dense
      columns
- [ ] the SaaS-card kit: identical rounded cards, one border-radius on
      everything, the same soft shadow under each, gradient washes as
      decoration
- [ ] template chrome whatever the subject: tracked-out ALL-CAPS eyebrow
      over every heading, meta strings joined by middle dots, labels built
      as "WORD — fragment", near-black (#0B0B0B/#111) standing in for
      black, a mono face for every small data label, "→" appended to every
      link and button

Each of these is legitimate for some brief. The tell is not the element —
it is the element appearing regardless of subject.

**Copy defaults** (a separate pass from the visual one):

- [ ] "this isn't X, it's Y" constructions
- [ ] openers that clear their throat before the point
- [ ] prestige verbs (赋能/引领/革命性; revolutionary, seamless, empower)
- [ ] sentences all cut to the same length
- [ ] marketing fog, exclamation marks, uniform paragraphs

Audit prompt (run once per pass):

```
Audit this build for inherited defaults.
Visual: [extend from the visual list above] — for each pattern present,
name it, locate it, and either defend it as a deliberate choice at this
level or remove it.
Copy: [extend from the copy list] — same rule. Keep my meaning, jokes, and
hard facts. Break the sentence rhythm on purpose where it helps.
Apply everything in one pass.
```

**Every instance ends gone or defended.** "It's on the list" is never a
reason to delete; "it's here by default" always is. The copy pass can also
be checked with a humanizer-class de-AI writing tool.

## 3. Hand-write the load-bearing copy (mandatory)

Four strings carry the page: the **title**, the **primary action**, the
**empty state**, the **error message**. Model drafts average out to mush
exactly there — rewrite them by hand before shipping. "Lightly edited"
does not count.

Craft rules for those strings — and every string:

- Words the end user uses, not words the system uses: a user manages
  notifications, not webhook config;
- Active voice, and the CTA says what happens when used: "Save changes",
  not "Submit";
- One action keeps one name through the whole flow — the button that says
  "Publish" produces a toast that says "Published";
- Errors state what happened and how to fix it, in the interface's voice —
  no apologizing, no vagueness. An empty screen is an invitation to act.

The test: read the line aloud. If you would not say it to a customer
standing next to you, it does not ship.

(The division of labor is deliberate: agents explore; the human decides.)

## 4. Delivery checklist

- [ ] The artifact file(s) (HTML / image / deck…)
- [ ] The version archive (every reviewed round's snapshot)
- [ ] Final renders (taken once, at delivery: desktop + mobile, or true
      size)
- [ ] The score log — per-round totals, change lines, and the
      do-not-regress list
- [ ] The residual report — required whenever the loop stopped below 9
      (plateau or cap): trajectory, unresolved items and why, the
      recommended cut, current-vs-cut head-to-head
- [ ] Direction cards and the device list (from Discover)
- [ ] The four hand-written strings

Output goes where the user says; otherwise a new folder in the working
directory. The user's existing files are never touched.
