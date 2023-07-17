/* 
Design a data structure to find the frequency of a given value in a given subarray.

The frequency of a value in a subarray is the number of occurrences of that value in the subarray.

Implement the RangeFreqQuery class:

RangeFreqQuery(int[] arr) Constructs an instance of the class with the given 0-indexed integer array arr.
int query(int left, int right, int value) Returns the frequency of value in the subarray arr[left...right].
A subarray is a contiguous sequence of elements within an array. arr[left...right] denotes the subarray that contains the elements of nums between indices left and right (inclusive).

Input
["RangeFreqQuery", "query", "query"]
[[[12, 33, 4, 56, 22, 2, 34, 33, 22, 12, 34, 56]], [1, 2, 4], [0, 11, 33]]
Output
[null, 1, 2]

Explanation
RangeFreqQuery rangeFreqQuery = new RangeFreqQuery([12, 33, 4, 56, 22, 2, 34, 33, 22, 12, 34, 56]);
rangeFreqQuery.query(1, 2, 4); // return 1. The value 4 occurs 1 time in the subarray [33, 4]
rangeFreqQuery.query(0, 11, 33); // return 2. The value 33 occurs 2 times in the whole array.

*/

class RangeFreqQuery {
  constructor(arr) {
    this.map = {};
    for (let i = 0; i < arr.length; i++) {
      const num = arr[i];
      if (!(num in this.map)) this.map[num] = [];
      this.map[num].push(i);
    }
  }

  query(left, right, value) {
    if (!(value in this.map)) return 0;
    const leftIdx = this.binarySearch(this.map[value], left, true);
    const rightIdx = this.binarySearch(this.map[value], right, false);
    return rightIdx - leftIdx + 1;
  }

  binarySearch(arr, target, goLeft) {
    let l = 0;
    let r = arr.length - 1;
    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      if (arr[mid] === target) return mid;
      if (arr[mid] < target) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }

    return goLeft ? l : r;
  }
}
