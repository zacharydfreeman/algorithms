/*
Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.

Input: height = [4,2,0,3,2,5]
Output: 9
*/

// O(n) time | O(1) space
const trap = (height) => {
  // base case if height length <= 1 return 0
  if (height.length <= 1) return 0;
  // declare pointers
  let l = 0;
  let r = height.length - 1;
  let leftMax = height[l];
  let rightMax = height[r];
  let ans = 0;

  while (l < r) {
    // if leftMax <= rightMax, then we can update our answer
    if (leftMax <= rightMax) {
      l++;
      ans += Math.max(leftMax - height[l], 0);
      leftMax = Math.max(leftMax, height[l]);
    } else {
      r--;
      ans += Math.max(rightMax - height[r], 0);
      rightMax = Math.max(rightMax, height[r]);
    }
  }

  return ans;
};
