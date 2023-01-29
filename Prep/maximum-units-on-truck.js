/*
You are assigned to put some amount of boxes onto one truck. You are given a 2D array boxTypes,
where boxTypes[i] = [numberOfBoxesi, numberOfUnitsPerBoxi]:

numberOfBoxesi is the number of boxes of type i.
numberOfUnitsPerBoxi is the number of units in each box of the type i.
You are also given an integer truckSize, which is the maximum number of boxes that
can be put on the truck. You can choose any boxes to put on the truck as long as the number of
boxes does not exceed truckSize.

Return the maximum total number of units that can be put on the truck.

Input: boxTypes = [[1,3],[2,2],[3,1]], truckSize = 4
Output: 8
Explanation: There are:
- 1 box of the first type that contains 3 units.
- 2 boxes of the second type that contain 2 units each.
- 3 boxes of the third type that contain 1 unit each.
You can take all the boxes of the first and second types, and one box of the third type.
The total number of units will be = (1 * 3) + (2 * 2) + (1 * 1) = 8.

Input: boxTypes = [[5,10],[2,5],[4,7],[3,9]], truckSize = 10
Output: 91
*/

// Approach: Greedy. Sort the boxes by quantity and take as many of the lagest ones as possible
const maximumUnits = (boxTypes, truckSize) => {
    // sort the box types by quantity
    boxTypes.sort((a, b) => b[1] - a[1]);
    // declare total and boxes available variables
    let total = 0;
    let boxesAvailable = truckSize;
    for (let box of boxTypes) {
        const [num, quantity] = box;
        // to determine the number of boxes you can take, it will be minimum of boxes available and num
        let numToTake = Math.min(num, boxesAvailable);
        total += numToTake * quantity;
        // decrement boxes availble
        boxesAvailable -= numToTake;
        // check if zero to return
        if (boxesAvailable === 0) return total;
    }
    return total
}

const boxTypes = [[5,10],[2,5],[4,7],[3,9]], truckSize = 10;
console.log(maximumUnits(boxTypes, truckSize));
