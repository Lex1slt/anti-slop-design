#!/usr/bin/env node
/*
 * Anti-Slop Design — render.mjs
 * Renders an HTML artifact with headless Edge/Chrome at one or more sizes.
 *
 * Usage:
 *   node render.mjs <artifact.html|https://url> <outDir> [--widths 1440x900,390x844] [--vt 4000] [--gpu] [--scale 2] [--browser <path>]
 *
 * --gpu: drop --disable-gpu and force GPU compositing — try it when a
 *        WebGL/canvas-heavy page captures as a dark frame.
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
let gpu = false;
let scale = 1;
let seq = '';

for (let i = 0; i < argv.length; i++){
  const a = argv[i];
  if (a === '--widths') widths = argv[++i] ?? widths;
  else if (a === '--vt') vt = argv[++i] ?? vt;
  else if (a === '--browser') browser = argv[++i] ?? browser;
  else if (a === '--gpu') gpu = true;
  else if (a === '--scale') scale = Math.max(1, parseFloat(argv[++i]) || 1);
  else if (a === '--seq') seq = argv[++i] ?? seq;
  else positional.push(a);
}
const [htmlArg, outArg] = positional;
if (!htmlArg || !outArg){
  console.error('usage: node render.mjs <artifact.html|https://url> <outDir> [--widths 1440x900,390x844] [--vt 4000] [--gpu] [--scale 2] [--browser <path>]');
  process.exit(2);
}
const isUrl = /^https?:\/\//.test(htmlArg);
const html = isUrl ? htmlArg : resolve(htmlArg);
if (!isUrl && !existsSync(html)){
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

const url = isUrl ? html : 'file:///' + html.replace(/\\/g, '/').replace(/^\/+/, '');
const stem = isUrl
  ? (new URL(html).pathname.split('/').filter(Boolean).pop() || 'page').replace(/\.[^.]+$/, '')
  : basename(html).replace(/\.[^.]+$/, '');
const sizes = widths.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);

/* --seq 300,700,1500: capture the load choreography at several virtual-time
   points, so a reviewer can see the motion arc, not just the last frame. */
if (seq){
  const [w, h] = sizes[0].split('x');
  const points = seq.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
  let fails = 0, n = 0;
  for (const ms of points){
    n++;
    const out = resolve(outDir, `${stem}-seq${String(n).padStart(2,'0')}-${ms}ms.png`);
    const r = spawnSync(browserPath, [
      '--headless',
      ...(gpu ? ['--use-angle=default'] : ['--disable-gpu']),
      ...(scale !== 1 ? [`--force-device-scale-factor=${scale}`] : []),
      '--hide-scrollbars',
      `--virtual-time-budget=${ms}`,
      `--window-size=${w},${h}`,
      `--screenshot=${out}`,
      url,
    ], { stdio: 'ignore' });
    const ok = existsSync(out) && statSync(out).size > 1000;
    console.log(`${ok ? 'OK  ' : 'FAIL'} seq ${ms}ms -> ${out}`);
    if (!ok) fails++;
  }
  process.exit(fails ? 1 : 0);
}

let fails = 0;
for (const size of sizes){
  const [w, h] = size.split('x');
  if (!w || !h){ console.error(`bad size "${size}" (use WxH, e.g. 1440x900)`); fails++; continue; }
  const out = resolve(outDir, scale !== 1
    ? `${stem}-${w}x${h}@${scale}x.png`
    : `${stem}-${w}x${h}.png`);
  const r = spawnSync(browserPath, [
    '--headless',
    ...(gpu ? ['--use-angle=default'] : ['--disable-gpu']),
    ...(scale !== 1 ? [`--force-device-scale-factor=${scale}`] : []),
    '--hide-scrollbars',
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
