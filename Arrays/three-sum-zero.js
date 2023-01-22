/*
 Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k,
 and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation:
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.
 */

// [-4, -1, -1, 0, 1, 2]
// Approach: Sort the array and its easier to not get duplicates
// O(n^2) time | O(n) space
const threeSum = (nums) => {
    // sort
    nums.sort((a, b) => a - b);
    // declare output variable
    const output = [];
    // loop through array
    for (let i = 0; i < nums.length - 2; i++) {
        let num = nums[i];
        // if i is same as num before, continue. You dont want to check the same number
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        // declare two pointers
        let l = i + 1;
        let r = nums.length - 1;
        while (l < r) {
            // calculate sum
            const sum = num + nums[l] + nums[r];
            if (sum === 0) {
                output.push([num, nums[l], nums[r]]);
                // update left pointer. Has to go to next number that is not equal to current number
                l++;
                while (nums[l] === nums[l - 1] && l < r) {
                    l++;
                }
            } else if (sum > 0) {
                r--;
            } else {
                l++;
            }
        }
    }
    return output;
}
