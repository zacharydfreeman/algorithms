/*
Given an integer array nums, design an algorithm to randomly shuffle the array. All permutations of the array should be equally likely as a result of the shuffling.

Implement the Solution class:

Solution(int[] nums) Initializes the object with the integer array nums.
int[] reset() Resets the array to its original configuration and returns it.
int[] shuffle() Returns a random shuffling of the array.

Input
["Solution", "shuffle", "reset", "shuffle"]
[[[1, 2, 3]], [], [], []]
Output
[null, [3, 1, 2], [1, 2, 3], [1, 3, 2]]

Explanation
Solution solution = new Solution([1, 2, 3]);
solution.shuffle();    // Shuffle the array [1,2,3] and return its result.
                       // Any permutation of [1,2,3] must be equally likely to be returned.
                       // Example: return [3, 1, 2]
solution.reset();      // Resets the array back to its original configuration [1,2,3]. Return [1, 2, 3]
solution.shuffle();    // Returns the random shuffling of array [1,2,3]. Example: return [1, 3, 2]
 */

class Solution {
  constructor(array) {
    this.array = array;
    this.original = array.slice();
  }
  // O(n) time | O(n) space
  reset() {
    this.array = this.original.slice();
    return this.original;
  }
  // O(n) time | O(n) space
  shuffle() {
    for (let i = 0; i < this.array.length; i++) {
      const swapIdx = Math.floor(Math.random() * this.array.length);
      [this.array[i], this.array[swapIdx]] = [
        this.array[swapIdx],
        this.array[i],
      ];
    }
    return this.array;
  }
}

const numbers = new Solution([1, 2, 3, 4]);
console.log(numbers.shuffle());
console.log(numbers.shuffle());
console.log(numbers.shuffle());
console.log(numbers.reset());
console.log(numbers.shuffle());
console.log(numbers.reset());
console.log(numbers.shuffle());
console.log(numbers.reset());
