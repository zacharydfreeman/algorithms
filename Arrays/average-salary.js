/**
 * You are given an array of unique integers salary where salary[i] is the salary of the ith employee.

Return the average salary of employees excluding the minimum and maximum salary. Answers within 10-5 of the actual answer will be accepted.

Input: salary = [4000,3000,1000,2000]
Output: 2500.00000
Explanation: Minimum salary and maximum salary are 1000 and 4000 respectively.
Average salary excluding minimum and maximum salary is (2000+3000) / 2 = 2500

Input: salary = [1000,2000,3000]
Output: 2000.00000
Explanation: Minimum salary and maximum salary are 1000 and 3000 respectively.
Average salary excluding minimum and maximum salary is (2000) / 1 = 2000
 */

// O(n) time | O(1) space
const average = (salary) => {
  // find the min and max
  const min = Math.min(...salary);
  const max = Math.max(...salary);
  let sum = 0;
  for (let num of salary) {
    if (num === min || num === max) continue;
    sum += num;
  }
  return sum / (salary.length - 2);
};
