/* 
A valid IP address consists of exactly four integers separated by single dots. Each integer is between 0 and 255 (inclusive) and cannot have leading zeros.

For example, "0.1.2.201" and "192.168.1.1" are valid IP addresses, but "0.011.255.245", "192.168.1.312" and "192.168@1.1" are invalid IP addresses.
Given a string s containing only digits, return all possible valid IP addresses that can be formed by inserting dots into s. You are not allowed to reorder or remove any digits in s. You may return the valid IP addresses in any order.

Input: s = "25525511135"
Output: ["255.255.11.135","255.255.111.35"]

Input: s = "0000"
Output: ["0.0.0.0"]

Input: s = "101023"
Output: ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
*/

const restoreIpAddresses = (s) => {
  const validAddressess = [];

  for (let i = 1; i < Math.min(s.length, 4); i++) {
    const validIPParts = ['', '', '', ''];
    const first = s.slice(0, i);
    if (!isValid(first)) continue;
    validIPParts[0] = first;
    for (let j = i + 1; j < i + Math.min(s.length - i, 4); j++) {
      const second = s.slice(i, j);
      if (!isValid(second)) continue;
      validIPParts[1] = second;
      for (let k = j + 1; k < j + Math.min(s.length - j, 4); k++) {
        const third = s.slice(j, k);
        const fourth = s.slice(k);
        if (!isValid(third) || !isValid(fourth)) continue;
        validIPParts[2] = third;
        validIPParts[3] = fourth;
        const address = validIPParts.join('.');
        validAddressess.push(address);
      }
    }
  }
  return validAddressess;
};

const isValid = (s) => {
  const num = Number(s);
  if (num < 0 || num > 255) return false;
  return s.length == String(num).length;
};

console.log(restoreIpAddresses('25525511135'));
