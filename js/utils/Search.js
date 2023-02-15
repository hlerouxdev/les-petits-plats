import { allRecipes, keywords } from "../pages/index.js";
import { displayRecipes } from "../pages/index.js";

const searchBox = document.querySelector('.search__input')
console.log(searchBox);

let filteredRecipes = allRecipes;

console.log('nominal test', 'pois'.localeCompare('poisson'));

function simplify(string) {
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(' ').join('').toLowerCase();
}

/**
 * 
 * @param {Array} array Array of keywords
 * @param {String} query String to match keywords
 * @returns 
 */
function binarySearch(array, query) {
  const length = query.length;
  let start = 0, end = array.length - 1;

  while (start <= end) {
    let mid = start + Math.floor((end - start) / 2);
    const res = typeof(query) === 'string' ? 
      query.localeCompare(array[mid].keyword.slice(0, length)) :
      query - 1 - mid;

    // query matches the middle index
    if (res == 0) {
      if (typeof(query) === 'string' ) {
        //check indexes after mid for match
        let indexes = [mid], newMid = mid + 1
        let noMoreResult = false
        while (!noMoreResult) {
          let newRes = query.localeCompare(array[newMid].keyword.slice(0, length))
          if (newRes == 0) {
            indexes.push(newMid)
            newMid += 1
          } else {
            noMoreResult = true
          }
        }

        //check indexes before mid for match
        noMoreResult = false
        newMid = mid - 1
        while (!noMoreResult) {
          let newRes = query.localeCompare(array[newMid].keyword.slice(0, length))
          if (newRes == 0) {
            indexes.push(newMid)
            newMid -= 1
          } else {
            noMoreResult = true
          }
        }
        return indexes
      } 
      else {
        return array[mid]
      }
    }

    //mid does not match query
    if (res > 0) {
      start = mid + 1
    } else {
      end = mid - 1
    }
  }
  return -1
}

/**
 * function to be called after binarySearch() to get the matching recipes
 * @param {Array} array the array of recipes to be filtered
 * @param {Array} results the array returned by the binary search
 */
function findFiteredRecipes(array, results) {
  const keywordsMatch = results.map(res => keywords[res]).sort((a, b) => a.keyword.localeCompare(b.keyword));
      let resultIds = [];
      keywordsMatch.forEach(keyword => {
        keyword.recipesId.forEach(id => {
          if (!resultIds.includes(id)) resultIds.push(id);
        })
      })
      resultIds.sort((a,b) => a - b);
      return resultIds.map(id => binarySearch(array, id));
}

searchBox.addEventListener('change', () => {
  const query = searchBox.value;
  if (query.length == 0 ) displayRecipes(allRecipes);
  if (query.length > 2) {
    const arrRes = binarySearch(keywords, query.toLowerCase());
    if (arrRes !== -1) {
      const filteredRecipes = findFiteredRecipes(allRecipes, arrRes)
      displayRecipes(filteredRecipes);
      return filteredRecipes;
    } else {
      displayRecipes([]);
    }
  }
});
