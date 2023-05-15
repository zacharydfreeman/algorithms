/*

There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course ai first if you want to take course bi.

For example, the pair [0, 1] indicates that you have to take course 0 before you can take course 1.
Prerequisites can also be indirect. If course a is a prerequisite of course b, and course b is a prerequisite of course c, then course a is a prerequisite of course c.

You are also given an array queries where queries[j] = [uj, vj]. For the jth query, you should answer whether course uj is a prerequisite of course vj or not.

Return a boolean array answer, where answer[j] is the answer to the jth query.

Input: numCourses = 2, prerequisites = [[1,0]], queries = [[0,1],[1,0]]
Output: [false,true]
Explanation: The pair [1, 0] indicates that you have to take course 1 before you can take course 0.
Course 0 is not a prerequisite of course 1, but the opposite is true.

Input: numCourses = 2, prerequisites = [], queries = [[1,0],[0,1]]
Output: [false,false]
Explanation: There are no prerequisites, and each course is independent.

Input: numCourses = 3, prerequisites = [[1,2],[1,0],[2,0]], queries = [[1,0],[1,2]]
Output: [true,true]
*/

// Approach: Smart DFS
// O(p + n + q) time | O(p + n) space where p is number of prerequisites, n is number of course and q is the number queries
const checkIfPrerequisite = (numCourses, prerequisites, queries) => {
  const graph = createGraph(numCourses, prerequisites);
  const reqs = {};
  for (let i = 0; i < numCourses; i++) {
    dfs(graph, i, reqs);
  }
  const output = [];
  for (let [a, b] of queries) {
    if (reqs[a].has(b)) {
      output.push(true);
    } else {
      output.push(false);
    }
  }
  return output;
};

const dfs = (graph, node, reqs) => {
  if (node in reqs) return reqs[node];
  reqs[node] = new Set();

  for (let nei of graph[node]) {
    const prereqs = dfs(graph, nei, reqs);
    for (let prereq of prereqs) {
      reqs[node].add(prereq);
    }
    reqs[node].add(nei);
  }

  return reqs[node];
};

// Approach: Brute-force DFS
// O(q * (p + n)) time | O(n + p) where q is queries length, p  is prereqs length and n is number of courses
const checkIfPrerequisite2 = (numCourses, prerequisites, queries) => {
  const graph = createGraph(numCourses, prerequisites);
  const output = [];
  for (let [a, b] of queries) {
    output.push(dfs2(graph, a, b, new Set()));
  }

  return output;
};

const dfs2 = (graph, src, dst, visited) => {
  if (src === dst) return true;
  if (visited.has(src)) return false;
  visited.add(src);

  for (let nei of graph[src]) {
    if (dfs(graph, nei, dst, visited)) return true;
  }

  return false;
};

const createGraph = (n, prereqs) => {
  const graph = {};
  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }
  for (let [a, b] of prereqs) {
    graph[a].push(b);
  }
  return graph;
};

const numCourses = 3,
  prerequisites = [
    [1, 2],
    [1, 0],
    [2, 0],
  ],
  queries = [
    [1, 0],
    [1, 2],
  ];
console.log(checkIfPrerequisite(numCourses, prerequisites, queries));
