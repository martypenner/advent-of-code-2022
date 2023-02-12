import * as fs from 'node:fs';
import * as path from 'node:path';

let input = fs.readFileSync(path.resolve(__dirname, 'input.prod'), 'utf8');

let lines = input
  .trim()
  .split('\n')
  .map((line) => line.split('').map(Number));

let edges = lines.length * 2 + (lines[0].length - 2) * 2;
let totalVisibleFromOutside = edges;
let highestVisibilityScore = 0;

for (let row = 1; row < lines.length - 1; ++row) {
  let line = lines[row];

  for (let col = 1; col < line.length - 1; ++col) {
    let left = line.slice(0, col);
    let right = line.slice(col + 1, line.length);
    let up = lines.slice(0, row).map((line) => line[col]);
    let down = lines.slice(row + 1, lines.length).map((line) => line[col]);

    let thisTreeHeight = Number(line[col]);

    // console.log(
    //   left,
    //   right,
    //   up,
    //   down,
    //   Math.max(Math.max(...left), 0) < treeHeight,
    //   Math.max(Math.max(...right), 0) < treeHeight,
    //   Math.max(Math.max(...up), 0) < treeHeight,
    //   Math.max(Math.max(...down), 0) < treeHeight
    // );

    // part one
    if (
      Math.max(Math.max(...left), 0) < thisTreeHeight ||
      Math.max(Math.max(...right), 0) < thisTreeHeight ||
      Math.max(Math.max(...up), 0) < thisTreeHeight ||
      Math.max(Math.max(...down), 0) < thisTreeHeight
    ) {
      totalVisibleFromOutside++;
    }

    // part deux
    // get the count of trees up to equal height
    let howManyHigher = [
      betterFindIndex(left.reverse(), (tree) => tree >= thisTreeHeight) ?? left.length,
      betterFindIndex(right, (tree) => tree >= thisTreeHeight) ?? right.length,
      betterFindIndex(up.reverse(), (tree) => tree >= thisTreeHeight) ?? up.length,
      betterFindIndex(down, (tree) => tree >= thisTreeHeight) ?? down.length,
    ];
    // console.log(thisTreeHeight, howManyHigher);

    let howManyHigherScore = howManyHigher.reduce((acc, curr) => acc * curr, 1);

    highestVisibilityScore = Math.max(highestVisibilityScore, howManyHigherScore);
  }
}

console.log(totalVisibleFromOutside);
console.log(highestVisibilityScore);

function betterFindIndex<T>(arr: T[], fn: (item: T) => boolean): number | null {
  let index = arr.findIndex(fn);
  return index === -1 ? null : index + 1;
}
