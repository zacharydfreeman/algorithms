/**
 * Given an integer n, return true if it is a power of three. Otherwise, return false.

An integer n is a power of three, if there exists an integer x such that n == 3x.
 */

// O(log3(n)) time | O(1) space
const isPowerOfThree = (n) => {
  if (n <= 0) return false;
  let exp = 0;
  while (true) {
    const res = Math.pow(3, exp);
    if (res === n) return true;
    if (res > n) return false;
    exp++;
  }
};
