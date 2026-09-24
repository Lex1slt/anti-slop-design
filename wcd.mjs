#!/usr/bin/env node
/*
 * wcd — Anti-Slop Design CLI (thin dispatcher over the bundled tools)
 *
 *   wcd init [targetDir]                        copy the skill into an agent skills directory
 *   wcd render <artifact> <outDir> […]          render every width (tools/render.mjs)
 *   wcd preflight <artifact|url> <outDir> […]   generic floor + state matrix (tools/preflight.mjs)
 */
import { spawnSync } from 'node:child_process';
import { cpSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)));
const tools = join(root, 'references', 'tools');
const cmd = process.argv[2];
const rest = process.argv.slice(3);

const run = (script) => {
  const r = spawnSync(process.execPath, [join(tools, script), ...rest], { stdio: 'inherit' });
  process.exit(r.status ?? 0);
};

switch (cmd) {
  case 'init': {
    const target = rest[0] || join(process.env.HOME || process.env.USERPROFILE || '.', '.claude', 'skills', 'anti-slop-design');
    cpSync(root, target, { recursive: true });
    console.log('installed ->', target);
    break;
  }
  case 'render':
  case 'preflight':
    run(`${cmd}.mjs`);
    break;
  default:
    console.error('usage: wcd <init|render|preflight> [args…]');
    process.exit(2);
}
