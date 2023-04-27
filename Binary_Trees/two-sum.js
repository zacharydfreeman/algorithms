/* 
Given the root of a binary search tree and an integer k, return true if there exist two elements in the BST such that their sum is equal to k, or false otherwise.

*/

// Approach BST
// O(n) time | O(n) space
const findTarget = (root, k) => {
  // declare sums map
  const sums = {};
  // declare stack
  const stack = [root];
  // dfs
  while (stack.length) {
    const current = stack.pop();
    const complement = k - current.val;
    if (complement in sums) return true;
    sums[current.val] = true;
    if (current.left) stack.push(current.left);
    if (current.right) stack.push(current.right);
  }
  return false;
};

// Approach: Inorder traversal and then two pointers
// O(n) time | O(n) space
const findTarget2 = (root, k) => {
  const vals = [];
  inorder(root, vals);
  let i = 0;
  let j = vals.length - 1;
  while (i < j) {
    const sum = vals[i] + vals[j];
    if (sum === k) return true;
    if (sum > k) {
      j--;
    } else {
      i++;
    }
  }
  return false;
};

const inorder = (root, values) => {
  if (!root) return;
  inorder(root.left, values);
  values.push(root.val);
  inorder(root.right, values);
  return;
};
