/* Implement a stack class*/

class Stack {
  constructor() {
    this.stack = new Array();
  }

  push(n) {
    this.stack.push(n);
  }

  pop() {
    return this.stack.pop();
  }

  size() {
    return this.stack.length;
  }
}
