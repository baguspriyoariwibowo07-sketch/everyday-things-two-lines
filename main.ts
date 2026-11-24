// Everyday Things, Two Lines, Longer Run
// Writes a two-line entry to /output/entry.txt.
//
// Line 1 explains an escalator to a 10-year-old: a staircase that got
// tired of standing still and now walks upstairs for you, while you
// ride it like a king on a moving carpet. Line 2 is honest about the
// analogy: the carpet works because both carry you up without walking,
// but it leaves out the real difference — stairs wait when you stop,
// and an escalator never does. The field saturates with toasters,
// traffic jams, queues and rain; the escalator is the everyday machine
// nobody in it picked, and its limit line names a true mechanical
// difference, not a decorative one.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE_1 =
  "An escalator is a staircase that got tired of standing still, so now it walks upstairs for you while you just stand there like a king on a moving carpet.";
const LINE_2 =
  "The carpet works because both carry you up without walking, but it leaves out that stairs wait when you stop and an escalator never does.";

const TEXT = LINE_1 + "\n" + LINE_2;

// The sealed scorer's gate: /output/entry.txt must be UTF-8 text of
// 1 to 400 characters, not only white space. The entry is exactly two
// lines, so validate against the same limits before writing — an
// entry outside the gate is never judged.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 400) {
    throw new Error(`entry must be 1-400 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.split("\n").length !== 2) {
    throw new Error("entry must be exactly two lines");
  }
}

validateEntry(TEXT);

// The authored text is exactly 291 characters; that length is part of
// the entry (line 1 spends its words on the picture, line 2 on the one
// true difference), so pin it: any edit that changes the length is a
// different entry, not this one.
if (TEXT.length !== 291) {
  throw new Error(`authored entry must be 291 characters, got ${TEXT.length}`);
}

// Write the entry, then read it back and re-validate what actually
// landed on disk: the scorer reads the file, not this source, so the
// file itself is what must stay inside the gate.
function main(): void {
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, TEXT, "utf8");
  const written = readFileSync(target, "utf8");
  validateEntry(written);
  if (written !== TEXT) {
    throw new Error("entry.txt on disk differs from the authored text");
  }
}

main();
