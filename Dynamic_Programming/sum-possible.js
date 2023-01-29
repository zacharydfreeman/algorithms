/*
Write a function sumPossible that takes in an amount and an array of positive numbers. 
The function should return a boolean indicating whether or not it is possible to create the amount by summing numbers of the array. 
You may reuse numbers of the array as many times as necessary.

You may assume that the target amount is non-negative.

sumPossible(8, [5, 12, 4]); // -> true, 4 + 4
sumPossible(15, [6, 2, 10, 19]); // -> false
 */


const sumPossible2 = (amount, numbers, idx = 0) => {
    // base cases
    if (amount === 0) return true;
    if (amount < 0) return false;
    if (idx === numbers.length) return false;
    // grab number
    const number = numbers[idx]
    // use number
    const didTake = sumPossible2(amount - number, numbers, idx + 1);
    // dont use number
    const dontTake = sumPossible2(amount, numbers, idx + 1);

    return didTake || dontTake;
}

const target = 24;
const numbers = [4, 12, 4, 4];
console.log(sumPossible2(target, numbers));





const sumPossible = (amount, numbers) => {
    // base cases
    if (amount === 0) return true;
    if (amount < 0) return false;

    for (number of numbers) {
        const newTarget = amount - number;
        if (sumPossible(target, numbers)) return true;
    }

    return false;
}