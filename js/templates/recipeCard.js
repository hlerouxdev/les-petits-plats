export class RecipeCard {
  constructor(recipe) {
    this.$recipe = recipe
    this.$ingredients = recipe.ingredients
  }

  createCard() {
    let ingredientList = ''
    this.$ingredients.map( element => {
      ingredientList += `<p><strong>${element.ingredient}</strong>: ${element.quantity} ${element.unit}</p>`
    })
    const card = document.createElement('article');
    card.setAttribute('class', 'recipe__card');
    card.innerHTML = `
      <img src="../assets/hugo.png" alt="${this.$recipe.name}">
      <div class="recipe__card__title">
        <h2>${this.$recipe.name}</h2>
        <div class="recipe__card__title__time">
          <i class="fa-regular fa-clock"></i>
          <h2>${this.$recipe.time} min</h2>
        </div>
      </div>
      <div class="recipe__card__infos">
        <div class="recipe__card__infos__ingrediets">
          ${ingredientList}
        </div>
        <p class="recipe__card__infos__description">
          ${this.$recipe.description}
        </p>
      </div>
    `;

    return card;
  }
}