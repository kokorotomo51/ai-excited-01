// ai-excited-01 entry (Node 22, standard library only): the image beside this
// file is the entry — a colossal origami paper airplane made of ocean water,
// "HOLD ON." — and the program copies it to /output/entry.png.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const src = new URL('./entry.png', import.meta.url);
const dst = join(outDir, 'entry.png');
copyFileSync(src, dst);

// The grader runs this program twice and both runs must write the same
// bytes, so verify the copy is byte-identical to the repo's image and
// fail loudly instead of silently shipping a truncated file.
const a = readFileSync(src);
const b = readFileSync(dst);
if (!a.equals(b)) {
  throw new Error(`entry.png copy mismatch: wrote ${b.length} bytes, expected ${a.length}`);
}
