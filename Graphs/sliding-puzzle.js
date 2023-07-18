/* 
On an 2 x 3 board, there are five tiles labeled from 1 to 5, and an empty square represented by 0. A move consists of choosing 0 and a 4-directionally adjacent number and swapping it.

The state of the board is solved if and only if the board is [[1,2,3],[4,5,0]].

Given the puzzle board board, return the least number of moves required so that the state of the board is solved. If it is impossible for the state of the board to be solved, return -1.

Input: board = [[1,2,3],[4,0,5]]
Output: 1
Explanation: Swap the 0 and the 5 in one move.

Input: board = [[1,2,3],[5,4,0]]
Output: -1
Explanation: No number of moves will make the board solved.

Input: board = [[4,1,2],[5,0,3]]
Output: 5
Explanation: 5 is the smallest number of moves that solves the board.
An example path:
After move 0: [[4,1,2],[5,0,3]]
After move 1: [[4,1,2],[0,5,3]]
After move 2: [[0,1,2],[4,5,3]]
After move 3: [[1,0,2],[4,5,3]]
After move 4: [[1,2,0],[4,5,3]]
After move 5: [[1,2,3],[4,5,0]]
*/

const slidingPuzzle = (board) => {
  const moves = {
    0: [1, 3],
    1: [0, 2, 4],
    2: [1, 5],
    3: [0, 4],
    4: [1, 3, 5],
    5: [2, 4],
  };
  const finalState = '123450';
  let state = '';
  board.map((row) => (state += row.join('')));

  const visited = new Set(state);
  let queue = [[state, state.indexOf('0'), 0]]; // [boardState, currentIndex, depth]

  while (queue.length) {
    const nextLevel = [];
    for (let [currentState, currentIdx, currentMoves] of queue) {
      // if currentState = finalState return currentMoves
      if (currentState === finalState) return currentMoves;
      // explore neighbors
      for (let idx of moves[currentIdx]) {
        // perform swap
        const newBoardState = swap(currentState, currentIdx, idx);
        if (!visited.has(newBoardState)) {
          visited.add(newBoardState);
          nextLevel.push([newBoardState, idx, currentMoves + 1]);
        }
      }
    }
    queue = nextLevel;
  }
  // if we never hit target state return -1
  return -1;
};

const swap = (currentState, currentIdx, idx) => {
  const state = currentState.split('');
  [state[currentIdx], state[idx]] = [state[idx], state[currentIdx]];
  return state.join('');
};
