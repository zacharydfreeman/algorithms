/*
A conveyor belt has packages that must be shipped from one port to another within days days.

The ith package on the conveyor belt has a weight of weights[i].
Each day, we load the ship with packages on the conveyor belt (in the order given by weights). We may not load more weight than the maximum weight capacity of the ship.

Return the least weight capacity of the ship that will result in all the packages on the
conveyor belt being shipped within days days.

Input: weights = [1,2,3,4,5,6,7,8,9,10], days = 5
Output: 15
Explanation: A ship capacity of 15 is the minimum to ship all the packages in 5 days like this:
1st day: 1, 2, 3, 4, 5
2nd day: 6, 7
3rd day: 8
4th day: 9
5th day: 10

Note that the cargo must be shipped in the order given, so using a ship of capacity 14 and splitting the packages into parts like (2, 3, 4, 5), (1, 6, 7), (8), (9), (10) is not allowed.

Input: weights = [3,2,2,4,1,4], days = 3
Output: 6
Explanation: A ship capacity of 6 is the minimum to ship all the packages in 3 days like this:
1st day: 3, 2
2nd day: 2, 4
3rd day: 1, 4
*/

// Approach: Get lower and upper bounds and then perform binary search
// O(nlog(n)) time | O(1) space
const shipWithinDays = (weights, days) => {
    // declare two pointers to be max weight in weights array and total sum
    let l = Math.max(...weights);
    let r = weights.reduce((total, weight) => total += weight);
    let minWeight = Infinity;
    // while l <= r
    while (l <= r) {
        // get midpoint weight
        const capacity = Math.floor((l + r) / 2);
        // check if valid
        if (isValid(weights, days, capacity)) {
            // update minWeight if necessary
            minWeight = Math.min(minWeight, capacity);
            // update r pointers because the current capacity may not be the minimum
            r = capacity - 1;
        } else {
            l = capacity + 1;
        }
    }
    return minWeight
};

const isValid = (weights, days, capacity) => {
    // declare days and intialize to 1
    let currentDays = 1;
    let currentCap = capacity;
    // iterate through weights
    for (let weight of weights) {
        // check to see if current cap minus weight is < 0
        if (currentCap - weight < 0) {
            currentDays++;
            currentCap = capacity
        }
        currentCap -= weight;
    }

    return currentDays <= days;
}
