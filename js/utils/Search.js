import { allRecipes, keywords } from "../pages/index.js";
import { displayRecipes } from "../pages/index.js";

const searchBox = document.querySelector('.search__input')
console.log(searchBox);

let filteredRecipes = allRecipes;

console.log('nominal test', 'poi'.localeCompare('poisson'));

function simplify(string) {
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(' ').join('').toLowerCase();
}

function binarySearch(array, query) {
  let start = 0, end = array.length - 1;

  while (start <= end) {
    let mid = start + Math.floor((end - start) / 2), res = query.localeCompare(array[mid])
    if (res == 0) return mid
    if (res > 0) {
      start = mid + 1
    } else {
      end = mid - 1
    }
  }
  return -1
}

searchBox.addEventListener('change', () => {
  console.log(allRecipes);
  const query = searchBox.value;
  if (query.length == 0 ) displayRecipes(allRecipes)
  if (query.length > 2) {
    const res = binarySearch(keywords, query.toLowerCase())
    console.log('res: ', res);
  }
});
