// const filters = document.querySelectorAll('.filters__button');
// console.log(filters);

// function toggleFilter(filter) {
//   const open = filter.dataset.open
//   const name = filter.dataset.name
//   console.log(typeof(open), open);

//   const newFilter = new Openedfilter(name);
//   if (open === 'false') {
//     filter.innerHTML = newFilter.newFilter();
//     filter.setAttribute('data-open', 'true')
//   } else {
//     filter.innerHTML = newFilter.defaultFilter();
//     filter.setAttribute('data-open', 'false')
//   }
// };

// filters.forEach( filter => {
//   filter.addEventListener('click', (e) => {
//     e.stopImmediatePropagation();
//     toggleFilter(filter);
//   })
// });
