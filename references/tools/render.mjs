#!/usr/bin/env node
/*
 * Anti-Slop Design — render.mjs
 * Renders an HTML artifact with headless Edge/Chrome at one or more sizes.
 *
 * Usage:
 *   node render.mjs <artifact.html> <outDir> [--widths 1440x900,390x844] [--vt 4000] [--browser <path>]
 *
 * Output: <outDir>/<stem>-<W>x<H>.png — deterministic names, ready for the
 * score log. Exit code 0 iff every size produced a non-empty screenshot.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, statSync } from 'node:fs';
import { basename, resolve } from 'node:path';

const argv = process.argv.slice(2);
const positional = [];
let widths = '1440x900';
let vt = 4000;
let browser = '';

for (let i = 0; i < argv.length; i++){
  const a = argv[i];
  if (a === '--widths') widths = argv[++i] ?? widths;
  else if (a === '--vt') vt = argv[++i] ?? vt;
  else if (a === '--browser') browser = argv[++i] ?? browser;
  else positional.push(a);
}
const [htmlArg, outArg] = positional;
if (!htmlArg || !outArg){
  console.error('usage: node render.mjs <artifact.html> <outDir> [--widths 1440x900,390x844] [--vt 4000] [--browser <path>]');
  process.exit(2);
}
const html = resolve(htmlArg);
if (!existsSync(html)){
  console.error(`artifact not found: ${html}`);
  process.exit(2);
}
mkdirSync(outArg, { recursive: true });
const outDir = resolve(outArg);

const candidates = [
  browser,
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  process.env.CHROME_PATH,
].filter(Boolean);
const browserPath = candidates.find(p => existsSync(p));
if (!browserPath){
  console.error('no Edge/Chrome found — pass --browser <path to msedge.exe|chrome.exe>');
  process.exit(2);
}

const url = 'file:///' + html.replace(/\\/g, '/').replace(/^\/+/, '');
const stem = basename(html).replace(/\.[^.]+$/, '');
const sizes = widths.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);

let fails = 0;
for (const size of sizes){
  const [w, h] = size.split('x');
  if (!w || !h){ console.error(`bad size "${size}" (use WxH, e.g. 1440x900)`); fails++; continue; }
  const out = resolve(outDir, `${stem}-${w}x${h}.png`);
  const r = spawnSync(browserPath, [
    '--headless', '--disable-gpu', '--hide-scrollbars',
    `--virtual-time-budget=${vt}`,
    `--window-size=${w},${h}`,
    `--screenshot=${out}`,
    url,
  ], { stdio: 'ignore' });
  const ok = existsSync(out) && statSync(out).size > 1000;
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${w}x${h} -> ${out}`);
  if (!ok) fails++;
}
process.exit(fails ? 1 : 0);
