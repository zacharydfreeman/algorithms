/*
Given an array of integers nums, sort the array in ascending order and return it.

You must solve the problem without using any built-in functions in O(nlog(n)) time complexity and with the smallest space complexity possible.
*/

// Approach: Heap sort
// O(nlog(n)) time | O(1)
const sortArray = (nums) => {
  // build maxheap
  buildMaxHeap(nums);
  for (let i = nums.length - 1; i >= 0; i--) {
    [nums[0], nums[i]] = [nums[i], nums[0]];
    siftDown(0, i - 1, nums);
  }

  return nums;
};

const buildMaxHeap = (heap) => {
  // get the first parentidx
  const firstParentIdx = Math.floor((heap.length - 2) / 2);
  // build heap
  for (let idx = firstParentIdx; idx >= 0; idx--) {
    siftDown(idx, heap.length - 1, heap);
  }
};

const siftDown = (startIdx, endIdx, heap) => {
  // declare current and childOneIdxx variables
  let currentIdx = startIdx;
  let childOneIdx = currentIdx * 2 + 1;
  // while childOne <= endIdx
  while (childOneIdx <= endIdx) {
    const childTwoIdx = childOneIdx + 1 <= endIdx ? childOneIdx + 1 : -1;
    let idxToSwap;
    if (childTwoIdx !== -1 && heap[childTwoIdx] > heap[childOneIdx]) {
      idxToSwap = childTwoIdx;
    } else {
      idxToSwap = childOneIdx;
    }
    if (heap[idxToSwap] > heap[currentIdx]) {
      [heap[idxToSwap], heap[currentIdx]] = [heap[currentIdx], heap[idxToSwap]];
      currentIdx = idxToSwap;
      childOneIdx = currentIdx * 2 + 1;
    } else {
      break;
    }
  }
};
