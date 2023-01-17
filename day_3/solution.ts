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
