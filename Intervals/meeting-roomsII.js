/* 
Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.

Input: intervals = [[0,30],[5,10],[15,20]]
Output: 2

Input: intervals = [[7,10],[2,4]]
Output: 1
*/

// Approach: Two pointers
// O(nlog(n)) time | O(n) space
const minMeetingRooms = (intervals) => {
  const starts = intervals.map((interval) => interval[0]).sort((a, b) => a - b);
  const ends = intervals.map((interval) => interval[1]).sort((a, b) => a - b);
  let i = 0;
  let j = 0;
  let roomsNeeded = 0;
  while (i < starts.length && j < ends.length) {
    // if start < end, we need a room. Increment i
    if (starts[i] < ends[j]) {
      roomsNeeded++;
      i++;
    } else {
      // if start >= end, we dont need a room, increment i and j
      i++;
      j++;
    }
  }
  return roomsNeeded;
};

// Approach: MinHeap
// O(nlog(n)) time | O(n) space
const minMeetingRooms2 = (intervals) => {
  // sort by start times
  intervals.sort((a, b) => a[0] - b[0]);
  // min heap by end time
  const minHeap = new MinHeap([intervals[0]]);
  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    // check to see if a room is available
    if (start < minHeap.peek()[1]) {
      minHeap.insert([start, end]);
    } else {
      minHeap.remove();
      minHeap.insert([start, end]);
    }
  }
  return minHeap.size();
};

class MinHeap {
  constructor(array) {
    this.heap = this.buildHeap(array);
  }

  buildHeap(array) {
    const firstParentIdx = Math.floor((array.length - 2) / 2);
    for (let i = firstParentIdx; i >= 0; i--) {
      this.siftDown(i, array.length - 1, array);
    }
    return array;
  }

  siftUp(startIdx, endIdx, heap) {
    let currentIdx = startIdx;
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (parentIdx >= endIdx) {
      if (heap[currentIdx][1] < heap[parentIdx][1]) {
        [heap[currentIdx], heap[parentIdx]] = [
          heap[parentIdx],
          heap[currentIdx],
        ];
        currentIdx = parentIdx;
        parentIdx = Math.floor((currentIdx - 1) / 2);
      } else {
        return;
      }
    }
  }

  siftDown(startIdx, endIdx, heap) {
    let currentIdx = startIdx;
    let parentOneIdx = 2 * startIdx + 1;
    while (parentOneIdx <= endIdx) {
      const parentTwoIdx = parentOneIdx + 1 <= endIdx ? parentOneIdx + 1 : -1;
      let idxToSwap;
      if (
        parentTwoIdx !== -1 &&
        heap[parentTwoIdx][1] < heap[parentOneIdx][1]
      ) {
        idxToSwap = parentTwoIdx;
      } else {
        idxToSwap = parentOneIdx;
      }
      if (heap[idxToSwap][1] < heap[currentIdx][1]) {
        [heap[idxToSwap], heap[currentIdx]] = [
          heap[currentIdx],
          heap[idxToSwap],
        ];
        currentIdx = idxToSwap;
        parentOneIdx = 2 * currentIdx + 1;
      } else {
        return;
      }
    }
  }

  insert(val) {
    this.heap.push(val);
    this.siftUp(this.heap.length - 1, 0, this.heap);
  }

  remove() {
    [this.heap[0], this.heap[this.heap.length - 1]] = [
      this.heap[this.heap.length - 1],
      this.heap[0],
    ];
    const removed = this.heap.pop();
    this.siftDown(0, this.heap.length - 1, this.heap);
    return removed;
  }

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }
}

const intervals = [
  [13, 15],
  [1, 13],
  [6, 9],
];
console.log(minMeetingRooms(intervals));
