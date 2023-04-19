/**
 * Given an array of integers arr, return true if the number of occurrences of each value in the array is unique or false otherwise.
 * 
 * Input: arr = [1,2,2,1,1,3]
Output: true
Explanation: The value 1 has 3 occurrences, 2 has 2 and 3 has 1. No two values have the same number of occurrences.

Input: arr = [1,2]
Output: false

Input: arr = [-3,0,1,-3,1,1,1,-3,10,0]
Output: true
 */

// Approach: Hash map
// O(n) time | O(n) space
const uniqueOccurrences = (arr) => {
  // declare map
  const map = {};
  for (let num of arr) {
    map[num] = map[num] + 1 || 1;
  }
  // decalre count map that will keep track of counts
  const counts = {};
  for (let key in map) {
    const count = map[key];
    // if count is in counts Map, then return false
    if (count in counts) return false;
    counts[count] = key;
  }

  return true;
};
