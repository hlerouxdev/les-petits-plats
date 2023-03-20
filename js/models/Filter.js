import { Tag } from "./Tag.js";
import { displayRecipes } from "../pages/index.js";
import { simplify, globalFilter } from "../utils/search.js";

const activeFilters = document.getElementById('filters__active')

/**
 * 
 * @param {Array} array an array containing the recipes to be filtered
 * @param {String} key 
 * @returns 
 */
export function setFilters(array, key) {
  console.log(array, key);
  let filters = []
  array.forEach( recipe => {
    if (key === 'appliance') {
      if (!filters.includes(recipe[key])) filters.push(recipe[key]);
    } else {
      recipe[key].forEach( filterElement => {
          if (filterElement.ingredient) {
            if (!filters.includes(filterElement.ingredient.toLowerCase())) filters.push(filterElement.ingredient.toLowerCase()) 
          } else {
            if (!filters.includes(filterElement.toLowerCase())) filters.push(filterElement.toLowerCase()) 
          }
      })
    }
  })

  let filterList = '';
  filters.map( filterElement => {
    filterList += `<p>${filterElement.split(' (')[0]}</p>`
  })
  return filterList
}

/**
 * 
 * @param {array} array the nodelist container all the tags
 * @param {Node} container the parent element
 * @param {string} key 
 */
export function addTagEvenListener(array, container, key) {
  array.forEach(tag =>{
    tag.addEventListener('click', (e) => {
      e.stopPropagation()
      const tagName = e.target.innerText;
      const newTag = new Tag(tagName, key);
      newTag.add();
      activeFilters.appendChild(newTag.create());
      const newfilteredRecipes = globalFilter();
      const newFilters = setFilters(newfilteredRecipes, key)
      container.innerHTML = newFilters;
      displayRecipes(newfilteredRecipes)
      const tags = container.querySelectorAll('p');
      addTagEvenListener(tags, container, key)
    })
  })
}

export class Filter {
  constructor(name, key) {
    this.$name = name;
    this.$key = key;
    this.$open = false;
  }

  get name() {
    return this.$name;
  }

  get key() {
    return this.$key;
  }

  get open() {
    return this.$open;
  }

  openFilter(filter) {
    const header = filter.querySelector('.filters__button__header');
    let filteredRecipes = globalFilter();

    // setting filters
    let filters = setFilters(filteredRecipes, this.$key);
    header.innerHTML = `
    <input type="text" placeholder="rechercher un ${this.$name.toLowerCase()}">
    `;
    const list = document.createElement('div');
    list.setAttribute('class', 'filters__button__list');

    list.innerHTML = filters;
    filter.appendChild(list);

    // Tag selection
    const tags = filter.querySelectorAll('p');
    addTagEvenListener(tags, list, this.$key);

    // Tag query
    const input = filter.querySelector('input');
    input.addEventListener('change', () => {
      if (input.value.length > 2) {
        console.log(input.value);
        const currentTags = filter.querySelectorAll('p')
        const newTags = [...currentTags].filter(
          tag => simplify(tag.innerText).includes(simplify(input.value))
        )
        console.log('new tags', newTags);
        list.innerHTML = ''
        newTags.forEach(tag => {
          list.innerHTML += `<p>${tag.innerHTML}</p>`;
        })
        const tags = filter.querySelectorAll('p');
        addTagEvenListener(tags, list, this.$key)
      }
    });

    // document.addEventListener('click', e => {
    //   if (e.target != filter && this.$open) this.closeFilter(filter)
    // })
  }

  closeFilter(filter) {
    const header = filter.querySelector('.filters__button__header');
    header.innerHTML = `
      ${this.$name}s
    `;
    const list = filter.querySelector('.filters__button__list');
    if (list) filter.removeChild(list);
  }

  create() {
    const filter = document.createElement('section');
    filter.setAttribute('class', `filters__${this.$key} filters__button`);
    filter.setAttribute('role', 'button');
    filter.setAttribute('data-type', this.$key)
    filter.setAttribute('data-open', 'false');
    filter.innerHTML = `
    <div class="filters__button__header">
      ${this.$name}s
    </div>
    `;

    const chevron = document.createElement('i')
    chevron.setAttribute('class', 'fa-solid fa-chevron-down')
    filter.appendChild(chevron)

    filter.addEventListener('click', () => {
      if (!this.$open) {
        this.openFilter(filter);
        filter.setAttribute('data-open', 'true')
        chevron.setAttribute('class', 'fa-solid fa-chevron-up')
        this.$open = true;
      }
    })

    chevron.addEventListener('click', (e) => {
      e.stopPropagation()
      if (!this.$open) {
        this.openFilter(filter);
        filter.setAttribute('data-open', 'true')
        chevron.setAttribute('class', 'fa-solid fa-chevron-up')
        this.$open = true;
      } else {
        this.closeFilter(filter)
        filter.setAttribute('data-open', 'false')
        chevron.setAttribute('class', 'fa-solid fa-chevron-down')
        this.$open = false
      }
    })

    return filter;
  }
}