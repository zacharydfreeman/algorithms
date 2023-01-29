/*
Given a string made up of integers 0 to 9, count the number of ways to split the
string into prime numbers in the range of 2 to 1000 inclusive, using up all the characters in the string.

Each prime number, pn, must not contain leading 0s, and 2 <= pn <= 1000.

Constraints
The input string does not contain any leading 0s.

Examples
Example 1:
Input: "31173"
Output: 6
Explanation:
The string "31173" can be split into prime numbers in 6 ways:

[3, 11, 7, 3]
[3, 11, 73]
[31, 17, 3]
[31, 173]
[311, 7, 3]
[311, 73]
*/

const splitPrimes = (string, i = 0) => {
    // base case
    if (i === string.length) return 1;
    // declare count variable;
    let count = 0;

    // consider all the prefixes
    for (let j = 1; j < string.length; j++) {
        // number should not have a leading zero and should not be prime
        if (j + i <= string.length && isPrime(string.slice(i, i + j)) && string[i] !== "0") {
            count += splitPrimes(string, i + j);
        }
    }

    return count;
}

const isPrime = (string) => {
    const number = Number(string);
    if (number < 2) return false;
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) return false;
    }
    return true;
}

console.log(splitPrimes("3175"));
