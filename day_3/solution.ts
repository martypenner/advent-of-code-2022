// [______ | ______]

import * as fs from 'node:fs';
import * as path from 'node:path';

let input = fs.readFileSync(path.resolve(__dirname, './input.prod'), 'utf8');

let sumOfPriorities = input
  .split('\n')
  .filter(Boolean)
  .map((rucksack) => [rucksack.slice(0, rucksack.length / 2), rucksack.slice(rucksack.length / 2)])
  .reduce((acc, [left, right]) => {
    let commonItem = new Set(Array.from(left).filter((x) => new Set(right).has(x)));
    let charCode = Array.from(commonItem)[0].charCodeAt(0);
    let priority = charCode >= 'a'.charCodeAt(0) ? charCode - 96 : charCode - 38;

    return acc + priority;
  }, 0);

console.log(sumOfPriorities);

// part deux

let rucksacks = input.split('\n').filter(Boolean);

let totalSum = 0;
for (let i = 0; i <= rucksacks.length - 3; i += 3) {
  let groupIndex = i % 3;
  let sacks = [new Set(rucksacks[i]), new Set(rucksacks[i + 1]), new Set(rucksacks[i + 2])];
  let commonItem = [...sacks[0]].filter((x) => sacks[1].has(x) && sacks[2].has(x));
  let charCode = Array.from(commonItem)[0].charCodeAt(0);
  let priority = charCode >= 'a'.charCodeAt(0) ? charCode - 96 : charCode - 38;

  totalSum += priority;
}

console.log(totalSum);
