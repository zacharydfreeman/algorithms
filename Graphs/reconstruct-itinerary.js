/* 
You are given a list of airline tickets where tickets[i] = [fromi, toi] represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it.

All of the tickets belong to a man who departs from "JFK", thus, the itinerary must begin with "JFK". If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string.

For example, the itinerary ["JFK", "LGA"] has a smaller lexical order than ["JFK", "LGB"].
You may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.

Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
Output: ["JFK","MUC","LHR","SFO","SJC"]

Input: tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
Output: ["JFK","ATL","JFK","SFO","ATL","SFO"]
Explanation: Another possible reconstruction is ["JFK","SFO","ATL","JFK","ATL","SFO"] but it is larger in lexical order.

*/

// O(elog(e/v)) time | O(v + e)
const findItinerary = (tickets) => {
  const graph = createGraph(tickets);
  // we need a path and visited
  const path = [];

  const dfs = (curr) => {
    const routes = graph[curr];
    while (routes.length) {
      const dest = routes.pop();
      dfs(dest);
    }
    path.push(curr);
  };
  dfs('JFK');
  return path.reverse();
};

const createGraph = (tickets) => {
  const graph = {};
  for (let [from, to] of tickets) {
    if (!(from in graph)) graph[from] = [];
    if (!(to in graph)) graph[to] = [];
    graph[from].push(to);
  }
  for (let city in graph) {
    graph[city].sort((a, b) => b.localeCompare(a));
  }
  return graph;
};
