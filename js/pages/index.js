import Api from '../api/Api.js';
import { Filter } from '../models/Filter.js';
import { Recipe } from '../models/Recipe.js';
import { Tag } from '../models/Tag.js';

const recipesApi = await new Api('../../data/recipe.json');
const recipesContainer = document.getElementById('recipes');
const filterGroup = document.getElementById('filters__group');
const activeFiltersContainer = document.getElementById('filters__active');

export let allRecipes = [];
let keywordList = [];
export let keywords = [
  // {
  //   keyword: String,
  //   recipesId: []
  // }
]

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
    const newTag = new Tag(tag.name, tag.type);
    activeFiltersContainer.appendChild(newTag.create());
  })
}

function addkeyword (object, string) {
  if (string.includes ('\'')) string = string.split('\'')[1]
  string = string.split(')')[0]
  if (string.length > 2 && !string.includes('(')) {
    if (!keywordList.includes(string)) {
    keywords.push({
      keyword: string,
      recipesId: [object.id]
    })
    keywordList.push(string)
  } 
  else {
      const keyword = keywords.find( el => {
        if (el.keyword === string) return el
      })
      keyword.recipesId.push(object.id)
    }
  }
}


//splits a string into its different components and calls addKeyword for each
function splitString (object, value) {
  const stringChain = value.split(' ')
  stringChain.forEach(string => addkeyword(object, string.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()))
}

function createKeywords(array) {
  keywordList = [];
  keywords = [];
  array.forEach( object => {
    splitString(object, object.name)
    splitString(object, object.appliance)
    object.ustensils.forEach( ustensil => {
      splitString(object, ustensil)
    })
    object.ingredients.forEach( ingredient => {
      splitString(object,ingredient.ingredient)
    })
  })
  keywords.sort((a, b) => a.keyword.localeCompare(b.keyword))
  console.log(keywords);
  return keywords;
}

/**
 * 
 * @param {Array} array // expected to be the filteredRecipes array
 */
export function displayRecipes( array ) {
  if(!array || array.length == 0) {
    recipesContainer.innerHTML = '<h1>Nous n\'avons pas trouvé de résultats</h1>'
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
  console.log(allRecipes)
  displayRecipes(allRecipes);
  createKeywords(allRecipes);
}

main();