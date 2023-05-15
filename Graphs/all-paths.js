/* 
Given a directed acyclic graph (DAG) of n nodes labeled from 0 to n - 1, find all possible paths from node 0 to node n - 1 and return them in any order.

The graph is given as follows: graph[i] is a list of all nodes you can visit from node i (i.e., there is a directed edge from node i to node graph[i][j]).

Input: graph = [[1,2],[3],[3],[]]
Output: [[0,1,3],[0,2,3]]
Explanation: There are two paths: 0 -> 1 -> 3 and 0 -> 2 -> 3.

Input: graph = [[4,3,1],[3,2,4],[3],[4],[]]
Output: [[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]


*/

// Approach: Backtracking
// O(2^n * n) time | O(2^n * n) space
const allPathsSourceTarget = (graph) => {
  const paths = [];
  const dfs = (graph, src, dst, path) => {
    if (src === dst) {
      paths.push([...path, src]);
      return;
    }
    path.push(src);
    for (let nei of graph[src]) {
      dfs(graph, nei, dst, path);
    }
    path.pop();
    return;
  };
  dfs(graph, 0, graph.length - 1, []);
  return paths;
};
