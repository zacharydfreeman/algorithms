/* 
Given the root of a binary search tree and a target value, return the value in the BST that is closest to the target. If there are multiple answers, print the smallest.

Input: root = [4,2,5,1,3], target = 3.714286
Output: 4

Input: root = [1], target = 4.428571
Output: 1
*/

// O(h) time | O(1) space
const closestValue = (root, target) => {
  let current = root;
  let ans = Infinity;
  let minDiff = Infinity;

  while (current) {
    const rootVal = current.val;
    const diff = Math.abs(rootVal - target);
    if (diff <= minDiff) {
      if (diff === minDiff) {
        ans = Math.min(ans, rootVal);
      } else {
        minDiff = diff;
        ans = rootVal;
      }
    }
    current = rootVal < target ? current.right : current.left;
  }

  return ans;
};
