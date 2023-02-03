/*

Given an integer array nums, rotate the array to the right by k steps,
where k is non-negative.

Dont return anything. Modify array in place

Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]
 */

// Approach: Cyclic Replacements
// O(n) time | O(1) space
const rotate = (nums, k) => {
  let startIdx = 0; // declare startIdx
  let currentIdx = startIdx; // declare currentIdx
  let currentNum = nums[currentIdx]; // declare currentNum to track numbers
  let count = 0; // declare count to track how many changes you've made
  while (count < nums.length) {
    // if currentIdx = startIdx, there is a cycle so update startIdx, currentIdx and currentNum
    if (count > 0 && currentIdx === startIdx) {
      startIdx++;
      currentIdx = startIdx;
      currentNum = nums[currentIdx];
    }
    // calculate newIdx
    const newIdx = (currentIdx + k) % nums.length;
    // get next num so you wont lose access to it when you overwrite the value at the new idx
    const nextNum = nums[newIdx];
    // update newIdx with currentNum
    nums[newIdx] = currentNum;
    // update currentNum, currentIdx and count
    currentNum = nextNum;
    currentIdx = newIdx;
    count++;
  }
};

// Approach: Store the nums original values into auxillary array
// O(n) time | O(n) space
const rotate2 = (nums, k) => {
  // create a copy of array
  const numsMap = [...nums];
  // loop through nums and update
  for (let i = 0; i < nums.length; i++) {
    const newIdx = (i + k) % nums.length;
    nums[newIdx] = numsMap[i];
  }
};
