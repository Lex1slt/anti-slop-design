#!/usr/bin/env node
/*
 * capabilities.mjs — probe which enrichment capabilities are actually
 * reachable on this machine, so the concept ceiling gate judges a real
 * ceiling instead of an assumed one. Prints availability only — never
 * secret values.
 *
 * Usage: node capabilities.mjs [projectDir]
 */
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const projectDir = resolve(process.argv[2] || process.cwd());

// .env.agents（项目本地，gitignored）——只读键名，绝不打印值
let envKeys = {};
const envFile = join(projectDir, '.env.agents');
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, 'utf8').split('\n')){
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=/);
    if (m) envKeys[m[1]] = true;
  }
}
const key = (...names) => names.some(n => Boolean(process.env[n] || envKeys[n]));
const bin = (name, args = ['-version']) => {
  try { return spawnSync(name, args, { stdio: 'ignore' }).status === 0; } catch { return false; }
};
const ffmpegFilter = (name) => {
  try {
    const r = spawnSync('ffmpeg', ['-hide_banner', '-filters'], { stdio: 'pipe' });
    return r.status === 0 && r.stdout.toString().includes(name);
  } catch { return false; }
};

const capabilities = [
  {
    id: 'image-generation',
    label: '图像生成',
    reachable: key('OPENAI_API_KEY') || key('GEMINI_API_KEY') || key('GOOGLE_API_KEY')
      || key('STABILITY_API_KEY') || key('DASHSCOPE_API_KEY'),
    enable: 'export OPENAI_API_KEY / GEMINI_API_KEY / DASHSCOPE_API_KEY（或 .env.agents）',
  },
  {
    id: 'video-generation',
    label: '视频生成（绿幕循环 / 关键帧插值 / 首帧动画）',
    reachable: key('FAL_KEY') || key('RUNWAY_API_KEY') || key('LUMA_API_KEY') || key('DASHSCOPE_API_KEY'),
    enable: 'export FAL_KEY（或 RUNWAY_API_KEY / LUMA_API_KEY）',
  },
  {
    id: '3d-generation',
    label: '文生 3D 模型（glTF 资产）',
    reachable: key('MESHY_API_KEY') || key('TRIPO_API_KEY'),
    enable: 'export MESHY_API_KEY / TRIPO_API_KEY',
  },
  {
    id: 'super-resolution',
    label: '图像超清 / 修复（2–4× 上采样）',
    reachable: bin('realesrgan') || bin('upscayl') || key('REPLICATE_API_TOKEN') || key('FAL_KEY'),
    enable: '安装 realesrgan/upscayl，或 export REPLICATE_API_TOKEN / FAL_KEY',
  },
  {
    id: 'background-removal',
    label: '本地 AI 抠图（rembg，任意照片 → 透明 PNG）',
    reachable: (() => {
      try { return spawnSync('python', ['-c', 'import rembg'], { stdio: 'ignore' }).status === 0; }
      catch { return false; }
    })(),
    enable: 'pip install "rembg[cpu]"',
  },
  {
    id: 'local-chroma-key',
    label: '本地绿幕抠图（ffmpeg chromakey）',
    reachable: ffmpegFilter('chromakey'),
    enable: '安装含 chromakey 滤镜的 ffmpeg 构建',
  },
];

let missing = 0;
console.log('capability probe — ' + projectDir);
for (const c of capabilities){
  const mark = c.reachable ? '✓' : '✗';
  console.log(`  ${mark} ${c.id.padEnd(20)} ${c.label}` + (c.reachable ? '' : `   [未启用：${c.enable}]`));
  if (!c.reachable) missing++;
}
if (missing) {
  console.log(`\n${missing} 项能力未启用——涉及它们的装置与手法在概念门判天花板时应降档，或在启用后重探。`);
} else {
  console.log('\n全部能力可用。');
}
