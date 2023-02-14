import { allRecipes } from "../pages/index.js";
import { displayRecipes } from "../pages/index.js";

const searchBox = document.querySelector('.search__input')
console.log(searchBox);

let filteredRecipes = allRecipes;

function simplify(string) {
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(' ').join('').toLowerCase();
}

function compare(a, b) {
  return simplify(a).includes(simplify(b));
}

searchBox.addEventListener('change', () => {
  console.log(allRecipes);
  const query = searchBox.value;
  if (query.length == 0 ) displayRecipes(allRecipes)
  if (query.length > 2) {
    console.log('ok');
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
    console.log(filteredRecipes);
    displayRecipes(filteredRecipes);
  }
});
