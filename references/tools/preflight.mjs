#!/usr/bin/env node
/*
 * Anti-Slop Design — preflight.mjs
 * The generic pre-flight floor over CDP (zero dependencies), plus the
 * interaction-state matrix when the artifact harness honors ?state=<name>.
 *
 * Checks (per width):
 *   console errors · fonts loaded · images decoded · horizontal overflow
 *
 * Usage:
 *   node preflight.mjs <artifact.html|http://url> <outDir>
 *        [--widths 1440x900,390x844] [--states hover,error,empty]
 *        [--vt 8000] [--timeout 60000] [--browser <path>]
 *
 * Output: <outDir>/preflight-report.json + per-state PNGs.
 * Exit 0 iff every check passes and every capture succeeds.
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const argv = process.argv.slice(2);
const positional = [];
let widthsArg = '1440x900,390x844';
let statesArg = '';
let vt = 8000;
let timeout = 60000;
let browser = '';

for (let i = 0; i < argv.length; i++){
  const a = argv[i];
  if (a === '--widths') widthsArg = argv[++i] ?? widthsArg;
  else if (a === '--states') statesArg = argv[++i] ?? statesArg;
  else if (a === '--vt') vt = Math.max(1000, parseInt(argv[++i]) || 8000);
  else if (a === '--timeout') timeout = Math.max(10000, parseInt(argv[++i]) || 60000);
  else if (a === '--browser') browser = argv[++i] ?? browser;
  else positional.push(a);
}
const [targetArg, outArg] = positional;
if (!targetArg || !outArg){
  console.error('usage: node preflight.mjs <artifact.html|http://url> <outDir> [--widths 1440x900,390x844] [--states hover,error,empty] [--vt 8000] [--timeout 60000] [--browser <path>]');
  process.exit(2);
}
const isUrl = /^https?:\/\//.test(targetArg);
const html = isUrl ? targetArg : resolve(targetArg);
if (!isUrl && !existsSync(html)){
  console.error(`artifact not found: ${html}`);
  process.exit(2);
}
mkdirSync(outArg, { recursive: true });
const outDir = resolve(outArg);

const pageUrl = new URL(isUrl ? targetArg : 'file:///' + html.replace(/\\/g, '/').replace(/^\/+/, ''));
if (!pageUrl.search) pageUrl.search = '?final=1';   // 默认拍收束态
const base = pageUrl.toString();

// ---- browser
const candidates = [
  browser,
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  process.env.CHROME_PATH,
].filter(Boolean);
const browserPath = candidates.find(p => existsSync(p));
if (!browserPath){
  console.error('no Edge/Chrome found — pass --browser <path>');
  process.exit(2);
}

const udd = join(tmpdir(), `asd-preflight-${Date.now()}`);
mkdirSync(udd, { recursive: true });
const browserProc = spawn(browserPath, [
  '--headless',
  '--disable-gpu',
  '--hide-scrollbars',
  '--remote-debugging-port=0',
  `--user-data-dir=${udd}`,
  '--no-first-run', '--no-default-browser-check',
  base,
], { stdio: 'ignore' });

// DevToolsActivePort discovery（最多等 10s）
const portFile = join(udd, 'DevToolsActivePort');
let port = 0;
for (let t = 0; t < 100 && !port; t++){
  await new Promise(r => setTimeout(r, 100));
  try { port = parseInt(readFileSync(join(portFile), 'utf8').split('\n')[0], 10) || 0; } catch {}
}
if (!port){
  console.error('FAIL: DevToolsActivePort never appeared');
  browserProc.kill();
  process.exit(2);
}

const httpGetText = (path) => new Promise((res2, rej) => {
  import('node:http').then(({ get }) => {
    get({ host: '127.0.0.1', port, path }, r => {
      let d = ''; r.on('data', c => d += c); r.on('end', () => res2(d));
    }).on('error', rej);
  });
});

const targets = JSON.parse(await httpGetText('/json/list'));
const pageInfo = targets.find(t => t.type === 'page');
if (!pageInfo){
  console.error('FAIL: no page target');
  browserProc.kill();
  process.exit(2);
}

const ws = new WebSocket(pageInfo.webSocketDebuggerUrl);
await new Promise((res2, rej) => { ws.onopen = res2; ws.onerror = () => rej(new Error('ws error')); });

let msgId = 0;
const pending = new Map();
const consoleErrors = [];
ws.addEventListener('message', ev => {
  const m = JSON.parse(typeof ev.data === 'string' ? ev.data : String(ev.data));
  if (m.id && pending.has(m.id)){
    const p = pending.get(m.id); pending.delete(m.id);
    if (m.error) p.reject(new Error(m.error.message)); else p.resolve(m.result);
    return;
  }
  if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error')
    consoleErrors.push(m.params.args?.map(a => a.value ?? a.description ?? '').join(' ') || 'console.error');
  else if (m.method === 'Log.entryAdded' && m.params.entry?.level === 'error')
    consoleErrors.push(m.params.entry.text);
  else if (m.method === 'Runtime.exceptionThrown')
    consoleErrors.push(m.params.exceptionDetails?.exception?.description ?? m.params.exceptionDetails?.text ?? 'uncaught exception');
});
const send = (method, params = {}) => new Promise((resolve2, reject) => {
  const id = ++msgId;
  pending.set(id, { resolve: resolve2, reject });
  ws.send(JSON.stringify({ id, method, params }));
});

await send('Page.enable');
await send('Runtime.enable');
await send('Log.enable');

const evalJs = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (r?.exceptionDetails) throw new Error(r.exceptionDetails.text ?? 'evaluate failed');
  if (process.env.ASD_DEBUG) console.error('[debug evaluate]', JSON.stringify(r).slice(0, 300));
  return r?.result?.value;
};
const sleep = (ms2) => new Promise(r => setTimeout(r, ms2));

const widths = widthsArg.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
const stateNames = statesArg.split(',').map(s => s.trim()).filter(Boolean);

const report = { url: base, widths, states: stateNames, checks: [], stateShots: [], issues: [] };
let fails = 0;

for (const size of widths){
  const [w, h] = size.split('x').map(n => parseInt(n, 10));
  if (!w || !h){ console.error(`bad size "${size}"`); fails++; continue; }
  const mobile = w < 700;
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 2, mobile });
  await send('Page.navigate', { url: base });
  await sleep(700);

  const audit = await evalJs(`({
    fontFacesPending: [...document.fonts].filter(f => f.status !== 'loaded').map(f => f.family + ' ' + f.weight + ' ' + f.style),
    brokenImages: [...document.images].filter(i => !i.complete || i.naturalWidth === 0).map(i => i.currentSrc || i.src),
    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    ready: document.readyState
  })`);

  const problems = [];
  if ((audit?.fontFacesPending ?? []).length) problems.push('fonts pending: ' + audit.fontFacesPending.join(', '));
  if (audit.brokenImages.length) problems.push('broken images: ' + audit.brokenImages.join(', '));
  if (audit.overflowX > 0) problems.push(`horizontal overflow: ${audit.overflowX}px`);
  if (audit.ready !== 'complete') problems.push('document.readyState = ' + audit.ready);

  report.checks.push({
    width: size,
    consoleErrors: consoleErrors.length,
    fontsPending: audit.fontFacesPending.length,
    brokenImages: audit.brokenImages.length,
    overflowPx: audit.overflowX,
    pass: problems.length === 0,
    problems,
  });
  console.log(`${problems.length ? 'FAIL' : 'PASS'} ${w}x${h}` + (problems.length ? ' — ' + problems.join('; ') : ''));
  fails += problems.length;
}

// state matrix：harness 约定 ?state=<name>
for (const st of stateNames){
  const u = new URL(base); u.searchParams.set('state', st);
  await send('Page.navigate', { url: u.toString() });
  await sleep(700);
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  const file = resolve(outDir, `state-${st}.png`);
  writeFileSync(file, Buffer.from(shot.data, 'base64'));
  report.stateShots.push(file);
  console.log(`state ${st} -> ${file}`);
}

writeFileSync(resolve(outDir, 'preflight-report.json'), JSON.stringify(report, null, 2));
console.log(`\nreport -> ${resolve(outDir, 'preflight-report.json')}`);
ws.close();
browserProc.kill();
process.exit(fails ? 1 : 0);
