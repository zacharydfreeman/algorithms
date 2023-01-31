/*
You are given a rectangular cake of size h x w and two arrays of integers horizontalCuts and verticalCuts where:

horizontalCuts[i] is the distance from the top of the rectangular cake to the ith horizontal cut and similarly,
and
verticalCuts[j] is the distance from the left of the rectangular cake to the jth vertical cut.
Return the maximum area of a piece of cake after you cut at each horizontal and vertical position provided in
 the arrays horizontalCuts and verticalCuts. Since the answer can be a large number, return this modulo 109 + 7.

 Input: h = 5, w = 4, horizontalCuts = [1,2,4], verticalCuts = [1,3]
Output: 4
Explanation: The figure above represents the given rectangular cake. Red lines are the horizontal and vertical cuts.

After you cut the cake, the green piece of cake has the maximum area.

*/

// O(nlog(n) + mlog(m)) time | O(1) space
const maxArea = (h, w, horizontalCuts, verticalCuts) => {
  // add w and 0 to verticalCuts array
  // add h and 0 to horizontalCuts
  verticalCuts.push(0, w);
  horizontalCuts.push(0, h);
  // sort both arrays becuase it'll be easier to calc current heights and widths of rectangle
  horizontalCuts.sort((a, b) => a - b);
  verticalCuts.sort((a, b) => a - b);

  let maxWidth = 0;
  let maxHeight = 0;

  // get maxWidth
  for (let i = 1; i < verticalCuts.length; i++) {
    maxWidth = Math.max(maxWidth, verticalCuts[i] - verticalCuts[i - 1]);
  }
  // get maxHeight
  for (let i = 1; i < horizontalCuts.length; i++) {
    maxHeight = Math.max(maxHeight, horizontalCuts[i] - horizontalCuts[i - 1]);
  }

  return (BigInt(maxWidth) * BigInt(maxHeight)) % 1000000007n;
};

const h = 5,
  w = 4,
  horizontalCuts = [1, 2, 4],
  verticalCuts = [1, 3];
console.log(maxArea(h, w, horizontalCuts, verticalCuts));
