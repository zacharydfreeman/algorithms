/* 
Given two binary search trees root1 and root2, return a list containing all the integers from both trees sorted in ascending order.

Input: root1 = [2,1,4], root2 = [1,0,3]
Output: [0,1,1,2,3,4]

Input: root1 = [1,null,8], root2 = [8,1]
Output: [1,1,8,8]
*/

// Approach: Post order, merge sort
// O(n + m) time | O(n + m) space
const getAllElements = (root1, root2) => {
  const values1 = [];
  const values2 = [];
  inOrder(root1, values1);
  inOrder(root2, values2);

  const sortedOrder = new Array(values1.length + values2.length);

  let l = 0;
  let r = 0;
  let idx = 0;
  while (l < values1.length || r < values2.length) {
    const val1 = l < values1.length ? values1[l] : Infinity;
    const val2 = r < values2.length ? values2[r] : Infinity;

    if (val1 < val2) {
      sortedOrder[idx++] = val1;
      l++;
    } else {
      sortedOrder[idx++] = val2;
      r++;
    }
  }

  return sortedOrder;
};

const inOrder = (root, values) => {
  if (!root) return;
  inOrder(root.left, values);
  values.push(root.val);
  inOrder(root.right, values);
};
