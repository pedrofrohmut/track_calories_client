"use strict";

const MealDao = (function() {
  const GET_ALL_MEALS_URL = "http://127.0.0.1:3000/meal";

  const Meal = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  const _newMeal = function(id, name, calories) {
    return new Meal(id, name, calories);
  };

  const _newMealNoId = function(name, calories) {
    return new Meal(0, name, calories);
  };

  const _getAllMeals = function() {
    return fetch(GET_ALL_MEALS_URL)
      .then(response => response.json())
      .then(json => json);
  };

  return {
    newMeal: _newMeal,
    newMealNoId: _newMealNoId,
    getAllMeals: _getAllMeals
  };
})();
