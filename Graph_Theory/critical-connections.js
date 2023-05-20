/*
There are n servers numbered from 0 to n - 1 connected by undirected server-to-server connections forming a network where connections[i] = [ai, bi] represents a connection between servers ai and bi. Any server can reach other servers directly or indirectly through the network.

A critical connection is a connection that, if removed, will make some servers unable to reach some other server.

Return all critical connections in the network in any order.

Input: n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]
Output: [[1,3]]
Explanation: [[3,1]] is also accepted.

Input: n = 2, connections = [[0,1]]
Output: [[0,1]]
 */

// O(v + e) time | O(v) space
const criticalConnections = (n, connections) => {
  const graph = buildGraph(n, connections);
  let id = 0;
  const ids = new Array(n).fill(0);
  const low = new Array(n).fill(0);
  const visited = new Array(n).fill(false);
  const bridges = [];
  const dfs = (current, parent) => {
    visited[current] = true;
    id++;
    ids[current] = id;
    low[current] = id;
    for (let nei of graph[current]) {
      if (nei === parent) continue;
      if (!visited[nei]) {
        dfs(nei, current);
        low[current] = Math.min(low[current], low[nei]);
        if (ids[current] < low[nei]) {
          bridges.push([current, nei]);
        }
      } else {
        low[current] = Math.min(low[current], ids[nei]);
      }
    }
  };
  for (let node in graph) {
    if (!visited[node]) {
      dfs(Number(node), -1);
    }
  }
  return bridges;
};

const buildGraph = (n, connections) => {
  const graph = {};
  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }
  for (let [a, b] of connections) {
    graph[a].push(b);
    graph[b].push(a);
  }
  return graph;
};
