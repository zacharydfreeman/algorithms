/*
Write a function that take in an array of integers representing a stack, recursively sorts the stack
in place and returns in.

The array must be treated as a stack. You are only allowed to pop, push and peek

You're not allowed to perform any other operation on the input array, including accessing elements (except for the lat)
moving elements. You're also not allowed to ues any other data structures and your solution must be recursive

*/
// O(n^2) time | O(n) space
const sortStack = (stack) => {
    // base case if stack length = 1 return stack
    if (stack.length === 0) return stack;
    // grab the top becuase we know we need to make the stack smaller
    const top = stack.pop();
    // recursively call on remaining stack
    sortStack(stack);
    // call helper sort method with stack and top in order to place it in correct position
    sort(stack, top);
    return stack;
}

const sort = (stack, top) => {
    // base case if length is 0 or top is greater than last element in stack, push to stack
    if (stack.length === 0 || top >= stack[stack.length - 1]) {
        stack.push(top);
        return;
    }
    // remove top of stack
    const currentTop = stack.pop();
    // recursively call function with smaller stack and same top. This will put the top in correct position
    sort(stack, top)
    // add back the current top
    stack.push(currentTop)
}
