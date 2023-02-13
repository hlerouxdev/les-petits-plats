import { displayRecipes } from "../pages/index.js";
import { globalFilter } from "../utils/search.js";

const activeFilters = document.getElementById('filters__active')

export class Tag {
  constructor(name, type) {
    this.$name= name;
    this.$type = type;
  }

  add() {
    let activeTags = JSON.parse(localStorage.getItem('tags'))
    activeTags ? activeTags.push({name: this.$name, type: this.$type}) : activeTags = [{name: this.$name, type: this.$type}]
    localStorage.setItem('tags', JSON.stringify(activeTags))
  }

  create() {
    const tag = document.createElement('button');
    if(this.$type === 'ingredients') tag.setAttribute('class', 'filters__ingredients');
    if(this.$type === 'appliance') tag.setAttribute('class', 'filters__appliance');
    if(this.$type === 'ustensils') tag.setAttribute('class', 'filters__ustensils');
    tag.innerHTML = `
      ${this.$name}
      <i class="fa-regular fa-circle-xmark"></i>
    `;

    tag.addEventListener('click', () => {
      activeFilters.removeChild(tag);
      let activeTags = JSON.parse(localStorage.getItem('tags'))
      localStorage.setItem('tags', JSON.stringify(
        activeTags.filter(tag => tag.name != this.$name)
      ))
      let filteredRecipes = globalFilter()
      displayRecipes(filteredRecipes)
    })

    return tag;
  }
}