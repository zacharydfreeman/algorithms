/*

Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

A subarray is a contiguous non-empty sequence of elements within an array.

Input: nums = [1,1,1], k = 2
Output: 2

Input: nums = [1,2,3], k = 3
Output: 2

*/

const subarraySum = (nums, k) => {
    // declare a map to store prefix sums, currentSum variable and total count variable
    const prefixSums = {0: 1} // we have to initialize 0 to 1
    let currentSum = 0;
    let total = 0;

    for (let i = 0; i < nums.length; i++) {
        // update currentSum
        currentSum += nums[i];
        // check to see if currentSum - k is in map. If it is then that means you found a subarray that sums to k
        const difference = currentSum - k;
        if (difference in prefixSums) {
            total += prefixSums[difference];
        }
        // update currentSum in prefix Sums
        prefixSums[currentSum] = prefixSums[currentSum] + 1 || 1;
    }

    return total;
}
