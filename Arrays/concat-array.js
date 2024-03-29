/*
Given an integer array nums of length n, you want to create an array ans of length 2n where ans[i] == nums[i] and ans[i + n] == nums[i] for 0 <= i < n (0-indexed).

Specifically, ans is the concatenation of two nums arrays.

Return the array ans.

Input: nums = [1,2,1]
Output: [1,2,1,1,2,1]
Explanation: The array ans is formed as follows:
- ans = [nums[0],nums[1],nums[2],nums[0],nums[1],nums[2]]
- ans = [1,2,1,1,2,1]

Input: nums = [1,3,2,1]
Output: [1,3,2,1,1,3,2,1]
Explanation: The array ans is formed as follows:
- ans = [nums[0],nums[1],nums[2],nums[3],nums[0],nums[1],nums[2],nums[3]]
- ans = [1,3,2,1,1,3,2,1]
*/

// O(n) time | O(n) space
const getConcatenation = (nums) => {
  const output = [];
  for (let i = 0; i < 2; i++) {
    for (let num of nums) {
      output.push(num);
    }
  }
  return output;
};

// O(n) time | O(n) space
const getConcatenation2 = (nums) => {
  // declare idx and length variable
  let i = 0;
  const length = nums.length;
  while (i < length) {
    nums.push(nums[i]);
    i++;
  }
  return nums;
};
