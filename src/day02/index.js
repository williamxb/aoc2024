import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const reports = input.split(/\r\n|\r|\n/);
  let count = 0;

  for (const report of reports) {
    // parse report into array
    const levels = report.split(/\s+/).map(Number);
    // calculate differences in reports
    const diffs = levels.slice(0, -1).map((x, i) => x - levels[i + 1]);

    if (
      diffs.every((x) => x >= 1 && x <= 3) ||
      diffs.every((x) => x <= -1 && x >= -3)
    ) {
      count++;
    }
  }
  return count;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  function isSafe(levels) {
    const diffs = levels.slice(0, -1).map((x, i) => x - levels[i + 1]);
    return (
      diffs.every((x) => x >= 1 && x <= 3) ||
      diffs.every((x) => x <= -1 && x >= -3)
    );
  }
  let count = 0;
  const reports = input.trim().split("\n");

  for (const report of reports) {
    const levels = report.split(" ").map(Number);
    if (
      levels.some((_, index) =>
        isSafe([...levels.slice(0, index), ...levels.slice(index + 1)]),
      )
    ) {
      count++;
    }
  }
  return count;
};

run({
  part1: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
