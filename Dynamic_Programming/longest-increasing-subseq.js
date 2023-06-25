/*
Given an integer array nums, return the length of the longest strictly increasing
subsequence

Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
 */

// Approach: Intelligent sequence building with binary search.
// O(nlog(n)) time | O(n) space
const lengthOfLIS = (nums) => {
  const seq = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    const index = specialBinarySearch(seq, nums[i]);
    if (nums[i] > seq[seq.length - 1]) {
      seq.push(nums[i]);
    } else {
      seq[index] = nums[i];
    }
  }
  return seq.length;
};

const specialBinarySearch = (seq, num) => {
  let l = 0;
  let r = seq.length - 1;
  let index = -1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (seq[mid] === num) {
      index = mid;
      break;
    }
    if (seq[mid] < num) {
      l = mid + 1;
    } else {
      index = mid;
      r = mid - 1;
    }
  }
  return index;
};

// Approach: Dynamic programming
// O(n^2) time | O(n) space
const lengthOfLIS2 = (nums) => {
  // declare a DP array that will be the length of LIS at that index using that number
  const longest = new Array(nums.length).fill(1); // fill with 1 to start
  // declare a max index variable to track the longest subsequence
  let maxIdx = 0;
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        longest[i] = Math.max(longest[i], longest[j] + 1);
      }
    }
    // update maxIdx
    maxIdx = longest[i] > longest[maxIdx] ? i : maxIdx;
  }
  return longest[maxIdx];
};

// Approach: Recursive
// O(n^2) time | O(n^2) space
const lengthOfLIS3 = (nums, idx = 0, priorNum = -Infinity, memo = {}) => {
  // memoization
  const key = idx + ',' + priorNum;
  if (key in memo) return memo[key];
  // base case if idx is length of nums return 0
  if (idx === nums.length) return 0;
  // declare an options array that will hold results from using the current number and not using the current number
  const options = [];
  // recursive call if you take the first number
  const currentNum = nums[idx];
  if (currentNum > priorNum) {
    const takeResult = 1 + lengthOfLIS2(nums, idx + 1, currentNum, memo);
    options.push(takeResult);
  }
  // recurisve call if you dont use first number
  const dontTakeResult = lengthOfLIS2(nums, idx + 1, priorNum, memo);
  options.push(dontTakeResult);
  // longest increasing subseq is going to be max of both results
  memo[key] = Math.max(...options);
  return memo[key];
};
