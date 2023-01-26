import Api from '../api/Api.js';
import { Recipe } from '../models/recipe.js';
import { RecipeCard } from '../templates/recipeCard.js';

const recipesApi = await new Api('../../data/recipe.json');
const recipesContainer = document.getElementById('recipes')
console.log(recipesContainer);

let allRecipes = []

async function main() {
  const recipes = await recipesApi.get();
  console.log(recipes);
  recipes.forEach( element => {
    const recipe = new Recipe(element);
    allRecipes.push(recipe);
  });

  allRecipes.forEach( recipe => {
    const template = new RecipeCard(recipe);
    console.log(template.createCard());
    recipesContainer.appendChild(template.createCard());
  });
};

main();