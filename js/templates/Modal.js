const main = document.querySelector('main');

export class Modal {
  constructor(recipe, ingredientList) {
    this.$recipe = recipe;
    this.$ingredientList = ingredientList;
  }

  createModal(){
    const modal = document.createElement('div');
    modal.setAttribute('id', 'modal');
    modal.innerHTML = `
      <div class="modal-bg"></div>
    `;
    const modalCard = document.createElement('div');
    modalCard.setAttribute('class', 'modal-card');
    modalCard.innerHTML = `
      <img src="${'../assets/images/' + Math.floor(Math.random() * 10 + 1) + '.jpg' || '../assets/grey.jpg'}">
      <h2>${this.$recipe.name}</h2>
      <p><strong>Temps de préparation</strong>: <i class="fa-regular fa-clock"></i> ${this.$recipe.time} minutes</p>
      ${this.$recipe.servings ? `<p>Pour ${this.$recipe.servings} personnes</p>` : '' }
      <div class="modal-card-required">
        <p><strong>Appareil</strong>: ${this.$recipe.appliance}</p>
        <p><strong>Ustensils</strong>: ${this.$recipe.ustensils}</p>
      </div>
      <div class="modal-card-infos">
        <h3>Ingrédients</h3>
        <div class="modal-card-ingredients">
          ${this.$ingredientList}
        </div>
        <h3>Recette</h3>
        <div class="modal-card-description">
          ${this.$recipe.description}
        </div>
      </div>
    `;
    const close = document.createElement('i');
    close.setAttribute('class', 'fa-regular fa-circle-xmark');
    close.setAttribute('aria-label', 'close')
    modalCard.appendChild(close);
    modal.appendChild(modalCard)

    main.appendChild(modal)

    close.addEventListener('click', () => {
      main.removeChild(modal);
    })

    main.appendChild(modal)
  }
}