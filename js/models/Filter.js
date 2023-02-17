import { Tag } from "./Tag.js";

const activeFilters = document.getElementById('filters__active');

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
      
    list.innerHTML = `
      <p>${this.name} 1</p>
      <p>${this.name} 2</p>
      <p>${this.name} 3</p>
      <p>${this.name} 4</p>
      <p>${this.name} 5</p>
    `;
    filter.appendChild(list)

    const tags = filter.querySelectorAll('p')
    tags.forEach(tag =>{
      tag.addEventListener('click', (e) => {
        e.stopPropagation()
        const tagName = e.target.innerText;
        const newTag = new Tag(tagName, this.$key)
        activeFilters.appendChild(newTag.create());
      })
    })
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
    filter.setAttribute('data-open', 'false')
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