/*
Amazon logistics has multiple delivery centers from which products are sent.

In one such delivery center, parcels are placed in a sequence where the i-th parcel has a weight of weight[i]. 
A shipment is constituted of a contiguous segment of parcels. The shipment imbalance of a shipment is defined 
as the difference between the max and min weights within a shipment.

Given the arrangement of parcels, find the sum of shipment imbalance of all the shipments that can be formed 
from the given sequence of parcels.

Input:
List arrangement = {1, 2, 3}

output: 4
diff1 = 1 - 1 = 0;
diff2 = 2 - 2 = 0;
diff3 = 3 - 3 = 0;
diff4 = 2 - 1 = 1;
diff5 = 3 - 2 = 1;
diff6 = 3 - 1 = 2;
 */

// Approach: This is subarray ranges problem
const shipmentImbalance = (parcels) => {
    // declare count variable
    let count = 0;
    for (let i = 0; i < parcels.length; i++) {
        // declare max and min variabes
        let max = parcels[i];
        let min = parcels[i];
        for (let j = i + 1; j < parcels.length; j++) {
            max = Math.max(max, parcels[j]);
            min = Math.min(min, parcels[j]);
            count += max - min;
        }
    }
    return count;
}

console.log(shipmentImbalance([1, 2, 3, 4]));
