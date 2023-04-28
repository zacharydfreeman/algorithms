/*
Two strings X and Y are similar if we can swap two letters (in different positions) of X, so that it equals Y. Also two strings X and Y are similar if they are equal.

For example, "tars" and "rats" are similar (swapping at positions 0 and 2), and "rats" and "arts" are similar, but "star" is not similar to "tars", "rats", or "arts".

Together, these form two connected groups by similarity: {"tars", "rats", "arts"} and {"star"}.  Notice that "tars" and "arts" are in the same group even though they are not similar.  Formally, each group is such that a word is in the group if and only if it is similar to at least one other word in the group.

We are given a list strs of strings where every string in strs is an anagram of every other string in strs. How many groups are there?

Input: strs = ["tars","rats","arts","star"]
Output: 2

Input: strs = ["omv","ovm"]
Output: 1

 */

// Approach: Create a graph of nodes that are connected if they are similar and then count the number of connected components
// O(n^2 * m) time | O(n^2) space
const numSimilarGroups = (strs) => {
  // create graph
  const graph = createGraph(strs);
  // declare visited set and count

  const visited = new Set();
  let count = 0;

  for (let node in graph) {
    // if you havent explored the node, perform dfs
    if (dfs(node, graph, visited)) count++;
  }

  return count;
};

const dfs = (node, graph, visited) => {
  if (visited.has(String(node))) return false;
  visited.add(String(node));

  for (let neighbor of graph[node]) {
    dfs(neighbor, graph, visited);
  }

  return true;
};
const createGraph = (strs) => {
  const graph = {};

  for (let i = 0; i < strs.length; i++) {
    graph[i] = [];
  }

  for (let i = 0; i < strs.length - 1; i++) {
    for (let j = i + 1; j < strs.length; j++) {
      // determine if two string are similar
      if (isSimilar(strs[i], strs[j])) {
        graph[i].push(j);
        graph[j].push(i);
      }
    }
  }

  return graph;
};

const isSimilar = (s1, s2) => {
  let diff = 0;
  for (let i = 0; i < s1.length; i++) {
    if (s1[i] !== s2[i]) diff++;
  }
  return diff === 0 || diff === 2;
};
