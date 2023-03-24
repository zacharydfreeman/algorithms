/* 
In this problem, a tree is an undirected graph that is connected and has no cycles.

You are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed. The graph is represented as an array edges of length n where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the graph.

Return an edge that can be removed so that the resulting graph is a tree of n nodes. If there are multiple answers, return the answer that occurs last in the input.

Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]

Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
Output: [1,4]
*/

// O(n) time | O(n) space

const findRedundantConnection = (edges) => {
  // declare parents array
  const parents = new Array(edges.length + 1).fill().map((_, idx) => idx);

  // declare ranks array
  const ranks = new Array(edges.length + 1).fill(1);

  for (let [edgeOne, edgeTwo] of edges) {
    if (!union(edgeOne, edgeTwo, parents, ranks)) return [edgeOne, edgeTwo];
  }
};

const find = (edge, parents) => {
  let parent = parents[edge];
  while (parent !== parents[parent]) {
    // path compression
    parents[parent] = parents[parents[parent]];
    parent = parents[parent];
  }
  return parent;
};

const union = (edgeOne, edgeTwo, parents, ranks) => {
  const parentOne = find(edgeOne, parents);
  const parentTwo = find(edgeTwo, parents);
  // return false if they have same parent
  if (parentOne === parentTwo) return false;
  // union by rank
  if (parentOne > parentTwo) {
    parents[parentTwo] = parentOne;
    ranks[parentOne] += ranks[parentTwo];
  } else {
    parents[parentOne] = parentTwo;
    ranks[parentTwo] += ranks[parentOne];
  }

  return true;
};
