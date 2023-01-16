/*
Count the number of bits in a nonnegative integer that are set to 1

Input: 30 => "11110"
Output: 4
*/

// O(n) time | O(1) space where n is the number of bits in the integer word
const countBits = (num) => {
    // declare bits variable
    let bits = 0;
    // loop until number is 0
    while(num) {
        // & operation with current number
        bits += num & 1;
        // bitwise right shift by 1
        num >>= 1;
    }
    return bits;
}
