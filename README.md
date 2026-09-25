# Anti-Slop Design

[English](README.md) | [简体中文](README.zh-CN.md)

A four-stage protocol — **Align → Discover → Define → Deliver** — that
forces AI coding agents out of their default design taste. It doesn't
promise "world-class" results; it forbids slop: purple gradients,
committee mediocrity, Inter filler copy, detail-grinding review loops.

An agent skill that works with any AI coding agent supporting the SKILL.md
convention.

## The problem it solves

When an AI agent designs, every decision picks the choice built to offend
no one — and stacks those choices into committee output. It never deletes,
and it calls it done at 6/10. The review loop then grinds for twenty rounds
on sub-2px nudges without moving the needle.

This protocol fixes the process, not the model:

1. **Align (~5%)** — a design-tree interview (2–3 rounds, frontier
   questions with recommended answers) to produce a written brief. Ask
   about audience, core message, aesthetic direction, and artifact form —
   not about facts you can look up yourself.
2. **Discover (~15%)** — frame the problem, then diverge: seed rolls
   inject real randomness, intent comes before prompts, and the output is
   3–4 direction cards plus one wild card — with a **device budget** of at
   most five built mechanisms.
3. **Define (~70%)** — the concept ceiling gate (would a flawless
   execution be a 9? if not, switch directions instead of grinding), then
   a frozen rubric and a fresh-context critic loop returning
   pseudo-code-level fixes. LEAP/FIX rhythm alternates structural moves
   with convergence. Three stopping rules: ≥9/10, plateau (two rounds of
   non-structural findings), or the 8-round cap. Enrich from the
   capability toolbox — generated images, 3D, video.
4. **Deliver (~15%)** — a subtraction pass (bounded by comprehension) →
   an AI-defaults double pass (visual + copy, chosen vs inherited) →
   hand-rewrite the title, primary CTA, empty states, and error messages.

## Install

```bash
wcd init ~/.claude/skills/anti-slop-design
```

or copy the folder into your agent's skills directory (the
`~/.claude/skills/` layout is the convention most agents follow).

Or paste this at your agent:

> Help me install anti-slop-design. Clone
> https://github.com/Lex1slt/anti-slop-design into
> ~/.claude/skills/anti-slop-design, and once installed verify that
> SKILL.md and references/ exist.

## Trigger it

Just say "design/make a landing page, poster, card, deck" or "this looks
too AI, redo it" — the skill loads automatically. Explicit form:

`/anti-slop-design, <request>, <reviewer model>`

The reviewer model is optional — omit it and the review runs on the
session model. **Recommended**: name a stronger design model for this
role; reviewer taste is the ceiling of the entire loop.

## Layout

```
anti-slop-design/
├── SKILL.md              # core protocol, four stages, hard rules
├── references/
│   ├── align.md          # Stage 0: design-tree interview, the brief
│   ├── discover.md       # Stage 1: problem framing, seed roll, direction cards
│   ├── define.md         # Stage 2: pre-flight, ceiling gate, critic loop, LEAP/FIX rhythm, model split, capability toolbox
│   ├── deliver.md        # Stage 3: subtraction, defaults double pass, hand-written copy, delivery checklist
│   ├── scrollytelling.md # scroll-as-timeline paradigm (8 mechanisms)
│   ├── signature-techniques.md # 11 signature techniques with implementation depth
│   ├── techniques.md     # the full technique map: 7 categories + combos + search keywords
│   ├── taste-library.md  # distilled moves from 10 studied sites
│   ├── site-study-*.md   # the full site studies (10 sites)
│   └── tools/
│       ├── render.mjs    # bundled renderer: every width, deterministic names
│       ├── preflight.mjs # generic floor + interaction-state matrix over CDP
│       └── capabilities.mjs # capability probe (image/video/3D generation, super-resolution, keying)
├── wcd.mjs               # CLI: init / render / preflight
├── LICENSE               # MIT
├── CONTRIBUTING.md
├── CHANGELOG.md
└── .github/workflows/ci.yml
```

## Core rules in one breath

1. Align the brief through a design-tree interview, then diverge: seed
   rolls or named axes, 3–4 direction cards + one wild card, at most five
   devices;
2. A fresh-context critic scores against a frozen rubric and gives
   pseudo-code fixes — LEAP/FIX rhythm alternates structural moves with
   convergence; stop at an independent ≥9/10, a plateau, or the 8-round
   cap;
3. Before delivery: subtraction pass → defaults double pass with zero
   unconsidered defaults → hand-rewrite the title / primary CTA / empty
   states / error messages.

## License

MIT — see [LICENSE](LICENSE).
