export class RecipeCard {
  constructor(recipe) {
    this.$recipe = recipe
    this.$ingredients = recipe.ingredients
  }

  displayIngredient(element) {
    return `<p><strong>${element.ingredient}</strong>: ${element.quantity} ${element.unit}</p>`
  } 

  createCard() {
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
          ${
            this.$ingredients.forEach(ingredient => {
              console.log(this.$ingredients);
              this.displayIngredient(ingredient);
            })
          }
        </div>
        <div class="recipe__card__infos__description">
          ${this.$recipe.description}
        </div>
      </div>
    `;

    return card;
  }
}