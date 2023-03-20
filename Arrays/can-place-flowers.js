/* 
You have a long flowerbed in which some of the plots are planted, and some are not. However, flowers cannot be planted in adjacent plots.

Given an integer array flowerbed containing 0's and 1's, where 0 means empty and 1 means not empty, and an integer n, return if n new flowers can be planted in the flowerbed without violating the no-adjacent-flowers rule.

Input: flowerbed = [1,0,0,0,1], n = 1
Output: true

Input: flowerbed = [1,0,0,0,1], n = 2
Output: false

*/

// O(n) time | O(1) space
const canPlaceFlowers = (flowerbed, n) => {
  for (let i = 0; i < flowerbed.length; i++) {
    if (flowerbed[i] === 0) {
      if (
        (flowerbed[i - 1] === 0 && flowerbed[i + 1] === 0) ||
        (flowerbed[i - 1] === undefined && flowerbed[i + 1] === 0) ||
        (flowerbed[i + 1] === undefined && flowerbed[i - 1] === 0) ||
        (flowerbed[i - 1] === undefined &&
          flowerbed[i + 1] === undefined &&
          flowerbed[i] === 0)
      ) {
        flowerbed[i] = 1;
        n--;
      }
    }
  }

  return n <= 0;
};

// O(n) time | O(n) space
const canPlaceFlowers2 = (flowerbed, n) => {
  const flowers = [0, ...flowerbed, 0];
  for (let i = 1; i < flowers.length - 1; i++) {
    if (flowers[i - 1] === 0 && flowers[i] === 0 && flowers[i + 1] === 0) {
      flowers[i] = 1;
      n -= 1;
    }
  }
  return n <= 0;
};
