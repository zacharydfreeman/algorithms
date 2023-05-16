/* 
There is an undirected connected tree with n nodes labeled from 0 to n - 1 and n - 1 edges.

You are given the integer n and the array edges where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the tree.

Return an array answer of length n where answer[i] is the sum of the distances between the ith node in the tree and all other nodes.

Input: n = 6, edges = [[0,1],[0,2],[2,3],[2,4],[2,5]]
Output: [8,12,6,10,10,10]
Explanation: The tree is shown above.
We can see that dist(0,1) + dist(0,2) + dist(0,3) + dist(0,4) + dist(0,5)
equals 1 + 1 + 2 + 2 + 2 = 8.
Hence, answer[0] = 8, and so on.

Input: n = 1, edges = []
Output: [0]

Input: n = 2, edges = [[1,0]]
Output: [1,1]

*/

// O(n) time | O(n) space
const sumOfDistancesInTree = (n, edges) => {
  // create graph
  const graph = createGraph(n, edges);
  // declare counts array initialized with 1
  const counts = new Array(n).fill(1);
  // declare output
  const output = new Array(n).fill(0);
  let rootDistances = 0;

  const dfs1 = (curr, par, depth) => {
    // add current depth to root
    rootDistances += depth;
    let count = 1;
    for (let nei of graph[curr]) {
      if (nei !== par) {
        count += dfs1(nei, curr, depth + 1);
      }
    }
    counts[curr] = count;
    return count;
  };
  const dfs2 = (curr, par, curr_ans) => {
    output[curr] = curr_ans;
    for (let nei of graph[curr]) {
      if (nei !== par) {
        dfs2(nei, curr, curr_ans + n - counts[nei] - counts[nei]);
      }
    }
  };
  dfs1(0, -1, 0);
  dfs2(0, -1, rootDistances);
  return output;
};

const createGraph = (n, edges) => {
  const graph = {};
  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }
  for (let [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }
  return graph;
};
