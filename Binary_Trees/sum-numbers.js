/* 
You are given the root of a binary tree containing digits from 0 to 9 only.

Each root-to-leaf path in the tree represents a number.

For example, the root-to-leaf path 1 -> 2 -> 3 represents the number 123.
Return the total sum of all root-to-leaf numbers. Test cases are generated so that the answer will fit in a 32-bit integer.

A leaf node is a node with no children.

Input: root = [1,2,3]
Output: 25
Explanation:
The root-to-leaf path 1->2 represents the number 12.
The root-to-leaf path 1->3 represents the number 13.
Therefore, sum = 12 + 13 = 25.

Input: root = [4,9,0,5,1]
Output: 1026
Explanation:
The root-to-leaf path 4->9->5 represents the number 495.
The root-to-leaf path 4->9->1 represents the number 491.
The root-to-leaf path 4->0 represents the number 40.
Therefore, sum = 495 + 491 + 40 = 1026.

*/

const sumNumbers = (root) => {
  let total = 0;

  const dfs = (root, currentPath) => {
    if (!root) return;
    if (!root.left && !root.right) {
      currentPath += root.val;
      total += parseInt(currentPath);
      return;
    }
    dfs(root.left, currentPath + root.val);
    dfs(root.right, currentPath + root.val);
  };
  dfs(root, '');
  return total;
};

// O(n) time | O(n) space where n is the number of nodes
const sumNumbers2 = (root) => {
  const paths = dfs2(root);
  let total = 0;
  for (let path of paths) {
    total += Number(path.join(''));
  }
  return total;
};

const dfs2 = (root) => {
  // base cases if root is null return empy array
  if (!root) return [];
  // if root is left return 2d array with root val
  if (!root.left && !root.right) return [[root.val]];
  // declare paths variable
  const paths = [];
  // recursively call dfs on left and right subtree
  const leftPaths = dfs2(root.left);
  const rightPaths = dfs2(root.right);
  // add paths to paths array
  for (leftPath of leftPaths) {
    paths.push([root.val, ...leftPath]);
  }

  for (let rightPath of rightPaths) {
    paths.push([root.val, ...rightPath]);
  }

  return paths;
};
