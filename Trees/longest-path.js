/* 
You are given a tree (i.e. a connected, undirected graph that has no cycles) rooted at node 0 consisting of n nodes numbered from 0 to n - 1. The tree is represented by a 0-indexed array parent of size n, where parent[i] is the parent of node i. Since node 0 is the root, parent[0] == -1.

You are also given a string s of length n, where s[i] is the character assigned to node i.

Return the length of the longest path in the tree such that no pair of adjacent nodes on the path have the same character assigned to them.

Input: parent = [-1,0,0,1,1,2], s = "abacbe"
Output: 3
Explanation: The longest path where each two adjacent nodes have different characters in the tree is the path: 0 -> 1 -> 3. The length of this path is 3, so 3 is returned.
It can be proven that there is no longer path that satisfies the conditions. 

Input: parent = [-1,0,0,0], s = "aabc"
Output: 3
Explanation: The longest path where each two adjacent nodes have different characters is the path: 2 -> 0 -> 3. The length of this path is 3, so 3 is returned.

*/

// O(n) time | O(h) space
const longestPath = (parent, s) => {
  // create adjancency list
  const graph = new Array(parent.length).fill().map(() => []);
  let root = null;
  for (let i = 0; i < parent.length; i++) {
    const par = parent[i];
    if (par === -1) {
      root = i;
      continue;
    }
    graph[par].push(i);
  }
  return dfs(graph, root, s)[1];
};

const dfs = (graph, root, s) => {
  // base case if no children return [1, 1] // [height, maxPath]
  if (graph[root].length === 0) return [1, 1];
  // variables will track the max height from all children and max path
  let height1 = 0;
  let height2 = 0;
  let maxPath = 0;
  for (let child of graph[root]) {
    const [childHeight, childPath] = dfs(graph, child, s);
    maxPath = Math.max(maxPath, childPath);
    // if chars are different, max logic
    if (s[root] !== s[child]) {
      const newHeight = childHeight;
      if (newHeight > height1) {
        height2 = height1;
        height1 = newHeight;
      } else if (newHeight > height2) {
        height2 = newHeight;
      }
    }
  }
  // max path will be max of current max path and the two heights + 1
  maxPath = Math.max(maxPath, height1 + height2 + 1);
  return [height1 + 1, maxPath];
};
