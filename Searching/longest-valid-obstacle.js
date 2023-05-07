/**
 * You want to build some obstacle courses. You are given a 0-indexed integer array obstacles of length n, where obstacles[i] describes the height of the ith obstacle.

For every index i between 0 and n - 1 (inclusive), find the length of the longest obstacle course in obstacles such that:

You choose any number of obstacles between 0 and i inclusive.
You must include the ith obstacle in the course.
You must put the chosen obstacles in the same order as they appear in obstacles.
Every obstacle (except the first) is taller than or the same height as the obstacle immediately before it.
Return an array ans of length n, where ans[i] is the length of the longest obstacle course for index i as described above.

Input: obstacles = [1,2,3,2]
Output: [1,2,3,3]
Explanation: The longest valid obstacle course at each position is:
- i = 0: [1], [1] has length 1.
- i = 1: [1,2], [1,2] has length 2.
- i = 2: [1,2,3], [1,2,3] has length 3.
- i = 3: [1,2,3,2], [1,2,2] has length 3.

Input: obstacles = [2,2,1]
Output: [1,2,1]
Explanation: The longest valid obstacle course at each position is:
- i = 0: [2], [2] has length 1.
- i = 1: [2,2], [2,2] has length 2.
- i = 2: [2,2,1], [1] has length 1.

Input: obstacles = [3,1,5,6,4,2]
Output: [1,1,2,3,2,2]
Explanation: The longest valid obstacle course at each position is:
- i = 0: [3], [3] has length 1.
- i = 1: [3,1], [1] has length 1.
- i = 2: [3,1,5], [3,5] has length 2. [1,5] is also valid.
- i = 3: [3,1,5,6], [3,5,6] has length 3. [1,5,6] is also valid.
- i = 4: [3,1,5,6,4], [3,4] has length 2. [1,4] is also valid.
- i = 5: [3,1,5,6,4,2], [1,2] has length 2.
 */

// Approach: Binary search
// O(nlog(n)) time | O(n) space
const longestObstacleCourseAtEachPosition = (obstacles) => {
  const output = [1];
  const seq = [obstacles[0]];

  for (let i = 1; i < obstacles.length; i++) {
    const index = specialBinarySearch(seq, obstacles[i]);
    if (obstacles[i] >= seq[seq.length - 1]) {
      seq.push(obstacles[i]);
      output.push(seq.length);
    } else {
      seq[index] = obstacles[i];
      output.push(index + 1);
    }
  }

  return output;
};

const specialBinarySearch = (seq, num) => {
  let l = 0;
  let r = seq.length - 1;
  let index = -1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (seq[mid] <= num) {
      l = mid + 1;
    } else {
      index = mid;
      r = mid - 1;
    }
  }
  return index;
};
