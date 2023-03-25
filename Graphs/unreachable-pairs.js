/* 
You are given an integer n. There is an undirected graph with n nodes, numbered from 0 to n - 1. You are given a 2D integer array edges where edges[i] = [ai, bi] denotes that there exists an undirected edge connecting nodes ai and bi.

Return the number of pairs of different nodes that are unreachable from each other.

Input: n = 3, edges = [[0,1],[0,2],[1,2]]
Output: 0
Explanation: There are no pairs of nodes that are unreachable from each other. Therefore, we return 0.

Input: n = 7, edges = [[0,2],[0,5],[2,4],[1,6],[5,4]]
Output: 14
Explanation: There are 14 pairs of nodes that are unreachable from each other:
[[0,1],[0,3],[0,6],[1,2],[1,3],[1,4],[1,5],[2,3],[2,6],[3,4],[3,5],[3,6],[4,6],[5,6]].
Therefore, we return 14
*/

// O(n) time | O(n) space
const countPairs = (n, edges) => {
  // create graph
  const graph = createGraph(n, edges);
  // declare sizes array and visited set
  const sizes = [];
  const visited = new Set();
  // loop through graph and get the size of each connected component
  for (let node in graph) {
    const size = dfs(node, graph, visited);
    if (size > 0) sizes.push(size);
  }
  // declare pairs and sum variables
  let pairs = 0;
  let sum = sizes[0];
  for (let i = 1; i < sizes.length; i++) {
    // add current sum * current size
    pairs += sum * sizes[i];
    // add the current size to current sum
    sum += sizes[i];
  }
  return pairs;
};

const dfs = (current, graph, visited) => {
  if (visited.has(String(current))) return 0;
  visited.add(String(current));
  // declare size variable and set equal to 1
  let size = 1;
  // explore neighbors and add to size
  for (let neighbor of graph[current]) {
    size += dfs(neighbor, graph, visited);
  }

  return size;
};

const createGraph = (n, edges) => {
  const graph = {};
  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }
  for (let edge of edges) {
    const [a, b] = edge;
    graph[a].push(b);
    graph[b].push(a);
  }
  return graph;
};
