/* 
You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target.

We will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.

Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
Output: 2

Input: times = [[1,2,1]], n = 2, k = 1
Output: 1

Input: times = [[1,2,1]], n = 2, k = 2
Output: -1

*/

// Approach: Unoptimized Dijkstra's
// O(n + elog(n)) time | O(n + e) space
const networkDelayTime = (times, n, k) => {
  const graph = createGraph(times, n);
  const visited = new Set();
  const distances = new Array(n + 1).fill(Infinity);
  distances[k] = 0;
  const minHeap = new MinHeap([[k, distances[k]]]);

  while (minHeap.size() > 0) {
    const [vertex, distance] = minHeap.pop();

    if (distances[vertex] < distance) continue;
    visited.add(vertex);

    for (let [nei, neiDistance] of graph[vertex]) {
      if (visited.has(nei)) continue;
      const newDistance = distance + neiDistance;
      if (newDistance < distances[nei]) {
        distances[nei] = newDistance;
        minHeap.push([nei, newDistance]);
      }
    }
  }
  let max = -Infinity;
  for (let i = 1; i < distances.length; i++) {
    max = Math.max(max, distances[i]);
  }
  return max === Infinity || visited.size !== n ? -1 : max;
};

const createGraph = (times, n) => {
  const graph = {};
  for (let i = 1; i <= n; i++) {
    graph[i] = [];
  }
  for (let [a, b, time] of times) {
    graph[a].push([b, time]);
  }
  return graph;
};

// lazy implementation
class MinHeap {
  constructor(array) {
    this.heap = this.heapify(array);
  }

  heapify(array) {
    return array.sort((a, b) => b[1] - a[1]);
  }

  push(edge) {
    this.heap.push(edge);
    this.heapify(this.heap);
  }

  pop() {
    const edge = this.heap.pop();
    this.heapify(this.heap);
    return edge;
  }

  size() {
    return this.heap.length;
  }
}

const times = [[1, 2, 1]],
  n = 2,
  k = 2;

console.log(networkDelayTime(times, n, k));
