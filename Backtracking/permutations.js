/**
 * Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.
 * 
 * Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 */

// O(n! * n) time | O(n!) space
const permute = (nums, idx = 0) => {
  if (nums.length === idx) return [[]];
  // recursively call function with next index
  const combos = permute(nums, idx + 1);
  // declare output variable
  const output = [];
  for (let combo of combos) {
    for (let i = 0; i <= combo.length; i++) {
      output.push([...combo.slice(0, i), nums[idx], ...combo.slice(i)]);
    }
  }
  return output;
};

// O(n! * n) time | O(n!) space
const permute2 = (nums) => {
  const output = [];
  const dfs = (idx) => {
    if (nums.length === idx) output.push([...nums]);
    for (let i = idx; i < nums.length; i++) {
      // swap
      [nums[idx], nums[i]] = [nums[i], nums[idx]];
      // recursively call dfs with next idx
      dfs(idx + 1);
      // swap back (backtrack);
      [nums[idx], nums[i]] = [nums[i], nums[idx]];
    }
  };
  dfs(0);
  return output;
};
