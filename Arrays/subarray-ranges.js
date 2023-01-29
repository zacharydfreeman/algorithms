/*
You are given an integer array nums. The range of a subarray of nums is the difference between
the largest and smallest element in the subarray.

Return the sum of all subarray ranges of nums.

A subarray is a contiguous non-empty sequence of elements within an array.

Input: nums = [1,2,3]
Output: 4
Explanation: The 6 subarrays of nums are the following:
[1], range = largest - smallest = 1 - 1 = 0
[2], range = 2 - 2 = 0
[3], range = 3 - 3 = 0
[1,2], range = 2 - 1 = 1
[2,3], range = 3 - 2 = 1
[1,2,3], range = 3 - 1 = 2
So the sum of all ranges is 0 + 0 + 0 + 1 + 1 + 2 = 4.

*/


// O(n^2) time | O(1) space where n is the lenght of the nums array
const subArrayRanges2 = (nums) => {
    // delcare total variable
    let total = 0;
    // loop through nums to get all subarrays
    for (let i = 0; i < nums.length - 1; i++) {
        // need to declare a largest and smallest num. Set initially to current num
        let largest = nums[i];
        let smallest = nums[i];
        // get different sub arrays
        for (let j = i + 1; j < nums.length; j++) {
            // update largest and smallest
            largest = Math.max(largest, nums[j]);
            smallest = Math.min(smallest, nums[j]);
            total += largest - smallest;
        }
    }
    return total;
}
