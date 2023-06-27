/* 
You are given two integer arrays nums1 and nums2 sorted in ascending order and an integer k.

Define a pair (u, v) which consists of one element from the first array and one element from the second array.

Return the k pairs (u1, v1), (u2, v2), ..., (uk, vk) with the smallest sums.

Input: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
Output: [[1,2],[1,4],[1,6]]
Explanation: The first 3 pairs are returned from the sequence: [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]

Input: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
Output: [[1,1],[1,1]]
Explanation: The first 2 pairs are returned from the sequence: [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]

Input: nums1 = [1,2], nums2 = [3], k = 3
Output: [[1,3],[2,3]]
Explanation: All possible pairs are returned from the sequence: [1,3],[2,3]

*/

// Approach: MinHeap
// O(min(klog(k), m*nlog(m*n))) time | O(min(k, m * n)) space
const kSmallestPairs = (nums1, nums2, k) => {
  const visited = new Set();
  const minHeap = new MinHeap([[0, 0, nums1[0] + nums2[0]]]);
  const output = [];

  while (!minHeap.isEmpty() && output.length !== k) {
    const [i, j, total] = minHeap.remove();
    const pos = i + ',' + j;
    if (visited.has(pos)) continue;
    visited.add(pos);
    // add to output
    output.push([nums1[i], nums2[j]]);
    // add neighbors
    if (i + 1 < nums1.length) {
      minHeap.insert([i + 1, j, nums1[i + 1] + nums2[j]]);
    }
    if (j + 1 < nums2.length) {
      minHeap.insert([i, j + 1, nums1[i] + nums2[j + 1]]);
    }
  }

  return output;
};

class MinHeap {
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
      if (childTwoIdx !== -1 && heap[childTwoIdx][2] < heap[childOneIdx][2]) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }
      // determine if a swap needs to be made
      if (heap[idxToSwap][2] < heap[currentIdx][2]) {
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
    while (parentIdx >= 0 && heap[currentIdx][2] < heap[parentIdx][2]) {
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

  isEmpty() {
    return this.heap.length === 0;
  }
}
