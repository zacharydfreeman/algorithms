/*

You are given an array of non-overlapping intervals intervals where
intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals
is sorted in ascending order by starti. You are also given an interval newInterval = [start, end]
that represents the start and end of another interval.

Insert newInterval into intervals such that intervals is still sorted in ascending order
by starti and intervals still does not have any overlapping intervals
(merge overlapping intervals if necessary).

Return intervals after the insertion.

Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]

Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

 */

// Approach: Cleaner code than second solution. Same premise
// O(n) time | O(n) space
const insertInterval = (intervals, newInterval) => {
  // declare merged intervals variable to be empty array
  const mergedIntervals = [];
  // loop through intervals
  for (let i = 0; i < intervals.length; i++) {
    // we need to check for 3 conditions
    // if new interval comes before the rest of intervals in array
    if (newInterval[1] < intervals[i][0]) {
      mergedIntervals.push(newInterval);
      return mergedIntervals.concat(intervals.slice(i));
    } else if (newInterval[0] > intervals[i][1]) {
      mergedIntervals.push(intervals[i]);
    } else {
      // update new interval because there is overlap with current interval in array
      newInterval = [
        Math.min(newInterval[0], intervals[i][0]),
        Math.max(newInterval[1], intervals[i][1]),
      ];
    }
  }
  // push newInterval after done with loop
  mergedIntervals.push(newInterval);
  return mergedIntervals;
};

// Approach: Insert new interval into intervals at correct position and then merge.
// Uses recursive helper function
// O(n) time | O(n) space
const insertInterval2 = (intervals, newInterval) => {
  // recursive helper function to place new interbal into intervals array at correct position
  addInterval(intervals, newInterval);
  // merge intervals using stack
  const mergedIntervals = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    // get last interval on stack
    const [lastStart, lastEnd] = mergedIntervals.pop();
    const [currentStart, currentEnd] = intervals[i];
    // check to see if current start is less than last end
    if (currentStart <= lastEnd) {
      // new interval will depend on last interval end and current interval end
      const newInterval = [
        Math.min(lastStart, currentStart),
        Math.max(lastEnd, currentEnd),
      ];
      mergedIntervals.push(newInterval);
    } else {
      // add both intervals to stack if there is no overlap
      mergedIntervals.push([lastStart, lastEnd]);
      mergedIntervals.push([currentStart, currentEnd]);
    }
  }
  return mergedIntervals;
};

const addInterval = (intervals, newInterval) => {
  // base case => if stack length is 0 and
  // start of new interval > start of last start interval on stack
  // push to stack
  if (
    intervals.length === 0 ||
    intervals[intervals.length - 1][0] < newInterval[0]
  ) {
    intervals.push(newInterval);
    return;
  }
  // pop last item off stack
  const removedInterval = intervals.pop();
  // recursiely call function with smaller intervals stack
  addInterval(intervals, newInterval);
  // add back the removed interval
  intervals.push(removedInterval);
};
