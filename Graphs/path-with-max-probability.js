/* 
You are given an undirected weighted graph of n nodes (0-indexed), represented by an edge list where edges[i] = [a, b] is an undirected edge connecting the nodes a and b with a probability of success of traversing that edge succProb[i].

Given two nodes start and end, find the path with the maximum probability of success to go from start to end and return its success probability.

If there is no path from start to end, return 0. Your answer will be accepted if it differs from the correct answer by at most 1e-5.

Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2
Output: 0.25000
Explanation: There are two paths from start to end, one having a probability of success = 0.2 and the other has 0.5 * 0.5 = 0.25.

Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start = 0, end = 2
Output: 0.30000

Input: n = 3, edges = [[0,1]], succProb = [0.5], start = 0, end = 2
Output: 0.00000
Explanation: There is no path between 0 and 2.

*/

// Approach: Dijkstra's
// O(m + nlog(n)) time | O(n + m) space
const maxProbability = (n, edges, succProb, start, end) => {
  // create graph
  const graph = createGraph(n, edges, succProb);
  // create probability array
  const probabilities = new Array(n).fill(0);
  // assign probailities of start to 1
  probabilities[start] = 1;
  // create max heap
  const maxHeap = new MaxHeap([[start, probabilities[start]]]);
  // while maxHeap isnt empty
  while (!maxHeap.isEmpty()) {
    const [node, probability] = maxHeap.remove();
    if (probabilities[node] > probability) continue;
    if (node === end) return probability;
    // explore neighbors
    for (let [nei, neiProb] of graph[node]) {
      const newProb = probability * neiProb;
      if (newProb > probabilities[nei]) {
        probabilities[nei] = newProb;
        maxHeap.insert([nei, newProb]);
      }
    }
  }
  // if we exit while loop, then we didnt find end node
  return 0;
};

const createGraph = (n, edges, succProb) => {
  const graph = {};
  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }
  for (let i = 0; i < edges.length; i++) {
    const [from, to] = edges[i];
    graph[from].push([to, succProb[i]]);
    graph[to].push([from, succProb[i]]);
  }

  return graph;
};

class MaxHeap {
  constructor(array) {
    this.heap = this.buildHeap(array);
  }
  // O(n) time | O(1) space
  buildHeap(array) {
    // get first parent index
    const firstParentIdx = Math.floor((array.length - 2) / 2);
    for (let idx = firstParentIdx; idx >= 0; idx--) {
      // sift down each parent
      this.siftDown(idx, array.length - 1, array);
    }
    // return heapified array
    return array;
  }
  // O(log(n)) time | O(1) space
  siftDown(startIdx, endIdx, heap) {
    // determine child one
    let currentIdx = startIdx;
    let childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
      // get child two idx if valid
      const childTwoIdx = childOneIdx + 1 < heap.length ? childOneIdx + 1 : -1;
      // declare an idx to swap
      let idxToSwap;
      // compare two children to determine which index to swap
      if (childTwoIdx !== -1 && heap[childTwoIdx][1] > heap[childOneIdx][1]) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }
      // determine if a swap needs to be made
      if (heap[idxToSwap][1] > heap[currentIdx][1]) {
        // swap
        [heap[idxToSwap], heap[currentIdx]] = [
          heap[currentIdx],
          heap[idxToSwap],
        ];
        // update currentIdx and childOneIdx pointers
        currentIdx = idxToSwap;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  }
  // O(log(n)) time | O(1) space
  siftUp(startIdx, heap) {
    // declare current and parent index pointers
    let currentIdx = startIdx;
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (parentIdx >= 0 && heap[currentIdx][1] > heap[parentIdx][1]) {
      // swap
      [heap[parentIdx], heap[currentIdx]] = [heap[currentIdx], heap[parentIdx]];
      // update current and parent index pointers
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }
  // O(log(n)) time | O(1) space
  insert(val) {
    // push to end of heap
    this.heap.push(val);
    // sift up
    this.siftUp(this.heap.length - 1, this.heap);
  }
  // O(log(n)) time | O(1) space
  remove() {
    // swap first and last number
    [this.heap[0], this.heap[this.heap.length - 1]] = [
      this.heap[this.heap.length - 1],
      this.heap[0],
    ];
    // remove element
    const removedElement = this.heap.pop();
    // sift down
    this.siftDown(0, this.heap.length - 1, this.heap);
    // return removed element
    return removedElement;
  }
  // O(1) time | O(1) space
  peek() {
    return this.heap[0];
  }
  // O(1) time | O(1) space
  isEmpty() {
    return this.heap.length === 0;
  }
}

const n = 3,
  edges = [
    [0, 1],
    [1, 2],
    [0, 2],
  ],
  succProb = [0.5, 0.5, 0.3],
  start = 0,
  end = 2;

console.log(maxProbability(n, edges, succProb, start, end));
