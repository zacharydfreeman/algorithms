/*
Given an array of intervals intervals where intervals[i] = [starti, endi],
return the minimum number of intervals you need to remove to make the rest of the intervals
non-overlapping.

Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.

Input: intervals = [[1,2],[1,2],[1,2]]
Output: 2
Explanation: You need to remove two [1,2] to make the rest of the intervals non-overlapping.

Input: intervals = [[1,2],[2,3]]
Output: 0
Explanation: You don't need to remove any of the intervals since they're already non-overlapping.

 */

// Approach: We can sort the intervals and then take a greedy approach. Removing the biggest interval
// if there is overlap (i.e the interval with the greater end time)
// O(nlog(n)) time | O(1) space
const eraseOverlapIntervals = (intervals) => {
    // sort intervals
    intervals.sort((a, b) => a[0] - b[0]);
    // declare a last interval variable to be first interval of intervals array and removed variable
    let lastInterval = intervals[0]; // will be what interval you need to compare current interval in array to
    let removed = 0;
    // loop through sorted intervals
    for (let i = 1; i < intervals.length; i++) {
        // get last and current interval
        const [_, lastEnd] = lastInterval;
        const [currentStart, currentEnd] = intervals[i];
        // see if there is overlap
        if (currentStart < lastEnd) {
            // there is overlap, so increment removed counter
            removed++;
            // update last interval to be whichever has the smaller end value
            lastInterval = currentEnd < lastEnd  ? intervals[i] : lastInterval;
        } else {
            lastInterval = intervals[i];
        }
    }
    return removed;
}
