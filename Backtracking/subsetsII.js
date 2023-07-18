/* 
Given an integer array nums that may contain duplicates, return all possible 
subsets
 (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]

Input: nums = [0]
Output: [[],[0]]

*/

// O(n * 2^n) time | O(n) space
const subsetsWithDup = (nums) => {
  nums.sort((a, b) => a - b);
  const output = [];
  const subset = [];
  const dfs = (idx) => {
    if (idx === nums.length) {
      output.push([...subset]);
      return;
    }
    // take
    subset.push(nums[idx]);
    let nextIdx = idx + 1;
    while (nextIdx < nums.length && nums[nextIdx] === nums[idx]) {
      nextIdx++;
    }
    dfs(idx + 1);
    // backtrack
    subset.pop();
    dfs(nextIdx);
  };
  dfs(0);
  return output;
};
