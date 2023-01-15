import * as fs from "node:fs";
import * as path from "node:path";

let allCalories = fs.readFileSync(
	path.resolve(__dirname, "./input.prod"),
	"utf8"
);

let totals = allCalories.split("\n\n").map((pack) =>
	pack
		.split("\n")
		.map(Number)
		.filter(Boolean)
		.reduce((acc, curr) => acc + curr, 0)
);
console.log(Math.max(...totals));

// part 2

let totalsOfTopThree = allCalories
	.split("\n\n")
	.map((pack) =>
		pack
			.split("\n")
			.map(Number)
			.filter(Boolean)
			.reduce((acc, curr) => acc + curr, 0)
	)
	.slice()
	.sort((a, b) => b - a)
	.slice(0, 3)
	.reduce((acc, curr) => acc + curr, 0);
console.log(totalsOfTopThree);
