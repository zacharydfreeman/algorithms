/* 
You are given two non-empty linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Input: l1 = [7,2,4,3], l2 = [5,6,4]
Output: [7,8,0,7]

Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [8,0,7]

Input: l1 = [0], l2 = [0]
Output: [0]

*/

// O(n + m) time | O(n + m) space
const addTwoNumbers = (l1, l2) => {
  const stack1 = [];
  const stack2 = [];
  let current1 = l1;
  let current2 = l2;
  while (current1) {
    stack1.push(current1);
    current1 = current1.next;
  }
  while (current2) {
    stack2.push(current2);
    current2 = current2.next;
  }

  let carry = 0;

  let ans = null;
  while (stack1.length || stack2.length || carry > 0) {
    let total = 0;
    if (stack1.length) {
      const node = stack1.pop();
      total += node.val;
    }
    if (stack2.length) {
      const node = stack2.pop();
      total += node.val;
    }

    const sum = total + carry;
    const digit = sum % 10;
    const newNode = new ListNode(digit);
    newNode.next = ans;
    ans = newNode;
    carry = sum >= 10 ? 1 : 0;
  }

  return ans;
};
