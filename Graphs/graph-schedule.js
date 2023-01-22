/*
There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1.
You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must
take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return true if you can finish all courses. Otherwise, return false.

*/
// O(n + p) time | O(n) where n is number of course and p is length of prereqs
const canFinish = (numCourses, preReqs) => {
    // create graph {course: [prereqs]}
    const graph = createGraph(numCourses, preReqs);
    // create visited set
    const visited = new Set();
    // do dfs of each course and see if there is a cycle
    for (let i = 0; i < numCourses; i++) {
        if (detectCycle(graph, i, visited, new Set())) return false;
    }

    return true;
}

const detectCycle = (graph, start, visited, visiting) =>  {
    // base case if it is visited means you already visited it completely from another search, return false
    if (visited.has(start)) return false;
    // base case if it is visiting that mean there is a cycle
    if (visiting.has(start)) return true;
    // add to visiting
    visiting.add(start);

    for (let course of graph[start]) {
        if (detectCycle(graph, course, visited, visiting)) return true;
    }
    // add to visited
    visited.add(start);

    return false;
}

const createGraph = (numCourse, preReqs) => {
    const graph = {};
    for (let i = 0; i < numCourse; i++) {
        graph[i] = [];
    }
    for (let preReq of preReqs) {
        const [a, b] = preReq;
        graph[a].push(b);
    }
    return graph;
}
