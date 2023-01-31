/*
Write a function that takes in an array of integers and return a new array containing, at each index,
the next element in the input array that's greater than the elemtn at that index in the input array

If there is no such element for a particular index, the value at that index in the output array should be -1

Additionally, your function should treat the input array as a circular array.

array = [2, 5, -3, -4, 6, 7, 2]
output = [5, 6, 6, 6, 7, -1, 5]
*/

// Approach: have a stack that is going to keep track of the indices of the array
// O(n) time | O(n) space
const nextGreaterElement = (array) => {
  // declare output array
  const output = new Array(array.length).fill(-1);
  // initialize stack with index 0
  let stack = [0];
  // loop through array twice
  for (let idx = 1; idx < 2 * array.length; idx++) {
    // use mod to convert to circular index
    let circularIdx = idx % array.length;
    // look at top of stack and if element at that index is smaller than element at circ idx in array
    // then push that element into output at the position of the index
    while (
      stack.length > 0 &&
      array[circularIdx] > array[stack[stack.length - 1]]
    ) {
      const idxRemoved = stack.pop(); // get top of stack
      output[idxRemoved] = array[circularIdx]; // update output
    }
    // push onto stack the latest index
    stack.push(circularIdx);
  }
  return output;
};

// Approach: Brute force. At every elemtn loop through array once and find next greater element
// O(n^2) time | O(1) space
const nextGreaterElement2 = (array) => {
  // declare output array
  const output = [];

  for (let i = 0; i < array.length; i++) {
    const currentNum = array[i];
    for (let j = i; j < array.length + i; j++) {
      // get circular index;
      const circularIdx = j % array.length;
      if (array[circularIdx] > currentNum) {
        output.push(array[circularIdx]);
        break;
      }
      // if j is at the end of the index that means there is no next greater element
      if (j === array.length + i - 1) {
        output.push(-1);
      }
    }
  }
  return output;
};
