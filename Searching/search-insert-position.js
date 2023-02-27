/**
 * Given a sorted array of distinct integers and a target value, return the index if the target is found.
 * If not, return the index where it would be if it were inserted in order.
 * You must write an algorithm with O(log n) runtime complexity.
 *
 * Input: nums = [1,3,5,6], target = 5 Output: 2
 * Input: nums = [1,3,5,6], target = 2 Output: 1
 */

// Approach: Binary search and return l if target is not found
// O(log(n)) time | O(1) space
const searchInsert = (nums, target) => {
  let l = 0;
  let r = nums.length - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] > target) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  return l;
};

console.log(searchInsert([1, 3, 5, 6], 100));
