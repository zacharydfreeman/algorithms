/* 
You are given two integer arrays nums1 and nums2. We write the integers of nums1 and nums2 (in the order they are given) on two separate horizontal lines.

We may draw connecting lines: a straight line connecting two numbers nums1[i] and nums2[j] such that:

nums1[i] == nums2[j], and
the line we draw does not intersect any other connecting (non-horizontal) line.
Note that a connecting line cannot intersect even at the endpoints (i.e., each number can only belong to one connecting line).

Return the maximum number of connecting lines we can draw in this way.

Input: nums1 = [1,4,2], nums2 = [1,2,4]
Output: 2
Explanation: We can draw 2 uncrossed lines as in the diagram.
We cannot draw 3 uncrossed lines, because the line from nums1[1] = 4 to nums2[2] = 4 will intersect the line from nums1[2]=2 to nums2[1]=2.

Input: nums1 = [2,5,1,2,5], nums2 = [10,5,2,1,5,2]
Output: 3

Input: nums1 = [1,3,7,1,7,5], nums2 = [1,9,2,5,1]
Output: 2
*/

// Approach: 2D DP with Tabulation Optimized for Space Complexity
// O(n * m) time | O(n) space where n is length of nums1 array and m is length of nums2 array
const maxUncrossedLines = (nums1, nums2) => {
  let prevRow = new Array(nums1.length + 1).fill(0);
  for (let row = 1; row <= nums2.length; row++) {
    const currentRow = new Array(nums1.length + 1).fill(0);
    for (let col = 1; col <= nums1.length; col++) {
      if (nums1[col - 1] === nums2[row - 1]) {
        currentRow[col] = 1 + prevRow[col - 1];
      } else {
        currentRow[col] = Math.max(currentRow[col - 1], prevRow[col]);
      }
    }
    prevRow = currentRow;
  }
  return prevRow[nums1.length];
};

// Approach: 2D DP with Tabulation
// O(n * m) time | O(n * m) space where n is length of nums1 array and m is length of nums2 array
const maxUncrossedLines2 = (nums1, nums2) => {
  const dp = new Array(nums2.length + 1)
    .fill()
    .map(() => new Array(nums1.length + 1).fill(0));

  for (let row = 1; row <= nums2.length; row++) {
    for (let col = 1; col <= nums1.length; col++) {
      if (nums2[row - 1] === nums1[col - 1]) {
        dp[row][col] = 1 + dp[row - 1][col - 1];
      } else {
        dp[row][col] = Math.max(dp[row][col - 1], dp[row - 1][col]);
      }
    }
  }

  return dp[nums2.length][nums1.length];
};

const nums1 = [2, 5, 1, 2, 5],
  nums2 = [10, 5, 2, 1, 5, 2];

console.log(maxUncrossedLines(nums1, nums2));
