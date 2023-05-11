/**
 * Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.
 * 
 * Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]

Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]

Input: temperatures = [30,60,90]
Output: [1,1,0]
 */

// O(n) time | O(n) space
const dailyTemperatures = (temperatures) => {
  const output = new Array(temperatures.length).fill(0);
  const stack = [0];
  for (let i = 1; i < temperatures.length * 2; i++) {
    const circIdx = i % temperatures.length;
    while (
      stack.length > 0 &&
      temperatures[circIdx] > temperatures[stack[stack.length - 1]]
    ) {
      const idxRemoved = stack.pop();
      if (circIdx > idxRemoved) output[idxRemoved] = circIdx - idxRemoved;
    }
    stack.push(circIdx);
  }
  return output;
};
