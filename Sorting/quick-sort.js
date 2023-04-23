/**
 * Implement quick sort
 */

// O(nlog(n)) time | O(log(n)) space
const quickSort = (array) => {
  _quickSort(array, 0, array.length - 1);
  return array;
};

const _quickSort = (array, startIdx, endIdx) => {
  // base case if startIdx > endIdx return
  if (startIdx > endIdx) return;
  // declare pivot, left and right indexes
  const pivot = startIdx;
  let leftIdx = startIdx + 1;
  let rightIdx = endIdx;
  while (leftIdx <= rightIdx) {
    if (array[leftIdx] > array[pivot] && array[rightIdx] < array[pivot]) {
      // swap
      [array[leftIdx], array[rightIdx]] = [array[rightIdx], array[leftIdx]];
    }
    if (array[rightIdx] >= array[pivot]) rightIdx--;
    if (array[leftIdx] <= array[pivot]) leftIdx++;
  }
  // swap pivot with right idx becuase we know it will be smaller than the pivot
  [array[pivot], array[rightIdx]] = [array[rightIdx], array[pivot]];
  // recursivelt call function with two partitions with an optimization of calling it first on the smaller subarray
  const leftSmaller =
    rightIdx - 1 - startIdx < endIdx - (rightIdx + 1) ? true : false;
  if (leftSmaller) {
    _quickSort(array, startIdx, rightIdx - 1);
    _quickSort(array, rightIdx + 1, endIdx);
  } else {
    _quickSort(array, rightIdx + 1, endIdx);
    _quickSort(array, startIdx, rightIdx - 1);
  }
};
