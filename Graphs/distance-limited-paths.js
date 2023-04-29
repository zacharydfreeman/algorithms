/**
 * An undirected graph of n nodes is defined by edgeList, where edgeList[i] = [ui, vi, disi] denotes an edge between nodes ui and vi with distance disi. Note that there may be multiple edges between two nodes.

Given an array queries, where queries[j] = [pj, qj, limitj], your task is to determine for each queries[j] whether there is a path between pj and qj such that each edge on the path has a distance strictly less than limitj .

Return a boolean array answer, where answer.length == queries.length and the jth value of answer is true if there is a path for queries[j] is true, and false otherwise.

Input: n = 3, edgeList = [[0,1,2],[1,2,4],[2,0,8],[1,0,16]], queries = [[0,1,2],[0,2,5]]
Output: [false,true]
Explanation: The above figure shows the given graph. Note that there are two overlapping edges between 0 and 1 with distances 2 and 16.
For the first query, between 0 and 1 there is no path where each distance is less than 2, thus we return false for this query.
For the second query, there is a path (0 -> 1 -> 2) of two edges with distances less than 5, thus we return true for this query.

Input: n = 5, edgeList = [[0,1,10],[1,2,5],[2,3,9],[3,4,13]], queries = [[0,4,14],[1,4,13]]
Output: [true,false]
Exaplanation: The above figure shows the given graph.
 */

// Approach: Create connected components using only edges with weights less than the limit specified in the query. If both the starting and end nodes are in the same component, it means there is a path between them that uses only edges with weights less than the limit.
// Can use a Union Find data structure
class UnionFind {
  constructor(size) {
    this.group = [];
    this.rank = [];
    for (let i = 0; i < size; ++i) {
      this.group[i] = i;
    }
  }

  find(node) {
    if (this.group[node] !== node) {
      this.group[node] = this.find(this.group[node]);
    }
    return this.group[node];
  }

  join(node1, node2) {
    let group1 = this.find(node1);
    let group2 = this.find(node2);

    // node1 and node2 already belong to same group.
    if (group1 === group2) {
      return;
    }

    if (this.rank[group1] > this.rank[group2]) {
      this.group[group2] = group1;
    } else if (this.rank[group1] < this.rank[group2]) {
      this.group[group1] = group2;
    } else {
      this.group[group1] = group2;
      this.rank[group2] += 1;
    }
  }

  areConnected(node1, node2) {
    let group1 = this.find(node1);
    let group2 = this.find(node2);
    return group1 === group2;
  }
}

const distanceLimitedPathsExist = (n, edgeList, queries) => {
  let uf = new UnionFind(n);
  let queriesCount = queries.length;
  let answer = new Array(queriesCount);

  // Store original indices with all queries.
  let queriesWithIndex = [];
  for (let i = 0; i < queriesCount; ++i) {
    queriesWithIndex[i] = queries[i];
    queriesWithIndex[i].push(i);
  }

  // Sort all edges in increasing order of their edge weights.
  edgeList.sort((a, b) => a[2] - b[2]);
  // Sort all queries in increasing order of the limit of edge allowed.
  queriesWithIndex.sort((a, b) => a[2] - b[2]);

  let edgesIndex = 0;

  // Iterate on each query one by one.
  queriesWithIndex.forEach(([p, q, limit, queryOriginalIndex]) => {
    // We can attach all edges which satisfy the limit given by the query.
    while (edgesIndex < edgeList.length && edgeList[edgesIndex][2] < limit) {
      let node1 = edgeList[edgesIndex][0];
      let node2 = edgeList[edgesIndex][1];
      uf.join(node1, node2);
      edgesIndex += 1;
    }

    // If both nodes belong to the same component, it means we can reach them.
    answer[queryOriginalIndex] = uf.areConnected(p, q);
  });

  return answer;
};

// Approach: Brute force DFS
// O(n * m) time | O(n) space
const distanceLimitedPathsExist2 = (n, edgeList, queries) => {
  // create graph
  const graph = createGraph(n, edgeList);
  // declare output variable
  const output = [];
  for (let query of queries) {
    const [source, destination, limit] = query;
    output.push(dfs(graph, source, destination, limit, new Set()));
  }
  return output;
};

const dfs = (graph, source, destination, limit, visited) => {
  if (visited.has(source)) return false;
  visited.add(source);
  if (source === destination) return true;

  for (let neighborInfo of graph[source]) {
    const [neighbor, distance] = neighborInfo;
    if (distance < limit) {
      if (dfs(graph, neighbor, destination, limit, visited)) return true;
    }
  }

  return false;
};

const createGraph = (n, edgeList) => {
  const graph = {};
  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }
  for (let edge of edgeList) {
    const [a, b, dist] = edge;
    graph[a].push([b, dist]);
    graph[b].push([a, dist]);
  }
  return graph;
};

(n = 5),
  (edgeList = [
    [0, 1, 10],
    [1, 2, 5],
    [2, 3, 9],
    [3, 4, 13],
  ]),
  (queries = [
    [0, 4, 14],
    [1, 4, 13],
  ]);

console.log(distanceLimitedPathsExist(n, edgeList, queries));
