/*
You are given an array nums consisting of positive integers.

You are also given an integer array queries of size m. For the ith query, you want to make all of the elements of nums equal to queries[i]. You can perform the following operation on the array any number of times:

Increase or decrease an element of the array by 1.
Return an array answer of size m where answer[i] is the minimum number of operations to make all elements of nums equal to queries[i].

Note that after each query the array is reset to its original state.

*/

// O(n * m) time | O(m) space where n is length of nums and m is length of queries
// This times out on leetcode. Use prefix sums and binary search to cut down time complexity
const minOperations2 = (nums, queries) => {
  let ans = [];
  for (let query of queries) {
    let sum = 0;
    for (let num of nums) {
      sum += Math.abs(query - num);
    }
    ans.push(sum);
  }
  return ans;
};
