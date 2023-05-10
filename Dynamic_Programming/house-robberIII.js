/* 
The thief has found himself a new place for his thievery again. There is only one entrance to this area, called root.

Besides the root, each house has one and only one parent house. After a tour, the smart thief realized that all houses in this place form a binary tree. It will automatically contact the police if two directly-linked houses were broken into on the same night.

Given the root of the binary tree, return the maximum amount of money the thief can rob without alerting the police.

Input: root = [3,2,3,null,3,null,1]
Output: 7
Explanation: Maximum amount of money the thief can rob = 3 + 3 + 1 = 7.

Input: root = [3,4,5,1,3,null,1]
Output: 9
Explanation: Maximum amount of money the thief can rob = 4 + 5 = 9.

*/

// O(n) time | O(h) space
const rob = (root) => {
  const ans = _rob(root);
  return Math.max(ans[0], ans[1]);
};

const _rob = (root) => {
  // base case if root is null return [0, 0] [rob, dontRob]
  if (!root) return [0, 0];
  const [leftRob, leftDontRob] = _rob(root.left);
  const [rightRob, rightDontRob] = _rob(root.right);
  // if we chose to rob this node, we cannot rob its children
  const take = root.val + leftDontRob + rightDontRob;
  // if we chose to not rob this node, we can rob any of its children
  const dontTake =
    Math.max(leftRob, leftDontRob) + Math.max(rightRob, rightDontRob);
  return [take, dontTake];
};
