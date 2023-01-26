import * as fs from 'node:fs';
import * as path from 'node:path';

let input = fs.readFileSync(path.resolve(__dirname, 'input.prod'), 'utf8');

let chars = input.trim().split('');

const PACKET_MARKER = 4;

let set = new Set();
let firstPos = 0;

for (let i = PACKET_MARKER; i <= chars.length; ++i) {
  let slice = chars.slice(i - PACKET_MARKER, i);
  set = new Set(slice);
  if (set.size === PACKET_MARKER) {
    firstPos = i;
    break;
  }
}

console.log(firstPos);

// part deux

const MESSAGE_MARKER = 14;

set = new Set();
firstPos = 0;

for (let i = MESSAGE_MARKER; i <= chars.length; ++i) {
  let slice = chars.slice(i - MESSAGE_MARKER, i);
  set = new Set(slice);
  if (set.size === MESSAGE_MARKER) {
    firstPos = i;
    break;
  }
}

console.log(firstPos);
