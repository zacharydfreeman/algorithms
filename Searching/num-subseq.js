/*
You are given an array of integers nums and an integer target.

Return the number of non-empty subsequences of nums such that the sum of the minimum and maximum element on it is less or equal to target. Since the answer may be too large, return it modulo 109 + 7.

Input: nums = [3,5,6,7], target = 9
Output: 4
Explanation: There are 4 subsequences that satisfy the condition.
[3] -> Min value + max value <= target (3 + 3 <= 9)
[3,5] -> (3 + 5 <= 9)
[3,5,6] -> (3 + 6 <= 9)
[3,6] -> (3 + 6 <= 9)

Input: nums = [3,3,6,8], target = 10
Output: 6
Explanation: There are 6 subsequences that satisfy the condition. (nums can have repeated numbers).
[3] , [3] , [3,3], [3,6] , [3,6] , [3,3,6]

Input: nums = [2,3,3,4,6,7], target = 12
Output: 61
Explanation: There are 63 non-empty subsequences, two of them do not satisfy the condition ([6,7], [7]).
Number of valid subsequences (63 - 2 = 61).
 */

const numSubseq = (nums, target) => {
  let count = 0;
  const MOD = Math.pow(10, 9) + 7;
  // sort nums
  nums.sort((a, b) => a - b);
  for (let left = 0; left < nums.length; left++) {
    // get right pointer where right pointer is target - nums[left]
    const right = specialBinarySearch(nums, left, target - nums[left]);
    if (right >= left) {
      count += Math.pow(2, right - left) % MOD;
    }
  }
  return count % MOD;
};

const specialBinarySearch = (nums, left, target) => {
  let l = left;
  let r = nums.length - 1;
  let right = -1;

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (nums[mid] <= target) {
      right = mid;
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return right;
};

const nums = [2, 3, 3, 4, 6, 7],
  target = 12;

console.log(numSubseq(nums, target));
