import { readFileSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

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

console.log('PHASE5_ASSET_AUDIT=' + JSON.stringify(assets.map(readPngMeta)));
console.log('PHASE5_TOOL_AUDIT=' + JSON.stringify({
  cwebp: tool('cwebp'),
  avifenc: tool('avifenc'),
  magick: tool('magick'),
  convert: tool('convert'),
  ffmpeg: tool('ffmpeg', ['-version']),
  python3: tool('python3', ['--version'])
}));
