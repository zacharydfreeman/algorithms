/*
Given a binary array data, return the minimum number of swaps required to group all 1’s present in the array together in any place in the array.

Input: data = [1,0,1,0,1]
Output: 1
Explanation: There are 3 ways to group all 1's together:
[1,1,1,0,0] using 1 swap.
[0,1,1,1,0] using 2 swaps.
[0,0,1,1,1] using 1 swap.
The minimum is 1.

Input: data = [0,0,0,1,0]
Output: 0
Explanation: Since there is only one 1 in the array, no swaps are needed.

*/

// Approach: Sliding Window
// O(n) time | O(1) space
const minSwaps = (data) => {
  let numOnes = 0;
  for (let num of data) {
    if (num === 1) numOnes++;
  }
  if (numOnes === 1) return 0;
  let maxOnesInWindow = 0;
  for (let i = 0; i < numOnes; i++) {
    if (data[i] === 1) maxOnesInWindow++;
  }

  let i = 1;
  let j = numOnes;
  let currentOnes = maxOnesInWindow;
  while (j < data.length) {
    if (data[j] === 1) currentOnes++;
    if (data[i - 1] === 1) currentOnes--;
    maxOnesInWindow = Math.max(maxOnesInWindow, currentOnes);

    j++;
    i++;
  }
  return numOnes - maxOnesInWindow;
};
