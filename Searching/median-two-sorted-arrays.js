/*
Find the median of two sorted arrays in O(log(n + m)) time
 */

// O(log(n + m)) time | O(1) space
const findMedianSortedArrays = (nums1, nums2) => {
  // declare A & B variables and assign A to the smaller of the two
  let A = nums1;
  let B = nums2;
  if (nums2.length < nums1.length) {
    A = nums2;
    B = nums1;
  }
  // declare total, half, left and right pointers
  let total = nums1.length + nums2.length;
  let half = Math.floor(total / 2);
  let l = 0;
  let r = A.length - 1;
  // until you find the median
  while (true) {
    // get A idx
    let i = Math.floor((l + r) / 2);
    // get B idx. Have to subtract by 2 in order to get the index
    let j = half - i - 2;
    // get current values for our partitions
    const Aleft = i >= 0 ? A[i] : -Infinity;
    const Aright = i + 1 < A.length ? A[i + 1] : Infinity;
    const Bleft = j >= 0 ? B[j] : -Infinity;
    const Bright = j + 1 < B.length ? B[j + 1] : Infinity;
    // if valid partition we can return median
    if (Aleft <= Bright && Bleft <= Aright) {
      if (total % 2) {
        // if array length is odd, median is min of Aright and Bright
        return Math.min(Aright, Bright);
      }
      // if array length is even, median is max of A, B left and min of A,B right divided by 2
      return (Math.max(Aleft, Bleft) + Math.min(Aright, Bright)) / 2;
    } else if (Aleft > Bright) {
      // if Aleft > Bright, we need to reduce the number of elements coming from A
      r = i - 1;
    } else {
      // otherwise, we need to increase the number of element coming from A
      l = i + 1;
    }
  }
};

