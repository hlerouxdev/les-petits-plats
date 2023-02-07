import { allRecipes } from "../pages/index.js";
import { displayRecipes } from "../pages/index.js";

const searchBox = document.querySelector('.search__input');

export let filteredRecipes = [];

function simplify(string) {
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

searchBox.addEventListener('change', () => {
  const query = searchBox.value;
  if (query.length == 0 ) {
    displayRecipes(allRecipes);
    filteredRecipes = allRecipes;
  }
  if (query.length > 2) {
    filteredRecipes = allRecipes.filter( recipe => {
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
    displayRecipes(filteredRecipes);
  }
});

export function filterByTag(key, name) {
  if (filteredRecipes.length == 0) filteredRecipes = allRecipes 
  console.log('before', filteredRecipes);
  filteredRecipes = filteredRecipes.filter(recipe => {
    if (key == 'ingredients') {
      let contains = false
      recipe.ingredients.forEach(ingredient => {
        console.log(`ingredient: ${ingredient.ingredient}`, `tag: ${name}`, ingredient.ingredient == name);
        if (ingredient.ingredient == name ) contains = true
      })
      return contains
    }
    if (key == 'appliance' && recipe.appliance == name) return true;
    if (key == 'ustensils' && recipe.ustensils.includes(name)) return true;
  })
  console.log('after', filteredRecipes);
  displayRecipes(filteredRecipes);
  return filteredRecipes;
}