/* 
You are given the root of a binary tree and a positive integer k.

The level sum in the tree is the sum of the values of the nodes that are on the same level.

Return the kth largest level sum in the tree (not necessarily distinct). If there are fewer than k levels in the tree, return -1.

Note that two nodes are on the same level if they have the same distance from the root.

Input: root = [5,8,9,2,1,3,7,4,6], k = 2
Output: 13
Explanation: The level sums are the following:
- Level 1: 5.
- Level 2: 8 + 9 = 17.
- Level 3: 2 + 1 + 3 + 7 = 13.
- Level 4: 4 + 6 = 10.
The 2nd largest level sum is 13.

Input: root = [1,2,null,3], k = 1
Output: 3
Explanation: The largest level sum is 3.

*/

// O(n + wlog(w)) time | O(w) space where n is the number of node and w is the width of the tree
const kthLargestLevelSum = (root, k) => {
  const levelSums = [];
  let queue = [root];
  while (queue.length) {
    const nextLevel = [];
    let currentSum = 0;
    for (let current of queue) {
      currentSum += current.val;
      if (current.left) nextLevel.push(current.left);
      if (current.right) nextLevel.push(current.right);
    }
    queue = nextLevel;
    levelSums.push(currentSum);
  }
  // sort levelSums
  return levelSums.sort((a, b) => b - a)[k - 1] ?? -1;
};
