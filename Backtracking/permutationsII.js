/* 
Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.

Input: nums = [1,1,2]
Output:
[[1,1,2],
 [1,2,1],
 [2,1,1]]

 Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

*/

// Approach: Backtracking with a hash map
const permuteUnique = (nums) => {
  const output = [];
  const perm = [];
  const count = {};
  for (let num of nums) {
    count[num] = count[num] + 1 || 1;
  }
  const dfs = () => {
    if (perm.length === nums.length) output.push([...perm]);

    for (let num in count) {
      if (count[num] > 0) {
        perm.push(num);
        count[num]--;

        dfs();

        count[num]++;
        perm.pop();
      }
    }
  };
  dfs();
  return output;
};

// O(n!* n) time | O(n!) space
const permuteUnique2 = (nums) => {
  const output = [];
  const dfs = (idx) => {
    const visited = new Set();
    if (nums.length === idx) output.push([...nums]);
    for (let i = idx; i < nums.length; i++) {
      // if i is not same as idx and nums[i] is not in visited set, then continue
      if (i !== idx && visited.has(nums[i])) continue;
      // add num to visited set
      visited.add(nums[i]);
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
