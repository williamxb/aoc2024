import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  // assign variables: sum: Integer, b: Array 
  // parse input into array with regex by removing whitespace
  let sum = 0, b = [], a = input.split(/\s+/);

  // break down single array into the two columns
  for (let i = 0; i < a.length; i++)
    (i % 2 ? b : a)[Math.floor(i / 2)] = a[i];
  
  // remove now empty items from first array
  a.splice(a.length / 2);
  
  // sort ascending
  let aSort = a.sort()
  let bSort = b.sort()

  // Math.abs to get non-negative difference
  for (let i = 0; i < a.length; i++) {
    sum+=Math.abs(aSort[i]-bSort[i])
  }
  return sum;
};

const part2 = (rawInput) => {
  // parse input & arrays round 2
  const input = parseInput(rawInput);
  let sum = 0, b = [], a = input.split(/\s+/);

  for(let i = 0; i< a.length; i++)
    (i % 2 ? b : a)[Math.floor(i / 2)] = a[i];
  
  a.splice(a.length / 2);

  // use Array.filter to get number of occurences 
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b.filter((x) => x == a[i]).length
  }
  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `3   4
        4   3
        2   5
        1   3
        3   9
        3   3`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3   4
        4   3
        2   5
        1   3
        3   9
        3   3`,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
