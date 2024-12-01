// getRandomIntInRange.ts

// Overload signatures
function getRandomIntInRange(min: number, max: number): number;
function getRandomIntInRange(range: [number, number]): number;

// Single implementation
function getRandomIntInRange(
  minOrRange: number | [number, number],
  max?: number
): number {
  let min: number;
  let maximum: number;

  if (typeof minOrRange === "number" && typeof max === "number") {
    min = minOrRange;
    maximum = max;
  } else if (
    Array.isArray(minOrRange) &&
    minOrRange.length === 2 &&
    typeof minOrRange[0] === "number" &&
    typeof minOrRange[1] === "number"
  ) {
    [min, maximum] = minOrRange;
  } else {
    throw new Error(
      "Invalid arguments. Use either (min: number, max: number) or (range: [number, number])."
    );
  }

  if (min > maximum) {
    throw new Error("Min should not be greater than Max.");
  }

  return Math.floor(Math.random() * (maximum - min)) + min;
}

export default getRandomIntInRange;
