# anti-slop-design

[English](README.md) | [简体中文](README.zh-CN.md)

A three-stage protocol — **Discover → Define → Deliver** — that forces AI out of its default design taste: stunning, un-generic web pages, landing pages, posters, social cards, slides, and UI. It doesn't promise "world-class" — it forbids slop.

An agent skill built to fight the "average" of AI-generated design — purple gradients, rounded-card grids, Inter, filler copy. Works with any AI coding agent that supports the SKILL.md convention.

## The problem it solves

When an LLM designs, every decision picks the solution "most likely to please everyone", which adds up to committee-grade mediocrity. It also only ever adds, and loves to call it done at 6/10. This skill pushes it out in three stages:

1. **Discover (~15%)** — fix the problem first, then diverge: seed strings inject real randomness (or just name the variation dimensions), intent comes before prompts, and the output is 3–4 significantly different direction cards — plus one wild card that breaks a category convention, and a **device budget** (at most 5 built mechanisms, each answering a sentence from the brief);
2. **Define (~70%)** — a **concept ceiling gate** (if this were executed flawlessly, would it be a 9? if not, take another direction instead of grinding), then an objective rubric (originality included) and a fresh-context critic loop that returns pseudo-code-level fixes. The loop stops by three rules — critic ≥9/10, the **plateau rule** (two rounds of non-structural findings), or a **hard 8-round cap** — and anything below 9 ships with a residual report and a current-vs-cut head-to-head for your taste call. Scope is frozen after the gate: one device in, one out;
3. **Deliver (~15%)** — a subtraction pass (bounded by comprehension cost) → an AI-tells double pass (visual + copy, no unconsidered defaults) → hand-rewrite the title, primary CTA, empty states, and error messages.

## Install

Copy the whole folder into your agent's skills directory (the `~/.claude/skills/` layout below is the convention most agents follow):

- macOS / Linux: `~/.claude/skills/anti-slop-design/`
- Windows: `%USERPROFILE%\.claude\skills\anti-slop-design\`

Or paste this at your agent for a one-line install:

> Help me install anti-slop-design. Clone https://github.com/Lex1slt/anti-slop-design into ~/.claude/skills/anti-slop-design, and once installed verify that SKILL.md and references/ exist.

## Trigger it

Just say "design/make a landing page, poster, card, slide deck" or "this looks too AI, redo it" — the skill loads automatically.

Or invoke it explicitly — the format is `/anti-slop-design, <request>, <reviewer model>`:

> /anti-slop-design, a landing page for a specialty coffee brand, review subagent on your strongest design model

The reviewer model is optional — omit it and the review runs on the
session model. **Recommended**: name a stronger design model for this
role — reviewer taste is the ceiling of the entire loop.

## Layout

```
anti-slop-design/
├── SKILL.md              # core ideas, three-stage overview, hard rules
├── references/
│   ├── discover.md       # problem framing, seed strings, ambitious briefs, intent-first, direction cards
│   ├── define.md         # critic loop & prompt template, model split, image/shader/video enrichment, screenshot command
│   ├── deliver.md        # subtraction pass, AI-tells double pass, hand-written copy, delivery checklist
│   ├── taste-library.md  # distilled moves from 10 studied sites (when to use + sources)
│   ├── techniques.md     # the technique map: scroll narrative, motion, layout, styles, 3D/immersive, APIs, combos
│   └── site-study-*.md   # the full site studies: vallone, chronoswiss, offbrand, grair, rhine, family, cosmos, obys, igloo, exoape
└── .gitignore
```

## Core rules in one breath

1. Fix the problem, roll a seed string (or name the dimensions), produce 3–4 significantly different direction cards plus one wild card that breaks a category convention;
2. A fresh-context critic subagent scores against an objective rubric and gives pseudo-code-level fixes — stop only when the critic independently says ≥9/10;
3. Before delivery: subtraction pass → AI-tells double pass with zero unconsidered defaults → hand-rewrite the title / primary CTA / empty states / error messages.
