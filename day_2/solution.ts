import * as fs from 'node:fs';
import * as path from 'node:path';

let input = fs.readFileSync(path.resolve(__dirname, './input.prod'), 'utf8');

const ROUND_POINTS = {
  win: 6,
  draw: 3,
  lose: 0,
};

const HAND_SHAPE_POINTS = {
  A: 1,
  X: 1,

  B: 2,
  Y: 2,

  C: 3,
  Z: 3,
};

const RULES = {
  AY: 'win',
  AZ: 'lose',

  BX: 'lose',
  BZ: 'win',

  CX: 'win',
  CY: 'lose',
};

let rounds = input.split('\n').filter(Boolean);
let totalScore = 0;
for (const round of rounds) {
  let [opponent, me] = round.split(' ');
  totalScore += ROUND_POINTS[RULES[opponent + me] ?? 'draw'] + HAND_SHAPE_POINTS[me];
}

console.log(totalScore);

// part deux

const STRATEGY_TO_HAND_SHAPE_CHOICE = {
  AX: 'Z',
  AY: 'X',
  AZ: 'Y',

  BX: 'X',
  BY: 'Y',
  BZ: 'Z',

  CX: 'Y',
  CY: 'Z',
  CZ: 'X',
};

totalScore = 0;
for (const round of rounds) {
  let [opponent, desiredEnd] = round.split(' ');
  let desiredHandShape = STRATEGY_TO_HAND_SHAPE_CHOICE[opponent.concat(desiredEnd)];
  let roundPoints =
    HAND_SHAPE_POINTS[desiredHandShape] + ROUND_POINTS[RULES[opponent.concat(desiredHandShape)] ?? 'draw'];

  totalScore += roundPoints;
}

console.log(totalScore);
