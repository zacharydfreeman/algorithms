/* 
Given an integer array nums, handle multiple queries of the following types:

Update the value of an element in nums.
Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.
Implement the NumArray class:

NumArray(int[] nums) Initializes the object with the integer array nums.
void update(int index, int val) Updates the value of nums[index] to be val.
int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).

Input
["NumArray", "sumRange", "update", "sumRange"]
[[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
Output
[null, 9, null, 8]

Explanation
NumArray numArray = new NumArray([1, 3, 5]);
numArray.sumRange(0, 2); // return 1 + 3 + 5 = 9
numArray.update(1, 2);   // nums = [1, 2, 5]
numArray.sumRange(0, 2); // return 1 + 2 + 5 = 8

*/

class Node {
  constructor(sum, l, r) {
    this.sum = sum;
    this.leftIdx = l;
    this.rightIdx = r;
    this.leftNode = null;
    this.rightNode = null;
  }
}

class NumArray {
  constructor(nums) {
    this.root = this.buildTree(nums, 0, nums.length - 1);
  }

  buildTree(nums, left, right) {
    // base case
    if (left === right) return new Node(nums[left], left, right);
    // create root
    const mid = Math.floor((left + right) / 2);
    const root = new Node(0, left, right);
    root.leftNode = this.buildTree(nums, left, mid);
    root.rightNode = this.buildTree(nums, mid + 1, right);
    root.sum = root.leftNode.sum + root.rightNode.sum;
    return root;
  }

  update(index, value, root = this.root) {
    if (root.leftIdx === index && root.rightIdx === index) {
      root.sum = value;
      return;
    }
    const mid = Math.floor((root.leftIdx + root.rightIdx) / 2);
    if (mid >= index) {
      this.update(index, value, root.leftNode);
    } else {
      this.update(index, value, root.rightNode);
    }

    root.sum = root.leftNode.sum + root.rightNode.sum;
  }

  sumRange(left, right, root = this.root) {
    if (root.leftIdx === left && root.rightIdx === right) return root.sum;

    const mid = Math.floor((root.leftIdx + root.rightIdx) / 2);

    if (right <= mid) {
      return this.sumRange(left, right, root.leftNode);
    } else if (left > mid) {
      return this.sumRange(left, right, root.rightNode);
    } else {
      return (
        this.sumRange(left, mid, root.leftNode) +
        this.sumRange(mid + 1, right, root.rightNode)
      );
    }
  }
}
