/* 
You are given an integer array cards where cards[i] represents the value of the ith card. A pair of cards are matching if the cards have the same value.

Return the minimum number of consecutive cards you have to pick up to have a pair of matching cards among the picked cards. If it is impossible to have matching cards, return -1.

Input: cards = [3,4,2,3,4,7]
Output: 4
Explanation: We can pick up the cards [3,4,2,3] which contain a matching pair of cards with value 3. Note that picking up the cards [4,2,3,4] is also optimal.

Input: cards = [1,0,5,3]
Output: -1
Explanation: There is no way to pick up a set of consecutive cards that contain a pair of matching cards.
*/

// O(n) time | O(n) space
const minimumCardPickup = (cards) => {
  // declare map
  const map = {};
  // declare min
  let min = Infinity;
  for (let i = 0; i < cards.length; i++) {
    if (cards[i] in map) {
      // if card in map then do min logic with currentIdx and idx of last seen
      min = Math.min(i - map[cards[i]] + 1, min);
    }
    // update map
    map[cards[i]] = i;
  }
  return min === Infinity ? -1 : min;
};
