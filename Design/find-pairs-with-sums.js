/* 
You are given two integer arrays nums1 and nums2. You are tasked to implement a data structure that supports queries of two types:

Add a positive integer to an element of a given index in the array nums2.
Count the number of pairs (i, j) such that nums1[i] + nums2[j] equals a given value (0 <= i < nums1.length and 0 <= j < nums2.length).
Implement the FindSumPairs class:

FindSumPairs(int[] nums1, int[] nums2) Initializes the FindSumPairs object with two integer arrays nums1 and nums2.
void add(int index, int val) Adds val to nums2[index], i.e., apply nums2[index] += val.
int count(int tot) Returns the number of pairs (i, j) such that nums1[i] + nums2[j] == tot.

Input
["FindSumPairs", "count", "add", "count", "count", "add", "add", "count"]
[[[1, 1, 2, 2, 2, 3], [1, 4, 5, 2, 5, 4]], [7], [3, 2], [8], [4], [0, 1], [1, 1], [7]]
Output
[null, 8, null, 2, 1, null, null, 11]

Explanation
FindSumPairs findSumPairs = new FindSumPairs([1, 1, 2, 2, 2, 3], [1, 4, 5, 2, 5, 4]);
findSumPairs.count(7);  // return 8; pairs (2,2), (3,2), (4,2), (2,4), (3,4), (4,4) make 2 + 5 and pairs (5,1), (5,5) make 3 + 4
findSumPairs.add(3, 2); // now nums2 = [1,4,5,4,5,4]
findSumPairs.count(8);  // return 2; pairs (5,2), (5,4) make 3 + 5
findSumPairs.count(4);  // return 1; pair (5,0) makes 3 + 1
findSumPairs.add(0, 1); // now nums2 = [2,4,5,4,5,4]
findSumPairs.add(1, 1); // now nums2 = [2,5,5,4,5,4]
findSumPairs.count(7);  // return 11; pairs (2,1), (2,2), (2,4), (3,1), (3,2), (3,4), (4,1), (4,2), (4,4) make 2 + 5 and pairs (5,3), (5,5) make 3 + 4

*/

class FindSumPairs {
  constructor(nums1, nums2) {
    this.nums1Map = {};
    this.nums1IndexMap = {};
    this.nums2Map = {};
    this.nums2IndexMap = {};
    for (let i = 0; i < nums1.length; i++) {
      const num = nums1[i];
      this.nums1Map[num] = this.nums1Map[num] + 1 || 1;
      this.nums1IndexMap[i] = num;
    }
    for (let i = 0; i < nums2.length; i++) {
      const num = nums2[i];
      this.nums2Map[num] = this.nums2Map[num] + 1 || 1;
      this.nums2IndexMap[i] = num;
    }
  }

  add(index, val) {
    const currentVal = this.nums2IndexMap[index];
    this.nums2Map[currentVal]--;
    const newVal = currentVal + val;
    this.nums2Map[newVal] = this.nums2Map[newVal] + 1 || 1;
    this.nums2IndexMap[index] = newVal;
  }

  count(tot) {
    let res = 0;
    for (let num in this.nums1Map) {
      const complement = tot - Number(num);
      if (complement in this.nums2Map) {
        res += this.nums1Map[num] * this.nums2Map[complement];
      }
    }
    return res;
  }
}
