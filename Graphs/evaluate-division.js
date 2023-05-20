/* 
You are given an array of variable pairs equations and an array of real numbers values, where equations[i] = [Ai, Bi] and values[i] represent the equation Ai / Bi = values[i]. Each Ai or Bi is a string that represents a single variable.

You are also given some queries, where queries[j] = [Cj, Dj] represents the jth query where you must find the answer for Cj / Dj = ?.

Return the answers to all queries. If a single answer cannot be determined, return -1.0.

Note: The input is always valid. You may assume that evaluating the queries will not result in division by zero and that there is no contradiction.

Input: equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
Output: [6.00000,0.50000,-1.00000,1.00000,-1.00000]
Explanation: 
Given: a / b = 2.0, b / c = 3.0
queries are: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
return: [6.0, 0.5, -1.0, 1.0, -1.0 ]

Input: equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
Output: [3.75000,0.40000,5.00000,0.20000]

Input: equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
Output: [0.50000,2.00000,-1.00000,-1.00000]

*/

// O(m * n) time | O(n) space where n is the number of equations and m is the number of queries
const calcEquation = (equations, values, queries) => {
  const graph = createGraph(equations, values);
  const output = [];

  for (let [start, dest] of queries) {
    output.push(dfs(graph, start, dest));
  }
  return output;
};

const dfs = (graph, start, dest, par = -1, ans = 1, visited = new Set()) => {
  if (visited.has(start)) return -1;
  visited.add(start);
  if (!(start in graph)) return -1;
  if (start === dest) return ans;
  for (let [nei, weight] of graph[start]) {
    if (nei === par) continue;
    const res = dfs(graph, nei, dest, start, ans * weight, visited);
    if (res > 0) return res;
  }
  return -1;
};

const createGraph = (equations, values) => {
  const graph = {};
  for (let i = 0; i < equations.length; i++) {
    const [a, b] = equations[i];
    const num = values[i];
    if (!(a in graph)) graph[a] = [];
    if (!(b in graph)) graph[b] = [];
    graph[a].push([b, num]);
    graph[b].push([a, 1 / num]);
  }
  return graph;
};
