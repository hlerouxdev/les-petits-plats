export default class Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    this.$url = url;
  }

  async get() {
    return fetch(this.$url)
      .then((res) => res.json())
      .then((data) => data.recipes)
      .catch((err) => console.log('an error occured', err));
  }
}
