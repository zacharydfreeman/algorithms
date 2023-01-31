/*

Write a function that takes a list of numbers and a target number,
and then returns the number of unique pairs that add up to the target number.

[X, Y] and [Y, X] are considered the same pair, and not unique.

Examples
Example 1:
Input: [1, 1, 2, 45, 46, 46], target = 47
Output: 2
Explanation:
1 + 46 = 47

2 + 45 = 47

Example 2:
Input: [1, 1], target = 2
Output: 1
Explanation:
1 + 1 = 2

Example 3:
Input: [1, 5, 1, 5], target = 6
Output: 1
Explanation:
[1, 5] and [5, 1] are considered the same, therefore there is only one unique pair that adds up to 6.
 */

const twoSumUniquePairs = (nums, target) => {
  const diff = {};
  const added = new Set();
  let count = 0;
  for (let num of nums) {
    const difference = target - num;
    if (difference in diff && !added.has(difference) && !added.has(num)) {
      count++;
      added.add(num);
    } else {
      diff[num] = true;
    }
  }
  return count;
};

console.log(twoSumUniquePairs([1, 2, 45, 1, 46, 46], 47));
