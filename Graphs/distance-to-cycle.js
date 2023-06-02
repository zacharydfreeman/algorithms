/* 
You are given a positive integer n representing the number of nodes in a connected undirected graph containing exactly one cycle. The nodes are numbered from 0 to n - 1 (inclusive).

You are also given a 2D integer array edges, where edges[i] = [node1i, node2i] denotes that there is a bidirectional edge connecting node1i and node2i in the graph.

The distance between two nodes a and b is defined to be the minimum number of edges that are needed to go from a to b.

Return an integer array answer of size n, where answer[i] is the minimum distance between the ith node and any node in the cycle.


Input: n = 7, edges = [[1,2],[2,4],[4,3],[3,1],[0,1],[5,2],[6,5]]
Output: [1,0,0,0,0,1,2]
Explanation:
The nodes 1, 2, 3, and 4 form the cycle.
The distance from 0 to 1 is 1.
The distance from 1 to 1 is 0.
The distance from 2 to 2 is 0.
The distance from 3 to 3 is 0.
The distance from 4 to 4 is 0.
The distance from 5 to 2 is 1.
The distance from 6 to 2 is 2.

Input: n = 9, edges = [[0,1],[1,2],[0,2],[2,6],[6,7],[6,8],[0,3],[3,4],[3,5]]
Output: [0,0,0,1,2,2,1,2,2]
Explanation:
The nodes 0, 1, and 2 form the cycle.
The distance from 0 to 0 is 0.
The distance from 1 to 1 is 0.
The distance from 2 to 2 is 0.
The distance from 3 to 1 is 1.
The distance from 4 to 1 is 2.
The distance from 5 to 1 is 2.
The distance from 6 to 2 is 1.
The distance from 7 to 2 is 2.
The distance from 8 to 2 is 2.
*/

// Approach: Topological Sort to find nodes in cycle and then BFS
// O(v + e) time | O(v) space
const distanceToCycle = (n, edges) => {
  // create graph
  const graph = createGraph(n, edges);
  // find the nodes in the cycle (peel the onion / topological sort)
  const inDegree = new Array(n).fill(0);
  for (let [n1, n2] of edges) {
    inDegree[n1]++;
    inDegree[n2]++;
  }
  // populate queue with nodes of indegree of 1
  let queue = [];
  for (let i = 0; i < inDegree.length; i++) {
    if (inDegree[i] === 1) queue.push(i);
  }
  // kahns algorithm
  while (queue.length) {
    const current = queue.shift();
    for (let nei of graph[current]) {
      inDegree[nei]--;
      if (inDegree[nei] === 1) queue.push(nei);
    }
  }
  // declare visited set and initialize queue with nodes in cycle
  const visited = new Set();
  for (let i = 0; i < inDegree.length; i++) {
    if (inDegree[i] > 1) {
      queue.push([i, 0]);
      visited.add(i);
    }
  }
  const distances = new Array(n);

  while (queue.length) {
    const [current, distance] = queue.shift();
    distances[current] = distance;

    for (let nei of graph[current]) {
      if (!visited.has(nei)) {
        visited.add(nei);
        queue.push([nei, distance + 1]);
      }
    }
  }
  return distances;
};

const createGraph = (n, edges) => {
  const graph = {};
  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }
  for (let [n1, n2] of edges) {
    graph[n1].push(n2);
    graph[n2].push(n1);
  }
  return graph;
};
