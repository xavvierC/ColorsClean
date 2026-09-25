import { readFileSync, statSync } from 'node:fs';
import { execFileSync, spawnSync } from 'node:child_process';

const assets = ['public/hero-colorsclean.png', 'public/logo.png'];

function readPngMeta(path) {
  const data = readFileSync(path);
  if (data.readUInt32BE(0) !== 0x89504e47) throw new Error(`${path} is not PNG`);
  const width = data.readUInt32BE(16);
  const height = data.readUInt32BE(20);
  const bitDepth = data[24];
  const colorType = data[25];
  let offset = 8;
  const chunks = {};
  let ancillaryBytes = 0;
  while (offset + 12 <= data.length) {
    const length = data.readUInt32BE(offset);
    const type = data.toString('ascii', offset + 4, offset + 8);
    const total = length + 12;
    chunks[type] = (chunks[type] || 0) + total;
    if ((type.charCodeAt(0) & 32) !== 0) ancillaryBytes += total;
    offset += total;
    if (type === 'IEND') break;
  }
  return { path, bytes: data.length, width, height, bitDepth, colorType, ancillaryBytes, chunks };
}

function tool(name, args = ['--version']) {
  try {
    const out = execFileSync(name, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim().split('\n')[0];
    return out || 'available';
  } catch {
    return null;
  }
}

function psnr(original, candidate) {
  const result = spawnSync('compare', ['-metric', 'PSNR', original, candidate, 'null:'], { encoding: 'utf8' });
  const value = (result.stderr || result.stdout || '').trim();
  return value || null;
}

function convert(args) {
  execFileSync('convert', args, { stdio: 'ignore' });
}

console.log('PHASE5_ASSET_AUDIT=' + JSON.stringify(assets.map(readPngMeta)));

const formats = execFileSync('convert', ['-list', 'format'], { encoding: 'utf8' });
console.log('PHASE5_TOOL_AUDIT=' + JSON.stringify({
  cwebp: tool('cwebp'),
  avifenc: tool('avifenc'),
  magick: tool('magick'),
  convert: tool('convert'),
  compare: tool('compare', ['-version']),
  ffmpeg: tool('ffmpeg', ['-version']),
  python3: tool('python3', ['--version']),
  webpDelegate: /WEBP\*/.test(formats) || /^\s*WEBP\s/m.test(formats),
  avifDelegate: /AVIF\*/.test(formats) || /^\s*AVIF\s/m.test(formats),
  heicDelegate: /HEIC\*/.test(formats) || /^\s*HEIC\s/m.test(formats)
}));

const heroOriginal = 'public/hero-colorsclean.png';
const heroTests = [];
for (const quality of [92, 90, 88]) {
  const out = `/tmp/hero-q${quality}.webp`;
  convert([heroOriginal, '-strip', '-quality', String(quality), '-define', 'webp:method=6', out]);
  heroTests.push({ quality, bytes: statSync(out).size, psnr: psnr(heroOriginal, out) });
}
const hero1440 = '/tmp/hero-1440-q90.webp';
convert([heroOriginal, '-strip', '-resize', '1440x', '-quality', '90', '-define', 'webp:method=6', hero1440]);

const logoWebp = '/tmp/logo-768.webp';
convert(['public/logo.png', '-strip', '-resize', '768x256', '-define', 'webp:lossless=true', '-define', 'webp:method=6', logoWebp]);

console.log('PHASE5_CANDIDATE_AUDIT=' + JSON.stringify({
  heroTests,
  hero1440: { bytes: statSync(hero1440).size },
  logo768LosslessWebp: { bytes: statSync(logoWebp).size }
}));


const heroFinal = 'public/phase5-hero.webp';
convert([heroOriginal, '-strip', '-quality', '92', '-define', 'webp:method=6', heroFinal]);
const logoFinal = 'public/phase5-logo.webp';
convert(['public/logo.png', '-strip', '-resize', '768x256', '-define', 'webp:lossless=true', '-define', 'webp:method=6', logoFinal]);

import { writeFileSync } from 'node:fs';
writeFileSync('public/phase5-hero.webp.b64', readFileSync(heroFinal).toString('base64'));
writeFileSync('public/phase5-logo.webp.b64', readFileSync(logoFinal).toString('base64'));
console.log('PHASE5_STAGED_ASSETS=' + JSON.stringify({
  heroBytes: statSync(heroFinal).size,
  logoBytes: statSync(logoFinal).size
}));
