/* 
You are given an integer n, which indicates that there are n courses labeled from 1 to n. You are also given an array relations where relations[i] = [prevCoursei, nextCoursei], representing a prerequisite relationship between course prevCoursei and course nextCoursei: course prevCoursei has to be taken before course nextCoursei.

In one semester, you can take any number of courses as long as you have taken all the prerequisites in the previous semester for the courses you are taking.

Return the minimum number of semesters needed to take all courses. If there is no way to take all the courses, return -1.

Input: n = 3, relations = [[1,3],[2,3]]
Output: 2
Explanation: The figure above represents the given graph.
In the first semester, you can take courses 1 and 2.
In the second semester, you can take course 3.

Input: n = 3, relations = [[1,2],[2,3],[3,1]]
Output: -1
Explanation: No course can be studied because they are prerequisites of each other.

*/

// O(n + e) time | O(n + e) space
const minimumSemesters = (n, relations) => {
  // build graph
  const graph = createGraph(n, relations);
  // inbound
  const inboundEdges = new Array(n + 1).fill(0);
  for (let [preReq, course] of relations) {
    inboundEdges[course]++;
  }
  // initialize queue with no preq courses
  let queue = [];
  for (let course = 1; course <= n; course++) {
    if (inboundEdges[course] === 0) queue.push(course);
  }
  let numSemesters = 0;
  const visited = new Set();
  while (queue.length) {
    const nextLevel = [];
    for (let i = 0; i < queue.length; i++) {
      const current = queue[i];
      visited.add(current);
      for (let nei of graph[current]) {
        inboundEdges[nei]--;
        if (inboundEdges[nei] === 0) nextLevel.push(nei);
      }
    }
    queue = nextLevel;
    numSemesters++;
  }
  return visited.size === n ? numSemesters : -1;
};

const createGraph = (n, relations) => {
  const graph = {};
  for (let i = 1; i <= n; i++) {
    graph[i] = [];
  }
  for (let [preReq, course] of relations) {
    graph[preReq].push(course);
  }
  return graph;
};
