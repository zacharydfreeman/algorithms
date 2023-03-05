/**
 * Given an array of integers arr, you are initially positioned at the first index of the array.

In one step you can jump from index i to index:

i + 1 where: i + 1 < arr.length.
i - 1 where: i - 1 >= 0.
j where: arr[i] == arr[j] and i != j.
Return the minimum number of steps to reach the last index of the array.

Notice that you can not jump outside of the array at any time.

Input: arr = [100,-23,-23,404,100,23,23,23,3,404]
Output: 3
Explanation: You need three jumps from index 0 --> 4 --> 3 --> 9. Note that index 9 is the last index of the array.
 */

// O(n) time | O(n) sapce where n is the length of nums
const minJumps = (nums) => {
  // initialize positions map that will allow you to BFS
  const positions = {}; // value: [indexes]
  for (let i = 0; i < nums.length; i++) {
    const value = nums[i];
    if (!(value in positions)) positions[value] = [];
    positions[value].push(i);
  }

  // initialize que and visited set
  let queue = [0]; // [startIdx, distance]
  const visited = new Set([0]);
  let count = 0;

  while (queue.length) {
    const nextSearch = [];
    for (let pos of queue) {
      // check to see if end of array
      if (pos === nums.length - 1) return count;
      // loop through same value positions in position map
      for (let sameValPos of positions[nums[pos]]) {
        if (pos !== sameValPos && !visited.has(sameValPos)) {
          visited.add(sameValPos);
          nextSearch.push(sameValPos);
        }
      }

      // remove from obj
      positions[nums[pos]] = [];
      // go right and left if possible
      const right = pos + 1;
      const left = pos - 1;
      if (right < nums.length && !visited.has(right)) {
        visited.add(right);
        nextSearch.push(right);
      }
      if (left >= 0 && !visited.has(left)) {
        visited.add(left);
        nextSearch.push(left);
      }
    }
    queue = nextSearch;
    count++;
  }

  return count;
};

const nums = [100, -23, -23, 404, 100, 23, 23, 23, 3, 404];

console.log(minJumps(nums));
