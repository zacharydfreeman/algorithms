/*
 A binary string is monotone increasing if it consists of some number of 0's (possibly none),
 followed by some number of 1's (also possibly none).

You are given a binary string s. You can flip s[i] changing it from 0 to 1 or from 1 to 0.

Return the minimum number of flips to make s monotone increasing.

Input: s = "00110"
Output: 1
Explanation: We flip the last digit to get 00111.

Input: s = "010110"
Output: 2
Explanation: We flip to get 011111, or alternatively 000111.

Input: s = "00011000"
Output: 2
Explanation: We flip to get 00000000.
 */

// O(n) time | O(1) space
const minFlipsMonoIncr = (s) => {
    // declare number of flips and number of ones variables
    let flips = 0;
    let ones = 0; // these are our potential flips
    // loop through string
    for (let char of s) {
        // if char is 1, just increment one count
        if (char === "1") {
            // increment ones
            ones++;
        } else if (ones > 0) {
            // if char is 0 and one is greater than zero then we have to make a flip
            flips++;
            ones--;
        }
    }

    return flips;
}

console.log(minFlipsMonoIncr("00011000"));
