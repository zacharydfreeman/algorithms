
/*
You have an unsorted array of n + 1 numbers, with the numbers from 1 to n.
One number is duplicated. Find it.
ex: [1,5,4,3,6,2,4,7] should return 4
*/

// Approach: Brute force. For every num, loop through all other nums and return if two
// numbers are equal
// O(n^2) time | O(1) space
const findDuplicate6 = (array) => {
    // loop through array starting at index 0 up until the last element exclusive
    for (let i = 0; i < array.length - 1; i++) {
        // get num1
        const num1 = array[i];
        // loop through remaing items starting at index i + 1 up until the last element inclusive
        for (let j = i + 1; j < array.length; j++) {
            // get num2
            const num2 = array[j];
            // check if equal
            if (num1 === num2) return num1;
        }
    }
}

// Approach: Sort the array. Loop through array and return the first item that doesnt
// equal its index + 1
// O(nlog(n)) time | O(1) space
const findDuplicate5 = (array) => {
    // sort the array
    array.sort((a, b) => a - b);
    // loop through array
    for (let i = 0; i < array.length; i++) {
        // if the current number does not equal the i + 1, then that means we found a duplicate
        if (array[i] !== i + 1) return array[i]
    }
}


// Approach: Keep a "seen" set to track which numbers have been seen.
// Loop through array and return the first item that is found in the seen set.
// O(n) time | O(n) space
const findDuplicate4 = (array) => {
    // declare a seen set. You could also declare a seen obj or hashmap.
    // Both gives O(1) time lookups and O(n) space
    const seen = new Set();
    // loop through array
    for (let num of array) {
        // seen has num return the number
        if (seen.has(num)) return num;
        // other just add to seen set
        seen.add(num);
    }
}

// Approach: Given the fact that we know the array starts at 1, we can find what
// the sum of the array is supposed to be. We can then take the difference of what
// the actual array sums to and what the sum of the array is supposed to be
// O(n) time | O(1) space
const findDuplicate3 = (array) => {
    // declare sum variable that will be the sum of 1 to length of array - 1
    let targetSum = 0; // this is what the sum of 1 -> n actually is
    for (let i = 1; i < array.length; i++) {
        targetSum += i;
    }
    // declare actual sum variable
    let actualSum = 0;
    for (let num of array) {
        actualSum += num;
    }
    // return actual sum minus target sum. The difference is the missing number
    return actualSum - targetSum;
}

// Approach: We can treat the array as a linked list and find the cycle
// O(n) time | O(1) space
const findDuplicate2 = (array) => {
    // declare two pointers. One fast and one slow. Initialize both to be first num in array
    let slow = array[0];
    let fast = array[0];
    // find the collision. Where slow and fast is the same AFTER the first iteration
    while (true) {
        slow = array[slow];
        fast = array[array[fast]];
        if (slow === fast) break;
    }
    // now we know where the collision is
    // so we now need to start our iteration over and see where a new slow pointer
    // intersects with the old slow
    let newSlow = array[0];
    while (newSlow !== slow) {
        newSlow = array[newSlow];
        slow = array[slow];
    }

    return newSlow;
}

// Approach: We can modify the array in place and use the fact that numbers are from 1 - n
// to our advantage. We can map them to indices in the array itself by subtracting 1 from them.
// Once you maped an integer to an index in the array, you can make it negative. So if you
// encounter a value at the index of the integer you are looking at, this is the duplicate
// O(n) time | O(1) space
const findDuplicate = (array) => {
    // loop through array
    for (let num of array) {
        // grab the value
        const val = Math.abs(num);
        // check to see if the array[val - 1] < 0, if so, this means we have found our duplicate
        if (array[val - 1] < 0) return val;
        // if above is not true, mark the value as negative and move on
        array[val - 1] *= -1;
    }
}


const nums = [1, 3, 4, 2, 2]; // => 2
const nums2 = [3, 1, 3, 4, 2]; // => 3
const nums3 = [1,5,4,3,6,2,4,7]; // => 4

console.log(findDuplicate(nums), findDuplicate(nums2), findDuplicate(nums3));
