/* 
You are given two positive integer arrays spells and potions, of length n and m respectively, where spells[i] represents the strength of the ith spell and potions[j] represents the strength of the jth potion.

You are also given an integer success. A spell and potion pair is considered successful if the product of their strengths is at least success.

Return an integer array pairs of length n where pairs[i] is the number of potions that will form a successful pair with the ith spell.

Input: spells = [5,1,3], potions = [1,2,3,4,5], success = 7
Output: [4,0,3]
Explanation:
- 0th spell: 5 * [1,2,3,4,5] = [5,10,15,20,25]. 4 pairs are successful.
- 1st spell: 1 * [1,2,3,4,5] = [1,2,3,4,5]. 0 pairs are successful.
- 2nd spell: 3 * [1,2,3,4,5] = [3,6,9,12,15]. 3 pairs are successful.
Thus, [4,0,3] is returned.

Input: spells = [3,1,2], potions = [8,5,8], success = 16
Output: [2,0,2]
Explanation:
- 0th spell: 3 * [8,5,8] = [24,15,24]. 2 pairs are successful.
- 1st spell: 1 * [8,5,8] = [8,5,8]. 0 pairs are successful. 
- 2nd spell: 2 * [8,5,8] = [16,10,16]. 2 pairs are successful. 
Thus, [2,0,2] is returned.

*/

// Approach: Sort and Binary Search
// O((n + m)log(m)) time | O(1) space
const successfulPairs = (spells, potions, success) => {
  // sort potions
  potions.sort((a, b) => a - b);
  const pairs = [];
  for (let spell of spells) {
    let l = 0;
    let r = potions.length - 1;
    let idx = -1;
    while (l <= r) {
      const midIdx = Math.floor((l + r) / 2);
      const sum = spell * potions[midIdx];
      if (sum >= success) {
        // you still have to go left
        idx = midIdx;
        r = midIdx - 1;
      } else {
        l = midIdx + 1;
      }
    }
    // if idx is not -1 add potions.length - idx to array
    if (idx !== -1) {
      pairs.push(potions.length - idx);
    } else {
      pairs.push(0);
    }
  }
  return pairs;
};

// Approach: Brute Force
// O(n^2) time | O(1) space
const successfulPairs2 = (spells, potions, success) => {
  const pairs = [];
  for (spell of spells) {
    let count = 0;
    for (let potion of potions) {
      if (spell * potion >= success) count++;
    }
    pairs.push(count);
  }
  return pairs;
};
