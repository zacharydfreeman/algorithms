/*
Suppose an array of length n sorted in ascending order is rotated between 1 and n times.
For example, the array nums = [0,1,2,4,5,6,7] might become:

[4,5,6,7,0,1,2] if it was rotated 4 times.
[0,1,2,4,5,6,7] if it was rotated 7 times.
Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums of unique elements, return the minimum element of this array.

You must write an algorithm that runs in O(log n) time.

*/

// Approach: Sifted binary search. Cleaner to solution than second one
// O(log(n)) time | O(1) space
const findMin = (nums) => {
  let low = 0;
  let high = nums.length - 1;
  while (low < high) {
    let mid = Math.floor(low + (high - low) / 2);
    // Found the pivot point where the rotation began
    if (nums[mid] > nums[high]) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return nums[low];
};

// Approach: Shifted binary search
// O(log(n)) time | O(1) space
const findMin2 = (nums) => {
  // declare left and right pointers
  let l = 0;
  let r = nums.length - 1;

  while (l < r) {
    // get middle index, middle, right and left numbers
    const mid = Math.floor((l + r) / 2);
    const midNum = nums[mid];
    const leftNum = nums[l];
    const rightNum = nums[r];
    // two cases we care about is if leftNum > rightNum or leftNum < rightNum
    if (leftNum > rightNum) {
      // if left num is greater than right num and middle is less than left num we need to go left
      if (midNum < leftNum) {
        // update right pointer to mid and NOT mid - 1 because mid could be the min number
        r = mid;
      } else {
        // go right
        l = mid + 1;
      }
    } else {
      // always go left
      r = mid - 1;
    }
  }

  return nums[l];
};
