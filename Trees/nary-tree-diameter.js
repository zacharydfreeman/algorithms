/* 
Given a root of an N-ary tree, you need to compute the length of the diameter of the tree.

The diameter of an N-ary tree is the length of the longest path between any two nodes in the tree. This path may or may not pass through the root.

(Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value.)

Input: root = [1,null,3,2,4,null,5,6]
Output: 3
Explanation: Diameter is shown in red color.

Input: root = [1,null,2,null,3,4,null,5,null,6]
Output: 4

*/

// O(n) time | O(h) space
const diameter = (root) => {
  return dfs(root)[1];
};

const dfs = (root) => {
  if (root.children.length === 0) return [0, 0]; // [height, maxDiameter]
  // need to find the two max heights and maxDiameter from children
  let maxHeight1 = 0;
  let maxHeight2 = 0;
  let maxDiameter = 0;
  for (let child of root.children) {
    const [height, diameter] = dfs(child);
    maxDiameter = Math.max(maxDiameter, diameter);
    const parentHeight = height + 1;
    if (parentHeight > maxHeight1) {
      maxHeight2 = maxHeight1;
      maxHeight1 = parentHeight;
    } else if (parentHeight > maxHeight2) {
      maxHeight2 = parentHeight;
    }
  }
  // potential new diameter is maxHeights added together
  const diameter = maxHeight1 + maxHeight2;
  return [maxHeight1, Math.max(diameter, maxDiameter)];
};
