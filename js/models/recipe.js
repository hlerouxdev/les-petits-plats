import { Modal } from "../templates/Modal.js";

export class Recipe {
  constructor(data) {
    this.$recipe = data
    this.$id = data.id;
    this.$name = data.name;
    this.$servings = data.$servings;
    this.$ingredients = data.ingredients;
    this.$time = data.time;
    this.$description = data.description;
    this.$appliance = data.appliance;
    this.$ustensils = data.ustensils;
  }

  get id() {
    return this.$id;
  }

  get name() {
    return this.$name;
  }

  get servings() {
    return this.$servings;
  }

  get ingredients() {
    return this.$ingredients;
  }

  get time() {
    return this.$time;
  }

  get description() {
    return this.$description;
  }

  get appliance() {
    return this.$appliance;
  }

  get ustensils() {
    return this.$ustensils;
  }

  createCard() {
    let ingredientList = ''
    this.$ingredients.map( element => {
      ingredientList += `<p><strong>${element.ingredient}</strong>: ${element.quantity} ${element.unit ? element.unit.split(' ')[0] : ''}</p>`
    })
    const card = document.createElement('article');
    card.setAttribute('class', 'recipe__card');
    card.setAttribute('data-id', this.$id)
    card.innerHTML = `
      <img src="${'../assets/images/' + Math.floor(Math.random() * 10 + 1) + '.jpg' || '../assets/grey.jpg'}"
      alt="${this.$name}">
      <div class="recipe__card__title">
        <h2>${this.$name}</h2>
        <div class="recipe__card__title__time">
          <i class="fa-regular fa-clock"></i>
          <h2>${this.$time} min</h2>
        </div>
      </div>
      <div class="recipe__card__infos">
        <div class="recipe__card__infos__ingrediets">
          ${ingredientList}
        </div>
        <p class="recipe__card__infos__description">
          ${this.$description}
        </p>
      </div>
    `;

    card.addEventListener('click', () => {
      const modal = new Modal(this, ingredientList);
      modal.createModal();
    })

    return card;
  }
}