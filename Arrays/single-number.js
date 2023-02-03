/*
Given a non-empty array of integers nums, every element appears twice except for one.
Find that single one.

You must implement a solution with a linear runtime complexity and use only
constant extra space.

Input: nums = [2,2,1]
Output: 1

Input: nums = [4,1,2,1,2]
Output: 4

 */

// Approach: Use bitwise manipulation. XOR
// When you use XOR with same number it gives you 0 and when you use XOR with
// zero, it gives you same number. So after XORing all of the numbers whatever
// only appears once it the single number
// O(n) time | O(1) space
const singleNumber = (nums) => {
  // declare answer variable and set to 0
  let ans = 0;
  for (let num of nums) {
    ans = num ^ ans;
  }
  return ans;
};

console.log(singleNumber([2, 2, 1, 1, 3, 3, 10]));

// O(n) time | O(n) space
const singleNumber2 = (nums) => {
  const map = {};
  for (let num of nums) {
    map[num] = (map[num] || 0) + 1;
  }
  for (let key in map) {
    if (map[key] === 1) return key;
  }
};
