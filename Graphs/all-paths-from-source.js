/* 
Given the edges of a directed graph where edges[i] = [ai, bi] indicates there is an edge between nodes ai and bi, and two nodes source and destination of this graph, determine whether or not all paths starting from source eventually, end at destination, that is:

At least one path exists from the source node to the destination node
If a path exists from the source node to a node with no outgoing edges, then that node is equal to destination.
The number of possible paths from source to destination is a finite number.
Return true if and only if all roads from source lead to destination.

Input: n = 3, edges = [[0,1],[0,2]], source = 0, destination = 2
Output: false
Explanation: It is possible to reach and get stuck on both node 1 and node 2.

Input: n = 4, edges = [[0,1],[0,3],[1,2],[2,1]], source = 0, destination = 3
Output: false
Explanation: We have two possibilities: to end at node 3, or to loop over node 1 and node 2 indefinitely.

Input: n = 4, edges = [[0,1],[0,2],[1,3],[2,3]], source = 0, destination = 3
Output: true

*/

// O(v + e) time | O(v) space
const leadsToDestination = (n, edges, source, destination) => {
  const graph = createGraph(n, edges);
  const visited = new Array(n).fill(0);
  return dfs(graph, source, destination, visited);
};

const dfs = (graph, source, destination, visited) => {
  if (graph[source].length === 0) return source === destination;
  if (visited[source] === 1) return false;
  visited[source] = 1;
  for (let nei of graph[source]) {
    if (visited[nei] !== 2) {
      if (!dfs(graph, nei, destination, visited)) return false;
    }
  }
  visited[source] = 2;
  return true;
};

const createGraph = (n, edges) => {
  const graph = {};
  for (let i = 0; i < n; i++) [(graph[i] = [])];
  for (let [a, b] of edges) {
    graph[a].push(b);
  }
  return graph;
};
