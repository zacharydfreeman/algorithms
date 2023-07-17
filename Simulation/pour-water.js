/* 
You are given an elevation map represents as an integer array heights where heights[i] representing the height of the terrain at index i. The width at each index is 1. You are also given two integers volume and k. volume units of water will fall at index k.

Water first drops at the index k and rests on top of the highest terrain or water at that index. Then, it flows according to the following rules:

If the droplet would eventually fall by moving left, then move left.
Otherwise, if the droplet would eventually fall by moving right, then move right.
Otherwise, rise to its current position.
Here, "eventually fall" means that the droplet will eventually be at a lower level if it moves in that direction. Also, level means the height of the terrain plus any water in that column.

We can assume there is infinitely high terrain on the two sides out of bounds of the array. Also, there could not be partial water being spread out evenly on more than one grid block, and each unit of water has to be in exactly one block.

Input: heights = [1,2,3,4], volume = 2, k = 2
Output: [2,3,3,4]
Explanation: The last droplet settles at index 1, since moving further left would not cause it to eventually fall to a lower height.

Input: heights = [3,1,3], volume = 5, k = 1
Output: [4,4,4]

*/

// O(n * v) time | O(1) space where n is the length of the heights array and v is the total volume
const pourWater = (heights, volume, k) => {
  let idx = k;
  while (volume > 0) {
    const leftIdx = getLeftIndex(heights, idx);
    const rightIdx = getRightIndex(heights, idx);
    if (leftIdx < idx) {
      heights[leftIdx]++;
    } else if (rightIdx > idx) {
      heights[rightIdx]++;
    } else {
      heights[idx]++;
    }
    volume--;
  }
  return heights;
};

const getLeftIndex = (heights, idx) => {
  let currentHeight = heights[idx];
  let foundIdx = idx;

  for (let i = idx; i >= 0; i--) {
    const newHeight = heights[i];
    if (newHeight > currentHeight) break;
    if (newHeight < currentHeight) {
      foundIdx = i;
      currentHeight = newHeight;
    }
  }
  return foundIdx;
};

const getRightIndex = (heights, idx) => {
  let currentHeight = heights[idx];
  let foundIdx = idx;
  for (let i = idx; i < heights.length; i++) {
    const newHeight = heights[i];
    if (newHeight > currentHeight) break;
    if (newHeight < currentHeight) {
      foundIdx = i;
      currentHeight = newHeight;
    }
  }
  return foundIdx;
};
