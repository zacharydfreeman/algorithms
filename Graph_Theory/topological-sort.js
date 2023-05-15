/**
 * There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.

Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: [0,2,1,3]
Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.
So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].
 */

// O(v + e) time | O(v + e) space
const topologicalSort = (n, prereqs) => {
  // create graph
  const graph = createGraph(n, prereqs);

  const numPrereqs = new Array(n).fill(0);
  for (let [a, b] of prereqs) {
    numPrereqs[a]++;
  }

  const stack = [];
  for (let i = 0; i < numPrereqs.length; i++) {
    if (numPrereqs[i] === 0) stack.push(i);
  }

  const order = [];
  while (stack.length) {
    const current = stack.pop();
    order.push(current);
    for (let child of graph[current]) {
      numPrereqs[child]--;
      if (numPrereqs[child] === 0) stack.push(child);
    }
  }
  return order.length === n ? order : [];
};

const createGraph = (n, prereqs) => {
  const graph = {};
  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }
  for (let [a, b] of prereqs) {
    graph[b].push(a);
  }
  return graph;
};

// Approach: Post Order DFS
// O(v + e) time | O(v + e) space
const topologicalSort2 = (n, prereqs) => {
  // create graph
  const graph = createGraph(n, prereqs);
  const visited = new Array(n).fill(0); // 0 - unvisited, 1 - visiting, 2 - visited
  const order = [];
  for (let course in graph) {
    if (!dfs(graph, Number(course), visited, order)) return [];
  }
  return order.reverse();
};

const dfs = (graph, course, visited, order) => {
  if (visited[course] === 1) return false;
  if (visited[course] === 2) return true;
  visited[course] = 1;

  for (let nei of graph[course]) {
    if (!dfs(graph, nei, visited, order)) return false;
  }
  visited[course] = 2;
  order.push(course);
  return true;
};
