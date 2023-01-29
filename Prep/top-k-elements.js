/*
Given an integer array nums and an integer k, return the k most frequent elements.
You may return the answer in any order.

Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]

Input: nums = [1], k = 1
Output: [1]
*/

const topKFrequent = (nums, k) => {
    // declare nums and bucket array
    const numsMap = {};
    const buckets = [];
    // create nums map
    for (let num of nums) {
        numsMap[num] = numsMap[num] + 1 || 1
    }
    // create buckets. Index will be frequence and value will be a set of the numbers that have that frequency
    for (let [key, value] of Object.entries(numsMap)) {
        if (!buckets[value]) {
            buckets[value] = new Set().add(key);
        } else {
            buckets[value].add(key)
        }
    }
    // declare output variable
    const output = [];
    // loop through buckets going backwards
    for (let i = buckets.length - 1; i >= 0; i--) {
        if (buckets[i]) {
            output.push(...buckets[i]);
            if (output.length === k) break;
        }
    }

    return output;
}

const nums = [1, 1, 1, 2, 2, 3];
const k = 2;
console.log(topKFrequent(nums, k));
