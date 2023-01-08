/*
The parity of a word is 1 if the number of 1s in the word is odd; otherwise it is 0.
For example, the parity of 1011 is 1 and the parity of 10001000 is 0
*/

// Approach: brute-force iteratively tests the value of each bit while tracking the number
// of 1s seen so far. Since we only care if the number of 1s is even or odd, we can store the number mod 2
// O(n) time | O(1) space where n is the length of the word
const parity = (num) => {
    // declare count variable
    let count = 0;
    // while num is not 0
    while (num) {
        // xOr count with if last bit is 1
        count ^= (num & 1);
        // bitwise shift num by 1
        num >>= 1;
    }
    return count;
}
