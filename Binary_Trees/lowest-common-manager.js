/*
You're given three inputs, all of which are instances of an OrgChart class that have a directReports
property point to their direct reports. The first input is the top manager in an organization chart
and the other two inputs are reports in the org chart. The two reports are guaranteed to be distinct.

Write a function that return the lowest common manager to the two reports

topManager = Node A
reportOne = Node E
reportTwo = Node I

                    A
                  /   \
                 B     C
               /   \  /  \
             D      E F   G
            / \
           H   I

Output = Node B
 */

// Approach: Brute force approach would be to do dfs and find path to each report and first overlap
// would be the lowerst common manager
// [E, B, A] & [I, D, B, A] => first overlap Node is Node B

class OrgChart {
    constructor(name) {
        this.name = name;
        this.directReports = [];
    }
}

// Approach: Start at the top manager and for every direct report get "Tree Info" about how many
// direct reports it has. Return the first time that root has both reports

// O(n) time | O(h) space where n is number of reports and h is height of tree
const getLowestCommonManager = (topManager, reportOne, reportTwo) => {
    // recursive helper function will return an object that will have the lowest common manager
    // and the number of reports in its subtree
    return _getLowestCommonManager(topManager, reportOne, reportTwo).lowestCommonManager;
}

const _getLowestCommonManager = (currentManager, reportOne, reportTwo) => {
    // initialize number of reports in current managers subtree to 0
    let numOfReports = 0;
    // look through direct reports of current manager
    for (let directReport of currentManager.directReports) {
        // make recursive call with direct report that will return info about its subtree
        const directReportInfo = _getLowestCommonManager(directReport, reportOne, reportTwo);
        // if there is a common manager, return report Info object becuase there is no need to continue
        if (directReportInfo.lowestCommonManager !== null) return directReportInfo;
        // update number of reports
        numOfReports += directReportInfo.numOfReports;
    }
    // need to check if current manager is itself report one or two
    if (currentManager === reportOne || currentManager === reportTwo) numOfReports += 1;
    // need to check if number of reports is 2 so we can set the lowest common manager to either null or the current topManager
    let lowestCommonManager = numOfReports === 2 ? currentManager : null;
    // return object with lowest common manager and number of reports
    return {lowestCommonManager, numOfReports};
}

// O(n) time | O(n) space
const getLowestCommonManager2 = (topManager, reportOne, reportTwo) => {
    // get path for both reports
    const reportOnePath = getPath(topManager, reportOne);
    const reportTwoPath = getPath(topManager, reportTwo);
    // put one path into a set for constant look up time
    const reportOneSet = new Set(reportOnePath);
    // loop through report two path and return first instance of same node
    for (let node of reportTwoPath) {
        if (reportOneSet.has(node)) return node;
    }
}

const getPath = (node, targetNode) => {
    // base case if you hit target node return array with targetNode
    if (node === targetNode) return [targetNode];
    // base case if there are no direct reports return null
    if (node.directReports.length === 0) return null;
    // loop through direct reports
    for (let report of node.directReports) {
        const possiblePath = getPath(report, targetNode);
        // if there is a possible path add current node to path
        if (possiblePath !== null) {
            possiblePath.push(node);
            return possiblePath;
        }
    }
    // if there is no possible path return null
    return null;
}
