import * as fs from 'node:fs';
import * as path from 'node:path';

let input = fs.readFileSync(path.resolve(__dirname, 'input.prod'), 'utf8');

let lines = input.trim().split('\n');

// "Functional" style
// let instructions = lines
//   .filter((line) => line.startsWith('$ '))
//   .map((instr) => instr.replace('$ ', '').trim());
// let cd = instructions.filter((instr) => instr.startsWith('cd'));
// console.log(cd);

let sizes = new Map();
let stack: string[] = [];
for (const line of lines) {
  let ls = /^\$ ls$/gi.exec(line);
  // Skip ls statements
  if (ls != null) {
    continue;
  }

  let dir = /^\$ cd (.+)$/gi.exec(line)?.[1];
  if (dir != null) {
    if (dir === '..') {
      stack.pop();
    } else {
      stack.push(dir);
    }

    continue;
  }

  let { size } = /^(?<size>\d+)\s+/gi.exec(line)?.groups ?? {};
  if (size != null) {
    let numSize = Number(size);
    // Add the size of this dir *and* the size of all of its parents
    for (let i = 1; i < stack.length + 1; i++) {
      let path = '/' + stack.slice(1, i).join('/');
      sizes.set(path, numSize + (sizes.get(path) ?? 0));
    }
  }
}

let total = 0;
for (const [_, size] of sizes) {
  if (size <= 100_000) {
    total += size;
  }
}
console.log(total);

const TOTAL_DISK_SPACE = 70_000_000;
const NEEDED_UNUSED = 30_000_000;
const TOTAL_AVAILABLE = TOTAL_DISK_SPACE - sizes.get('/');

let smallest = sizes.get('/');
for (const [_, size] of sizes) {
  if (TOTAL_AVAILABLE + size >= NEEDED_UNUSED) {
    smallest = Math.min(smallest, size);
  }
}

console.log(smallest);
