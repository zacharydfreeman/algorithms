/* 
You are given a positive integer n representing the number of nodes in a tree, numbered from 0 to n - 1 (inclusive). You are also given a 2D integer array edges of length n - 1, where edges[i] = [node1i, node2i] denotes that there is a bidirectional edge connecting node1i and node2i in the tree.

You are given a 0-indexed integer array query of length m where query[i] = [starti, endi, nodei] means that for the ith query, you are tasked with finding the node on the path from starti to endi that is closest to nodei.

Return an integer array answer of length m, where answer[i] is the answer to the ith query.

Input: n = 7, edges = [[0,1],[0,2],[0,3],[1,4],[2,5],[2,6]], query = [[5,3,4],[5,3,6]]
Output: [0,2]
Explanation:
The path from node 5 to node 3 consists of the nodes 5, 2, 0, and 3.
The distance between node 4 and node 0 is 2.
Node 0 is the node on the path closest to node 4, so the answer to the first query is 0.
The distance between node 6 and node 2 is 1.
Node 2 is the node on the path closest to node 6, so the answer to the second query is 2.

Input: n = 3, edges = [[0,1],[1,2]], query = [[0,1,2]]
Output: [1]
Explanation:
The path from node 0 to node 1 consists of the nodes 0, 1.
The distance between node 2 and node 1 is 1.
Node 1 is the node on the path closest to node 2, so the answer to the first query is 1.

Input: n = 3, edges = [[0,1],[1,2]], query = [[0,0,0]]
Output: [0]
Explanation:
The path from node 0 to node 0 consists of the node 0.
Since 0 is the only node on the path, the answer to the first query is 0.

*/
// O(q * (v + e)) time | O(v + e) space
const closestNode = (n, edges, query) => {
  // create graph
  const graph = createGraph(n, edges);
  const output = [];
  // loop through queries
  for (let [start, end, target] of query) {
    // path
    const path = bfs(graph, start, end);
    // bfs with target and path
    const closest = bfs2(graph, target, path);
    output.push(closest);
  }
  return output;
};

const bfs = (graph, start, end) => {
  let queue = [[start, new Set([start])]];
  const visited = new Set([start]);
  while (queue.length) {
    const nextLevel = [];
    for (let [current, path] of queue) {
      if (current === end) return path;
      for (let nei of graph[current]) {
        if (visited.has(nei)) continue;
        visited.add(nei);
        nextLevel.push([nei, new Set([...path, nei])]);
      }
    }
    queue = nextLevel;
  }
};

const bfs2 = (graph, target, path) => {
  let queue = [];
  const visited = new Set();
  for (let node of path) {
    queue.push([node, node]);
    visited.add(node);
  }
  while (queue.length) {
    const nextLevel = [];
    for (let [current, from] of queue) {
      if (current === target) return from;
      for (let nei of graph[current]) {
        if (visited.has(nei)) continue;
        visited.add(nei);
        nextLevel.push([nei, from]);
      }
    }
    queue = nextLevel;
  }
};

const createGraph = (n, edges) => {
  const graph = {};
  for (const [from, to] of edges) {
    if (!graph[from]) {
      graph[from] = [];
    }
    if (!graph[to]) {
      graph[to] = [];
    }
    graph[from].push(to);
    graph[to].push(from);
  }
  return graph;
};
