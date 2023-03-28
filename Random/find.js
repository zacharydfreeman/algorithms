/* 
Given an array of positive integers, each integer represents how many times to the left or right you can move in the array, no out of bound moves.

Given a starting index, return true if you can reach 0 in the array, otherwise return false

input = [1, 3, 2, 0, 4, 2, 1]
startIdx = 1

output => false

*/

// Approach: DFS
// O(n) time | O(n) space
const findZero = (array, idx) => {
  const visited = new Set();
  const stack = [idx];
  while (stack.length) {
    // grab current index
    const currentIdx = stack.pop();
    if (array[currentIdx] === 0) return true;
    // explore neighbors
    const neighborOne = currentIdx + array[currentIdx];
    const neighborTwo = currentIdx - array[currentIdx];
    // if valid neighbor add to stack and mark as visited
    if (
      neighborOne >= 0 &&
      neighborOne < array.length &&
      !visited.has(currentIdx)
    ) {
      visited.add(currentIdx);
      stack.push(neighborOne);
    }

    if (
      neighborTwo >= 0 &&
      neighborTwo < array.length &&
      !visited.has(currentIdx)
    ) {
      visited.add(currentIdx);
      stack.push(neighborTwo);
    }
  }
  // return fale if you exit while loop
  return false;
};
