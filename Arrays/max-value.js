/*
Write a function, maxValue, that takes in array of numbers as an argument.
The function should return the largest number in the array.

Solve this without using any built-in array methods.

You can assume that the array is non-empty.

maxValue([4, 7, 2, 8, 10, 9]); // -> 10
*/


// O(n) time | O(1) space
const maxValue = (nums) => {
    let max = Infinity; // declare a max variable

    for (let num of nums) {
        max = Math.max(num, max); // update max
    }
    return max;
}
