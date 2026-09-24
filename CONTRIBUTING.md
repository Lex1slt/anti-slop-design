# Contributing

Issues and PRs in English or 简体中文 are both welcome.

## Ground rules

- The protocol (`SKILL.md` + `references/`) is the product. Changes to
  stages, stopping rules, or the rubric need a written rationale in the PR
  description.
- Tools stay dependency-free (Node standard library only) and must pass
  `node --check`.
- Public docs never name a specific host product and never assume the
  reader has other skills installed.
- New design moves come from studied sites or real runs, with the source
  noted in the entry.

## The most valuable contribution: failure reports

A run where the loop converged to the wrong thing — include the score
log, the `versions/` archive, and the renders. Failure cases with
evidence beat success stories.

## Local checks

```bash
node --check references/tools/render.mjs
node --check references/tools/preflight.mjs
node --check wcd.mjs
node wcd.mjs render <any-artifact.html> <any-out-dir>   # smoke the renderer
```
