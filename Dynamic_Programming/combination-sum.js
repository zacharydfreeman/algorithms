/*
Given an array of distinct integers candidates and a target integer target,
return a list of all unique combinations of candidates where the chosen numbers sum to target.
You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times.
Two combinations are unique if the frequency of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique combinations
that sum up to target is less than 150 combinations for the given input.

Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.
*/
// O(2^n) time | O(2^n) space
const combinationSum = (candidates, target, idx = 0) => {
  // base cases => if target === 0 return empty 2d array
  if (target === 0) return [[]];
  // base case if no more candidate or target < 0 return an empty array
  if (idx === candidates.length || target < 0) return [];
  // grab current candidate and declare output array
  const currentCandidate = candidates[idx];
  const output = [];
  // make recursive call that includes the current candidate
  const includes = combinationSum(candidates, target - currentCandidate, idx);
  // loop through results of includes
  for (let include of includes) {
    // create copy of array becuase arrays are passed by reference
    const newArr = [...include];
    // add current candidate and add to output array
    newArr.push(currentCandidate);
    output.push(newArr);
  }

  // make recursive call that doesnt include the current candidate
  const dontIncludes = combinationSum(candidates, target, idx + 1);
  // loop through results of not including the candidate
  for (let dontInclude of dontIncludes) {
    // create copy of array and add to output
    const newArr = [...dontInclude];
    output.push(newArr);
  }

  return output;
};

