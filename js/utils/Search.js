import { allRecipes } from "../pages/index.js";
import { displayRecipes } from "../pages/index.js";

const searchBox = document.querySelector('.search__input');

export function simplify(string) {
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(' ').join('').toLowerCase();
};

/**
 * 
 * @param {string} a 
 * @param {string} b 
 * @returns {boolean}
 */
function compare(a, b) {
  return simplify(a).includes(simplify(b));
};

// main search bar query functions
/**
 * 
 * @param {Array} array 
 * @param {String} query 
 * @returns 
 */
export function searchbarQuery(array, query) {
  const filteredRecipes = array.filter( recipe => {
    return compare(recipe.name, query)
    || 
    recipe.ingredients.forEach(ingredient => {
      if (simplify(ingredient.ingredient).includes(query)) return true
    }) ||
    simplify(recipe.description).includes(query) ||
    simplify(recipe.appliance).includes(query) ||
    recipe.ustensils.forEach(ustensil => {
      if (simplify(ustensil).includes(query)) return true
    })
  })
  return filteredRecipes
}

searchBox.addEventListener('change', () => {
  if(searchBox.value.length == 0) displayRecipes(globalFilter())
  if(searchBox.value.length > 2) displayRecipes(globalFilter())
});

//filters query function
/**
 * 
 * @param {String} type the type of filter. Should be either "ingredients", "apparel" or "ustensils"
 * @param {String} name 
 * @param {Array} array 
 * @returns 
 */
export function filterByTag(type, name, array) {
  const filteredRecipes = array.filter(recipe => {
    if (type == 'ingredients') {
      let contains = false
      recipe.ingredients.forEach(ingredient => {
        if (simplify(ingredient.ingredient).includes(simplify(name)) ) contains = true
      })
      return contains
    }
    if (type == 'appliance' && simplify(recipe.appliance).includes(simplify(name))) return true;
    if (type == 'ustensils') {
      let contains = false
      recipe.ustensils.forEach(ustensil => {
        if (simplify(ustensil).includes(simplify(name))) {
          contains = true
        }
      })
      return contains
    };
  })
  return filteredRecipes;
}

export function filterByActiveTags() {
  let filteredRecipes = allRecipes;
  const activeTags = JSON.parse(localStorage.getItem('tags'));
  activeTags.forEach(tag => {
    filteredRecipes = filterByTag(tag.type, tag.name, filteredRecipes)
  })
  return filteredRecipes
}

// function calls filterByActiveTags and searchbarQuery depending on the active tags and the search bar's query
export function globalFilter() {
  let filteredRecipes = allRecipes
    // filters the recipes if any tag is active
    const activeTags = JSON.parse(localStorage.getItem('tags'))
    if (activeTags && activeTags.length != 0) filteredRecipes = filterByActiveTags(filteredRecipes)
    // filters the recipes if the search bar has a querry
    if (searchBox.value.length > 2) filteredRecipes = searchbarQuery(filteredRecipes, searchBox.value)
    // this should return the recipes filtered by tags and search bar query inshallah
    return filteredRecipes
}
