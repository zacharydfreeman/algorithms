/* 
Given the root of a binary tree, return the maximum average value of a subtree of that tree. Answers within 10-5 of the actual answer will be accepted.

A subtree of a tree is any node of that tree plus all its descendants.

The average value of a tree is the sum of its values, divided by the number of nodes.

Input: root = [5,6,1]
Output: 6.00000
Explanation: 
For the node with value = 5 we have an average of (5 + 6 + 1) / 3 = 4.
For the node with value = 6 we have an average of 6 / 1 = 6.
For the node with value = 1 we have an average of 1 / 1 = 1.
So the answer is 6 which is the maximum.

Input: root = [0,null,1]
Output: 1.00000

*/

// O(n) time | O(h) space
const maximumAverageSubtree = (root) => {
  let max = -Infinity;

  const dfs = (root) => {
    if (!root) return [0, 0]; // [sum, count]

    const [leftSum, leftCount] = dfs(root.left);
    const [rightSum, rightCount] = dfs(root.right);

    const totalSum = root.val + leftSum + rightSum;
    const totalCount = leftCount + rightCount + 1;
    max = Math.max(totalSum / totalCount, max);
    return [totalSum, totalCount];
  };

  dfs(root);
  return max;
};
