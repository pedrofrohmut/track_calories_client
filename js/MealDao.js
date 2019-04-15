"use strict";

const Meal = function(id, name, calories) {
  this.id = id;
  this.name = name;
  this.calories = calories;
};

const MealDao = (function() {

  const GET_ALL_MEALS_URL = "http://127.0.0.1:3000/meal";
  const GET_MEAL_URL = "http://127.0.0.1:3000/meal";
  const ADD_MEAL_URL = "http://127.0.0.1:3000/meal";
  const UPDATE_MEAL_URL = "http://127.0.0.1:3000/meal";
  const REMOVE_MEAL_URL = "http://127.0.0.1:3000/meal";

  const getAllMeals = function() {
    return (
      fetch(GET_ALL_MEALS_URL)
        .then(response => response.json())
        .then(json =>
          json.map(meal => new Meal(meal._id, meal.name, meal.calories)))
        .catch(err => err)
    );  
  };

  const getMeal = function(mealId) {
    return (
      fetch(GET_MEAL_URL + "/" + mealId)
        .then(response => response.json())
        .then(json => new Meal(json._id, json.name, json.calories))
        .catch(err => err)
    );
  };

  const addMeal = function(newMeal) {
    const data = {
      name: newMeal.name,
      calories: newMeal.calories
    };
    return (
      fetch(ADD_MEAL_URL, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => data)
        .catch(err => err)
    );
  };

  const updateMeal = function(updatedMeal) {
    const data = {
      id: updatedMeal.id,
      name: updatedMeal.name,
      calories: updatedMeal.calories
    };
    return (
      fetch(UPDATE_MEAL_URL,{
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => data)
        .catch(err => err)
    );
  };

  const removeMeal = function(mealId) {
    const data = { id: mealId };
    return (
      fetch(REMOVE_MEAL_URL, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => data)
        .catch(err => err)
    );
  };

  return {
    getAllMeals: getAllMeals,
    getMeal: getMeal,
    addMeal: addMeal,
    updateMeal: updateMeal,
    removeMeal: removeMeal
  };
})();
