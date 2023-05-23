/* 
You are given two lists of closed intervals, firstList and secondList, where firstList[i] = [starti, endi] and secondList[j] = [startj, endj]. Each list of intervals is pairwise disjoint and in sorted order.

Return the intersection of these two interval lists.

A closed interval [a, b] (with a <= b) denotes the set of real numbers x with a <= x <= b.

The intersection of two closed intervals is a set of real numbers that are either empty or represented as a closed interval. For example, the intersection of [1, 3] and [2, 4] is [2, 3].

Input: firstList = [[0,2],[5,10],[13,23],[24,25]], secondList = [[1,5],[8,12],[15,24],[25,26]]
Output: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]

Input: firstList = [[1,3],[5,9]], secondList = []
Output: []

*/

// O(m + n) time | O(m + n) space
const intervalIntersection = (firstList, secondList) => {
  const output = [];
  let i = 0;
  let j = 0;
  while (i < firstList.length && j < secondList.length) {
    const [fStart, fEnd] = firstList[i];
    const [sStart, sEnd] = secondList[j];

    if (sEnd > fEnd) {
      if (sStart <= fEnd) {
        output.push([Math.max(sStart, fStart), fEnd]);
      }
    } else {
      if (fStart <= sEnd) {
        output.push([Math.max(fStart, sStart), sEnd]);
      }
    }

    if (sEnd > fEnd) {
      i++;
    } else {
      j++;
    }
  }
  return output;
};

const firstList = [[3, 10]],
  secondList = [[5, 10]];

console.log(intervalIntersection(firstList, secondList));
