/*
There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return true if you can finish all courses. Otherwise, return false.

Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0. So it is possible.

Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.

*/

// O(n + p) time | O(n + p) space where n is the number of course and p is the number of prerequisites
const canFinish = (numCourses, prerequisites) => {
  // create graph
  const graph = createGraph(numCourses, prerequisites);
  const visited = new Set();
  for (let i = 0; i < numCourses; i++) {
    if (!dfs(graph, i, visited)) return false;
  }
  return true;
};

const dfs = (graph, course, visited) => {
  if (visited.has(course)) return false;
  visited.add(course);
  for (let prereq of graph[course]) {
    if (!dfs(graph, prereq, visited)) return false;
  }
  visited.delete(course);
  graph[course] = [];
  return true;
};

const createGraph = (numCourses, prereqs) => {
  const graph = {};
  for (let i = 0; i < numCourses; i++) {
    graph[i] = [];
  }
  for (let [course, prereq] of prereqs) {
    graph[course].push(prereq);
  }
  return graph;
};
