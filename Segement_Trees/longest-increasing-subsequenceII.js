/* 
You are given an integer array nums and an integer k.

Find the longest subsequence of nums that meets the following requirements:

The subsequence is strictly increasing and
The difference between adjacent elements in the subsequence is at most k.
Return the length of the longest subsequence that meets the requirements.

A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

Input: nums = [4,2,1,4,3,4,5,8,15], k = 3
Output: 5
Explanation:
The longest subsequence that meets the requirements is [1,3,4,5,8].
The subsequence has a length of 5, so we return 5.
Note that the subsequence [1,3,4,5,8,15] does not meet the requirements because 15 - 8 = 7 is larger than 3.

Input: nums = [7,4,5,1,8,12,4,7], k = 5
Output: 4
Explanation:
The longest subsequence that meets the requirements is [4,5,8,12].
The subsequence has a length of 4, so we return 4.

Input: nums = [1,5], k = 1
Output: 1
Explanation:
The longest subsequence that meets the requirements is [1].
The subsequence has a length of 1, so we return 1.

*/

const lengthOfLIS = (nums, k) => {
  // create segment tree instance
  const segmentTree = new SegmentTree(nums);
  // declare max variable
  let max = 0;
  for (let num of nums) {
    // query the max of 0 and num - k -> num -1
    const length = 1 + segmentTree.query(Math.max(0, num - k), num - 1);
    // update the current num to have the calcuated length
    segmentTree.update(num, length);
    // max logic
    max = Math.max(max, length);
  }
  /// return max
  return max;
};

class Node {
  constructor(num, leftBound, rightBound) {
    this.num = num; // number
    this.maxLength = 0; // length of subsequence ending at this number
    this.leftBound = leftBound;
    this.rightBound = rightBound;
    this.left = null; // left node
    this.right = null; // right node
  }
}

class SegmentTree {
  constructor(nums) {
    // build segment tree from a range of [0, max(nums)]
    this.segmentTree = this.buildTree(0, Math.max(...nums));
  }

  buildTree(min, max) {
    if (min === max) return new Node(min, min, min);
    const mid = Math.floor((min + max) / 2);
    const root = new Node(mid, min, max);
    root.left = this.buildTree(min, mid);
    root.right = this.buildTree(mid + 1, max);
    return root;
  }

  update(num, value, current = this.segmentTree) {
    if (current.leftBound === num && current.rightBound === num) {
      current.maxLength = value;
      return;
    }

    const mid = Math.floor((current.leftBound + current.rightBound) / 2);
    if (num > mid) {
      this.update(num, value, current.right);
    } else {
      this.update(num, value, current.left);
    }
    // propogate the new maxLength up the tree
    current.maxLength = Math.max(
      current.left.maxLength,
      current.right.maxLength
    );
  }

  query(left, right, current = this.segmentTree) {
    if (current.leftBound === left && current.rightBound === right)
      return current.maxLength;
    if (right < current.leftBound || left > current.rightBound) return 0;
    const mid = Math.floor((current.leftBound + current.rightBound) / 2);
    if (left > mid) {
      return this.query(left, right, current.right);
    } else if (right <= mid) {
      return this.query(left, right, current.left);
    } else {
      return Math.max(
        this.query(left, mid, current.left),
        this.query(mid + 1, right, current.right)
      );
    }
  }
}

// O(n^2) time | O(n) space
const lengthOfLIS2 = (nums, k) => {
  // initialize dp array
  const dp = new Array(nums.length).fill(1);
  // declare max variable
  let max = 1;
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      // check our increasing subsequence condition
      if (nums[i] > nums[j] && nums[i] - nums[j] <= k) {
        // update dp[i]
        dp[i] = Math.max(dp[i], 1 + dp[j]);
      }
    }
    // update max variable
    max = Math.max(max, dp[i]);
  }
  // return max
  return max;
};

const nums = [7, 4, 5, 1, 8, 12, 4, 7],
  k = 5;
console.log(lengthOfLIS(nums, k));
