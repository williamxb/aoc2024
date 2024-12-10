import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput); /*.replace(/(\r\n|\n|\r)/gm, "")*/
  const regex = /mul\([\d]+,[\d]+\)/gm;
  const parsedMem = [...input.matchAll(regex)];
  var sum = 0;

  for (let i = 0; i < parsedMem.length; i++) {
    // console.log(parsedMem[i][0]);
    let instruction = parsedMem[i][0].replace(/[A-Za-z ()]/g, "").split(",");
    sum += instruction[0] * instruction[1];
  }
  return sum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const regex = /(mul\([\d]+,[\d]+\)|do\(\)|don't\(\))/gm;
  const parsedMem = [...input.matchAll(regex)];
  var sum = 0;
  let doMul = true;

  for (let i = 0; i < parsedMem.length; i++) {
    // console.log("parsed: ", parsedMem[i][0]);
    if (parsedMem[i][0] === "don't()") {
      doMul = false;
      // console.log("doMul set false");
    }

    while (doMul) {
      if (parsedMem[i][0] === "don't()" || parsedMem[i][0] === "do()") {
        // console.log("skipped", parsedMem[i][0]);
        break;
      } else {
        let instruction = parsedMem[i][0]
          .replace(/[A-Za-z ()]/g, "")
          .split(",");
        // console.log(instruction);
        sum += instruction[0] * instruction[1];
        // console.log("added ", instruction[0] * instruction[1], ": sum = ", sum);
        break;
      }
    }

    if (parsedMem[i][0] === "do()") {
      doMul = true;
      // console.log("doMul set true");
    }
  }

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
