/*
Write a function, pairSum, that takes in an array and a target sum as arguments.
The function should return an array containing a pair of indices whose elements sum to the given target.
The indices returned must be unique.

Be sure to return the indices, not the elements themselves.

There is guaranteed to be one such pair that sums to the target.

pairSum([3, 2, 5, 4, 1], 8); // -> [0, 2]
pairSum([4, 7, 9, 2, 5, 1], 5); // -> [0, 5]
pairSum([1, 6, 7, 2], 13); // -> [1, 2]
*/


// O(n) time | O(n) space where n is the length of the array
const pairSum = (array, target) => {
  // declare a numbers map that will track what numbers we've visted and at what indexes
  const numbers = {};
  // loop through array
  for (let i = 0; i < array.length; i++) {
    const complement = target - array[i];
    // check if complement exists in map
    if (complement in numbers) return [numbers[complement], i];
    numbers[array[i]] = i;
  }
};

// O(n^2) time | O(1) space where n is the length of the array
const pairSum2 = (array, target) => {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] + array[j] === target) return [i, j];
    }
  }
};
