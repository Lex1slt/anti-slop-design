# world-class-designer

[English](README.md) | [简体中文](README.zh-CN.md)

A three-stage process — **Discover → Define → Deliver** — that turns AI into a world-class designer: stunning, un-generic web pages, landing pages, posters, social cards, slides, and UI.

An agent skill built to fight the "average" of AI-generated design — purple gradients, rounded-card grids, Inter, filler copy. Works with any AI coding agent that supports the SKILL.md convention.

## The problem it solves

When an LLM designs, every decision picks the solution "most likely to please everyone", which adds up to committee-grade mediocrity. It also only ever adds, and loves to call it done at 6/10. This skill pushes it out in three stages:

1. **Discover (~15%)** — fix the problem first, then diverge: seed strings inject real randomness (or just name the variation dimensions), intent comes before prompts, and the output is 3–4 significantly different direction cards — plus one wild card that breaks a category convention;
2. **Define (~70%)** — an objective scoring rubric (originality included) plus a fresh-context critic subagent loop that measures against "how would a top studio execute this" and returns pseudo-code-level fixes; done only when the critic independently scores ≥9/10; enrich with generated images, shaders/3D, and video animation;
3. **Deliver (~15%)** — a subtraction pass (bounded by comprehension cost) → an AI-tells double pass (visual + copy, no unconsidered defaults) → hand-rewrite the title, primary CTA, empty states, and error messages.

## Install

Copy the whole folder into your agent's skills directory (the `~/.claude/skills/` layout below is the convention most agents follow):

- macOS / Linux: `~/.claude/skills/world-class-designer/`
- Windows: `%USERPROFILE%\.claude\skills\world-class-designer\`

Or paste this at your agent for a one-line install:

> Help me install world-class-designer. Clone https://github.com/Lex1slt/world-class-designer into ~/.claude/skills/world-class-designer, and once installed verify that SKILL.md and references/ exist.

## Trigger it

Just say "design/make a landing page, poster, card, slide deck" or "this looks too AI, redo it" — the skill loads automatically; or invoke it explicitly with `/world-class-designer <request>`.

To pin the model split in the request itself:

> Use world-class-designer for a landing page for &lt;product&gt;. Run every review subagent on your strongest design model through a dynamic workflow (subagent_model) — read-only and advisory-only, it judges and advises but never edits. Execute its notes yourself with the session model. Done only at an independent ≥9/10.

## Layout

```
world-class-designer/
├── SKILL.md              # core ideas, three-stage overview, hard rules
├── references/
│   ├── discover.md       # problem framing, seed strings, ambitious briefs, intent-first, direction cards
│   ├── define.md         # critic loop & prompt template, model split, image/shader/video enrichment, screenshot command
│   ├── deliver.md        # subtraction pass, AI-tells double pass, hand-written copy, delivery checklist
│   ├── taste-library.md  # distilled moves from 10 studied sites (when to use + sources)
│   └── site-study-*.md   # the full site studies: vallone, chronoswiss, offbrand, grair, rhine, family, cosmos, obys, igloo, exoape
└── .gitignore
```

## Core rules in one breath

1. Fix the problem, roll a seed string (or name the dimensions), produce 3–4 significantly different direction cards plus one wild card that breaks a category convention;
2. A fresh-context critic subagent scores against an objective rubric and gives pseudo-code-level fixes — stop only when the critic independently says ≥9/10;
3. Before delivery: subtraction pass → AI-tells double pass with zero unconsidered defaults → hand-rewrite the title / primary CTA / empty states / error messages.
