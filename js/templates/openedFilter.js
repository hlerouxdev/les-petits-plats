import { allRecipes } from "../pages/index.js";

let list = [];
let links = '';

// function addToArray(array, valueToCheck) {
//   if(!array.includes(valueToCheck)) {
//     array.push(valueToCheck)
//     links += `<a href="#">${valueToCheck}</a>`;
//   }
// };

// function filterArray(name) {
//   console.log('caca');
//   allRecipes.forEach( recipe => {
//     if(name === 'appliance') {
//       addToArray(list, recipe.appliance)
//     } else {
//       recipe[name].forEach ( filter => {
//       addToArray(list, filter)
//     })
//     }
    
//   })
// };

export class Openedfilter {
  constructor(name) {
    this.$name = name;
    this.$filterName ='';
    if(this.$name === 'ingredients') this.$filterName = "Ingrédient";
    if(this.$name === 'appliance') this.$filterName = "Appareil";
    if(this.$name === 'ustensils') this.$filterName = "Ustensil";
    console.log(this.$filterName);
  };

  newFilter() {
    console.log('opening');
    // filterArray(this.$name)
    return `
      <div class="filters__button__header">
        <input type="text" placeholder="rechercher un ${this.$filterName.toLowerCase()}">
        <i class="fa-sharp fa-solid fa-chevron-up chevron"></i>
      </div>
      <div class="filters__button__list">
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
      </div>
    `;
  };

  defaultFilter() {
    console.log('closing');
    return `
      ${this.$filterName}s
      <i class="fa-solid fa-chevron-down"></i>
    `;
  };
}