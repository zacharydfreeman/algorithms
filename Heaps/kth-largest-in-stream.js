/*
Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.

Implement KthLargest class:

KthLargest(int k, int[] nums) Initializes the object with the integer k and the stream of integers nums.
int add(int val) Appends the integer val to the stream and returns the element representing the kth largest element in the stream.

Input
["KthLargest", "add", "add", "add", "add", "add"]
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
Output
[null, 4, 5, 5, 8, 8]

Explanation
KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
kthLargest.add(3);   // return 4
kthLargest.add(5);   // return 5
kthLargest.add(10);  // return 5
kthLargest.add(9);   // return 8
kthLargest.add(4);   // return 8
 */

class KthLargest {
  // O(nlog(n)) time | O(n) space
  constructor(k, nums) {
    this.minHeap = new MinPriorityQueue();
    this.k = k;
    for (let num of nums) {
      this.minHeap.enqueue(num);
    }
  }
  // O(log(n)) time | O(1) space
  add(val) {
    // add val to heap
    this.minHeap.enqueue(val);
    // remove until you have k elements in heap
    while (this.minHeap.size() > this.k) {
      this.minHeap.dequeue();
    }
    return this.minHeap.front().element;
  }
}
