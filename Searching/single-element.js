/*
You are given a sorted array consisting of only integers where every
element appears exactly twice,
except for one element which appears exactly once.

Return the single element that appears only once.

Your solution must run in O(log n) time and O(1) space.

Input: nums = [1,1,2,3,3,4,4,8,8]
Output: 2

Input: nums = [3,3,7,7,10,11,11]
Output: 10
*/

// Approach: Modified binary search
// O(log(n)) time | O(1) space
const singleNonDuplicate = (nums) => {
  // declare two pointers
  let l = 0;
  let r = nums.length - 1;
  while (l <= r) {
    // get midpoint
    const mid = Math.floor((l + r) / 2);
    // check to see if right side if even because this will determine where o go
    const rightEven = (r - mid) % 2 === 0;
    if (nums[mid - 1] === nums[mid]) {
      if (rightEven) {
        r = mid - 2;
      } else {
        l = mid + 1;
      }
    } else if (nums[mid + 1] === nums[mid]) {
      if (rightEven) {
        l = mid + 2;
      } else {
        r = mid - 1;
      }
    } else {
      return nums[mid];
    }
  }

  return nums[l];
};
