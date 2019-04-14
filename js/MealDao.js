"use strict";
const Meal = function(id, name, calories) {
  this.id = id;
  this.name = name;
  this.calories = calories;
};

const MealDao = (function() {

  const GET_ALL_MEALS_URL = "http://127.0.0.1:3000/meal";
  const GET_MEAL_URL = "http://127.0.0.1:3000/meal";


  const newMeal = function(id, name, calories) {
    return new Meal(id, name, calories);
  };

  const newMealNoId = function(name, calories) {
    return new Meal(0, name, calories);
  };

  const getAllMeals = function() {
    return fetch(GET_ALL_MEALS_URL)
      .then(response => response.json())
      .then(json =>
        json.map(meal => new Meal(meal._id, meal.name, meal.calories))
      );
  };

  const getMeal = function(mealId) {
    return fetch(GET_MEAL_URL + "/" + mealId)
      .then(response => response.json())
      .then(json => new Meal(json._id, json.name, json.calories));
  };

  return {
    newMeal: newMeal,
    newMealNoId: newMealNoId,
    getAllMeals: getAllMeals,
    getMeal: getMeal
  };
})();
