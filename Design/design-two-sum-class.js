/* 
Design a data structure that accepts a stream of integers and checks if it has a pair of integers that sum up to a particular value.

Implement the TwoSum class:

TwoSum() Initializes the TwoSum object, with an empty array initially.
void add(int number) Adds number to the data structure.
boolean find(int value) Returns true if there exists any pair of numbers whose sum is equal to value, otherwise, it returns false.

Input
["TwoSum", "add", "add", "add", "find", "find"]
[[], [1], [3], [5], [4], [7]]
Output
[null, null, null, null, true, false]

Explanation
TwoSum twoSum = new TwoSum();
twoSum.add(1);   // [] --> [1]
twoSum.add(3);   // [1] --> [1,3]
twoSum.add(5);   // [1,3] --> [1,3,5]
twoSum.find(4);  // 1 + 3 = 4, return true
twoSum.find(7);  // No two integers sum up to 7, return false

*/

class TwoSum {
  constructor() {
    this.nums = {};
  }

  add(number) {
    this.nums[number] = this.nums[number] + 1 || 1;
  }

  find(value) {
    for (let num in this.nums) {
      this.nums[num]--;
      const complement = value - Number(num);
      if (complement in this.nums && this.nums[complement] > 0) {
        this.nums[num]++;
        return true;
      }
      this.nums[num]++;
    }
    return false;
  }
}
