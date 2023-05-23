/*
Write a program to count the number of days between two dates.

The two dates are given as strings, their format is YYYY-MM-DD as shown in the examples.

Input: date1 = "2019-06-29", date2 = "2019-06-30"
Output: 1

Input: date1 = "2020-01-15", date2 = "2019-12-31"
Output: 15
 */

// O(1) time | O(1) space
const daysBetweenDates = (date1, date2) => {
  const millisecondsInADay = 1000 * 60 * 60 * 24;
  return Math.abs(
    (new Date(date1).getTime() - new Date(date2).getTime()) / millisecondsInADay
  );
};
