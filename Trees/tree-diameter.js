/* 
The diameter of a tree is the number of edges in the longest path in that tree.

There is an undirected tree of n nodes labeled from 0 to n - 1. You are given a 2D array edges where edges.length == n - 1 and edges[i] = [ai, bi] indicates that there is an undirected edge between nodes ai and bi in the tree.

Return the diameter of the tree.

Input: edges = [[0,1],[0,2]]
Output: 2
Explanation: The longest path of the tree is the path 1 - 0 - 2.

Input: edges = [[0,1],[1,2],[2,3],[1,4],[4,5]]
Output: 4
Explanation: The longest path of the tree is the path 3 - 2 - 1 - 4 - 5.

*/

// Approach: Topological Sort
// O(n) time | O(n) space
const treeDiameter = (edges) => {
  const graph = new Array(edges.length + 1).fill(0).map((_) => []);
  const inDegree = new Array(edges.length + 1).fill(0);
  for (let [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
    inDegree[a]++;
    inDegree[b]++;
  }
  let layers = 0;
  let unvisited = edges.length + 1;
  // fill queue with leaves
  let queue = [];
  for (let i = 0; i < inDegree.length; i++) {
    if (inDegree[i] === 1) queue.push(i);
  }

  while (unvisited > 2) {
    unvisited -= queue.length;
    const nextLevel = [];
    for (let current of queue) {
      for (let child of graph[current]) {
        inDegree[child]--;
        if (inDegree[child] === 1) nextLevel.push(child);
      }
    }
    queue = nextLevel;
    layers++;
  }

  if (unvisited === 1) {
    return layers * 2;
  } else {
    return layers * 2 + 1;
  }
};

// Approach: Two BFS
// O(n) time | O(n) space
const treeDiameter2 = (edges) => {
  if (edges.length === 0) return 0;
  // create graph
  const graph = createGraph(edges);
  // get an extreme node using BFS
  let visited = new Set([0]);
  let queue = [0];
  let lastNode = null;
  while (queue.length) {
    const nextLevel = [];
    for (let curr of queue) {
      for (let nei of graph[curr]) {
        if (!visited.has(nei)) {
          visited.add(nei);
          nextLevel.push(nei);
          lastNode = nei;
        }
      }
    }
    queue = nextLevel;
  }
  // now that we have our last node, BFS from here tracking distance
  queue = [[lastNode, 0]];
  // clear set
  visited.clear();
  visited.add(lastNode);
  let diameter = 0;
  while (queue.length) {
    const nextLevel = [];
    for (let [curr, distance] of queue) {
      diameter = Math.max(diameter, distance);
      for (let nei of graph[curr]) {
        if (!visited.has(nei)) {
          visited.add(nei);
          nextLevel.push([nei, distance + 1]);
        }
      }
    }
    queue = nextLevel;
  }
  return diameter;
};

const createGraph = (edges) => {
  const graph = {};
  for (let [a, b] of edges) {
    if (!(a in graph)) graph[a] = [];
    if (!(b in graph)) graph[b] = [];
    graph[a].push(b);
    graph[b].push(a);
  }
  return graph;
};
