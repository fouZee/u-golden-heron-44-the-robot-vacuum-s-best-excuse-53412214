// The Robot Vacuum's Best Excuse — make.fun bounty
// u-golden-heron-44-the-robot-vacuum-s-best-excuse-53412214
//
// Writes one funny one-line excuse from a robot vacuum for missing a spot
// to /output/entry.txt (or $OUTPUT_DIR/entry.txt when set, for local runs).
// Gate: UTF-8 text, 1 to 140 characters, not only whitespace, one line.
// The program validates the line before writing AND reads the file back
// afterwards to prove the bytes on disk are exactly the validated line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I found the crumb, scanned it twice, and respectfully decided it was load-bearing.";

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
  if (text !== text.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  // The excuse must come from the vacuum itself, in its own world:
  // first person, and at least one vacuum-world word (sensor/scan/map/dock).
  if (!/\bI\b/.test(text)) {
    throw new Error("entry must be in the vacuum's own first-person voice");
  }
  if (!/scann|sensors?|map|dock|bumper|battery|lidar/i.test(text)) {
    throw new Error("entry must be rooted in the vacuum's own world");
  }
}

validate(ENTRY);

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read-back check: the file on disk must be byte-identical to the
// validated line, with no trailing newline or extra bytes added.
const onDisk = readFileSync(outPath, "utf8");
if (onDisk !== ENTRY) {
  throw new Error(`read-back mismatch: disk holds ${[...onDisk].length} chars, entry is ${[...ENTRY].length}`);
}
validate(onDisk);

console.log(`Wrote ${[...ENTRY].length} chars to ${outPath}`);
console.log(ENTRY);
