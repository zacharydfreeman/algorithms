/* 
You are given a nested list of integers nestedList. Each element is either an integer or a list whose elements may also be integers or other lists. Implement an iterator to flatten it.

Implement the NestedIterator class:

NestedIterator(List<NestedInteger> nestedList) Initializes the iterator with the nested list nestedList.
int next() Returns the next integer in the nested list.
boolean hasNext() Returns true if there are still some integers in the nested list and false otherwise.
Your code will be tested with the following pseudocode:

initialize iterator with nestedList
res = []
while iterator.hasNext()
    append iterator.next() to the end of res
return res

Input: nestedList = [[1,1],2,[1,1]]
Output: [1,1,2,1,1]
Explanation: By calling next repeatedly until hasNext returns false, the order of elements returned by next should be: [1,1,2,1,1].

Input: nestedList = [1,[4,[6]]]
Output: [1,4,6]
Explanation: By calling next repeatedly until hasNext returns false, the order of elements returned by next should be: [1,4,6].

*/

class NestedIterator {
  constructor(nestedList) {
    this.stack = [[nestedList, 0]];
  }

  makeTopANumber() {
    while (this.stack.length) {
      const [list, idx] = this.stack[this.stack.length - 1];

      // idx is at end of list, pop
      if (idx === list.length) {
        this.stack.pop();
        continue;
      }
      // if is not an array
      if (list[idx].isInteger()) {
        break;
      }
      // otherwise push back onto stack
      const newList = list[idx].getList();
      // increment top of stack index
      this.stack[this.stack.length - 1][1]++;
      this.stack.push([newList, 0]);
    }
  }
  hasNext() {
    this.makeTopANumber();
    return this.stack.length > 0;
  }

  next() {
    this.makeTopANumber();
    const [list, idx] = this.stack[this.stack.length - 1];
    this.stack[this.stack.length - 1][1]++;
    return list[idx].getInteger();
  }
}
