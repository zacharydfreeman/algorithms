/* 
Given an integer n, return the number of prime numbers that are strictly less than n.

Input: n = 10
Output: 4
Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7.

Input: n = 0
Output: 0

Input: n = 1
Output: 0
*/

const countPrimes = (n) => {
  // create a primes array that sets all values to true
  const primes = new Array(n).fill(true);
  // set non primes to false
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (primes[i]) {
      for (let j = i; j * i < n; j++) {
        primes[i * j] = false;
      }
    }
  }
  // count number of primes in primes array
  let primesCount = 0;
  for (let i = 2; i < primes.length; i++) {
    if (primes[i]) primesCount++;
  }
  // return primesCount
  return primesCount;
};

const countPrimes2 = (n) => {
  let count = 0;
  for (let i = 2; i < n; i++) {
    if (isPrime(i)) count++;
  }
  return count;
};

const isPrime = (n) => {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
};
