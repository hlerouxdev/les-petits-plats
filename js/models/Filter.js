import { allRecipes, displayRecipes } from "../pages/index.js";
import { simplify, filterRecipes } from "../utils/search.js";
import { Tag } from "./Tag.js";

const activeFilters = document.getElementById('filters__active');

/**
 * Fills the container element with the list of filters depending on the key
 * @param {String} key 
 * @param {Node} container
 */
export function setFilters(key, container) {
  const activeTags = JSON.parse(localStorage.getItem('tags'));
  let filteredRecipes
  if ( activeTags && activeTags !== []) {
    filteredRecipes = filterRecipes()
  } else {
    filteredRecipes = allRecipes
  }

  // setting filters array by removing duplicates and then sorting them alphabetically
  let filters = []
  filteredRecipes.forEach( recipe => {
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

  // removing filter if its tag is already active
  activeTags.forEach(tag => {
    filters.forEach( filter => {
      if ( tag.name == filter ) {
        const i = filters.findIndex( name => name == filter )
        filters.splice(i, 1);
      }
    })
  })

  // filling filters html
  let filterList = '';
  filters.sort((a, b) => a.localeCompare(b))
  filters.map( filterElement => {
    filterList += `<p>${filterElement.split(' (')[0]}</p>`
  })
  container.innerHTML = filterList
}

/**
 * 
 * @param {Array} array the nodelist container all the tags
 * @param {Node} container the parent element
 * @param {String} key 
 */
export function addTagEvenListener(array, container, key) {
  array.forEach(tag =>{
    tag.addEventListener('click', (e) => {
      e.stopPropagation();

      // creating tag and adding tag to html
      const tagName = e.target.innerText;
      const newTag = new Tag(tagName, key);
      newTag.add();
      activeFilters.appendChild(newTag.create());

      // filtering new recipes and updating the filter's tag list
      const newfilteredRecipes = filterRecipes();
      setFilters(key, container);
      displayRecipes(newfilteredRecipes);
      const tags = container.querySelectorAll('p');
      addTagEvenListener(tags, container, key);
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
    header.innerHTML = `
    <input type="text" placeholder="rechercher un ${this.$name.toLowerCase()}">
    `
    const list = document.createElement('div');
    list.setAttribute('class', 'filters__button__list');
      
    setFilters(this.$key, list)
    filter.appendChild(list)

    const tags = filter.querySelectorAll('p')
    addTagEvenListener(tags, list, this.$key)

    // filter search
    const input = filter.querySelector('input');
    input.addEventListener('change', () => {
      if (input.value.length > 2) {
        const currentTags = filter.querySelectorAll('p')
        const newTags = [...currentTags].filter(
          tag => simplify(tag.innerText).includes(simplify(input.value))
        )
        list.innerHTML = ''
        newTags.forEach(tag => {
          list.innerHTML += `<p>${tag.innerHTML}</p>`;
        })
        const tags = filter.querySelectorAll('p');
        addTagEvenListener(tags, list, this.$key)
        displayRecipes(filterRecipes());
      }
    });

  }

  closeFilter(filter) {
    const header = filter.querySelector('.filters__button__header');
    header.innerHTML = `
      ${this.$name}s
    `;
    const list = filter.querySelector('.filters__button__list');
    filter.removeChild(list);
  }

  create() {
    const filter = document.createElement('section');
    filter.setAttribute('class', `filters__${this.$key} filters__button`);
    filter.setAttribute('role', 'button');
    filter.setAttribute('data-open', 'false');
    filter.setAttribute('data-type', this.$key);
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