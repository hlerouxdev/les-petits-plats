import Api from '../api/Api.js';
import { Filter } from '../models/Filter.js';
import { Recipe } from '../models/Recipe.js';
import { Tag } from '../models/Tag.js';

const recipesApi = await new Api('../../data/recipe.json');
const recipesContainer = document.getElementById('recipes');
const filterGroup = document.getElementById('filters__group');

console.log(filterGroup);

export let allRecipes = []

const filters = [
  {
    name: 'Ingrédient',
    key: 'ingredients'
  },
  {
    name: 'Appareil',
    key: 'appliance'
  },
  {
    name: 'Ustensil',
    key: 'ustensils'
  },
]

function displayFilters() {
  filters.forEach( element => {
    const filter = new Filter(element.name, element.key);
    filterGroup.appendChild(filter.create());
  })
}

async function displayRecipes() {
  const recipes = await recipesApi.get();
  recipes.forEach( element => {
    const recipe = new Recipe(element);
    allRecipes.push(recipe);
    recipesContainer.appendChild(recipe.createCard());
  });
};

displayFilters();
displayRecipes();