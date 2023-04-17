/* Insertion sort*/

// O(n^2) time | O(1) space where n is the length of the array
const insertionSort = (array) => {
  for (let i = 1; i < array.length; i++) {
    let j = i - 1;
    while (j >= 0 && array[j] > array[j + 1]) {
      // swap
      [array[j], array[j + 1]] = [array[j + 1], array[j]];
      j--;
    }
  }
  return array;
};
