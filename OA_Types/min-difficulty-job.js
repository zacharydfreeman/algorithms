/*
You want to schedule a list of jobs in d days.
Jobs are dependent (i.e To work on the ith job, you have to finish all the jobs j where 0 <= j < i).

You have to finish at least one task every day.
The difficulty of a job schedule is the sum of difficulties of each day of the d days. The difficulty of a day is the maximum difficulty of a job done on that day.

You are given an integer array jobDifficulty and an integer d. The difficulty of the ith job is jobDifficulty[i].

Return the minimum difficulty of a job schedule. If you cannot find a schedule for the jobs return -1.

Input: jobDifficulty = [6,5,4,3,2,1], d = 2
Output: 7
Explanation: First day you can finish the first 5 jobs, total difficulty = 6.
Second day you can finish the last job, total difficulty = 1.
The difficulty of the schedule = 6 + 1 = 7

Input: jobDifficulty = [9,9,9], d = 4
Output: -1
Explanation: If you finish a job per day you will still have a free day. you cannot find a schedule for the given jobs.

Input: jobDifficulty = [1,1,1], d = 3
Output: 3
Explanation: The schedule is one job per day. total difficulty will be 3.
 */

// [6,5,4,3,2,1], d = 2
// O(n^2 * d) time | O(n * d) space where n is length of job difficulty array and d is # of days
const minDifficulty = (jobDifficulty, d) => {
  let ans = _minDifficulty(jobDifficulty, d);
  return ans === Infinity ? -1 : ans;
};

const _minDifficulty = (jobDifficulty, d, idx = 0, memo = {}) => {
  // memoize
  const key = d + "," + idx;
  if (key in memo) return memo[key];
  // if d = 0, return 0
  if (d === 1) return Math.max(...jobDifficulty.slice(idx));
  // declare min difficulty
  let ans = Infinity;
  // declare max difficulty for the current day
  let max = 0;
  // determine where to end the day and make recursive call;
  for (let j = 1; j < jobDifficulty.length; j++) {
    // if out of bounds continue;
    if (idx + j >= jobDifficulty.length) break;
    // get max difficulty of the day
    max = Math.max(max, jobDifficulty[j + idx - 1]);
    // make recursive call. This will give me back sum of max dif of other days
    const result = _minDifficulty(jobDifficulty, d - 1, idx + j, memo);
    ans = Math.min(ans, max + result);
  }
  memo[key] = ans;
  return memo[key];
};

const job1 = [6, 1, 5, 2, 4, 3],
  d1 = 2; // 9
const job2 = [6, 5, 4, 3, 2, 1],
  d2 = 2; // 7
const job3 = [1, 1, 1],
  d3 = 3; // 3
const job4 = [2, 1, 1],
  d4 = 4; // -1
const job5 = [11, 111, 22, 222, 33, 333, 44, 444],
  d5 = 6; // 843

console.log(minDifficulty(job5, d5));
console.log(minDifficulty(job1, d1));
console.log(minDifficulty(job2, d2));
console.log(minDifficulty(job3, d3));
console.log(minDifficulty(job4, d4));
