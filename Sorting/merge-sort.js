/*
Write a function that take in an array of integers and return a sorted version of that array
Use the merge sort algorithm to sort the array

*/

// O(nlog(n)) time | O(n) space
const mergeSort = (array) => {
  if (array.length <= 1) return array;
  // recursive helper function that will take original array, startIdx, and endIdx
  _mergeSort(array, 0, array.length - 1);
  return array;
};
// O(nlog(n)) time | O(nlog(n)) space
const _mergeSort = (array, startIdx, endIdx) => {
  // base case
  if (startIdx === endIdx) return;
  // calc mid idx
  const midIdx = Math.floor((startIdx + endIdx) / 2);
  // make recursive call to sort the left and right arrays;
  _mergeSort(array, startIdx, midIdx);
  _mergeSort(array, midIdx + 1, endIdx);
  // merge and sort the left and right arrays
  mergeSortHelper(array, startIdx, midIdx, endIdx);
};

// O(n) time | O(n) space
const mergeSortHelper = (array, startIdx, midIdx, endIdx) => {
  // declare array that will hold sorted numbers
  const mergedArray = [];
  let l = startIdx;
  let r = midIdx + 1;

  while (l <= midIdx && r <= endIdx) {
    if (array[l] < array[r]) {
      mergedArray.push(array[l]);
      l++;
    } else {
      mergedArray.push(array[r]);
      r++;
    }
  }
  // if there are still elements in left array, add to sorted array
  while (l <= midIdx) {
    mergedArray.push(array[l]);
    l++;
  }
  // if there are still elements in right array, add to sorted array
  while (r <= endIdx) {
    mergedArray.push(array[r]);
    r++;
  }
  // modify the array in place
  for (let idx = 0; idx < mergedArray.length; idx++) {
    array[startIdx + idx] = mergedArray[idx];
  }
};

// O(nlog(n)) time | O(nlog(n)) space.
// Additional space complexity due to creating copies of array instead of sorting in-place
const mergeSort2 = (array) => {
  // base case
  if (array.length <= 1) return array;
  // calc middle idx
  const midIdx = Math.floor(array.length / 2);
  // make recursive call to get left and right sorted arrays
  const leftSortedArray = mergeSort2(array.slice(0, midIdx));
  const rightSortedArray = mergeSort2(array.slice(midIdx));
  // merge the sorted arrays
  return mergeSortHelper2(leftSortedArray, rightSortedArray);
};

const mergeSortHelper2 = (leftArray, rightArray) => {
  // declare a new array to be length of combined arrays
  const sortedArray = new Array(leftArray.length + rightArray.length);
  // declare pointers
  let l = 0; // left pointer
  let r = 0; // right pointer
  let i = 0; // idx of sorted Array

  while (l < leftArray.length && r < rightArray.length) {
    if (leftArray[l] < rightArray[r]) {
      sortedArray[i++] = leftArray[l++];
    } else {
      sortedArray[i++] = rightArray[r++];
    }
  }

  // if there are still elements in left array, add to sorted array
  while (l < leftArray.length) {
    sortedArray[i++] = leftArray[l++];
  }
  // if there are still elements in right array, add to sorted array
  while (r < rightArray.length) {
    sortedArray[i++] = rightArray[r++];
  }

  return sortedArray;
};
