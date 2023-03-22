/* 

Write a function that takes in two non-empty arrays of integers, finds the pair of numbers (one from each array) whose absolute difference is closest to zero, and returns an array containing these two numbers, with the number from the first array in the first position

Note that the absolute difference of two integers is the distance between them on the real number line.

You can assume that there will only be one pair of numbers with the smallest difference

const arrayOne = [-1, 5, 10, 20, 28, 3]
const arrayTwo = [26, 134, 135, 15, 17]
output = [28, 26]

*/

// O(nlog(n) + mlog(m)) time | O(1) space where n is length of arrayOne and m is lenght of arrayTwo
const smallestDifference = (arrayOne, arrayTwo) => {
  arrayOne.sort((a, b) => a - b);
  arrayTwo.sort((a, b) => a - b);
  let min = Infinity;
  let output = [];
  let i = 0;
  let j = 0;

  while (i < arrayOne.length && j < arrayTwo.length) {
    const numOne = arrayOne[i];
    const numTwo = arrayTwo[j];
    const difference = Math.abs(numOne - numTwo);
    if (difference < min) {
      min = difference;
      output = [numOne, numTwo];
    }
    if (numOne < numTwo) {
      i++;
    } else {
      j++;
    }
  }
  return output;
};
