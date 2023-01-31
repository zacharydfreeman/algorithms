/*
Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals,
and return an array of the non-overlapping intervals that cover all the intervals in the input.

Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].

*/

// O(nlog(n)) time | O(n) space
const merge = (intervals) => {
  // first sort intervals by their start times
  intervals.sort((a, b) => a[0] - b[0]);
  // declare a stack that will ultimately be the merged interval
  const mergedIntervals = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const [lastIntervalStart, lastIntervalEnd] = mergedIntervals.pop();
    const [currentIntervalStart, currentIntervalEnd] = intervals[i];
    // check to see if current start is before current end
    if (currentIntervalStart <= lastIntervalEnd) {
      // new interval will be min of starts and max of ends
      const newInterval = [
        Math.min(lastIntervalStart, currentIntervalStart),
        Math.max(lastIntervalEnd, currentIntervalEnd),
      ];
      mergedIntervals.push(newInterval);
    } else {
      // case where intervals dont overlap add back to stack both intervals
      mergedIntervals.push([lastIntervalStart, lastIntervalEnd]);
      mergedIntervals.push([currentIntervalStart, currentIntervalEnd]);
    }
  }
  return mergedIntervals;
};
