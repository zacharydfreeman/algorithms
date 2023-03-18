/* 
You have a browser of one tab where you start on the homepage and you can visit another url, get back in the history number of steps or move forward in the history number of steps.

Implement the BrowserHistory class:

BrowserHistory(string homepage) Initializes the object with the homepage of the browser.
void visit(string url) Visits url from the current page. It clears up all the forward history.
string back(int steps) Move steps back in history. If you can only return x steps in the history and steps > x, you will return only x steps. Return the current url after moving back in history at most steps.
string forward(int steps) Move steps forward in history. If you can only forward x steps in the history and steps > x, you will forward only x steps. Return the current url after forwarding in history at most steps.

*/

class BrowserHistory {
  constructor(homepage) {
    this.history = [homepage];
    this.current = 0;
  }

  visit(url) {
    // no matter what you only want the beginning of history until current
    this.history = this.history.slice(0, this.current + 1);
    // add new url to end
    this.history.push(url);
    // increment current
    this.current++;
  }

  back(steps) {
    // check is steps goes out of bounds
    if (this.current - steps > 0) {
      this.current = this.current - steps;
      return this.history[this.current];
    }
    // if steps is out of bounds, update current and return homepage
    this.current = 0;
    return this.history[0];
  }

  forward(steps) {
    // check if steps is out of bounds
    if (this.current + steps < this.history.length) {
      this.current = this.current + steps;
      return this.history[this.current];
    }
    // if out of bounds, update current and return last element in history arrat
    this.current = this.history.length - 1;
    return this.history[this.current];
  }
}
