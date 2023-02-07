import Api from '../api/Api.js';
import { Filter } from '../models/Filter.js';
import { Recipe } from '../models/Recipe.js';
import { Tag } from '../models/Tag.js';

const recipesApi = await new Api('../../data/recipe.json');
const recipesContainer = document.getElementById('recipes');
const filterGroup = document.getElementById('filters__group');
const activeFiltersContainer = document.getElementById('filters__active')

export let allRecipes = [];

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
];

function displayFilters() {
  filters.forEach( element => {
    const filter = new Filter(element.name, element.key);
    filterGroup.appendChild(filter.create());
  })
}

function displayTags(array) {
  array.forEach(tag =>{
    const newTag = new Tag(tag.name, tag.type)
    activeFiltersContainer.appendChild(newTag.create());
  })
}

/**
 * 
 * @param {Array} array // expected to be the filteredRecipes array
 */
export function displayRecipes( array ) {
  if(!array || array.length == 0) {
    recipesContainer.innerHTML = '<h1>Aucune recette ne correspond à votre critère… vous pouvez chercher "tarte aux pommes", "poisson", etc.</h1>'
  } else {
    recipesContainer.innerHTML = '' //resets the content to display a new filtered array
    array.forEach( element => {
      const recipe = new Recipe(element);
      recipesContainer.appendChild(recipe.createCard());
    });
  }
};

async function main() {
  const activeTags = JSON.parse(localStorage.getItem('tags'));
  if (activeTags) displayTags(activeTags);
  displayFilters()
  allRecipes = await recipesApi.get();
  displayRecipes(allRecipes);
}

main();