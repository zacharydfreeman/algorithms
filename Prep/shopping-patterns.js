/*
 Minimum Degree of a Connected Trio in a Graph

You are given an undirected graph. You are given an integer n which is the number of
nodes in the graph and an array edges, where each edges[i] = [ui, vi] indicates that there
is an undirected edge between ui and vi.

A connected trio is a set of three nodes where there is an edge between every pair of them.

The degree of a connected trio is the number of edges where one endpoint is in the trio,
and the other is not.

Return the minimum degree of a connected trio in the graph, or -1 if the graph has no
connected trios.

Input: n = 6, edges = [[1,2],[1,3],[3,2],[4,1],[5,2],[3,6]]
Output: 3
Explanation: There is exactly one trio, which is [1,2,3].
The edges that form its degree are bolded in the figure above.

Input: n = 7, edges = [[1,3],[4,1],[4,3],[2,5],[5,6],[6,7],[7,5],[2,6]]
Output: 0
Explanation: There are exactly three trios:
1) [1,4,3] with degree 0.
2) [2,5,6] with degree 2.
3) [5,6,7] with degree 2.
 */




// Approach: get all the trios and then explore each of the nodes in the trio
// and see how many have edges to another node thats not in the trio
// O(n + e + n*e^2) time | O(n + e) space where n is number of nodes and e is number of edges
const minTrioDegree = (n, edges) => {
    // create graph
    const graph = createGraph(n, edges);
    let minDegree = Infinity;
    // nested for loop to get trio nodes
    for (let node = 1; node <= n; node++) {
       for (let node2 of graph[node]) {
        for (let node3 of graph[node]) {
            if (graph[node2].has(node3)) {
                // you need to remove 6 edges
                minDegree = Math.min(minDegree, graph[node].size + graph[node2].size
                                        + graph[node3].size - 6);
            }
        }
       }
    }
    return minDegree === Infinity ? -1 : minDegree;
}

const createGraph = (n, edges) => {
    // declare graph object
    const graph = {};
    // initialize graph with nodes as keys and a set as value that will give us constant look up time
    for (let node = 1; node <= n; node++) {
        graph[node] = new Set();
    }
    // populate graph with edges
    for (let edge of edges) {
        const [a, b] = edge;
        graph[a].add(b);
        graph[b].add(a);
    }
    return graph;
}

const n = 6;
const edges = [[1,2],[1,3],[3,2],[4,1],[5,2],[3,6]];
console.log(minTrioDegree(n, edges));
