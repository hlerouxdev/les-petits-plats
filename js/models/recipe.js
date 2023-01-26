export class Recipe {
  constructor(data) {
    this.$id = data.id;
    this.$name = data.name;
    this.$servings = data.$servings;
    this.$ingredients = data.ingredients;
    this.$time = data.time;
    this.$description = data.description;
    this.$appliance = data.appliance;
    this.$ustensils = data.ustensils;
  }

  get id() {
    return this.$id;
  }

  get name() {
    return this.$name;
  }

  get servings() {
    return this.$servings;
  }

  get ingredients() {
    return this.$ingredients;
  }

  get time() {
    return this.$time;
  }

  get description() {
    return this.$description;
  }

  get appliance() {
    return this.$appliance;
  }

  get ustensils() {
    return this.$ustensils;
  }
}