/*
You are given an integer array nums with no duplicates. A maximum binary tree can be built recursively from nums using the following algorithm:

Create a root node whose value is the maximum value in nums.
Recursively build the left subtree on the subarray prefix to the left of the maximum value.
Recursively build the right subtree on the subarray suffix to the right of the maximum value.
Return the maximum binary tree built from nums.

Input: nums = [3,2,1,6,0,5]
Output: [6,3,5,null,2,0,null,null,1]
Explanation: The recursive calls are as follow:
- The largest value in [3,2,1,6,0,5] is 6. Left prefix is [3,2,1] and right suffix is [0,5].
    - The largest value in [3,2,1] is 3. Left prefix is [] and right suffix is [2,1].
        - Empty array, so no child.
        - The largest value in [2,1] is 2. Left prefix is [] and right suffix is [1].
            - Empty array, so no child.
            - Only one element, so child is a node with value 1.
    - The largest value in [0,5] is 5. Left prefix is [0] and right suffix is [].
        - Only one element, so child is a node with value 0.
        - Empty array, so no child.

*/

// O(n^2) time | O(n) space
const constructMaximumBinaryTree = (nums, l = 0, r = nums.length - 1) => {
  if (l > r) return null;
  const [max, idx] = getMax(nums, l, r);
  const root = new TreeNode(max);
  root.left = constructMaximumBinaryTree(nums, l, idx - 1);
  root.right = constructMaximumBinaryTree(nums, idx + 1, r);
  return root;
};

const getMax = (nums, l, r) => {
  let max = -Infinity;
  let idx = -1;
  for (let i = l; i <= r; i++) {
    if (nums[i] > max) {
      max = nums[i];
      idx = i;
    }
  }
  return [max, idx];
};

// O(n^3) time | O(n) space
const constructMaximumBinaryTree2 = (nums) => {
  if (nums.length === 0) return null;
  const max = Math.max(...nums);
  const idx = nums.indexOf(max);
  const root = new TreeNode(max);
  root.left = constructMaximumBinaryTree(nums.slice(0, idx));
  root.right = constructMaximumBinaryTree(nums.slice(idx + 1));
  return root;
};
