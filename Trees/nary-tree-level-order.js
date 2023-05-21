/* 
Given an n-ary tree, return the level order traversal of its nodes' values.

Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value (See examples).

Input: root = [1,null,3,2,4,null,5,6]
Output: [[1],[3,2,4],[5,6]]

Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: [[1],[2,3,4,5],[6,7,8,9,10],[11,12,13],[14]]

*/

const levelOrder = (root) => {
  if (!root) return [];
  const output = [[root.val]];
  let queue = [root];
  while (queue.length) {
    let nextValues = [];
    let nextLevel = [];
    for (let i = 0; i < queue.length; i++) {
      const current = queue[i];
      for (let child of current.children) {
        nextLevel.push(child);
        nextValues.push(child.val);
      }
    }
    if (nextValues.length !== 0) output.push(nextValues);
    queue = nextLevel;
  }
  return output;
};

