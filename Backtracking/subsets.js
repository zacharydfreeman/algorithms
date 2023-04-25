/* 
Given an integer array nums of unique elements, return all possible 
subsets
 (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

Input: nums = [0]
Output: [[],[0]]
*/

// Approach: Backtracking. Optimized for time and space using a pointer
// O(n * 2^n) time | O(n * 2^n) space
const subsets = (nums, i = 0) => {
  // i = nums.length return 2D array
  if (i === nums.length) return [[]];
  // declare ouput variable
  const output = [];
  // recursively call function
  const sets = subsets(nums, i + 1);
  // push sets into output
  output.push(...sets);
  for (let set of sets) {
    output.push([nums[i], ...set]);
  }
  return output;
};

// Approach: Backtracking
// O(n * 2^n) time | O(n * 2^n) space
const subsets2 = (nums) => {
  // base case if nums is empty return 2D array
  if (!nums.length) return [[]];
  // declare output variable
  const output = [];
  // recusrively call function on smaller array
  const sets = subsets(nums.slice(1));
  // push sets into output
  output.push(...sets);
  // add current number to sets and push into output
  for (let set of sets) {
    output.push([nums[0], ...set]);
  }
  // return output
  return output;
};

// Approach: Backtracking
// O(n * 2^n) time | O(n * 2^n) space
const subsets3 = (nums) => {
  // declare res array
  const output = [];
  // declare subset array that will act as the current subset
  const subset = [];
  const dfs = (i) => {
    if (i === nums.length) {
      // push a copy of subset into output
      output.push([...subset]);
      return;
    }
    // take the first element
    subset.push(nums[i]);
    dfs(i + 1);
    // dont take the first element
    subset.pop();
    dfs(i + 1);
  };
  // call dfs with index 0
  dfs(0);
  // return output
  return output;
};
