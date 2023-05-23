/* 
We are given a list schedule of employees, which represents the working time for each employee.

Each employee has a list of non-overlapping Intervals, and these intervals are in sorted order.

Return the list of finite intervals representing common, positive-length free time for all employees, also in sorted order.

(Even though we are representing Intervals in the form [x, y], the objects inside are Intervals, not lists or arrays. For example, schedule[0][0].start = 1, schedule[0][0].end = 2, and schedule[0][0][0] is not defined).  Also, we wouldn't include intervals like [5, 5] in our answer, as they have zero length.

Input: schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]
Output: [[3,4]]
Explanation: There are a total of three employees, and all common
free time intervals would be [-inf, 1], [3, 4], [10, inf].
We discard any intervals that contain inf as they aren't finite.

Input: schedule = [[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]
Output: [[5,6],[7,9]]

*/

// O(nlog(n)) time | O(n) space
const employeeFreeTime = (schedule) => {
  const intervals = [];

  for (let employee of schedule) {
    for (let interval of employee) {
      intervals.push([interval.start, interval.end]);
    }
  }
  intervals.sort((a, b) => a[0] - b[0]);
  const stack = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const [lastStart, lastEnd] = stack.pop();
    const [curStart, curEnd] = intervals[i];

    if (curStart <= lastEnd) {
      stack.push([Math.min(lastStart, curStart), Math.max(lastEnd, curEnd)]);
    } else {
      stack.push([lastStart, lastEnd], [curStart, curEnd]);
    }
  }

  const output = [];
  for (let i = 1; i < stack.length; i++) {
    const interval = new Interval(stack[i - 1][1], stack[i][0]);
    output.push(interval);
  }

  return output;
};
