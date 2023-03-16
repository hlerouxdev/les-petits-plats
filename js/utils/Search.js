import { allRecipes, keywords } from "../pages/index.js";
import { displayRecipes } from "../pages/index.js";

const searchBox = document.querySelector('.search__input')

export function simplify(string) {
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(' ').join('').toLowerCase();
}

/**
 * 
 * @param {Array} array Array of keywords for string query, or array of recipes for number query
 * @param {String} query String to match keywords, or recipe id
 * @returns 
 */
export function binarySearch(array, query) {
  const length = query.length;
  let start = 0, end = array.length - 1;

  while (start <= end) {
    let mid = start + Math.floor((end - start) / 2);
    const res = typeof(query) === 'string' ? 
      query.localeCompare(array[mid].keyword.slice(0, length)) :
      query - array[mid].id;

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

function tagFilter(array, tag, type) {
  const filteredRecipes = array.filter(recipe => {
    if (type == 'ingredients') {
      let contains = false
      recipe.ingredients.forEach(ingredient => {
        if (simplify(ingredient.ingredient).includes(simplify(tag)) ) contains = true
      })
      return contains
    }
    if (type == 'appliance' && simplify(recipe.appliance).includes(simplify(tag))) return true;
    if (type == 'ustensils') {
      let contains = false
      recipe.ustensils.forEach(ustensil => {
        if (simplify(ustensil).includes(simplify(tag))) {
          contains = true
        }
      })
      return contains
    };
  })
  return filteredRecipes;
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

/**
 * 
 * @param {Array} array 
 * @param {String} query 
 * @returns 
 */
export function filterRecipes() {
  let filteredRecipes = allRecipes
  let arrRes = []
  //searchbar query
  const query = searchBox.value;
  const activeTags = JSON.parse(localStorage.getItem('tags'))
  if (activeTags && activeTags.length > 0) {
    activeTags.forEach(tag => {
      filteredRecipes = tagFilter(filteredRecipes, tag.name, tag.type)
    })
  }
  if (query.length > 2) {
    const querries = query.split(' ')
    if (querries.length === 1) {
      arrRes = binarySearch(keywords, simplify(query))
    }
    else {
      querries.map( string => {
        if (string.length > 2) {
          const stringRes = (binarySearch(keywords, string))
          if (stringRes != -1) {
            stringRes.forEach( id => {
              if (!arrRes.includes(id)) arrRes.push(id)
            })
          }
        }
      })
    }
    if (arrRes !== -1) {
      filteredRecipes = findFiteredRecipes(filteredRecipes, arrRes)
    } else {
      filterRecipes = [];
    }
  }

  return filteredRecipes;
}

searchBox.addEventListener('change', () => {
  const filteredRecipes = filterRecipes();
  displayRecipes(filteredRecipes);
});
