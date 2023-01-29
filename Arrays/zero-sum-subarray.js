/*
You're given a lis of integers num. Write a function that returns a boolean representing whether
there exists a zero-sum subarray of nums;

A zero-sum subarray is any subarray where all of the values add up to zero. A subarray is any
contiguous section of the array. For the purposes of this problem, a subarray can be as small as
one element and as long as the original array

nums = [-5, -5, 2, 3, -2];
true
 */

// Approach: Prefix sums. If you see the current total sum in seen then that means there is a subarray that adds up to zero
// O(n) time | O(n) space
const zeroSumSubarray = (nums) => {
    // declare a seen set initialized with zero and total variable
    const seen = new Set([0]);
    let total = 0;
    // loop through nums
    for (let num of nums) {
        total += num;
        if (seen.has(total)) return true;
        seen.add(total);
    }
    return false;
}
