/*
On an infinite plane, a robot initially stands at (0, 0) and faces north. Note that:

The north direction is the positive direction of the y-axis.
The south direction is the negative direction of the y-axis.
The east direction is the positive direction of the x-axis.
The west direction is the negative direction of the x-axis.
The robot can receive one of three instructions:

"G": go straight 1 unit.
"L": turn 90 degrees to the left (i.e., anti-clockwise direction).
"R": turn 90 degrees to the right (i.e., clockwise direction).
The robot performs the instructions given in order, and repeats them forever.

Return true if and only if there exists a circle in the plane such that the robot
never leaves the circle.

Input: instructions = "GGLLGG"
Output: true
Explanation: The robot is initially at (0, 0) facing the north direction.
"G": move one step. Position: (0, 1). Direction: North.
"G": move one step. Position: (0, 2). Direction: North.
"L": turn 90 degrees anti-clockwise. Position: (0, 2). Direction: West.
"L": turn 90 degrees anti-clockwise. Position: (0, 2). Direction: South.
"G": move one step. Position: (0, 1). Direction: South.
"G": move one step. Position: (0, 0). Direction: South.
Repeating the instructions, the robot goes into the cycle: (0, 0) --> (0, 1) --> (0, 2) --> (0, 1) --> (0, 0).
Based on that, we return true.

Input: instructions = "GG"
Output: false
Explanation: The robot is initially at (0, 0) facing the north direction.
"G": move one step. Position: (0, 1). Direction: North.
"G": move one step. Position: (0, 2). Direction: North.
Repeating the instructions, keeps advancing in the north direction and does not go into cycles.
Based on that, we return false.
 */

// O(n) time | O(1) space
const isRobotBounded = function(instructions) {
    // variables to determine where your facing. (0, 1) => north, (0, -1) => south
    // (1, 0) => east, (-1, 0) => west
    let x = 0, y = 1;
    // declare start position
    let currentX = 0;
    let currentY = 0;
    // loop through set of directions 4 times and see where end position is
    for (let i = 0; i < 4 * instructions.length; i++) {
        const circIdx = i % instructions.length;
        const instruction = instructions[circIdx];
        if (instruction === "G") {
            currentX += x;
            currentY += y;
        } else if (instruction === "L") {
            // need to change direction variables
            [x, y] = [-y, x];
        } else if (instruction === "R") {
            // need to change direction variables
            [x, y] = [y, -x];
        }
    }
    // return true if you end up at position 0
    return currentX === 0 && currentY === 0;
};
