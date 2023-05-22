/* 
There are n cities connected by some number of flights. You are given an array flights where flights[i] = [fromi, toi, pricei] indicates that there is a flight from city fromi to city toi with cost pricei.

You are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops. If there is no such route, return -1.

Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
Output: 700
Explanation:
The graph is shown above.
The optimal path with at most 1 stop from city 0 to 3 is marked in red and has cost 100 + 600 = 700.
Note that the path through cities [0,1,2,3] is cheaper but is invalid because it uses 2 stops.

Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
Output: 200
Explanation:
The graph is shown above.
The optimal path with at most 1 stop from city 0 to 2 is marked in red and has cost 100 + 100 = 200.

Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0
Output: 500
Explanation:
The graph is shown above.
The optimal path with no stops from city 0 to 2 is marked in red and has cost 500.

*/

// Bellman-Fords
// O((n + e) * k) time | O(n) space
const findCheapestPrice = (n, flights, src, dst, k) => {
  let distances = new Array(n).fill(Infinity);
  distances[src] = 0;
  let stops = 0;
  while (stops <= k) {
    const tempPrice = [...distances];
    for (let [from, to, cost] of flights) {
      if (distances[from] === Infinity) continue;
      if (distances[from] + cost < tempPrice[to]) {
        tempPrice[to] = distances[from] + cost;
      }
    }
    distances = tempPrice;
    stops++;
  }
  return distances[dst] === Infinity ? -1 : distances[dst];
};

// BFS by stops
// O(n + e * k) time | O(n + e * k) space
const findCheapestPrice2 = (n, flights, src, dst, k) => {
  const graph = createGraph(n, flights);
  const distances = new Array(n).fill(Infinity);
  distances[src] = 0;
  let queue = [[src, distances[src]]];
  let stops = 0;
  while (stops <= k && queue.length) {
    const nextLevel = [];
    for (let [curr, currDist] of queue) {
      for (let [nei, neiDist] of graph[curr]) {
        const newDist = currDist + neiDist;
        if (newDist < distances[nei]) {
          distances[nei] = newDist;
          nextLevel.push([nei, newDist]);
        }
      }
    }
    queue = nextLevel;
    stops++;
  }
  return distances[dst] === Infinity ? -1 : distances[dst];
};

// Approach: BFS by state (will timeout)
const findCheapestPrice3 = (n, flights, src, dst, k) => {
  const graph = createGraph(n, flights);
  let queue = [[src, 0, k]];
  const visited = new Set();
  let minCost = Infinity;
  while (queue.length) {
    let nextLevel = [];
    for (let [curr, cost, stops] of queue) {
      if (curr === dst && stops >= -1) {
        minCost = Math.min(minCost, cost);
      }
      for (let [nei, weight] of graph[curr]) {
        const newCost = cost + weight;
        const pos = nei + ',' + stops;
        if (!visited.has(pos) && stops >= 0) {
          visited.add(pos);
          nextLevel.push([nei, newCost, stops - 1]);
        }
      }
    }
    queue = nextLevel;
  }
  return minCost === Infinity ? -1 : minCost;
};

const createGraph = (n, flights) => {
  const graph = {};
  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }
  for (let [from, to, cost] of flights) {
    graph[from].push([to, cost]);
  }
  return graph;
};

const n = 4,
  flights = [
    [0, 1, 1],
    [0, 2, 5],
    [1, 2, 1],
    [2, 3, 1],
  ],
  src = 0,
  dst = 3,
  k = 1;

console.log(findCheapestPrice(n, flights, src, dst, k));
