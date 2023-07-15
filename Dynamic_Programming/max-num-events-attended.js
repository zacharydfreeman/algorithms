/* 
You are given an array of events where events[i] = [startDayi, endDayi, valuei]. The ith event starts at startDayi and ends at endDayi, and if you attend this event, you will receive a value of valuei. You are also given an integer k which represents the maximum number of events you can attend.

You can only attend one event at a time. If you choose to attend an event, you must attend the entire event. Note that the end day is inclusive: that is, you cannot attend two events where one of them starts and the other ends on the same day.

Return the maximum sum of values that you can receive by attending events.

Input: events = [[1,2,4],[3,4,3],[2,3,1]], k = 2
Output: 7
Explanation: Choose the green events, 0 and 1 (0-indexed) for a total value of 4 + 3 = 7.

Input: events = [[1,2,4],[3,4,3],[2,3,10]], k = 2
Output: 10
Explanation: Choose event 2 for a total value of 10.
Notice that you cannot attend any other event as they overlap, and that you do not have to attend k events.

Input: events = [[1,1,1],[2,2,2],[3,3,3],[4,4,4]], k = 3
Output: 9
Explanation: Although the events do not overlap, you can only attend 3 events. Pick the highest valued three.

*/

// O(n*k*log(n)) time | O(n * k)
const maxValue = (events, k) => {
  // sort events by start time
  events.sort((a, b) => a[0] - b[0]);
  // memo
  const memo = {};
  // create dfs
  const dfs = (idx, remaining) => {
    const key = idx + ',' + remaining;
    if (key in memo) return memo[key];
    if (idx === events.length || remaining === 0) return 0;
    // get nextIdx
    const nextIdx = getNextIdx(events, idx);
    // take or dont take
    const take = events[idx][2] + dfs(nextIdx, remaining - 1);
    const dontTake = dfs(idx + 1, remaining);
    memo[key] = Math.max(take, dontTake);
    return memo[key];
  };
  return dfs(0, k);
};

const getNextIdx = (events, currIdx) => {
  const [currStart, currEnd, currVal] = events[currIdx];

  let l = currIdx;
  let r = events.length - 1;
  let nextIdx = events.length;

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    const [start, end, val] = events[mid];
    if (start > currEnd) {
      nextIdx = mid;
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }

  return nextIdx;
};

const events = [
    [1, 1, 1],
    [2, 2, 2],
    [3, 3, 3],
    [4, 4, 4],
  ],
  k = 3;

console.log(maxValue(events, k));
