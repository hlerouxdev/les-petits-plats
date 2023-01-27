const activeFilters = document.getElementById('filters__active')

export class Tag {
  constructor(name, type) {
    this.$name= name;
    this.$type = type;
  }

  create() {
    const tag = document.createElement('button');
    if(this.$type === 'ingredients') tag.setAttribute('class', 'filters__ingredients');
    if(this.$type === 'appliance') tag.setAttribute('class', 'filters__appliance');
    if(this.$type === 'ustensils') tag.setAttribute('class', 'filters__ustensils');
    tag.innerHTML = `
      ${this.$name}
      <i class="fa-regular fa-circle-xmark"></i>
    `

    tag.addEventListener('click', () => {
      activeFilters.removeChild(tag);
    })

    return tag;
  }
}