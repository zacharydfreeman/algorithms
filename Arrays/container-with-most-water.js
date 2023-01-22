/*

You are given an integer array height of length n.
There are n vertical lines drawn such that the two endpoints of the ith
line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container
contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.


Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7].
In this case, the max area of water (blue section) the container can contain is 49.


Input: height = [1,1]
Output: 1

[1, 8, 8, 8, 8, 8, 8, 8, 8] left maxs
[8, 8, 8, 8, 8, 8, 8, 7, 7] right maxs
[8, ]
[1, 8, 6, 2, 5, 4, 8, 3, 7] current height
*/

// Approach: assume at every index that is the building that will form the largest rectangle

// O(n) time | O(1) space
const maxArea = (heights) => {
    // declare two pointers and maxarea variable
    let l = 0;
    let r = heights.length - 1;
    let maxArea = 0;
    while (l < r) {
        // area at current point is min of the heights times width
        // update max
        maxArea = Math.max(maxArea, Math.min(heights[l], heights[r]) * (r - l));
        if (heights[l] < heights[r]) {
            l++;
        } else {
            r--;
        }
    }
    return maxArea;
}


// O(n^2) time | O(n) space
const maxArea2 = (heights) => {
    const leftMax = new Array(heights.length);
    let currentLeftMaxHeight = -Infinity;
    for (let i = 0; i < heights.length; i++) {
        currentLeftMaxHeight = Math.max(currentLeftMaxHeight, heights[i]);
        leftMax[i] = currentLeftMaxHeight;
    }

    const rightMax = new Array(heights.length);
    let currentRightMaxHeight = -Infinity
    for (let i = heights.length - 1; i >= 0; i--) {
        currentRightMaxHeight = Math.max(currentRightMaxHeight, heights[i]);
        rightMax[i] = currentRightMaxHeight;
    }

    let maxArea = 0;
    let idx = 0;
    while (idx < heights.length) {
        const currentHeight = heights[idx];

        let leftIdx = idx - 1;
        while (leftIdx >=0 && leftMax[leftIdx] >= currentHeight) {
            leftIdx--;
        }

        let rightIdx = idx + 1;
        while (rightIdx < heights.length && rightMax[rightIdx] >= currentHeight) {
            rightIdx++;
        }

        let width = rightIdx - leftIdx - 2;
        maxArea = Math.max(maxArea, width * currentHeight);
        idx++;
    }

    return maxArea;

}
