/* 
Given the root of a binary tree, return the number of nodes where the value of the node is equal to the sum of the values of its descendants.

A descendant of a node x is any node that is on the path from node x to some leaf node. The sum is considered to be 0 if the node has no descendants.

Input: root = [10,3,4,2,1]
Output: 2
Explanation:
For the node with value 10: The sum of its descendants is 3+4+2+1 = 10.
For the node with value 3: The sum of its descendants is 2+1 = 3.

Input: root = [2,3,null,2,null]
Output: 0
Explanation:
No node has a value that is equal to the sum of its descendants.

Input: root = [0]
Output: 1
For the node with value 0: The sum of its descendants is 0 since it has no descendants.

*/

// O(n) time | O(h) space
const equalToDescendants = (root) => {
  let count = 0;

  const dfs = (root) => {
    if (!root) return 0;

    const leftSum = dfs(root.left);
    const rightSum = dfs(root.right);

    if (root.val === leftSum + rightSum) count++;

    return root.val + leftSum + rightSum;
  };

  dfs(root);
  return count;
};
