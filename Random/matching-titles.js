/*


 */
// O(L^2 * T) time | O(T*L) space
const matching = (titles, query) => {
  const matchingTitles = [];
  for (let title of titles) {
    if (check(title, query)) matchingTitles.push(title);
  }
  return matchingTitles;
};

const check = (title, query) => {
  for (let i = 0; i < title.length; i++) {
    if (_matching(title.slice(i), query)) return true;
  }
  return false;
};

const _matching = (title, query) => {
  let incorrect = 0;
  let i = 0; // title
  let j = 0; // query
  while (j < query.length) {
    if (title[i] === query[j]) {
      i++;
      j++;
    } else {
      incorrect++;
      i++;
      j++;
    }
    if (incorrect === 3) return false;
  }
  return j === query.length;
};
