/* 
A set of real numbers can be represented as the union of several disjoint intervals, where each interval is in the form [a, b). A real number x is in the set if one of its intervals [a, b) contains x (i.e. a <= x < b).

You are given a sorted list of disjoint intervals intervals representing a set of real numbers as described above, where intervals[i] = [ai, bi] represents the interval [ai, bi). You are also given another interval toBeRemoved.

Return the set of real numbers with the interval toBeRemoved removed from intervals. In other words, return the set of real numbers such that every x in the set is in intervals but not in toBeRemoved. Your answer should be a sorted list of disjoint intervals as described above.

Input: intervals = [[0,2],[3,4],[5,7]], toBeRemoved = [1,6]
Output: [[0,1],[6,7]]

Input: intervals = [[0,5]], toBeRemoved = [2,3]
Output: [[0,2],[3,5]]

Input: intervals = [[-5,-4],[-3,-2],[1,2],[3,5],[8,9]], toBeRemoved = [-1,4]
Output: [[-5,-4],[-3,-2],[4,5],[8,9]]

*/

// O(n) time | O(n) space
const removeInterval = (intervals, toBeRemoved) => {
  const output = [];
  for (let i = 0; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    const [removeStart, removeEnd] = toBeRemoved;
    if (start > removeEnd || end < removeStart) {
      output.push(intervals[i]);
    } else {
      if (start < removeStart) output.push([start, removeStart]);
      if (removeEnd < end) output.push([removeEnd, end]);
    }
  }
  return output;
};
