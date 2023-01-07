/*
Write a function that takes in a sorted array of integers as well as a target integer.
The function should use a variation of the Binary Search algorithm to find a range of indices in between which the
target numbers is contained in the array and should return this range in the form of an array.

The first number in the output array should represent the first index at which the target number is located, while
the second number should represent the last index at which the target is located.
The function should rturn [-1, -1] if the integer isnt contained in the array

Input: array = [0, 1, 21, 33, 45, 45, 45, 45, 45, 45, 61, 71, 73]
target = 45

Output: [4, 9]

*/

// Approach: we will use binary search twice. Once to find the left most index. Once to find the right most index
// O(log(n)) time | O(1) space where n is length of the array. This is cleaner solution than the second one
const searchForRange = (array, target) => {
    const leftIdx = specialBinarySearch(array, target, true); // Use binary search to find left most Idx
    const rightIdx = specialBinarySearch(array, target, false); // use binary search to find right most Idx
    return [leftIdx, rightIdx];
}

const specialBinarySearch = (array, target, goLeft) => {
    let left = 0;
    let right = array.length - 1;
    // initialize idx = -1 in case we dont find the target
    let idx = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (array[mid] === target) {
            idx = mid;
            if (goLeft) {
                right = mid - 1; // if we are going left we have to change the right pointer
            } else {
                left = mid + 1; // if we are not going left (i.e going right) we have to chnage the left pointer
            }
        } else if (array[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return idx;
}


// O(log(n)) time | O(1) space
const searchForRange2 = (array, target) => {
    // Use binary search to find the left Idx;
    let left = 0;
    let right = array.length - 1;
    let leftIdx = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (array[mid] === target) {
            leftIdx = mid;
            right = mid - 1; // we have to continue on even if we found target to make sure we get left most idx
        } else if (array[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    // update variables to start binary search to find right Idx
    left = 0;
    right = array.length - 1;
    let rightIdx = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (array[mid] === target) {
            rightIdx = mid;
            left = mid + 1; // we have to continue on even if we found target to make sure we get right most idx
        } else if (array[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return [leftIdx, rightIdx];
}
