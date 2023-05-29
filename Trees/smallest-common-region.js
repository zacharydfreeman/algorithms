/*
You are given some lists of regions where the first region of each list includes all other regions in that list.

Naturally, if a region x contains another region y then x is bigger than y. Also, by definition, a region x contains itself.

Given two regions: region1 and region2, return the smallest region that contains both of them.

If you are given regions r1, r2, and r3 such that r1 includes r3, it is guaranteed there is no r2 such that r2 includes r3.

It is guaranteed the smallest region exists.

regions = [["Earth","North America","South America"],
["North America","United States","Canada"],
["United States","New York","Boston"],
["Canada","Ontario","Quebec"],
["South America","Brazil"]],
region1 = "Quebec",
region2 = "New York"
Output: "North America"

Input: regions = [["Earth", "North America", "South America"],["North America", "United States", "Canada"],["United States", "New York", "Boston"],["Canada", "Ontario", "Quebec"],["South America", "Brazil"]], region1 = "Canada", region2 = "South America"
Output: "Earth"
*/

// O(n * m + n) time | O(n + m + h) where n is the length of regions, m is longest subarray and h is the height of the tree
const findSmallestRegion = (regions, region1, region2) => {
  // make graph/tree
  const graph = createGraph(regions);

  const path1 = dfs(graph, regions[0][0], region1);
  const path2 = dfs(graph, regions[0][0], region2);
  const path1Set = new Set([...path1]);
  for (let i = 0; i < path2.length; i++) {
    if (path1Set.has(path2[i])) return path2[i];
  }
};

const dfs = (graph, start, target) => {
  if (start === target) return [target];
  for (let child of graph[start]) {
    const path = dfs(graph, child, target);
    if (path !== null) {
      path.push(start);
      return path;
    }
  }
  return null;
};

const createGraph = (regions) => {
  const graph = {};
  for (let region of regions) {
    const root = region[0];
    const children = region.slice(1);
    if (!(root in graph)) graph[root] = [];
    for (let child of children) {
      if (!(child in graph)) graph[child] = [];
      graph[root].push(child);
    }
  }
  return graph;
};
