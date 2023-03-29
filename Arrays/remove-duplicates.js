/*
Given an integer array nums sorted in non-decreasing order, remove the duplicates
in-place such that each unique element appears only once.
The relative order of the elements should be kept the same.

Since it is impossible to change the length of the array in some languages,
you must instead have the result be placed in the first part of the array nums.
More formally, if there are k elements after removing the duplicates, then the first k
elements of nums should hold the final result.
It does not matter what you leave beyond the first k elements.

Return k after placing the final result in the first k slots of nums.

Do not allocate extra space for another array.
You must do this by modifying the input array in-place with O(1) extra memory.

Input: nums = [1,1,2]
Output: 2, nums = [1,2,_]
Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).

Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
Explanation: Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).

*/

//Approach: Two pointers
// O(n) time | O(1) space
const removeDuplicates = (nums) => {
  let i = 0;
  let j = 1;
  while (j < nums.length) {
    // is nums[i] === nums[j], we need to move the j pointer to the right
    if (nums[i] === nums[j]) {
      j++;
    } else {
      // swap elements at i + 1 index and j
      [nums[i + 1], nums[j]] = [nums[j], nums[i + 1]];
      // move both pointers forward
      i++;
      j++;
    }
  }
  // return how many distinct numbers there are which is the i pointer + 1
  return i + 1;
};
