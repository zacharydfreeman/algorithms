/* 
There are n computers numbered from 0 to n - 1 connected by ethernet cables connections forming a network where connections[i] = [ai, bi] represents a connection between computers ai and bi. Any computer can reach any other computer directly or indirectly through the network.

You are given an initial computer network connections. You can extract certain cables between two directly connected computers, and place them between any pair of disconnected computers to make them directly connected.

Return the minimum number of times you need to do this in order to make all the computers connected. If it is not possible, return -1.

Input: n = 4, connections = [[0,1],[0,2],[1,2]]
Output: 1
Explanation: Remove cable between computer 1 and 2 and place between computers 1 and 3.

Input: n = 6, connections = [[0,1],[0,2],[0,3],[1,2],[1,3]]
Output: 2

Input: n = 6, connections = [[0,1],[0,2],[0,3],[1,2]]
Output: -1
Explanation: There are not enough cables.
*/

const makeConnected = (n, connections) => {
  // convert to graph
  const graph = createGraph(n, connections);
  // determine how many disconnected components there are
  let disconnectedComponents = 0;

  for (let cable in graph) {
    if (graph[cable].length === 0) disconnectedComponents++;
  }

  // determine how many extra edges there are
  const visited = new Set();
  let extraEdges = 0;
  for (let i = 0; i < n; i++) {
    extraEdges += dfs(i, null, graph, visited);
  }
  console.log(extraEdges);

  return extraEdges > disconnectedComponents ? disconnectedComponents : -1;
};

const dfs = (current, parent, graph, visited) => {
  if (visited.has(current)) return 0;
  visited.add(current);

  for (let neighbor of graph[current]) {
    if (neighbor === parent) continue;
    if (visited.has(neighbor)) return 1;
    dfs(neighbor, current, graph, visited);
  }

  return 0;
};

const createGraph = (n, connections) => {
  const graph = {};
  for (i = 0; i < n; i++) {
    graph[i] = [];
  }
  for (let [a, b] of connections) {
    graph[a].push(b);
    graph[b].push(a);
  }
  return graph;
};

const n = 6,
  connections = [
    [0, 1],
    [0, 2],
    [1, 2],
  ];
console.log(makeConnected(n, connections));
