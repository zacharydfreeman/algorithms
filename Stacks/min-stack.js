/*
Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the MinStack class:

MinStack() initializes the stack object.
void push(int val) pushes the element val onto the stack.
void pop() removes the element on the top of the stack.
int top() gets the top element of the stack.
int getMin() retrieves the minimum element in the stack.
You must implement a solution with O(1) time complexity for each function.

Input
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

Output
[null,null,null,null,-3,null,0,-2]

Explanation
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2

*/

// Approach: every time you push you want to push number and what the current value is
class MinStack {
  constructor() {
    this.stack = [];
  }

  push(val) {
    if (!this.stack.length) {
      this.stack.push([val, val]);
    } else {
      const min = this.getMin();
      this.stack.push([val, Math.min(min, val)]);
    }
  }

  pop() {
    this.stack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1][0];
  }

  getMin() {
    return this.stack[this.stack.length - 1][1];
  }
}

const myMinStack = new MinStack();
myMinStack.push(5);
myMinStack.push(1);
myMinStack.push(8);
myMinStack.push(-100);
myMinStack.pop();

console.log(myMinStack.getMin());
