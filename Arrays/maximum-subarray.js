/*
Given an integer array nums, find the subarray
with the largest sum, and return its sum.

Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.

Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
*/

// O(n) time | O(1) space
const maxSubArray = (nums) => {
    // declare a maxSum variable that will track maxSum and a maxSoFar variable that will track max at current element in array
    let maxSum = -Infinity;
    let maxSoFar = -Infinity;

    for (let i = 0; i < nums.length; i++) {
        // get current element
        const currentNum = nums[i];
        // update maxSoFar
        maxSoFar = Math.max(maxSoFar + currentNum, currentNum);
        // update maxSum
        maxSum = Math.max(maxSum, maxSoFar);
    }

    return maxSum;
}

console.log(maxSubArray([5, -3, 5, 5, -3]));
// O(n^2) time | O(1) space
const maxSubArray2 = (nums) => {
    // declare max sum variable to -Infinity
    let maxSum = -Infinity;
    // for all subarrays
    for (let i = 0; i < nums.length; i++) {
        let currentMaxSum = nums[i];
        maxSum = Math.max(maxSum, currentMaxSum);
        for (let j = i + 1; j < nums.length; j++) {
            currentMaxSum += nums[j];
            maxSum = Math.max(maxSum, currentMaxSum);
        }
    }
    return maxSum;
}
