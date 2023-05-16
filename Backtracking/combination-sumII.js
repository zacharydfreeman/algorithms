/*
Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

Each number in candidates may only be used once in the combination.

Note: The solution set must not contain duplicate combinations.

Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: 
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]

Input: candidates = [2,5,2,1,2], target = 5
Output: 
[
[1,2,2],
[5]
]
 */

// Approach: Backtracking
// O(2^n * n) time | O(2^n * n) space
const combinationSum = (candidates, target) => {
  const counts = {};
  for (let num of candidates) {
    counts[num] = counts[num] + 1 || 1;
  }
  const countsArr = Array.from(Object.entries(counts));
  const combos = [];
  const getCombos = (target, combo, idx) => {
    if (target === 0) {
      combos.push([...combo]);
      return;
    }
    if (target < 0) return;

    for (let i = idx; i < countsArr.length; i++) {
      const [num, count] = countsArr[i];
      if (count <= 0) continue;
      combo.push(Number(num));
      countsArr[i][1]--;
      getCombos(target - Number(num), combo, i);
      combo.pop();
      countsArr[i][1]++;
    }
  };
  getCombos(target, [], 0);
  return combos;
};

// Approach: Backtracking
// O(2^n * n) time | O(2^n * n) space
const combinationSum2 = (candidates, target) => {
  candidates.sort((a, b) => a - b);
  const combos = [];
  const getCombos = (target, idx, combo) => {
    if (target === 0) {
      combos.push([...combo]);
      return;
    }
    if (target < 0) return;

    let prev = -1;
    for (let i = idx; i < candidates.length; i++) {
      if (candidates[i] === prev) continue;
      combo.push(candidates[i]);
      getCombos(target - candidates[i], i + 1, combo);
      combo.pop();
      prev = candidates[i];
    }
  };
  getCombos(target, 0, []);
  return combos;
};
