/*
There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.

Input: numCourses = 2, prerequisites = [[1,0]]
Output: [0,1]
Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].

Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: [0,2,1,3]
Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.
So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].

Input: numCourses = 1, prerequisites = []
Output: [0]*/

// O(n + p) time | O(n) space where is the number of courses and p is the number of prereqs
const findOrder = (numCourses, prerequisites) => {
  // create graph
  const graph = createGraph(numCourses, prerequisites);
  // declare parents object that we will use to track which nodes have no inbound edges
  const parents = {};
  for (let node in graph) {
    parents[node] = 0;
  }
  for (let node in graph) {
    for (let child of graph[node]) {
      parents[child]++;
    }
  }
  const stack = [];
  for (let node in parents) {
    if (!parents[node]) stack.push(Number(node));
  }

  const order = [];
  while (stack.length) {
    const current = stack.pop();
    order.push(current);
    // check each child and decrement parent count
    for (let child of graph[current]) {
      parents[child]--;
      // if parent count is zero add to stack
      if (parents[child] === 0) {
        stack.push(child);
      }
    }
  }
  return order.length === numCourses ? order : [];
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
