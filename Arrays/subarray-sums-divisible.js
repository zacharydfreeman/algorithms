/*

Given an integer array nums and an integer k, return the number of non-empty subarrays
that have a sum divisible by k.

A subarray is a contiguous part of an array.

Input: nums = [4,5,0,-2,-3,1], k = 5
Output: 7
Explanation: There are 7 subarrays with a sum divisible by k = 5:
[4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]


[4, 9, 9, 7, 4, 5]
[5, 1, -4, -4, -2, 1]

*/

// Approach: Prefix sums. If any prefix sums have the same remainder then
// O(n +k) time | O(k) space
// THIS IS NOT CORRECT
const subArrayDivByK = (nums, k) => {
    // create prefix sums array
    const prefixSums = [];
    let currentSum = 0;
    for (let i = 0; i < nums.length; i++) {
        currentSum += nums[i];
        prefixSums.push(currentSum);
    }

    let count = 0;
    const remainders = {};
    for (let sum of prefixSums) {
        const mod = sum % k;
        if (!(mod in remainders)) remainders[mod] = 0;
        remainders[mod]++;
    }

    // THIS IS NOT CORRECT
    return count;
}
// Approach: Prefix sums
// O(n^2) time | O(n) space
const subArrayDivByK2 = (nums, k) => {
    const prefixSums = [];
    let currentSum = 0;
    for (let i = 0; i < nums.length; i++) {
        currentSum += nums[i];
        prefixSums.push(currentSum);
    }
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        if (prefixSums[i] % k === 0) count++;
        for (let j = i + 1; j < nums.length; j++) {
            if ((prefixSums[j] - prefixSums[i]) % k === 0) {
                count++;
            }
        }
    }
    return count;
}


// Approach: Brute force. Generate all subarrays and check if divisible by k
// O(n^2) time | O(1) space
const subArrayDivByK3 = (nums, k) => {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        let currentSum = nums[i];
        if (currentSum % k === 0) count++;
        for (let j = i + 1; j < nums.length; j++) {
            currentSum += nums[j];
            if (currentSum % k === 0) count++;
        }
    }
    return count;
}

console.log(subArrayDivByK([4, 5, 0, -2, -3, 1], 5));
