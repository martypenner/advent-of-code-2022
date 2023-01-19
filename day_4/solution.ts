// start1 >= start2 && end1 <= end2

import * as fs from 'node:fs';
import * as path from 'node:path';

let input = fs.readFileSync(path.resolve(__dirname, 'input.prod'), 'utf8');

let assignments = input.split('\n').filter(Boolean);
let numFullyContained = 0;
for (const assignment of assignments) {
  let [left, right] = assignment.split(',');
  let sections = left.split('-').concat(right.split('-')).map(Number);
  let [start1, end1, start2, end2] = sections;

  if ((start1 >= start2 && end1 <= end2) || (start2 >= start1 && end2 <= end1)) {
    numFullyContained++;
  }
}

console.log(numFullyContained);

// part deux

numFullyContained = 0;
for (const assignment of assignments) {
  let [left, right] = assignment.split(',');
  let sections = left.split('-').concat(right.split('-')).map(Number);
  let [start1, end1, start2, end2] = sections;
  if ((start1 <= start2 && start2 <= end1) || (start2 <= start1 && start1 <= end2)) {
    numFullyContained++;
  }
}

console.log(numFullyContained);
