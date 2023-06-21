/*
You are given two 0-indexed arrays nums and cost consisting each of n positive integers.

You can do the following operation any number of times:

Increase or decrease any element of the array nums by 1.
The cost of doing one operation on the ith element is cost[i].

Return the minimum total cost such that all the elements of the array nums become equal.

Input: nums = [1,3,5,2], cost = [2,3,1,14]
Output: 8
Explanation: We can make all the elements equal to 2 in the following way:
- Increase the 0th element one time. The cost is 2.
- Decrease the 1st element one time. The cost is 3.
- Decrease the 2nd element three times. The cost is 1 + 1 + 1 = 3.
The total cost is 2 + 3 + 3 = 8.
It can be shown that we cannot make the array equal with a smaller cost.

Input: nums = [2,2,2,2,2], cost = [4,2,8,1,3]
Output: 0
Explanation: All the elements are already equal, so no operations are needed.


*/

// Approach: Prefix Sums, Sorting
// O(nlog(n)) time | O(n) space
const minCost = (nums, cost) => {
  const numsAndCost = new Array(nums.length);
  // build numsAndCost array
  for (let i = 0; i < nums.length; i++) {
    numsAndCost[i] = [nums[i], cost[i]];
  }
  // sort by number
  numsAndCost.sort((a, b) => a[0] - b[0]);
  // build prefixSums for cost
  const prefixCosts = [];
  let sum = 0;
  for (let i = 0; i < numsAndCost.length; i++) {
    sum += numsAndCost[i][1];
    prefixCosts.push(sum);
  }
  // calculate total cost to make numbers = nums[0]
  let totalCost = 0;
  for (let i = 1; i < numsAndCost.length; i++) {
    const difference = numsAndCost[i][0] - numsAndCost[0][0];
    const cost = numsAndCost[i][1];
    totalCost += difference * cost;
  }
  // now iterate through rest of number and do max logic
  let min = totalCost;
  for (let i = 1; i < numsAndCost.length; i++) {
    const difference = numsAndCost[i][0] - numsAndCost[i - 1][0];
    // add prefix cost sum
    totalCost += prefixCosts[i - 1] * difference;
    // subtract post fix
    const postfixCost =
      prefixCosts[numsAndCost.length - 1] - prefixCosts[i - 1];
    totalCost -= difference * postfixCost;

    min = Math.min(min, totalCost);
  }
  return min;
};

const nums = [1, 3, 5, 2],
  cost = [2, 3, 1, 14];

console.log(minCost(nums, cost));
