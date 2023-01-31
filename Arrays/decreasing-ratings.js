/*
There is a new product launched and its customer ratings are being recorded in an array.
The ratings are being monitored and analyzed if there is any decrease in the ratings.
Find the number of periods in which the rating is consecutively decreasing.

The rating is consecutively decreasing if it has the form: r, r - 1, r - 2 and so on

Example - Ratings = [4,3,5,4,3]
Periods (in other words sub arrays in which ratings are decreasing):
One day periods = [4],[3],[5],[4],[3] (count of subarrays is 5)
Two day periods = [4,3],[5,4],[4,3] (count of subarrays is 3)
3 day periods = [5,4,3] (count of subarrays is 1)
So, the output for this example will be 9 (5 + 3 + 1)

Ratings = [2, 1, 3] => 4
Ratings = [4, 2, 3, 1] => 4

*/

// Approach: two pointers
const decreasingRatings = (ratings) => {
  // declare a count variable
  let count = 0;
  // declare two pointer that will be start and end of subarray
  let i = 0;
  let j = 1;
  while (j < ratings.length) {
    // if rating is consecutively decreasing, it is in the same group
    if (ratings[j - 1] - ratings[j] === 1) {
      count += j - i;
    } else {
      // update pointers
      i = j;
    }
    j++;
  }
  return count + ratings.length;
};

const ratings1 = [4, 3, 5, 4, 3]; // 9
const ratings2 = [2, 1, 3]; // 4
const ratings3 = [4, 2, 3, 1]; // 4
console.log(decreasingRatings(ratings1));
console.log(decreasingRatings(ratings2));
console.log(decreasingRatings(ratings3));
