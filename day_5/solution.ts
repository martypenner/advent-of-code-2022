import * as fs from 'node:fs';
import * as path from 'node:path';

function reverse(str) {
  return [...str].reverse().join('');
}

function moveCratesWithMover9000(stacks, amount, from, to) {
  let movedCrate = reverse(stacks[from - 1].slice(0, amount));
  return stacks.map((stack, i) =>
    i === from - 1 ? stack.slice(amount) : i === to - 1 ? movedCrate + stack : stack
  );
}

function moveCratesWithMover9001(stacks, amount, from, to) {
  let movedCrate = stacks[from - 1].slice(0, amount);
  return stacks.map((stack, i) =>
    i === from - 1 ? stack.slice(amount) : i === to - 1 ? movedCrate + stack : stack
  );
}

let input = fs.readFileSync(path.resolve(__dirname, 'input.prod'), 'utf8');

let [rawStacks, rawInstructions] = input.split('\n\n');

let stackRows = rawStacks
  .split('\n')
  .slice(0, -1)
  .map((row) => [...row].filter((_, i) => i % 4 === 1));

// Convert vertical stacks to horizontal stacks
let stacks = Array(stackRows[0].length).fill('');
for (const row of stackRows) {
  for (const [index, char] of row.entries()) {
    if (char.trim().length !== 0) {
      stacks[index] += char;
    }
  }
}

// Grab instructions
let instructions = rawInstructions
  .trim()
  .split('\n')
  .map((line) => [...line.matchAll(/\d+/g)].map(([match]) => Number(match)));
let newStacks = stacks.slice();

for (const [amount, from, to] of instructions) {
  newStacks = moveCratesWithMover9000(newStacks, amount, from, to);
}

let finalStacks = newStacks.map((stack) => stack[0]).join('');
console.log(finalStacks);

// ======== part deux ============

newStacks = stacks.slice();

for (const [amount, from, to] of instructions) {
  newStacks = moveCratesWithMover9001(newStacks, amount, from, to);
}

finalStacks = newStacks.map((stack) => stack[0]).join('');
console.log(finalStacks);
