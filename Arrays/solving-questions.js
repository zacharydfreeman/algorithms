/* 
You are given a 0-indexed 2D integer array questions where questions[i] = [pointsi, brainpoweri].

The array describes the questions of an exam, where you have to process the questions in order (i.e., starting from question 0) and make a decision whether to solve or skip each question. Solving question i will earn you pointsi points but you will be unable to solve each of the next brainpoweri questions. If you skip question i, you get to make the decision on the next question.

For example, given questions = [[3, 2], [4, 3], [4, 4], [2, 5]]:
If question 0 is solved, you will earn 3 points but you will be unable to solve questions 1 and 2.
If instead, question 0 is skipped and question 1 is solved, you will earn 4 points but you will be unable to solve questions 2 and 3.
Return the maximum points you can earn for the exam.

Input: questions = [[3,2],[4,3],[4,4],[2,5]]
Output: 5
Explanation: The maximum points can be earned by solving questions 0 and 3.
- Solve question 0: Earn 3 points, will be unable to solve the next 2 questions
- Unable to solve questions 1 and 2
- Solve question 3: Earn 2 points
Total points earned: 3 + 2 = 5. There is no other way to earn 5 or more points.

Input: questions = [[1,1],[2,2],[3,3],[4,4],[5,5]]
Output: 7
Explanation: The maximum points can be earned by solving questions 1 and 4.
- Skip question 0
- Solve question 1: Earn 2 points, will be unable to solve the next 2 questions
- Unable to solve questions 2 and 3
- Solve question 4: Earn 5 points
Total points earned: 2 + 5 = 7. There is no other way to earn 7 or more points.

*/

// Approach: 1D DP with Tabulation
// O(n) time | O(n) space
const mostPoints = (questions) => {
  const dp = questions.map((question) => question[0]);
  for (let i = questions.length - 2; i >= 0; i--) {
    const nextIdx = i + questions[i][1] + 1;
    const nextVal = nextIdx < dp.length ? dp[nextIdx] : -Infinity;
    dp[i] = Math.max(dp[i], dp[i + 1], dp[i] + nextVal);
  }
  return dp[0];
};

// Apprach: DP with recursion & memoization
// O(n) time | O(n) space
const mostPoints2 = (questions, idx = 0, memo = {}) => {
  if (idx >= questions.length) return 0;
  if (idx in memo) return memo[idx];
  const currentPoints = questions[idx][0];
  const nextIdx = idx + questions[idx][1] + 1;
  memo[idx] = Math.max(
    mostPoints2(questions, idx + 1, memo),
    currentPoints + mostPoints2(questions, nextIdx, memo)
  );
  return memo[idx];
};
