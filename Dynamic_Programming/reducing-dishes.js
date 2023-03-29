/**
 * A chef has collected data on the satisfaction level of his n dishes. Chef can cook any dish in 1 unit of time.

Like-time coefficient of a dish is defined as the time taken to cook that dish including previous dishes multiplied by its satisfaction level i.e. time[i] * satisfaction[i].

Return the maximum sum of like-time coefficient that the chef can obtain after dishes preparation.

Dishes can be prepared in any order and the chef can discard some dishes to get this maximum value.

Input: satisfaction = [-1,-8,0,5,-9]
Output: 14
Explanation: After Removing the second and last dish, the maximum total like-time coefficient will be equal to (-1*1 + 0*2 + 5*3 = 14).
Each dish is prepared in one unit of time.

Input: satisfaction = [4,3,2]
Output: 20
Explanation: Dishes can be prepared in any order, (2*1 + 3*2 + 4*3 = 20)

Input: satisfaction = [-1,-4,-5]
Output: 0
Explanation: People do not like the dishes. No dish is prepared.
 * 
 */

// Approach: Sort
// O(log(n)) time | O(1) space
const maxSatisfaction = (satisfaction) => {
  // sort is descending order
  satisfaction.sort((a, b) => b - a);
  // declare max and sum variables
  let max = 0;
  let sum = 0;
  for (let score of satisfaction) {
    // add score to sum
    sum += score;
    // sum is less than 0, it will decrease max so break
    if (sum < 0) break;
    // add current sum to max
    max += sum;
  }
  // return max
  return max;
};
