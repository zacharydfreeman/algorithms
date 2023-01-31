/*

There are 4 students whose class ranks are [ 2,3,1,4] .
A group imbalance is when there exists a sequence where arr[i+1] - arr[i] > 1 . Find all imbalances in all possible sequences

<> We need to consider contiguous sequence and NOT sub squence .
Also we only need the total imbalance (integer) as the answer and not all the possible sequences

100 < n < 10^5

Eg n = 4
arr = [2,3,1,4]
Possible subarray groups | rearranging | Imbalance
[2] [2] 0
[3] [3] 0
[1] [1] 0
[4] [4] 0
[2,3] [2,3] 0
[3,1] [1,3] 1 ( 3-1 = 2 >1)
[1,4] [1,4] 1 (4-1 = 3 > 1)
[2,3,1] [1,2,3] 0
[3,1,4] [1,3,4] 1(3-1 =2 >1)
[2,3,1,4] [1,2,3,4] 0

Answe total imbalance = 3
 */

// O(n^3log(n)) time | O(n) space
const imbalance = (ranks) => {
  let count = 0;
  for (let i = 0; i < ranks.length - 1; i++) {
    for (let j = i + 1; j < ranks.length; j++) {
      const arr = ranks.slice(i, j + 1);
      arr.sort((a, b) => a - b);
      for (let k = 1; k < arr.length; k++) {
        if (arr[k] - arr[k - 1] > 1) count++;
      }
    }
  }
  return count;
};
