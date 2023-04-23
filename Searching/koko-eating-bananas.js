/* 
Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours.

Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

Return the minimum integer k such that she can eat all the bananas within h hours.

Input: piles = [3,6,7,11], h = 8
Output: 4

Input: piles = [30,11,23,4,20], h = 5
Output: 30

Input: piles = [30,11,23,4,20], h = 6
Output: 23
*/

// Approach: Binary search
// O(n * log(m)) time | O(1) space where n is length of piles and m is max of piles
const minEatingSpeed = (piles, h) => {
  let l = 1;
  let r = Math.max(...piles);
  let speed;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    const hours = getHours(piles, mid);
    if (hours <= h) {
      // go left
      speed = mid;
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  return speed;
};

const getHours = (piles, speed) => {
  let hours = 0;
  for (let pile of piles) {
    hours += Math.ceil(pile / speed);
  }
  return hours;
};

// O(m*n) time | O(1) space where m is max number in piles array and n is length of piles array
const minEatingSpeed2 = (piles, h) => {
  const maxSpeed = Math.max(...piles);
  for (let speed = 1; speed <= maxSpeed; speed++) {
    let hours = 0;
    for (let pile of piles) {
      hours += Math.ceil(pile / speed);
    }
    if (hours <= h) return speed;
  }
};
