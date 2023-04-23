/*
Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

You must solve it in O(n) time complexity.

Input: nums = [3,2,1,5,6,4], k = 2
Output: 5

Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4

*/

// Approach: quick select
// O(n) time | O(1) space
const findKthLargest = (nums, k) => {
  // declare start and end indexes
  let startIdx = 0;
  let endIdx = nums.length - 1;
  while (true) {
    // need to declare a pivot
    const pivot = startIdx;
    let leftIdx = pivot + 1;
    let rightIdx = endIdx;
    // preform quick sort
    while (leftIdx <= rightIdx) {
      // swap if necessary
      if (nums[leftIdx] > nums[pivot] && nums[rightIdx] < nums[pivot]) {
        [nums[leftIdx], nums[rightIdx]] = [nums[rightIdx], nums[leftIdx]];
      }
      if (nums[leftIdx] <= nums[pivot]) leftIdx++;
      if (nums[rightIdx] >= nums[pivot]) rightIdx--;
    }
    // swap with rightidx
    [nums[pivot], nums[rightIdx]] = [nums[rightIdx], nums[pivot]];
    // return if right position
    if (rightIdx === nums.length - k) return nums[rightIdx];
    if (rightIdx < nums.length - k) {
      // go right
      startIdx = rightIdx + 1;
    } else {
      endIdx = rightIdx - 1;
    }
  }
};
