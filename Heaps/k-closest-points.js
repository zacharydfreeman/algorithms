/**
 * Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).

The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).

You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).

Input: points = [[1,3],[-2,2]], k = 1
Output: [[-2,2]]
Explanation:
The distance between (1, 3) and the origin is sqrt(10).
The distance between (-2, 2) and the origin is sqrt(8).
Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].
 */

// Approach: Max Heap
// O(nlog(k)) time | O(k) space
const kClosest = (points, k) => {
  const maxHeap = new MaxPriorityQueue();
  // build maxHeap
  for (let point of points) {
    const distance = _distance(point[0], point[1]);
    if (maxHeap.size() < k) {
      maxHeap.enqueue(point, distance);
    } else if (distance < maxHeap.front().priority) {
      // dequeue
      maxHeap.dequeue();
      //enqueue
      maxHeap.enqueue(point, distance);
    }
  }
  // return array
  return maxHeap.toArray().map((elem) => elem.element);
};

const _distance = (x, y) => {
  return Math.sqrt(x * x + y * y);
};
