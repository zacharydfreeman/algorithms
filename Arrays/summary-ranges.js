/* 
You are given a sorted unique integer array nums.

A range [a,b] is the set of all integers from a to b (inclusive).

Return the smallest sorted list of ranges that cover all the numbers in the array exactly. That is, each element of nums is covered by exactly one of the ranges, and there is no integer x such that x is in one of the ranges but not in nums.

Each range [a,b] in the list should be output as:

"a->b" if a != b
"a" if a == b

Input: nums = [0,1,2,4,5,7]
Output: ["0->2","4->5","7"]
Explanation: The ranges are:
[0,2] --> "0->2"
[4,5] --> "4->5"
[7,7] --> "7"

Input: nums = [0,2,3,4,6,8,9]
Output: ["0","2->4","6","8->9"]
Explanation: The ranges are:
[0,0] --> "0"
[2,4] --> "2->4"
[6,6] --> "6"
[8,9] --> "8->9"

*/

// O(n) time | O(1) space
const summaryRanges = (nums) => {
  if (nums.length === 0) return [];
  const output = [];
  let i = 0;
  while (i < nums.length) {
    let start = nums[i];
    while (i + 1 < nums.length && nums[i] + 1 === nums[i + 1]) {
      i++;
    }
    if (start !== nums[i]) {
      output.push(start + '->' + nums[i]);
    } else {
      output.push(String(start));
    }
    i++;
  }

  return output;
};
