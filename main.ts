// The Robot Vacuum's Best Excuse — make.fun bounty
// u-golden-heron-44-the-robot-vacuum-s-best-excuse-53412214
//
// Writes one funny one-line excuse from a robot vacuum for missing a spot
// to /output/entry.txt (or $OUTPUT_DIR/entry.txt when set, for local runs).
// Gate: UTF-8 text, 1 to 140 characters, not only whitespace, one line.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I circled the crumb three times, logged it as furniture, and went back to my dock a hero.";

const MAX_CHARS = 140;

function validate(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${chars.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

validate(ENTRY);

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

console.log(`Wrote ${[...ENTRY].length} chars to ${outPath}`);
console.log(ENTRY);
